import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE1_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component3_Image1.svg";
const UNION_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Union.svg";

const AoinMasteriece: React.FC = () => {
  return (
    <div className="min-h-screen relative w-full mx-auto bg-black flex items-center justify-center pt-12 pb-32">
      <div className="mx-auto max-w-[1800px] w-full px-2 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-12">
          {/* Left: Image with banners */}
          <div className="relative w-full max-w-[900px] sm:max-w-[600px] md:w-[765px] md:max-w-[765px] shadow-2xl aspect-[4/3] md:aspect-auto">
            {/* Ellipse and Union SVG Backgrounds (responsive position) */}
            <div
              className="absolute left-1/2 top-[80px] sm:left-[100px] sm:top-[500px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
              style={{
                width: 556,
                height: 556,
                borderRadius: 556,
                background: 'rgba(204, 255, 0, 0.25)',
                filter: 'blur(142px)',
                opacity: 1,
              }}
            />
            <img
              src={UNION_URL}
              alt="Union Background"
              className="hidden lg:block absolute left-1/2 top-[100px] sm:left-[100px] sm:top-[450px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
              style={{ width: 581, height: 581, opacity: 1 }}
            />
            {/* Inner container: image and strips, clipped */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl">
              {/* Main Image */}
              <img
                src={IMAGE1_URL}
                alt="Aoin Masterpiece Hero"
                className="w-full h-full object-cover min-h-[220px] md:w-[765px] md:h-[586px] relative z-10"
              />
              {/* Top Banner (strip) - above image */}
              <div
                className="absolute left-[-20px] sm:left-[-40px] md:left-[-60px] top-[60px] sm:top-[120px] md:top-[170px] w-[120%] sm:w-[130%] md:w-[140%] rotate-[-10deg] md:rotate-[-15deg] bg-[#CCFF00] py-1 sm:py-2 px-2 flex items-center justify-left shadow-xl z-20"
                style={{ zIndex: 20 }}
              >
                <span className="text-black font-extrabold text-[18px] sm:text-[28px] md:text-[47px] tracking-wide whitespace-nowrap">
                  DISCOUNT UP TO 80%   SHOP NOW!
                </span>
              </div>
              {/* Bottom Banner (strip) - above image */}
              <div
                className="absolute right-[10px] sm:right-[40px] md:right-[100px] bottom-[10px] sm:bottom-[20px] md:bottom-[30px] w-[120%] sm:w-[130%] md:w-[140%] rotate-[10deg] md:rotate-[25deg] bg-[#CCFF00] py-1 sm:py-2 px-2 flex items-center justify-center shadow-xl z-20"
                style={{ zIndex: 20 }}
              >
                <span className="text-black ml-4 sm:ml-8 md:ml-16 font-extrabold text-[22px] sm:text-[32px] md:text-[52px] tracking-wide whitespace-nowrap">
                  SHOP NOW!
                </span>
              </div>
            </div>
          </div>
          {/* Right: Text Content */}
          <div className="flex flex-col items-center md:items-start justify-center w-full max-w-full md:max-w-lg mt-8 md:mt-0 text-center md:text-left">
            <h1 className="aoin-animated-title text-white text-[36px] sm:text-[56px] md:text-[104px] font-normal font-bebas leading-none mb-8 sm:mb-16 md:mb-32 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              AOIN<br />MASTERIECE
            </h1>
            <p className="text-white text-[14px] sm:text-[16px] font-clash md:text-[16px] font-semibold mb-4 sm:mb-4 leading-relaxed">
              WITH OUR MASTERPIECE COLLECTION, WE HAVE CURATED A SERIES OF EXQUISITE AND EXTRAORDINARY EXCLUSIVE PIECES THAT SHOWCASE THE BEST OF CRAFTSMANSHIP AND DESIGN.<br /><br />
              EVERY ITEM IS CAREFULLY SELECTED TO CAPTIVATE AND INSPIRE, MAKING YOU FEEL LIKE A WALKING MASTERPIECE FASHION
            </p>
            <Link to="/shop3-allproductpage">
              <button className="mt-2 px-5 py-2 border border-white rounded-full text-white font-normal text-[14px] font-clash hover:bg-[#3D5914] transition-colors duration-300">
                EXPLORE COLLECTION
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AoinMasteriece;
