import React, { useState } from 'react';
import { useShopCart } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

interface Shop3ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  badge?: string | null;
  badgeColor?: string;
  isNew?: boolean;
  discount?: number | null;
  onClick?: () => void;
  productId?: number; // Add product ID for cart functionality
}

const Shop3ProductCard: React.FC<Shop3ProductCardProps> = ({ 
  image, 
  name, 
  price, 
  originalPrice, 
  badge, 
  badgeColor, 
  onClick,
  productId 
}) => {
  // Cart functionality
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Shop3 has a fixed shop ID of 3
  const SHOP_ID = 3;
  
  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!productId) {
      toast.error("Product ID not available");
      return;
    }
    
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
      
      // Add to cart with default quantity of 1 and no selected attributes
      await addToShopCart(SHOP_ID, productId, 1, {});
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center group w-[436px] h-[600px] cursor-pointer"
      onClick={onClick}
    >
      {/* Image with Badge Overlay */}
      <div className="relative w-full h-[553px] aspect-[3/4] overflow-hidden">
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${badgeColor} z-10`}
          >
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Info: show by default, hide on hover */}
      <div className="w-full flex flex-col items-start font-alexandria mt-6 group-hover:hidden">
        <div className="text-[16px] font-semibold mb-1 truncate">
          {name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lime-400 text-base font-bold">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-pink-400 text-sm line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
      {/* Add button: hidden by default, show on hover */}
      <button 
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="w-full mt-6 bg-lime-400 text-black font-semibold py-2 rounded transition hover:bg-lime-300 max-w-md hidden group-hover:flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Shop3ProductCard; 