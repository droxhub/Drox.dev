# Drox Dev site — implementation status

> Starting a fresh session? Read [`HANDOFF.md`](./HANDOFF.md) alongside this —
> it carries the traps (the ESLint/Biome split, the SSR inline-style hydration
> trap, the design language) that this file doesn't.

Companion to [`UX-AUDIT-2026-07-29.md`](./UX-AUDIT-2026-07-29.md) (Revision 2).
**Read this first** before picking up work — it says what's already shipped, so
the audit's roadmap isn't re-done from the top.

Last updated: **11 September 2026.**

---

## Tooling — ESLint lints, Biome formats

Split as of 4 August 2026. Biome used to do both; its linter is now
`"enabled": false` in `biome.json` and the rules moved to `eslint.config.mjs`.

| Command | Does |
| --- | --- |
| `npm run lint` / `lint:fix` | ESLint 9 flat config |
| `npm run format` / `format:check` | Biome — formatting **and import sorting** |
| `npm run check` | both, read-only |
| `npm run build` | format-write → ESLint → `next build` |

Nothing in `eslint.config.mjs` touches whitespace or quotes — a rule that
disagreed with the formatter would be a fight neither tool can win. ESLint 9,
not 10: `eslint-plugin-jsx-a11y` and `eslint-plugin-react` don't support 10 yet.
`eslint-config-next` bundles and registers the react / react-hooks / jsx-a11y /
import / typescript-eslint plugins, so rules are referenced by name and no
`plugins` block should be added for them.

The Next.js baseline checks four things Biome never did, which surfaced 38
pre-existing errors. All were fixed rather than downgraded — see the P4 note on
seeded particle fields below.

## Priority 1 — Stop the bleeding ✅ COMPLETE

| Item | Where |
| --- | --- |
| Hero CTA (two buttons) | `components/Hero.tsx` |
| Nav CTA visible on mobile (was `hidden md:inline-flex`) | `components/navbar.tsx` |
| Closing CTA at end of homepage | `components/ClosingCTA.tsx` |
| Dead `/` link on Projects → real case-study links | `components/Projects.tsx` |
| `/privacy`, `/terms`, `/accessibility` shipped | `app/*/page.tsx` + `components/LegalPage.tsx` |
| Four 404 footer links resolved; address added | `components/Footer.tsx` |
| `/blog`, `/docs`, `/pricing` stubs deleted | (`/pricing` later rebuilt properly) |
| Images: `alfa1.png` 33 MB → 67 KB WebP, `drox1.png` 7.9 MB → 30 KB | `public/projects/` |
| 22 MB `/about` video → lazy, reduced-motion aware (was also desktop-only; see below) | `components/ui/ambient-video.tsx` |
| Vercel Analytics + `cta_click` / `project_click` / `contact_form_submit` | `app/layout.tsx`, `components/ui/cta-button.tsx` |
| Per-route metadata, Organization JSON-LD, `sitemap.ts`, `robots.ts` | `app/` |
| Brand name `"DRO X"` → `"Drox Dev"` | `config/site.ts` |
| Contact form: labels, focus rings, `autoComplete`, honeypot, budget/timeline, success + blocked states | `app/contact/page.tsx` |
| `gsap`, `@gsap/react`, `framer-motion` uninstalled (0/0/1 imports) | `package.json` |
| `neumorphic-button` — a class defined nowhere — replaced | `components/navbar.tsx` |

`public/` went 69 MB → 26 MB.

## Priority 2 — Port the Company Profile ✅ COMPLETE

| Item | Source |
| --- | --- |
| `/work` index + `/work/[slug]` case study | profile pp.19–20 |
| Alfa Events case study (100+ events, 200+ staff, 5 modules) | p.19 |
| Founders on `/about` — all four, titles, ownership areas | p.24 |
| `/pricing` — engagement models + upfront commitments | p.17 |
| `BusinessChallenges` homepage section | p.12 |
| Services expanded to all 9 incl. **AI Solutions**, **Business Automation** | p.14 |
| 7-stage engineering process on `/services` | pp.15, 26 |
| FAQ rewritten to 8 deal-blocking questions + FAQPage JSON-LD | — |
| BreadcrumbList JSON-LD on `/work` and case studies | — |
| TechStack, About vision, Projects heading rewritten | — (the vision rewrite was reverted 6 August — see below) |

**Verified on a production server:** 10/10 routes 200 · exactly one `<h1>` per
page · sitemap lists all 10 URLs · build, Biome and TypeScript clean.

## Priority 3 — Conversion depth ✅ COMPLETE

| Item | Where |
| --- | --- |
| Homepage reordered per audit §6 | `app/page.tsx` |
| `HowWeWork` — compact 7-stage section (de-risk) | `components/HowWeWork.tsx` |
| `Founders` stays on `/about` only — §6 put it on the homepage too, dropped by decision | `components/Founders.tsx` |
| Tech-stack carousel moved off the homepage to `/services` | `app/services/page.tsx` |
| Six generic benefit tiles dropped from the homepage | (`about-section.tsx` now unused) |
| Seven process stages moved to one source | `config/content.ts` → `engineeringProcess` |
| Discovery Sprint offer + `#discovery-sprint` anchor | `components/DiscoverySprint.tsx`, `/pricing` |
| Discovery Sprint FAQ entry (also feeds FAQPage JSON-LD — now 9 Qs) | `config/content.ts` |
| Low-commitment link in the closing CTA | `components/ClosingCTA.tsx` |
| Sticky mobile CTA bar, appears at 50% scroll | `components/ui/sticky-mobile-cta.tsx` |
| Cal.com inline embed + lazy reveal in the closing CTA | `components/ui/cal-booking.tsx` |
| `booking_open` event; `cta_click` / `contact_click` from the sticky bar | — |

**New homepage order** (each section answers the question the previous raised):
Hero → Challenges → Services → Projects → How we work → Numbers →
Testimonials → FAQ → Closing CTA. The five hand-tuned offsets (`mt-[350px]`,
`mt-[150px]`, `mt-[100px]`, `mt-[-50px]`, `mt-[-20px]`) collapsed to one gutter
class; only the offset clearing the hero's black-hole artwork is still hand-set.

**Verified on a production server:** 10/10 routes 200 · one `<h1>` per page ·
section order confirmed in the rendered HTML · build, Biome and TypeScript
clean. Verified twice — once with `booking.calLink` empty and once with a test
link set — so both the fallback and the enabled path are known to render.

Notes on the sticky bar: mobile only (`md:hidden`), suppressed on `/contact`,
suppressed on pages shorter than ~1.3 viewports, scroll measurement coalesced to
one `requestAnimationFrame` per frame (Lenis fires `scroll` on every smooth
frame), reduced-motion aware, and the layout reserves `pb-20` on mobile so it
can never cover the footer.

## BusinessChallenges — surface treatment

Rebuilt 5 August. It was three dashed-outline boxes of loose bullets, which read
as a spec sheet — the wrong register for the one section whose job is to make a
visitor think "that's us". It now uses the **same surface as the HowWeWork
panels and the /about mission cards**: deep violet base
(`from-[#1a0f3d] via-[#0f0827] to-[#080418]`), two soft glows that bloom on
hover, and a hairline of light along the top edge instead of a border. No new
visual language was invented for it.

Also: an icon tile per group — a scaled-down twin of the mission-card tile
(solid `violet-600`, same glow shadow) — the category promoted from a small
uppercase label to a white heading beside it, and hairline rules between list
items in place of the 1px dots, which gave five loose bullets no structure.

Icons live in the component, not `config/content.ts`, keyed by group name so
reordering the config cannot silently mismatch them — the config stays copy the
client can edit.

Glows animate **opacity only**, never `scale`: a 70px blur recomputes every
frame it changes size, on three cards at once. Same reason as the HowWeWork
panels.

### The hover — specular edge (WebGL)

The cards carry React Bits' **SpecularButton** rim, lifted out of the button and
into `components/ui/specular-edge.tsx`. The site has exactly one button
treatment and a second was explicitly rejected, so the shaders and pointer maths
were kept and the button was dropped. It is a decorative overlay: drop it into
any `position: relative` element and it lights that element's edge toward the
cursor, fading in with proximity rather than switching on at the boundary — so
all three cards respond to where the cursor is on the section.

Four deviations from upstream, all for cost:

1. **The render loop idles.** Upstream runs `requestAnimationFrame` forever;
   three cards would mean three permanent loops. It now stops once the highlight
   has faded and the pointer is out of range. *Measured:* 246 rAF callbacks/2s
   with the pointer away (all of it pre-existing — Lenis and one other loop),
   499 with the pointer on a card.
2. **The host rect is cached**, refreshed on resize and on scroll (coalesced to
   one read per frame, because Lenis fires `scroll` every smooth frame). Upstream
   calls `getBoundingClientRect()` inside the `pointermove` handler — a layout
   read per card per mouse move.
3. **It does not mount at all** without a hover-capable pointer, under
   `prefers-reduced-motion`, or without WebGL2 (the shaders are
   `#version 300 es`). *Verified:* 0 canvases on an iPhone 13 profile, 0 under
   reduced motion, 3 on desktop. The card's own CSS edge has to look right on
   its own, and does.
4. **It pauses off-screen** via IntersectionObserver.

Upstream also assigns to a ref during render, which `react-hooks/refs` rejects;
that moved into an effect with no dependency array.

**The canvas is inset -20px so the glow can bleed past the edge**, which means
the card must not have `overflow-hidden` on it. The surface and glows are
clipped by an inner wrapper instead — keep that structure if you touch it.

**That inset caused 4px of horizontal page scroll on every phone**, found on
5 August by diffing against the deployed commit. `specular-edge.tsx` *always*
renders its host span — it is the ref the effect measures — and the WebGL,
pointer and reduced-motion guards only skip the canvas *inside* it. So the box
was inflated 20px past every edge precisely on the devices that never draw a
glow. On desktop the card sits well inside the viewport and the slack is
invisible; on a phone the card runs the full width, so 20px past its right edge
is 4px past the viewport.

Fixed in two places, because there are two distinct cases:

- `.specular-edge` is now `inset: 0`, widening to `-20px` only under
  `:has(canvas)`. No canvas, no bleed box. This fixes every touch device and
  helps any future host, since the component no longer reserves space it isn't
  using.
- `BusinessChallenges`'s section carries `overflow-x-clip`. `:has(canvas)`
  cannot help when the canvas *does* mount and the viewport is still narrow —
  a hover-capable browser at 200% zoom, which WCAG 2.2 SC 1.4.4 requires to
  work. `clip` rather than `hidden`: it creates no scroll container and leaves
  the vertical axis `visible`, so the glow still bleeds up and down.

Verified 0 overflow on an iPhone 13 profile, at 360 and 390px with hover, at
640px (1280 at 200% zoom) and at 1440 — and the rim glow still renders and
bleeds on desktop hover.

**The lesson worth keeping: measure the page against the deployed commit, not
against itself.** This shipped through several "no horizontal overflow" checks
because those confirmed the page was consistent, not that it was unchanged.

**`ogl` is now a used dependency.** The P4 note below says to drop it after
deleting the unused components; that no longer applies — `specular-edge.tsx`
imports it.

Verified at 1440 and 390px: all three cards exactly 408px tall on one row, no
hydration errors, no horizontal overflow.

**Still open, still unanswered:** the section ships 15 bullets. The audit asked
for three recognisable pains and the recommendation was two or three per group.
That is a content decision, not a design one.

## Spacing — one rhythm, one gutter owner

Audited and evened out 5 August across all 10 routes at 1440 and 390px. Three
rules, and everything now follows them:

1. **Section rhythm is `py-16 md:py-24` / `my-16 md:my-24`** — 64px on mobile,
   96px on desktop, which puts 192px between any two sections. Three components
   were off it: `WhyChooseUs` at `my-20 md:my-[100px]`, `Testimonials` at
   `py-16 md:py-26` (104px — `26` is not even a step on the scale used
   anywhere else) and `TechStack` at `my-16 md:my-[100px]`. Those made the
   homepage gaps run 192 / 196 / 204 / 200 through the middle of the page.
2. **Page headers are `py-12 md:py-20`** — 48/80. There had been three sizes:
   96 on `/about`, 80 on `/pricing` `/work` and the legal pages, 40 on
   `/services` and `/contact`.
3. **The page owns the horizontal gutter; no section component adds its own.**
   The gutter is `px-4 sm:px-6 xl:px-0`, on the page root (or, on the homepage,
   on the per-section wrapper). `ServiceCards`, `FAQ`, `Projects`, `ClosingCTA`
   and the `Testimonials` card row each carried `px-4 md:px-6 lg:px-8` as well,
   and `/services`, `/about` and `/contact` repeated the gutter on inner
   wrappers — so on a phone some sections sat at 32px and others at 16px, and
   the left edge stepped in and out while scrolling. Projects and ClosingCTA
   are now wrapped like every other homepage section rather than self-guttering.

Content column widths were also stepping: `BusinessChallenges` rendered at
1152px between two 1280px grids, and `/about`'s leadership and values grids at
1152px next to a 1280px mission block. All now 1280. **Deliberately narrower and
left alone:** FAQ and the closing CTA at 896 (reading width), Testimonials at
1024 (two 450px cards — 1280 would only add empty space), the contact form at
672, and the legal pages, which keep their own 40px block rhythm.

`/work/alfa-events` spaced its three narrative blocks 64 / 48 / 64; now 64
throughout.

**Verified before and after** on a production server at 1440 and 390px: every
section's own padding and margin, every content column width, and
`scrollWidth vs innerWidth` on all 10 routes — no horizontal overflow, no
console errors. Homepage now measures 96/96 on every section at 1440 and 64/64
at 390, with every content edge at 16px on mobile.

**Two differences were raised and accepted — don't reopen them.** `/work` uses
`<div>`s rather than `<section>` elements, and `ProfileCard` renders each
leadership card as `<section class="pc-card">` (upstream markup). Neither
affects layout or assistive tech — a `<section>` with no accessible name is not
a landmark — and both were reviewed on 5 August and left as they are. The only
practical consequence is that `querySelectorAll("section")` is not a reliable
way to enumerate page sections; filter out `.pc-card` and expect `/work` to
return nothing.

## Mobile menu — full-screen overlay

Rebuilt 4 August in the style of apple.com: tapping the hamburger fades in a
full-screen overlay with a plain left-aligned list of the six routes — no
dividers, no chevrons, current page in violet. Rows stagger in 30ms apart. The
bar empties to just the close button while it is open; the logo and CTA fade
out rather than float in a bordered pill on an otherwise flat overlay.

It replaced a bottom sheet that shared the bottom edge of the screen with the
sticky mobile CTA, and whose six items needed ~350px on one row where the sheet
left ~310px — so it clipped **Home** off the left and **Contact** off the right,
unreachable on every phone size.

Things worth knowing before changing it:

- **The overlay is a sibling of `<motion.nav>`, not a child.** As a child it
  rendered wrong twice over: framer-motion's transform on the nav makes it the
  containing block for `position: fixed` descendants, so `inset-0` stopped
  meaning the viewport, and inside the nav's own stacking context it painted
  over the nav pill and hid the close button.
- **Overlay `z-30`, nav `z-40`** — deliberately below, so the close button stays
  above it.
- **It is always mounted**, shown by animating opacity, and inert when closed:
  `pointer-events-none`, `aria-hidden`, `tabIndex={-1}` on every link. Do not
  move it back inside `<AnimatePresence>` without re-measuring.
- **Tapping a link does not close it.** The overlay stays up until the pathname
  actually changes, which is what stops the old page flashing between the tap
  and the new route committing. The one exception is tapping the page you are
  already on — no pathname change, so that closes explicitly.
- **`MOBILE_MENU_EVENT`** (`lib/utils.ts`) is dispatched on `window` on open and
  close. The sticky CTA hides itself on it and `SmoothScroll` freezes the page.
  Both halves of the freeze are needed: `lenis.stop()` holds a wheel scroll, but
  this Lenis instance runs without `syncTouch`, so touch scrolling stays native
  and only `overflow: hidden` stops it — that is the half that matters on a
  phone.
- Escape closes and returns focus to the toggle; focus is trapped across the
  close button and the panel links while open; a route change closes it, which
  covers browser back/forward.

### What actually made it stutter

Measured as dropped frames during open and close under a **4x CPU throttle**,
worst frame in ms:

| Change | Worst frame on open |
| --- | --- |
| Original (blurred, `AnimatePresence`, motion items) | 83ms |
| Opaque background, no `backdrop-blur` | 67ms |
| Overlay kept mounted; CSS-animated items | 67ms |
| **`GooeyNav` memoised** | **49ms** |

The cost was not the blur, the mount or the animation — it was **`GooeyNav`
re-rendering**. The navbar owns the menu's open state and GooeyNav is its child,
so every toggle rebuilt GooeyNav's large inline `<style>` block. It is
`React.memo`'d now, and the array props it takes are hoisted to module scope so
the memo can actually hit. Close was smooth throughout (0 dropped frames).

`GooeyNav` is desktop-only again — it is no longer rendered below `lg` (see the
next section; it was `md` until 31 August), so the wrap workaround added earlier
was reverted.

Verified at 390 and 320px: six links present, no horizontal overflow, no
hydration errors; overlay inert when closed (0 tabbable links, `aria-hidden`)
and live when open (6); scroll locked at 4520px while open and restored after;
Escape returns focus to the toggle; sticky CTA hidden while open. Desktop still
one row of six with the overlay `display: none`.

### The hero is a lamp now — 31 August 2026

**Decided by the client.** The black-hole video and the scrolling note mockup
are both gone, replaced by Aceternity's Lamp effect, inverted so the beam shines
*upward* from under the CTA row. `components/ui/lamp.tsx`.

Deleted with them: `prototype-img.tsx`, `HeroScrollDemo.tsx`, `NoteMockup.tsx`,
`ui/container-scroll-animation.tsx`, `public/video/black-hole.webm` (265 KB),
`fromCentre()` in `lib/utils.ts`, and ~255 lines of CSS — eight `@keyframes`
(spin, twinkle, drift, toCenter, orbit, spiral, gravity, pulse) and every
`.black-hole-*` / `.space-dot-*` rule.

**Two things that fixes for free.** The homepage lost the `md:mt-[350px]` that
existed only to clear artwork bleeding out of the hero's box — desktop page
height went 11,730px → 9,876px, and a landscape phone no longer scrolls through
three and a half blank screens to reach the first section. And the SEO problem
in the favicon note below is gone at the source: the meta description Google
preferred was `NoteMockup`'s placeholder prose, which no longer exists.

**`@keyframes pulse` went with them, and that is a behaviour change.** It was
defined at the top level, so it overrode Tailwind's own `pulse` — the
`animate-pulse` dot on `/about` was running this file's opacity+scale version,
not Tailwind's. It now gets Tailwind's. Nothing else used it.

#### Porting the lamp: three things that cost a rebuild each

The component carries the full reasoning; the short version, because each of
these looked right in code and wrong on screen:

1. **Upstream positions every layer from the container's vertical centre**
   (`inset-auto` + `-translate-y-[Nrem]`), with the filament landing at
   `centre − 7rem`. Ported naively, the cone's apex ended up 14rem from the
   filament and the lamp rendered as a shapeless bloom. Every layer now declares
   its `top` as an offset from one `--bar` line, with the conversion table in
   the file.
2. **The bar has to be a fixed offset, not a percentage.** The cone is a fixed
   14rem; against a percentage bar its far end lands at 70% of the 32rem desktop
   box but 99% of the 19rem mobile one, where the box edge cut it flat.
3. **`scale-x-*` cannot be the responsive dial.** `mask-image` on the group
   brings `mask-clip: border-box`, which clips the group's paint to its own box;
   the scale then shrinks *that*, and the whole lamp rendered as a hard-edged
   242px rectangle. Widths are responsive classes and the intro animates
   `scaleX` instead of `width` — which also stops four elements doing layout on
   every frame.

#### `bg-background` is a dead class in this project — and it is on `<body>`

The end cap has to be *exactly* the page colour or the lamp reads as a panel on
the page. Two wrong answers shipped here in turn before the right one:

- **`bg-canvas`** is `#030014` = `rgb(3,0,20)`, against a page of `rgb(0,0,20)`.
  Three levels of red: invisible on a monitor, plain on an OLED phone in a dark
  room. **`--color-canvas` is not the page colour** — worth knowing generally.
- **`bg-background`** resolves to **`rgba(0,0,0,0)`**. `background` is defined in
  `theme.extend.colors` in `tailwind.config.js`, which is a **Tailwind v3** file;
  this project is v4, driven by the `@theme` block in `styles/globals.css`, and
  there is no `@config` directive loading the JS config. So the utility produces
  nothing. It is also on `<body>` in `app/layout.tsx:111` and does nothing there
  — the body is painted by a raw `background-color: hsl(var(--background))` rule
  in globals.css, which is why nobody noticed.

The lamp holds the real value in `--lamp-page: hsl(var(--background))`. **Anything
else in `tailwind.config.js`'s `colors` block is equally dead** and should be
assumed so until checked.

A transparent cap is not a subtle failure, either: it is what let the cone's own
outer edge show as a hard line, and what let the bloom spill out of the *back* of
the lamp — light on the far side of its own reflector.

#### What the beam is made of, after the port

Upstream covers the cone's hard edges with opaque page-coloured rectangles and
masks *those*. That leaves the edge underneath, covered rather than removed —
measured at 1280px, a one-pixel step from `rgb(0,0,20)` to `rgb(4,2,26)` at
x=160, exactly 30rem out from centre. The mask is on the cone itself now, so the
edge is deleted rather than hidden, and four colour-matched layers went with it,
along with upstream's base softener and `backdrop-blur` strip, which the
group-wide fade already made redundant.

Beam width is responsive (`BEAM_W`) and the outer fade is a percentage, because
the cone is *two* halves side by side: at upstream's flat 30rem the pair is 960px
and a 390px phone sees only its bright middle, edge to edge.

**Verified** at 1440×900, 844×390 and 390×844: no horizontal overflow on any
route, no page or console errors, and a vertical pixel scan down five columns of
the lamp box finds **no step other than the filament itself** — 166,132,255 →
0,0,20, the deliberate 2px line — with every other edge at ≤4/255, which is
gradient banding. Build, Biome, ESLint and TypeScript clean.

**Open:** the hero has no product imagery at all now. The mockup was the only
thing on the homepage showing software, and the audit's case for it still
stands — the lamp is atmosphere, not proof. `/work` carries that load alone.

### The lamp gained a floor, and the Problem cards a panel — 31 August 2026

Both from client reference images.

#### The lamp reads as a light standing on something

Three layers, and the middle one reverses a decision made earlier the same day:

1. **The filament is white** (`--lamp-hot`), not violet. A real source blows out
   to white and only the spill carries the hue; a violet filament reads as a
   violet line rather than as something emitting.
2. **A white blow-out hugs the bar** — wide, short, `rounded-[100%]` so it stays
   an ellipse at any width instead of reading as a third round blob.
3. **A floor reflection below the bar.** The end cap was added to stop the beam
   spilling symmetrically out of the *back* of the lamp, which is the one thing
   a lamp cannot do, and that is still right — but a reflection off the surface
   *under* it is exactly what a lamp does, and it is what the reference has that
   a bare cap-and-cone does not. So it sits **above** the cap at `z-[45]`, where
   the bloom sits below it at `z-20`: dimmer, much shorter, and an ellipse
   anchored at the bar's centre so it falls off sideways as well as down.

Verified: the only vertical pixel step in the whole lamp is still the filament
itself, now `255,255,255 → 50,41,88` — white line onto the reflection rather
than onto bare page, which is the reflection proving it renders.

#### BusinessChallenges — streaming pills, fourth and current

**The editorial version below was also rejected: "it still look like document".**
Correct, and it took three rejections to see why: **fifteen short phrases stacked
vertically are list-shaped whatever chrome is on them.** Dashed boxes → violet
cards with an inset panel → statements on hairlines; every pass restyled the
list instead of changing it. Removing the boxes did not help because the boxes
were never the problem.

**So the form changed.** Each group is now a horizontal marquee of pills moving
at its own speed, alternating direction — a reader scans across rather than
reading down, and it reads as a run of real complaints going past. Driven by
`LogoLoop`, the same marquee `TechStack` uses, with `renderItem` making the
items pills instead of logos. Content still untouched: all 15, verbatim.

**~1630px of vertical list became 815px.**

Three things that decide whether this keeps working:

- **Do not turn it back into rows of text.** The levers are pill size, row gap
  and the three speeds.
- **It must be full-bleed, and it is the one homepage block NOT wrapped in
  `app/page.tsx`'s gutter `<div>`.** Boxed to `max-w-7xl` the rows began and
  ended 80px in from each side on a 1440 screen and read as three cropped
  strips — a stream that visibly starts and stops is not a stream. The component
  applies the same `px-4 sm:px-6` to its own header so the text still lines up
  with every other section, and carries `overflow-x-clip` so the rows cannot
  push the page sideways. **This is a deliberate exception to "the page owns the
  gutter"** — the only other one is the hero's lamp.
- **Three different speeds, not one.** Three rows moving together at the same
  rate read as a single block sliding.
- **The group label sits beside the stream from `md` up, not above it.** Stacked,
  each group was two elements and the section was six of them in a column — the
  eye had to work out which caption owned which row, and on a phone the labels
  were most of what you saw. Beside it, the row reads as one statement:
  "Operational → these problems", and the section came down from 815px to 707px.
  Below `md` it stays above, because pinning a 9rem label to the left of a 390px
  screen would leave 240px of stream. **`min-w-0` on the stream wrapper is load
  bearing** — a flex child defaults to `min-width: auto`, which here is the
  marquee's full content width, so without it the row refuses to shrink and
  pushes the page sideways.

`fadeOutColor` is `hsl(var(--background))` — **not** `var(--color-canvas)`,
which is `rgb(3,0,20)` against the page's `rgb(0,0,20)`. `TechStack` passes
`--color-canvas` and has the same latent three-level seam; it was left alone
rather than changed unasked.

Motion is covered: `LogoLoop` freezes its own track under
`prefers-reduced-motion` (it reads the media query directly — see the effect at
the top of the file), and `pauseOnHover` stops the row under the pointer.

##### The editorial version it replaced (superseded, kept for the reasoning)

**The card version below was rejected: "still looks like AI slop and like a
document".** That is the right read. A card containing a panel containing a
ruled list *is* a document — box-in-box is the shape of a form, the centred
violet rounded-square icon tile is the most template-looking element on the
internet, and five identically weighted rows read as an inventory. None of that
is recognition, which is this section's entire job.

**The chrome is gone.** Per group: a ghosted numeral, the group name at display
size, and the pains as full-width statements on hairlines, in a
`[16rem_1fr]` / `[20rem_1fr]` two-column row that stacks on mobile. Editorial
rather than dashboard. Content still untouched — all 15, verbatim.

The only decoration is a rule that grows from 0 to 24px as the pointer crosses a
row, in a fixed-width slot so the statement beside it never moves, plus the text
going gray-400 → white. Verified live: `dashW 0 → 24`, colour → `rgb(255,255,255)`.

Three things worth keeping:

- **Do not put it back in a card.** If it needs more presence the levers are
  type scale, the numeral's weight and the row rhythm — not a surface behind it.
- **The list is top-aligned, not `self-center`.** Centred, it floated against a
  column of dead space under the group name. `-mt-2 md:-mt-3` puts the first
  statement on the numeral's line.
- **It is taller than the cards were** — 1634px vs 978px at 1440. That is the
  cost of the format and it was accepted; the first pass was 1862px before the
  padding was trimmed. The page overall is still ~1850px shorter than it was
  before the black hole came out.

`max-w-6xl`, not the `7xl` the cards used: a single column of statements needs a
reading measure, and 1280px of it runs the eye off the end of every line.

**Two things are now dead and awaiting a decision.** `SpecularEdge` has no
callers, and `ogl` — which only that component imports — is an unused dependency
again, reversing the note further down that said it had become a used one. Both
are still in the tree. The section also dropped `overflow-x-clip`, which existed
solely because the specular canvas was inset -20px past each card's edge.

##### The card version it replaced (superseded, kept for the reasoning)

**Styling only. Every one of the 15 pain points from Company Profile p.12 is
still there, unchanged — decided with the client**, along with leaving the
"trim to 3 per group" question open (see the note further down; the reference's
decorative mockup widgets were declined because their labels would have to be
invented and most of the profile copy would be lost).

- The icon tile moved from beside the group name to **above** it, both centred.
  The name is now the card's own title rather than a label on a list, which is
  what gives the row of three its symmetry.
- The pains sit in their **own inset panel** — a flat white wash at 3% over the
  card's gradient, so it lifts without introducing a second colour. Two surfaces
  reading as one object is what makes the card look built rather than filled.

##### The colour came back off again, by decision

The first pass kept the deep violet surface and both permanent glows under the
new layout, and three of those side by side were the most saturated thing on the
site — the gradients muddied into each other rather than lighting anything.
**The client asked for simpler**, so:

| | was | now |
| --- | --- | --- |
| surface | `from-card-top via-card-mid to-card-bottom` (deep violet) | `from-surface-muted to-surface` (near-black) |
| glows | two, permanent, `opacity-30`/`opacity-20` | **one**, top-centre, `opacity-0` until hover |
| top hairline | `via-violet-400/50` | `via-white/15`, violet only on hover |
| specular rim | `#2a1a52` | `#1a1830` |
| hover shadow | `shadow-violet-950/50` | `shadow-black/40` |

Violet is now held back for the icon tile and the row dots, which is where it
does work. The cards also sit properly beside the `ServiceCards` and `FAQ`
surfaces directly below them, which were already near-black.

**This is a deliberate divergence from the shared "stunning" surface**, which
the note further down describes as one language across `BusinessChallenges`,
the `HowWeWork` panels and the `/about` mission cards. Those two keep the deep
violet and **should**: in `HowWeWork` the violet is what separates the one open
stage from the six closed rows — the note below records that dropping its glows
made the open stage "read as near-black, barely distinguishable from a closed
row". There the colour carries state. On three equal Problem cards it carried
nothing, so removing it costs no meaning and keeps violet meaningful elsewhere.
**If the mission cards are ever simplified too, `HowWeWork` is not the one to
follow them.**

**The glow must stay a `radial-gradient`, never a blurred span** — unchanged and
not negotiable. See the iOS square-corner note below: anything with a `filter`
is composited, and WebKit will not hold a rounded overflow clip on a composited
child.
- `min-h-[2lh]` on the title. "Customer Experience" wraps where the others do
  not, and without it that card's panel starts a line lower than its neighbours'
  — the one thing that breaks a row of three identical cards. `lh` degrades to
  natural height where unsupported, which is the behaviour it replaces.

**The grid is `lg:grid-cols-3`, not `md:`.** At `md` the columns were 185px on a
768 tablet and 244px on an 844 landscape phone, wrapping every row to two, three
or four lines and hyphenating "self-service". Same correction as the navbar's,
for the same reason: 768px is a tablet width, not a desktop one, and a landscape
phone lands in it. Measured after: 405px columns at 1440, 304px at 1024, one
full-width card below that, panels aligned top and bottom at both desktop sizes.

Nothing in the iOS corner work was touched — the glows are still radial
gradients, the surface still carries `clip-path` beside its `overflow-hidden`,
the article still has no `overflow-hidden` of its own, and the section still has
`overflow-x-clip`. Re-swept all 130 route/viewport combinations after: 0
overflow, 0 clipped text, 0 errors.

### Responsive sweep — 31 August 2026

**130 route/viewport combinations** — all 10 routes across 13 widths from 320px
to 1920px, portrait and landscape, each scrolled top to bottom so in-view
content mounts before measuring.

**Clean:** 0 horizontal overflow, 0 text clipped inside its own box, 0 JS or
console errors, 0 text under 12px. The nav switches at exactly the right place
(hamburger to 1023px, the six-item row from 1024px) and the logo is 130×37 at
every single width.

Two defects found and fixed:

| | |
| --- | --- |
| **Logo squeezed below ~354px** — 96px at 320, 116px at 340 | The same failure as the `md` one below, at the other end of the scale. The 320px bar has to hold a 130px logo, a 114px CTA and a 40px toggle — 288px with the gap — and `px-6` plus the nav's own `px-2` left only 256px. Now `px-3 sm:px-6` on the bar, `px-1 sm:px-2` on the nav and `gap-0.5 sm:gap-1` in the right slot. **The gutter gives way, not the logo.** |
| **The hero headline broke mid-word** — "op / erations" at 320px, "o / perations" at 568px | `ColourfulText` returns a bare array of one `inline-block` span per character, so the browser treats every letter as its own item and may break the line inside the word. Wrapped in `inline-block whitespace-nowrap`. |

**Three findings dismissed, with the measurement:**

- **19 touch targets under 24px** on every route (footer links, 20–23px tall).
  SC 2.5.8's spacing exception applies and was checked properly rather than
  assumed — a 24px circle centred on each target's box against every other
  target: **0 intersections** at 320, 390 and 844px. It passes.
- **The footer's `grid-cols-2 sm:grid-cols-1`** looks like inverted responsive
  behaviour but is deliberate: two short columns of link labels on a phone, one
  per section from `sm`. 144px columns holding "Home" and "About" are not
  cramped.
- **FAQ questions wrap to 4–6 lines at 320/360px.** That is what a 288px column
  does to a 60-character question; nothing is clipped or overflowing.

The sweep script pattern is worth repeating: measure `scrollWidth - innerWidth`
for overflow, then only attribute it to elements whose ancestors do **not** clip
overflow-x — without that filter every decorative blob inside an
`overflow-x-clip` section reports as an offender and the real signal is buried.

### The nav split is `lg`, not `md` — 31 August 2026

Reported from a phone held in landscape: **the logo was gone from the navbar.**

The desktop row appeared at `md` (768px), and a landscape phone is 844–932px
wide — so it got the desktop nav in a 390px-tall window. The bar's three slots
are all `flex-1`, i.e. `flex: 1 1 0%`. The six-item row is 691px and cannot
shrink (nowrap items), the CTA is ~122px, and the bar's own padding is 48px, so
below ~1002px the only slot with anywhere to give is the logo's. Measured, at
the widths that matter:

| viewport | logo image |
| --- | --- |
| 768 · 800 · 844 | **0px — clipped away entirely by the bar's `overflow-hidden`** |
| 900 | 37px |
| 932 | 69px |
| 960 | 97px |
| 1000 | 129px |
| 1024+ | 130px |

**Fixed by moving the whole split to `lg`** (1024px — the first Tailwind step at
or above the measured 1002px), not by shrinking anything: below `lg` a landscape
phone now gets the hamburger and the full-screen overlay, with the logo at its
full 130px. Seven classes in `components/navbar.tsx` moved together — the pill's
padding, background and border, the logo and CTA fade, the centred row, the
hamburger, and the overlay. **They are one switch; changing one without the
others splits the navbar in half.** The logo slot also carries `shrink-0` now,
so the row can never squeeze it again even at `lg`.

**The overlay had to be made to fit a short viewport.** It is 112px of top
padding (clearing the nav pill) plus six 52px rows plus 40px below — 464px in a
390px-tall screen, so the last rows sat off-screen behind its `overflow-y-auto`.
Under `[@media(max-height:520px)]` the list is a **two-column grid**: three rows
per column, 308px, no scrolling. Keyed on height rather than the `landscape`
variant, which a desktop monitor also matches. Row order across the grid is DOM
order, so the tab order and what a screen reader announces are unchanged.

**Verified** at 667×375, 844×390, 932×430, 390×844 and 1024×768: logo 130×37 at
every one, hamburger present below `lg` and absent at `lg`, the open menu fits
with no scrolling and all six rows ≥52px (over the 44px SC 2.5.8 minimum), 6
tabbable links, no horizontal overflow on any of the 7 routes, no page errors.
Build, Biome, ESLint and TypeScript clean.

**The sticky mobile CTA stays `md:hidden`, deliberately** — it was not moved to
`lg` with the rest. An 80px bar would take 20% of a 390px landscape screen, and
the navbar's own "Book a call" is visible at every width, so nothing is lost.
`app/layout.tsx`'s `pb-20 md:pb-0` is the reservation for that bar and matches it
exactly; the two have to stay on the same breakpoint as each other.

## Leadership section — ProfileCard

The `/about` leadership grid uses React Bits' **ProfileCard**, ported to
TypeScript at `components/ui/profile-card.tsx` with its CSS beside it. Five
deviations from upstream, all commented at the point of change:

- upstream's `:root` custom properties are scoped to `.pc-card-wrapper` —
  `--icon`, `--grain` and `--card-radius` would otherwise collide with
  `styles/globals.css`
- the rAF loop stops once the tilt settles; upstream kept it running for as
  long as the document had focus, which is four permanent loops on this page
- `handle` renders verbatim rather than prefixed with `@`, so it carries the
  area a founder owns ("Architecture") instead of a social username
- `avatarFallback` renders initials. All four founders have photographs as of
  5 August, so nothing uses it today — kept as the honest fallback for a founder
  who joins before a portrait exists
- **the whole hover treatment is desktop only**, added 6 August. Upstream assumes
  a hover pointer exists. It does not on a phone, where `pointerenter` and
  `pointermove` fire from a tap or a drag, so the card tilted while a reader was
  trying to scroll past it, and `:hover` then *stuck* — leaving the behind-glow
  on for good, the holographic sweep frozen on `animation-play-state: paused`,
  and the settle transition disabled, all with the pointer stuck at the centre.

  Two halves, and both are needed. `profile-card.tsx` attaches the three pointer
  listeners only under `(hover: hover) and (pointer: fine)`, read inside the
  effect so the server and first client render still agree. `profile-card.css`
  gates all three `:hover` rule groups on the same query — including their
  `.active` halves, which is safe because `.active` is added only by
  `handlePointerEnter`, so on a touch device neither half can match.

  The one-time intro sweep is deliberately left on: it is a mount animation
  rather than an interaction, and `enableTilt` already withholds it under
  reduced motion. Verified by tapping a card on an iPhone 13 profile — rotation
  unchanged, `--card-opacity` still 0, sweep still `running` — while a desktop
  hover still tilts (5.9deg / −4.9deg) and lights the glow.

Site-specific styling lives in a marked block at the bottom of
`profile-card.css`, under `.founder-profile-card`. It retunes the holographic
sweep from upstream's rainbow to violet (the palette is violet only — delete
that block to restore the spectrum), sizes the card from its column width
instead of `svh`, and shrinks the pattern tile (see below — there is now one
tile per ownership area rather than one shared). The user-info bar is off:
upstream fills it with a social handle, a status and a contact button, and none
of those have a truthful equivalent for a founder here.

Reduced motion is honoured — `enableTilt={!reduceMotion}` plus a
`prefers-reduced-motion` block that stops the two infinite decorative loops.

### One pattern per ownership area

Added 5 August. `iconUrl` was one shared tile on all four cards; each founder
now gets a tile carrying the glyph for the area they own — a navigation arrow
for Direction, a checklist for Operations, a portal for Architecture, angle
brackets for Engineering. They live in `public/founders/pattern-<area>.svg` and
are mapped in `components/Founders.tsx`, keyed by `shortRole`, the same way
`BusinessChallenges` keys its icons: the config stays copy the client can edit,
and reordering it cannot silently mismatch the glyphs.

Three things that decide whether a replacement tile works:

- **These are luminance masks, not icons.** `.pc-shine` shows the holographic
  sweep wherever the tile is white and hides it wherever it is black, so a tile
  is a black-backed SVG of 8px blocks. A coloured icon dropped in here renders
  as its own brightness, not its own colour, and a tile with no black at all
  floods the whole card with sweep.
- **White coverage is the brightness dial**, and it is held between 8.9% and
  11.6% across the four against the 8.9% of the tile they replaced. The first
  attempt let Architecture reach 18.7%, which made that one card visibly
  brighter than its neighbours — on a section about four *equal* founders, that
  reads as a ranking.
- **A 5x5 grid only carries silhouettes.** A cog was tried for Operations and
  reads as an ambiguous blob at `mask-size: 46%`; the checklist that replaced it
  is legible because its outline is distinctive, not because it has more detail.
  Test a new glyph on the card, not in a viewer.

The map falls back to the original shared tile for an unrecognised area, which
degrades to the old look rather than to no mask — see the first point for why
that matters.

### Preparing a founder portrait

**The card needs a cut-out portrait, not a photograph.** Upstream's avatar is a
PNG with a transparent background that sits on the card gradient; feed it a
plain rectangular headshot and it reads as a photo pasted onto a card.

`scripts/lift-portrait.swift` does the whole conversion, using two Vision
passes — no dependencies to install, and nothing leaves the machine:

```
swift scripts/lift-portrait.swift assets/founders/sinan.webp /tmp/sinan.png
cwebp -q 84 -alpha_q 95 -m 6 /tmp/sinan.png -o public/founders/sinan-cutout.webp
```

Then point `founders.people[].photo` in `config/content.ts` at the `-cutout`
file. `cwebp` is Homebrew's `webp` package — ffmpeg here has no `libwebp`
encoder, so it can't do this step.

What the script does, and why each part is there:

- **Subject lift** (`VNGenerateForegroundInstanceMaskRequest`) — the same
  foreground mask as Preview's "Copy Subject". Edge quality on hair is good.
- **Face-anchored normalisation** (`VNDetectFaceRectanglesRequest`) — every
  portrait is scaled so its face is the same width and sits at the same height
  on a fixed 620×863 canvas (the card's 0.718 aspect). This is what makes
  photographs shot in different settings at different crops sit consistently in
  a row of identical cards, and it is why the CSS has *no* avatar rules: the
  image is already composed to the card.
- **Blended horizontal placement** (`alphaCentreX`, `SUBJECT_WEIGHT`) — the face
  governs scale and height outright, but left-to-right position is half face and
  half body, because a subject at 3/4 is not symmetric about their own face and
  centring either one alone throws the other off. Measurements below.
- **Per-image bottom fade** — each of these is a tight head-and-shoulders crop,
  so the torso is cut off by the original frame, and lifting the subject turns
  that into a hard slice floating on the card. The fade is applied over the
  bottom of the *source* frame, which is exactly where the cut is. A fixed fade
  in CSS could not do this: once each subject is scaled to a common face size,
  they all end at different heights.

The un-lifted originals live at `assets/founders/<name>.{webp,png}` — outside
`public/`, because they are build inputs and everything in `public/` is served
to the world. Only the `-cutout` files ship.

Verified on a production server at 1440/900/390 px: no hydration errors, and
the section screenshotted at all three.

---

## AI Skill Guide — rebuilt on the house design language, 11 September 2026

`/resources/ai-skill-guide` (`app/resources/ai-skill-guide/`), linked from the
footer's Resources column. A free guide: copy a prompt, attach your proposal
template, get back a reusable Claude Skill that regenerates it. The commercial
half is the done-for-you card, which opens WhatsApp.

The page had been built outside the design language and had drifted a long way
from it. What it was doing, all of which is now gone:

| Was | Now |
| --- | --- |
| A solid violet gradient copy button | `CTAButton` — the one treatment. A solid violet fill was tried once before and rejected as off-standard; see HANDOFF's design-language notes |
| Emerald / blue / cyan / amber / fuchsia accents | Violet only |
| `rounded-2xl`, `duration-300`, three raw hex literals | `rounded-tile\|card\|panel`, `duration-fast\|base`, `@theme` tokens |
| A bespoke section header | `components/ui/section-header.tsx` |
| Every section carrying its own `px-*` | The page owns the gutter, as everywhere else |
| Its own bar fixed to the bottom on phones | Desktop only — it sat on top of `StickyMobileCTA`, which is fixed to the same edge |
| Sub-12px text in several places | Nothing below 12px |
| The 400-line prompt inline in the page | `app/resources/ai-skill-guide/prompt.ts` |

Cards are the two house treatments and nothing else: the dashed card for
prerequisites, steps and plans, the `card-top → card-mid → card-bottom` surface
for the proposal card and the done-for-you card.

### Proposal only — the other five document types are commented out

The Supported documents section used to offer six types (proposal, invoice,
quotation, SOW, report, custom) behind a pill row, and **all six copy buttons
handed over the same text**. That text is proposal-specific and not incidentally
so: 25 uses of the word across 23 lines, an opening line telling Claude a
proposal PDF was uploaded, an instruction to name the output a "Proposal
Generation Skill", and a Phase 5 commercial intake demanding project cost,
payment structure and proposal validity — wrong for an invoice, meaningless for
a report. Picking Invoice and copying gave you a prompt for the wrong document,
under a heading reading "Invoice Skill".

So the section is scoped to proposals, and the page copy with it. **The other
five types are kept in the file, commented out, not deleted.** Restoring one
means uncommenting four things, each marked in place:

1. its entry in `documentTypes`
2. its icon in the `lucide-react` import (`BarChart3`, `FileCheck`, `Receipt`)
3. the pill row in the Supported documents section
4. the `selectedDocId` state in `AISkillGuidePage`

Then put the multi-document wording back in the section header and the card
eyebrow back to "Most popular". **Do not restore a type without writing it a
prompt of its own** — that is the whole reason they came out.

### Deliberately left generic

- **The page title and h1** still say "document template". A proposal is one, so
  it stays true, and narrowing it trades search reach for precision the body
  copy already supplies.
- **The WhatsApp enquiry message** still says "business document". That button
  goes to the done-for-you service, which is delivered by hand and is not
  limited to proposals.

### Verification

Against a production build, `reducedMotion: "reduce"`, Playwright from a scratch
directory per the HANDOFF workflow: **0px horizontal overflow at all 14 widths
from 320 to 1440**, one `<h1>`, no sub-12px text, and axe-core clean at 375 and
768 once the reveal animations settle. Format, ESLint, TypeScript and build all
pass. Deploy confirmed live by fetching the new meta description from
droxdev.com, not just from the local build.

Two axe findings remain at 1440 and **neither belongs to this page**: the
navbar's `.effect.text` hover layer reads as black-on-black, and `<nav>` has no
accessible name while a second nav landmark exists. Site-wide, still open.

Also site-wide and deliberately untouched: the dashed card's corner dashes
render unevenly where the 2px border meets the 32px radius. That is how the
browser draws it, so `/pricing` and `WhyChooseUs` show the same thing. Asked
about, told to leave it.

Commits: `ef1e6ac` (rebuild), `d0b64c2` (proposal-only), `0f034fb` (copy).

## Blocked on the client — needs input before these can ship

1. **Droxlink case study.** Copy is written (profile p.20). Needs:
   - a real screenshot at `public/projects/droxlink.webp` — the old `drox1.png`
     was a mockup of droxdev.com itself, not Droxlink, and has been removed
   - the permanent URL (currently `grb-soft-web.vercel.app`, a Vercel preview
     subdomain — reads as unfinished on a portfolio)
   - **is it client work or an own product?** Profile p.20 files it under
     "Selected Work"; `config/content.ts` milestones call it an own product.
     Pick one.
2. **Alfa delivery timeline** — `TODO` in `caseStudies`. "X weeks from first
   conversation to first live event" is the next thing a buyer asks.
3. **Legal entity name, registration number, postal code** — `TODO`s in
   `app/privacy/page.tsx`, `app/terms/page.tsx` and the Organization JSON-LD in
   `app/layout.tsx`. Enterprise procurement asks for these specifically.
4. **Liability clause** (`app/terms/page.tsx` §13) needs a solicitor's review
   under Indian law.
5. **Indicative price bands.** Declined for now. The models are structured so a
   `startingFrom` field drops into `config/content.ts` and renders without any
   page-code change.
6. ~~**Cal.com event type.**~~ ✅ **done 5 August.** Live at
   `cal.com/droxdev/scoping-call`; `siteConfig.booking.calLink` is
   `"droxdev/scoping-call"`. Verified against the live event type — the thing
   that had never been tested: `/contact` renders the inline embed, the homepage
   closing CTA reveals it on click, and the sticky mobile bar links to
   `/contact#book`. `cal.com/droxdev/scoping-call` returns 200, no page errors.

   Configured on Cal.com: 30 minutes, Cal Video (a unique room per booking, not
   a fixed link), `Asia/Kolkata`, 2-hour minimum notice, 15-minute after-buffer,
   60 business days of future bookings, one active booking per booker. The
   `/droxdev/15min` event is off so the public profile offers one action.

   **`duration` and `label` in `config/site.ts` are copy, not configuration** —
   Cal.com never reads them. If the event length changes on Cal, change them by
   hand or the site will advertise a length it doesn't book.

   Bookings land on **droxdev100@gmail.com**. A `@droxdev.com` mailbox would
   read better on an invite sent to an enterprise buyer; needs Workspace or
   another domain mailbox.
7. **Discovery Sprint commercial terms.** The offer ships without a fee, which
   matches the site's existing "we don't publish a rate card" position — the
   promise is *"fixed, agreed in writing before it starts"*. Two decisions left
   to the client: (a) whether to publish an actual number, which would make the
   offer considerably stronger — add a `fee` field to `discoverySprint` in
   `config/content.ts`; (b) whether the sprint fee is credited against the build
   if the client continues. That's a standard and attractive term, but it's a
   real commitment so it was not written on their behalf.
8. **Two weeks** is the sprint duration taken from the audit's recommendation.
   Confirm it's the duration the team can actually hold to.
9. ~~**Founder photographs.**~~ ✅ **done 5 August. All four founders now have
   one**, shot in a single sitting to the brief this file had been asking for
   since the section was built: studio portrait, head to waist, black suit on a
   dark background.

   This closes the longest-standing item on the list. Sinan Thadathil's card was
   an initials block from the day it shipped — `avatarFallback` and the
   `photo: null` branch in `config/content.ts` exist because of it. **Both are
   still in place**, deliberately: they are the honest fallback if a founder
   joins or leaves before a new photograph exists, and they cost nothing.

   Every card now fills to the bottom edge instead of fading out two-thirds
   down, and the four read as one set rather than four unrelated photographs.
   That was the thing no code change could fix — the pipeline can normalise
   scale, height and position, but it cannot add torso that was never in frame.
   The subject lift handles black-on-black cleanly, so a dark background is not
   a problem for it.

   Sources are `ziyad.png`, `rahib.png`, `sinan.png` and `ajnas.png`, ~1.8 MB
   each; the old ~10-19 KB `.webp` originals they replaced are deleted, so there
   is exactly one source per founder. Nothing in `assets/` is served — it is
   outside `public/` — so the 7 MB is repo weight only, but converting them to
   WebP would cost nothing and is worth doing next time this folder is touched.

   ### Horizontal placement: a blend of the face and the body

   Changed 5 August, in `scripts/lift-portrait.swift`. Scale and *vertical*
   position are still anchored purely on the face — that is what puts every face
   at the same size and height across a row of identical cards, and it is
   untouched. Horizontal position is now `SUBJECT_WEIGHT = 0.5` of the way from
   the face towards the lifted subject's own centre.

   It has to be a blend because **neither end works alone on a 3/4-turned
   subject**, where the face sits well off the body's centre. All three of these
   poses are turned. In canvas px from centre:

   | `SUBJECT_WEIGHT` | face offset | body offset | |
   | --- | --- | --- | --- |
   | 0 — centre the face | 0 / 0 / 0 | +81 / −40 / +26 | Rahib's shoulder clipped flat at `x = 0` |
   | 1 — centre the body | −81 / +40 / −26 | 0 / 0 / 0 | 121px spread of face positions |
   | **0.5** | **−41 / +21 / −13** | **+42 / −21 / +14** | nothing clipped |

   (Ziyad / Rahib / Ajnas — the three measured before Sinan's arrived. Sinan
   stands nearly square, `shift=-19px`, and lands at face +10 / body −10, so he
   would have been fine under any weight. He is not evidence either way.)

   Each end fixes one alignment by breaking the other; 0.5 bounds both at
   roughly half of either. This was found the hard way — body-centring was
   shipped first, and it produced a visibly better *row* while quietly pushing
   Ziyad's face 81px off centre, which is worse on a card whose subject is a
   face. **Measure the face position, not just the bounding box.**

   Vision returns a bounding box for the *face* but not for the lifted subject,
   so `alphaCentreX()` measures the alpha channel directly, sampled at 256px
   wide (this only places the subject, where 2-3px is invisible, and it avoids
   rendering a 1024x1536 portrait into a 6 MB buffer to answer one question).
   The alpha threshold is 24/255 — the lift leaves a faint halo around hair, and
   counting it would widen the box by however far that halo happens to reach.

   The script prints `shift=` per image: how far the subject's centre sits from
   the face, in canvas px, i.e. how much of a turn the pose has. It was
   81 / −42 / −19 / 26 across the four. That is the number to look at if a
   portrait lands off-centre.

   **Verified across all four:** face width 153–156px and face top 328–330px, so
   the face normalisation survived the change; no cut-out touches a canvas edge;
   all four reach the bottom of the canvas; no broken images, page errors or
   overflow at 1440 and 390px.

---

## Still outstanding — Priority 4 onward

### Accessibility — WCAG 2.1 AA clean, 5 August

Measured with **axe-core 4.12** across all 10 routes at 1440px and 390px:
**0 Level A/AA violations**, down from 327 nodes.

| Was | Fix |
| --- | --- |
| 314 nodes, `color-contrast` | One colour. `text-gray-500` = `#6a7282` failed at 4.06–4.30:1 against the site's dark backgrounds; needs 4.5. Replaced with `text-gray-400` (`#99a1af`), already used widely here, which clears 7.56:1 worst case. 23 declaration sites — descendants like the footer address inherited it. |
| 8 nodes, `link-name` | The social icon links on /contact render an icon and no text, so a screen reader announced "link" and the URL. Given `aria-label` from the name already in their data. |
| 5 nodes, `aria-hidden-focus` | LogoLoop repeats its logos and marks every copy after the first `aria-hidden`, but their links stayed in the tab order — keyboard users tabbed through the same logos three times, into content screen readers were told to ignore. Copies now get `tabIndex={-1}`. |

Two further fixes not caught by axe:

- **Forced colours.** Windows High Contrast Mode cannot replace a gradient
  painted *through* glyphs — `-webkit-text-fill-color: transparent` survives, so
  all 11 `.gradient-line` headings rendered as blank space. A
  `@media (forced-colors: active)` block hands the text back to `currentColor`.
  Verified with Playwright's `forcedColors: "active"`: 0 of 11 invisible, and
  all 11 still gradient-filled in normal mode.
- **Minimum text size.** Footer legal line and testimonial roles were 11px and
  10px on mobile; the hero mockup had 10px body copy. All now ≥12px, verified
  live at both viewports.

**How this was measured matters.** The first attempt was a hand-written pixel
sampler and it was wrong — it reported 386 failures including obviously-fine
white-on-black text, because `getComputedStyle().color` returns `lab()` here
(Tailwind v4) and the parser read lightness/chroma/hue as RGB. Convert colours
via a canvas readback, or use axe. Don't hand-roll this.

### The manual pass axe cannot do — also 5 August

axe reports 692 `color-contrast` nodes as **incomplete**, not passing: it cannot
measure text over video or gradients. Those were measured directly, sampling
rendered pixels under each glyph. **648 text runs across 7 routes, 0 below
threshold** after four fixes:

- **The mockup panels were `bg-transparent`** over the hero's violet glow, so
  their text sat on whatever colour happened to be behind — up to
  rgb(173,120,234), where even pure white manages only 3.16:1. Given a dark
  translucent surface, which keeps the glass look.
- **`text-violet-500` on /contact** was 4.42:1 against that card. Now
  `violet-400`, 6.83:1.
- **The giant footer "DROX" watermark** at 3% opacity was an `<h2>` — in the
  heading outline and announced as a section title. Now a decorative `<div>`
  with `aria-hidden`.
- **FAQ accordion** passed `aria-label` to HeroUI, which puts it on a roleless
  `<div>` where screen readers ignore it. Removed; `title` already supplies the
  accessible name.
- **Decorative videos** (hero black-hole, /about silk) marked `aria-hidden` —
  silent and uncontrolled, so a caption has nothing to convey.

**How to redo this pass** (`contrast2.mjs` pattern): convert colours with a
canvas readback, never a regex — Chromium returns `lab()` here. Sample
`Range.getClientRects()` for the text node, not the element box, or padding over
a different surface pollutes the reading. Screenshot with glyphs made
transparent so what you measure is genuinely what is behind them.

**Still open, disclosed on /accessibility:** no screen-reader pass yet
(NVDA / JAWS / VoiceOver). That one needs a human with a screen reader — it
cannot be automated, and until it is done conformance should not be claimed.

**The 30 September 2026 target date was removed from the page on 5 August, by
decision.** The page names the open item and commits to updating itself when
the pass is done — a commitment without a date, rather than no commitment. The
argument for keeping one was that a dated commitment reads as credible in
procurement and is what made the rest of this work happen; the argument against
is that a missed date on a public page is worse than no date. That was the
client's call. If a date goes back on, it should be one that will be met.

`/accessibility` was rewritten to match: the four old items are gone (two were
already fixed and the page was understating the site — the skip link is in the
root layout and present on 9/9 routes, and the Services process steps are real
buttons that respond to focus), and the two genuinely open items above carry the
30 September date.

### The hero artwork's edges — fixed 5 August

Reported from a phone: the black-hole video read as a lighter rectangle with
visible margins down the left and right. **Two separate causes**, and the first
fix addressed the wrong one — worth reading before touching this again.

**1. The visible one: the hero section's `px-5` was clipping the artwork.**
`components/Hero.tsx` puts 20px of horizontal padding on the section, and the
artwork's clipping container inherited it — 374px wide inside a 414px phone,
leaving 20px of bare page background on each side. That is what the report was
pointing at.

The container now carries `-left-5 -right-5` to cancel that padding, and the
wrapper above it is `overflow-x-visible overflow-y-clip` so the artwork can
escape horizontally while still being clipped vertically, where it is 560px tall
in a container sized by the mockup. `clip` on one axis with `visible` on the
other is a legal pair; `hidden` is not — it forces the other axis to `auto` and
would add a scroll container.

**Negative margins rather than `w-screen`.** 100vw includes the scrollbar, so on
a desktop with classic scrollbars it is wider than the page and would put back
the horizontal overflow removed from the homepage the same day. The section's
padding is `px-5` at every breakpoint, so cancelling it exactly needs no
viewport units. **If that padding changes, this has to change with it.**

**2. The subtle one: the video's black is not the page's black.** The artwork is
a fixed 1200x800 composition scaled per breakpoint, so at most viewports it is
narrower than the screen anyway — side gaps of 20px at 640, 60px at 900, 120px
at 1440. Its own black is `rgb(4,0,20)`; the page is `rgb(0,0,20)`. Four levels
of red across a hard edge: invisible on a monitor, visible on an OLED phone in a
dark room.

`.black-hole-video` in `styles/globals.css` fades the outer few percent of each
edge. A narrow linear fade per axis composited with `mask-composite: intersect`,
deliberately not one radial — a radial wide enough to reach the corners also
dims the halo, which is the point of the artwork.

**Verified:** the artwork band is now exactly the viewport width at 390, 414,
430, 640, 768, 1024 and 1440 with 0px gutters and no horizontal overflow; the
colour step either side of the edge is ≤1 level, down from 4, sampled rather
than eyeballed because 4/255 is not something looking at it will settle. Halo
unchanged, reduced motion still withholds playback (paused, 0 particles).

**The lesson: the first fix was measured against the wrong boundary.** Sampling
was done either side of the *video element*, which is 840px wide and overflows
the phone, so it found only the colour difference. The thing actually on screen
was the *clipping container* two levels up, at 374px. Walk to the element that
clips before deciding what a user is seeing.

**Still open, and a design decision rather than a bug:** the scale sequence is
`0.7 → sm:0.5 → md:0.65 → lg:0.85 → xl:1.0`. It is **not monotonic** — the
artwork is *smaller* on a 640px tablet than on a 390px phone, then grows again.
Every other step increases with the viewport, so `sm:scale-[0.5]` looks like a
typo, but changing it resizes the hero at those widths and that was not asked
for. The masked edges mean it no longer produces a visible seam either way.

### HowWeWork — why stepping through the stages felt laggy, 6 August

Reported as "1 and 2 are smooth, after 2 it lags". Two separate things.

**Stage 01 is active by default** (`useState(0)`), so tapping it does nothing at
all — measured, no size change. That is half of "smooth". Stage 02 is the first
real transition.

**There is no worsening with position.** Dropped frames per tap, iPhone 13
profile at 6x CPU throttle:

| | 02 | 03 | 04 | 05 | 06 | 07 |
| --- | --- | --- | --- | --- | --- | --- |
| tapping at a natural pace (250ms apart) | 35% | 44% | 33% | 30% | 47% | 45% |
| letting each settle first (1.2s apart) | 13% | 11% | 12% | 24% | 14% | 14% |

Every transition costs the same. What changes is whether the previous one has
finished — tapping before it settles roughly doubles the cost, and by stage 3 a
reader never gets a clean one again. Controls: idle 0%, scrolling the page 4%.
So the section really was five times ordinary page work.

**The cost is the stacked layers.** Each strip has six full-bleed absolutely
positioned layers, and a transition cross-fades all six in the outgoing strip
and the incoming one while both boxes resize — twelve full-size layers
repainting per frame. Isolated by hiding them at runtime:

| | dropped |
| --- | --- |
| `flexGrow` alone | 11% |
| \+ the two text layers | 20% |
| \+ the four decorative layers | 29% |

**Ruled out, so nobody repeats them:** the spring (a bounded tween measured
identically — 26% vs 24% median over three runs), the rounded clip (no change),
`will-change: opacity` (42% vs 45%, inside the noise), `contain: paint` (*worse*,
72%), and layout itself — 102ms against 798ms of style recalc, and that recalc
turned out to track frame count rather than drive anything.

**Fixed by dropping the two blurred glows below `md`** — 288px and 256px boxes
under 70px and 80px blurs, the expensive pair. Paired within-session A/B,
alternating conditions to cancel drift: **50% → 42% dropped, all four pairs
favouring the change.** Real but modest; measure this way, because run-to-run
variance across page loads (20–31% for one identical build) is wider than the
effect and a naive before/after will show nothing.

**The glows were also carrying most of the violet.** Without them the open stage
fell back to the bare gradient and read as near-black, barely distinguishable
from a closed row — a bigger loss than the bloom. The surface layer's first stop
is `violet-950` below `md` to put the colour back into a layer that is already
being painted, so it costs no extra layer. Desktop keeps the original stops and
both glows.

### The site rendering white — fixed 6 August

Reported as "the site looks white". **Two independent causes**, and the first
fix found only one of them. The second is the one that was actually being looked
at, and it was not a flash — it was permanent.

#### 2. A stored theme preference, which is permanent

`next-themes` honoured a stored `theme` of `"light"`, or `"system"` on a machine
whose OS is in light mode, and applied `class="light"`. Measured against a local
production build:

| stored `theme` | `<html>` class | body background |
| --- | --- | --- |
| *(none)* | `dark` | `rgb(0,0,20)` |
| `light` | `light` | **`rgb(255,255,255)`** |
| `system`, OS light | `light` | **`rgb(255,255,255)`** |
| `dark` | `dark` | `rgb(0,0,20)` |

**There is no light design to fall back to.** Every surface here is built dark —
white text on violet and near-black — so a light background is not an
alternative theme, it is a broken page. And it was permanent: the theme switcher
was deleted in the P4 unused-component sweep, so a visitor in that state had no
way back. This predates the palette change below; when the light values lived on
`:root`, `class="light"` produced exactly the same white page.

`forcedTheme: "dark"` in `app/layout.tsx` now makes next-themes ignore both the
stored value and the OS. Verified: all four rows of that table render
`rgb(0,0,20)`. **Remove it the day a real light palette exists, and not before.**

#### 1. A white flash before the theme script ran

Also real, on every single page load, and fixed in the same session.

next-themes adds `class="dark"` from an inline script, and the server sends
plain `<html lang="en">`. The **light** palette was on `:root`, so between first
paint and that script running, every page was **white with black text**. On a
desktop that is a blink; on a phone on mobile data it is the first thing a
visitor sees. Confirmed by loading with JavaScript disabled, which is exactly
the pre-script state: `body` computed to `rgb(255,255,255)`.

The real palette now lives on `:root` itself, with `.dark` kept alongside so the
class next-themes adds still resolves, and light moved to `.light` — the class
it would add if the theme switcher is ever restored. `color-scheme: dark` comes
with it so form controls, scrollbars and the overscroll area are right before
the script runs too. With JavaScript disabled the body is now `rgb(0,0,20)` on
every route.

**Test this by disabling JavaScript, not by watching the page load.** The flash
is too short to catch by eye on a fast connection, and it does not show up in
any screenshot taken after load — which is why it survived every check in this
file until someone looked at the site on a phone.

**Still true, and a separate problem:** with JavaScript disabled the page renders
the navbar and nothing else, because the content animates in from `opacity: 0`
under `motion`. So the sequence a slow connection sees is now dark-but-empty
rather than white-then-content. Fixing that means not starting hero content at
zero opacity, which is a larger change than this one.

### Favicon, and how the site looks in Google — 6 August

**The favicon was invisible in search results.** The source mark is transparent
RGBA and its arms fade to near-white; Google draws favicons on a **white** chip,
so the white simply disappeared and the mark rendered as four unconnected violet
dots. It read as a site with no favicon at all.

`scripts/make-favicons.mjs` now builds all three from
`assets/brand/mark.png` — run it and commit the output if the mark changes,
don't hand-edit `public/`:

| file | | |
| --- | --- | --- |
| `public/icon.png` | 512px | also serves as a PWA icon |
| `public/apple-touch-icon.png` | 180px | iOS home screen, link-preview services |
| `public/favicon.ico` | 16/32/48 | what Google fetches from `/favicon.ico` |

Three things it fixes. The mark is composited onto **`#030014`**, which is
`--color-canvas` — the chip reads as a piece of the site rather than a generic
black square; keep it in step with that token. It gets **10% padding**, because
Google, iOS and browser tabs all round or crop the corners and an edge-to-edge
mark loses its tips. And `favicon.ico` is now a **real ICO**: it used to be
`icon.png` under an `.ico` extension, byte-identical, PNG data in a file
claiming to be an icon resource. 59 KB → 4.5 KB.

**Two other things that search result exposed**, both still live in the DOM:

- The headline read **"DROX Logo"**, which was the navbar logo's `alt` text
  verbatim. Now `alt="Drox Dev"` — that image is the only content of a link to
  the homepage, so it is that link's accessible name too. The `<title>` itself
  has been correct since P1; Google's index is simply older than the rebuild,
  which only went live on 5 August.
- **The description was the hero mockup's placeholder copy** — "What is Drox
  Dev? They specialize in modern web technologies and create stunning,
  high-performance applications…", which is real indexable text inside
  `components/NoteMockup.tsx`. Google preferred it to the meta description.
  That is the generic agency language the copy work removed everywhere else,
  and it is the second-largest block of prose on the homepage. **Open:** the
  mockup is decorative, so its text should either read like a real note or stop
  being marketing copy about Drox. `aria-hidden` would not help — Google indexes
  it regardless.

### Square corners on iOS where a blurred glow sits — 6 August

Reported from an iPhone 14 Pro Max: a BusinessChallenges card rendered with
three rounded corners and a **square bottom-left**. That is exactly where its
violet glow is anchored (`-bottom-24 -left-20`, `blur-[70px]`).

**WebKit does not reliably apply a rounded `overflow: hidden` clip to a
composited child, and anything carrying a `filter` is composited.** The glow's
square bounding box punches straight through the corner.

**First attempt — `transform-gpu` on the clipping element. It did not work.**
The theory was that promoting the clipper to its own layer would make WebKit
apply the rounded clip on the compositor, where the child already lives. A
second device screenshot showed the square corner unchanged. Do not reach for
`translateZ(0)` for this again.

**The fix that holds: take the filter away.** In `BusinessChallenges` the two
glows are now `radial-gradient` backgrounds instead of `rounded-full` spans
under `blur-[70px]`. A gradient is the same shape with no filter, so nothing in
the card is composited and there is nothing left to escape the clip — the corner
is correct by construction rather than by compositor behaviour. It also drops
two 70px blurs per card, on three cards, out of every paint.

The geometry maps over directly, and the constants at the top of the component
show the working: a 256px disc at `-bottom-24 -left-20` centres 48px in from the
left and 32px up from the bottom, and a 70px blur is a 35px sigma, so the
falloff ends ~3 sigma past the disc edge. The stops trace that Gaussian — flat
through the core, **half** alpha at the disc edge, tail to nothing. Rendered
side by side in headless WebKit the two versions differ by a mean of 1.3/255 per
channel and never by more than 10.

Where the blur cannot be removed — a `<video>`, a `backdrop-blur` — the clip
itself is hardened with `clip-path: inset(0 round <radius>)` next to the
`overflow-hidden`. A clip-path applies to the layer rather than in software, so
it survives compositing. It has to be kept in step with the radius by hand,
including at every breakpoint where the radius changes:

| | clipping element | why it is still composited |
| --- | --- | --- |
| `BusinessChallenges` | the inner surface `<span>` | nothing, now — belt and braces for the hover opacity transition |
| `HowWeWork` | the stage `<button>` | two `blur-[70px]`/`[80px]` glows, `hidden md:block`; radius changes at `md` |
| `/about` mission + vision | the `p-[1px]` gradient-border wrapper | an `AmbientVideo` and a `blur-[80px]` glow |

**None of this reproduces in headless Chromium or headless WebKit** — neither
uses iOS's compositing path, and both rendered the corner correctly even before
the first fix. The only proof is a real device. If a rounded card ever shows one
square corner again, look for a filtered, videoed or transformed child anchored
to that corner before looking at the radius.

### Vision and Mission are the Company Profile's, verbatim — 6 August

**Decided by the client. Do not reword either without them.**

The P2 pass had rewritten the vision to *"To be the team businesses call first
when software has to actually work — and to still be maintaining it five years
later"*, on the grounds that "the world's most trusted technology partner" is
unearned for a firm founded this year and makes a buyer discount the specific
claims sitting beside it. That reasoning is still on the record and was put to
the client on 6 August; they chose the profile wording, because a website
saying something different from the Company Profile PDF a buyer is holding is
the worse problem. Both now read exactly as p.11.

**The trap that caused this to be missed:** the two statements were hardcoded in
`app/about/page.tsx`, while `aboutPage.mission` and `aboutPage.vision` sat in
`config/content.ts` holding *completely different* placeholder copy that nothing
rendered. Editing the config changed nothing on the page. The page now reads
from the config, and the config holds the profile text — one copy of each.

### The /about silk video now plays on mobile — 6 August

`AmbientVideo` used to return early below 768px, so the `src` was never attached
and the mission cards were flat on a phone while desktop got the silk sheen. It
looked broken; it was deliberate.

That guard was right when the file was **22 MB** — every phone paid for it before
the page settled, for an effect behind `opacity-60` and a `backdrop-blur-md`. The
re-encode to **407 KB** made the argument 54x weaker, so the guard is gone.
Reduced motion and the IntersectionObserver are untouched.

**Know what "lazy" buys you here: on mobile, nothing.** The mission card's video
sits at y=638 in a 664px viewport on an iPhone 13 — it is *on the first screen*,
so the observer fires at load and the 407 KB is fetched immediately. The lazy
path only defers it for someone who leaves /about without scrolling, which is
nobody. Treat this as 407 KB added to the /about mobile page weight.

**iOS Safari only gained WebM playback in 17.4.** Older iPhones get no video —
harmless, because the card's gradient is the fallback and the `play()` rejection
is already swallowed. If that ever matters, the fix is an MP4/H.264 sibling
`<source>`, not a different guard.

### Priority 4 — performance
- ~~**`prefers-reduced-motion`**~~ ✅ **done 5 August.** Was honoured in 8 of the
  24 files importing `motion/react`, with Lenis ignoring it entirely.

  Fixed centrally rather than file by file. **`<MotionConfig reducedMotion="user">`**
  in `app/providers.tsx` covers every `motion` component at once — transform and
  layout animations are dropped, opacity and colour still cross-fade. That split
  matters: killing opacity too would leave everything that animates in from
  `opacity: 0` permanently invisible. It also cannot rot, because a new component
  inherits it by existing rather than by someone remembering.

  Four things `motion` cannot reach, handled where they live:
  - **Lenis is not started at all** under reduce — `stop()` would leave it
    intercepting the wheel. A `change` listener handles the setting being toggled
    mid-session. The route-change scroll reset needed a `window.scrollTo`
    fallback, or navigation would land readers halfway down every page.
  - **The hero video** starts from an effect instead of an `autoPlay` attribute.
    Toggling that attribute client-side would change server-rendered markup and
    fail hydration; this way the element still paints its first frame, a static
    violet halo.
  - **The 50 CSS particles** are never created, not created and paused.
  - **A global CSS rule** collapses all keyframes and transitions to 0.01ms. Near
    zero rather than `none`, and iteration-count 1 rather than 0, so anything
    waiting on `animationend` still fires.

  Verified by comparing both modes on a real browser: Lenis present/absent, hero
  video playing/paused, 50 particles/0, specular canvases 3/0, and the page
  gliding after a wheel stops / not. Then swept all 10 routes scrolling top to
  bottom in both modes: **0 text blocks stuck invisible in either**, which is the
  failure this change could plausibly have caused.

  **`/accessibility` was updated in the same change** — it publicly listed this
  as an open issue with a 30 September target, so leaving it would have been a
  false statement on a public page. Motion moved from "known issues" to "what
  currently works"; the other four disclosed issues are untouched and still
  carry that date.
- Reduce hero particle count on mobile (120 React dots + 50 DOM particles).
  The 120 React dots now render server-side: they were generated with
  `Math.random()` in an effect purely to dodge a hydration mismatch, so they
  couldn't paint until after hydration. They use a seeded PRNG
  (`lib/seeded-random.ts`) instead, which removed the effect, the state and one
  full re-render. Same change in `black-hole-effect.tsx` and `feature-card.tsx`.
- ~~unused decorative SVGs in `public/`~~ ✅ **done 5 August** — deleted with the
  components that referenced them.
- ~~`--reflect-sub` defined only in `.dark`~~ ✅ **done 5 August.** It is now in
  `:root` too, mirroring `--muted-foreground` at the same 0.7 alpha. The bug was
  latent rather than visible: `theme-switch.tsx` was never rendered anywhere, so
  light mode is currently unreachable from the UI — the declaration was simply
  invalid and subtitle text inherited its colour.
- ~~Re-encode `public/video/silk-*.webm` (22 MB) to under 1 MB~~ ✅ **done
  4 August.** Now `public/video/silk.webm`, 407 KB — VP9, 1280×720, 30fps, no
  audio. The source was 1920×1080 at 60fps and 18.5 Mbps for a 10-second
  decorative loop that sits entirely behind a `backdrop-blur-md` at 60% opacity.
  It was also **H.264 inside a `.webm` container**, which is not a valid WebM
  codec — Firefox would not have played it at all, so this fixed a silent
  cross-browser bug as well as the weight. Verified no banding at 1:1 before
  replacing. `public/` went 26 MB → 4.6 MB.
- ~~`public/video/black-hole.webm` is 3840×2160 (739 KB)~~ ✅ **done 4 August.**
  Now 1920×1080, 265 KB — a 64% saving on a file that loads eagerly in the hero
  on every homepage visit. It was 4K rendered into a ~1200px container and
  carried an Opus audio track on a `muted` element. Encoded at CRF 28 rather
  than a smaller CRF 32 (187 KB) or a larger 2560×1440 (290 KB): the content is
  a soft violet halo on near-black, where upscaling is invisible but banding
  would not be, so the bits went to gradient headroom rather than resolution.
  Checked for banding at 1:1 and verified in-browser at DPR 2.

  Both videos together took `public/` from **26 MB → 4.1 MB**.

  Still outstanding on this element: the `<video>` in `prototype-img.tsx` is a
  raw `autoPlay` with no `prefers-reduced-motion` guard — it's part of the
  reduced-motion item above, not a video-weight problem.
- ~~Delete the unused components~~ ✅ **done 5 August.** Fifteen, not the eleven
  originally listed — a stricter check (matching `import` statements rather than
  the bare name, which had been matching prose) also caught `integrations`,
  `theme-switch`, `trusted`, `ui/section` and `ui/timeline`. **`ogl` stays** —
  it was unused when that note was written, but `components/ui/specular-edge.tsx`
  imports it now.

  `public/` went **4.2 MB → 1.0 MB**: the decorative SVGs, the Next.js starter
  leftovers (`next.svg`, `vercel.svg`), two stock laptop mockups that were never
  client work (`projects/project1.jpeg`, `project2.jpeg`) and the orphaned
  `projects/drox1.webp`. `favicon.ico` was flagged by the orphan scan but kept —
  nothing references it by name because browsers request `/favicon.ico` by path.
  Verified after: all 10 routes 200, zero broken images, zero console errors.

### Priority 5 — Design system
- ~~Consolidate 4 icon libraries~~ ✅ **done 5 August — 4 down to 2, and 2 is the
  floor.** `@tabler/icons-react` (9 icons) and `@phosphor-icons/react` (21) are
  uninstalled. **Client JS: 447 KB → 416 KB gzipped, −31.6 KB (−7.1%).**

  The rule now is **lucide-react for UI, react-icons/si for brand marks**, and
  the split is forced rather than chosen: lucide dropped most brand logos, so
  the tech-stack row (React, Next.js, MongoDB, Python, TypeScript, Tailwind,
  Figma, Node) has nowhere else to go. Lucide *does* still ship Github,
  Instagram and Linkedin, so those moved to it — but it has **no WhatsApp**, so
  `SiWhatsapp` stays. Check lucide first; only reach for react-icons when it has
  no mark.

  Three things that bite when doing this:

  - **Phosphor's `weight` prop does not exist in lucide.** Left in place it
    reaches the DOM as an invalid attribute. All `weight="bold|fill|regular"`
    were stripped; verified zero `[weight]` attributes render.
  - **Injected imports must go *after* `"use client"`**, which has to be the
    first statement in the file. A script that prepends imports silently breaks
    six files.
  - **Mixed icon types don't unify.** `socialIconMap` was typed
    `Record<string, typeof Github>`; a react-icons `IconType` is not assignable
    to a lucide `ForwardRefExoticComponent`. It is now typed by the props the
    call site actually uses.

  Verified: build, types and lint clean; icons render on /, /services, /about
  and /contact with no zero-sized SVGs and no invalid-prop warnings; the nine
  service cards and six value cards screenshotted.
- ~~Make colour tokens authoritative~~ ✅ **done 5 August.** 57 hex literals
  across 16 files replaced by **13 tokens**, declared in a Tailwind v4 `@theme`
  block at the top of `styles/globals.css`. They generate real utilities
  (`bg-canvas`, `border-hairline`, `from-cta-top`, `ring-offset-canvas`) and are
  also emitted as custom properties, so the same token works inside a gradient
  string where a utility cannot reach.

  Named by **role, not appearance**: `canvas`, `surface`, `surface-deep`,
  `surface-nav`, `surface-muted`, `surface-inset`, `hairline`,
  `hairline-strong`, the three `card-*` gradient stops and the two `cta-*` ones.

  **No brand-violet token, deliberately.** The violet is already named by
  Tailwind's own scale, which is what components use, and most remaining
  occurrences are `rgba(124,58,237,…)` inside shadow strings where a hex token
  cannot carry the alpha. A `--color-brand` would have been a second name for a
  colour that already has one.

  Three things worth knowing:

  - **Tailwind v4 tree-shakes unused `@theme` tokens.** An unused one resolves
    to nothing, not to its declared value — which is how the redundant brand
    token was caught.
  - **`components/ui/cal-booking.tsx` keeps a literal `#8b5cf6`.** It is handed
    to Cal.com's embed and ends up inside a **cross-origin iframe**, where a
    custom property from this document does not resolve. Tokenising it silently
    breaks the embed's branding. Keep it in sync by hand.
  - **react-icons renders `<svg role="img">`**, which axe requires to have a
    title; lucide omits the role and is decorative by default. The four
    `SiWhatsapp` instances needed `aria-hidden` — their links already carry the
    accessible name. Swapping icon libraries can introduce accessibility
    findings that have nothing to do with the icon.

  **Verified as visually neutral**, which is the whole point of a refactor like
  this: all 13 tokens confirmed to resolve to the exact original hex in a live
  browser, and a full-page pixel diff of all 10 routes at two viewports —
  possible only because the site now honours reduced motion, so two runs are
  byte-comparable. 19 of 20 pages are pixel-identical. The 20th differs in one
  744x112 band on the homepage where the *before* image had the fixed navbar
  painted over the "What We Offer" heading; the live page renders that heading
  correctly at opacity 1 in both motion modes. Two runs of the same build are
  0.0000% apart, so the capture is deterministic — the before-image artifact is
  not explained, only bounded.
- ~~One radius scale; standardise motion durations and easings~~ ✅ **done
  5 August.** Ten radius values became **five plus `rounded-full`**, and the
  motion vocabulary — five CSS durations, six JS durations, four easings —
  became **three durations and two curves**. Both scales are `@theme` tokens in
  `styles/globals.css`, alongside the colour tokens.

  **Radius, named by what the element is rather than how round it is.** Every
  step is a multiple of 4px and the gaps widen as the surface grows, because a
  corner has to keep its share of an increasingly large box to read as the same
  shape:

  | Token | Value | Role | Was |
  | --- | --- | --- | --- |
  | `rounded-inline` | 4px | focus rings on inline text links | `rounded` |
  | `rounded-control` | 8px | icon buttons, the skip link, the scrollbar | 6, 8, 10px |
  | `rounded-tile` | 16px | inputs, icon tiles, list rows, FAQ rows | 12, 16, 20px |
  | `rounded-card` | 24px | cards, the nav pill, project imagery | 20, 24px |
  | `rounded-panel` | 32px | large feature surfaces | 28, 30, 32, 40px |

  **A radius is only what it says if the box is big enough.** A browser clamps
  `border-radius` to half the shorter side, so a 32px radius on a 52px-tall row
  renders as 26px — a pill, not a card. The `HowWeWork` strips hit this on
  mobile, where a closed row is 52px: they came out pill-shaped, and because the
  clamp lifts as the row grows to 312px, the corners visibly *unrolled* from pill
  to card during the open, which reads as a flicker. They are `rounded-tile` on
  mobile and `rounded-panel` from `md` up, where a closed strip is ~105px wide
  and well clear of the clamp. Check the shorter side before picking a step.

  These deliberately **do not overwrite Tailwind's own `--radius-sm … -4xl`**.
  HeroUI's components use those internally, and redefining them would move
  corners inside a dependency.

  **Motion.** `--transition-duration-fast|base|slow` (200/300/500ms) and
  `--ease-standard` / `--ease-entrance`, with the same numbers in seconds in
  **`lib/motion.ts`** as `DURATION`, `EASE` and `STAGGER` for `motion/react`.
  CSS and JS animate the same site, so a value on one side and not the other is
  how a scale comes apart — change one, change both. There is no `--ease-exit`:
  the two things that close reverse the entrance at a shorter duration, and an
  unused `@theme` token resolves to nothing anyway.

  Four things worth knowing:

  - **The biggest win was one line, not the sweep.** Tailwind's
    `--default-transition-duration` is 150ms, which is off the scale, and a bare
    `transition-colors` with no duration class lands on it — **94 elements on
    the homepage alone**, including HeroUI internals that no amount of sweeping
    this repo would have reached. It now points at `fast`. Like
    `<MotionConfig reducedMotion="user">`, it cannot rot: a `transition-colors`
    written next year is on the scale by existing, not by someone remembering.
  - **`SpecularEdge` takes its radius as a number in px** — the shader draws the
    corner itself and cannot read a class. `BusinessChallenges` passes `32`;
    keep it in step with `--radius-panel` by hand.
  - **700ms and 1000ms are gone.** They were hover transitions on photographs
    (the /about mission images, the project thumbnails) and simply read as lag.
    Both are `slow` now.
  - **`components/text-animations/BlurText.tsx` is orphaned** — nothing imports
    it. The P4 unused-component sweep missed it. Left in place because deleting
    a component is the client's call, but it is dead code.

  **Deliberately left off the scale**, so the claim below is bounded rather than
  absolute: the ported React Bits **ProfileCard**'s internal transitions
  (1s, 0.8s, 0.12s) are the physics of a pointer-tracking tilt, and **GooeyNav**'s
  `--linear-ease` is an overshoot curve baked into the particle effect. Neither
  is a UI transition. ProfileCard's *radius* did join the scale — its upstream
  30px now reads `var(--radius-panel)`, so the leadership cards match the
  mission cards directly above them on /about. Lenis's `duration: 1.2` is scroll
  physics, and the black-hole keyframes are multi-second decorative artwork.

  **Verified in a real browser, which is the only way this claim means
  anything.** Every element on all 10 routes at 1440 and 390px was queried for
  computed `border-radius`, `transition-duration`, `transition-timing-function`
  and `animation-duration`: **0 off-scale values** of any of the four. The radii
  in use across the whole site are exactly `0px, 4px, 8px, 16px, 24px, 32px, 50%`
  and `rounded-full`. Reduced motion still collapses everything to 0.01ms,
  including the now-token-driven `menu-item-in` animation. Build, ESLint, Biome
  and TypeScript clean; the only console error is the pre-existing 404 for
  `/_vercel/insights/script.js`, which only exists on Vercel.

  This is **not** a visually neutral refactor and was not meant to be — six
  surfaces went 40px → 32px, ten went 28px → 32px, the project thumbnails went
  16/20px → 24px and the /about icon tiles 20px → 16px.
- Three engineering blog posts (`/blog` was deleted — recreate when there's content)

### Contact form storage — decided against, 5 August

The form opens WhatsApp and keeps no record, and it will stay that way. The
client's position is that WhatsApp *is* the record. Weigh that against the known
failure mode before reopening it: a blocked popup, no WhatsApp on a corporate
laptop, or a closed tab loses the enquiry with no trace on either side.

Worth knowing what this decision buys, from the 5 August security review: the
site currently stores **nothing**. No database, no API routes, no server
actions, no Supabase (it was never wired in, despite an earlier note here
implying otherwise), no environment variables, no secrets in the repo or in git
history. Adding storage would be the first time client data lands on
infrastructure Drox owns, which brings RLS policies, a privacy-policy update and
a retention decision with it.
