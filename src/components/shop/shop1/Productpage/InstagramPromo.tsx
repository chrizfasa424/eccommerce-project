import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const InstagramPromo = () => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto mb-8 sm:mb-10 md:mb-12 py-8 sm:py-12 md:py-16 px-2 sm:px-8">
      <div
        className="bg-center bg-cover w-full h-[320px] sm:h-[420px] md:h-[540px] lg:h-[681px] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1753264505/public_assets_shop1_LP/public_assets_images_Productcard_instapromo.svg')", // Your image path
        }}
      >
        <div className="text-center w-full max-w-[904px] px-2 sm:px-4">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[38px] leading-tight font-archivio font-bold mb-4 sm:mb-6 -tracking-wider">
            EXPLORE OUR PREMIUM APPAREL COLLECTION
          </h2>
          <p className="text-white font-archivio text-base sm:text-lg md:text-xl mb-1">
            Explore our fashion catalog to discover a diverse selection of stylish options
          </p>
          <p className="text-white font-archivio text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            There's something for every taste and occasion
          </p>
          <button className="inline-flex font-poppins items-center gap-2 border border-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white text-lg sm:text-xl md:text-[22px] font-semibold hover:bg-white hover:text-black transition duration-300">
            SEE OUR INSTAGRAM
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstagramPromo;
