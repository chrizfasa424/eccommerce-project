import React from 'react';

const PromotionalBanners = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 w-full  mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-3 justify-center items-center lg:items-start">
          {/* Video Block */}
          <div className="relative w-full lg:w-[522px] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <div className="relative h-full">
              <video
                src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691077/public_assets_videos/promo-video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-10 text-white">
                <div className='flex flex-col'>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-1 md:mb-2">
                    Warm Woolen
                  </h3>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-8">
                    Sweater
                  </h3>
                </div>
              </div>
              <div className="absolute top-[250px] md:top-[300px] lg:top-[400px] left-4 md:left-6 lg:left-10 text-white">
                <div className='flex flex-col'>
                  <div className="mb-2 md:mb-4">
                    <span className="text-base md:text-lg tracking-widest">NOW AT</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-500">30</span>
                    <span className="text-2xl md:text-3xl text-red-500 ml-1">%</span>
                  </div>
                  <div className="text-lg md:text-xl tracking-widest mt-1 md:mt-2">OFF</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Block */}
          <div className="relative w-full lg:w-[738px] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-white mt-6 lg:mt-0">
            <div className="relative h-full">
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745165/public_assets_shop1_LP/public_assets_images_promo1.svg"
                alt="Colorful silk scarves arranged artistically"
                className="w-full h-full object-contain md:object-cover"
              />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
