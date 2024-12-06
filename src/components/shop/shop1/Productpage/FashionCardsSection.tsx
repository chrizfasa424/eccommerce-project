import React, { useState } from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import { useShopCart } from '../../../../context/ShopCartContext';
import { useAuth } from '../../../../context/AuthContext';
import { toast } from 'react-hot-toast';

// --- Ratings Data (from Rating.tsx) ---
const reviews = [
  {
    id: 1,
    name: 'Ralph Edwards',
    date: 'October 20, 2020',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    tags: ['Purchased by 247 supplier', 'Gold color'],
    content:
      'Absolutely loved the fabric and fit! The dress hugged all the right places without being uncomfortable. Perfect for both casual outings and dressy events — totally worth the price',
  },
  {
    id: 2,
    name: 'Savannah Nguyen',
    date: 'October 15, 2020',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    tags: ['Purchased by 247 supplier', 'Sliver color'],
    content:
      'Absolutely loved the fabric and fit! The dress hugged all the right places without being uncomfortable. Perfect for both casual outings and dressy events — totally worth the price',
  },
];

const colorOptions = [
  { name: 'Yellow', value: 'yellow', className: 'bg-yellow-300' },
  { name: 'Pink', value: 'pink', className: 'bg-[#EABABA]' },
];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

const FashionCardsSection: React.FC = () => {
  // --- Hero state ---
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  // --- Ratings state ---
  const [selectedRating, setSelectedRating] = useState(5);
  
  // Cart functionality
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Shop1 has a fixed shop ID of 1
  const SHOP_ID = 1;
  
  // Mock product ID for this specific product
  const PRODUCT_ID = 1; // You can change this to the actual product ID

  // --- Hero handlers ---
  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };
  // --- Ratings handler ---
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(parseInt(e.target.value));
  };
  
  // --- Cart handler ---
  const handleAddToCart = async () => {
    console.log('Add to cart clicked!');
    console.log('Access token:', accessToken);
    console.log('User role:', user?.role);
    console.log('Selected color:', selectedColor);
    console.log('Selected size:', selectedSize);
    console.log('Quantity:', quantity);
    
    if (!accessToken) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    if (user?.role !== 'customer') {
      toast.error("Only customers can add items to cart");
      return;
    }

    try {
      setIsAddingToCart(true);
      
      // Create selected attributes object
      const selectedAttributes = {
        0: [selectedColor], // Color attribute
        1: [selectedSize]   // Size attribute
      };
      
      console.log('Calling addToShopCart with:', {
        shopId: SHOP_ID,
        productId: PRODUCT_ID,
        quantity,
        selectedAttributes
      });
      
      await addToShopCart(SHOP_ID, PRODUCT_ID, quantity, selectedAttributes);
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mb-6">
          <nav className="text-gray-500 text-sm sm:text-base flex flex-wrap gap-1">
            <span>Women fashion</span>
            <span>/</span>
            <span>Jacket & Coats</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">Coat</span>
          </nav>
        </div>
        {/* Images */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start">
          {/* Left big image */}
          <div className="w-full lg:w-[607px] h-[607px] bg-gray-100 rounded-3xl overflow-hidden">
            <img
              src="/assets/images/Productcard/hero1.jpg"
              alt="Main model"
              className="object-contain w-full h-full"
            />
          </div>
          {/* Right side images */}
          <div className="flex flex-col gap-3 w-full lg:w-[626px]">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden">
                <img
                  src="/assets/images/Productcard/hero2.jpg"
                  alt="Detail"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden">
                <img
                  src="/assets/images/Productcard/hero3.jpg"
                  alt="Back"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="w-full h-[303px] bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src="/assets/images/Productcard/hero4.jpg"
                alt="Side view"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* Title + Price (side-by-side) */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-12 mt-10 mb-6">
          {/* LEFT: Product Info */}
          <div className="flex-1 min-w-[220px]">
            {/* Product Name */}
            <h2 className="text-[42px] font-playfair font-semibold text-black">
              NADETTA COAT <span className="italic font-normal text-gray-800">Beige</span>
            </h2>
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex space-x-1 text-[#FFB800] text-lg">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} fill="#FFB800" stroke="#FFB800" size={20} />
                ))}
                <Star fill="none" stroke="#FFB800" size={20} />
              </div>
              <p className="text-gray-600 text-[18px] ml-2">(4.8 from 328 Reviews)</p>
            </div>
            {/* Color and Size Selection */}
            <div className="flex space-x-16 mb-10">
              {/* Color */}
              <div>
                <p className="text-[20px] font-semibold mb-4">Select color</p>
                <div className="flex space-x-6">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      aria-label={color.name}
                      onClick={() => handleColorSelect(color.value)}
                      className={`w-[48px] h-[48px] rounded-full border-4 transition-all duration-150 focus:outline-none shadow-md flex items-center justify-center ${
                        selectedColor === color.value
                          ? 'border-[#FEEBD8] scale-110'
                          : 'border-white opacity-80 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value === 'yellow' ? '#FDE047' : '#EABABA' }}
                    />
                  ))}
                </div>
              </div>
              {/* Size */}
              <div>
                <p className="text-[20px] font-semibold mb-4">Select Size</p>
                <div className="flex space-x-4">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`w-[64px] h-[48px] rounded-full border text-[18px] font-semibold transition-all duration-150 focus:outline-none
                        ${selectedSize === size
                          ? 'bg-[#FEEBD8] border-[#FEEBD8] text-black shadow-md'
                          : 'bg-white border-black text-black hover:bg-gray-100'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT: Price, Quantity, Actions */}
          <div className="flex flex-col lg:flex-row items-end min-w-[380px] w-full lg:w-auto">
            <div className="flex w-full justify-between items-end mb-6">
              {/* Total Price */}
              <div className='flex flex-col items-end'>
                <p className="text-gray-600 text-[20px] font-medium mb-1">Total Price</p>
                <div className="flex items-center space-x-3">
                  <span className="text-[40px] font-bold text-[#FF6A3A]">$450</span>
                  <span className="text-[28px] text-gray-500 line-through">$600</span>
                </div>
              </div>
              {/* Quantity */}
              <div className="flex flex-col items-center mb-4">
                <p className="text-gray-600 text-[20px] font-medium mb-4">Quantity</p>
                <div className="flex items-center space-x-4">
                  <button
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-[22px] font-bold w-8 text-center">{quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
                         {/* Buttons */}
             <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full mt-6">
               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   console.log('Button clicked!');
                   handleAddToCart();
                 }}
                 disabled={isAddingToCart}
                 className="bg-[#FEEBD8] hover:bg-[#fdd7b9] px-20 py-3 rounded-full font-semibold text-xl transition-all duration-150 shadow-md border-2 border-[#FEEBD8] disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
               </button>
              <button className="bg-black hover:bg-[#222] text-white px-20 py-3 rounded-full font-semibold text-xl transition-all duration-150 shadow-md border-2 border-black">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
        {/* Product Details Section */}
        <div className="w-full mt-20 flex flex-col lg:flex-row justify-between gap-10">
          {/* Left - Description List */}
          <div className="flex-1">
            <h3 className="text-[32px] font-playfair font-bold text-black mb-6">
              Product <span className="italic font-normal">Details</span>
            </h3>
            <ul className="space-y-4">
              {[
                'Midnight womens fabric',
                'Regular Fit',
                'Peak lapels',
                'Dry clean',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-[18px]">
                  <span className="w-2 h-2 rounded-full bg-[#EABABA] mr-4"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Right - Size Selector & Measurements */}
          <div className="flex-1">
            {/* Sizes */}
            <div className="flex space-x-4 mb-6 ">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <div
                  key={size}
                  className={`w-[50px] h-[50px] rounded-full flex items-center justify-center border-2 text-sm font-semibold 
                    ${
                      size === 'L'
                        ? 'bg-black text-white border-black shadow'
                        : 'border-gray-300 text-black'
                    } relative`}
                >
                  {size}
                  <span
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-1 rounded-full ${
                      size === 'L' ? 'bg-transparent' : 'bg-[#FEEBD8]'
                    }`}
                  />
                </div>
              ))}
            </div>
            {/* Measurement Table */}
            <div className="grid grid-cols-2 font-archivio gap-y-3 gap-x-4 mt-10 text-[16px]">
              <div className="font-semibold text-black">Shoulder</div>
              <div className="text-gray-500">50cm /19.75 in</div>
              <div className="font-semibold text-black">length</div>
              <div className="text-gray-500">124 cm /47.75 in</div>
              <div className="font-semibold text-black">Bust</div>
              <div className="text-gray-500">50cm /19.75 in</div>
              <div className="font-semibold text-black">Sleeve length</div>
              <div className="text-gray-500">50cm /19.75 in</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FASHION CARDS SECTION (existing content) --- */}
      <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Grid layout with responsive columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            {/* Left Card - Wider Image (817px) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-8 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[471px] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/Productcard/card-section1.jpg')" }}>
              {/* Overlay content */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#CC9A6D] font-archivio font-semibold mb-1">90% Polyester</div>
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[33px] font-bold text-[#505050] font-quicksand leading-tight">
                  Signature Coats in Luxe <br className="hidden sm:block" />Fabrics
                </h3>
              </div>
            </div>
            {/* Right Card - Narrower Image (391px) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 h-[280px] sm:h-[350px] md:h-[400px] lg:h-[467px] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/Productcard/card-section2.jpg')" }}>
              {/* Top overlay */}
              <div className="absolute top-2 left-2 p-2 sm:p-3 md:p-4 rounded-lg">
                <h3 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bebas text-[#FFFFFF] hover:text-[#DF272F] leading-none">
                  FLASH<br />DEALS
                </h3>
              </div>
              {/* Bottom overlay */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-3 sm:left-4 md:left-6 p-2 sm:p-3 md:p-4 rounded-lg">
                <h4 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[33px] font-bold font-quicksand text-white leading-tight">
                  Durable and strong stitching
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RATINGS & REVIEWS SECTION --- */}
      <div className="relative w-full max-w-[1280px] mx-auto bg-white px-2 sm:px-4 py-10 sm:py-16 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-bold font-playfair mb-2">Ratings & Reviews (322)</h1>
        <p className="text-[#222121] text-sm sm:text-base font-poppins mt-4 sm:mt-7">Now showing 4 results of 24 items</p>
        {/* Filter Section */}
        <div className="flex justify-end sm:mr-16 md:mr-32 mb-1">
          <div className="flex items-center space-x-2 relative">
            <span className="text-sm sm:text-base font-semibold">Filters by</span>
            {/* Star with rating number */}
            <div className="flex items-center text-sm sm:text-base font-semibold text-yellow-500">
              <Star size={18} fill="currentColor" className="mr-1" />
              {selectedRating}
            </div>
            {/* Hidden native dropdown */}
            <select
              value={selectedRating}
              onChange={handleRatingChange}
              className="absolute right-0 w-8 h-8 opacity-0 z-10 cursor-pointer"
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            {/* Custom visible box with dropdown arrow */}
            <div className="w-10 h-8 bg-gray-200 rounded-md flex items-center justify-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        {/* Reviews List */}
        {reviews.map((review) => (
          <div key={review.id} className="mb-10 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center mt-1 gap-2 sm:gap-10">
                  <p className="font-semibold font-worksans text-sm sm:text-base">{review.name}</p>
                  <div className="flex flex-wrap mt-2 sm:mt-4 gap-2">
                    {review.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-[#FFF0EB] text-[#FF8154] px-2 py-1 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] sm:text-[12px] font-worksans text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex space-x-1 mt-2 ml-0 sm:ml-16 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="mt-2 w-full sm:w-4/5 md:w-2/3 font-worksans text-[#000000] text-sm sm:text-base">{review.content}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 space-y-2 sm:space-y-0 sm:space-x-4 text-gray-500 text-xs sm:text-sm">
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <span>👍</span>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <span>💬</span>
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
        <button className="bg-[#FFB998] text-[#000000] font-semibold px-5 py-2 rounded-full text-xs sm:text-sm hover:bg-orange-200 w-full sm:w-auto">
          See More <span className="ml-2 relative bottom-1">⌄</span>
        </button>
      </div>
    </>
  );
};

export default FashionCardsSection;
