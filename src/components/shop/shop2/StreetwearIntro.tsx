import React from 'react';

const StreetwearIntro = () => {
  return (
    <section className="hidden md:block relative w-screen h-[1024px]  bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center overflow-hidden flex items-center justify-center">
      {/* Left Content */}
      <div className="flex flex-col mb-24 gap-1  max-w-[600px] px-4 sm:px-6 md:px-8 lg:px-0">
        <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[1] font-archivio mb-6 sm:mb-8 lg:mb-24 font-black">
          EXPERIENCE THE <br />
          EVOLUTION OF <br />
          STREETWEAR <br />
          FASHION
        </h1>

        <div className="bg-[#FF0000] p-4 sm:p-6 lg:p-8 rounded-[14px] text-white w-full sm:w-[280px] md:w-[300px] lg:w-[315px] h-[280px] sm:h-[320px] md:h-[340px] lg:h-[350px] flex flex-col justify-between">
            <div>
                <p className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-none">50%</p>
                <p className="text-sm sm:text-base text-[#F8BEBE] mt-1">Increase in Sales Year over Year</p>
            </div>

            <div>
                <p className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-none">50%</p>
                <p className="text-sm sm:text-base text-[#F8BEBE] mt-1">Customer Satisfaction Rate</p>
            </div>

            <button className="mt-2 bg-[#D86342] text-white font-bold text-[14px] sm:text-[16px] w-3/5 py-2 sm:py-3 rounded-md uppercase tracking-wide">
                See More
            </button>
        </div>

      </div>

      {/* Right Side */}
      <div className="hidden sm:block relative w-full sm:w-[500px] md:w-[600px] lg:w-[692px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[510px] mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Text Overlay */}
        <div className="absolute -top-48 sm:-top-48 md:-top-48 lg:-top-48 left-8 sm:left-16 md:left-32 lg:left-64 max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] text-[14px] sm:text-[16px] lg:text-[18px] text-gray-300 leading-relaxed z-20">
          Discover our brand's impressive growth, loyal <br />
          customer base, and diverse product range that sets us <br />
          apart in the streetwear fashion industry.
        </div>

        {/* Purple Shape */}
        
        <div
          className="w-full h-full bg-[#A799F5]"
          style={{
            clipPath: 'polygon(100px 0%, 100% 0%, 100% calc(100% - 100px), calc(100% - 100px) 100%, 0% 100%, 0% 100px)',

            borderRadius: '8px',
          }}
        ></div>

        {/* Model Image */}
        <img
          src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059209/public_assets_shop2/public_assets_shop2_Intro.svg"
          alt="Fashion Model"
          className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[408px] h-[300px] sm:h-[375px] md:h-[450px] lg:h-[612px] object-contain z-30"
        />
      </div>
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 w-full sm:w-[800px] md:w-[1100px] lg:w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />

    </section>
  );
};

export default StreetwearIntro;
