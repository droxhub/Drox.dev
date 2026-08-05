# Drox Dev — shared audit context

Every skill in `.claude/skills/` reads this file first. Facts here were captured
2026-07-29 from the repo. **Verify before citing any of it in a finding** — the code
moves, this file does not.

---

## 1. Positioning (source of truth)

**The authoritative source is the Drox Dev Company Profile (2026, 27pp)** — a PDF the
user holds outside this repo. Ask for it if a task turns on positioning. Everything in
this section is drawn from it and is far more reliable than anything in the codebase.

**Company facts** (profile pp.5, 24, 27):

| | |
| --- | --- |
| Founded | 2026 |
| Team | 4 equal founders |
| Delivered | **2 platforms** (see the metric warning below) |
| HQ | Kozhikode Hilite Business Park, Kerala, India |
| Contact | hello@droxdev.com · +91 9946 642 643 |
| Founders | Muhammad Ziyad M (CEO, direction/partnerships/strategy) · Abdul Rahib KP (COO, requirements/delivery/coordination) · Sinan Thadathil (CTO, architecture/tech selection/standards) · Muhammed Ajnas TK (Head of Engineering, feature delivery/module ownership/build quality) |

**Nine service lines** (p.14) — the site currently shows six, and **omits AI Solutions
and Business Automation, which are the differentiators**:

Software Engineering · Web Development · E-Commerce Solutions · Mobile Application
Development · **AI Solutions** · **Business Automation** · UI/UX Design ·
Digital Marketing · Support & Continuous Improvement

Digital Marketing (SEO, social, ads) **is a genuine service line** — do not treat it as
a template leftover or a contradiction. Whether to *lead* with it is a strategy call.

**Delivered work** (pp.19–20) — both currently unpublished on the site:

- **Alfa Event Management System** — event ops platform for a Kozhikode events company.
  React/Node/MongoDB. **100+ events, 200+ staff, 5 core modules.** Live at
  alfaeventsitebooking.cloud. Two named testimonials (Imthiyas Ahamed, Manager; Sainul
  Abid, Founder & MD).
- **Droxlink** — business profile + review management + offers, via one QR code.
  React/Node/MongoDB. 3 modules. *(Ambiguity: the profile frames it as client work,
  `config/content.ts` frames it as an own product. Flag this if it comes up.)*

**Five engagement models** (p.17): Fixed Price Project · Dedicated Development Team ·
Monthly Technology Partner · Product Development Partnership · Technical Consulting.

**Buyer:** startups, SMEs and growing enterprises (p.4) — a business decision-maker
signing a four- to six-figure engagement. Realistically **mid-market** (₹10–50 lakh),
not $250k enterprise, until the track record grows. Not a developer browsing a
component library.

**The wedge** (p.24, already articulated): four equal founders who stay close to the
work, with a named owner for direction, delivery, architecture and execution — "the
person setting that direction stays involved in the engagement rather than handing it
on." Structurally unavailable to Toptal, BairesDev, Netguru et al.

### Two claims to handle carefully

1. **"2 projects delivered" (p.5) vs "26+ projects delivered" (p.22).** The profile
   contradicts itself 17 pages apart. 2 = company output; 26+ = the founders' combined
   career total. The website reproduces "26+" with no qualifier. Never repeat the larger
   figure unqualified, and flag it whenever metrics come up.
2. **"To become the world's most trusted technology partner"** (p.8, and
   `app/about/page.tsx`). Unearned for a firm founded this year; it invites a buyer to
   discount the claims that *are* true. Recommend replacing it in both artefacts.

Also note **"50+ Technologies"** (p.22) reads as generalist, not deep, from a four-person
team — the one stat that actively hurts.

The audit target is https://www.droxdev.com — the site this repo builds.

---

## 1a. The central finding — check whether it still holds

**Drox Dev's problem is distribution, not content.** The Company Profile is a
disciplined, enterprise-credible document. The website is a template-derived portfolio
piece. They describe the same company in two incompatible registers, and roughly a
dozen finished trust assets exist only in the PDF.

Before recommending that anything be *written*, check whether the profile already
contains it. As of 29 July 2026 the site was missing all of: both case studies, the
founders, the engagement models, the 7-stage process, the industries list, the
"business challenges we solve" content, and the company story.

Genuinely absent from **both** artefacts, and therefore real work: Privacy Policy,
Terms of Service, Accessibility Statement, legal entity/registration, IP-ownership
statement, NDA offer, data-handling policy, pricing bands, professional indemnity.

The full audit lives at `docs/UX-AUDIT-2026-07-29.md` (Revision 2). Read it before
re-auditing — don't rediscover findings that are already written up.

**`docs/STATUS.md` says what has already been fixed.** Read it FIRST, always.
As of 29 July 2026, audit Priorities 1 and 2 are complete and verified — the
hero CTA, the legal pages, the case studies, the founders section, the pricing
page, the metadata and the asset compression are all done. Re-reporting them as
findings wastes the user's time and makes the audit look stale. Priorities 3–5
and a list of items blocked on client input are also in that file.

## 1b. Preferences learned the hard way — respect these

- **Buttons:** one language only — the dark bordered pill with the text-slide
  hover (`components/ui/cta-button.tsx`). A solid violet fill was tried and
  rejected as off-standard. Hierarchy comes from border and glow, not fill.
- **Nav labels must be short.** "How we work" was rejected as too long. Prefer
  one word.
- **Don't add elements to the hero uninvited.** A trust bar was added and
  removed. Hero = badge, headline, subhead, two CTAs, visual. That's it.
- **WhatsApp is a legitimate primary contact channel** for this buyer (Kerala
  SME market). Don't argue it away — the real gap is that no record is kept if
  the handoff fails.
- **"50+ Technologies" stays**, despite the audit's recommendation to drop it.
  The user was asked and reaffirmed. Don't re-litigate.
- Copy should match the Company Profile's register: calm, specific,
  business-first, no superlatives. When in doubt, quote the profile.

## 2. The core tension to check on every audit

This site was built from a **developer-template starting point** (HeroUI / Next.js
starter). Template DNA is the single largest threat to enterprise credibility, because
it speaks to the wrong audience in the wrong register.

Symptoms to grep for on every run — do not assume they are still present, and do not
assume the list is complete:

| Symptom | Where it lives | Why it kills the sale |
| --- | --- | --- |
| Hero headline about "beautiful digital experiences" | hardcoded in `components/Hero.tsx` | Aesthetic promise, not a business outcome. A COO cannot cost-justify "beautiful". |
| **The hero has no CTA at all** | `components/Hero.tsx` | The `homepage.hero.ctaButtons` array in `config/content.ts` (labelled "Documentation"/"GitHub") is dead config no component reads. Zero lead capture from the highest-value pixels on the site. |
| Contact form opens WhatsApp and stores nothing | `app/contact/page.tsx` → `handleSubmit` | No lead is ever captured. A failed handoff is a permanently lost enquiry you never learn about. |
| Tagline "Building exceptional digital experiences and web solutions" | `config/site.ts` → `siteConfig.description` | It is the meta description for **all eight routes** — only one `metadata` export exists (`app/layout.tsx`). |
| `/blog`, `/docs`, `/pricing` ship as live pages rendering one bare heading | `app/blog|docs|pricing/page.tsx` | Indexable near-empty pages damage quality signals. |
| Footer links to `/portfolio`, `/terms`, `/privacy`, `/accessibility` — all 404 | `components/Footer.tsx` | A 404 on "Privacy Policy" fails procurement before a human reads a word. |
| Services sold ≠ services claimed | `components/ServiceCards.tsx` | Lists digital marketing, SEO and social media; has no AI, automation or enterprise-systems card. Directly contradicts the positioning above. |
| `config/site.ts` still holds HeroUI starter config | `navMenuItems`: Profile/Dashboard/Team/Calendar/Logout | Unrendered, but the clearest fingerprint of an unmodified template. |

Treat "is this section speaking to a buyer or to a developer?" as a standing question
for every section of the site.

---

## 3. Codebase map

```
app/                     App Router (Next.js 16)
  layout.tsx             metadata, viewport, Navbar/Footer shell, SmoothScroll, Providers
  page.tsx               homepage — composes the section components below
  about|services|contact|blog|docs|pricing/page.tsx
components/              page sections (Hero, ServiceCards, Projects, Testimonials,
                         WhyChooseUs, FAQ, TechStack, Footer, navbar, trusted, …)
components/ui/           primitives + effects (cta-button, feature-card, LightRays,
                         LogoLoop, GooeyNav, container-scroll-animation, …)
config/content.ts        the real content file — nav, page copy, contact details
config/site.ts           HeroUI starter leftovers. `siteConfig.name` ("DRO X") and
                         `.description` still feed every page title + meta description.
                         NOTE: much homepage/section copy is hardcoded in the components
                         themselves (Hero, Projects, FAQ, ServiceCards, TechStack) and
                         DUPLICATES content.ts, already drifting. Grep both.
config/fonts.ts          fontSans + fontHeading
styles/globals.css       Tailwind v4 theme + design tokens
public/                  og-image.jpg, icon.png, projects/, testimonials/, founders/, video/
```

**Copy changes belong in `config/site.ts` and `config/content.ts`.** The repo is
deliberately built so content is centralized. A copy recommendation that points at a
`.tsx` file is usually pointing at the wrong place — check `config/` first.

## 4. Stack

- **Next.js 16** App Router, **React 18.3.1**, TypeScript, deployed at droxdev.com
- **Tailwind v4** (`@tailwindcss/postcss`) + **HeroUI** (`@heroui/react`) + `tailwind-variants`
- **Biome** for lint/format — `npm run check` (verify), `npm run lint` (write)
- Build: `npm run build` (runs `biome check --write` first, then `next build`)
- Animation, all four loaded: **GSAP** + `@gsap/react`, **framer-motion** *and*
  `motion` (the successor package — both are installed), **lenis** (smooth scroll),
  **ogl** (WebGL, used by the shader/effect components)
- Icons, all four loaded: `@phosphor-icons/react`, `@tabler/icons-react`,
  `lucide-react`, `react-icons`
- Theme: `next-themes`, **dark by default** (`app/layout.tsx`)

The duplicated animation and icon libraries are a standing performance finding — but
measure the actual shipped bytes before claiming an impact number.

## 5. Ground rules for every skill here

1. **Read the code before judging it.** Never critique a section you have not opened.
   A finding that cites no file:line is an opinion, not a finding.
2. **Never invent evidence.** No fabricated Lighthouse scores, bounce rates, traffic
   figures, conversion percentages, or competitor data. If a number needs measuring,
   say so and name the tool that would measure it.
3. **Expected-impact estimates are labelled as estimates** and given as ranges with the
   reasoning attached. "Directionally, replacing a dead CTA with a lead form should be
   the largest single lift on the page, because the current one captures nothing" is
   honest. "+34% conversion" is not.
4. **Every criticism ships with a concrete fix** — the replacement copy written out,
   the file to change, the component to build. "Improve the hierarchy" is not a fix.
5. **Never flatter.** Do not open with what's working unless the section calls for it.
   The user has explicitly asked to be told the truth; softening it is a disservice.
6. **Do not edit files** unless the user asks for implementation. These skills produce
   findings by default.
