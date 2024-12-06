import { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useShopCart } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import shop1ApiService, { Product } from '../../../services/shop1ApiService';

const FreshOffRunway = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<{ [key: number]: boolean }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  
  // Shop1 has a fixed shop ID of 1
  const SHOP_ID = 1;
  
  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products with a limit for fresh items
        const response = await shop1ApiService.getProducts({
          page: 1,
          per_page: 6, // Get more than 3 to enable scrolling
          sort_by: 'created_at',
          order: 'desc' // Get newest products for "fresh off runway"
        });
        
        if (response?.products) {
          setProducts(response.products);
        } else {
          setError('No products found');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart functionality
  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!accessToken) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    if (user?.role !== 'customer') {
      toast.error("Only customers can add items to cart");
      return;
    }

    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await addToShopCart(SHOP_ID, productId, 1, {});
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Scroll functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Format price display
  const formatPrice = (product: Product) => {
    if (product.is_on_special_offer && product.special_price) {
      return `$${product.special_price}`;
    }
    return `$${product.selling_price || product.price}`;
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-center py-8 xs:py-10 sm:py-12">
            <div className="text-base xs:text-lg sm:text-xl text-gray-600">Loading fresh products...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-center py-8 xs:py-10 sm:py-12">
            <div className="text-base xs:text-lg sm:text-xl text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-row lg:flex-row lg:items-start justify-between mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14">
          <div className="mb-0 lg:mb-0">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold font-playfair text-[#222222] leading-tight tracking-tight">
              FRESH OFF THE
              <br />
              <span className="italic text-[#222222] font-normal font-playfair">Runway</span>
            </h2>
          </div>
          <div className="flex space-x-3 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group rounded-full flex items-center justify-center"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              onClick={scrollLeft}
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-7 h-7 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 object-contain"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center"
              onClick={scrollRight}
            >
              <img 
                src={rightArrow}
                alt="Arrow Right"
                className="w-8 h-8 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 object-contain"
              />
            </button>
          </div>
        </div>
        
        {/* Scrollable Products Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto pb-4 xs:pb-6 sm:pb-8"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {products.map((product) => (
            <div key={product.product_id} className="group cursor-pointer flex-shrink-0 w-full sm:w-[320px] md:w-[300px] lg:w-[350px] xl:w-[380px]">
              <div className="relative overflow-hidden mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                <Link to={`/shop1/product/${product.product_id}`}>
                  <img
                    src={product.primary_image || product.media?.primary_image || '/assets/images/placeholder.jpg'}
                    alt={product.product_name}
                    className="w-full h-[300px] xs:h-[350px] sm:h-[290px] md:h-[300px] lg:h-[350px] xl:h-[370px] object-contain  group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4">
                  <button 
                    className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => handleAddToCart(e, product.product_id)}
                    disabled={addingToCart[product.product_id]}
                  >
                    {addingToCart[product.product_id] ? (
                      <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ShoppingBag className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-1 xs:mb-2 tracking-wide leading-tight">
                  {product.product_name.toUpperCase()}
                </h3>
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600">
                  {formatPrice(product)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshOffRunway;