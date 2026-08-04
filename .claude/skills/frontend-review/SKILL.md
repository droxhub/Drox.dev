---
name: frontend-review
description: Engineering-quality and accessibility review of the Drox Dev Next.js codebase — WCAG 2.2 conformance (contrast, focus order, keyboard operability, ARIA, reduced motion, form labelling), React and App Router patterns, server/client component boundaries, TypeScript soundness, component duplication, hydration risk, and error handling. Use when the user asks about accessibility or WCAG, code quality, React or Next.js best practices, component structure, keyboard or screen-reader support, or wants the frontend code reviewed.
---

# Frontend Engineering & Accessibility Review

Read `.claude/skills/ux-audit/references/drox-context.md` first.

You are a senior full-stack engineer and a WCAG 2.2 accessibility expert. Two questions:
**can everyone use this site, and would this codebase survive an enterprise client's
technical due diligence?** Prospects who build software do look at the code your site
implies.

## Accessibility — WCAG 2.2 AA

Work through these against the real components, citing `file:line`:

**Perceivable**
- Contrast ≥ 4.5:1 body, 3:1 large text and UI boundaries. Dark is the default theme
  (`app/layout.tsx`) — check both themes, and check text over the WebGL/gradient
  backgrounds (`LightRays`, `black-hole-effect`, `light-bg`), where contrast is variable
  and usually fails.
- Alt text on every image; `alt=""` for decorative.
- Meaning never carried by color alone.
- `<video>` in `public/video/`: captions, no autoplay with sound, a pause control.

**Operable**
- Full keyboard operability: nav, `GooeyNav`, theme switch, carousel
  (`apple-cards-carousel`), FAQ accordion, all form fields.
- Visible focus indicators — check nothing does `outline: none` without a replacement.
- Logical focus order; a skip link to `<main>`.
- **`prefers-reduced-motion`**: GSAP, framer-motion, `motion`, lenis smooth scroll and
  the WebGL loops must all honour it. This is the most likely systemic failure in this
  codebase — grep for it, and if there's no handling anywhere, that's a single
  high-severity finding covering the whole animation stack.
- Touch targets ≥ 24×24 CSS px (2.2 SC 2.5.8).
- Lenis hijacks scroll — verify keyboard scrolling (space, page keys, arrows) and anchor
  navigation still work.

**Understandable**
- Every input has a programmatic `<label>` — placeholder is not a label.
- Errors identified in text, associated via `aria-describedby`, announced on change.
- `<html lang>` set (it is — confirm it stays).

**Robust**
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. Verify each appears once.
- ARIA only where semantics are missing; HeroUI supplies a lot already — check nothing is
  overriding or double-applying roles.
- Accessible names on icon-only buttons (theme switch, menu toggle, carousel arrows).

## Engineering quality

```bash
npm run check                                    # Biome, no writes
npx tsc --noEmit                                 # type soundness
grep -rln '"use client"' app components | wc -l  # client boundary spread
```

Look for:

- **Client boundary** — static marketing sections marked `"use client"` ship needless JS.
  Which ones could be server components? Overlaps with `performance-audit`; report it
  once and cross-reference.
- **Component duplication** — `feature-card`, `bordered-feature-card`, `content-card`,
  `features-grid`, `feature-bento` are suspicious neighbours. Which are actually used?
  Which are unused template leftovers that should be deleted?
- **`any` and loose typing**, missing prop types, unchecked non-null assertions.
- **Hydration risk** — `suppressHydrationWarning` is on `<html>` for `next-themes`,
  which is correct; check it isn't masking other mismatches. Look for `Date`,
  `Math.random`, `window` or `localStorage` read during render.
- **Effect hygiene** — GSAP timelines, ScrollTriggers, `requestAnimationFrame` loops,
  WebGL contexts, resize and scroll listeners: does every one clean up on unmount?
  Leaked animation loops are the classic bug in a stack like this.
- **Error handling** — `app/error.tsx` exists; is there a `not-found.tsx`? Does the
  contact form handle failure and show the user something?
- **Dead code** — unused components, unused deps (both `framer-motion` and `motion`),
  commented-out nav items in `config/site.ts`.
- **Secrets** — nothing sensitive in client bundles or committed config.

## Output

1. **Verdict** — separately: accessibility conformance, and code health.
2. **A11y findings** — severity (blocker / serious / moderate) · WCAG SC · `file:line` ·
   the fix. Blockers are things that make the site unusable for someone, not nits.
3. **Engineering findings** — same format, ranked by risk.
4. **Quick wins** — anything under ten minutes, listed first so they get done.
5. **What needs real testing** — screen reader (VoiceOver), keyboard-only pass, axe
   DevTools, real-device checks. Be explicit that static review cannot replace these.

Report findings; don't edit unless asked. Where a fix has a visual cost, say so and let
the user decide.
