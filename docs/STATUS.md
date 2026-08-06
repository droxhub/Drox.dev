# Drox Dev site — implementation status

> Starting a fresh session? Read [`HANDOFF.md`](./HANDOFF.md) alongside this —
> it carries the traps (the ESLint/Biome split, the SSR inline-style hydration
> trap, the design language) that this file doesn't.

Companion to [`UX-AUDIT-2026-07-29.md`](./UX-AUDIT-2026-07-29.md) (Revision 2).
**Read this first** before picking up work — it says what's already shipped, so
the audit's roadmap isn't re-done from the top.

Last updated: **5 August 2026.**

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
| 22 MB `/about` video → lazy, desktop-only, reduced-motion aware | `components/ui/ambient-video.tsx` |
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
| TechStack, About vision, Projects heading rewritten | — |

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

`GooeyNav` is desktop-only again — it is no longer rendered below `md`, so the
wrap workaround added earlier was reverted.

Verified at 390 and 320px: six links present, no horizontal overflow, no
hydration errors; overlay inert when closed (0 tabbable links, `aria-hidden`)
and live when open (6); scroll locked at 4520px while open and restored after;
Escape returns focus to the toggle; sticky CTA hidden while open. Desktop still
one row of six with the overlay `display: none`.

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
