import React from 'react';

const ExclusiveDeals = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center justify-start px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 xl:pt-14 relative">
      
      {/* Header */}
      <div className="w-full flex flex-col items-center md:items-end z-10">
        <h1 className="font-[Corinthia,cursive] font-bold mb-2 mt-2 ml-4 xs:ml-6 sm:ml-8 md:ml-10 text-center md:text-right leading-none">
          <img 
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745120/public_assets_shop1_LP/public_assets_images_ExclusiveDeals.svg" 
            alt="Exclusive Deals" 
            className="w-[150px] xs:w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] xl:w-[400px] 2xl:w-[500px] h-auto"
          />
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-4 xs:gap-y-6 sm:gap-y-8 md:gap-y-0 md:items-start mt-6 xs:mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 z-10 relative">

        {/* Floral Illustration */}
        <img
          src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745125/public_assets_shop1_LP/public_assets_images_ExclusiveDeals2.svg"
          alt="Floral Illustration"
          className="absolute left-1/2 md:left-[40%] top-[-10px] xs:top-[-15px] sm:top-[-25px] md:top-[-40px] lg:top-[-60px] xl:top-[-80px] w-12 xs:w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-[267px] transform -translate-x-1/2 pointer-events-none select-none z-40"
        />

        {/* Left Image */}
        <div className="w-full sm:w-[85%] md:w-[55%] max-w-[524px] aspect-[524/729] overflow-hidden shadow-lg rounded-md">
          <img
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745122/public_assets_shop1_LP/public_assets_images_ExclusiveDeals1.svg"
            alt="Ethnic Glamour Collection"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[44%] flex flex-col items-center md:items-start mt-2 xs:mt-3 sm:mt-4 md:mt-20 lg:mt-8 nav2:mt-0 xl:mt-1 2xl:mt-2 space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-10">
          
          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-2 xs:space-y-3 text-center md:text-left">
            <p
              className="text-right text-[#222] font-[Poppins] text-sm xs:text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-medium leading-tight xs:leading-snug sm:leading-normal md:leading-normal lg:leading-[38px] tracking-wide xs:tracking-wider sm:tracking-widest md:tracking-[0.175em] lg:tracking-[0.375em] not-italic"
            >
              A Glamour Collection
            </p>
            <p
              className="text-red-600 font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] leading-tight"
              style={{
                fontFamily: "'Nosifer', cursive",
              }}
            >
              STARTING @499/-
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full sm:w-[85%] md:w-[90%] lg:w-[95%] max-w-[418px] aspect-[418/628] overflow-hidden shadow-lg rounded-md relative top-2 xs:top-3 sm:top-4 md:top-1 lg:top-2 xl:top-1 2xl:top-2 ">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745128/public_assets_shop1_LP/public_assets_images_ExclusiveDeals3.svg"
              alt="Modern Printed Outfit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
