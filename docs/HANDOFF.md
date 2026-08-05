# Handoff — Drox Dev site

Rewritten 5 August 2026. Orientation for a fresh session: what to read, what
state things are in, what will bite you, and what to do next.

**It is not the status record.** [`STATUS.md`](./STATUS.md) is, and it is
current. Read it before touching anything.

---

## Read these first, in this order

1. **[`STATUS.md`](./STATUS.md)** — what shipped, what's blocked on the client,
   what's outstanding. Priorities 1–4 are complete; P5 is half done.
2. **[`UX-AUDIT-2026-07-29.md`](./UX-AUDIT-2026-07-29.md)** (Revision 2) — the
   22-section audit the whole roadmap traces back to.
3. The **Company Profile PDF** — 27 pages, *not in the repo*; the user supplies
   it. Source of truth for positioning, services, case studies and engagement
   models. Facts summarised in `.claude/skills/ux-audit/references/drox-context.md`.

Two traps inside the profile itself: p.5 says "2 projects delivered" and p.22
says "26+" (both true under different definitions — never present "26+"
unqualified), and p.8's vision claim is unearned for a firm founded this year.

---

## Current state

Build, lint, types, all 10 routes and the accessibility sweep are clean.

```
npm run check     # biome (format+imports) then eslint — both must pass
npx tsc --noEmit
npm run build
```

**The rebuild is on `main`.** Sixteen commits, fast-forwarded from
`site-rebuild` on 5 August — the two branches point at the same commit, so
`site-rebuild` can be deleted whenever you like.

**Nothing is pushed.** `origin/main` is still at `f99124e`, sixteen behind. That
is the whole rebuild sitting on one machine: everything in this file and in
STATUS, ten routes, the design system, four founder portraits. Pushing it is a
publishing decision — droxdev.com deploys from this repo — so it was left to
the client rather than done on their behalf.

```
git push origin main    # when the client is ready for it to go live
```

The working tree is clean.

---

## Things that will bite you

### 1. ESLint lints, Biome formats — `biome check` proves nothing about lint

Biome's linter is `"enabled": false`; the rules live in `eslint.config.mjs`.
**`npm run check` runs both** — use it.

- ESLint **9**, not 10 — `eslint-plugin-jsx-a11y` and `eslint-plugin-react` cap
  their peer range at 9.
- `eslint-config-next` bundles *and registers* the react / react-hooks /
  jsx-a11y / import / typescript-eslint plugins. Reference rules **by name**;
  adding a `plugins` block for any of them makes flat config throw.
- Put **no formatting rules in ESLint** — the formatter would fight them.
- `react-hooks/exhaustive-deps` is deliberately `off`. `react-hooks/refs` and
  `react-hooks/set-state-in-effect` are **on** and will reject patterns that
  third-party snippets use freely (assigning to a ref during render, calling
  setState in an effect body). Both have clean workarounds — see
  `specular-edge.tsx` and `navbar.tsx`.

### 2. Inline styles + SSR = a hydration trap

If you put a computed number into an inline style on a server-rendered element,
**round it**, and build `calc()` with the sign in the operator. The CSS parser
re-serialises inline styles: `width: 2.21784882619977px` reads back as
`2.21785px`, and `calc(50% + -361px)` becomes `calc(50% - 361px)`. Either fails
hydration. `fromCentre()` in `lib/utils.ts` exists for the second problem.

Same family: **never toggle a server-rendered attribute on the client.** The
hero video drops `autoPlay` and starts playback from an effect for exactly this
reason.

### 3. Decorative randomness is seeded, not random

`lib/seeded-random.ts` (mulberry32). Don't reintroduce `Math.random()` into
render output.

### 4. `framer-motion` is not installed

This project uses **`motion/react`**. Third-party snippets (shadcn, Skiper,
Aceternity, React Bits) will import `framer-motion` and fail the build.

### 5. Colours do not come back as `rgb()`

`getComputedStyle(el).color` returns **`lab()`** here (Tailwind v4). A regex
that assumes `rgb()` will read lightness/chroma/hue as if they were RGB and
give you confident nonsense. Convert with a canvas readback:

```js
ctx.fillStyle = css; ctx.fillRect(0,0,1,1); ctx.getImageData(0,0,1,1).data
```

This burned a whole contrast audit before it was caught.

### 6. Tailwind v4 tree-shakes `@theme` tokens

An unused token resolves to *nothing*, not to its declared value. If a token
reads as `#000000` in the browser, it is unused, not broken.

### 7. Two colours must stay literals

- `components/ui/cal-booking.tsx` — `brandColor: "#8b5cf6"` is handed to
  Cal.com's embed and lands in a **cross-origin iframe**, where a custom
  property from this document does not resolve. Keep in sync with violet-500
  by hand.
- `config/site.ts` — `booking.duration` and `booking.label` are **copy, not
  configuration**. Cal.com never reads them.

### 8. Icons: check lucide first

Four libraries became two. **`lucide-react` for UI, `react-icons/si` only when
lucide has no mark** (the tech-stack logos, and WhatsApp — lucide has none).
Lucide *does* still ship Github, Instagram, Linkedin.

- Lucide has **no `weight` prop**. Left on, it reaches the DOM as an invalid
  attribute.
- react-icons renders `<svg role="img">`, which axe requires to have a title;
  lucide omits the role. Decorative react-icons need `aria-hidden`.

---

## Verifying visual work

Playwright + Chromium are installed (`~/Library/Caches/ms-playwright`). The
`playwright` package is **not** a project dependency — install it in a scratch
directory. **Do not add it to `package.json`.**

Workflow: `npm run build` → `npx next start -p 3111` → drive with Playwright →
`pkill -f "next start -p 3111"`.

**The pixel-diff harness is the useful part.** Because the site now honours
reduced motion, two runs of the same build are byte-identical, so a full-page
before/after diff across all routes actually means something. Screenshot with
`reducedMotion: "reduce"`, `fullPage: true`, then compare with `pngjs`. This is
how the colour-token refactor was proved visually neutral. Two caveats: the
fixed navbar can appear painted into a full-page capture at an unpredictable
band, and `axe-core` is the right tool for accessibility — do not hand-roll a
contrast checker.

---

## Design language — match it, don't invent

Two card treatments, and both are deliberate:

- **The dashed house card** — `rounded-panel border-2 border-dashed
  border-default-200 bg-transparent p-7 md:p-8 hover:border-violet-500/50
  dark:border-default-100`. Used by `WhyChooseUs`, `DiscoverySprint`, the
  pricing commitment and engagement-model cards.
- **The "stunning" surface** — deep violet gradient (`card-top` → `card-mid` →
  `card-bottom`), two blurred glows, a hairline along the top edge, no border.
  Used by `HowWeWork`, the `/about` mission cards and `BusinessChallenges`. The
  user asked for this explicitly; it is not a rogue style.

Other rules:

- **The palette is violet only.** A rainbow scheme was introduced and rejected.
  `engineeringProcess.steps[].color` still holds rainbow gradients — unused;
  don't wire them in without asking.
- **Colours have names now.** 13 role-named tokens in the `@theme` block of
  `styles/globals.css` (`canvas`, `surface`, `hairline`, `card-*`, `cta-*`).
  Use them; don't paste hexes back in. There is **no brand-violet token on
  purpose** — the violet is Tailwind's `violet-*` scale.
- **Corners and motion have names too**, in the same `@theme` block. Radius is
  `rounded-inline|control|tile|card|panel` (4/8/16/24/32px) plus `rounded-full`;
  motion is `duration-fast|base|slow` (200/300/500ms) and
  `ease-standard|entrance`. **No `rounded-2xl`, no `duration-300`, no arbitrary
  `rounded-[…]`** — a browser sweep asserts every rendered corner and duration
  is on the scale, so an off-scale value is a regression, not a choice.
  - The JS half is **`lib/motion.ts`** (`DURATION`, `EASE`, `STAGGER`) for
    `motion/react`, which wants seconds and raw bezier points. Same numbers.
    Change one side, change the other.
  - **A bare `transition-colors` is already on the scale.** Tailwind's
    `--default-transition-duration` is overridden to `fast`, so you only need a
    `duration-*` class when you want something other than 200ms.
  - `STAGGER` is for `delay: index * STAGGER`. A delay that sequences one
    specific element against another is composition and stays hand-set.
  - Two things are off the scale on purpose and documented in STATUS: the ported
    **ProfileCard**'s internal tilt timings and **GooeyNav**'s `--linear-ease`.
- **One button treatment**: the dark bordered pill in `components/ui/cta-button.tsx`.
  A solid violet "primary" variant was rejected.
- **One spacing system**: `py-16 md:py-24` section rhythm, `py-12 md:py-20` page
  headers, and **the page owns the horizontal gutter** — no section component
  adds its own `px-*`.
- Grids with an incomplete last row use **flex-wrap + `justify-center`**.
- Nav labels stay short. Don't add elements to the hero uninvited.
- WhatsApp is a legitimate primary channel — the buyer is the Kerala SME
  market. Don't argue it away.

`components/HowWeWork.tsx` is shared by the homepage and `/services` via a
`variant` prop. One implementation of the seven stages; keep it that way.

### Components with structural requirements

- **`ProfileCard`** (leadership cards) — its canvas is inset `-20px` so the glow
  bleeds past the edge, so **the host must not have `overflow-hidden`**. Clip
  the surface in an inner wrapper.
- **`SpecularEdge`** — drop into any `position: relative` element. Does not
  mount without a hover pointer, under reduced motion, or without WebGL2.
- **The mobile menu overlay is a sibling of `<motion.nav>`, not a child.** As a
  child, framer-motion's transform makes the nav the containing block for
  `position: fixed`, and `inset-0` stops meaning the viewport.
- **`GooeyNav` is `React.memo`'d.** Un-memoising it puts a large inline `<style>`
  rebuild in the frame of every mobile-menu toggle — it was the measured cause
  of that animation's stutter.
- **Reduced motion is handled centrally** by `<MotionConfig reducedMotion="user">`
  in `app/providers.tsx`. Don't add per-file `useReducedMotion` for `motion`
  components; do handle it for anything outside `motion` (CSS keyframes, rAF
  loops, video).

---

## What to do next

### Blocked on the client

1. **Droxlink case study** — needs a real screenshot at
   `public/projects/droxlink.webp`, a permanent URL (currently a Vercel preview
   subdomain), and a decision: client work or own product? The profile and
   `config/content.ts` disagree.
2. **Alfa delivery timeline** — `TODO` in `caseStudies`.
3. **Legal entity name, registration number, postal code** — `TODO`s in
   `/privacy`, `/terms` and the Organization JSON-LD.
4. **Liability clause** (`/terms` §13) needs a solicitor under Indian law. The
   **RPwD accessibility position belongs in the same conversation** — see
   STATUS; India already requires IS 17802 of private establishments and draft
   2026 rules would add mandatory conformance reports.
5. **Discovery Sprint fee** — ships without a number by decision.
6. ~~**Founder photographs**~~ — **done 5 August**, all four, one sitting, head
   to waist. Nothing outstanding. If a founder is ever re-shot, run it through
   `scripts/lift-portrait.swift` and read the *Preparing a founder portrait*
   section of STATUS first: horizontal placement is a blend of the face and the
   body, and centring either alone throws the other off on a 3/4-turned pose.

### Priority 5 — the remaining build work

Icons, colour tokens, the radius scale and the motion scale are all done. What
is left:

7. **A screen-reader pass** (NVDA / JAWS / VoiceOver). This is the only
   accessibility item left and it cannot be automated. `/accessibility`
   publicly commits to updating when it's done — with no date, by decision.
8. **Three engineering blog posts.** `/blog` was deleted; recreate when there
   is content.
9. **`components/text-animations/BlurText.tsx` is orphaned** — nothing imports
   it, and the P4 unused-component sweep missed it. Deleting a component is the
   client's call, so it was left; it is dead code either way.

### Decided, don't reopen without new information

- **Contact-form storage: no.** The form opens WhatsApp and keeps no record.
  The client's position is that WhatsApp is the record. The known failure mode
  (blocked popup, no WhatsApp on a corporate laptop, closed tab) is documented
  in STATUS.
- **No date on the accessibility statement.**
- `/work` uses `<div>`s not `<section>`s, and `ProfileCard` renders each card as
  a nested `<section>`. Both reviewed and accepted.

---

## Conventions the user cares about

- Comments explain **why**, not what — especially where a line looks odd but is
  load-bearing.
- **Verify before claiming.** Build, lint, typecheck, and screenshot or measure
  the actual output. Several confident conclusions in this project's history
  were wrong until measured — a contrast audit, an animation-stutter diagnosis
  and an unused-component list all had to be redone. Prefer a real measurement
  over a plausible explanation, and say so when a result is bounded rather than
  explained.
- When a decision is the user's — pricing, commercial terms, deleting their
  content — surface it rather than inventing it.
- Keep `STATUS.md` current whenever a roadmap item ships.
