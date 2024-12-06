import React from 'react';

const outfits = [
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745158/public_assets_shop1_LP/public_assets_images_look1.svg',
    bgColor: 'bg-[#89B6D9]', // Blue
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745160/public_assets_shop1_LP/public_assets_images_look2.svg',
    bgColor: 'bg-[#FFDE8C]', // Yellow
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745163/public_assets_shop1_LP/public_assets_images_look3.svg',
    bgColor: 'bg-[#A47B63]', // Brown
  },
];

const OutfitCards = () => {
  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 mb-10 sm:mb-40 lg:mb-48">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
        {outfits.map((outfit, index) => (
          <div
            key={index}
            className={`relative w-full aspect-[3/4] ${outfit.bgColor} rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] flex items-center justify-center overflow-visible mb-8 sm:mb-0`}
          >
            <img
              src={outfit.image}
              alt={`Look ${index + 1}`}
              className="absolute w-auto h-[120%] object-contain z-10 animate-float"
              style={{
                bottom: '-40%',
                left: '3%',
                transform: 'translateX(-50%)',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitCards;
