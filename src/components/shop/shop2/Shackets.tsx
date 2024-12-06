import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shackets: React.FC = () => {
  const navigate = useNavigate();
  
  const handleViewMore = () => {
    // Navigate to ProductPage with bottoms category filter
    navigate('/shop2-allproductpage');
  };
  return (
    <section className="relative w-screen h-[60vh] md:h-[80vh] sm:h-[70vh] lg:h-[1024px] bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
      
      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">

        {/* Shackets Text */}
        <h1 className="text-[7vw] xs:text-[7vw] sm:text-[6vw] top-[12vw] left-[16vw] md:left-[16vw] xl:left-[16vw] md:text-[5vw] lg:text-[4vw] xl:text-[96px] font-normal tracking-wider text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 relative text-center leading-none">
          SHACKETS
        </h1>

        {/* Models Container */}
        <div className="relative w-full h-full flex items-end justify-center">
          
          {/* Left Model */}
          <div className="absolute left-1 sm:left-4 md:left-8 lg:left-16 xl:left-1 bottom-[28vh] sm:bottom-[28vh] md:bottom-[25vh] lg:bottom-[350px]">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059260/public_assets_shop2/public_assets_shop2_shackets1.svg"
              alt="Left Model"
              className="w-[35vw] sm:w-[40vw] md:w-[25vw] lg:w-[20vw] xl:w-[472px] max-w-[472px] h-auto object-contain animate-shakeY"
            />
          </div>

          {/* Right Model */}
          <div className="absolute left-[40%] sm:left-[45%] md:left-[40%] lg:left-[40%] xl:left-[590px] bottom-[12vh] sm:bottom-[16vh] md:bottom-[10vh] lg:bottom-[200px] -translate-x-1/2">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059260/public_assets_shop2/public_assets_shop2_shackets2.svg"
              alt="Right Model"
              className="w-[24vw] sm:w-[22vw] md:w-[22vw] lg:w-[18vw] xl:w-[317px] max-w-[317px] h-auto object-contain animate-shakeXGrow"
            />
          </div>

          {/* View More Button */}
          <div className="absolute bottom-[12vh] left-[60%] sm:bottom-[15vh] md:bottom-[18vh] lg:bottom-[300px] right-8 sm:right-1 md:right-8 lg:right-16 xl:right-[250px]">
            <button 
              onClick={handleViewMore}
            className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[199px] h-[40px] sm:h-[45px] md:h-[50px] lg:h-[54px] xl:h-[58px] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold text-[#AB3DFF] border border-[#423780] hover:bg-purple-500/20 transition-all duration-300 font-quicksand rounded-sm">
              View More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom horizontal line */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1346px] h-[1px] sm:h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default Shackets;
