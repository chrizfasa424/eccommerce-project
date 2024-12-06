import React, { useState } from "react";


const products = [
  {
    id: 1,
    image: "/assets/images/Productcard/hero3.jpg",
    badge: "-30%",
    badgeType: "discount",
    name: "Glow up own the night neon is the  vibe",
    price: 154,
    originalPrice: 265,
  },
  {
    id: 2,
    image: "/assets/images/Productcard/hero2.jpg",
    badge: null,
    badgeType: null,
    name: "Glow loud stay lit neon’s the vibe",
    price: 265,
    originalPrice: null,
  },
  {
    id: 3,
    image: "/assets/images/Productcard/hero3.jpg",
    badge: "Free shipping",
    badgeType: "shipping",
    name: "Loud bold unstoppable your party shoes",
    price: 26.4,
    originalPrice: null,
  },
];

const Finishing: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Carousel navigation (for 3 cards, but can be extended)
  const prev = () => setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));

  return (
    <>
      <section className="w-full mx-auto h-full bg-black flex flex-col items-center justify-center py-4 px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-[1920px] md:h-[842px] mx-auto flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1820"
            height="4"
            viewBox="0 0 1820 4"
            fill="none"
            className="mb-8 flex-shrink-0 hidden md:block"
          >
            <rect width="1820" height="1" fill="#E0E0E0" />
          </svg>
          <div className="w-full max-w-[1190px] pt-8 md:pt-14 mb-2 mx-auto">
            <h2
              className="text-white text-3xl sm:text-4xl md:text-[56.882px] leading-tight md:leading-[63.992px] font-normal mb-6 md:mb-12 text-left font-bebas "
            >
              THE PERFECT FINISHING TOUCH
            </h2>
          </div>
          <div className="relative w-full flex items-center justify-center">
            {/* Left Arrow */}
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute left-2 sm:left-6 md:left-[60px] top-1/2 -translate-y-1/2 z-10 bg-lime-400 hover:bg-lime-300 text-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg border-2 border-black focus:outline-none  xs:flex"
            >
              <span className="text-2xl md:text-3xl font-bold">&#8592;</span>
            </button>
            {/* Cards */}
            <div className="flex gap-4 md:gap-6 w-full justify-center overflow-x-auto md:overflow-visible px-1 scrollbar-thin scrollbar-thumb-lime-400 scrollbar-track-black">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`rounded-2xl shadow-lg flex flex-col w-[260px] xs:w-[320px] sm:w-[340px] md:w-[373px] min-w-[260px] xs:min-w-[320px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] transition-transform duration-300 ${
                    idx === current ? "scale-100" : "scale-100 "
                  }`}
                >
                  <div className="relative w-[260px] xs:w-[320px] sm:w-[340px] md:w-[373px] h-[300px] xs:h-[380px] sm:h-[420px] md:h-[461px] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold ${
                          product.badgeType === "discount"
                            ? "bg-lime-400 text-black"
                            : "bg-lime-400 text-black"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="px-0.5 pb-4 flex flex-col flex-1">
                    <div className="text-white text-base sm:text-[16px] font-alexandria font-semibold mb-2 leading-tight">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      {product.originalPrice && (
                        <span className="text-white text-base sm:text-lg font-semibold line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-lime-400 text-base sm:text-lg font-bold">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Arrow */}
            <button
              aria-label="Next"
              onClick={next}
              className="absolute right-2 sm:right-6 md:right-[60px] top-1/2 -translate-y-1/2 z-10 bg-lime-400 hover:bg-lime-300 text-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg border-2 border-black focus:outline-none xs:flex"
            >
              <span className="text-2xl md:text-3xl font-bold">&#8594;</span>
            </button>
          </div>
        </div>
      </section>
     
    </>
  );
};

export default Finishing;
