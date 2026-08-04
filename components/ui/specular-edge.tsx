"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./specular-edge.css";

/**
 * The specular rim from React Bits' SpecularButton, lifted out of the button so
 * it can outline any element.
 *
 * Upstream ships it as a `<button>`. This site already has exactly one button
 * treatment (`components/ui/cta-button.tsx`) and a second one was explicitly
 * rejected, so the shaders and the pointer maths are kept and the button is
 * dropped. Drop this in as a direct child of any `position: relative` element
 * and it draws a light that tracks the cursor along that element's edge.
 *
 * Deviations from upstream, all for cost rather than looks:
 *
 * 1. **The render loop idles.** Upstream runs `requestAnimationFrame` forever.
 *    Here it stops once the highlight has faded and the pointer is out of
 *    range, and restarts when the pointer comes back — otherwise three cards
 *    on one section means three permanent loops.
 * 2. **The host rect is cached**, refreshed on resize and scroll rather than
 *    read on every `pointermove`. Upstream calls `getBoundingClientRect()` in
 *    the move handler, which is a layout read per card per mouse move.
 * 3. **It doesn't run at all** without a hover-capable pointer, under
 *    `prefers-reduced-motion`, or without WebGL2 — the shaders are
 *    `#version 300 es`. In every one of those cases nothing renders and the
 *    host element's own CSS edge is what shows, so it has to look right
 *    without this.
 * 4. **It pauses off-screen** via IntersectionObserver.
 */

const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both
  // catch a streak. The angular window (size + fade) is measured with an
  // elliptical normal so it varies continuously along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

export interface SpecularEdgeProps {
	/** Corner radius in px. Match the host element's own radius. */
	radius?: number;
	/** Colour of the moving highlight. */
	lineColor?: string;
	/** Static edge stroke under the highlight. */
	baseColor?: string;
	intensity?: number;
	/** Angular size of each streak, in degrees. */
	shineSize?: number;
	/** How gradually a streak fades at its ends, in degrees. */
	shineFade?: number;
	/** Highlight width in px. */
	thickness?: number;
	/** Sweep speed when `autoAnimate` is on. */
	speed?: number;
	followMouse?: boolean;
	/** Distance in px within which the shine fades in. */
	proximity?: number;
	/** Keep the shine on with a rotating sweep, ignoring the pointer. */
	autoAnimate?: boolean;
}

export default function SpecularEdge({
	radius = 18,
	lineColor = "#ffffff",
	baseColor = "#525252",
	intensity = 1,
	shineSize = 10,
	shineFade = 40,
	thickness = 1,
	speed = 0.35,
	followMouse = true,
	proximity = 250,
	autoAnimate = false,
}: SpecularEdgeProps) {
	const hostRef = useRef<HTMLSpanElement>(null);
	const propsRef = useRef({
		radius,
		lineColor,
		baseColor,
		intensity,
		shineSize,
		shineFade,
		thickness,
		speed,
		followMouse,
		proximity,
		autoAnimate,
	});

	// Upstream assigns to the ref during render; `react-hooks/refs` rejects that.
	// An effect with no dependency array runs after every render, which keeps the
	// live values available to the animation loop without re-creating the WebGL
	// context on every prop change. Declared before the setup effect below so it
	// has already run by the time the first frame reads it.
	useEffect(() => {
		propsRef.current = {
			radius,
			lineColor,
			baseColor,
			intensity,
			shineSize,
			shineFade,
			thickness,
			speed,
			followMouse,
			proximity,
			autoAnimate,
		};
	});

	useEffect(() => {
		const host = hostRef.current;
		const target = host?.parentElement;
		if (!host || !target) return;

		// Nothing here is informational, so a device that can't hover or a reader
		// who has asked for less motion simply doesn't get it.
		if (
			!window.matchMedia("(hover: hover)").matches ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return;
		}

		// The shaders are `#version 300 es`; on WebGL1 they fail to compile and ogl
		// would log for every instance on the page.
		const probe = document.createElement("canvas");
		if (!probe.getContext("webgl2")) return;

		const dpr = window.devicePixelRatio || 1;
		const renderer = new Renderer({
			alpha: true,
			premultipliedAlpha: true,
			antialias: true,
			dpr,
		});
		const gl = renderer.gl;
		gl.clearColor(0, 0, 0, 0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

		const geometry = new Triangle(gl);
		if (geometry.attributes.uv) delete geometry.attributes.uv;

		const program = new Program(gl, {
			vertex: VERT,
			fragment: FRAG,
			uniforms: {
				uCenter: { value: [0, 0] },
				uHalfSize: { value: [1, 1] },
				uRadius: { value: 0 },
				uAngle: { value: 2.4 },
				uPx: { value: dpr },
				uLineColor: { value: [1, 1, 1] },
				uBaseColor: { value: [0.32, 0.32, 0.32] },
				uIntensity: { value: 1 },
				uShineSize: { value: 0.17 },
				uShineFade: { value: 0.7 },
				uThickness: { value: 1 },
				uBaseWidth: { value: dpr },
			},
		});

		const mesh = new Mesh(gl, { geometry, program });
		host.appendChild(gl.canvas);

		const sizeRef = { w: 1, h: 1 };
		let rect = target.getBoundingClientRect();

		const resize = () => {
			// Fractional size + explicit centre keep the SDF pinned to the exact CSS
			// border, instead of drifting up to a pixel from offsetWidth rounding.
			rect = target.getBoundingClientRect();
			const w = rect.width;
			const h = rect.height;
			sizeRef.w = w;
			sizeRef.h = h;
			renderer.setSize(w + PAD * 2, h + PAD * 2);
			program.uniforms.uCenter.value = [
				(PAD + w / 2) * dpr,
				(PAD + h / 2) * dpr,
			];
			program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
		};

		const ro = new ResizeObserver(resize);
		ro.observe(target);
		resize();

		// Scroll moves the element under the pointer without resizing it, so the
		// cached rect has to be refreshed — coalesced to one read per frame,
		// because Lenis fires `scroll` on every smooth-scroll frame.
		let rectFrame = 0;
		const onScroll = () => {
			if (rectFrame) return;
			rectFrame = requestAnimationFrame(() => {
				rectFrame = 0;
				rect = target.getBoundingClientRect();
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });

		let onScreen = true;
		const io = new IntersectionObserver(
			(entries) => {
				onScreen = entries[0].isIntersecting;
				if (onScreen) start();
			},
			{ rootMargin: "200px" },
		);
		io.observe(target);

		let angle = 2.4;
		let idleAngle = 2.4;
		let bright = 0;
		let pointerAngle: number | null = null;
		let proximityT = 0;
		let last = performance.now();
		let raf = 0;
		let running = false;

		const lineC = new Color();
		const baseC = new Color();

		const update = (now: number) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			const p = propsRef.current;

			idleAngle += p.speed * dt;
			const steer =
				p.followMouse &&
				pointerAngle != null &&
				(!p.autoAnimate || proximityT > 0);
			const target_ = steer ? pointerAngle : idleAngle;
			const diff =
				(((target_ as number) - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
			angle += diff * (1 - Math.exp(-dt * 7));

			// Shine fades in with pointer proximity unless autoAnimate keeps it on
			const brightTarget = p.autoAnimate ? 1 : proximityT;
			bright += (brightTarget - bright) * (1 - Math.exp(-dt * 8));

			lineC.set(p.lineColor);
			baseC.set(p.baseColor);
			program.uniforms.uAngle.value = angle;
			program.uniforms.uRadius.value =
				Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
			program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
			program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
			program.uniforms.uIntensity.value = p.intensity * bright;
			program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
			program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
			program.uniforms.uThickness.value = p.thickness * dpr;
			renderer.render({ scene: mesh });

			// Idle out once the highlight has faded and there is nothing to track.
			// The base stroke is already on the canvas and doesn't need redrawing.
			const settled = bright < 0.002 && proximityT === 0;
			if (!onScreen || (settled && !p.autoAnimate)) {
				running = false;
				raf = 0;

				return;
			}

			raf = requestAnimationFrame(update);
		};

		function start() {
			if (running || !onScreen) return;
			running = true;
			last = performance.now();
			raf = requestAnimationFrame(update);
		}

		// Uses the cached rect, so this does no layout work — it can afford to run
		// on every pointer move for every instance on the page.
		const onPointerMove = (e: PointerEvent) => {
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
			const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
			const dist = Math.hypot(dx, dy);

			// Over the element itself the light settles on the diagonal (framing the
			// corners) and gently sways with the cursor position within it.
			if (dist === 0) {
				const nx = (e.clientX - cx) / (rect.width / 2);
				const ny = (cy - e.clientY) / (rect.height / 2);
				pointerAngle =
					Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
			} else {
				pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
			}

			const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1));
			proximityT = t * t * (3 - 2 * t);
			if (proximityT > 0 || bright > 0.002) start();
		};
		window.addEventListener("pointermove", onPointerMove);

		start();

		return () => {
			if (raf) cancelAnimationFrame(raf);
			if (rectFrame) cancelAnimationFrame(rectFrame);
			ro.disconnect();
			io.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("pointermove", onPointerMove);
			if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, []);

	return <span aria-hidden="true" className="specular-edge" ref={hostRef} />;
}
