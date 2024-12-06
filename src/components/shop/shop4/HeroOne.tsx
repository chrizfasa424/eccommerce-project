// const Hero = () => {
//   return (
//     <>
//      <img src="/Sliders (1).png" alt=""/> 
//     </>
//   )
// }

// export default Hero



import { Search, ShoppingCart, Menu } from 'lucide-react';

const HeroOne = () => {
  return (
    <div className="min-h-screen mx-auto bg-black relative overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-10 max-w-[1920px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-18 py-6 md:py-12">
      <div className="text-white font-junge text-[22px] font-normal tracking-[3.3px] uppercase bg-gradient-to-r from-[#383838] to-[#9e9e9e] bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: '#aea8a8' }}>
          AOIN POOJA STORE
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Search 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <ShoppingCart 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <Menu 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center py-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-8 min-h-[calc(100vh-120px)] animate-fade-in-up">
        {/* Main Heading */}
        <h1
          className="md:text-[80px] leading-[1] tracking-[0.15em] font-normal uppercase text-white text-center mb-2  font-abeezee"
        >
          TIMELESS RITUALS.
        </h1>

        
        {/* Sub Heading Line 1 */}
        <h2 className="text-[80px] font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.15em] uppercase leading-tight">
          <span className="text-[#BB9D7B] italic font-abeezee text-[80px] font-normal  uppercase" style={{ fontStyle: 'italic', fontWeight: 400 }}>CONTEMPORARY</span>{' '}
          <span className="text-[#BB9D7B] italic font-abeezee text-[80px] font-normal   uppercase" style={{ fontStyle: 'italic', fontWeight: 400 }}>DESIGN</span>
          <span className="text-white font-abeezee" style={{ fontWeight: 100 }}>.ONLY</span>
        </h2>
        
        {/* Sub Heading Line 2 */}
        <h2 className="text-[80px] font-light tracking-[0.1em] sm:tracking-[0.15em] font-abeezee uppercase leading-[1] mb-8 md:mb-12">
          <span className="text-white font-abeezee text-[80px] font-normal leading-normal uppercase">AT</span>{' '}
          <span className="text-[#F26340] font-abeezee text-[80px] font-normal leading-normal  uppercase">
            AOIN
          </span>
          <span className="text-white font-abeezee" style={{ fontWeight: 100 }}>.</span>
        </h2>
        
        <div className="w-full max-w-[1920px] mx-auto p-2 sm:p-4 md:p-4 rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] relative">
          {/* Decorative SVG Border */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1859" height="858" viewBox="0 0 1859 858" fill="none" className="absolute inset-0 w-full h-full">
            <path d="M20 1.5H585.168C595.385 1.50013 603.668 9.78281 603.668 20V338C603.668 349.874 613.294 359.5 625.168 359.5H1232.6C1244.48 359.5 1254.1 349.874 1254.1 338V20C1254.1 9.78274 1262.39 1.5 1272.6 1.5H1839C1849.22 1.5 1857.5 9.78273 1857.5 20V838C1857.5 848.217 1849.22 856.5 1839 856.5H20C9.78273 856.5 1.5 848.217 1.5 838V20C1.5 9.78274 9.78273 1.5 20 1.5Z" stroke="#BB9D7B" strokeOpacity="0.3" strokeWidth="3"/>
          </svg>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 sm:gap-3 md:gap-0 relative z-10">
            {/* Column 1 - Single image */}
            <div className="col-span-1 lg:col-span-3 flex justify-center">
              <img 
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144750/public_assets_shop4/public_assets_shop4_Hero1.svg" 
                alt="Festive Diyas and Sweets" 
                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[560px] h-auto aspect-[560/807] object-cover rounded-[8px] sm:rounded-[12px] md:rounded-[16px]" 
              />
            </div>

            {/* Column 2 - Single image (wider) */}
            <div className="col-span-1 lg:col-span-3 flex items-end justify-center">
              <img 
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144750/public_assets_shop4/public_assets_shop4_Hero2.svg" 
                alt="Festive Table with Sweets and Flowers" 
                className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-[446px] aspect-[650/446] object-cover rounded-[8px] sm:rounded-[12px] md:rounded-[16px]" 
              />
            </div>

            {/* Column 3 - Two images stacked vertically */}
            <div className="col-span-1 lg:col-span-3 grid grid-rows-2 gap-2 sm:gap-3 md:gap-4 justify-items-center">
              <img 
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144750/public_assets_shop4/public_assets_shop4_Hero3.svg" 
                alt="Statue with Tea Lights" 
                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] h-auto aspect-[550/386] object-cover rounded-[8px] sm:rounded-[12px] md:rounded-[16px]" 
              />
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144750/public_assets_shop4/public_assets_shop4_Hero4.svg" 
                  alt="Evil Eye Charms and Jewelry" 
                  className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] h-auto aspect-[550/386] object-cover rounded-[8px] sm:rounded-[12px] md:rounded-[16px]" 
                />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#BB9D7B] text-white font-futurapt transition-all duration-300 hover:scale-105 shadow-lg text-xs font-medium tracking-[2px] sm:tracking-[3px] uppercase w-[100px] sm:w-[120px] md:w-[140px] lg:w-[156px] h-[32px] sm:h-[40px] md:h-[45px] lg:h-[50px] flex-shrink-0 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroOne;
    