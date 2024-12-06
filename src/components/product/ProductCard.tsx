import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  isBuiltIn?: boolean;
  salePercentage?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isNew = false,
  isBuiltIn = false,
  salePercentage,
}) => {
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading: wishlistLoading,
    wishlistItems,
  } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      // Store the current URL to redirect back after sign in
      const returnUrl = encodeURIComponent(window.location.pathname);
      navigate(`/sign-in?returnUrl=${returnUrl}`);
      return;
    }

    // Check if user is a merchant or admin (they shouldn't be able to add to cart)
    if (user?.role === "merchant" || user?.role === "admin") {
      toast.error("Merchants and admins cannot add items to cart");
      return;
    }

    try {
      await addToCart(product, 1);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to proceed with purchase");
      const returnUrl = encodeURIComponent(window.location.pathname);
      navigate(`/sign-in?returnUrl=${returnUrl}`);
      return;
    }

    // Check if user is a merchant or admin
    if (user?.role === "merchant" || user?.role === "admin") {
      toast.error("Merchants and admins cannot make purchases");
      return;
    }

    // Create direct purchase item with default attributes (if any)
    const defaultAttributes: { [key: number]: string | string[] } = {};
    if (product.attributes && product.attributes.length > 0) {
      // For product cards, we'll use first available attribute values as defaults
      product.attributes.forEach((attr: any) => {
        if (!defaultAttributes[attr.attribute_id]) {
          defaultAttributes[attr.attribute_id] =
            attr.value_text || attr.value_label;
        }
      });
    }

    const directPurchaseItem = {
      product: {
        ...product,
        image_url: product.image_url || product.primary_image || "/placeholder-image.png",
      },
      quantity: 1,
      selected_attributes:
        Object.keys(defaultAttributes).length > 0
          ? defaultAttributes
          : undefined,
    };

    // Navigate to payment page with direct purchase data
    navigate("/payment", {
      state: {
        directPurchase: directPurchaseItem,
        discount: 0,
        appliedPromo: null,
        itemDiscounts: {},
      },
    });
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to wishlist");
      const returnUrl = encodeURIComponent(window.location.pathname);
      navigate(`/sign-in?returnUrl=${returnUrl}`);
      return;
    }

    // Check if user is a merchant or admin
    if (user?.role === "merchant" || user?.role === "admin") {
      toast.error("Merchants and admins cannot add items to wishlist");
      return;
    }

    try {
      const productId = Number(product.id);
      const isInWishlistItem = isInWishlist(productId);

      if (isInWishlistItem) {
        // Find the wishlist item ID from the wishlist items
        const wishlistItem = wishlistItems.find(
          (item) => item.product_id === productId
        );
        if (wishlistItem) {
          await removeFromWishlist(wishlistItem.wishlist_item_id);
        }
      } else {
        // console.log("Attempting to add to wishlist, product ID:", productId);
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error("Wishlist error details:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update wishlist"
      );
    }
  };

  // Calculate sale percentage if original price exists
  const calculateSalePercentage = () => {
    if (product.original_price && product.price) {
      const percentage =
        ((product.original_price - product.price) / product.original_price) *
        100;
      return Math.round(percentage);
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer  flex flex-col w-full h-[450px] border border-gray-100">
      <div className="relative h-72 w-full bg-white">
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="w-[50px] h-[24px] bg-[#F2631F] text-white text-[12px] font-medium flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-400 text-black text-[10px] px-1.5 py-0.5 rounded">
              Sold Out
            </span>
          )}
          {!isNew &&
            product.stock > 0 &&
            (salePercentage || calculateSalePercentage() > 0) && (
              <span className="bg-[#F2631F] text-white text-[10px] px-1.5 py-0.5 rounded">
                -{salePercentage || calculateSalePercentage()}%
              </span>
            )}
        </div>

        {/* Wishlist button */}
        <button
          className={`absolute top-2 right-2 p-1.5 z-10 rounded-full transition-all duration-300 ${isInWishlist(Number(product.id))
              ? "text-[#F2631F] bg-white shadow-md"
              : "text-gray-400 hover:text-[#F2631F] hover:bg-white hover:shadow-md"
            }`}
          onClick={handleWishlist}
          disabled={wishlistLoading}
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist(Number(product.id)) ? "fill-current" : ""
              }`}
          />
        </button>

        {/* Product image */}
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={
              product.primary_image ||
              product.image_url ||
              "/placeholder-image.png"
            }
            alt={product.name}
            className="w-full  h-full object-contain rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.png";
            }}
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-normal mb-1 line-clamp-2 font-['Work_Sans']">
            {product.name}
          </h3>
          {/* <p className="text-xs text-gray-500">
            SKU: {product.sku}
          </p> */}
        </Link>

        <div className="mt-auto w-full">
          <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 mb-4">
            <span className="text-lg font-semibold">
              ₹{Number(product.price).toFixed(2)}
            </span>
            {product.original_price && (
              <span className="text-gray-400 text-sm line-through">
                ₹{Number(product.original_price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex gap-2 w-full">
            <button
              className="w-1/2 bg-[#F2631F] text-white text-base font-worksans font-medium hover:bg-orange-600 py-2 rounded-xl duration-300 transition shadow-md"
              onClick={handleBuyNow}
              disabled={
                product.stock === 0 ||
                user?.role === "merchant" ||
                user?.role === "admin"
              }
            >
              Buy Now
            </button>
            <button
              className="w-1/2 flex items-center justify-center bg-gray-200 text-black rounded-xl shadow-md hover:bg-gray-300 transition"
              onClick={handleAddToCart}
              disabled={
                product.stock === 0 ||
                user?.role === "merchant" ||
                user?.role === "admin"
              }
              aria-label="Add to Cart"
            >
              <ShoppingCart className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
