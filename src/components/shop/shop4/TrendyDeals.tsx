const TrendyDeals = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] mt-10 sm:mt-16 md:mt-20 lg:mt-32 xl:mt-56 mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-24 overflow-hidden">
      {/* Base image */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy1.svg" 
        alt="Base watch offer" 
        className="w-full h-full object-cover"
      />
      
      {/* Second image overlapping */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy2.svg" 
        alt="Trendy deals" 
        className="absolute top-1/4 right-[-50px] sm:right-[-100px] md:right-[-150px] lg:right-[-200px] transform -translate-x-1/4 -translate-y-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[777px] xl:h-[750px] z-10 object-contain"
      />
      
      {/* Third image overlapping */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy3.svg" 
        alt="Trendy watch deals" 
        className="absolute top-1/2 right-[100px] sm:right-[150px] md:right-[200px] lg:right-[300px] xl:right-[390px] transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[350px] xl:w-[383px] xl:h-[485px] z-20 object-contain"
      />

      {/* SVG Circle over 3rd image */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[80px] sm:top-[100px] md:top-[120px] lg:top-[150px] xl:top-[175px] right-[200px] sm:right-[300px] md:right-[400px] lg:right-[600px] xl:right-[775px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Second SVG Circle */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[180px] sm:top-[220px] md:top-[260px] lg:top-[300px] xl:top-[360px] right-[150px] sm:right-[200px] md:right-[250px] lg:right-[400px] xl:right-[600px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Third SVG Circle */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[220px] sm:top-[270px] md:top-[320px] lg:top-[370px] xl:top-[450px] right-[200px] sm:right-[250px] md:right-[300px] lg:right-[500px] xl:right-[810px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Text Overlays */}
      <div className="absolute top-1/2 left-[20px] sm:left-[40px] md:left-[60px] lg:left-[80px] xl:left-[140px] transform -translate-y-1/2 z-30 text-white w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[579px] h-auto">
        {/* TRENDY DEALS label */}
        <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[14px] font-normal mb-1 sm:mb-2 tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] xl:tracking-[3.5px] uppercase text-white font-abeezee leading-normal">TRENDY DEALS</div>
        
        {/* Main headline */}
        <h1 className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[50px] font-normal font-abeezee leading-[1.2] sm:leading-[1.3] md:leading-[1.4] lg:leading-[1.5] xl:leading-[61px] tracking-[2px] sm:tracking-[4px] md:tracking-[5px] lg:tracking-[6px] xl:tracking-[7.5px] uppercase text-white mb-2 sm:mb-3 md:mb-4">
          UPTO 40% OFF ON POOJA SAMAGRI & FESTIVAL KITS!
        </h1>
        
        {/* Subtitle */}
        <p className="text-[12px] sm:text-[14px] md:text-[15px] xl:text-[16px] font-normal font-abeezee leading-[1.4] sm:leading-[1.5] md:leading-[1.6] xl:leading-[30px] text-white mb-1 sm:mb-2">
          Divine essentials for every occasion, now at special prices.
        </p>
        
        {/* Description */}
        <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-lg text-gray-200 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          Shop now and save on tradition with every purchase.
        </p>
        
        {/* VIEW ALL Button */}
        <button className="w-[100px] h-[35px] sm:w-[110px] sm:h-[40px] md:w-[120px] md:h-[45px] lg:w-[130px] lg:h-[48px] xl:w-[136px] xl:h-[50px] rounded-[190px] bg-[#BB9D7B] text-white text-[8px] sm:text-[10px] md:text-[11px] xl:text-[12px] font-medium tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] xl:tracking-[3px] uppercase font-futura leading-normal transition-colors hover:bg-[#A88A6A]">
          VIEW ALL
        </button>
      </div>

      {/* Small text box on first image - centered */}
      <div className="absolute bottom-[100px] sm:bottom-[120px] md:bottom-[140px] lg:bottom-[160px] xl:bottom-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 md:p-3 z-30 w-[100px] sm:w-[120px] md:w-[120px] lg:w-[120px] xl:w-[160px]">
        <div className="px-1 pt-1 sm:pt-1.5 md:pt-2">
          <div className="text-black font-['ABeeZee'] text-[8px] sm:text-[10px] md:text-[11px] xl:text-[12px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] xl:tracking-[3px] uppercase mb-0.5 sm:mb-1">TRENDY DEALS</div>
          <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[12px] font-light font-sans leading-4 sm:leading-5">mystery, drama, or</div>
          <div className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[12px] font-light font-sans leading-4 sm:leading-5">alternative sensibility.</div>
        </div>
      </div>
    </div>
  )
}

export default TrendyDeals
