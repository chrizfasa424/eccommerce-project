const Collaboration = () => {
  return (
    <div className="w-screen min-h-[100vh] md:h-[100vh] lg:h-[1024px] bg-[#EBD6FF] font-sans overflow-hidden relative flex flex-col items-center">
      {/* Top Text */}
      <div className="text-center pt-4 xs:pt-6 sm:pt-10 mt-2 xs:mt-4 sm:mt-5 z-20">
        <p className="text-[10px] xs:text-xs sm:text-sm font-semibold font-montserrat text-[#475F47] uppercase tracking-wider">
          in Collaboration with
        </p>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-wider mt-1">
          <span className="text-white font-bebas text-[36px] xs:text-[48px] sm:text-[94px] stroke-text">RICH BRIAN</span>
        </h1>
      </div>

      {/* Crossed Straps */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Strap 1 */}
        <div className="absolute w-[250vw] sm:w-[200vw] rotate-[8.56deg] top-[15vh] xs:top-[160px] sm:top-[220px] left-1/2 -translate-x-1/2 h-[80px] xs:h-[110px] sm:h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black font-extrabold text-[32px] xs:text-[48px] sm:text-[64px] lg:text-[80px]">
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -{" "}
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>

        {/* Strap 2 */}
        <div className="absolute w-[250vw] sm:w-[200vw] rotate-[-6.28deg] top-[15vh] xs:top-[160px] sm:top-[220px] left-1/2 -translate-x-1/2 h-[80px] xs:h-[110px] sm:h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black text-[32px] xs:text-[48px] sm:text-[64px] lg:text-[80px] font-bold">
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST - {" "}
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="relative z-20 mt-[25vh] xs:mt-[300px] sm:mt-[400px] px-2 xs:px-4 sm:px-10 pb-10 sm:pb-20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 md:gap-10 justify-items-center w-full max-w-[1440px]">
        {/* Card 1 */}
        <div className="text-center mb-5 xs:mb-24 md:mb-0 mt-0 xs:mt-3 md:mt-10 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/images/similar2.jpg"
            alt="Black Mamba Jacket"
            className="w-[160px] xs:w-[220px] sm:w-[274px] h-[200px] xs:h-[270px] sm:h-[344px] object-cover mx-auto shadow-lg"
          />
          <p className="mt-2 text-[11px] xs:text-xs sm:text-sm font-semibold underline underline-offset-4 hover:text-[#475F47] transition-colors duration-300">
            Black Mamba Jacket <span>↗</span>
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center  mb-3 xs:mb-0    -mt-4 xs:-mt-0  sm:-mt-0 md:-mt-14 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/images/similar3.jpg"
            alt="Dat-Stick Sweater"
            className="w-[170px] xs:w-[240px] sm:w-[293px] h-[210px] xs:h-[300px] sm:h-[369px] object-cover mx-auto shadow-lg"
          />
          <p className="mt-2 text-[11px] xs:text-xs sm:text-sm font-semibold underline underline-offset-4 hover:text-[#475F47] transition-colors duration-300">
            Dat-Stick Sweater <span>↗</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center -mt-2 xs:-mt-2 sm:-mt-24 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/images/similar4.jpg"
            alt="100 Degree Sweater"
            className="w-[160px] xs:w-[220px] sm:w-[278px] h-[200px] xs:h-[270px] sm:h-[349px] object-cover mx-auto shadow-lg"
          />
          <p className="mt-2 text-[11px] xs:text-xs sm:text-sm font-semibold underline underline-offset-4 hover:text-[#475F47] transition-colors duration-300">
            100 Degree Sweater <span>↗</span>
          </p>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 xs:w-[50px] xs:h-[50px] sm:w-[71px] sm:h-[71px] bg-black"></div>
      <div className="absolute top-6 left-6 w-6 h-6 xs:top-[40px] xs:left-[35px] xs:w-[30px] xs:h-[30px] sm:top-[60px] sm:left-[65px] sm:w-[50px] sm:h-[50px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-black"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 xs:bottom-10 xs:right-10 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-black"></div>

      <div className="absolute bottom-2 xs:bottom-6 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </div>
  );
};

export default Collaboration;
