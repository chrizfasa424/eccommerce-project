import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShopCart } from '../../context/ShopCartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

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

const ShopCartPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { cart, removeFromShopCart, updateShopCartQuantity, clearShopCart, fetchShopCart, totalPrice, formattedTotalPrice, loading } = useShopCart();
  const { accessToken, user } = useAuth();
  
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<{ [key: number]: boolean }>({});

  const shopIdNum = parseInt(shopId || '0');

  useEffect(() => {
    if (shopIdNum && accessToken && user?.role === 'customer') {
      console.log('Fetching shop cart for shop ID:', shopIdNum);
      fetchShopCart(shopIdNum);
    }
  }, [shopIdNum, accessToken, user?.role]);

  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(cartItemId);
      return;
    }

    setUpdatingItems(prev => ({ ...prev, [cartItemId]: true }));
    try {
      await updateShopCartQuantity(shopIdNum, cartItemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItems(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeFromShopCart(shopIdNum, cartItemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = () => {
    setClearCartModalOpen(true);
  };

  const handleCheckout = () => {
    if (!accessToken) {
      toast.error("Please sign in to proceed with checkout");
      navigate("/signin", { state: { returnUrl: `/shop/${shopId}/cart` } });
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Navigate to checkout page with shop cart data
    navigate(`/shop/${shopId}/checkout`, { 
      state: { 
        cartItems: cart,
        totalPrice,
        shopId: shopIdNum
      } 
    });
  };

  const handleContinueShopping = () => {
    navigate(`/shop/${shopId}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  const activeCartItems = cart.filter(item => !item.product.is_deleted);
  
  // Debug logging
  console.log('ShopCartPage - Cart data:', cart);
  console.log('ShopCartPage - Active cart items:', activeCartItems);
  console.log('ShopCartPage - Cart items with images:', activeCartItems.map(item => ({
    name: item.product.name,
    image_url: item.product.image_url,
    price: item.product.price
  })));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Shop Cart</h1>

      {activeCartItems.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4 text-lg">Your shop cart is empty</p>
          <button
            onClick={handleContinueShopping}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors w-full sm:w-auto max-w-xs"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg p-6">
              <div className="hidden md:flex text-sm text-gray-500 mb-2">
                <div className="w-8"></div>
                <div className="flex-1 ml-4">
                  <span className="ml-20">Product</span>
                </div>
                <div className="w-24 text-center">Price</div>
                <div className="w-32 text-center">Qty</div>
                <div className="w-24 text-right">Sub Total</div>
              </div>

              {activeCartItems.map((item: ShopCartItem) => (
                <div key={item.cart_item_id} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                  {/* Product Image */}
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        console.error('Image failed to load for product:', item.product.name, 'URL:', item.product.image_url);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully for product:', item.product.name, 'URL:', item.product.image_url);
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.product.price}
                      {item.product.special_price && (
                        <span className="line-through text-gray-400 ml-2">
                          ₹{item.product.original_price}
                        </span>
                      )}
                    </p>
                    {/* Display Selected Attributes */}
                    {item.selected_attributes && Object.keys(item.selected_attributes).length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(item.selected_attributes).map(([attrId, values]) => {
                            const valueArray = Array.isArray(values) ? values : [values];
                            return valueArray.map((value, index) => (
                              <span
                                key={`${attrId}-${index}`}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded border"
                              >
                                {value}
                              </span>
                            ));
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="w-24 text-center">
                    <span className="font-medium">₹{item.product.price}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="w-32 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.cart_item_id, item.quantity - 1)}
                      disabled={updatingItems[item.cart_item_id]}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="font-medium min-w-[2rem] text-center">
                      {updatingItems[item.cart_item_id] ? '...' : item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.cart_item_id, item.quantity + 1)}
                      disabled={updatingItems[item.cart_item_id] || item.quantity >= item.product.stock}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="w-24 text-right">
                    <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.cart_item_id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row mt-6 gap-4 w-full justify-between">
                <button
                  onClick={handleContinueShopping}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors w-full sm:w-auto"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleClearCart}
                  disabled={loading}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Clearing..." : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 sticky top-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({activeCartItems.length} items)</span>
                  <span>{formattedTotalPrice}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formattedTotalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={activeCartItems.length === 0}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={clearCartModalOpen}
        title="Clear Cart"
        message="Are you sure you want to clear your entire shop cart? This action cannot be undone."
        onConfirm={async () => {
          try {
            await clearShopCart(shopIdNum);
            toast.success("Shop cart cleared successfully");
          } catch (error) {
            toast.error("Failed to clear shop cart");
          }
          setClearCartModalOpen(false);
        }}
        onCancel={() => setClearCartModalOpen(false)}
        confirmText="Clear Cart"
        cancelText="Cancel"
        icon={
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-2">
            <ShoppingCart className="w-8 h-8 text-orange-500" />
          </span>
        }
      />
    </div>
  );
};

export default ShopCartPage; 