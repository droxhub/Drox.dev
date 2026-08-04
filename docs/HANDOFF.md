# Handoff — Drox Dev site

Written 4 August 2026, at the end of a long session. This is orientation for a
fresh session: what to read, what state things are in, what will bite you, and
what to do next.

**It is not the status record.** [`STATUS.md`](./STATUS.md) is, and it is
current. Read it before touching anything.

---

## Read these first, in this order

1. **[`STATUS.md`](./STATUS.md)** — what's shipped, what's blocked on the
   client, what's outstanding. Priorities 1–3 are complete and verified.
2. **[`UX-AUDIT-2026-07-29.md`](./UX-AUDIT-2026-07-29.md)** (Revision 2) — the
   22-section audit and the P1–P5 roadmap everything traces back to.
3. The **Company Profile PDF** — 27 pages, *not in the repo*; the user supplies
   it. It's the source of truth for positioning, services, case studies and
   engagement models. Its facts are summarised in
   `.claude/skills/ux-audit/references/drox-context.md`.

Two traps inside the profile itself: p.5 says "2 projects delivered" and p.22
says "26+" (both true under different definitions — never present "26+"
unqualified), and p.8's vision claim is unearned for a firm founded this year.

---

## Current state

Build, lint, types and all 10 routes are clean as of this writing.

```
npm run check     # biome (format+imports) then eslint — both must pass
npx tsc --noEmit
npm run build
```

**Nothing is committed.** Last commit is `f99124e`; there are ~85 uncommitted
files representing all of P1, P2 and P3. The user has not asked for a commit —
don't make one unprompted.

---

## Things that will bite you

### 1. ESLint lints, Biome formats — `biome check` proves nothing about lint

Split on 4 August. Biome's linter is `"enabled": false`; the rules live in
`eslint.config.mjs`. **`npm run check` runs both** — use it, and don't report a
clean codebase on the strength of `biome check` alone.

- ESLint **9**, not 10 — `eslint-plugin-jsx-a11y` and `eslint-plugin-react` cap
  their peer range at 9.
- `eslint-config-next` bundles *and registers* the react / react-hooks /
  jsx-a11y / import / typescript-eslint plugins. Reference rules **by name**;
  adding a `plugins` block for any of them makes flat config throw on a
  duplicate key.
- Put **no formatting rules in ESLint** — the formatter would fight them.
- `react-hooks/exhaustive-deps` is deliberately `off`, matching what Biome had.
  Turning it on will produce findings and deserves its own pass.

### 2. Inline styles + SSR = a hydration trap

This cost real time. If you put a computed number into an inline style on a
server-rendered element, **round it**, and build `calc()` with the sign in the
operator.

The CSS parser re-serialises inline styles: `width: 2.21784882619977px` reads
back as `2.21785px`, and `calc(50% + -361px)` is rewritten as
`calc(50% - 361px)`. Either one fails hydration on every element using it.

`fromCentre()` in `lib/utils.ts` exists for the second problem. `prototype-img.tsx`
and `black-hole-effect.tsx` show the pattern. Rounding also makes output immune
to last-digit float divergence between the Node and browser engines.

**Verify hydration in a real browser**, not by reading the diff — see below.

### 3. Decorative randomness is seeded, not random

`lib/seeded-random.ts` (mulberry32). The particle fields used `Math.random()`
inside an effect purely to dodge a hydration mismatch, which meant they couldn't
paint until after hydration. Seeding makes server and client agree, so the
effect, the state and a full re-render all disappear. Don't reintroduce
`Math.random()` into render output.

### 4. `framer-motion` is not installed

It was removed in P1. This project uses **`motion/react`**. Third-party snippets
(shadcn, Skiper, Aceternity) will import `framer-motion` and fail the build —
swap the import.

---

## Verifying visual work

The user asks for visual changes constantly and screenshots are the only honest
way to confirm them. Playwright + Chromium are installed:

- Chromium: `~/Library/Caches/ms-playwright` (installed via
  `npx playwright install chromium`)
- The `playwright` package itself is **not** a project dependency — it was
  installed into the session scratchpad. `npm i -D playwright` in a scratch
  directory, or install it where you need it. **Do not add it to
  `package.json`** unless the user asks for a test setup.

Workflow that worked: `npm run build` → `npx next start -p 3111` →
`npx wait-on http://localhost:3111` → drive with Playwright → `pkill -f "next
start -p 3111"`.

Two checks worth repeating every time:

- **Hydration**: load each route, listen for `console` errors and `pageerror`,
  filter for `/hydrat|did not match|Minified React error/i`.
- **Section screenshots**: `page.locator("section", { has: page.getByText(...) })`
  then `.screenshot()`.

`ffmpeg` is now installed (Homebrew) if any more media work comes up.

---

## Design language — match it, don't invent

The user pushed back repeatedly on new sections not matching old ones. The house
card is:

```
rounded-[1.75rem] border-2 border-dashed border-default-200 bg-transparent
p-7 md:p-8 transition-colors duration-300 hover:border-violet-500/50
dark:border-default-100
```

Used by `WhyChooseUs`, `BusinessChallenges`, `DiscoverySprint`, `Founders`, the
pricing commitment cards and the engagement-model cards.

- **The palette is violet only.** A rainbow per-stage colour scheme was
  introduced and rejected. `engineeringProcess.steps[].color` still holds
  rainbow gradients — they are currently unused; don't wire them into anything
  without asking.
- **One button treatment**: the dark bordered pill in `components/ui/cta-button.tsx`.
  A solid violet "primary" variant was rejected. Hierarchy comes from border and
  glow, never a different fill.
- **The exception is `HowWeWork`**, which the user explicitly asked to be
  borderless with a "stunning" background — deep violet gradient plus two
  blurred glows and a top hairline, the same treatment as the `/about` mission
  cards.
- Grids with an incomplete last row use **flex-wrap + `justify-center`**, not
  CSS grid, so the orphans centre. See `HowWeWork` history and the pricing
  models grid.
- Nav labels stay short. Don't add elements to the hero uninvited.
- WhatsApp is a legitimate primary channel here — the buyer is the Kerala SME
  market. Don't argue it away.

`components/HowWeWork.tsx` is shared by the homepage and `/services` via a
`variant` prop — it swaps the heading copy and drops the CTA. There is one
implementation of the seven stages; keep it that way.

---

## What to do next

In value order, not roadmap order.

### Blocked on the user — worth more than any code below

1. **The Cal.com link.** Booking is fully built and wired into `/contact`, the
   homepage closing CTA and the sticky mobile bar, but
   `siteConfig.booking.calLink` is `""`, so all three silently fall back to
   `/contact` and no calendar is shown. One config line turns it all on. The
   audit rates calendar booking the single largest structural conversion gain
   available. The loader is a faithful port of Cal's documented snippet but has
   never run against a live event type — give it one manual browser check.
2. **Contact-form storage.** The form opens WhatsApp and keeps **no record**. A
   blocked popup, no WhatsApp on a corporate laptop, or a closed tab loses the
   enquiry silently. Proposed fix is a save-first step (Supabase is connected)
   before the WhatsApp open — UX unchanged, nothing lost. ~1 hour. **Awaiting
   approval.**

### Priority 4 — the actual next build work

3. **`prefers-reduced-motion`.** The headline item. 24 files import
   `motion/react`; only 6 honour it, and four of those were written in this
   session (`ClosingCTA`, `Founders`, `HowWeWork`, `sticky-mobile-cta` — the
   pre-existing two are `LogoLoop` and `ambient-video`). Lenis smooth scroll
   ignores it entirely, which is the worst offender for vestibular disorders.
   The hero `<video>` in `prototype-img.tsx` is a raw `autoPlay` with no guard.
   WCAG 2.2 SC 2.3.3 — and it is **publicly disclosed on `/accessibility` with a
   30 September 2026 target date**.
4. **Cheap wins, ~1 hour together.** Delete the ~11 unused components and drop
   `ogl`; delete the unused SVGs in `public/` (the `*.svg` files total 3.0 MB and
   are referenced only by `light-bg.tsx` and `integrations.tsx`, neither of which
   is imported anywhere); fix `--reflect-sub`, which is defined only inside
   `.dark` while the `subtitle` primitive uses it unconditionally — so subtitle
   text has no colour at all in light mode.

Videos are already done: `public/` went 26 MB → 4.1 MB.

### Open, unanswered

- **Halving the problem section.** Offered and not answered. `BusinessChallenges`
  ships 15 bullets; the audit asked for three recognisable pains. The
  recommendation was to cut to two or three per group. The section earns its
  place *for now* because the portfolio is one case study deep — revisit
  removing it entirely once there are three or four.
- The three dead `label` keys in `contactPage.form.fields` — the real labels are
  hardcoded in `app/contact/page.tsx`, so editing config does nothing. Offered,
  not answered.

---

## Conventions the user cares about

- Comments explain **why**, not what — especially where a line looks odd but is
  load-bearing (the rounding above, `mt-auto`, the flex-wrap widths).
- Verify before claiming. Build, lint, typecheck, and screenshot or curl the
  actual output. The user notices unverified claims.
- When a decision is the user's to make — pricing, commercial terms, deleting
  their content — surface it rather than inventing it. The Discovery Sprint
  deliberately ships without a fee for this reason.
- Keep `STATUS.md` current whenever a roadmap item ships.
