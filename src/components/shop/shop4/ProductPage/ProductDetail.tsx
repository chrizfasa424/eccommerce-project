import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, ChevronDown, ChevronUp, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Shop4ProductCard from '../Shop4ProductCard';
import shop4ApiService, { 
  Product as ApiProduct, 
  ProductVariant, 
  VariantAttribute
} from '../../../../services/shop4ApiService';

// --- StarRating ---
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', showNumber = false }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center gap-1">
       {showNumber && (
        <span className="text-white text-sm sm:text-lg font-semibold ml-2">{rating}</span>
      )}
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-[#CCE208] fill-yellow-400' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

// --- Product Interface for Shop4ProductCard ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  background?: string;
  discount?: number;
  selected?: boolean;
}

// --- ReviewCard ---
interface Review {
  id: number;
  userName: string;
  userInfo: string;
  rating: number;
  comment: string;
  helpful: number;
  notHelpful: number;
  timeAgo: string;
  initials: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [voted, setVoted] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleVote = (type: 'helpful' | 'not-helpful') => {
    if (voted) return; // Prevent multiple votes
    
    if (type === 'helpful') {
      setHelpfulCount(prev => prev + 1);
    } else {
      setNotHelpfulCount(prev => prev + 1);
    }
    setVoted(type);
  };

  return (
    <div className="border-b border-gray-700 pb-6 mb-6 last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column - Profile Information */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-[87px] sm:h-[87px] bg-[#323232] rounded-full flex items-center justify-center text-[#FFF] text-base sm:text-[20px] font-normal font-futura flex-shrink-0" >
              MS
            </div>
            
            {/* Reviewer Info */}
            <div className="flex flex-col">
              <h4 className="text-white font-medium text-sm sm:text-base">
                <span className="text-[#FFF] text-base sm:text-[18px] font-[450] leading-normal font-futura ">Sabina F.</span> <span className="text-[#FFF] text-sm sm:text-[16px] font-normal leading-normal font-futura">Verified Buyer</span>
              </h4>
              <p className="text-[#FFF] text-sm sm:text-[16px] font-[450] leading-normal font-futura">Germany</p>
              <div className="flex mt-1">
                <div className="w-[79.806px] h-[11.897px] flex-shrink-0">
                  <StarRating rating={5} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Review Content and Interactivity */}
        <div className="lg:col-span-8 relative">
          {/* Vertical Separator Line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-[-50px] top-0 bottom-0 w-px bg-gray-400"></div>
          
          <div className="lg:pl-4 mt-2">
            {/* Review Headline */}
            <p className="text-[#FFF] text-sm sm:text-[14px] font-normal leading-normal font-poppins mb-4">{review.comment}</p>
            
            {/* Helpfulness Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-[#FFF] text-sm sm:text-[16px] font-[450] leading-normal font-futura">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote('helpful')}
                  disabled={voted !== null}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                    voted === 'helpful' 
                      ? 'text-[#B19D7F] bg-[#B19D7F]/10' 
                      : voted
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-[#B19D7F] hover:bg-[#B19D7F]/10'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="text-white">{helpfulCount}</span>
                </button>
                
                <button
                  onClick={() => handleVote('not-helpful')}
                  disabled={voted !== null}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                    voted === 'not-helpful' 
                      ? 'text-gray-400 bg-gray-400/10' 
                      : voted
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-gray-400 hover:bg-gray-400/10'
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                  <span className="text-white">{notHelpfulCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timestamp */}
        <div className="lg:col-span-1">
          <span className="text-white text-xs sm:text-sm">{review.timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

// --- ReviewsSection ---
const reviewsData: Review[] = [
    {
      id: 1,
      userName: 'Sabina F.',
      userInfo: 'Verified Buyer • Germany',
      rating: 5,
      comment: 'Awesome Product. The Products is Excellent',
      helpful: 1,
      notHelpful: 0,
      timeAgo: '8 months ago',
      initials: 'SF'
    }
  ];

const ReviewsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newReview, setNewReview] = useState({
      rating: 5,
      comment: ''
    });
    const averageRating = 4.9;
    const totalReviews = reviewsData.length;

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission logic here
        console.log('Submitting review:', newReview);
        setShowWriteReview(false);
        setNewReview({ rating: 5, comment: '' });
    };

    return (
        <div className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[1640px] mx-auto">
                <div className="border-b border-gray-700 mb-8">
                    <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-0">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 sm:py-4 px-4 sm:px-6 border-b-[3px] sm:border-b-[5px] font-medium text-sm sm:text-base transition-colors duration-200 ${activeTab === 'reviews' ? 'border-white text-white ' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            <span className="text-white font-futura text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Reviews</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`py-2 sm:py-4 px-4 sm:px-6 border-b-[3px] sm:border-b-[5px] font-medium text-sm sm:text-base transition-colors duration-200 ${activeTab === 'questions' ? 'border-white text-white ' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            <span className="text-white font-futura text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Questions (1)</span>
                        </button>
                    </nav>
                </div>

                <div className="min-h-[500px]">
                    {activeTab === 'reviews' && (
                        <div>
                            <div className="text-center mb-8 sm:mb-12 py-6 sm:py-10">
                                <div className="flex items-center justify-center mb-2 relative">
                                    <span className="text-white font-normal leading-[52px] text-xl sm:text-[30px] capitalize mr-4 font-futura " >{averageRating}</span>
                                    
                                    <StarRating rating={averageRating} size="lg" />
                                </div>
                                <p className="text-white font-normal leading-[30px] text-sm sm:text-[16px] capitalize mb-4 sm:mb-6 font-futura">
                                    Based On {totalReviews} Review{totalReviews !== 1 ? 's' : ''}, Rating Is Calculated
                                </p>
                                <button 
                                    onClick={() => setShowWriteReview(!showWriteReview)}
                                    className="bg-[#B19D7F] hover:bg-[#A08F75] text-white leading-normal uppercase font-futura flex-shrink-0 w-full sm:w-[205px] h-[40px] sm:h-[50.15px] text-xs sm:text-[14px] font-[450] tracking-[2.1px]">
                                    WRITE A REVIEW
                                </button>
                            </div>
                            
                            {showWriteReview && (
                                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
                                <h3 className="text-white text-base sm:text-lg font-medium mb-4">Write Your Review</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                            className="p-1"
                                        >
                                            <StarRating rating={star <= newReview.rating ? 5 : 0} size="lg" />
                                        </button>
                                        ))}
                                    </div>
                                    </div>
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Your Review</label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                        className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-amber-500 focus:outline-none resize-vertical min-h-[120px]"
                                        placeholder="Share your thoughts about this product..."
                                        required
                                    />
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        className="bg-amber-700 hover:bg-amber-600 text-white px-4 sm:px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowWriteReview(false)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 sm:px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                </form>
                                </div>
                            )}

                            <div className="space-y-6">
                                {reviewsData.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'questions' && (
                        <div className="text-center py-8 sm:py-16">
                            <h3 className="text-white text-lg sm:text-xl mb-4">Questions & Answers</h3>
                            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                                No questions have been asked about this product yet.
                            </p>
                            <button className="bg-[#C4A57B] hover:bg-[#B8965F] text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-medium tracking-wide transition-colors duration-200 uppercase text-xs sm:text-sm">
                                Ask a Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main ProductDetail Component ---
const ProductDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState(['about']);
  
  // Variant handling state
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [availableAttributes, setAvailableAttributes] = useState<VariantAttribute[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);
  const [stockError, setStockError] = useState<string>('');

  const productId = searchParams.get('id');

  // Helper function to get color style similar to Shop1/Shop3
  const getColorStyle = (attributeName: string, value: string): string => {
    const colorMap: Record<string, string> = {
      'red': '#FF0000',
      'blue': '#0000FF', 
      'green': '#008000',
      'black': '#000000',
      'white': '#FFFFFF',
      'yellow': '#FFFF00',
      'purple': '#800080',
      'orange': '#FFA500',
      'pink': '#FFC0CB',
      'brown': '#A52A2A',
      'gray': '#808080',
      'grey': '#808080',
      'gold': '#FFD700',
      'silver': '#C0C0C0',
      'maroon': '#800000',
      'navy': '#000080',
      'olive': '#808000',
      'lime': '#00FF00',
      'aqua': '#00FFFF',
      'teal': '#008080',
      'fuchsia': '#FF00FF'
    };

    if (attributeName.toLowerCase().includes('color') || attributeName.toLowerCase().includes('colour')) {
      const color = value.toLowerCase().replace(/[^a-z]/g, '');
      return colorMap[color] || '#808080';
    }
    
    return '';
  };

  // Helper function to extract available attributes from product data (similar to Shop1/Shop3)
  const extractAvailableAttributes = (product: ApiProduct): VariantAttribute[] => {
    const attributeMap = new Map<string, VariantAttribute>();
    
    // Get parent product attributes first
    const parentAttrs = product.attributes || [];
    const variantAttrs = product.variant_attributes || [];
    
    // Build parent defaults map
    const parentDefaults: Record<string, string> = {};
    parentAttrs.forEach(attr => {
      const attrName = attr.attribute?.name;
      const attrValue = attr.value;
      if (attrName && attrValue) {
        parentDefaults[attrName] = attrValue;
      }
    });

    if (product.has_variants) {
      // For variant products: Add variant attributes with their available options
      variantAttrs.forEach(attr => {
        if (attr.name && attr.values && Array.isArray(attr.values)) {
          const allValues = new Set<string>();

          // Add parent value if it exists for this attribute
          if (parentDefaults[attr.name]) {
            allValues.add(parentDefaults[attr.name]);
          }

          // Add all variant values
          attr.values.forEach(value => allValues.add(value));

          attributeMap.set(attr.name, {
            name: attr.name,
            values: Array.from(allValues).sort()
          });
        }
      });

      // Only add parent attributes if they have multiple options through variants
      // This prevents showing single-value attributes that can't be changed
      parentAttrs.forEach(attr => {
        const attrName = attr.attribute?.name;
        const attrValue = attr.value;

        if (attrName && attrValue && !attributeMap.has(attrName)) {
          // Only add if there are variant options for this attribute
          const hasVariantOptions = variantAttrs.some(vAttr => 
            vAttr.name === attrName && vAttr.values && vAttr.values.length > 1
          );
          
          if (hasVariantOptions) {
            attributeMap.set(attrName, {
              name: attrName,
              values: [attrValue]
            });
          }
        }
      });
    } else {
      // For non-variant products: Show parent product attributes (read-only)
      console.log('Product does not have variants, showing parent product attributes');
      parentAttrs.forEach(attr => {
        const attrName = attr.attribute?.name;
        const attrValue = attr.value;

        if (attrName && attrValue) {
          attributeMap.set(attrName, {
            name: attrName,
            values: [attrValue] // Single value, non-selectable
          });
        }
      });
    }

    return Array.from(attributeMap.values());
  };

  // Handle attribute selection
  const handleAttributeSelect = (attributeName: string, value: string) => {
    console.log(`Selecting attribute: ${attributeName} = ${value}`);
    setSelectedAttributes(prev => {
      const newAttrs = {
        ...prev,
        [attributeName]: value
      };
      console.log('New selected attributes:', newAttrs);
      return newAttrs;
    });
  };

  // Find matching variant based on selected attributes
  useEffect(() => {
    if (variants.length === 0 || Object.keys(selectedAttributes).length === 0) {
      setCurrentVariant(null);
      setStockError('');
      return;
    }

    console.log('Finding variant with selected attributes:', selectedAttributes);
    console.log('Available variants:', variants);

    const findMatchingVariant = () => {
      // First check if selected attributes match parent product (like Shop1/Shop3)
      if (product) {
        const parentAttrs = product.attributes || [];
        const parentDefaults: Record<string, string> = {};
        parentAttrs.forEach(attr => {
          const attrName = attr.attribute?.name;
          const attrValue = attr.value;
          if (attrName && attrValue) {
            parentDefaults[attrName] = attrValue;
          }
        });

        // Check if selected attributes match parent product attributes
        const matchesParent = Object.entries(selectedAttributes).every(([attrName, attrValue]) => {
          return parentDefaults[attrName] === attrValue;
        });

        if (matchesParent && Object.keys(parentDefaults).length === Object.keys(selectedAttributes).length) {
          console.log('Selected attributes match parent product - showing parent');
          setCurrentVariant(null);
          setStockError('');
          return;
        }
      }

      // Try to find variant by matching attribute combination
      const matchingVariant = variants.find(variant => {
        console.log('Checking variant:', variant.variant_id, 'with attributes:', variant.attribute_combination);
        
        if (!variant.attribute_combination) {
          console.log('Variant has no attribute_combination');
          return false;
        }
        
        // Check if all selected attributes match the variant's attribute combination
        const matches = Object.entries(selectedAttributes).every(([attrName, attrValue]) => {
          const variantValue = variant.attribute_combination[attrName];
          const isMatch = variantValue === attrValue;
          console.log(`Attribute ${attrName}: selected="${attrValue}", variant="${variantValue}", match=${isMatch}`);
          return isMatch;
        });
        
        console.log(`Variant ${variant.variant_id} matches: ${matches}`);
        return matches;
      });

      if (matchingVariant) {
        console.log('Found matching variant:', matchingVariant);
        setCurrentVariant(matchingVariant);
        
        // Check stock status
        if (!matchingVariant.is_in_stock || matchingVariant.stock_qty <= 0) {
          setStockError('This variant is out of stock');
        } else if (matchingVariant.stock_qty <= 5) {
          setStockError(`Only ${matchingVariant.stock_qty} left in stock!`);
        } else {
          setStockError('');
        }
      } else {
        console.log('No matching variant found');
        setCurrentVariant(null);
        setStockError('This combination is not available. Please choose a different combination.');
      }
    };

    findMatchingVariant();
  }, [selectedAttributes, variants, product]);

  // Simple markdown parser for basic formatting with Shop4 styling
  const parseMarkdown = (text: string): JSX.Element[] => {
    if (!text) return [];

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers (bold text with **)
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const content = trimmed.slice(2, -2);
        elements.push(
          <h4 key={index} className="text-lg font-bold text-white mb-2">
            {content}
          </h4>
        );
      }
      // Headers (bold text within line like **Material**: content)
      else if (trimmed.includes('**') && trimmed.split('**').length >= 3) {
        const parts = trimmed.split('**');
        const beforeBold = parts[0];
        const boldText = parts[1];
        const afterBold = parts.slice(2).join('**');
        
        elements.push(
          <p key={index} className="text-gray-300 mb-2">
            {beforeBold}
            <span className="font-bold text-white">{boldText}</span>
            {afterBold}
          </p>
        );
      }
      // Italic text
      else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
        const content = trimmed.slice(1, -1);
        elements.push(
          <p key={index} className="text-gray-300 italic mb-2">
            {content}
          </p>
        );
      }
      // Numbered lists (standard format like "1. content")
      else if (/^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s*/, '');
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#BB9D7B] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="text-gray-300">{content}</span>
          </div>
        );
      }
      // Numbered items (alternative format like just "1" on separate line)
      else if (/^\d+$/.test(trimmed)) {
        // Skip standalone numbers, they'll be handled with the next line
        return;
      }
      // Content that follows a standalone number
      else if (index > 0 && /^\d+$/.test(lines[index - 1]?.trim())) {
        const number = lines[index - 1].trim();
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#BB9D7B] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {number}
            </span>
            <span className="text-gray-300">{trimmed}</span>
          </div>
        );
      }
      // Bullet points
      else if (trimmed.startsWith('- ')) {
        const content = trimmed.slice(2);
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BB9D7B] mr-4 mt-2"></span>
            <span className="text-gray-300">{content}</span>
          </div>
        );
      }
      // Regular text (but skip if it's immediately after a standalone number)
      else if (trimmed && !(index > 0 && /^\d+$/.test(lines[index - 1]?.trim()))) {
        elements.push(
          <p key={index} className="text-gray-300 mb-2">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      try {
        const productIdNum = parseInt(productId);
        const response = await shop4ApiService.getProductById(productIdNum);
        
        if (response && response.success) {
          setProduct(response.product);
          
          // Check if product has variants and use the data from product response
          if (response.product.has_variants) {
            console.log('Product has variants, using data from product response...');
            
            // Extract variants from product response (similar to Shop1/Shop3)
            if (response.product.variants && Array.isArray(response.product.variants)) {
              // Map product variants to the format expected by ProductVariant interface
              const mappedVariants: ProductVariant[] = response.product.variants.map(variant => ({
                variant_id: variant.product_id,
                variant_sku: variant.sku || '',
                variant_name: variant.product_name,
                attribute_combination: {}, // Will be populated from variants API if needed
                effective_price: variant.price || variant.selling_price,
                stock_qty: variant.stock?.stock_qty || 0,
                is_in_stock: (variant.stock?.stock_qty || 0) > 0,
                media: variant.media || { images: [], videos: [], primary_image: '', total_media: 0 },
                primary_image: variant.primary_image || ''
              }));
              setVariants(mappedVariants);
            }
            
            // Extract available attributes from product response (same as Shop1/Shop3)
            const availableAttrs = extractAvailableAttributes(response.product);
            console.log('Extracted available attributes:', availableAttrs);
            setAvailableAttributes(availableAttrs);
            
            // Initialize default selected attributes from parent product (same as Shop1/Shop3)
            const defaultSelected: Record<string, string> = {};
            
            // Get parent product attributes first
            const parentAttrs = response.product.attributes || [];
            const parentDefaults: Record<string, string> = {};
            parentAttrs.forEach(attr => {
              const attrName = attr.attribute?.name;
              const attrValue = attr.value;
              if (attrName && attrValue) {
                parentDefaults[attrName] = attrValue;
              }
            });
            
            // Set default attributes based on parent product (like Shop1/Shop3 do with defaultValue)
            availableAttrs.forEach(attr => {
              if (parentDefaults[attr.name]) {
                // Use parent product value as default
                defaultSelected[attr.name] = parentDefaults[attr.name];
              } else if (attr.values.length > 0) {
                // Fallback to first available value
                defaultSelected[attr.name] = attr.values[0];
              }
            });
            
            console.log('Default selected attributes (from parent product):', defaultSelected);
            setSelectedAttributes(defaultSelected);
            
            // Initially, current variant is null (showing parent product)
            setCurrentVariant(null);
            setStockError('');
            
            // Also fetch detailed variant data for attribute combinations
            if (availableAttrs.length > 0) {
              try {
                const variantsResponse = await shop4ApiService.getProductVariants(productIdNum);
                if (variantsResponse.success && variantsResponse.variants.length > 0) {
                  setVariants(variantsResponse.variants);
                  console.log('Updated variants with detailed data:', variantsResponse.variants);
                }
              } catch (variantError) {
                console.error('Error fetching detailed variant data:', variantError);
                // Continue with existing variant data from product response
              }
            }
          } else {
            console.log('Product does not have variants');
            // For non-variant products, still extract and show parent product attributes
            const availableAttrs = extractAvailableAttributes(response.product);
            console.log('Extracted available attributes for non-variant product:', availableAttrs);
            setAvailableAttributes(availableAttrs);
            
            // Initialize default selected attributes from parent product (same as Shop1/Shop3)
            const defaultSelected: Record<string, string> = {};
            
            // Get parent product attributes first
            const parentAttrs = response.product.attributes || [];
            const parentDefaults: Record<string, string> = {};
            parentAttrs.forEach(attr => {
              const attrName = attr.attribute?.name;
              const attrValue = attr.value;
              if (attrName && attrValue) {
                parentDefaults[attrName] = attrValue;
              }
            });
            
            // Set default attributes based on parent product (like Shop1/Shop3 do with defaultValue)
            availableAttrs.forEach(attr => {
              if (parentDefaults[attr.name]) {
                // Use parent product value as default
                defaultSelected[attr.name] = parentDefaults[attr.name];
              } else if (attr.values.length > 0) {
                // Fallback to first available value
                defaultSelected[attr.name] = attr.values[0];
              }
            });
            
            console.log('Default selected attributes for non-variant product:', defaultSelected);
            setSelectedAttributes(defaultSelected);
            
            // Clear variant-related state for non-variant products
            setVariants([]);
            setCurrentVariant(null);
            setStockError('');
          }
          
          // Fetch related products if available
          if (response.related_products) {
            const mappedRelated = response.related_products.map(p => ({
              id: p.product_id,
              name: p.product_name,
              price: p.special_price || p.price,
              image: p.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png",
              discount: p.special_price ? Math.round(((p.price - p.special_price) / p.price) * 100) : 0
            }));
            setRelatedProducts(mappedRelated);
          }
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setRelatedProducts([]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full mx-auto bg-black text-white flex items-center justify-center">
        <div className="text-white text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full mx-auto bg-black text-white flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mx-auto bg-black text-white">
      <div className="border-b border-gray-800 max-w-[1640px] mx-auto px-4 py-3 md:px-6 md:py-4">
        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm md:text-base">
         
          <span className="text-white font-poppins text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Back to: Diya Collection</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col mx-auto max-w-[1640px] gap-8 sm:gap-12 lg:gap-20 lg:flex-row">
        {/* Left Side - Image Gallery */}
        <div className="w-full lg:w-1/2 bg-black">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Main Product Images */}
            <div className="flex flex-col space-y-8 sm:space-y-12 lg:space-y-20 justify-center items-center">
              <img
                src={
                  currentVariant?.media?.images?.[0]?.url || 
                  currentVariant?.primary_image ||
                  product.media?.images?.[0]?.url || 
                  product.primary_image || 
                  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462984/public_assets_shop4/public_assets_shop4_13.png"
                }
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
              <img
                src={
                  currentVariant?.media?.images?.[1]?.url || 
                  product.media?.images?.[1]?.url || 
                  currentVariant?.primary_image ||
                  product.primary_image || 
                  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462986/public_assets_shop4/public_assets_shop4_14.png"
                }
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
              <img
                src={
                  currentVariant?.media?.images?.[2]?.url || 
                  product.media?.images?.[2]?.url || 
                  currentVariant?.primary_image ||
                  product.primary_image || 
                  "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462987/public_assets_shop4/public_assets_shop4_15.png"
                }
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          {/* Product Category */}
          <div className="text-white text-sm sm:text-base font-normal leading-normal font-['Poppins']">
            {product.category_name || 'Product Category'}
          </div>

          {/* Product Title */}
          <h1 className="text-white text-lg sm:text-xl md:text-[26px] font-normal leading-3 font-poppins">
            {product.product_name}
          </h1>

          {/* Pricing */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {(() => {
              if (currentVariant) {
                // Use variant pricing
                const variantPrice = currentVariant.effective_price;
                return (
                  <>
                    <span className="text-xs sm:text-sm md:text-base text-white">Price</span>
                    <span className="text-base sm:text-lg md:text-xl font-medium text-[#00FF2F]">${variantPrice}</span>
                  </>
                );
              } else {
                // Use product pricing
                const hasSpecialPrice = product.special_price && product.special_price < product.price;
                return hasSpecialPrice ? (
                  <>
                    <span className="text-gray-400 line-through text-xs sm:text-sm md:text-base">Actual Price ${product.price}</span>
                    <span className="text-xs sm:text-sm md:text-base text-white">Our price</span>
                    <span className="text-base sm:text-lg md:text-xl font-medium text-[#00FF2F]">${product.special_price}</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm md:text-base text-white">Price</span>
                    <span className="text-base sm:text-lg md:text-xl font-medium text-[#00FF2F]">${product.price}</span>
                  </>
                );
              }
            })()}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-xs sm:text-sm md:text-base">
              ★★★★★
            </div>
            <span className="text-gray-400 text-xs md:text-sm">( 1 Customer review )</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Dynamic Attribute Selection - Show attributes from backend */}
          {availableAttributes.length > 0 && (
            <div className="space-y-4 md:space-y-6">
              {availableAttributes.map((attribute) => (
                <div key={attribute.name} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                    <span className="text-xs sm:text-sm md:text-base text-white capitalize">
                      {attribute.name} :
                    </span>
                    
                    {/* Color attributes - show color swatches */}
                    {(attribute.name.toLowerCase().includes('color') || attribute.name.toLowerCase().includes('colour')) && (
                      <div className="flex gap-2">
                        {attribute.values.map((value) => {
                          const isSelected = selectedAttributes[attribute.name] === value;
                          const colorStyle = getColorStyle(attribute.name, value);
                          const isClickable = attribute.values.length > 1; // Only clickable if multiple values
                          
                          return (
                            <button
                              key={value}
                              onClick={isClickable ? () => handleAttributeSelect(attribute.name, value) : undefined}
                              disabled={!isClickable}
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 ${
                                isSelected
                                  ? 'border-[#BB9D7B] scale-110'
                                  : isClickable 
                                  ? 'border-gray-600 hover:border-gray-400 cursor-pointer'
                                  : 'border-[#BB9D7B] cursor-default'
                              } ${!isClickable ? 'opacity-90' : ''}`}
                              style={{ 
                                backgroundColor: colorStyle || '#808080',
                                border: colorStyle === '#FFFFFF' ? '2px solid #333' : undefined
                              }}
                              title={value}
                            />
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Size and other attributes - show buttons */}
                    {!(attribute.name.toLowerCase().includes('color') || attribute.name.toLowerCase().includes('colour')) && (
                      <div className="flex gap-2">
                        {attribute.values.map((value) => {
                          const isSelected = selectedAttributes[attribute.name] === value;
                          const isClickable = attribute.values.length > 1; // Only clickable if multiple values
                          
                          return (
                            <button
                              key={value}
                              onClick={isClickable ? () => handleAttributeSelect(attribute.name, value) : undefined}
                              disabled={!isClickable}
                              className={`px-3 py-2 md:px-4 md:py-2 rounded text-xs md:text-sm font-medium transition-all ${
                                isSelected
                                  ? 'border-2 border-[#BB9D7B] bg-[#BB9D7B] text-white'
                                  : isClickable
                                  ? 'border-2 border-gray-600 bg-[#515151] text-white hover:border-gray-400 cursor-pointer'
                                  : 'border-2 border-[#BB9D7B] bg-[#BB9D7B] text-white cursor-default opacity-90'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Size guide link for size attributes */}
                  {attribute.name.toLowerCase().includes('size') && (
                    <button className="text-white text-xs md:text-sm underline hover:text-gray-300 transition-colors">
                      Size Chart
                    </button>
                  )}
                </div>
              ))}
              
              {/* Stock Error Message */}
              {stockError && (
                <div className={`p-3 rounded text-sm font-medium ${
                  stockError.includes('out of stock') || stockError.includes('Out of Stock')
                    ? 'bg-red-900/20 text-red-400 border border-red-800'
                    : stockError.includes('left in stock')
                    ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-800'
                    : 'bg-orange-900/20 text-orange-400 border border-orange-800'
                }`}>
                  {stockError}
                </div>
              )}
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center border border-gray-600 rounded bg-[#2B2B2B] overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white border-r border-gray-600"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
              <span className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white bg-[#2B2B2B] border-r border-gray-600 min-w-[2.5rem] md:min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
            </div>
            
            <button className="bg-[#BB9D7B] hover:bg-[#a8896a] text-white p-2 md:p-3 rounded-full transition-colors">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <button className="p-2 md:p-3 border border-gray-600 bg-[#515151] hover:bg-gray-700 rounded transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="text-xs md:text-sm text-gray-300 space-y-1">
            <p>Worldwide Shipping in all order $200, Delivery in 2-5 working days</p>
            <button className="text-white hover:text-gray-300 transition-colors underline">
              Shipping & Return
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* About Product Section */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-white">About Product</h3>
              {expandedSections.includes('about') ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              )}
            </button>
            
            {expandedSections.includes('about') && (
              <div className="text-gray-300 text-xs md:text-sm">
                {product.full_description || product.product_description || product.short_description ? (
                  <div className="leading-relaxed">
                    {parseMarkdown(product.full_description || product.product_description || product.short_description)}
                  </div>
                ) : (
                  <p className="leading-relaxed text-gray-400">No product information available.</p>
                )}
              </div>
            )}
          </div>

          {/* Final Divider */}
          <div className="border-t border-gray-700"></div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Rated Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-amber-700/20 text-amber-300 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
            Top • Rated
          </span>
        </div>

        {/* Related Products Section */}
        <div className="mb-16">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-light text-center mb-8 sm:mb-12">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {relatedProducts.slice(0, 3).map((relatedProduct) => (
              <div 
                key={relatedProduct.id} 
                className="w-full h-auto cursor-pointer transition-transform hover:scale-105" 
                onClick={() => {
                  // Navigate to the related product's detail page
                  navigate(`?id=${relatedProduct.id}`);
                }}
              >
                <Shop4ProductCard 
                  product={{
                    id: relatedProduct.id,
                    name: relatedProduct.name,  // Use 'name' not 'title' for Shop4ProductCard
                    price: typeof relatedProduct.price === 'string' ? parseFloat(relatedProduct.price) : relatedProduct.price,
                    discount: relatedProduct.discount,  // Keep as number for Shop4ProductCard
                    image: relatedProduct.image
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection/>
    </div>
  );
};

export default ProductDetail;


