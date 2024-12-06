import React, { useState } from 'react';

const IMAGE1_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Image1.svg";
const IMAGE2_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Image2.svg";

const AoinPeople: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-screen min-h-screen h-[1000px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-screen h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMAGE1_URL})` }}
      />

      {/* Overlay for darkening or color effect if needed */}
      <div className="absolute inset-0 w-screen h-full bg-opacity-40 z-10" />

      {/* Main Centered Content */}
      <div className="relative z-20 mx-auto max-w-[1440px] h-full px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Bar */}
        <nav className="relative top-0 left-0 w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-12 items-center p-4 sm:ml-6 lg:ml-12 z-20">
          <div className="text-white font-bold font-bebas text-[24px] sm:text-[28px] lg:text-[31px]">AOIN</div>
          {/* Hamburger Icon for Mobile */}
          <button
            className="sm:hidden ml-auto focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {/* Nav Links */}
          <div className="hidden sm:flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 lg:space-x-8 font-bebas text-white text-[14px] sm:text-[16px] lg:text-[21px] uppercase font-semibold">
            <a href="#" className="hover:text-[#CF0] transition-colors">Home</a>
            <a href="#" className="hover:text-[#CF0] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#CF0] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#CF0] transition-colors">Lookbook</a>
            <a href="#" className="hover:text-[#CF0] transition-colors">About</a>
          </div>
        </nav>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="sm:hidden absolute left-0 right-0 top-20 bg-black bg-opacity-90 z-30 rounded-b-lg shadow-lg flex flex-col items-center py-4 space-y-4 font-bebas text-white text-[18px] uppercase font-semibold animate-fade-in">
            <a href="#" className="hover:text-[#CF0] transition-colors" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" className="hover:text-[#CF0] transition-colors" onClick={() => setMenuOpen(false)}>Collections</a>
            <a href="#" className="hover:text-[#CF0] transition-colors" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#" className="hover:text-[#CF0] transition-colors" onClick={() => setMenuOpen(false)}>Lookbook</a>
            <a href="#" className="hover:text-[#CF0] transition-colors" onClick={() => setMenuOpen(false)}>About</a>
          </div>
        )}

        {/* Vertical Side Texts - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:block absolute left-4 lg:left-16 top-1/2 -translate-y-1/2 z-20">
          <div className="text-white text-[12px] lg:text-[16px] tracking-widest rotate-[-90deg] origin-left pl-2">SINCE 2023</div>
        </div>
        <div className="hidden lg:block absolute right-16 top-2/3 -translate-y-1/2 z-20">
          <div className="text-white text-[12px] lg:text-[16px] tracking-widest rotate-90 origin-right pr-2">1801 THORNRIDGE CIR. SHILOH, HAWAII 81063</div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-20 pb-32 sm:pt-16 sm:pb-24">
          <div className="relative mt-10 flex flex-col items-center justify-center">
            <h1
              className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[250px] xl:text-[325px] font-bebas font-normal text-[#CF0] text-center uppercase drop-shadow-lg leading-[0.75] tracking-tight lg:tracking-[-19.5px]"
              style={{
                fontWeight: 400,
                fontStyle: 'normal',
                fontFamily: 'Bebas Neue',
              }}
            >
              AOIN
              <span className="align-super text-[8px] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[25px] ml-1 sm:ml-2">®</span>
              <br />
              FOR PEOPLE
            </h1>
            {/* Small Rotated Image Overlay - Responsive positioning and sizing */}
            <div className="absolute top-[15vw]  sm:top-[18vw] md:top-[20vw] lg:top-[18vw] right-[2vw] sm:right-[4vw] md:right-[6vw] lg:right-[9vw] w-[120px] h-[140px] sm:w-[180px] sm:h-[210px] md:w-[240px] md:h-[280px] lg:w-[280px] lg:h-[330px] xl:w-[320px] xl:h-[380px] transform translate-x-1/2 -translate-y-1/2 rotate-[1deg]">
              <img src={IMAGE2_URL} alt="model" className="w-full h-full rounded-lg object-cover" />
            </div>
          </div>
          {/* Subtitle Text */}
          <div className="mt-4 sm:mt-6 lg:mt-8 text-white font-bold text-center text-[12px] sm:text-[14px] lg:text-[16px] max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[618px] mx-auto tracking-wide px-4">
            NEQUE PORRO QUISQUAM EST, QUI DOLOREM IPSUM QUIA DOLOR SIT AMET, CONSECTETUR, ADIPISCI VELIT, SED QUO, NEQUE PORRO QUISQUAM EST, QUI DOLOREM IPSUM QUIA DOLOR SIT AMET.
          </div>
        </div>
      </div>
      {/* Bottom Banner */}
      <div className="absolute bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-40px] left-0 w-screen z-30">
        <div className="w-[2220px] bg-black py-2 sm:py-3 lg:py-4 px-2 h-[60px] sm:h-[80px] lg:h-[100px] flex items-center overflow-x-auto transform rotate-[1.5deg] whitespace-nowrap">
          <span className="text-white text-[20px] sm:text-[28px] md:text-[35px] lg:text-[43px] font-extrabold tracking-wider inline-block min-w-[200%]">
            SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AoinPeople;
