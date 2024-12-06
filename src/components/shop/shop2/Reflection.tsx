import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reflection = () => {
  const colors = ['#D5FF4F', '#02E6FF', '#F9A7DB'];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[90vh] sm:h-[100vh] md:h-[1024px] lg:h-[1024px] bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-[1440px] h-full px-4 sm:px-8 relative">

        {/* Gradient Title */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10 text-center">
          <h1 className="text-[11vw] sm:text-[96px] md:text-[88px] lg:text-[154px] font-bold tracking-wide font-zen text-transparent bg-clip-text bg-gradient-to-b from-[#17002C] to-[#4D0092] drop-shadow-[4px_0_0_#5C5353] leading-none">
            REFLECTION
          </h1>
        </div>

        {/* Center Circular Video */}
        <div className="absolute top-[27%] left-1/2 -translate-x-1/2 w-[60vw] max-w-[469px] aspect-[469/520] rounded-full overflow-hidden z-10">
          <video
            src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691057/public_assets_videos/Panther.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tagline */}
        <div
          className="absolute left-1/2 translate-x-[-50%] sm:left-auto sm:translate-x-0 sm:right-8 bottom-28 sm:bottom-30 text-center sm:text-left w-[90%] sm:w-[365px] font-inter text-[5vw] sm:text-[28px] font-semibold leading-snug z-10"
          style={{ color: colors[colorIndex] }}
        >
          <p>
            DESIGNED FOR <span className="underline">YOUR</span>
          </p>
          <p>
            <span className="underline">BEAUTIFUL</span> APPEARANCE
          </p>
        </div>

        {/* Button */}
        <Link to="/shop2-allproductpage">
          <button className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 sm:px-8 sm:py-3 font-zen text-[4vw] sm:text-[20px] md:text-[24px] text-white border border-[#4D107F] font-bold tracking-wide transition z-10">
            SEE ALL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reflection;
