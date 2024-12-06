const NewlyUpdated = () => {
  return (
    <div className="w-full py-10">
      {/* Header Section - Black Background */}
              <div className="w-full bg-black pb-28">
          <div className="w-[1725px] h-[59px] ml-[138px] mx-auto flex justify-between items-center">
            <span className="text-white uppercase font-normal text-[50px] leading-normal tracking-[7.5px] whitespace-nowrap" style={{ fontFamily: 'ABeeZee' }}>
              FREE SHIPPING ABOVE $40
            </span>
            <span className="text-white uppercase font-normal text-[50px] leading-normal tracking-[7.5px] whitespace-nowrap" style={{ fontFamily: 'ABeeZee' }}>
              30 DAYS RETURN POLICY
            </span>
          </div>
        </div>

      {/* Hero Section - Pink Background */}
      <div className="w-full h-[750px] relative overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144761/public_assets_shop4/public_assets_shop4_HeroBanner.svg')]">
        <div className="container h-full relative">
          {/* Main Content */}
          <div className="absolute top-[350px] right-[10px] transform -translate-y-1/2 z-10">
            <div className="text-left max-w-lg ">
              <p className="text-left mb-3 text-[#960B0B] font-poppins text-base font-medium tracking-[4px] uppercase">
                NEWLY UPDATED
              </p>
              <h1 className="w-[733px] h-[69px] mb-4 uppercase font-normal text-[39px] leading-[70px] tracking-[5.85px] bg-gradient-to-r from-[#960B0B] to-[#300404] bg-clip-text text-transparent" style={{ fontFamily: 'ABeeZee' }}>
                ONLINE PUJA, REAL BLESSINGS
              </h1>
              <p className="text-[#960B0B] text-[16px] font-normal leading-[30px] mb-12 max-w-2xl " style={{ fontFamily: 'ABeeZee' }}>
                often carries a sense of mystery, drama, or alternative sensibility. It's a fashion
              </p>
              <button className="w-[156px] h-[50px] rounded-[30px] border border-white bg-transparent font-bold  transition-colors duration-300 text-[#960B0B] text-xs font-futura  tracking-[3px] uppercase" >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewlyUpdated;
