import React, { useState, useEffect, useMemo } from 'react';
import { Minus, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product as ApiProduct } from '../../../../services/shop1ApiService';
import { useShopCart } from '../../../../context/ShopCartContext';
import { useAuth } from '../../../../context/AuthContext';
import { toast } from 'react-hot-toast';

interface Product extends ApiProduct {
  // Keeping the original interface structure for backward compatibility
}

interface HeroProps {
  productData?: Product | null;
}

const Hero: React.FC<HeroProps> = ({ productData }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<Product | null>(null);
  const [stockError, setStockError] = useState<string>('');
  
  // Cart functionality
  const { addToShopCart } = useShopCart();
  const { accessToken, user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Shop1 has a fixed shop ID of 1
  const SHOP_ID = 1;

  // Extract and combine attributes from both parent product attributes and variant attributes
  const availableAttributes = useMemo(() => {
    if (!productData) return [];

    // Get variant options
    const variantAttrs = productData.variant_attributes || [];

    // Get parent product attributes for default values
    const parentAttrs = productData.attributes || [];

    // Create a map to combine all attribute options
    const attributeMap = new Map();

    // First, collect parent product attribute values as defaults
    const parentDefaults: Record<string, string> = {};
    parentAttrs.forEach(attr => {
      const attrName = attr.attribute?.name;
      const attrValue = attr.value;
      if (attrName && attrValue) {
        parentDefaults[attrName] = attrValue;
      }
    });

    // Add variant attributes with their available options
    variantAttrs.forEach(attr => {
      const allValues = new Set<string>();

      // Add parent value if it exists for this attribute
      if (parentDefaults[attr.name]) {
        allValues.add(parentDefaults[attr.name]);
      }

      // Add all variant values
      (attr.values || []).forEach(value => allValues.add(value));

      attributeMap.set(attr.name, {
        name: attr.name,
        values: Array.from(allValues).sort(),
        defaultValue: parentDefaults[attr.name] || (attr.values && attr.values[0]) || ''
      });
    });

    // Add any parent attributes that don't have variant options
    parentAttrs.forEach(attr => {
      const attrName = attr.attribute?.name;
      const attrValue = attr.value;

      if (attrName && attrValue && !attributeMap.has(attrName)) {
        // Add all possible values from the attribute definition
        const allValues = new Set<string>([attrValue]);

        // If it's a select attribute, add all possible values
        if (attr.attribute?.values) {
          attr.attribute.values.forEach(val => allValues.add(val.value));
        }

        attributeMap.set(attrName, {
          name: attrName,
          values: Array.from(allValues).sort(),
          defaultValue: attrValue
        });
      }
    });

    return Array.from(attributeMap.values());
  }, [productData?.product_id, productData?.variant_attributes, productData?.attributes]);

  // Extract variant data from product data (no API calls needed)
  const variants = productData?.variants || [];

  // Set default attributes when product changes
  useEffect(() => {
    if (productData?.has_variants && availableAttributes.length > 0) {
      // Set default selection to parent product attributes (auto-selected)
      const defaultAttributes: Record<string, string> = {};
      availableAttributes.forEach(attr => {
        // Use the default value from parent product (auto-selected)
        defaultAttributes[attr.name] = attr.defaultValue || (attr.values.length > 0 ? attr.values[0] : '');
      });
      setSelectedAttributes(defaultAttributes);
    } else {
      setSelectedAttributes({});
      setCurrentVariant(null);
    }
  }, [productData?.product_id, availableAttributes]);

  // Find matching variant when attributes change
  useEffect(() => {
    if (!productData?.has_variants || Object.keys(selectedAttributes).length === 0) return;

    const findVariantByAttributes = () => {
      setStockError('');

      // Find variant by matching SKU pattern or by checking if selection matches available variants
      let matchingVariant = null;

      // Method 1: Try to find variant by SKU pattern (most reliable)
      if (Object.keys(selectedAttributes).length > 0) {
        matchingVariant = variants.find(variant => {
          const sku = variant.sku?.toUpperCase() || '';
          let matches = 0;
          let totalSelectedAttributes = 0;

          // Check each selected attribute
          Object.entries(selectedAttributes).forEach(([attrName, attrValue]) => {
            if (attrValue) {
              totalSelectedAttributes++;

              // Create SKU pattern for this attribute
              const attrCode = attrName.toUpperCase().substring(0, 3); // COL, SIZ, etc.
              const valueCode = attrValue.toUpperCase().substring(0, 3); // BLU, RED, S, M, etc.
              const pattern = `${attrCode}${valueCode}`;

              if (sku.includes(pattern)) {
                matches++;
              }
            }
          });

          return matches === totalSelectedAttributes && totalSelectedAttributes > 0;
        });
      }

      // Method 2: Fallback - if only one variant, check if selected attributes are available
      if (!matchingVariant && variants.length === 1) {
        const variant = variants[0];
        // Use the available_attributes from the API response (it exists in the actual response)
        const availableAttrs = (productData as any).available_attributes || {};

        // Check if all selected attributes have available values
        const allAttributesAvailable = Object.entries(selectedAttributes).every(([attrName, attrValue]) => {
          const availableValues = availableAttrs[attrName] || [];
          return availableValues.includes(attrValue);
        });

        if (allAttributesAvailable) {
          matchingVariant = variant;
        }
      }

      // Update state based on variant match
      if (matchingVariant) {
        setCurrentVariant(matchingVariant);
        // Reset image carousel to first image when variant changes
        setCurrentImageIndex(0);

        // Check stock and show warning if low
        const stockQty = matchingVariant.stock?.stock_qty || 0;
        const lowStockThreshold = (matchingVariant.stock as any)?.low_stock_threshold || 5;

        if (stockQty <= 0) {
          setStockError('This variant is out of stock');
        } else if (stockQty <= lowStockThreshold) {
          setStockError(`Only ${stockQty} left in stock!`);
        }
      } else {
        setCurrentVariant(null);
        // Reset to parent media when no variant is selected
        setCurrentImageIndex(0);

        // Check if selected attributes match parent product attributes
        const parentAttributes: Record<string, string> = {};
        if (productData?.attributes) {
          productData.attributes.forEach(attr => {
            if (attr.attribute?.name && attr.value) {
              parentAttributes[attr.attribute.name] = attr.value;
            }
          });
        }

        // Check if current selection matches parent product attributes
        const matchesParentAttributes = Object.keys(selectedAttributes).length > 0 &&
          Object.entries(selectedAttributes).every(([attrName, attrValue]) =>
            parentAttributes[attrName] === attrValue
          );

        if (Object.keys(selectedAttributes).length > 0 && !matchesParentAttributes) {
          setStockError('This combination is not available. Please choose a different combination.');
        }
        // If it matches parent attributes, don't show any error (user is viewing parent product)
      }
    };

    findVariantByAttributes();
  }, [selectedAttributes, variants, productData?.has_variants, productData?.attributes]);

  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }));
  };

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string): JSX.Element[] => {
    if (!text) return [];

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const content = trimmed.slice(2, -2);
        elements.push(
          <h4 key={index} className="text-xl font-bold text-black mb-2">
            {content}
          </h4>
        );
      }
      // Italic text
      else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
        const content = trimmed.slice(1, -1);
        elements.push(
          <p key={index} className="text-gray-600 italic mb-2">
            {content}
          </p>
        );
      }
      // Numbered lists
      else if (/^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s*/, '');
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#EABABA] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="text-gray-700">{content}</span>
          </div>
        );
      }
      // Bullet points
      else if (trimmed.startsWith('- ')) {
        const content = trimmed.slice(2);
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-2 h-2 rounded-full bg-[#EABABA] mr-4 mt-2"></span>
            <span className="text-gray-700">{content}</span>
          </div>
        );
      }
      // Regular text
      else if (trimmed) {
        elements.push(
          <p key={index} className="text-gray-700 mb-2">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  // Get all media (images and videos) for the carousel - prioritize variant media
  const allMedia = (() => {
    // If we have a current variant with media, use that
    if (currentVariant?.media) {
      return [
        ...currentVariant.media.images || [],
        ...currentVariant.media.videos || []
      ];
    }

    // Otherwise, use product media
    if (productData?.media) {
      return [
        ...productData.media.images || [],
        ...productData.media.videos || []
      ];
    }

    return [];
  })();

  // Fallback images if no media
  const fallbackImages = [
    "/assets/images/Productcard/hero1.jpg",
    "/assets/images/Productcard/hero2.jpg",
    "/assets/images/Productcard/hero3.jpg",
    "/assets/images/Productcard/hero4.jpg"
  ];

  const mediaToDisplay = allMedia.length > 0 ? allMedia : fallbackImages.map(url => ({ url, type: 'IMAGE' }));

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
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

    if (!productData) {
      toast.error("Product not available");
      return;
    }

    try {
      setIsAddingToCart(true);
      
      // Create selected attributes object from current selections
      const cartAttributes: Record<string, string[]> = {};
      Object.entries(selectedAttributes).forEach(([key, value]) => {
        if (value) {
          cartAttributes[key] = [value];
        }
      });
      
      await addToShopCart(SHOP_ID, productData.product_id, quantity, cartAttributes);
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mediaToDisplay.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mediaToDisplay.length) % mediaToDisplay.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Get display price (use variant price if available, otherwise product price)
  const getDisplayPrice = () => {
    if (currentVariant) {
      return currentVariant.selling_price || currentVariant.price;
    }
    return productData?.selling_price || productData?.price || 450;
  };

  // Check if current selection is in stock
  const isInStock = () => {
    if (currentVariant) {
      return (currentVariant.stock?.stock_qty || 0) > 0;
    }
    return productData?.is_in_stock !== false;
  };

  // Get stock quantity for display
  const getStockQuantity = () => {
    if (currentVariant) {
      return currentVariant.stock?.stock_qty || 0;
    }
    return productData?.stock?.stock_qty || 0;
  };

  // Helper function to get color style for color attributes
  const getColorStyle = (attributeName: string, value: string) => {
    if (attributeName.toLowerCase() === 'color') {
      // Map common color names to CSS colors
      const colorMap: Record<string, string> = {
        'aliceblue': '#F0F8FF',
        'antiquewhite': '#FAEBD7',
        'aqua': '#00FFFF',
        'aquamarine': '#7FFFD4',
        'azure': '#F0FFFF',
        'beige': '#F5F5DC',
        'bisque': '#FFE4C4',
        'black': '#000000',
        'blanchedalmond': '#FFEBCD',
        'blue': '#0000FF',
        'blueviolet': '#8A2BE2',
        'brown': '#A52A2A',
        'burlywood': '#DEB887',
        'cadetblue': '#5F9EA0',
        'chartreuse': '#7FFF00',
        'chocolate': '#D2691E',
        'coral': '#FF7F50',
        'cornflowerblue': '#6495ED',
        'cornsilk': '#FFF8DC',
        'crimson': '#DC143C',
        'cyan': '#00FFFF',
        'darkblue': '#00008B',
        'darkcyan': '#008B8B',
        'darkgoldenrod': '#B8860B',
        'darkgray': '#A9A9A9',
        'darkgreen': '#006400',
        'darkgrey': '#A9A9A9',
        'darkkhaki': '#BDB76B',
        'darkmagenta': '#8B008B',
        'darkolivegreen': '#556B2F',
        'darkorange': '#FF8C00',
        'darkorchid': '#9932CC',
        'darkred': '#8B0000',
        'darksalmon': '#E9967A',
        'darkseagreen': '#8FBC8F',
        'darkslateblue': '#483D8B',
        'darkslategray': '#2F4F4F',
        'darkslategrey': '#2F4F4F',
        'darkturquoise': '#00CED1',
        'darkviolet': '#9400D3',
        'deeppink': '#FF1493',
        'deepskyblue': '#00BFFF',
        'dimgray': '#696969',
        'dimgrey': '#696969',
        'dodgerblue': '#1E90FF',
        'firebrick': '#B22222',
        'floralwhite': '#FFFAF0',
        'forestgreen': '#228B22',
        'fuchsia': '#FF00FF',
        'gainsboro': '#DCDCDC',
        'ghostwhite': '#F8F8FF',
        'gold': '#FFD700',
        'goldenrod': '#DAA520',
        'gray': '#808080',
        'green': '#008000',
        'greenyellow': '#ADFF2F',
        'grey': '#808080',
        'honeydew': '#F0FFF0',
        'hotpink': '#FF69B4',
        'indianred': '#CD5C5C',
        'indigo': '#4B0082',
        'ivory': '#FFFFF0',
        'khaki': '#F0E68C',
        'lavender': '#E6E6FA',
        'lavenderblush': '#FFF0F5',
        'lawngreen': '#7CFC00',
        'lemonchiffon': '#FFFACD',
        'lightblue': '#ADD8E6',
        'lightcoral': '#F08080',
        'lightcyan': '#E0FFFF',
        'lightgoldenrodyellow': '#FAFAD2',
        'lightgray': '#D3D3D3',
        'lightgreen': '#90EE90',
        'lightgrey': '#D3D3D3',
        'lightpink': '#FFB6C1',
        'lightsalmon': '#FFA07A',
        'lightseagreen': '#20B2AA',
        'lightskyblue': '#87CEFA',
        'lightslategray': '#778899',
        'lightslategrey': '#778899',
        'lightsteelblue': '#B0C4DE',
        'lightyellow': '#FFFFE0',
        'lime': '#00FF00',
        'limegreen': '#32CD32',
        'linen': '#FAF0E6',
        'magenta': '#FF00FF',
        'maroon': '#800000',
        'mediumaquamarine': '#66CDAA',
        'mediumblue': '#0000CD',
        'mediumorchid': '#BA55D3',
        'mediumpurple': '#9370DB',
        'mediumseagreen': '#3CB371',
        'mediumslateblue': '#7B68EE',
        'mediumspringgreen': '#00FA9A',
        'mediumturquoise': '#48D1CC',
        'mediumvioletred': '#C71585',
        'midnightblue': '#191970',
        'mintcream': '#F5FFFA',
        'mistyrose': '#FFE4E1',
        'moccasin': '#FFE4B5',
        'navajowhite': '#FFDEAD',
        'navy': '#000080',
        'oldlace': '#FDF5E6',
        'olive': '#808000',
        'olivedrab': '#6B8E23',
        'orange': '#FFA500',
        'orangered': '#FF4500',
        'orchid': '#DA70D6',
        'palegoldenrod': '#EEE8AA',
        'palegreen': '#98FB98',
        'paleturquoise': '#AFEEEE',
        'palevioletred': '#DB7093',
        'papayawhip': '#FFEFD5',
        'peachpuff': '#FFDAB9',
        'peru': '#CD853F',
        'pink': '#FFC0CB',
        'plum': '#DDA0DD',
        'powderblue': '#B0E0E6',
        'purple': '#800080',
        'rebeccapurple': '#663399',
        'red': '#FF0000',
        'rosybrown': '#BC8F8F',
        'royalblue': '#4169E1',
        'saddlebrown': '#8B4513',
        'salmon': '#FA8072',
        'sandybrown': '#F4A460',
        'seagreen': '#2E8B57',
        'seashell': '#FFF5EE',
        'sienna': '#A0522D',
        'silver': '#C0C0C0',
        'skyblue': '#87CEEB',
        'slateblue': '#6A5ACD',
        'slategray': '#708090',
        'slategrey': '#708090',
        'snow': '#FFFAFA',
        'springgreen': '#00FF7F',
        'steelblue': '#4682B4',
        'tan': '#D2B48C',
        'teal': '#008080',
        'thistle': '#D8BFD8',
        'tomato': '#FF6347',
        'turquoise': '#40E0D0',
        'violet': '#EE82EE',
        'wheat': '#F5DEB3',
        'white': '#FFFFFF',
        'whitesmoke': '#F5F5F5',
        'yellow': '#FFFF00',
        'yellowgreen': '#9ACD32'
      }

      return colorMap[value.toLowerCase()] || value;
    }
    return undefined;
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <nav className="text-gray-500 text-sm sm:text-base flex flex-wrap gap-1">
          <span>Shop1</span>
          <span>/</span>
          <span>{productData?.category_name || 'Category'}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{productData?.product_name || 'Product'}</span>
        </nav>
      </div>

      {/* Images */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
        {/* Left big image - Main carousel */}
        <div className="w-full lg:w-[607px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[607px] bg-gray-100 rounded-2xl lg:rounded-3xl overflow-hidden relative">
          {/* Main Image/Video Display */}
          {mediaToDisplay[currentImageIndex]?.type?.toLowerCase() === 'video' ? (
            <video
              src={mediaToDisplay[currentImageIndex].url}
              controls
              className="w-full h-full object-cover"
              poster={productData?.primary_image}
              style={{ backgroundColor: '#f3f4f6' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaToDisplay[currentImageIndex]?.url || productData?.primary_image || "/assets/images/Productcard/hero1.jpg"}
              alt={productData?.product_name || "Product image"}
              className="object-cover w-full h-full"
            />
          )}

          {/* Navigation arrows */}
          {mediaToDisplay.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-gray-800 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-gray-800 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Image indicators */}
          {mediaToDisplay.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
              {mediaToDisplay.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side thumbnails */}
        <div className="flex flex-col gap-3 w-full lg:w-[626px]">
          {/* Mobile: Single row of small images */}
          <div className="flex flex-row gap-2 lg:gap-4 overflow-x-auto ">
            {/* Display all available images as small thumbnails for mobile */}
                         {mediaToDisplay.length > 1 && mediaToDisplay.map((_, index) => {
              const displayIndex = (currentImageIndex + index + 1) % mediaToDisplay.length;
              return (
                <div 
                  key={displayIndex}
                  className="flex-shrink-0 w-[100px] h-[100px] xs:w-[150px] xs:h-[150px] sm:w-[235px] sm:h-[200px] lg:w-1/2 lg:h-[291px] bg-gray-100 rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => goToImage(displayIndex)}
                >
                  {mediaToDisplay[displayIndex]?.type?.toLowerCase() === 'video' ? (
                    <video
                      src={mediaToDisplay[displayIndex].url}
                      className="object-cover w-full h-full"
                      muted
                      poster={productData?.primary_image}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={mediaToDisplay[displayIndex]?.url || `/assets/images/Productcard/hero${(displayIndex % 4) + 1}.jpg`}
                      alt="Thumbnail"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Desktop: Show additional thumbnail if available (only on large screens) */}
          {mediaToDisplay.length > 3 && (
            <div className="hidden lg:block w-full h-[303px] bg-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => goToImage((currentImageIndex + 3) % mediaToDisplay.length)}
            >
              {mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length]?.type?.toLowerCase() === 'video' ? (
                <video
                  src={mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length].url}
                  className="object-cover w-full h-full"
                  muted
                  poster={productData?.primary_image}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length]?.url || "/assets/images/Productcard/hero4.jpg"}
                  alt="Thumbnail"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Title + Price (side-by-side) */}
      <div className="flex flex-col xl:flex-row justify-between items-start w-full gap-6 lg:gap-12 mt-6 lg:mt-10 mb-4 lg:mb-6">
        {/* LEFT: Product Info */}
        <div className="flex-1 min-w-0">
          {/* Product Name */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-playfair font-semibold text-black leading-tight">
            {productData?.product_name || 'NADETTA COAT'}
          </h2>

          {/* Short Description / Meta Description */}
          {(productData?.short_description || productData?.meta_description) && (
            <div className="mb-3 lg:mb-4">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {productData.short_description || productData.meta_description}
              </p>
            </div>
          )}

          {/* Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 lg:mb-6 gap-2 sm:gap-0">
            <div className="flex space-x-1 text-[#FFB800] text-lg">
              {[...Array(4)].map((_, i) => (
                <Star key={i} fill="#FFB800" stroke="#FFB800" size={18} className="sm:w-5 sm:h-5" />
              ))}
              <Star fill="none" stroke="#FFB800" size={18} className="sm:w-5 sm:h-5" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg sm:ml-2">(4.8 from 328 Reviews)</p>
          </div>

          {/* Dynamic Attribute Selection */}
          {(productData?.has_variants && availableAttributes.length > 0) || 
           (!productData?.has_variants && productData?.attributes && productData.attributes.length > 0) ? (
            <div className="flex flex-row flex-wrap gap-6 lg:gap-8 mb-6 lg:mb-10">
              {/* For products with variants, show availableAttributes */}
              {productData?.has_variants && availableAttributes.length > 0 && availableAttributes.map((attribute) => (
                <div key={attribute.name} className="min-w-0">
                  <p className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4 capitalize">
                    Select {attribute.name}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {attribute.values.map((value: string) => {
                      const isSelected = selectedAttributes[attribute.name] === value;
                      const colorStyle = getColorStyle(attribute.name, value);

                      // Render color swatches for color attributes
                      if (attribute.name.toLowerCase() === 'color' && colorStyle) {
                        return (
                          <button
                            key={value}
                            aria-label={value}
                            onClick={() => handleAttributeSelect(attribute.name, value)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 transition-all duration-150 focus:outline-none shadow-md flex items-center justify-center ${
                              isSelected
                                ? 'border-[#FEEBD8] scale-110'
                                : 'border-white opacity-80 hover:scale-105'
                              }`}
                            style={{ backgroundColor: colorStyle }}
                            disabled={false}
                          />
                        );
                      }

                      // Render buttons for size and other attributes
                      return (
                        <button
                          key={value}
                          onClick={() => handleAttributeSelect(attribute.name, value)}
                          className={`px-3 sm:px-4 py-2 min-w-[48px] sm:min-w-[64px] h-10 sm:h-12 rounded-full border text-sm sm:text-base lg:text-lg font-semibold transition-all duration-150 focus:outline-none
                            ${isSelected
                              ? 'bg-[#FEEBD8] border-[#FEEBD8] text-black shadow-md'
                              : 'bg-white border-black text-black hover:bg-gray-100'}
                          `}
                          disabled={false}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* For products without variants, show parent product attributes as display-only */}
              {!productData?.has_variants && productData?.attributes && productData.attributes.map((attr) => (
                attr.attribute?.name && attr.value && (
                  <div key={attr.attribute.name} className="min-w-0">
                    <p className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4 capitalize">
                      {attr.attribute.name}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {(() => {
                        const colorStyle = getColorStyle(attr.attribute.name, attr.value);

                        // Render color swatch for color attributes
                        if (attr.attribute.name.toLowerCase() === 'color' && colorStyle) {
                          return (
                            <div
                              key={attr.value}
                              aria-label={attr.value}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-[#FEEBD8] scale-110 transition-all duration-150 shadow-md flex items-center justify-center"
                              style={{ backgroundColor: colorStyle }}
                            />
                          );
                        }

                        // Render button for size and other attributes
                        return (
                          <div
                            key={attr.value}
                            className="px-3 sm:px-4 py-2 min-w-[48px] sm:min-w-[64px] h-10 sm:h-12 rounded-full border bg-[#FEEBD8] border-[#FEEBD8] text-black shadow-md text-sm sm:text-base lg:text-lg font-semibold flex items-center justify-center"
                          >
                            {attr.value}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            // Fallback to original hardcoded selection only if no attributes exist at all
            productData && (
              <div className="flex flex-row flex-wrap gap-6 lg:gap-16 mb-1 lg:mb-10">
                {/* Color */}
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4">Select color</p>
                  <div className="flex gap-3 sm:gap-6">
                    <button
                      aria-label="Yellow"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-[#FEEBD8] scale-110 transition-all duration-150 focus:outline-none shadow-md flex items-center justify-center"
                      style={{ backgroundColor: '#FDE047' }}
                    />
                    <button
                      aria-label="Pink"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white opacity-80 hover:scale-105 transition-all duration-150 focus:outline-none shadow-md flex items-center justify-center"
                      style={{ backgroundColor: '#EABABA' }}
                    />
                  </div>
                </div>

                {/* Size */}
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4">Select Size</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                      <button
                        key={size}
                        className={`w-12 sm:w-16 h-10 sm:h-12 rounded-full border text-sm sm:text-base lg:text-lg font-semibold transition-all duration-150 focus:outline-none
                          ${index === 3 // L is selected by default
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
            )
          )}

          {/* Stock Warning */}
          {stockError && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${stockError.includes('out of stock')
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
              }`}>
              {stockError}
            </div>
          )}
        </div>

        {/* RIGHT: Price, Quantity, Actions */}
        <div className="flex flex-col xl:items-end w-full mt-0 sm:mt-10 xl:w-auto xl:min-w-[380px]">
          <div className="flex flex-row  w-full justify-between items-start sm:items-end xl:items-start gap-4 sm:gap-6 xl:gap-4 mb-4 lg:mb-6">
            {/* Total Price */}
            <div className="flex-1 sm:flex-none">
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium mb-1">Total Price</p>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6A3A]">
                  ${getDisplayPrice()}
                </span>
                {/* Show original price only if there's a special price discount */}
                {(currentVariant?.special_price || productData?.special_price) && (
                  <span className="text-xl sm:text-2xl lg:text-3xl text-gray-500 line-through">
                    ${currentVariant?.selling_price || productData?.selling_price}
                  </span>
                )}
              </div>
              {/* Stock indicator */}
              {!isInStock() && (
                <p className="text-red-600 text-sm font-medium mt-2">Out of Stock</p>
              )}
              {isInStock() && getStockQuantity() <= 5 && getStockQuantity() > 0 && (
                <p className="text-yellow-600 text-sm font-medium mt-2">
                  Only {getStockQuantity()} left!
                </p>
              )}
            </div>
            {/* Quantity */}
            <div className="flex flex-col items-start sm:items-center xl:items-start">
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium mb-3 lg:mb-4">Quantity</p>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} className="sm:w-6 sm:h-6" />
                </button>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 sm:gap-4 lg:gap-6 w-full mt-4 lg:mt-6 sm:justify-center xl:justify-start">
            <button 
              onClick={handleAddToCart}
              disabled={!isInStock() || isAddingToCart}
              className={`flex-1 sm:flex-none px-6 sm:px-12 lg:px-20 py-3 rounded-full font-semibold text-base sm:text-lg lg:text-xl transition-all duration-150 shadow-md border-2 ${
                isInStock()
                  ? 'bg-[#FEEBD8] hover:bg-[#fdd7b9] border-[#FEEBD8] text-black'
                  : 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {!isInStock() ? 'OUT OF STOCK' : isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
            </button>
            <button 
              className={`flex-1 sm:flex-none px-6 sm:px-12 lg:px-20 py-3 rounded-full font-semibold text-base sm:text-lg lg:text-xl transition-all duration-150 shadow-md border-2 ${
                isInStock()
                  ? 'bg-black hover:bg-[#222] text-white border-black'
                  : 'bg-gray-400 border-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              disabled={!isInStock()}
            >
              {!isInStock() ? 'OUT OF STOCK' : 'BUY IT NOW'}
            </button>
          </div>
        </div>
      </div>
      {/* Product Details Section */}
<div className="w-full mt-12 lg:mt-20 flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
  {/* Left - Description List */}
  <div className="flex-1">
    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-playfair font-bold text-black mb-4 lg:mb-6">
      Product <span className="italic font-normal">Details</span>
    </h3>
    <div className="space-y-2">
      {productData?.full_description 
        ? parseMarkdown(productData.full_description)
        : (
          <ul className="space-y-3 lg:space-y-4">
            {[
              'Midnight womens fabric',
              'Regular Fit',
              'Peak lapels',
              'Dry clean',
            ].map((item, index) => (
              <li key={index} className="flex items-center text-base sm:text-lg">
                <span className="w-2 h-2 rounded-full bg-[#EABABA] mr-3 lg:mr-4 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  </div>

  {/* Right - Size Selector & Measurements */}
  <div className="flex-1">
    {/* Sizes */}
    <div className="flex flex-wrap gap-3 lg:gap-4 mb-6">
      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
        <div
          key={size}
          className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px] rounded-full flex items-center justify-center border-2 text-sm font-semibold 
            ${
              size === 'L'
                ? 'bg-black text-white border-black shadow'
                : 'border-gray-300 text-black'
            } relative`}
        >
          {size}
          <span
            className={`absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-4 sm:w-5 h-0.5 sm:h-1 rounded-full ${
              size === 'L' ? 'bg-transparent' : 'bg-[#FEEBD8]'
            }`}
          />
        </div>
      ))}
    </div>
    {/* Measurement Table */}
    <div className="grid grid-cols-1 sm:grid-cols-2 font-archivio gap-y-3 gap-x-4 mt-6 lg:mt-10 text-sm sm:text-base">
      <div className="flex justify-between sm:block">
        <span className="font-semibold text-black">Shoulder</span>
        <span className="text-gray-500 sm:hidden">50cm /19.75 in</span>
      </div>
      <div className="text-gray-500 hidden sm:block">50cm /19.75 in</div>

      <div className="flex justify-between sm:block">
        <span className="font-semibold text-black">Length</span>
        <span className="text-gray-500 sm:hidden">124 cm /47.75 in</span>
      </div>
      <div className="text-gray-500 hidden sm:block">124 cm /47.75 in</div>

      <div className="flex justify-between sm:block">
        <span className="font-semibold text-black">Bust</span>
        <span className="text-gray-500 sm:hidden">50cm /19.75 in</span>
      </div>
      <div className="text-gray-500 hidden sm:block">50cm /19.75 in</div>

      <div className="flex justify-between sm:block">
        <span className="font-semibold text-black">Sleeve length</span>
        <span className="text-gray-500 sm:hidden">50cm /19.75 in</span>
      </div>
      <div className="text-gray-500 hidden sm:block">50cm /19.75 in</div>
    </div>
  </div>
</div>

    </section>
  );
};

export default Hero;