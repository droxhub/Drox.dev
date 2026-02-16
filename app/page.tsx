import AboutSection from "@/components/about-section";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ServiceCards from "@/components/ServiceCards";
import TechStack from "@/components/TechStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
	return (
		<>
			<div>
				<Hero />
			</div>
			{/* <div className="mt-20 lg:mt-60 flex-col justify-center items-center mx-auto">
        <h1 className="text-2xl lg:text-4xl font-semibold flex- justify-center items-center mx-auto text-center">
          Features
        </h1>
        <FeaturesBento />
      </div>
      <LightBg />
      <Integrations /> */}
			<div className="md:mt-[350px] px-4 sm:px-6 xl:px-0 mt-[-20px]">
				<WhyChooseUs />
			</div>
			<div className="px-4 sm:px-6 xl:px-0 mt-[100px]">
				<AboutSection />
			</div>
			<div className="px-4 sm:px-6 xl:px-0 mt-[100px]">
				<ServiceCards showChip={true} />
			</div>
			<div className="px-4 sm:px-6 xl:px-0 mt-[150px]">
				<TechStack />
			</div>
			<div className="mt-[-50px]">
				<Projects />
			</div>
			<div className="px-4 sm:px-6 xl:px-0">
				<FAQ />
			</div>
			<div className="px-4 sm:px-6 xl:px-0">
        <Testimonials />
      </div>
		</>
	);
}
