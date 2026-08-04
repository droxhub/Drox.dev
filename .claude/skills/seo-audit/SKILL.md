---
name: seo-audit
description: Technical and content SEO audit of the Drox Dev Next.js site — per-route metadata and titles, meta descriptions, Open Graph and Twitter cards, JSON-LD structured data (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList), canonicals, robots.txt, sitemap.xml, heading hierarchy, semantic HTML, image alt text, internal linking and orphaned routes. Use when the user asks about SEO, search rankings, Google visibility, metadata, structured data, schema markup, sitemaps, or why the site isn't being found.
---

# Technical & Content SEO Audit

Read `.claude/skills/ux-audit/references/drox-context.md` first.

You are a technical SEO specialist working on a Next.js 16 App Router site. Findings
come from the source, not from assumptions about what a Next site usually does.

## Metadata

`app/layout.tsx` holds the root `metadata` export: `metadataBase`, title template,
description, OG, Twitter, icons. Verify it, then check **every route** for its own
export:

```bash
grep -rn "export const metadata\|generateMetadata" app/
```

Any `app/*/page.tsx` without one inherits the root title and description. Every page
sharing one description is a real ranking and click-through problem — the description is
the ad copy in the SERP.

Per route, assess:
- **Title** — under ~60 chars, unique, front-loads the term a buyer would search, and
  says what the company does. A title that is only the brand name wastes the strongest
  on-page signal.
- **Description** — 150–160 chars, unique, contains the offer and a reason to click.
  Cross-check with the `copywriting` skill; a generic tagline reused as the description
  is both an SEO and a copy finding.
- **Canonical** — set, and absolute.

## Structured data

Check for JSON-LD:

```bash
grep -rn "application/ld+json\|schema.org" app/ components/
```

For a software services company, the schema that earns rich results:

- **Organization** — name, url, logo, sameAs (social profiles), contactPoint. This is the
  one that feeds Google's knowledge panel, and it's the highest-value single addition.
- **LocalBusiness** — if there's a physical office and any local intent
- **Service** — one per offering on `/services`
- **FAQPage** — on the FAQ section (`components/FAQ.tsx`); eligible for SERP expansion
- **BreadcrumbList** — on nested routes
- **WebSite** with `potentialAction` — sitelinks search box

In App Router, JSON-LD ships as a `<script type="application/ld+json">` in the page
component. Give the actual object for each recommended type, filled with real data from
`config/site.ts` and marked `[VERIFY]` wherever you'd otherwise be inventing a fact.

## Crawl infrastructure

```bash
ls app/sitemap.ts app/robots.ts public/sitemap.xml public/robots.txt 2>/dev/null
```

App Router generates both from `app/sitemap.ts` and `app/robots.ts`. If neither exists in
either form, that's a finding. Also check for the `/blog`, `/docs` and `/pricing` routes:
they exist in `app/` but are missing from `navigation.items` in `config/site.ts`. Decide
per route whether it should be linked, `noindex`ed, or deleted — an indexed placeholder
page actively damages a site's quality signals.

## On-page

- **Heading hierarchy** — exactly one `<h1>` per page, describing the page, no skipped
  levels. Grep the section components; visual text sizing is not heading structure.
- **Semantic HTML** — `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`. Note where
  a `<div>` carries meaning that a landmark should. Overlaps with `frontend-review`.
- **Image alt text** — every `next/image` and `<img>`. Decorative images take `alt=""`;
  meaningful images take a description. Check `public/projects/`, `testimonials/`,
  `founders/` usage sites.
- **Internal linking** — do service pages link to relevant work? Does anything link into
  the orphaned routes? Is the footer doing link-equity work?
- **Rendering** — a client-heavy page still needs its content in the server-rendered
  HTML. Check that the section components' text isn't only mounted client-side.

## Content gaps

The site currently competes for nothing. For a firm like this, the terms that convert are
service + vertical + geography combinations, not "software development". Recommend a
small, realistic set of pages worth building — service pages with depth, case studies,
and comparison/decision content — and say honestly that SEO is a 6–12 month lever, so it
should not be prioritized above the conversion fixes that affect existing traffic today.

## Output

1. **Verdict** — can this site currently be found for anything a buyer would search?
2. **Metadata table** — route · title · description · canonical · status
3. **Structured data** — what's missing, with the JSON-LD written out
4. **Crawl infrastructure** — sitemap, robots, orphaned routes, indexation decisions
5. **On-page issues** — with `file:line`
6. **Ranked fixes** — effort versus impact, with the honest timeline caveat

No invented rankings, search volumes or traffic figures. If a number matters, name the
tool that would get it (Search Console, Ahrefs, PageSpeed Insights).
