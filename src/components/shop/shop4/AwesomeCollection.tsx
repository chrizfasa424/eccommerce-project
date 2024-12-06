import { Link } from 'react-router-dom';

const AwesomeCollection = () => {
  return (
    <div className="w-full h-full  bg-black">
      {/* Header and Title Section */}
      <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
          <span className="text-white font-['ABeeZee'] text-[20px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-normal leading-[60px] sm:leading-[80px] md:leading-[100px] lg:leading-[120px] tracking-[2px] sm:tracking-[4px] md:tracking-[5px] lg:tracking-[6px] uppercase text-center sm:text-left">YOUR STYLE</span>
          <div className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[67px] rounded-[105px] sm:rounded-[150px] md:rounded-[180px] lg:rounded-[210px] overflow-hidden">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144737/public_assets_shop4/public_assets_shop4_Awesome1.svg" 
              alt="Beaded jewelry" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-['ABeeZee'] text-[20px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-normal leading-[60px] sm:leading-[80px] md:leading-[100px] lg:leading-[120px] tracking-[2px] sm:tracking-[4px] md:tracking-[5px] lg:tracking-[6px] uppercase text-center sm:text-left">YOUR RULES</span>
        </div>
        <div className="text-center mt-4 sm:mt-6">
          <h2 className="text-white text-center font-['ABeeZee'] text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-normal leading-normal tracking-[2px] sm:tracking-[4px] md:tracking-[5px] lg:tracking-[6px] uppercase px-4">AOIN POOJA BLESSINGS TO ALL</h2>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-16 py-4 sm:py-6 md:py-16 overflow-x-auto  lg:ml-[100px] 2xl:ml-[165px] ">
        {/* Card 1: 1200+ Awesome Collection */}
        <div className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[559px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[577px] rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144737/public_assets_shop4/public_assets_shop4_Awesome2.svg" 
            alt="Puja collection" 
            className="w-full h-full object-cover"
          />
          {/* Text overlay positioned exactly like the image */}
          <div className="absolute top-4 sm:top-28 left-[40px] sm:left-[80px] text-white">
            <div className="text-[50px] font-poppins font-medium leading-[44px] text-black mb-6">1200+</div>
            <div className="text-[50px] font-['ABeeZee'] font-normal leading-[60px] tracking-[7.5px] uppercase bg-gradient-to-b from-red-800 to-red-900 bg-clip-text text-transparent">AWESOME</div>
            <div className="text-[50px] font-['ABeeZee'] font-normal leading-[60px] tracking-[7.5px] uppercase text-black ">COLLECTION</div>
          </div>
          {/* Button positioned over the incense sticks area */}
          <div className="absolute bottom-[200px] left-[80px] transform ">
            <Link to="/shop4-Allproductpage" className="flex w-[156px] h-[50px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[30px] bg-[#BB9D7B] text-black font-poppins text-[12px] font-semibold tracking-[3px] uppercase hover:bg-[#A88A6A] transition-colors duration-200">
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* Container for Cards 2, 3, 4 */}
        <div className="flex  gap-6 flex-shrink-0">
          {/* Card 2: Luxury Collection's */}
          <div className="relative w-full sm:w-[200px] md:w-[250px] lg:w-[433px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[575px] rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144737/public_assets_shop4/public_assets_shop4_Awesome3.svg" 
              alt="Luxury collection" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end justify-center ">
              <div className="w-[434px] h-[205px] flex-shrink-0 rounded-[15px] border-2 border-[#BB9D7B] bg-[rgba(33,33,33,0.90)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <div className="text-white text-center mb-4">
                  <div className="text-[24px] sm:text-[28px] md:text-[32px] font-futura font-bold leading-tight mb-2">
                    Luxury Collection's
                  </div>
                </div>
                <button className="bg-[#BB9D7B] text-white font-poppins text-[12px] font-semibold tracking-[2px] uppercase px-6 py-3 rounded-[25px] hover:bg-[#A88A6A] transition-colors duration-200">
                  SHOP NOW
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-white group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-[30px] font-futura font-bold text-white leading-normal whitespace-nowrap">Luxury Collection's</div>
              
            </div>
          </div>

          {/* Card 3: Smart Collection's */}
          <div className="relative w-full sm:w-[200px] md:w-[250px] lg:w-[433px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[575px] rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144737/public_assets_shop4/public_assets_shop4_Awesome4.svg" 
              alt="Smart collection" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end justify-center ">
              <div className="w-[434px] h-[205px] flex-shrink-0 rounded-[15px] border-2 border-[#BB9D7B] bg-[rgba(33,33,33,0.90)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <div className="text-white text-center mb-4">
                  <div className="text-[24px] sm:text-[28px] md:text-[32px] font-futura font-bold leading-tight mb-2">
                    Smart Collection's
                  </div>
                </div>
                <button className="bg-[#BB9D7B] text-white font-poppins text-[12px] font-semibold tracking-[2px] uppercase px-6 py-3 rounded-[25px] hover:bg-[#A88A6A] transition-colors duration-200">
                  SHOP NOW
                </button>
              </div>
            </div>
           
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-white group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-[30px] font-futura font-bold text-white leading-normal whitespace-nowrap">Smart Collection's</div>
              
            </div>
          </div>

          {/* Card 4: Hybrid Collection's */}
          <div className="relative w-full sm:w-[200px] md:w-[250px] lg:w-[433px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[575px] rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144737/public_assets_shop4/public_assets_shop4_Awesome5.svg" 
              alt="Hybrid collection" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end justify-center ">
              <div className="w-[434px] h-[205px] flex-shrink-0 rounded-[15px] border-2 border-[#BB9D7B] bg-[rgba(33,33,33,0.90)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <div className="text-white text-center mb-4">
                  <div className="text-[24px] sm:text-[28px] md:text-[32px] font-futura font-bold leading-tight mb-2">
                    Hybrid Collection's
                  </div>
                </div>
                <button className="bg-[#BB9D7B] text-white font-poppins text-[12px] font-semibold tracking-[2px] uppercase px-6 py-3 rounded-[25px] hover:bg-[#A88A6A] transition-colors duration-200">
                  SHOP NOW
                </button>
              </div>
            </div>
           
           <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-white group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-[30px] font-futura font-bold text-white leading-normal whitespace-nowrap">Hybrid Collection's
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwesomeCollection;