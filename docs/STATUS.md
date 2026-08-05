# Drox Dev site — implementation status

> Starting a fresh session? Read [`HANDOFF.md`](./HANDOFF.md) alongside this —
> it carries the traps (the ESLint/Biome split, the SSR inline-style hydration
> trap, the design language) that this file doesn't.

Companion to [`UX-AUDIT-2026-07-29.md`](./UX-AUDIT-2026-07-29.md) (Revision 2).
**Read this first** before picking up work — it says what's already shipped, so
the audit's roadmap isn't re-done from the top.

Last updated: **4 August 2026.** Nothing below is committed to git yet.

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
TypeScript at `components/ui/profile-card.tsx` with its CSS beside it. Four
deviations from upstream, all commented at the point of change:

- upstream's `:root` custom properties are scoped to `.pc-card-wrapper` —
  `--icon`, `--grain` and `--card-radius` would otherwise collide with
  `styles/globals.css`
- the rAF loop stops once the tilt settles; upstream kept it running for as
  long as the document had focus, which is four permanent loops on this page
- `handle` renders verbatim rather than prefixed with `@`, so it carries the
  area a founder owns ("Architecture") instead of a social username
- `avatarFallback` renders initials, for the founder with no photo on file

Site-specific styling lives in a marked block at the bottom of
`profile-card.css`, under `.founder-profile-card`. It retunes the holographic
sweep from upstream's rainbow to violet (the palette is violet only — delete
that block to restore the spectrum), sizes the card from its column width
instead of `svh`, and shrinks the pattern tile. The user-info bar is off:
upstream fills it with a social handle, a status and a contact button, and none
of those have a truthful equivalent for a founder here.

Reduced motion is honoured — `enableTilt={!reduceMotion}` plus a
`prefers-reduced-motion` block that stops the two infinite decorative loops.

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
- **Per-image bottom fade** — each of these is a tight head-and-shoulders crop,
  so the torso is cut off by the original frame, and lifting the subject turns
  that into a hard slice floating on the card. The fade is applied over the
  bottom of the *source* frame, which is exactly where the cut is. A fixed fade
  in CSS could not do this: once each subject is scaled to a common face size,
  they all end at different heights.

The un-lifted originals live at `assets/founders/<name>.webp` — outside
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
9. **Founder photographs.** Sinan Thadathil has none, so one leadership card in
   four is an initials block. The other three are handled: the subject is lifted
   out of each and face-normalised (see *Preparing a founder portrait* below),
   which neutralises the fact that they were shot in three unrelated settings at
   three different crops. Two things that pipeline can't fix — it needs a
   photograph to exist, and it can't add torso that was never in frame, so
   tight crops fade out partway down the card instead of filling it.
   Four headshots taken in one sitting — same framing, same neutral background,
   **head to waist rather than head and shoulders** — would still do more for
   this section than any further code change. Drop them at
   `assets/founders/<name>.webp`, 512px or larger, and run the script.

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
decision.** The page now names the open item without committing to a date. The
argument for keeping one was that a dated commitment reads as credible in
procurement and is what made the rest of this work happen; the argument against
is that a missed date on a public page is worse than no date. That was the
client's call. If a date goes back on, it should be one that will be met.

`/accessibility` was rewritten to match: the four old items are gone (two were
already fixed and the page was understating the site — the skip link is in the
root layout and present on 9/9 routes, and the Services process steps are real
buttons that respond to focus), and the two genuinely open items above carry the
30 September date.

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
- Consolidate 4 icon libraries (Phosphor, Tabler, Lucide, react-icons) to one
- Make colour tokens authoritative; replace ~90 hardcoded hex occurrences
- One radius scale; standardise motion durations and easings
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
