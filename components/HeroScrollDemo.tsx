"use client";
import { NoteMockup } from "./NoteMockup";
import { ContainerScroll } from "./ui/container-scroll-animation";

// define props type
export function HeroScrollDemo() {
	return (
		<div className="flex flex-col overflow-hidden">
			<ContainerScroll
				titleComponent={
					<>
						{/* <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1> */}
					</>
				}
			>
				<div className="relative">
					<NoteMockup />
				</div>
			</ContainerScroll>
		</div>
	);
}
