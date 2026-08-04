import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Accessibility Statement",
	description:
		"Drox Dev's accessibility commitment for droxdev.com — current WCAG 2.2 conformance status, known issues we are fixing, and how to report a barrier.",
	alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
	return (
		<LegalPage
			heading="Accessibility Statement"
			intro="We build software for a living, so we hold our own site to the standard we would apply to yours. This page states where droxdev.com currently stands against WCAG 2.2 Level AA, including the things we know are not yet right."
			updated="29 July 2026"
		>
			<LegalSection title="Conformance status">
				<p>
					droxdev.com is <strong>partially conformant</strong> with{" "}
					<a
						href="https://www.w3.org/TR/WCAG22/"
						rel="noopener noreferrer"
						target="_blank"
					>
						WCAG 2.2 Level AA
					</a>
					. Partially conformant means most of the site meets the standard, but
					some content does not yet.
				</p>
				<p>
					We are publishing the gaps rather than claiming full conformance,
					because an accessibility statement that overstates is worse than none.
				</p>
			</LegalSection>

			<LegalSection title="What currently works">
				<ul>
					<li>
						Semantic landmarks, so screen readers can skip between regions.
					</li>
					<li>Keyboard-operable navigation, buttons and links.</li>
					<li>Visible focus indicators on interactive elements.</li>
					<li>Text alternatives on meaningful images.</li>
					<li>Labelled form fields with autofill support.</li>
					<li>Layouts that reflow to 320px without horizontal scrolling.</li>
				</ul>
			</LegalSection>

			<LegalSection title="Known issues we are working on">
				<p>
					These are open and tracked. Target date for all of them:{" "}
					<strong>30 September 2026</strong>.
				</p>
				<ul>
					<li>
						<strong>Motion.</strong> Several animations — including background
						effects and smooth scrolling — do not yet fully respect the
						operating-system &quot;reduce motion&quot; setting.
					</li>
					<li>
						<strong>Colour contrast.</strong> Some secondary text over gradient
						and video backgrounds falls below the 4.5:1 ratio, and some
						gradient-filled headings may not render legibly in high-contrast
						modes.
					</li>
					<li>
						<strong>Interactive process steps.</strong> The expandable process
						section on the Services page is not yet fully keyboard operable.
					</li>
					<li>
						<strong>Small text.</strong> Some supporting text is below our
						intended minimum size.
					</li>
					<li>
						<strong>Skip link.</strong> A skip-to-content link is not yet
						present on every page.
					</li>
				</ul>
			</LegalSection>

			<LegalSection title="How we assess">
				<p>
					We review against WCAG 2.2 AA using automated tooling alongside manual
					keyboard and screen-reader testing. Automated tools catch roughly a
					third of real barriers, so we do not rely on them alone.
				</p>
			</LegalSection>

			<LegalSection title="Compatibility">
				<p>
					droxdev.com is built to work with current versions of Chrome, Edge,
					Firefox and Safari, and with the screen readers that ship with those
					platforms. It may not work reliably with browsers more than two major
					versions old.
				</p>
			</LegalSection>

			<LegalSection title="Tell us about a barrier">
				<p>
					If something on this site stopped you doing what you came to do, we
					want to know — including which page, what you were trying to do, and
					what assistive technology you use if any.
				</p>
				<p>
					Email <a href="mailto:hello@droxdev.com">hello@droxdev.com</a> or call{" "}
					<a href="tel:+919946642643">+91 9946 642 643</a>. We acknowledge
					accessibility reports within one business day and will tell you what
					we intend to do about it.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
