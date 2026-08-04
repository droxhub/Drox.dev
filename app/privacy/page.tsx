import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"How Drox Dev collects, uses and protects personal information submitted through droxdev.com and during client engagements.",
	alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
	return (
		<LegalPage
			heading="Privacy Policy"
			intro="This policy explains what personal information Drox Dev collects, why we collect it, how we use it, and the rights you have over it. It covers droxdev.com and the enquiries we receive through it."
			updated="29 July 2026"
		>
			<LegalSection title="1. Who we are">
				<p>
					Drox Dev is a software engineering company based at Hilite Business
					Park, Kozhikode, Kerala, India. For any question about this policy or
					about data we hold, contact{" "}
					<a href="mailto:hello@droxdev.com">hello@droxdev.com</a>.
				</p>
				{/* TODO: add registered legal entity name, company registration number
				    and registered office once confirmed. Enterprise procurement asks
				    for these specifically. */}
			</LegalSection>

			<LegalSection title="2. What we collect">
				<p>
					We collect only what we need to respond to you and to deliver work:
				</p>
				<ul>
					<li>
						<strong>Information you give us.</strong> Your name, email address,
						phone number and the contents of your message when you submit our
						contact form, email us, or message us on WhatsApp.
					</li>
					<li>
						<strong>Usage information.</strong> Aggregated, anonymous analytics
						about how pages on droxdev.com are used — page views, referrers,
						approximate country, device type. We use Vercel Analytics, which
						does not use cookies and does not track individuals across sites.
					</li>
					<li>
						<strong>Client project data.</strong> During an engagement we may
						process data belonging to your business. That processing is governed
						by the engagement contract and any separate data processing
						agreement, not by this policy.
					</li>
				</ul>
				<p>
					We do not collect special category data, and we do not buy personal
					data from third parties.
				</p>
			</LegalSection>

			<LegalSection title="3. Why we use it">
				<ul>
					<li>To reply to your enquiry and discuss a possible engagement.</li>
					<li>To prepare proposals, estimates and contracts.</li>
					<li>To deliver and support work you have engaged us for.</li>
					<li>
						To understand which parts of our website are useful, in aggregate.
					</li>
					<li>To meet legal, tax and accounting obligations.</li>
				</ul>
				<p>
					We do not sell your personal information. We do not use it for
					advertising, and we will not add you to a marketing list because you
					sent us an enquiry.
				</p>
			</LegalSection>

			<LegalSection title="4. Who we share it with">
				<p>
					We share personal information only with service providers who help us
					operate, and only to the extent they need it:
				</p>
				<ul>
					<li>
						<strong>Vercel</strong> — website hosting and privacy-friendly
						analytics.
					</li>
					<li>
						<strong>WhatsApp (Meta)</strong> — if you choose to contact us
						through WhatsApp, your message is handled under Meta&apos;s own
						privacy terms.
					</li>
					<li>
						<strong>Email and productivity providers</strong> — for
						correspondence and document storage.
					</li>
				</ul>
				<p>
					We may also disclose information where required by law. We do not
					transfer your data to any other third party without telling you.
				</p>
				{/* TODO: keep this list accurate as tooling changes — CRM, email
				    delivery, or a database for enquiries all belong here. */}
			</LegalSection>

			<LegalSection title="5. How long we keep it">
				<p>
					Enquiries that do not lead to an engagement are kept for up to 24
					months, so we can pick up a conversation you may return to. Records
					relating to an engagement are kept for as long as the contract
					requires and then for the period required by Indian tax and accounting
					law. Aggregated analytics contain no personal data and are retained
					indefinitely.
				</p>
			</LegalSection>

			<LegalSection title="6. How we protect it">
				<p>
					Access to enquiry and client data is limited to the four Drox Dev
					founders and any engineer working on your project. Data is held in
					access-controlled accounts protected by multi-factor authentication,
					and transmitted over encrypted connections. We will sign a
					non-disclosure agreement before receiving confidential material — just
					ask.
				</p>
			</LegalSection>

			<LegalSection title="7. Your rights">
				<p>You can ask us to:</p>
				<ul>
					<li>Tell you what personal information we hold about you.</li>
					<li>Correct anything that is wrong.</li>
					<li>Delete it, where we are not required to keep it.</li>
					<li>Send you a copy in a portable format.</li>
					<li>Stop using it for a particular purpose.</li>
				</ul>
				<p>
					Email <a href="mailto:hello@droxdev.com">hello@droxdev.com</a> and we
					will respond within 30 days. There is no charge.
				</p>
			</LegalSection>

			<LegalSection title="8. Cookies">
				<p>
					droxdev.com does not set advertising or tracking cookies. Our
					analytics provider does not use cookies to identify individuals. Your
					browser may store a preference for light or dark theme locally on your
					device; that preference never leaves it.
				</p>
			</LegalSection>

			<LegalSection title="9. Changes to this policy">
				<p>
					If we change this policy we will update the date at the top of this
					page. Material changes affecting existing clients will be communicated
					directly.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
