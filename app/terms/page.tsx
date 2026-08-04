import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"Terms governing use of droxdev.com, and the standard basis on which Drox Dev quotes, contracts and delivers software engagement work.",
	alternates: { canonical: "/terms" },
};

export default function TermsPage() {
	return (
		<LegalPage
			heading="Terms of Service"
			intro="These terms cover use of droxdev.com and set out the standard basis on which we engage. Every project is governed by its own signed agreement — where that agreement and these terms differ, the signed agreement wins."
			updated="29 July 2026"
		>
			<LegalSection title="1. About these terms">
				<p>
					&quot;Drox Dev&quot;, &quot;we&quot; and &quot;us&quot; refer to the
					software engineering company based at Hilite Business Park, Kozhikode,
					Kerala, India. By using droxdev.com you accept the terms in sections 2
					to 4. Sections 5 onward describe how we contract for work and apply
					once an engagement is agreed.
				</p>
				{/* TODO: insert registered legal entity name and registration number. */}
			</LegalSection>

			<LegalSection title="2. Use of this website">
				<p>
					You may read, share and quote this site freely. You may not attempt to
					disrupt it, access it by automated means at a rate that degrades it
					for others, or misrepresent your identity when contacting us.
				</p>
			</LegalSection>

			<LegalSection title="3. Content on this website">
				<p>
					Text, design, code and images on droxdev.com belong to Drox Dev or to
					our clients, and are shown with permission. Client names, logos and
					product screenshots remain the property of those clients.
				</p>
			</LegalSection>

			<LegalSection title="4. No warranty on published information">
				<p>
					Information on this site — including timelines, capabilities and
					example outcomes — is provided in good faith for general guidance. It
					is not a quotation, a commitment, or professional advice for your
					specific situation. Nothing here forms a contract until we both sign
					one.
				</p>
			</LegalSection>

			<LegalSection title="5. How we engage">
				<p>
					Work begins with a written proposal covering scope, deliverables,
					timeline, price and payment schedule. Work starts once that proposal
					is accepted in writing. We offer fixed-price projects, dedicated team
					arrangements, monthly technology-partner retainers, product
					partnerships and technical consulting; the applicable model is named
					in the proposal.
				</p>
			</LegalSection>

			<LegalSection title="6. Scope and changes">
				<p>
					A fixed-price proposal covers the scope described in it. Work outside
					that scope is quoted separately before it is started — we will not
					invoice you for something you did not agree to. Where a change affects
					the timeline, we say so at the same time as the price.
				</p>
			</LegalSection>

			<LegalSection title="7. Your responsibilities">
				<p>
					Delivery depends on timely input from you: access to systems and
					stakeholders, content and data, and decisions at agreed review points.
					Where a delay originates with you, timelines shift accordingly and we
					will tell you the revised dates in writing.
				</p>
			</LegalSection>

			<LegalSection title="8. Intellectual property">
				<p>
					On full payment, all custom code, designs and documentation produced
					specifically for your project transfer to you outright. You own the
					deliverables.
				</p>
				<p>
					Two exceptions, stated plainly: third-party open-source components
					stay under their own licences, and any pre-existing Drox Dev tooling
					or internal libraries used to build your system remain ours, licensed
					to you perpetually and royalty-free for use with the delivered work.
					Any such component is identified in the proposal before you sign.
				</p>
			</LegalSection>

			<LegalSection title="9. Confidentiality">
				<p>
					We treat your business information as confidential and will not
					disclose it without permission. We will sign your NDA, or provide
					ours, before receiving confidential material. We will not name you
					publicly as a client, or publish a case study about your project,
					without your written consent.
				</p>
			</LegalSection>

			<LegalSection title="10. Payment">
				<p>
					Invoices are payable within the period stated in the proposal,
					normally 15 days. Fixed-price projects are typically invoiced in
					instalments against milestones. Retainers are invoiced monthly in
					advance. We may pause work on materially overdue accounts after
					written notice.
				</p>
			</LegalSection>

			<LegalSection title="11. Ending an engagement">
				<p>
					Either party may end an engagement with 30 days&apos; written notice.
					You pay for work completed and for costs already committed up to the
					end of the notice period; we hand over all completed deliverables,
					source code, credentials and documentation. There is no exit fee and
					we do not hold work hostage.
				</p>
			</LegalSection>

			<LegalSection title="12. Warranty and support">
				<p>
					We warrant that delivered software materially conforms to the agreed
					specification, and we will fix defects reported within 30 days of
					delivery at no charge. Enhancements, new features and changes arising
					from third-party or environment changes are quoted separately. Ongoing
					support is available under a separate retainer.
				</p>
			</LegalSection>

			<LegalSection title="13. Limitation of liability">
				<p>
					Nothing in these terms limits liability that cannot lawfully be
					limited. Subject to that, our total liability arising from an
					engagement is limited to the fees paid to us under that engagement,
					and we are not liable for indirect or consequential loss, loss of
					profit, or loss of data where that data was not in our custody.
				</p>
				{/* TODO: have a solicitor confirm this clause under Indian law, and
				    align it with any professional indemnity cover taken out. */}
			</LegalSection>

			<LegalSection title="14. Governing law">
				<p>
					These terms are governed by the laws of India, and the courts of
					Kozhikode, Kerala have exclusive jurisdiction — unless the signed
					engagement agreement states otherwise.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
