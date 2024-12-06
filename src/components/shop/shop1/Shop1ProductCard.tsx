import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShopCart } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

interface Shop1ProductCardProps {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
}

const Shop1ProductCard: React.FC<Shop1ProductCardProps> = ({ id, image, category, name, price }) => {
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Shop1 has a fixed shop ID of 1
  const SHOP_ID = 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
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
      setIsAddingToCart(true);
      await addToShopCart(SHOP_ID, id, 1, {});
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="rounded-lg flex flex-col items-center p-2 md:p-4 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/shop1/product/${id}`} className="w-full">
        <img
          src={image}
          alt={name}
          className="w-full max-w-[302px] h-[220px] sm:h-[260px] md:h-[321px] object-contain rounded-md mb-2"
        />
        <div className="text-[12px] md:text-[14px] text-gray-400 mb-1.5 mt-2 uppercase font-poppins tracking-widest">{category}</div>
        <div className="font-semibold font-poppins text-center text-[16px] md:text-[18px]">{name}</div>
        <div className="text-red-500 font-poppins font-semibold text-[18px] md:text-[20px]">${price.toFixed(2)}</div>
      </Link>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="mt-3 w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Shop1ProductCard; 