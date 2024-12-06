import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544913/svg_assets/rightcrousel_Image3.svg",
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/rightcrousel_Image2.svg",
  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/rightcrousel_Image3.svg"
];

const CAROUSEL_HEIGHT = 564; // px, adjust as needed for your SVG size + margin

const RightCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1400);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div
      style={{
        width: 368,
        height: CAROUSEL_HEIGHT,
        overflow: "hidden",
        position: "relative",
        borderRadius: 8,
        border: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${current * CAROUSEL_HEIGHT}px)`,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              height: CAROUSEL_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={src} alt={`SVG ${idx + 1}`} style={{ height: "100%", width: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightCarousel;
