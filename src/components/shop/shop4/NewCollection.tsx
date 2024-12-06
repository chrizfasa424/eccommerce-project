const NewCollection = () => {
  return (
    <div className="bg-black min-h-screen flex px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pb-20 sm:pb-32 md:pb-60 lg:pb-80 pt-16 sm:pt-20 md:pt-24 lg:pt-28 mx-auto justify-center">
      <div className="max-w-[1662px] w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-1 items-center">
        
        {/* Left Section - Text and Call to Action */}
        <div className="space-y-4 sm:space-y-6 lg:ml-auto order-1 lg:order-1">
          <div className="text-white">
            <p className="text-white text-left font-abeezee text-xs sm:text-sm font-normal leading-normal tracking-[2px] sm:tracking-[3.5px] uppercase mb-2 sm:mb-4">NEW COLLECTIONS</p>
            <h1 className="text-white font-abeezee text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-normal leading-snug tracking-[3px] sm:tracking-[5px] lg:tracking-[7.5px] uppercase mb-4 sm:mb-6 max-w-full lg:max-w-[521px]">
              PURITY MEETS<br />ELEGANCE
            </h1>
            <p className="text-white font-abezee text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-normal mb-4 sm:mb-6 lg:mb-8 leading-relaxed lg:leading-[35px] capitalize max-w-full lg:max-w-[521px]">
              Crafted For The Devoted. Designed For The Divine. Each Pooja Thali Reflects The Purity Of Tradition And The Elegance Of Craftsmanship.
            </p>
          </div>
          <button className="w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-[50px] flex-shrink-0 rounded-[190px] bg-[#BB9D7B] text-white font-futura text-xs sm:text-[12px] font-medium leading-normal tracking-[1.5px] sm:tracking-[3px] uppercase transition-colors duration-300">
            BUY NOW
          </button>
        </div>

        {/* Central Section - Image */}
        <div className="flex w-full lg:[500px] 2xl:w-[607px] h-auto lg:h-[840px] flex-col justify-center items-center flex-shrink-0 order-2 lg:order-2">
          <div className="relative w-full h-full flex items-center justify-center group">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144763/public_assets_shop4/public_assets_shop4_NewCollection.svg" 
              alt="New Collection" 
              className="w-full h-auto object-contain transition-all duration-300"
            />
            <div className="absolute inset-0 border-4 sm:border-6 lg:border-8 border-transparent group-hover:border-white transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Right Section - Feature List */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-28 lg:ml-24 order-3 lg:order-3">
          <div className="w-full lg:w-[550px] h-auto lg:h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[2px] sm:tracking-[3px] lg:tracking-[4px] uppercase flex items-center">
            CRAFTED FROM PREMIUM MATERIALS
          </div>
          <div className="w-full lg:w-[550px] h-auto lg:h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[2px] sm:tracking-[3px] lg:tracking-[4px] uppercase flex items-center lg:ml-28">
            HAND-ENGRAVED DETAILING
          </div>
          <div className="w-full lg:w-[550px] h-auto lg:h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[2px] sm:tracking-[3px] lg:tracking-[4px] uppercase flex items-center lg:ml-28">
            CURATED FOR SACRED PRECISION
          </div>
          <div className="w-full lg:w-[550px] h-auto lg:h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[2px] sm:tracking-[3px] lg:tracking-[4px] uppercase flex items-center">
            AESTHETIC MEETS DEVOTION
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewCollection
