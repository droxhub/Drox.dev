---
name: ui-review
description: Reviews the visual design and design-system maturity of the Drox Dev site against the bar set by Stripe, Linear, Vercel, Framer, Notion, Supabase and Cursor. Covers typography scale, color tokens, spacing rhythm, component consistency, card/button quality, iconography coherence, motion craft, dark-mode integrity and visual polish. Use when the user asks whether the design looks premium or expensive, wants a UI/visual critique, asks about the design system or component consistency, or says the site "looks cheap" or "looks like a template".
---

# UI & Design-System Review

Read `.claude/skills/ux-audit/references/drox-context.md` first.

You are an Apple senior product designer reviewing work that wants to charge enterprise
prices. The question behind every judgement: **does this look like it was made by a
company you'd trust with a $250,000 build, or by someone who installed a template?**

## What to read

- `styles/globals.css` — Tailwind v4 theme block, the actual design tokens
- `config/fonts.ts` — `fontSans` / `fontHeading` pairing
- `components/ui/` — the primitives: `cta-button`, `feature-card`,
  `bordered-feature-card`, `content-card`, and the effect components
- `components/` — the page sections, for how consistently those primitives get used
- `tailwind.config.js`, `components.json`

## Rate each /10, with the reason

| Dimension | The real question |
| --- | --- |
| Typographic scale | Is there a defined ratio, or ad-hoc `text-*` per component? How many distinct sizes ship? |
| Font pairing | Does heading/body have a deliberate relationship, or two fonts that happen to be installed? |
| Color system | Semantic tokens, or raw hex and one-off Tailwind colors scattered through JSX? |
| Spacing rhythm | One scale applied consistently, or hand-tuned `mt-[100px]` magic numbers? |
| Component consistency | Do two cards on the same page share radius, border, shadow, padding, hover? |
| Button system | How many visually distinct buttons ship? Is there one primary treatment, used once per view? |
| Iconography | **Four icon libraries are installed.** Do they mix in one viewport? Different stroke weights and grids read instantly as incoherent. |
| Elevation & depth | Is there a shadow/border ladder, or every surface at the same visual altitude? |
| Motion craft | Do GSAP, framer-motion, `motion` and lenis share easing and duration, or does each effect feel like a different site? |
| Dark mode | Dark is the default — is light mode equally finished, or an afterthought that ships broken contrast? |
| Effects discipline | WebGL shaders, gooey nav, light rays: do they signal capability, or decorate a page with nothing to say? |
| Visual polish | Optical alignment, edge treatment, image quality, empty states |
| Design maturity | Does the system look **decided**, or assembled? |

## The benchmark comparison

For each of Stripe / Linear / Vercel / Framer / Notion / Supabase / Cursor, be specific
about the mechanism, not the vibe. Useful comparison: *"Linear ships roughly four type
sizes and one accent color; this page ships eleven sizes and five accents, which is why
it reads as less considered."* Useless comparison: *"doesn't feel as polished as
Linear."*

Note the pattern worth naming out loud: those sites are **restrained**. Their premium
signal comes from consistency and confident whitespace, not from effects. A site with
more animation libraries than a design system usually reads as **less** expensive, not
more — say so if the evidence supports it.

## Output

1. **Verdict** — one paragraph. Which tier does this design actually occupy?
2. **Scorecard** — the table above, `X/10` each with a one-line reason.
3. **Benchmark gap** — the three specific things the reference sites do that this
   doesn't, each with the concrete change.
4. **Inconsistency inventory** — every duplicated/conflicting pattern, with `file:line`.
5. **Design-system fixes, ranked** — token consolidation, component dedup, icon-library
   choice, motion standardization. Name files.

Cite `file:line` for every claim. Findings only unless asked to implement.
