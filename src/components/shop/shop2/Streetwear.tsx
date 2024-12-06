import React from 'react';

const Streetwear: React.FC = () => {
  return (
    <section className="relative w-screen sm:h-[140vh] md:h-[135vh] lg:h-[100vh] xl:h-[120vh] h-[150vh] bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center overflow-hidden flex items-center justify-center py-16 sm:py-0">
      {/* Wrapper to center the content */}
      <div className="w-full flex items-center justify-center px-4 sm:px-6">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-32 items-center">
          {/* Left: Model with purple background and vertical text */}
          <div className="relative flex items-center justify-center lg:justify-start">
            <div className="relative bg-[#CD9CFF] w-full max-w-[311px] h-[600px] sm:h-[697px] rounded-xl flex items-end mx-auto">
              {/* Vertical Text */}
              <div className="absolute left-[-180px] xs:left-[-180px] md:left-[-330px] sm:left-[-250px] top-1/2 transform -translate-y-1/2 rotate-[-90deg] overflow-hidden">
                <h2 className="text-[64px] sm:text-[90px] md:text-[120px] font-black tracking-tight leading-none text-black whitespace-nowrap">
                  STREETWEAR
                </h2>
              </div>

              {/* Model image */}
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059274/public_assets_shop2/public_assets_shop2_street.svg"
                alt="Streetwear model"
                className="absolute bottom-0 left-[-20px] sm:left-[-35px] w-[300px] sm:w-[400px] lg:w-[443px] h-[500px] sm:h-[600px] object-contain z-10 max-w-none"
              />
            </div>
          </div>

          {/* Right: Info cards */}
          <div className="space-y-8 sm:space-y-8 w-full max-w-[562px] mx-auto">
            <div className="group bg-[#4AB4FF] rounded-xl p-6 sm:p-8 shadow-md w-full h-auto sm:h-[184px] border border-[#87CEEB] hover:bg-transparent group-hover:border-white transition-all duration-300">
              <h3 className="text-[22px] sm:text-[28px] font-extrabold text-black group-hover:text-white mb-3">
                EXCLUSIVE DESIGNS
              </h3>
              <p className="text-black text-sm sm:text-base leading-relaxed group-hover:text-white">
                Our streetwear fashion is known for its exclusive designs, combining style and uniqueness to make you stand out from the crowd.
              </p>
            </div>

            <div className="group rounded-xl p-6 sm:p-8 border border-gray-500 bg-transparent w-full h-auto sm:h-[184px] hover:bg-[#E3A918] transition-colors duration-300">
              <h3 className="text-[22px] sm:text-[28px] font-extrabold text-white group-hover:text-black mb-3">
                PREMIUM MATERIALS
              </h3>
              <p className="text-gray-300 group-hover:text-black text-sm sm:text-base leading-relaxed">
                We use only the highest quality materials to ensure that our streetwear fashion is not only stylish but also durable and comfortable.
              </p>
            </div>

            <div className="group rounded-xl p-6 sm:p-8 border border-gray-500 bg-transparent w-full h-auto sm:h-[184px] hover:bg-[#81FF02] transition-colors duration-300">
              <h3 className="text-[22px] sm:text-[28px] font-extrabold text-white group-hover:text-black mb-3">
                SUSTAINABILITY COMMITMENTS
              </h3>
              <p className="text-gray-300 group-hover:text-black text-sm sm:text-base leading-relaxed">
                We are committed to sustainability, using eco-friendly materials and ethical manufacturing processes to reduce our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-8 sm:bottom-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default Streetwear;
