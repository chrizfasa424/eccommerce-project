import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  product_id: number;
  product_name: string;
  selling_price: number;
  price: number;
  primary_image: string;
}

interface SimilarProductsProps {
  relatedProducts?: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ relatedProducts = [] }) => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Don't render the section if there are no related products
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822755/public_assets_shop1_LP/public_assets_images_arrow-right1.svg";
  const rightArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const formatPrice = (price: number): string => {
    return `$${price}`;
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold font-playfair text-black leading-tight">
          Similar <em className="italic font-light font-playfair">products</em>
        </h2>
        {/* Show scroll arrows only if there are more than 3 products */}
        {relatedProducts.length > 3 && (
          <div className="flex space-x-2 sm:space-x-4 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain group-hover:w-10 group-hover:h-10 sm:group-hover:w-24 sm:group-hover:h-24"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <img 
                src={rightHovered ? rightArrowHover : rightArrow}
                alt="Arrow Right"
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain group-hover:w-10 group-hover:h-10 sm:group-hover:w-24 sm:group-hover:h-24"
              />
            </button>
          </div>
        )}
      </div>

      {/* Product Grid/Scroll Container */}
      {relatedProducts.length <= 3 ? (
        // Grid layout for 3 or fewer products
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedProducts.map((product) => (
            <Link key={product.product_id} to={`/shop1/product/${product.product_id}`} className="group">
              {/* Image */}
              <div className="bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 relative w-full sm:w-[399px] h-[447px]">
                <img
                  src={product.primary_image}
                  alt={product.product_name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-archivio text-black uppercase tracking-wide">
                    {product.product_name}
                  </h3>
                  <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#F48063]">
                    {formatPrice(product.selling_price || product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Scrollable layout for more than 3 products
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {relatedProducts.map((product) => (
            <Link 
              key={product.product_id} 
              to={`/shop1/product/${product.product_id}`} 
              className="group flex-shrink-0 w-full sm:w-[380px]"
            >
              {/* Image */}
              <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 relative w-full sm:w-[399px] h-[447px]">
                <img
                  src={product.primary_image}
                  alt={product.product_name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-archivio text-black uppercase tracking-wide">
                    {product.product_name}
                  </h3>
                  <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#F48063]">
                    {formatPrice(product.selling_price || product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProducts;