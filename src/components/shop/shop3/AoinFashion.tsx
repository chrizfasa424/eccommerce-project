import React from 'react';

const IMAGE1_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Image3.svg";
const IMAGE2_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Image4.svg";
const IMAGE3_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Image5.svg";
const UNION_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Union.svg";

const AoinFashion: React.FC = () => {
  return (
    <div className="bg-black w-full mx-auto relative flex flex-col items-center justify-start py-4 pb-20 px-2 sm:px-4">
      {/* Yellow Banner */}
      <div className="w-full min-w-[100vw] bg-[#d4ff00] py-2 h-[60px] sm:h-[80px] md:h-[100px] px-2 mb-16 sm:mb-24 md:mb-40 flex items-center transform rotate-[-1.5deg] overflow-x-auto whitespace-nowrap">
        <span className="text-black text-[22px] sm:text-[32px] md:text-[43px] font-extrabold tracking-wider inline-block min-w-[200%] animate-marquee-pingpong">
          SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% 
        </span>
      </div>
      {/* Main Centered Content */}
      <div className="mx-auto max-w-[1440px] w-full px-2 sm:px-4 flex flex-col items-center">
        {/* Heading */}
        <h1 className="animate-color-cycle text-white text-[32px] sm:text-[48px] md:text-[72px] lg:text-[104px] font-bebas font-normal text-center leading-[90%] tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-3.12px] uppercase mb-6 sm:mb-10 md:mb-12">
          AOIN PROVIDES A VARIETY OF WORLD
          <br />
          FASHION TO YOUR STYLES
        </h1>

        {/* Images Row */}
        <div className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-4 mb-8 sm:mb-10 md:mb-12 w-full max-w-full md:max-w-5xl">
          {/* Ellipse Background (optional) */}
          <div
            className="absolute left-[75%] top-[100%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              width: 556,
              height: 556,
              borderRadius: 556,
              background: 'rgba(204, 255, 0, 0.25)',
              filter: 'blur(142px)',
              opacity: 1,
            }}
          />

          {/* Union SVG Background */}
          <img
            src={UNION_URL}
            alt="Union Background"
            className="absolute left-[800px] top-[390px] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ width: 581, height: 581, opacity: 1 }}
          />

          {/* Images */}
          <div className="rounded-3xl overflow-hidden w-[427px] h-[427px] flex-shrink-0 shadow-lg mb-4 md:mb-0 z-20">
            <img
              src={IMAGE1_URL}
              alt="Aoin Fashion 1"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Center Circle Image */}
          <div className="rounded-full overflow-hidden w-[427px] h-[427px] flex-shrink-0 border-4 sm:border-8 border-black relative flex items-center justify-center shadow-lg mb-4 md:mb-0 z-20">
            <img
              src={IMAGE2_URL}
              alt="Aoin Fashion 2"
              className="object-cover w-full h-full"
            />
            <span className="absolute animate-color-cycle text-[28px] sm:text-[44px] md:text-[68px] font-bebas font-extrabold tracking-widest" style={{letterSpacing: '0.01em'}}>AOIN</span>
          </div>
          {/* Right Square Image */}
          <div className="rounded-3xl overflow-hidden w-[427px] h-[427px] flex-shrink-0 shadow-lg z-20">
            <img
              src={IMAGE3_URL}
              alt="Aoin Fashion 3"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Description Text */}
        <div className="w-full max-w-[95vw] sm:max-w-[569px] text-white font-clash text-[14px] sm:text-[16px] self-center md:self-start font-medium tracking-wide leading-relaxed mt-2 sm:mt-4 ml-0 xl:ml-8 sm:px-0 px-2">
          <p className="mb-3 sm:mb-5">
            AT FIRST GLANCE, WE PRIDE OURSELVES ON OFFERING A WORLD WIDE AND CAPTIVATING SELECTION OF FASHION STYLES THAT MATCH YOUR PERSONAL STYLE. OUR CAREFULLY SELECTED RANGE OF CLOTHING,
          </p>
          <p>
            ACCESSORIES AND FOOTWEAR IS DESIGNED TO SUIT ALL TASTES, WHETHER YOU PREFER CONTEMPORARY MINIMALISM OR BOHEMIAN EXTRAVAGANCE.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AoinFashion;
