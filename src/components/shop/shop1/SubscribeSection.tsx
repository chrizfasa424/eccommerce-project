import React, { useState } from 'react';

function SubscribeSection() {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 flex items-start justify-center pt-12 md:pt-16 pb-24 md:pb-40 lg:pb-[300px]">
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-16">
        {/* Left Image */}
        <div className="flex-shrink-0 w-full md:w-[50%]">
          <img 
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745168/public_assets_shop1_LP/public_assets_images_subscribe.svg"
            alt="Four women in elegant blue and silver outfits"
            className="w-full h-auto md:w-[522px] md:h-[389px] object-cover rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h2 className="max-w-full text-[32px] sm:text-[42px] md:text-[48px] lg:text-[44px] leading-[1.3] font-playfair font-normal text-[#222]">
            Stay in the loop with <br />
            <em className="italic font-medium">exclusive offers, fashion news</em>, and more.
          </h2>

          <p className="mt-4 text-gray-600 text-base sm:text-lg mb-10 sm:mb-12">
            Subscribe to our Aoin newsletter!
          </p>

          {/* Email + Button with shared bottom line */}
          <div className="relative w-full mt-2">
            {/* Bottom border line */}
            <div className="absolute left-0 -bottom-3 w-full border-b border-black z-0" />

            {/* Input + Button aligned */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center relative z-10 gap-4 sm:gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 appearance-none bg-transparent border-none outline-none ring-0 focus:ring-0 text-base sm:text-lg text-gray-800 placeholder-[#636363] placeholder-text-[16px] px-1 py-2"
              />

              <button className="bg-[#222] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeSection;
