import BusinessChallenges from "@/components/BusinessChallenges";
import ClosingCTA from "@/components/ClosingCTA";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import ServiceCards from "@/components/ServiceCards";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { faqContent } from "@/config/content";

/**
 * FAQPage schema. Google can expand these directly in the results page, which
 * is the cheapest extra SERP real estate available to a site this size — and
 * the answers cover the questions buyers search for (cost, IP, timelines).
 */
const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqContent.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: { "@type": "Answer", text: item.answer },
	})),
};

/**
 * One rhythm for every section instead of the five hand-tuned offsets this page
 * used to carry (`mt-[350px]`, `mt-[150px]`, `mt-[100px]`, `mt-[-50px]`,
 * `mt-[-20px]`). Each section already owns its own vertical padding, so this
 * only sets the gutter.
 *
 * Every section below the hero is wrapped in it, and no section component adds
 * horizontal padding of its own — that is the rule across every page. Four of
 * these used to carry their own `px-4 md:px-6 lg:px-8` as well, which doubled
 * the gutter to 32px on a phone for some sections and left it at 16px for
 * others, so the left edge visibly stepped in and out while scrolling.
 */
const section = "px-4 sm:px-6 xl:px-0";

/**
 * Section order follows §6 of the UX audit: every section answers the question
 * the previous one raised.
 *
 *   Hero          orient      "What is this and what do I do?"
 *   Challenges    resonate    "Do they understand my situation?"
 *   Services      qualify     "Do they do what I need?"
 *   Projects      prove       "Have they done this before?"
 *   How we work   de-risk     "What happens if I engage?"
 *   Numbers       reinforce   "What's their track record?"
 *   Testimonials  reinforce   "Does anyone vouch for them?"
 *   FAQ           unblock     "What's the catch?"
 *   Closing CTA   convert     "How do I start?"
 *
 * The audit's §6 flow also put the founders here, to answer "who is actually
 * accountable?". That section now lives only on /about, by decision — the
 * homepage was carrying it twice over from the same component.
 *
 * The numbers used to sit second, before anything had made them mean something;
 * the proof used to sit at ~85% scroll. Two sections left the page in this
 * reorder: the tech-stack carousel moved to /services (it answers a question no
 * buyer is asking this early), and the six generic benefit tiles came out
 * entirely — they made a claim the case study below them makes better.
 */
export default function Home() {
	return (
		<>
			{/* Static literal built from config — never user input. */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<Hero />

			{/* The hero's black-hole visual bleeds well past its own section box, so
			    this one offset stays hand-set — it's clearing artwork, not rhythm. */}
			<div className={`${section} mt-[-20px] md:mt-[350px]`}>
				<BusinessChallenges />
			</div>

			<div className={section}>
				<ServiceCards />
			</div>

			<div className={section}>
				<Projects />
			</div>

			<div className={section}>
				<HowWeWork />
			</div>

			<div className={section}>
				<WhyChooseUs />
			</div>

			<div className={section}>
				<Testimonials />
			</div>

			<div className={section}>
				<FAQ />
			</div>

			<div className={section}>
				<ClosingCTA />
			</div>
		</>
	);
}
