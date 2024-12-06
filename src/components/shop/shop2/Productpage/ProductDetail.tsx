import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Image as ImageIcon, ChevronDown, ChevronUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import shop2ApiService, { Product, ProductVariant } from '../../../../services/shop2ApiService';
import chroma from 'chroma-js';
import { useShopCart } from '../../../../context/ShopCartContext';
import { useAuth } from '../../../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // For accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Mobile carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mobile carousel navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Placeholder reviews and sections (can be replaced with API data if available)
  const sections = [
    { title: "Overview", content: product?.full_description || product?.product_description || "No description available." },
    { title: "Materials", content: "Made from eco-friendly materials." },
    { title: "Return Policy", content: "Returns accepted within 30 days." },
  ];

  const reviews = [
    {
      name: "Marvin McKinney",
      rating: 4,
      content: "I love this store's shirt! It's so comfortable and easy to wear with anything. I ended up buying one in every color during their sale. The quality is great too. Thank you!",
      daysAgo: "2 days ago"
    },
    {
      name: "Savannah Nguyen",
      rating: 5,
      content: "I'm so impressed with the customer service at this store! The staff was friendly and helpful, and I found the perfect shirt. It looks and feels amazing. I'll definitely be shopping here again!",
      daysAgo: "19 days ago"
    },
    {
      name: "Wade Warren",
      rating: 2,
      content: "Unfortunately, I didn't have a great experience with this store's product. The quality wasn't what I expected and it didn't fit well. I wouldn't recommend it.",
      daysAgo: "22 days ago"
    },
  ];



  // Helper to get current product's attributes, including from variants data
  function getCurrentProductAttributes(): Array<{name: string, value: string, attribute_id: number}> {
    const attributes: Array<{name: string, value: string, attribute_id: number}> = [];

    // For parent products, show parent attributes
    if (product?.is_parent_product && product?.attributes) {
      product.attributes.forEach(attr => {
        attributes.push({
          name: attr.attribute?.name || 'Unknown',
          value: attr.value || 'N/A',
          attribute_id: attr.attribute_id
        });
      });
      return attributes;
    }

    // For variant products, first try to find current variant in variants array
    if (isVariantProduct(product) && variants.length > 0) {
      const currentVariant = variants.find(v => v.variant_product_id === Number(productId));
      if (currentVariant && currentVariant.attribute_combination) {
        // Use attribute_combination from current variant
        Object.entries(currentVariant.attribute_combination).forEach(([key, value], index) => {
          attributes.push({
            name: key,
            value: String(value),
            attribute_id: index // Use index as ID for variant attributes
          });
        });
        return attributes;
      }
    }

    // Fallback to variant_attributes if available
    if (isVariantProduct(product) && product?.variant_attributes && Array.isArray(product.variant_attributes)) {
      product.variant_attributes.forEach((variantAttr, index) => {
        if (variantAttr.values && Array.isArray(variantAttr.values)) {
          attributes.push({
            name: variantAttr.name || 'Unknown',
            value: variantAttr.values.join(', '),
            attribute_id: index
          });
        }
      });
      return attributes;
    }

    // Final fallback to regular attributes
    if (product?.attributes) {
      product.attributes.forEach(attr => {
        attributes.push({
          name: attr.attribute?.name || 'Unknown',
          value: attr.value || 'N/A',
          attribute_id: attr.attribute_id
        });
      });
    }

    return attributes;
  }

  // Helper to get current variant's available attribute values
  function getCurrentVariantAttributeValues(attrName: string): string[] {
    // Find current variant in variants array
    const currentVariant = variants.find(v => v.variant_product_id === Number(productId));
    
    if (currentVariant && currentVariant.attribute_combination && currentVariant.attribute_combination[attrName]) {
      const value = currentVariant.attribute_combination[attrName];
      if (typeof value === 'string') {
        return value.split(',').map(v => v.trim()).filter(Boolean).sort();
      } else {
        return [String(value)];
      }
    }

    return [];
  }



  // Helper to check if this is a variant product
  function isVariantProduct(product: Product | null): boolean {
    return !!(product?.has_variants && !product?.is_parent_product);
  }

  // State for selected attributes (supports both single and multi-select)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<number, string | string[]>>({});

  // Helper to determine if an attribute should be multi-select
  function isMultiSelectAttribute(attrName: string): boolean {
    const name = attrName.toLowerCase();
    return name.includes('color') || 
           name.includes('size') || 
           name.includes('style') || 
           name.includes('ram') || 
           name.includes('storage') || 
           name.includes('memory') || 
           name.includes('capacity');
  }

  // Handle attribute selection for both single and multi-select
  const handleAttributeSelect = (
    attributeId: number,
    value: string,
    isMultiSelect: boolean
  ) => {
    setSelectedAttributes((prev) => {
      if (isMultiSelect) {
        const currentValues = (prev[attributeId] as string[]) || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return { ...prev, [attributeId]: newValues };
      } else {
        return { ...prev, [attributeId]: value };
      }
    });
  };

  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  
  // Cart functionality
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  
  // Shop2 has a fixed shop ID of 2
  const SHOP_ID = 2;
  
  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // Handle quantity change
  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!accessToken) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    if (user?.role !== 'customer') {
      toast.error("Only customers can add items to cart");
      return;
    }

    if (!product) {
      toast.error("Product not available");
      return;
    }

    try {
      await addToShopCart(SHOP_ID, product.product_id, quantity, selectedAttributes);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Fetch product variants
  const fetchVariants = async (productId: number) => {
    setVariantsLoading(true);
    try {
      
      const response = await shop2ApiService.getProductVariants(productId);
      if (response && response.success) {
        setVariants(response.variants);
      }
    } catch (err) {
      console.error('Failed to fetch variants:', err);
    } finally {
      setVariantsLoading(false);
    }
  };

  // Navigate to variant page or parent product
  const handleVariantClick = (variant: ProductVariant) => {
    // Navigate to the variant product page using variant_product_id
    // The variant_product_id is the actual product ID, not the variant_id
    navigate(`/shop2/product/${variant.variant_product_id}`);
  };

  // State for parent product data
  const [parentProduct, setParentProduct] = useState<Product | null>(null);

  // Navigate to parent product
  const handleParentProductClick = () => {
    // Find parent product ID from variants data
    const parentProductId = variants.length > 0 ? variants[0]?.parent_product_id : null;
    if (parentProductId) {
      navigate(`/shop2/product/${parentProductId}`);
    }
  };

  // Fetch parent product data when variants are loaded
  const fetchParentProduct = async (parentProductId: number) => {
    try {
      const response = await shop2ApiService.getProductById(parentProductId);
      if (response && response.success) {
        setParentProduct(response.product);
      }
    } catch (err) {
      console.error('Failed to fetch parent product:', err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!productId) {
          setError('No product ID provided');
          setLoading(false);
          return;
        }
        const response = await shop2ApiService.getProductById(Number(productId));
        if (response && response.success) {
          setProduct(response.product);
          // Fetch variants after product is loaded
          await fetchVariants(Number(productId));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Initialize selected attributes when product changes
  useEffect(() => {
    if (product) {
      const initialAttributes: Record<number, string | string[]> = {};
      
      // Initialize with current variant attributes if available
      if (product.current_variant_attributes) {
        Object.entries(product.current_variant_attributes).forEach(([key, value]) => {
          // Find the attribute ID for this attribute name
          const attr = product.attributes?.find(a => 
            a.attribute?.name?.toLowerCase() === key.toLowerCase()
          );
          if (attr) {
            initialAttributes[attr.attribute_id] = value;
          }
        });
      }
      
      setSelectedAttributes(initialAttributes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Fetch parent product when variants are available and this is a variant product
  useEffect(() => {
    if (product && variants.length > 0 && isVariantProduct(product)) {
      const parentProductId = variants[0]?.parent_product_id;
      if (parentProductId && !parentProduct) {
        fetchParentProduct(parentProductId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, variants]);

  if (loading) return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-96 text-red-500 text-lg">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-96 text-lg">No product data.</div>;

  // Use product.media?.images for gallery if available, else fallback to primary_image
  const images = product.media?.images?.length ? product.media.images : [
    { url: product.primary_image, type: 'image', is_primary: true }
  ];

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-6 sm:pb-8 lg:pb-10 flex flex-col gap-0">
      {/* Photos Modal */}
      {showPhotosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowPhotosModal(false)}>
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
              onClick={() => setShowPhotosModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Main Image */}
            <div className="w-full flex items-center justify-center relative" style={{ minHeight: 320 }}>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={() => setCurrentPhotoIdx((currentPhotoIdx - 1 + images.length) % images.length)}
                disabled={images.length <= 1}
                style={{ zIndex: 2 }}
              >
                &#8592;
              </button>
              <img
                src={images[currentPhotoIdx]?.url}
                alt={`Product photo ${currentPhotoIdx + 1}`}
                className="max-h-[400px] object-contain rounded-lg"
                style={{ maxWidth: '90%' }}
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={() => setCurrentPhotoIdx((currentPhotoIdx + 1) % images.length)}
                disabled={images.length <= 1}
                style={{ zIndex: 2 }}
              >
                &#8594;
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`h-16 w-16 object-cover rounded border cursor-pointer ${currentPhotoIdx === idx ? 'border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setCurrentPhotoIdx(idx)}
                  style={{ minWidth: 64 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <hr className="border-black border-t-1 mb-4 sm:mb-6" />
      {/* Top Container: Responsive grid for images and details */}
      <div className="grid grid-cols-1 max-w-[1580px]  md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 2xl:gap-2 items-start lg:items-center">
        {/* Mobile/Tablet Carousel - Hidden on large desktop */}
        <div className="lg:hidden relative order-1">
          <div className="relative w-full h-[300px] sm:h-[380px] rounded-2xl overflow-hidden">
            <img 
              src={images[currentImageIndex]?.url || '/assets/shop2/ProductPage/pd1.svg'} 
              alt={`Product image ${currentImageIndex + 1}`} 
              className="w-full h-full object-contain" 
            />
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
            {/* Heart icon */}
            <button className="absolute top-4 right-4 p-2 rounded-full transition-all">
              <Heart className="w-6 h-6 text-white" />
            </button>
            {/* Mobile See All Photos button */}
            <button
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg border border-gray-200"
              onClick={() => { setShowPhotosModal(true); setCurrentPhotoIdx(currentImageIndex); }}
            >
              <ImageIcon className="w-3 h-3" /> All Photos
            </button>
          </div>
          
          {/* Mobile Photo Gallery Section */}
          <div className="mt-4 grid grid-cols-4 gap-2 w-full">
            {images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`aspect-square cursor-pointer rounded-lg border-2 transition-all ${
                  currentImageIndex === idx 
                    ? 'border-orange-400 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop First image - Hidden on mobile/tablet */}
        <div className="hidden lg:flex justify-center order-1 md:order-1 lg:order-1">
          <img 
            src={images[0]?.url || '/assets/shop2/ProductPage/pd1.svg'} 
            alt="Front View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[390px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
        </div>
        {/* Desktop Second image with Heart Icon - Hidden on mobile/tablet */}
        <div className="hidden lg:relative lg:flex justify-center order-2 md:order-2 lg:order-2">
          <img 
            src={images[1]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd1.svg'} 
            alt="Back View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[360px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
          <button className="absolute top-4 right-4 sm:right-8 p-2 rounded-full transition-all">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </button>
        </div>
        {/* Product Details */}
        <div className="relative flex flex-col justify-center min-w-0 lg:min-w-[340px] h-auto lg:h-[456px] px-2 mb-4 lg:mb-8 self-center order-3 md:order-3 lg:order-3">
          <div className="text-xs sm:text-sm uppercase text-gray-400 mb-2 sm:mb-4 font-bebas font-semibold tracking-wide">{product.category_name || 'CATEGORY'}</div>
          <p className="text-2xl sm:text-3xl lg:text-[42px] font-normal font-bebas leading-tight mb-2 sm:mb-3">{product.product_name}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </p>
                     {/* Dynamic Attribute Selection */}
           {(() => {
             const currentAttributes = getCurrentProductAttributes();
             
             if (currentAttributes.length === 0) return null;

             return (
               <div className="mb-4 sm:mb-6">
                 {currentAttributes.map((attr) => {
                   const attrName = attr.name;
                   const isMultiSelect = isMultiSelectAttribute(attrName);
                   const selectedValues = selectedAttributes[attr.attribute_id];

                   // Get current variant's specific values for this attribute
                   const currentVariantValues = getCurrentVariantAttributeValues(attrName);
                   // If no variant values found, use current attribute values
                   const valuesToShow = currentVariantValues.length > 0 
                     ? currentVariantValues 
                     : attr.value.split(',').map(v => v.trim()).filter(Boolean);

                   return (
                     <div key={`${attrName.toLowerCase()}-${attr.attribute_id}`} className="mb-3 sm:mb-4">
                       <div className="flex items-center justify-between mb-2">
                         <span className="text-xs sm:text-[14px] font-bebas font-bold tracking-wide">
                           {attrName.toUpperCase()}
                         </span>
                         {attrName.toLowerCase() === 'size' && (
                           <span className="text-xs sm:text-[13px] text-black underline cursor-pointer font-medium">
                             Size Guide
                           </span>
                         )}
                       </div>
                       <div className="flex items-center justify-between">
                         <div className="flex flex-wrap gap-1 sm:gap-2 flex-1">
                           {valuesToShow.map((value, index) => {
                             const isSelected = isMultiSelect
                               ? (selectedValues as string[])?.includes(value)
                               : selectedValues === value;

                             return (
                               <button
                                 key={`${attr.attribute_id}-${index}`}
                                 onClick={() => handleAttributeSelect(
                                   attr.attribute_id,
                                   value,
                                   isMultiSelect
                                 )}
                                 className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-[10px] sm:text-[12px] font-semibold shadow-sm transition-all focus:outline-none ${
                                   isSelected 
                                     ? 'bg-orange-100 border-orange-400 shadow-md text-black' 
                                     : 'bg-white border-gray-300 text-gray-700'
                                 }`}
                                 style={{ 
                                   boxShadow: isSelected ? '0 2px 8px rgba(255, 165, 0, 0.15)' : undefined 
                                 }}
                               >
                                 {attrName.toLowerCase() === 'color' && (
                                   <span
                                     className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-1 sm:mr-2 border"
                                     style={{ backgroundColor: chroma.valid(value) ? chroma(value).hex() : '#ccc' }}
                                   />
                                 )}
                                 {value}
                               </button>
                             );
                           })}
                         </div>
                         {attrName.toLowerCase() === 'size' && (
                           <div className="flex items-center gap-2 ml-4">
                             <button 
                               className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition-colors"
                               onClick={() => handleQuantityChange(false)}
                             >
                               -
                             </button>
                             <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                             <button 
                               className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition-colors"
                               onClick={() => handleQuantityChange(true)}
                             >
                               +
                             </button>
                           </div>
                         )}
                       </div>
                     </div>
                   );
                 })}
               </div>
             );
           })()}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <button 
              className="w-full sm:flex-1 bg-black text-[16px] font-gilroy text-white px-3 py-1 rounded-full font-bold flex items-center justify-center gap-2 text-base shadow hover:bg-gray-900 transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
            </button>
            <button className="w-full sm:flex-1 border-2 border-black text-black px-3 py-3 sm:py-4 rounded-full font-bold text-base hover:bg-gray-100 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Container: Next two images - Hidden on mobile/tablet since we have carousel */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full max-w-[1230px] mx-auto items-center mt-4 sm:mt-6 lg:mt-1 gap-4">
        <img 
          src={images[2]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd3.svg'} 
          alt="Side View" 
          className="rounded-xl w-full lg:w-[486px] h-[250px] sm:h-[300px] lg:h-[412px] object-cover" 
        />
        <div className="relative rounded-xl overflow-hidden flex-1 h-[250px] sm:h-[300px] lg:h-[412px] w-full lg:ml-0">
          <img 
            src={images[3]?.url || images[1]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd4.svg'} 
            alt="Closeup" 
            className="rounded-xl w-full h-full object-cover" 
          />
          <button
            className="absolute bottom-8 sm:bottom-14 left-6 sm:left-12 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 shadow-lg border border-gray-200"
            onClick={() => { setShowPhotosModal(true); setCurrentPhotoIdx(0); }}
          >
            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" /> See All Photos
          </button>
        </div>
      </div>
             {/* Product Variants Section - Small Thumbnails */}
       {(variants.length > 0 || product?.is_parent_product) && (
         <div className="max-w-[1310px] w-full mx-auto mt-6 sm:mt-8">
                       <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold font-bebas">
                {product?.is_parent_product ? 'Available Variants' : 'Related Products'}
              </h3>
              <span className="text-xs text-gray-600 font-gilroy">
                {(variants.length + (isVariantProduct(product) && variants.length > 0 ? 1 : 0))} available
              </span>
            </div>
           
           {variantsLoading ? (
             <div className="flex justify-center items-center h-16">
               <div className="text-gray-500 text-sm">Loading...</div>
             </div>
           ) : (
                                                       <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                {/* Show parent product first if this is a variant product */}
                {isVariantProduct(product) && variants.length > 0 && variants[0]?.parent_product_id && (
                  <div
                    onClick={handleParentProductClick}
                    className={`group cursor-pointer bg-white rounded-lg border transition-all duration-200 flex-shrink-0 ${
                      Number(productId) === variants[0]?.parent_product_id
                        ? 'border-orange-400 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{ width: '60px', height: '60px' }}
                  >
                    <img
                      src={parentProduct?.primary_image || '/assets/shop2/ProductPage/pd1.svg'}
                      alt="Parent Product"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                
                {/* Sort variants to show parent product first, then other variants */}
                {variants
                  .sort((a, b) => {
                    // Sort parent product first (if it exists in variants)
                    if (a.parent_product_id === null) return -1;
                    if (b.parent_product_id === null) return 1;
                    return 0;
                  })
                  .map((variant) => (
                    <div
                      key={variant.variant_id}
                      onClick={() => handleVariantClick(variant)}
                      className={`group cursor-pointer bg-white rounded-lg border transition-all duration-200 flex-shrink-0 ${
                        variant.variant_product_id === Number(productId)
                          ? 'border-orange-400 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      style={{ width: '60px', height: '60px' }}
                    >
                      {/* Small Variant Image Only */}
                      <img
                        src={variant.primary_image || variant.media?.primary_image || '/assets/shop2/ProductPage/pd1.svg'}
                        alt={variant.variant_name || `Variant ${variant.variant_id}`}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
              </div>
           )}
         </div>
       )}

      {/* Description & Reviews Section */}
      <div className="max-w-[1310px]  pt-8 sm:pt-10 lg:pt-12 flex flex-col items-start">
        {/* Accordion Section */}
        <div className="max-w-3xl w-full  pt-8 sm:pt-10 lg:pt-12 pl-0 text-left self-start">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold mb-3 sm:mb-4 text-left font-bebas">DESCRIPTION</h2>
          <div className="divide-y border-t border-b">
            {sections.map((section, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex font-gilroy items-center justify-between py-3 sm:py-4 text-left"
                >
                  <span className="text-sm sm:text-base font-medium">{section.title}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 text-left">
                    {section.title === "Overview" ? (
                      <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      section.content
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Reviews Section */}
        <div className="max-w-3xl w-full mt-8 sm:mt-12 lg:mt-16 pl-0 pt-6 sm:pt-8 lg:pt-9 text-left self-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-left font-bebas">REVIEWS</h2>
              <p className="underline text-xs sm:text-sm">Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
            </div>
            <button className="px-4 sm:px-6 py-2 bg-black text-white rounded-full font-gilroy text-sm sm:text-lg font-semibold w-full sm:w-auto">Write Review</button>
          </div>
          {reviews.map((review, index) => (
            <div key={index} className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold font-bebas text-lg sm:text-xl uppercase truncate text-left">{review.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-base text-gray-400 font-gilroy whitespace-nowrap self-start sm:self-auto text-left">{review.daysAgo}</p>
              </div>
              <p className="text-xs sm:text-sm text-black font-gilroy leading-relaxed text-left">{review.content}</p>
              <hr className="mt-3 sm:mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;