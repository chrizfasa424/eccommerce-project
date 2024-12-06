import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const images = [
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/newproductcarousel_Image1.svg",
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/newproductcarousel_Image2.svg",
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/newproductcarousel_Image3.svg"
];

const NewProductCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="w-full relative py-2 pb-3">
      <div 
        ref={containerRef}
        className="relative w-full h-auto aspect-[16/6] sm:aspect-[16/5] md:aspect-[16/4.5] lg:aspect-[16/4]"
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          width: '100vw'
        }}
      >
        <motion.div
          className="flex h-full"
          style={{
            width: `${images.length * 100}%`,
          }}
          animate={{
            x: -current * containerWidth,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 32,
            mass: 1.5,
            ease: "easeInOut",
            duration: 1.2,
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0"
              style={{
                width: `${100 / images.length}%`,
                height: '100%'
              }}
            >
              <Link to="/new-product" className="block h-full">
                <img 
                  src={src} 
                  alt={`Carousel ${idx + 1}`} 
                  className="w-full h-full object-contain sm:object-cover"
                  style={{
                    backgroundColor: '#f8f8f8'
                  }}
                />
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === idx ? 'bg-black w-4' : 'bg-gray-400'
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProductCarousel;
