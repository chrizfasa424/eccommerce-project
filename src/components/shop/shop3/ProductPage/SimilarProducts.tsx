import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  special_price?: number;
  primary_image: string;
  category_name?: string;
}

interface SimilarProductsProps {
  relatedProducts?: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ relatedProducts = [] }) => {
  // Don't render the section if there are no related products
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return `$${price}`;
  };

  return (
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
          {/* Cards */}
          <div className="flex gap-4 md:gap-6 w-full justify-center overflow-x-auto md:overflow-visible px-1 scrollbar-thin scrollbar-thumb-lime-400 scrollbar-track-black">
            {relatedProducts.slice(0, 3).map((product) => (
              <Link 
                key={product.product_id} 
                to={`/shop3-productpage?id=${product.product_id}`}
                className="group"
              >
                <div
                  className={`rounded-2xl shadow-lg flex flex-col w-[260px] xs:w-[320px] sm:w-[340px] md:w-[373px] min-w-[260px] xs:min-w-[320px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] transition-transform duration-300 hover:scale-105`}
                >
                  <div className="relative w-[260px] xs:w-[320px] sm:w-[340px] md:w-[373px] h-[300px] xs:h-[380px] sm:h-[420px] md:h-[461px] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.primary_image || "/assets/images/Productcard/hero3.jpg"}
                      alt={product.product_name}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Special Price Badge */}
                    {product.special_price && product.special_price < product.price && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold bg-lime-400 text-black">
                        -{Math.round(((product.price - product.special_price) / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="px-0.5 pb-4 flex flex-col flex-1">
                    <div className="text-white text-base sm:text-[16px] font-alexandria font-semibold mb-2 leading-tight">
                      {product.product_name}
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      {product.special_price && product.special_price < product.price ? (
                        <>
                          <span className="text-white text-base sm:text-lg font-semibold line-through">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-lime-400 text-base sm:text-lg font-bold">
                            {formatPrice(product.special_price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lime-400 text-base sm:text-lg font-bold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
