import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shop3ProductCard from '../Shop3ProductCard';
import shop3ApiService, { Product } from '../../../../services/shop3ApiService';

const mapProductToCard = (product: Product) => ({
  id: product.product_id,
  name: product.product_name,
  image: product.primary_image || "/assets/images/Productcard/card-section1.jpg",
  price: product.price,
  originalPrice: product.originalPrice ?? product.special_price ?? null,
  badge: product.is_on_special_offer ? (product.special_price ? `-${Math.round(100 * (1 - product.special_price / product.price))}%` : "Special Offer") : null,
  badgeColor: product.is_on_special_offer ? "bg-pink-600 text-white" : "bg-lime-400 text-black",
  isNew: false, // Adjust if you have a field for newness
  discount: product.is_on_special_offer && product.special_price ? Math.round(100 * (1 - product.special_price / product.price)) : null,
});

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/shop3-productpage?id=${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await shop3ApiService.getProducts({ per_page: 20 });
        if (res && res.success) {
          setProducts(res.products);
        } else {
          setProducts([]);
        }
      } catch (e) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-12 px-4 sm:px-8 2xl:px-6">
      {/* Header & Breadcrumbs */}
      <div className="pt-6 pb-2 flex flex-col gap-2 max-w-[1920px] mx-auto ">
        <div className="flex items-center text-sm gap-2 text-white">
          <span className="text-[18px] font-alexandria font-semibold">Home</span>
          <span className="mx-1">&gt;</span>
          <span className="text-lime-400 text-[18px] font-alexandria font-semibold">Men</span>
        </div>
      </div>
      {/* Full-width horizontal line */}
      <div className="w-screen mt-2 mb-2 relative left-1/2 right-1/2 -mx-[50vw]">
        <svg className="block" width="100%" height="1" viewBox="0 0 1920 1" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 1V0H1920V1H0Z" fill="#E0E0E0" />
        </svg>
      </div>
      {/* Main content with padding */}
      <div className="max-w-[1920px] mx-auto ">
      {/* Controls: View and Sort by left, View filters right */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex w-full items-center">
          <div className="flex gap-7 items-center">
          <span className="text-white text-[16px] flex items-center font-alexandria font-semibold">
              View:
              <span className="ml-1 text-white text-[16px] font-semibold">2</span>
              <span className="mx-1 text-white text-[16px] font-semibold">|</span>
              <span className="text-[#CCFF00] text-[16px] font-semibold">4</span>
            </span>
            <select className="bg-zinc-900 border border-zinc-700 text-white text-[14px] font-alexandria rounded px-2 py-1 ">
              <option>Sort by</option>
            </select>
          </div>
          <div className="flex-1" />
          <button className="flex items-center justify-between bg-gray-600 border px-4 py-2 ml-2 w-[192px]" aria-label="View filters">
            <span className="font-bold text-white text-[14px] font-alexandria ">View filters</span>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 8L10 13L15 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-12 lg:gap-y-28 2xl:gap-y-24 mt-8 justify-center mx-auto items-start">
        {loading ? (
          <div className="col-span-full text-center py-10">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-10">No products found.</div>
        ) : (
          products.map((product) => {
            const card = mapProductToCard(product);
            return (
              <Shop3ProductCard
                key={card.id}
                image={card.image}
                name={card.name}
                price={card.price}
                originalPrice={card.originalPrice}
                badge={card.badge}
                badgeColor={card.badgeColor}
                isNew={card.isNew}
                discount={card.discount}
                onClick={() => handleProductClick(product.product_id)}
              />
            );
          })
        )}
      </div>
      {/* Section below product cards */}
      <div className="flex flex-col items-center w-full pt-24 py-12">
        <span className="text-[14px] font-alexandria text-gray-200 mb-6">15 of 234 items was view</span>
        <button className="bg-[#CCFF00] text-black font-semibold text-[16px] px-20 py-3 font-alexandria mb-8 shadow-lg  transition-all">Load More</button>
        {/* Full-width horizontal line below product cards */}
        <div className="w-screen mb-8 relative -mx-[50vw]">
          <svg className="block" width="100%" height="3" viewBox="0 0 1920 1" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1V0H1920V1H0Z" fill="#E0E0E0" />
          </svg>
        </div>
        <div className="flex flex-wrap justify-center font-alexandria  gap-4 w-full">
          {['Sneakers', 'Puffer', 'Boots', 'Sunglasses', 'Co-Ord Set', 'Casual', 'T-shirt', 'Clothing', 'Shoe', 'Collection', 'Sale', 'Exclusive'].map((cat) => (
            <button
              key={cat}
              className="bg-[rgba(204,255,0,0.7)] text-white font-bold font-alexandria text-[12px] leading-[30px] px-4 py-1 mb-2  transition-all shadow text-center"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductPage;

