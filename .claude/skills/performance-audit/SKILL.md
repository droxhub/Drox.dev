---
name: performance-audit
description: Frontend performance audit of the Drox Dev Next.js site — Core Web Vitals (LCP, INP, CLS), JavaScript bundle weight, the cost of running GSAP plus framer-motion plus motion plus lenis plus ogl together, four installed icon libraries, image optimization, font loading, server vs client component boundaries, and animation frame cost. Use when the user asks why the site is slow, mentions Lighthouse or Core Web Vitals, asks about bundle size or load time, or reports janky scrolling or animation.
---

# Frontend Performance Audit

Read `.claude/skills/ux-audit/references/drox-context.md` first.

You are a frontend performance engineer. Every finding is grounded in something you
measured or read in the source. **You cannot get real Core Web Vitals from source code**
— if the user wants field numbers, tell them to run Lighthouse or check CrUX/PageSpeed
Insights for droxdev.com, and be explicit about which of your findings are predictions.

## Measure before judging

```bash
npm run build            # biome check + next build — read the route/bundle table
```

The build output prints per-route First Load JS. That table is the evidence base for
every bundle claim. `build-output.txt` in the repo root may hold a previous run — check
its date before trusting it.

To attribute weight, inspect what the heavy modules actually cost:

```bash
du -sh node_modules/{gsap,framer-motion,motion,ogl,lenis} 2>/dev/null
du -sh node_modules/{@phosphor-icons,@tabler,lucide-react,react-icons}/* 2>/dev/null | sort -h | tail
```

Installed size is not shipped size — it bounds the problem, it doesn't prove it. Confirm
against the build table and the import sites before quoting a number.

## The standing suspects on this codebase

**Animation stack duplication.** `gsap` + `@gsap/react` + `framer-motion` + `motion` +
`lenis` + `ogl` all ship. `framer-motion` and `motion` are the same library, one
generation apart — having both is almost certainly dead weight. Find which components
import which; recommend consolidating to one.

**Four icon libraries.** `@phosphor-icons/react`, `@tabler/icons-react`, `lucide-react`,
`react-icons`. Check each import is per-icon and tree-shakes; `react-icons` in particular
is easy to import badly. Consolidating to one library is usually a real win and also a
`ui-review` consistency fix — flag it in both.

**`ogl` / WebGL effects.** `LightRays`, `black-hole-effect` and similar run a render loop.
Check: are they dynamically imported? Do they run on mobile? Do they pause off-screen or
when `prefers-reduced-motion` is set? A continuous WebGL loop on a marketing page is
battery and INP cost for decoration.

**Lenis smooth scroll.** `SmoothScroll` wraps the whole app in `app/layout.tsx`, and the
body carries `style={{ overflow: "auto" }}`. Hijacked scroll adds input latency, can
fight the browser's native scrolling on mobile, and interacts badly with anchor links and
scroll restoration. Assess whether the aesthetic gain is worth it.

**Client/server boundary.** Count `"use client"` across `components/` and `app/`. Every
section component that's client-only ships its JS to the browser. Sections that are
static content have no business being client components.

**Images.** Check `public/` — `projects/`, `testimonials/`, `founders/`, `video/`, and
`og-image.jpg`. Are they served through `next/image` with `width`/`height`? Modern
formats? Is the LCP image `priority`? Is anything oversized for its render box? Is
`public/video/` autoplaying?

**Fonts.** `config/fonts.ts` — `next/font` with `display: swap` and preload, or a
render-blocking external load?

## Core Web Vitals — reason from source, label as prediction

- **LCP** — what is the largest element? A hero WebGL canvas or a text animation that
  runs before paint delays it. Check for animate-in effects on hero copy.
- **INP** — the animation loops, scroll listeners and hover effects that occupy the main
  thread. GSAP ScrollTrigger + lenis + WebGL together is the risk cluster.
- **CLS** — images without dimensions, fonts without size-adjust, content that animates
  in and shifts what's below it.

## Output

1. **Verdict** — is performance costing this site business? Mobile-first, since that's
   where most B2B first touches land.
2. **Measured evidence** — the build table, the module sizes, the import audit. Say
   plainly what you measured versus what you inferred.
3. **Predicted CWV risks** — labelled as predictions, each traced to a `file:line`.
4. **Ranked fixes** — estimated saving, effort, and the tradeoff. Where a fix removes a
   visual effect, name the visual cost so the user can make the call.
5. **What to measure next** — the exact commands and tools to confirm.

No invented Lighthouse scores. Ever.
