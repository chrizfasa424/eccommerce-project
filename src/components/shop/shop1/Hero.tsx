import React, { useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822755/public_assets_shop1_LP/public_assets_images_arrow-right1.svg";
  const rightArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";

  const images = [
    "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752746041/public_assets_shop1_LP/public_assets_images_hero-image2.png",
    "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745156/public_assets_shop1_LP/public_assets_images_hero-image3.svg"
  ];

  return (
    <section className="relative bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Hero Text */}
        <div className="flex flex-row lg:flex-row justify-between items-start lg:items-center pt-6 xs:pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-4 xs:pb-6 sm:pb-8 md:pb-10 lg:pb-12 space-y-4 lg:space-y-0">
          {/* Text */}
          <div className="w-full lg:w-auto lg:flex-1">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-display font-boska text-gray-900 tracking-tight leading-[1.1] xs:leading-[1.15] sm:leading-[1.2] md:leading-[1.25] lg:leading-[1.3] xl:leading-[90px]">
              A NEW ERA OF<br />
              <em className="font-playfair italic font-medium text-gray-800">Elegance</em>{' '}
              <strong className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-display font-boska text-gray-900 tracking-tight leading-[1.1] xs:leading-[1.15] sm:leading-[1.2] md:leading-[1.25] lg:leading-[1.3] xl:leading-[90px]">AWAITS</strong>
            </h1>
          </div>

          {/* Arrows */}
          <div className="flex space-x-3 xs:space-x-4 lg:ml-8 lg:mt-[38px] lg:pb-3 self-end lg:self-auto">
            <button 
              className="group rounded-full flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110"
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
            >
              <img 
                src={rightHovered ? rightArrowHover : rightArrow}
                alt="Arrow Right"
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </button>
          </div>
        </div>

        {/* Image & Video Carousel */}
        <div className="overflow-hidden rounded-md shadow-md relative">
          <div className={styles.scrollContainer}>
            {/* 🔥 First Slide = Video */}
            <div className="relative flex-shrink-0 w-full">
              <video
                src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691070/public_assets_videos/hero.mp4"
                className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[650px] object-cover rounded-md"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* 🖼️ Remaining Image Slides */}
            {images.map((src, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-full"
              >
                <img
                  src={src}
                  alt={`Elegant Fashion ${index + 2}`}
                  className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[650px] object-cover object-center rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
