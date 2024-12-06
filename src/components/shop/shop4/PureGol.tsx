const PureGol = () => {
  return (
    <div className="bg-black px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32 lg:py-40 mx-auto max-w-[1690px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 lg:gap-40 bg-black">
        {/* Left Section */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[770/844] bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144772/public_assets_shop4/public_assets_shop4_ShopCollection1.svg')] group">
            {/* Image only - no overlay or text */}
            <div className="absolute inset-0 border-4 sm:border-6 lg:border-8 border-transparent group-hover:border-white transition-all duration-300 pointer-events-none"></div>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-normal leading-tight sm:leading-normal text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 capitalize" style={{ fontFamily: 'ABeeZee' }}>
              Purity. Power. Purpose – The Essence of RudraRAKSH
            </h2>
            <button className="w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-[50px] bg-[#BB9D7B] text-white font-futura text-sm sm:text-[14px] uppercase tracking-wider hover:bg-[#A88A6A] transition-colors flex-shrink-0">
              Shop Collections
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col">
          <div className="mb-2 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-normal leading-tight sm:leading-normal text-white mb-8 sm:mb-12 md:mb-14 lg:mb-16 capitalize" style={{ fontFamily: 'ABeeZee' }}>
              RudraRAKSH – Spiritually Aligned. Traditionally Pure.
            </h2>
            <button className="w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-[50px] bg-[#BB9D7B] text-white font-futura text-sm sm:text-[14px] uppercase tracking-wider hover:bg-[#A88A6A] transition-colors flex-shrink-0">
              Shop Collections
            </button>
          </div>
          <div className="relative w-full aspect-[770/844] bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144772/public_assets_shop4/public_assets_shop4_ShopCollection2.svg')] mt-6 sm:mt-8 md:mt-10 group">
            {/* Image only - no overlay or text */}
            <div className="absolute inset-0 border-4 sm:border-6 lg:border-8 border-transparent group-hover:border-white transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PureGol;