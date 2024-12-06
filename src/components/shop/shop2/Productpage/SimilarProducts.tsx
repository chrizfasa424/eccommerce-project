import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shop2ApiService, { Product } from '../../../../services/shop2ApiService';

interface SimilarProductsProps {
  currentProductId?: number;
  relatedProducts?: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ 
  currentProductId, 
  relatedProducts 
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  // Fetch similar products if not provided via props
  useEffect(() => {
    if (relatedProducts && relatedProducts.length > 0) {
      setProducts(relatedProducts.slice(0, 4)); // Limit to 4 products
    } else if (currentProductId) {
      fetchSimilarProducts();
    }
  }, [currentProductId, relatedProducts]);

  const fetchSimilarProducts = async () => {
    if (!currentProductId) return;
    
    setLoading(true);
    try {
      // Try to get the current product details which includes related products
      const productResponse = await shop2ApiService.getProductById(currentProductId);
      
      if (productResponse?.related_products && productResponse.related_products.length > 0) {
        setProducts(productResponse.related_products.slice(0, 4));
      } else {
        // Fallback: Get products from the same category or recent products
        const currentProduct = productResponse?.product;
        if (currentProduct?.category_id) {
          const categoryProducts = await shop2ApiService.getProductsByCategory(
            currentProduct.category_id,
            { per_page: 5 }
          );
          
          // Filter out the current product and limit to 4
          const filteredProducts = categoryProducts.products
            .filter((p: Product) => p.product_id !== currentProductId)
            .slice(0, 4);
          
          setProducts(filteredProducts);
        } else {
          // Final fallback: Get featured products
          const featuredProducts = await shop2ApiService.getFeaturedProducts(4);
          const filteredProducts = featuredProducts.filter((p: Product) => p.product_id !== currentProductId);
          setProducts(filteredProducts);
        }
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
      // Fallback to featured products on error
      try {
        const featuredProducts = await shop2ApiService.getFeaturedProducts(4);
        setProducts(featuredProducts.filter((p: Product) => p.product_id !== currentProductId));
      } catch (fallbackError) {
        console.error('Error fetching fallback products:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/shop2/product/${productId}`);
  };

  const toggleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  if (loading) {
    return (
      <section className="relative w-full max-w-[1428px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 lg:ml-20 2xl:pl-10 text-black">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[47px] font-normal font-bebas mb-4 sm:mb-6 lg:mb-12">SIMILAR PRODUCTS</h2>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't render if no similar products
  }
  return (
    <section className="relative w-full max-w-[1428px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 lg:ml-20 2xl:pl-10 text-black">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[47px] font-normal font-bebas mb-4 sm:mb-6 lg:mb-12">SIMILAR PRODUCT</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-7">
        {products.map((product, idx) => (
          <div 
            key={product.product_id} 
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => handleProductClick(product.product_id)}
          >
            <div className="relative">
              <img
                src={product.primary_image || '/assets/shop2/ProductPage/pd1.svg'}
                alt={product.product_name}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[401px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
              />
              <div 
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-lg sm:text-xl z-10 cursor-pointer"
                onClick={(e) => toggleLike(product.product_id, e)}
              >
                {likedProducts.has(product.product_id) ? (
                  <span className="text-red-600">❤️</span>
                ) : (
                  <span className="text-white hover:text-red-300 transition-colors">🤍</span>
                )}
              </div>
              
              {/* Show navigation arrows only on first product for carousel effect */}
              {idx === 0 && products.length > 1 && (
                <>
                  <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white rounded-full shadow w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-xs sm:text-sm md:text-base">←</span>
                  </div>
                  <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white rounded-full shadow w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-xs sm:text-sm md:text-base">→</span>
                  </div>
                </>
              )}
              
              {/* Action buttons - show on hover */}
              <div className="absolute bottom-0 font-bebas left-0 w-full flex flex-col sm:flex-row justify-between items-center px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="bg-black text-white px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto hover:bg-gray-800 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  ADD TO CART
                </button>
                <button 
                  className="border-2 border-white text-white px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold w-full sm:w-auto hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  BUY NOW
                </button>
              </div>
              
              {/* Sale badge for special offers */}
              {product.is_on_special_offer && product.special_price && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  SALE
                </div>
              )}
            </div>

            <div className="pb-3 sm:pb-4 font-bebas mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs sm:text-sm lg:text-base xl:text-[17px] text-[#8E8F94] font-normal uppercase">
                {product.category_name || 'PRODUCT'}
              </p>
              <div className="flex justify-between items-center">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal uppercase truncate">
                  {product.product_name}
                </h3>
                <div className="flex flex-col items-end">
                  {product.is_on_special_offer && product.special_price ? (
                    <>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal text-red-600">
                        ₹{product.special_price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ₹{product.selling_price.toLocaleString('en-IN')}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal">
                      ₹{product.selling_price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Stock status */}
              {!product.is_in_stock && (
                <p className="text-xs text-red-500 mt-1">Out of Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
