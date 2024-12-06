import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Shop4ProductCard, { Product } from './Shop4ProductCard';
import shop4ApiService, { Product as ApiProduct } from '../../../services/shop4ApiService';

// Convert API product to local Product interface
const mapApiProductToLocal = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.product_id,
  name: apiProduct.product_name,
  price: apiProduct.special_price || apiProduct.price,
  image: apiProduct.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png",
  discount: apiProduct.special_price ? 
    Math.round(((apiProduct.price - apiProduct.special_price) / apiProduct.price) * 100) : 
    undefined
});

function Recentproduct() {
  const [activeTab, setActiveTab] = useState('RITUAL KITS');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Maximum products to show is 3
  const maxVisibleProducts = 3;
  const canScrollLeft = currentScrollIndex > 0;
  const canScrollRight = currentScrollIndex < products.length - maxVisibleProducts;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await shop4ApiService.getProducts({
          page: 1,
          per_page: 10, // Fetch more than 3 to enable scrolling
          in_stock_only: true
        });
        
        if (response && response.success) {
          const mappedProducts = response.products.map(mapApiProductToLocal);
          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentScrollIndex(prev => prev - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentScrollIndex(prev => prev + 1);
    }
  };

  // Get visible products (only 3 at a time)
  const visibleProducts = products.slice(currentScrollIndex, currentScrollIndex + maxVisibleProducts);

  const handleAddToCart = (product: Product, quantity: number, selectedColor: number) => {
    console.log(`Added ${product.name} to cart:`, {
      product,
      quantity,
      selectedColor
    });
    // Here you can integrate with your cart context or API
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-24 px-4">
        <p className="text-white text-center font-futura text-[14px] font-normal font-weight-[450] leading-normal tracking-[3.5px] uppercase mb-4">RECENT PRODUCTS</p>
        <h1 className="text-white font-abeezee text-[50px] font-normal font-weight-[400] leading-[70px] tracking-[7.5px] uppercase mb-8">
          AOIN POOJA STORE
        </h1>
        
        {/* DIYAS, OIL LAMPS, RITUAL KITS Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center relative">
            {/* Horizontal line */}
            <div className="w-[1040px] h-[2px] bg-[#D9D9D9] absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            {/* Navigation tabs with 4 vertical lines */}
            <div className="flex items-center relative z-10">
              {/* Vertical line before DIYAS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-0" />
              {/* DIYAS */}
              <button
                onClick={() => setActiveTab('DIYAS')}
                className={`mx-12 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[200px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'DIYAS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                DIYAS
              </button>
              {/* Vertical line between DIYAS & OIL LAMPS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[290px]" />
              {/* OIL LAMPS */}
              <button
                onClick={() => setActiveTab('OIL LAMPS')}
                className={`mx-4 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[320px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'OIL LAMPS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                OIL LAMPS
              </button>
              {/* Vertical line between OIL LAMPS & RITUAL KITS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[650px]" />
              {/* RITUAL KITS */}
              <button
                onClick={() => setActiveTab('RITUAL KITS')}
                className={`mx-4 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[320px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'RITUAL KITS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                RITUAL KITS
              </button>
              {/* Vertical line after RITUAL KITS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[990px]" />
            </div>
          </div>
        </div>
       
      </div>

      {/* Product Carousel */}
      <div className="relative px-4 md:px-8 lg:px-16 max-w-[1920px] mx-auto">
        {/* Navigation Arrows - Show only when there are more than 3 products */}
        {products.length > maxVisibleProducts && (
          <>
            <button 
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`hidden lg:flex absolute left-16 top-[200px] transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border items-center justify-center transition-colors ${
                canScrollLeft 
                  ? 'border-[#BB9D7B] hover:bg-gray-800 cursor-pointer' 
                  : 'border-gray-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`hidden lg:flex absolute right-16 top-[200px] transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border items-center justify-center transition-colors ${
                canScrollRight 
                  ? 'border-[#BB9D7B] hover:bg-gray-800 cursor-pointer' 
                  : 'border-gray-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-white text-xl">Loading products...</div>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1640px] mx-auto"
          >
            {visibleProducts.map((product) => (
              <div 
                key={product.id} 
                className="relative h-[500px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                onClick={() => {
                  // Navigate to the product detail page
                  navigate(`/shop4-productpage?id=${product.id}`);
                }}
              >
                <Shop4ProductCard 
                  product={product}
                  onAddToCart={handleAddToCart}
                  showColorOptions={true}
                  showQuantitySelector={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* Scroll Indicators - Show dots when there are more than 3 products */}
        {products.length > maxVisibleProducts && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: products.length - maxVisibleProducts + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScrollIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentScrollIndex 
                    ? 'bg-[#BB9D7B]' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recentproduct;