import React from 'react';

const IMAGE1_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component6_Image1.svg";
const UNION_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Union.svg";

const compositeImage = IMAGE1_URL;

const AoinJoinUs: React.FC = () => {
  return (
    <div className="bg-black w-full mx-auto min-h-screen text-white font-sans pb-10">
      {/* Top Section */}
      <div className="flex justify-center w-full px-2 sm:px-4 md:px-0">
        <div className="relative w-full max-w-[1400px] h-[340px] sm:h-[420px] md:h-[600px] lg:h-[750px] rounded-3xl">
          {/* Ellipse and Union SVG Backgrounds (responsive position) */}
          <div
            className="absolute left-1/2 top-[60px] sm:left-[120px] sm:top-[300px] md:top-[800px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={{
              width: 556,
              height: 556,
              borderRadius: 556,
              background: 'rgba(204, 255, 0, 0.25)',
              filter: 'blur(80px)',
              opacity: 1,
            }}
          />
          <img
            src={UNION_URL}
            alt="Union Background"
            className="hidden lg:block absolute left-1/2 top-[100px] sm:left-[130px] sm:top-[750px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={{ width: 581, height: 581, opacity: 1 }}
          />
          {/* Background Image */}
          <img
            src={compositeImage}
            alt="Aoin Join Us Composite"
            className="w-full h-full rounded-3xl object-cover shadow-lg border border-gray-800 z-10 relative"
          />

          {/* Overlay Content */}
          <div className="absolute bottom-2  md:bottom-[-70px] lg:bottom-[-170px] sm:right-[50px] md:right-[50px] flex flex-col justify-end items-end text-left px-2 sm:px-4 md:px-8 pb-4 sm:pb-8 space-y-2 sm:space-y-6 rounded-2xl w-auto md:w-full h-auto md:h-full z-20">
            <h1 className="text-2xl sm:text-4xl md:text-[80px] lg:text-[104px] font-bebas font-normal leading-[1.1] md:leading-[0.85] hover:text-[#CCFF00] tracking-tight md:tracking-[-3.12px] uppercase drop-shadow-xl text-left">
              JOIN US TO GET<br />
              NOTIFIED OF THE<br />
              LATEST STYLE<br />
              TRENDS
            </h1>
          </div> 
          {/* Top Left Join Section */}
          <div className="absolute top-6 left-0 w-[90vw] max-w-[95vw] sm:w-[350px] md:w-[457px] md:left-5 p-3 sm:p-6 flex flex-col items-start text-left space-y-2 sm:space-y-4 z-20">
            <p className="max-w-xl text-xs sm:text-sm md:text-[16px] font-clash font-semibold text-gray-100 leading-snug drop-shadow">
              GALLEY OF TYPE HAS BEEN THE INDUSTRY'S STANDARD DUMMY TEXT EVER SINCE THE 1500S,
              WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.
            </p>
            <button className="bg-border-white text-white font-normal py-1.5 sm:py-2 px-4 rounded-full text-xs sm:text-sm shadow font-clash transition-colors duration-300 border border-white hover:bg-[#3D5914]">
              JOIN WITH US
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] h-auto md:h-[160px] px-2 sm:px-4 md:px-[56px] py-6 md:py-0 items-start flex-shrink-0 mx-auto mt-8 md:mt-20 lg:mt-80 gap-8 md:gap-12 lg:gap-0">
        <div className="flex-1 min-w-[200px] max-w-full md:max-w-[420px] mb-6 md:mb-0">
          <h2 className="text-2xl sm:text-4xl md:text-[35px] font-bebas font-bold mb-2 uppercase tracking-tight">AOIN</h2>
          <p className="text-sm sm:text-base md:text-[16px] text-[#939393] font-clash font-medium leading-relaxed">
            Aoin is a Sydney streetwear brand outfittin <br className="hidden sm:block" /> inspired indonesian with premium clothing that <br className="hidden sm:block" /> has a minimalist edge.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-1 justify-between w-full max-w-full md:max-w-lg ml-0 md:ml-auto gap-8 sm:gap-0 items-center sm:items-start text-center sm:text-left">
          <div className="flex flex-col space-y-2 sm:space-y-4 min-w-[100px] w-full sm:w-auto">
            <span className="font-bold text-base sm:text-lg md:text-[16px] uppercase">Collection</span>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Man</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Woman</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Kids</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Shop</a>
          </div>
          <div className="flex flex-col space-y-2 sm:space-y-4 min-w-[100px] w-full sm:w-auto mt-6 sm:mt-0">
            <span className="font-bold text-base sm:text-lg md:text-[16px]  uppercase">Refund</span>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Shop</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Size Chart</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Blog</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">About</a>
          </div>
          <div className="flex flex-col space-y-2 sm:space-y-4 min-w-[100px] w-full sm:w-auto mt-6 sm:mt-0">
            <span className="font-bold text-base sm:text-lg md:text-[16px] uppercase">Instagram</span>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Facebook</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Tiktok</a>
            <a className="font-semibold text-sm sm:text-[16px] block py-1" href="#">Twitter</a>
          </div>
        </div>
      </div>
      {/* Promo Bar */}
      <div className="relative w-full h-[40px] sm:h-[55px] md:h-[73px] mt-12 sm:mt-24  md:mt-48">
        <div className="absolute left-0 right-0 bottom-0 top-6 bg-[#d4ff00] h-full rotate-[-1deg] flex items-center overflow-hidden">
          <span className="text-black text-[14px] sm:text-[22px] md:text-[32px] lg:text-[43px] font-extrabold tracking-wider whitespace-nowrap ">
            SHOP NOW! DISCOUNT UP TO 80% SHOP NOW! DISCOUNT UP TO 80% SHOP NOW! DISCOUNT UP TO 80%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AoinJoinUs;