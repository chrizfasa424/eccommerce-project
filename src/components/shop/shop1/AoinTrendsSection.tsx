import { Link } from 'react-router-dom';

const AoinTrendsSection = () => {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto bg-white pt-8 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 overflow-hidden">
      {/* Mobile Layout: Stacked, no frames */}
      <div className="flex flex-col md:hidden items-center gap-6">
        <h1 className="text-center font-normal leading-9 text-2xl font-playfair text-gray-900">
          Discover the trends that resonate with you. Dive into Aoin today.
        </h1>
        <video
          src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691055/public_assets_videos/Aoin3.mp4"
          className="w-full max-w-xs h-40 object-cover rounded-lg"
          autoPlay
          loop
          muted
          playsInline
        />
        <Link 
          to="/shop1-allproductpage"
          className="bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition mt-2 inline-block text-center"
        >
          SHOP NOW
        </Link>
      </div>

      {/* Desktop Layout: Absolute, with frames */}
      <div className="hidden gap-10 md:block">
        {/* Text overlay */}
        <div className="absolute top-0 left-0 w-full  h-[200px] lg:h-[728px] flex items-center justify-center pointer-events-none z-20 px-4">
          <h1 className="text-center font-normal leading-[60px] text-[48px] font-playfair text-gray-900 max-w-4xl">
            Discover the trends that resonate <br className="hidden sm:block" />
            with you. Dive into Aoin today.
          </h1>
        </div>

        {/* Left Image with Frame */}
        <div className="absolute top-40 left-16 z-10 hidden lg:block">
          <div className="relative w-[356px] h-[520px]">
            {/* Shifted Frame corners */}
            <div className="absolute inset-0 top-[36px] bottom-[36px]">
              <div className="absolute top-1 -left-1 w-24 h-[2.5px] bg-black" />
              <div className="absolute top-1 -left-1 h-24 w-[2.5px] bg-black" />
              <div className="absolute bottom-1 right-0 w-24 h-[2.5px] bg-black" />
              <div className="absolute bottom-1 right-0 h-24 w-[2.5px] bg-black" />
            </div>
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745100/public_assets_shop1_LP/public_assets_images_Aoin1.svg"
              alt="Headwrap"
              className="w-full hidden lg:block h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Image with Frame */}
        <div className="absolute top-12 right-16 z-10 hidden lg:block">
          <div className="relative w-[356px] h-[828px]">
            {/* Frame corners */}
            <div className="absolute inset-0 top-[56px] bottom-[36px]">
              <div className="absolute -top-2 -left-0 w-24 h-[2.5px] bg-black" />
              <div className="absolute -top-2 -left-0 h-24 w-[2.5px] bg-black" />
              <div className="absolute bottom-3 -right-0 w-24 h-[2.5px] bg-black" />
              <div className="absolute bottom-3 -right-0 h-24 w-[2.5px] bg-black" />
            </div>
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745103/public_assets_shop1_LP/public_assets_images_Aoin2.svg"
              alt="Orange skirt"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Spacer for image section height */}
        <div className="h-[100px] lg:h-[420px]" />

        {/* Center video below the image layer */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Button overlaps the top of the video */}
          <Link 
            to="/shop1-allproductpage"
            className="absolute -top-6 bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition z-10 inline-block text-center"
          >
            SHOP NOW
          </Link>

          <video
            src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691055/public_assets_videos/Aoin3.mp4"
            className="w-[356px] h-[320px] object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default AoinTrendsSection;
