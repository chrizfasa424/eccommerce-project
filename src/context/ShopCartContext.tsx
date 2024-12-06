import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

// Currency formatter for INR
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

interface ShopCartItem {
  cart_item_id: number;
  shop_product_id: number;
  quantity: number;
  selected_attributes: { [key: number]: string | string[] };
  product: {
    name: string;
    price: number;
    original_price: number;
    special_price?: number;
    image_url: string;
    stock: number;
    is_deleted: boolean;
  };
}

interface ShopCartContextType {
  cart: ShopCartItem[];
  addToShopCart: (shopId: number, shopProductId: number, quantity?: number, selectedAttributes?: {[key: number]: string | string[]}) => Promise<void>;
  removeFromShopCart: (shopId: number, cartItemId: number) => Promise<void>;
  updateShopCartQuantity: (shopId: number, cartItemId: number, quantity: number) => Promise<void>;
  clearShopCart: (shopId: number) => Promise<void>;
  fetchShopCart: (shopId: number) => Promise<void>;
  totalItems: number;
  totalPrice: number;
  formattedTotalPrice: string;
  loading: boolean;
}

const ShopCartContext = createContext<ShopCartContextType | undefined>(undefined);

export const ShopCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ShopCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { accessToken, user } = useAuth();
  
  // Calculate derived values
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const formattedTotalPrice = formatCurrency(totalPrice);

  const fetchShopCart = async (shopId: number) => {
    if (!accessToken || user?.role !== 'customer') {
      setCart([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/items`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shop cart');
      }

      const data = await response.json();

      if (data.status === 'success') {
        console.log('ShopCartContext - API Response:', data);
        console.log('ShopCartContext - Cart items from API:', data.data);
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching shop cart:', error);
      toast.error('Failed to load shop cart');
    } finally {
      setLoading(false);
    }
  };

  const addToShopCart = async (shopId: number, shopProductId: number, quantity = 1, selectedAttributes: {[key: number]: string | string[]} = {}) => {
    if (!accessToken || user?.role !== 'customer') {
      toast.error('Only customers can add items to cart');
      return;
    }

    try {
      const payload = {
        shop_product_id: shopProductId,
        quantity,
        selected_attributes: selectedAttributes
      };

      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchShopCart(shopId);
        toast.success('Product added to cart');
      }
    } catch (error) {
      console.error('Error adding to shop cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add item to cart');
    }
  };

  const removeFromShopCart = async (shopId: number, cartItemId: number) => {
    if (!accessToken || user?.role !== 'customer') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchShopCart(shopId);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing from shop cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove item from cart');
    }
  };

  const updateShopCartQuantity = async (shopId: number, cartItemId: number, quantity: number) => {
    if (!accessToken || user?.role !== 'customer') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/update/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update shop cart item');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchShopCart(shopId);
      }
    } catch (error) {
      console.error('Error updating shop cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update cart item');
    }
  };

  const clearShopCart = async (shopId: number) => {
    if (!accessToken || user?.role !== 'customer') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setCart([]);
        toast.success('Shop cart cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing shop cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
    }
  };

  return (
    <ShopCartContext.Provider value={{
      cart,
      addToShopCart,
      removeFromShopCart,
      updateShopCartQuantity,
      clearShopCart,
      fetchShopCart,
      totalItems,
      totalPrice,
      formattedTotalPrice,
      loading
    }}>
      {children}
    </ShopCartContext.Provider>
  );
};

export const useShopCart = (): ShopCartContextType => {
  const context = useContext(ShopCartContext);
  if (context === undefined) {
    throw new Error('useShopCart must be used within a ShopCartProvider');
  }
  return context;
}; 