import React from 'react';

const EthnicWear = () => {
  return (
    <section className="relative w-full max-w-[1340px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1340px] mx-auto">
        {/* Section Title */}
        <div className="mb-6 sm:mb-12 ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-normal text-gray-900 tracking-wide">
            ETHNIC WEAR
          </h2>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Video Panel */}
          <div className="relative w-full lg:w-[596px] aspect-[3/3.2] lg:aspect-[596/634.26] overflow-hidden">
            <video
              src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691061/public_assets_videos/ethnic1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end items-start p-4 sm:p-8 text-white">
              <div className="ml-1 sm:ml-2">
                <p className="uppercase text-[18px] sm:text-[26px] font-extralight leading-tight">BEST</p>
                <p className="uppercase text-[18px] sm:text-[26px] font-extralight leading-tight mt-1">DISCOUNT</p>
              </div>
              <div className="ml-1 sm:ml-2">
                <span className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-black font-inter leading-none">
                  50%
                </span>
              </div>
              <p className="ml-1 sm:ml-2 text-xs sm:text-sm font-light font-inter mt-2 max-w-[90%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu nunc ac purus
                dapibus iaculis. Integer vel mattis ante. Praesent posuere dapibus lacus eu...
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="hidden md:block w-full lg:w-[351px] aspect-[351/635] overflow-hidden">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745147/public_assets_shop1_LP/public_assets_images_ethnic2.svg"
              alt="Center Ethnic Wear"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Images */}
          <div className="hidden md:flex flex-col gap-4 w-full lg:w-[312px]">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752751674/public_assets_shop1_LP/public_assets_images_ethnic4.svg"
                alt="Top Right Ethnic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745150/public_assets_shop1_LP/public_assets_images_ethnic3.svg"
                alt="Bottom Right Ethnic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthnicWear;
