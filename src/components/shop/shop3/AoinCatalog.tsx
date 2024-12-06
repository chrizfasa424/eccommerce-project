import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shop3ApiService, { Product } from '../../../services/shop3ApiService';

const AoinCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await shop3ApiService.getProducts({ per_page: 6 }); // Fetch 6 products for catalog
        if (res && res.success) {
          setProducts(res.products);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error('Error fetching products:', e);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/shop3-productpage?id=${productId}`);
  };
  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center py-10 px-2">
      <div className="w-full min-w-[100vw] bg-[#d4ff00] py-2 h-[60px] sm:h-[80px] md:h-[100px] px-2 mb-16 sm:mb-24 md:mb-32 flex items-center transform rotate-[-1.5deg] -mt-6 overflow-x-auto whitespace-nowrap">
        <span className="text-black text-[22px] sm:text-[32px] md:text-[43px] font-extrabold tracking-wider inline-block min-w-[200%] animate-marquee-pingpong">
          SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% SHOP NOW!  DISCOUNT UP TO 80% 
        </span>
      </div>
      <h1 className="text-white text-center font-semibold uppercase text-[32px] sm:text-[40px] md:text-[64px] lg:text-[104px] leading-none mb-8 sm:mb-12 tracking-normal font-bebas">
        Best Our Aoin Catalog.
      </h1>

      {loading ? (
        <div className="text-white text-xl">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-white text-xl">No products found.</div>
      ) : products.length <= 3 ? (
        // Grid layout for 3 or fewer products (original layout)
        <div className="flex flex-col md:flex-row md:gap-6 gap-4 w-full max-w-[1329px] justify-center items-stretch pb-4 md:pb-0">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="rounded-3xl flex flex-col justify-between shadow-lg overflow-hidden w-full md:w-[429px] max-w-[95vw] mx-auto md:h-[549px] cursor-pointer"
              onClick={() => handleProductClick(product.product_id)}
            >
              <div className="block">
                <img
                  src={product.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component5_Image1.svg"}
                  alt={product.product_name}
                  width={427}
                  height={500}
                  className="object-cover w-full h-[55vw] sm:h-[300px] md:h-[500px] max-h-[500px] hover:opacity-90 transition-opacity duration-200"
                />
              </div>
              <div className="flex justify-between items-center py-3 sm:py-5 px-1 sm:px-1">
                <span className="text-white font-bold font-alexandria text-base sm:text-lg md:text-[19px] tracking-wide ">
                  {product.product_name}
                </span>
                <span className="text-white font-extrabold text-base sm:text-lg md:text-[22px] font-clash">
                  ${product.special_price || product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Horizontal scroll layout for more than 3 products
        <div className="w-full max-w-[1920px] overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {products.map((product) => (
              <div
                key={product.product_id}
                className="rounded-3xl flex flex-col justify-between shadow-lg overflow-hidden w-[429px] h-[549px] flex-shrink-0 cursor-pointer"
                onClick={() => handleProductClick(product.product_id)}
              >
                <div className="block">
                  <img
                    src={product.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component5_Image1.svg"}
                    alt={product.product_name}
                    width={427}
                    height={500}
                    className="object-cover w-full h-[500px] hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
                <div className="flex justify-between items-center py-3 sm:py-5 px-1 sm:px-1">
                  <span className="text-white font-bold font-alexandria text-base sm:text-lg md:text-[19px] tracking-wide ">
                    {product.product_name}
                  </span>
                  <span className="text-white font-extrabold text-base sm:text-lg md:text-[22px] font-clash">
                    ${product.special_price || product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explore Collection Button */}
      <div className="mt-8">
        <Link to="/shop3-allproductpage">
          <button className="bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full text-[16px] font-alexandria hover:bg-[#b3e600] transition-colors duration-300">
            EXPLORE COLLECTION
          </button>
        </Link>
      </div>

      {/* Hide scrollbars with inline styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          .overflow-x-auto {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
    </div>
  );
};

export default AoinCatalog;
