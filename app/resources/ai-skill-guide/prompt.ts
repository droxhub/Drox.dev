/**
 * The Skill Creation Prompt a reader copies into Claude alongside their
 * template. Kept apart from the page so the ~400 lines of prompt text do not
 * bury the layout; edit the wording here, never in page.tsx.
 */
export const SKILL_CREATION_PROMPT = `I have uploaded our original proposal PDF. Treat this PDF as the single source of truth for creating a reusable Claude Skill that can generate future proposals in the same visual and structural standard.

Do NOT simply describe the design or create an approximate proposal.

Your objective is to reverse-engineer the uploaded PDF and create a complete, reusable Proposal Generation Skill.

IMPORTANT:
- Extract real assets wherever technically possible.
- Measure the actual document.
- Preserve the original PDF's visual identity.
- Do not approximate measurements when they can be extracted.
- Do not invent missing information.
- The final Skill must be reusable with completely different proposal content.

==================================================
PHASE 1 — FORENSICALLY ANALYSE THE SOURCE PDF
==================================================

Analyse the uploaded proposal PDF in forensic detail.

Extract and identify:

1. DOCUMENT GEOMETRY
- Page size
- Page dimensions in points
- Page margins
- Text column width
- Header position
- Footer position
- Logo position and dimensions
- Footer rule position and length
- Page-number position
- Section heading positions
- Table dimensions
- Column widths
- Cell padding
- Spacing before/after headings
- Paragraph spacing
- Line height
- Indentation
- Any recurring absolute-positioned elements

Record actual measurements in points wherever possible.

Do not use vague descriptions such as:
"approximately 1 inch"
"around 20px"
"roughly centered"

Use actual measured values.

--------------------------------------------------

2. FONTS
--------------------------------------------------

Identify the actual fonts used in the PDF.

For every identifiable font, determine:

- Font family
- Font variant
- Weight
- Italic/regular state
- Where it is used
- Approximate/exact font size where extractable

Check whether the fonts are embedded.

If an original font cannot legally or technically be bundled, identify the closest suitable open-source substitute based on actual letterform characteristics.

Do NOT automatically fall back to generic fonts such as Arial, Calibri, Times New Roman, or Georgia.

If substitute fonts are required:
- Obtain/bundle appropriate licensable font files where possible.
- Document the substitution and reason.

--------------------------------------------------

3. GRAPHICS AND DESIGN ASSETS
--------------------------------------------------

Extract actual reusable visual assets from the PDF wherever technically possible.

Look specifically for:

- Logo
- Gradient artwork
- Background graphics
- Decorative shapes
- Corner artwork
- Footer artwork
- Icons
- Repeating visual elements
- Vector artwork
- Masks
- Clipping paths
- Page furniture

Do NOT recreate these assets using CSS if the original artwork can be extracted from the PDF.

If different page types use different artwork, preserve those variants separately.

For example:

- Cover furniture
- Odd-page furniture
- Even-page furniture

Preserve transparency and original proportions wherever possible.

--------------------------------------------------

4. PAGE STRUCTURE
--------------------------------------------------

Identify the complete page structure.

Determine:

- Cover layout
- Interior-page layout
- Section-page behaviour
- Header behaviour
- Footer behaviour
- Page-number behaviour
- Page-break rules
- Sign-off placement
- Table behaviour
- Repeating elements

Identify which elements are fixed and which are variable.

==================================================
PHASE 2 — REVERSE-ENGINEER THE CONTENT STRUCTURE
==================================================

Analyse the proposal's complete content architecture.

Identify:

- All top-level sections
- Subsections
- Repeating content patterns
- Feature-list structures
- Tables
- Boilerplate sections
- Project-specific sections
- Closing/sign-off structure

Create a reusable section skeleton.

For the existing proposal structure, identify which sections should normally be rewritten for every new project and which sections can be reused as standard boilerplate.

Do not assume every future proposal will have identical content.

The Skill must allow project-specific content to replace the appropriate sections while preserving the overall proposal standard.

==================================================
PHASE 3 — REVERSE-ENGINEER WRITING RULES
==================================================

Analyse the writing style of the source proposal.

Identify:

- Point of view
- Tone
- Sentence style
- Heading style
- Bullet style
- Bullet length
- Capitalization
- Terminology
- Feature-description pattern
- Commitment/boundary pattern
- Caveat style
- Section depth
- Level of detail

Create explicit writing rules for future proposals.

The Skill should reproduce the writing conventions rather than merely copying sentences.

==================================================
PHASE 4 — CREATE THE REUSABLE SKILL
==================================================

Now create a complete Claude Skill for generating future proposals.

The Skill must contain:

- SKILL.md
- Reference documentation
- Format/layout specification
- Writing conventions
- Section structure
- Extracted assets
- Fonts where required
- Background/furniture assets
- Generation scripts where required
- Validation scripts
- Example content/input structure

The Skill should be self-contained and should NOT require the original PDF at runtime if all required assets and specifications can be packaged into the Skill.

==================================================
PHASE 5 — COMMERCIAL INFORMATION INTAKE
==================================================

Before generating a final proposal, the Skill must identify missing commercial information.

At minimum check for:

1. Client legal/company name
2. Project cost
3. Payment structure
4. Proposal validity period

If any required commercial information is missing, ask for all missing information together in ONE message.

Do not ask one question at a time.

Never:

- Invent pricing
- Infer pricing from another project
- Reuse another client's pricing
- Guess payment percentages
- Guess the client's legal name
- Guess validity dates

If the proposal contains line-item pricing, require the actual values before generating the final document.

For Indian currency, use Indian digit grouping.

Example:

₹1,25,000

not:

₹125,000

==================================================
PHASE 6 — OUTPUT GENERATION
==================================================

Because the source document is a PDF, the generation pipeline must prioritize precise PDF layout.

Do NOT use DOCX as the primary generation format if it causes the source layout to change.

Use a PDF generation approach capable of:

- Precise positioning
- Exact typography
- Controlled page breaks
- Background/furniture compositing
- Reusable extracted assets
- Consistent page dimensions

If HTML/CSS + headless Chromium is the most reliable approach, use it.

If another PDF-generation pipeline provides better fidelity, use that.

The final output must be a PDF.

==================================================
PHASE 7 — VALIDATION
==================================================

The Skill must validate the generated proposal before treating it as final.

Check for:

- Placeholder text
- Missing sections
- Missing commercial information
- Incorrect page numbers
- Overflow
- Clipped content
- Empty pages
- Broken tables
- Incorrect fonts
- Incorrect spacing
- Incorrect logo placement
- Incorrect background artwork
- Poor page breaks
- Sign-off position
- Currency formatting

If placeholder text remains, DO NOT silently produce a final proposal.

Report exactly where the placeholder occurs.

==================================================
PHASE 8 — VISUAL TEST
==================================================

After creating the Skill, test it.

Use the original proposal's content as one test case.

Regenerate the proposal using the new Skill.

Render both:

1. Original PDF
2. Generated PDF

as page images.

Compare them page-by-page.

Check visual differences in:

- Geometry
- Typography
- Spacing
- Logo
- Background artwork
- Section positioning
- Tables
- Footer
- Page numbers
- Sign-off position

Fix significant differences and test again.

Do not declare the Skill complete based only on textual comparison.

==================================================
PHASE 9 — GENERALIZATION TEST
==================================================

After the original-content test passes, run a second test using completely different proposal content.

The second test should verify that the Skill:

- Preserves the same visual system
- Preserves the same writing conventions
- Handles different section lengths
- Handles different project details
- Handles different pricing
- Handles different client names
- Handles different page counts
- Does not remain overfitted to the original proposal

==================================================
PHASE 10 — FINAL PACKAGE
==================================================

Package the complete reusable Skill.

The package should contain, where applicable:

SKILL.md

references/
- format specification
- section structure
- writing conventions
- generation rules
- validation rules

assets/
- fonts
- logo
- furniture/background artwork
- other required graphics

scripts/
- proposal generation
- validation
- rendering/comparison
- supporting utilities

examples/
- example proposal input
- example output

The final Skill must be usable for future proposals without needing to rebuild the entire system from the original PDF.

==================================================
FINAL REQUIREMENT
==================================================

Do not stop after analysing the PDF.

Do not merely give me instructions for how I could create the Skill.

Actually create the complete reusable Skill package.

If the current environment cannot complete a specific step, clearly identify the exact blocker and complete every other possible step rather than replacing the missing step with an approximation.`;
