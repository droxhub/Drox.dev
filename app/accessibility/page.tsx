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
					<li>
						Respect for the operating-system &quot;reduce motion&quot; setting.
						Smooth scrolling, background effects, the hero animation and every
						transition are disabled when it is on.
					</li>
					<li>
						A minimum text size of 12px, and body text at 4.5:1 contrast or
						better against its background — including where text sits over video
						or gradients, which we measure from rendered pixels because
						automated tools cannot.
					</li>
					<li>
						Headings that remain legible in Windows High Contrast Mode and other
						forced-colour modes.
					</li>
					<li>
						A skip-to-content link on every page, and keyboard operability
						throughout — including the expandable process steps on Services.
					</li>
				</ul>
			</LegalSection>

			<LegalSection title="Known issues we are working on">
				<p>
					We test against WCAG 2.2 Level AA, which includes the WCAG 2.1 Level
					AA criteria that India&apos;s IS 17802 standard is built on. At our
					last audit no automated Level A or AA failures remained across any
					page.
				</p>
				<p>One thing remains open:</p>
				<ul>
					<li>
						<strong>Screen reader testing.</strong> Our checks so far are
						automated, keyboard-based and measured from rendered pixels. We have
						not yet completed a full pass with NVDA, JAWS and VoiceOver, and
						until we have we will not claim conformance.
					</li>
				</ul>
				<p>We will update this page when that pass is complete.</p>
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
