/* eslint-disable react/display-name */
"use client";
import {
	sectionWrapper,
	subtitle,
	title,
	titleWrapper,
} from "@/components/primitives";
// import { FeaturesGrid } from "@/components/features-grid";
// import landingContent from "@/content/landing";

export const LastButNotLeast = () => {
	return (
		<section className={sectionWrapper({ class: "mt-16 lg:mt-4" })}>
			<div className="flex flex-col gap-0 md:gap-8">
				<div>
					<div className={titleWrapper({ class: "items-center" })}>
						<div>
							<h1 className={title({ size: "lg" })}>
								<span className="gradient-line">
									Last&nbsp;
									<span className={title({ color: "yellow", size: "lg" })}>
										but
									</span>
								</span>
							</h1>
						</div>
						<div>
							<h1 className={title({ size: "lg" })}>
								<span className="gradient-line">
									not&nbsp;
									<span className={title({ size: "lg", color: "pink" })}>
										least.
									</span>
								</span>
							</h1>
						</div>
					</div>
					<p
						className={subtitle({
							class:
								"mt-4 md:w-full text-center flex justify-center items-center",
						})}
					>
						Building exceptional digital experiences.
					</p>
				</div>
				{/* <FeaturesGrid features={landingContent.fullFeatures} /> */}
			</div>
		</section>
	);
};
