import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';


const StreetStyle: React.FC = () => {
  return (
    <section className="relative w-full  sm:h-[100vh] md:h-[100vh] lg:h-[1024px] h-[120vh] bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Container */}

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1 items-center  sm:pt-20 lg:pt-0">
        {/* Left side - Text */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-4 lg:space-y-1 text-center lg:text-left">
          <h2 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-black font-archivio leading-tight">
            <span className="text-white block">UNLEASH YOUR</span>
            <span className="text-white block">UNIQUE STREET</span>
            <span className="text-white block">STYLE</span>
          </h2>

          <div className="flex w-full lg:w-[900px] justify-center lg:ml-10 mt-6 lg:translate-y-12">
            <p className="text-gray-300 text-[16px] sm:text-[17px] lg:text-[19px] text-center max-w-[700px] lg:translate-x-24 leading-relaxed px-4 lg:px-0">
              Discover the latest trends and express your individuality with our
              cutting-edge streetwear collection. Our brand is all about embracing
              the urban culture and creating a style that is truly your own.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex gap-4 lg:gap-6 pt-2 justify-center lg:justify-start">
            {/* Left Arrow - Grey border and icon */}
            <button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-[#999999] flex items-center justify-center transition-all duration-300 hover:scale-105">
              <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8 text-[#999999]" />
            </button>

            {/* Right Arrow - Purple border and icon */}
            <button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-[#A259FF] flex items-center justify-center transition-all duration-300 hover:scale-105">
              <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8 text-[#A259FF]" />
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative lg:absolute lg:left-[860px] lg:bottom-[-80px] flex justify-center lg:justify-start mt-8 lg:mt-0">
          <img
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059271/public_assets_shop2/public_assets_shop2_ss1.svg"
            alt="Right Model"
            className="w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[360px] md:h-[540px] lg:w-[408px] lg:h-[612px] object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default StreetStyle;
