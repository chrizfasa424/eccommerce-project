import React, { useState } from 'react';
import { useShopCart } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

interface Shop2ProductCardProps {
  image: string;
  name: string;
  price: number;
  discount?: number;
  overlay?: number;
  shopProductId: number;
  onClick?: () => void;
}

const Shop2ProductCard: React.FC<Shop2ProductCardProps> = ({ 
  image, 
  name, 
  price, 
  discount, 
  shopProductId, 
  onClick 
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  
  // Shop2 has a fixed shop ID of 2
  const SHOP_ID = 2;

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
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
      await addToShopCart(SHOP_ID, shopProductId, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div 
      className="flex flex-col items-center pb-7 px-4 relative group cursor-pointer max-w-full sm:max-w-[400px] md:max-w-[519px]"
      onClick={onClick}
    >
      {/* Product Image Container */}
      <div className="relative w-full h-[450px] xs:h-[590px] sm:h-[400px] md:h-[595px]">
        <img
          src={image}
          alt={name}
          className="rounded-t-xl w-full h-full object-cover sm:object-cover bg-none border-none shadow-none transition-transform duration-300 hover:scale-100"
        />
        {/* Optional discount badge */}
        {discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{discount}% OFF</span>
        )}
      </div>
      {/* Product Info and Hover Add-to-Cart, with hover bg color */}
      <div className="w-full flex flex-col pt-10 items-center rounded-b-xl transition-colors duration-300 group-hover:bg-[#DFD1C6]">
        <span className="font-medium text-[30px] font-bebas text-center tracking-wider">{name}</span>
        <span className="font-semibold text-[25px] font-bebas mt-3 mb-4">${price}</span>
        {/* Hover Block: Add-to-cart only */}
        <div className="w-full flex flex-col items-center transition-all duration-300 max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100">
          <div className="flex items-center gap-2 w-full justify-center p-6">
            <button 
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(false);
              }}
            >-</button>
            <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
            <button 
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(true);
              }}
            >+</button>
            <button 
              className="ml-2 sm:ml-4 bg-black text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-xs hover:bg-gray-800 transition-colors"
              onClick={handleAddToCart}
            >ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop2ProductCard; 