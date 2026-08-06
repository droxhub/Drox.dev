/**
 * Builds every favicon from one source mark.
 *
 *     node scripts/make-favicons.mjs
 *
 * Run it after changing `assets/brand/mark.png`, and commit what it writes.
 *
 * Why this exists rather than a one-off export:
 *
 * The source mark is transparent RGBA and its arms fade to near-white. Google
 * draws favicons on a white chip, so the white simply disappeared and the mark
 * rendered as four unconnected violet dots — the site looked like it had no
 * favicon at all. Compositing onto an opaque background is the fix, and it has
 * to be redone from source every time the mark changes, which is what a script
 * is for.
 *
 * Three decisions worth keeping:
 *
 * - **`#030014`, not black.** That is `--color-canvas`, the page background, so
 *   the chip reads as a piece of the site rather than a generic dark square.
 *   Keep it in step with the token in styles/globals.css.
 * - **10% padding.** Google, iOS and browser tabs all round or crop the corners
 *   of a favicon; an edge-to-edge mark loses its tips to that.
 * - **A real `.ico`.** `public/favicon.ico` used to be `icon.png` renamed —
 *   byte-identical, PNG data behind an `.ico` extension. Browsers sniff it and
 *   cope; it is still a file claiming to be something it is not. This writes a
 *   genuine ICO container holding 16, 32 and 48px images.
 */

import { writeFileSync } from "node:fs";
import sharp from "sharp";

const SRC = "assets/brand/mark.png";
const BG = "#030014"; // --color-canvas
const PAD = 0.1;

/** Mark composited onto the opaque background, at `size` square. */
async function square(size) {
	const inner = Math.round(size * (1 - PAD * 2));
	const mark = await sharp(SRC)
		.resize(inner, inner, {
			fit: "contain",
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.toBuffer();
	const offset = Math.round((size - inner) / 2);

	return sharp({
		create: { width: size, height: size, channels: 4, background: BG },
	})
		.composite([{ input: mark, top: offset, left: offset }])
		.png({ compressionLevel: 9 })
		.toBuffer();
}

/**
 * A real ICO holding PNG-compressed entries — supported since Windows Vista and
 * by every current browser and crawler, and far smaller than raw BMP entries.
 *
 * Layout: a 6-byte ICONDIR, then one 16-byte ICONDIRENTRY per image, then the
 * image payloads. Offsets are absolute from the start of the file, so they can
 * only be computed once every entry's size is known — hence the two passes.
 */
function ico(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // 1 = icon
	header.writeUInt16LE(images.length, 4);

	let offset = 6 + images.length * 16;
	const entries = images.map(({ size, data }) => {
		const e = Buffer.alloc(16);
		e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
		e.writeUInt8(size >= 256 ? 0 : size, 1);
		e.writeUInt8(0, 2); // palette size, 0 for true colour
		e.writeUInt8(0, 3); // reserved
		e.writeUInt16LE(1, 4); // colour planes
		e.writeUInt16LE(32, 6); // bits per pixel
		e.writeUInt32LE(data.length, 8);
		e.writeUInt32LE(offset, 12);
		offset += data.length;
		return e;
	});

	return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const outputs = [
	// Referenced by `icons.icon` in app/layout.tsx. 512 so it can also serve as
	// a PWA icon and survive Google's own resizing.
	["public/icon.png", 512],
	// iOS home screen, and what several link-preview services reach for.
	["public/apple-touch-icon.png", 180],
];

for (const [path, size] of outputs) {
	writeFileSync(path, await square(size));
	console.log(`${path.padEnd(32)} ${size}x${size}`);
}

// 48 is included deliberately: Google's guidance is a square favicon that is a
// multiple of 48px.
const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of icoSizes) icoImages.push({ size, data: await square(size) });
writeFileSync("public/favicon.ico", ico(icoImages));
console.log(`${"public/favicon.ico".padEnd(32)} ${icoSizes.join(", ")}`);
