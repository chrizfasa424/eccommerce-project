const CelebrateFestival = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] mt-10 sm:mt-16 md:mt-20 lg:mt-32 xl:mt-56 mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-24">
      {/* Base image (2nd image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales1.svg" 
        alt="Base festival celebration" 
        className="w-full h-full object-cover"
      />
      
      {/* First image overlapping (1st image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales2.svg" 
        alt="Festival celebration" 
        className="absolute bottom-[0px] transform -translate-x-1/8 -translate-y-1/8 min-w-[769px] min-h-[750px] w-[769px] h-[750px] z-20 object-contain"
      />
      
      {/* Third image overlapping (3rd image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales3.svg" 
        alt="Festival celebration details" 
        className="absolute top-1/2 left-[770px] sm:right-[150px] md:right-[200px] lg:right-[300px] xl:right-[390px] transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[350px] xl:w-[383px] xl:h-[485px] z-20 object-contain"
      />

      {/* SVG Circle over 3rd image */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[80px] sm:top-[100px] md:top-[120px] lg:top-[150px] xl:top-[200px] left-[760px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Second SVG Circle */}
     

      {/* Text Overlays */}
      <div className="absolute top-1/2 right-[20px] sm:right-[40px] md:right-[60px] lg:right-[80px] xl:right-[220px] transform -translate-y-1/2 z-30 text-white w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[579px] h-auto">
        {/* SALES MODELS label */}
        <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[14px] font-normal mb-1 sm:mb-2 tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] xl:tracking-[3.5px] uppercase text-white font-abeezee leading-normal">SALES MODELS</div>
        
        {/* Main headline */}
        <h1 className="w-[740px] text-white font-abeezee text-[50px] font-normal leading-tight tracking-[7.5px] uppercase mb-2 sm:mb-3 md:mb-8">
          Celebrate Festivals with Upto 30% OFF on Spiritual Essentials
        </h1>
        
        {/* Subtitle */}
        <p className="text-[12px] sm:text-[14px] md:text-[15px] xl:text-[16px] font-normal font-futura leading-[1.4] sm:leading-[1.5] md:leading-[1.6] xl:leading-[30px] text-white mb-1 sm:mb-2">
          often carries a sense of mystery, drama, or alternative sensibility.
        </p>
        
        {/* Description */}
        <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-futura xl:text-[16px] text-gray-200 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          It's a fashion
        </p>
        
        {/* VIEW ALL Button */}
        <button className="w-[100px] h-[35px] sm:w-[110px] sm:h-[40px] md:w-[120px] md:h-[45px] lg:w-[130px] lg:h-[48px] xl:w-[136px] xl:h-[50px] rounded-[190px] bg-[#BB9D7B] text-white text-[8px] sm:text-[10px] md:text-[11px] xl:text-[12px] font-medium tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] xl:tracking-[3px] uppercase font-futura leading-normal transition-colors hover:bg-[#A88A6A]">
          VIEW ALL
        </button>
      </div>

      {/* Small text box on first image - centered */}
      <div className="absolute bottom-[100px] sm:bottom-[120px] md:bottom-[140px] lg:bottom-[160px] xl:bottom-[160px] left-[600px] transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(181,181,181,0.90)] rounded-[5px] p-2 sm:p-2.5 md:p-3 z-30 w-[169px] h-[87px] flex-shrink-0">
        <div className="px-1 pt-1 sm:pt-1 md:pt-1">
          <div className="text-black font-['ABeeZee'] text-[8px] sm:text-[10px] md:text-[11px] xl:text-[12px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] xl:tracking-[3px] uppercase mb-0.5 sm:mb-1">Diya</div>
          <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[12px] font-light font-sans leading-4 sm:leading-5">A spark of faith in</div>
          <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[12px] font-light font-sans leading-4 sm:leading-5">every flame.</div>
        </div>
      </div>
    </div>
  )
}

export default CelebrateFestival
