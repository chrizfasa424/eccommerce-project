import React from "react";

const Footer = () => (
  <footer className="w-full bg-black flex justify-center items-start py-10 md:py-16 px-2 sm:px-4 md:px-8">
    <div className="w-full max-w-[1380px] flex flex-col md:flex-row justify-between items-start px-0 md:px-8 gap-8 md:gap-0">
      {/* Left: Brand Description */}
      <div className="w-full md:w-[400px] min-w-[200px] md:min-w-[300px] mr-0 md:mr-12 mb-8 md:mb-0">
        <div className="text-[#CCFF00] text-2xl sm:text-[35px] font-bebas mb-2">AOIN</div>
        <div className="text-[#939393] text-sm sm:text-[16px] font-normal leading-relaxed">
          Aoin is a Sydney streetwear brand outfitin<br />
          inspired indonesian with premium clothing that<br />
          has a minimalist edge.
        </div>
      </div>
      {/* Right: Link Columns */}
      <div className="flex flex-col font-alexandria sm:flex-row gap-8 sm:gap-12 md:gap-20 max-w-4xl ml-0 md:ml-auto w-full md:w-auto">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-white font-bold text-[16px] mb-1">COLLECTION</span>
          <span className="text-white font-bold  text-[16px]">MAN</span>
          <span className="text-white font-bold text-base text-[16px]">WOMAN</span>
          <span className="text-white font-bold text-base text-[16px]">KIDS</span>
          <span className="text-white font-bold text-base text-[16px]">SHOP</span>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-white font-bold text-base mb-1 text-[16px]">REFUND</span>
          <span className="text-white font-bold text-base text-[16px]">SHOP</span>
          <span className="text-white font-bold text-base text-[16px]">SIZE CHART</span>
          <span className="text-white font-bold text-base text-[16px]">BLOG</span>
          <span className="text-white font-bold text-base text-[16px]">ABOUT</span>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-white font-bold text-base mb-1 text-[16px]">INSTAGRAM</span>
          <span className="text-white font-bold text-base text-[16px]">FACEBOOK</span>
          <span className="text-white font-bold text-base text-[16px]">TIKTOK</span>
          <span className="text-white font-bold text-base text-[16px]">TWITTER</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
