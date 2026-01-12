import { HeroScrollDemo } from "./HeroScrollDemo";

function PrototypeImg() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto relative w-full mb-[-200px] sm:mb-[-300px] md:mb-[-400px] lg:mb-[-500px] overflow-hidden">
      {/* Scaling wrapper for background image - same logic as NoteMockup */}
      <div className="absolute top-0 w-full flex justify-center pointer-events-none overflow-hidden">
        <div className="origin-top scale-[0.7] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-[1.0]">
          <img
            alt=""
            className="w-[1200px] h-[800px] max-w-none flex-shrink-0"
            src="/linear-bg.svg"
          />
        </div>
      </div>
      <div className="w-full mt-[-210px] sm:mt-[-147px] md:mt-[-86px] lg:mt-[-5px] xl:mt-[55px]">
        <HeroScrollDemo />
        {/* <img
        src="/linear-bgg.svg"
        className="max-w-[1000px] z-10 relative mt-20 top-[200px]"
        alt=""
        /> */}
      </div>
    </div>
  );
}

export default PrototypeImg;
