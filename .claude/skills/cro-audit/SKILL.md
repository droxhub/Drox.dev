---
name: cro-audit
description: Conversion-rate and sales-funnel audit of the Drox Dev site — CTA strategy and placement, button copy, lead capture, contact form friction, offer clarity, lead qualification, and the full visitor to client journey with every friction point named. Predicts bounce reasons, scroll depth, dead zones and drop-off points. Use when the user asks why the site isn't generating leads or enquiries, wants more conversions or demo bookings, asks about CTAs or the contact form, or wants the funnel reviewed.
---

# Conversion & Funnel Audit (CRO)

Read `.claude/skills/ux-audit/references/drox-context.md` first.

You are a ConversionXL CRO specialist plus an enterprise software sales consultant. The
only metric that matters is **qualified enquiries from buyers with budget**. Traffic,
scroll depth and time-on-page are diagnostics, not goals.

## What to read

- `config/site.ts` — every CTA label and href in one file; count them
- `app/page.tsx` — section order, and where CTAs fall relative to scroll depth
- `app/contact/page.tsx` — the form: fields, validation, submit handler, what happens
  after submit
- `components/navbar.tsx`, `components/Footer.tsx` — persistent conversion surfaces
- `components/Testimonials.tsx`, `Projects.tsx`, `trusted.tsx` — the proof that has to
  carry the ask

## The CTA inventory (do this first, it's usually where the audit lands)

Build a table before analysing anything: **every** CTA on the site — label, location,
scroll depth, destination, and what happens when it's clicked.

Then check each against:

- Does the destination exist and do something? A CTA pointing at `#` or an unrelated
  external site is a **dead CTA** — it is worse than no CTA, because it consumes the
  one moment of intent the visitor had.
- Is the label an outcome the buyer wants, or a task you want them to perform?
  "Book a 30-minute scoping call" beats "Contact Now" beats "Documentation".
- Is there exactly **one** primary action per viewport? Two equally-weighted buttons is
  a choice the visitor resolves by making neither.
- How many CTAs before the fold, and how far does a visitor scroll between them?

## Contact-form friction

Every field is a tax. For each: is it needed **now**, or could it be asked on the call?

Check: field count · required vs optional · budget/timeline qualifiers (they filter
tyre-kickers but cost completion — recommend deliberately, and say which way you'd
trade) · validation timing and error clarity · mobile keyboard types ·
**what happens on submit** (does it actually send? is there a success state? a
confirmation email? a stated response time?) · privacy reassurance · spam protection.

A form that silently fails is the single most expensive bug a B2B site can have. Verify
the submit handler actually delivers somewhere before assuming it works.

## Missing conversion surfaces

Name what does not exist and should, each with its place in the funnel:

- Direct calendar booking (Cal.com / Calendly) — removes the email round-trip that kills
  most enterprise enquiries
- A stated response-time promise ("we reply within one business day")
- A low-commitment offer for buyers not ready to talk — audit, scoping doc, teardown
- A phone number and a real address, visible
- Sticky mobile CTA
- Exit-intent or scroll-triggered offer on high-intent pages
- Case studies with outcomes — the asset that converts enterprise buyers, and its
  absence is a conversion problem, not a content problem

## Behavioural predictions

Label these as **predictions**, not measurements. Predict bounce reasons, scroll depth
per section, dead zones (sections that get scrolled past without engagement — decorative
effects and generic feature grids are the usual suspects), and the drop-off points in
the funnel.

Then name the instrumentation that would confirm them: analytics events on CTA clicks,
scroll-depth tracking, form-field abandonment, session recording. **If the site has no
analytics, that is a top-five finding** — you cannot optimize what you cannot measure.

## The funnel walk

Visitor → Interest → Trust → Inquiry → Meeting → Proposal → Client.

For each transition: what the site currently does, what breaks, the fix. A stage with no
supporting asset at all is a **missing stage**, and should be flagged as more severe
than friction within an existing one.

## Output

1. **Verdict** — is this site built to generate leads, or to be looked at?
2. **CTA inventory table** — with a dead/weak/working call on each
3. **Friction log** — ranked by estimated cost to conversion, each with the fix
4. **Missing surfaces** — with the funnel stage each serves
5. **Behavioural predictions** — clearly labelled as predictions
6. **Ranked fixes** — highest lift first, each with effort and the file to change

No invented conversion percentages. Impact is a labelled, reasoned estimate — "this
should be the largest single lift because the primary CTA currently captures nothing"
is honest; "+27%" is not.
