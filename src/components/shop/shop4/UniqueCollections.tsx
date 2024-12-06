import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shop4ApiService, { Category } from '../../../services/shop4ApiService';

// Fallback images for categories - mapping by category name
const categoryImageMap: Record<string, string> = {
  'SHANKH COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463010/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%282%29.png",
  'DOOP COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463012/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%283%29.png",
  'ALL COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png",
  'PUJA DIYA COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463016/public_assets_shop4/public_assets_shop4_Property%201%3DDefault.png",
  'HAVAN COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463015/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%284%29.png",
  // Keep old mappings for backward compatibility
  'SHANKH': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463010/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%282%29.png",
  'DOOP': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463012/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%283%29.png",
  'ALL': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png",
  'PUJA DIYA': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463016/public_assets_shop4/public_assets_shop4_Property%201%3DDefault.png",
  'HAVAN': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463015/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%284%29.png",
  'DEFAULT': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png"
};

function UniqueCollections() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        console.log('Fetching categories for Shop4...');
        const response = await shop4ApiService.getCategories({ per_page: 10, active_only: true });
        console.log('Full API response:', response);
        
        if (response && response.success) {
          console.log('Categories received:', response.categories);
          console.log('Number of categories:', response.categories.length);
          
          // Filter out categories with invalid names
          const validCategories = response.categories.filter(cat => {
            const isValid = cat && cat.category_name;
            if (!isValid) {
              console.warn('Invalid category found:', cat);
            }
            return isValid;
          });
          
          console.log('Valid categories after filtering:', validCategories);
          setCategories(validCategories);
        } else {
          console.error('API response unsuccessful or empty:', response);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/shop4-allproductpage?category_id=${categoryId}`);
  };

  const getCategoryImage = (categoryName: string, categoryImage?: string): string => {
    // Use category image from backend if available
    if (categoryImage) {
      return categoryImage.startsWith('http') ? categoryImage : shop4ApiService.getImageUrl(categoryImage);
    }
    
    // Fallback to predefined images based on category name
    if (!categoryName) {
      return categoryImageMap['DEFAULT'];
    }
    
    const upperCaseName = categoryName.toUpperCase();
    
    // Try exact match first
    if (categoryImageMap[upperCaseName]) {
      return categoryImageMap[upperCaseName];
    }
    
    // Try partial matches for backward compatibility
    for (const [key, value] of Object.entries(categoryImageMap)) {
      if (upperCaseName.includes(key) || key.includes(upperCaseName)) {
        return value;
      }
    }
    
    return categoryImageMap['DEFAULT'];
  };

  // Take first 5 categories for display, with special handling for middle item
  const displayCategories = categories.slice(0, 5);
  return (
    <div className="h-[720px] bg-black text-white">
      {/* Main Content */}
      <div className="container max-w-[1634px] mx-auto px-4 py-16  md:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-[14px] font-light font-['Futura_PT'] tracking-[0.2em] text-white mb-8">
            UNIQUE COLLECTIONS
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-[50px] font-poppins font-light tracking-wide mb-8">
            Luxury Brands New Arrival
          </h1>
        </div>

        {/* Collections Section */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-white text-xl">Loading collections...</div>
          </div>
        ) : displayCategories.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-white text-xl">No collections available</div>
          </div>
        ) : (
          <div className="relative max-w-full mx-auto">
            {/* Horizontal connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-200 transform -translate-y-1/2 z-0"></div>
            
            {/* Left endpoint circle */}
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-amber-200 rounded-full transform -translate-x-1 -translate-y-1/2 z-0"></div>
            
            {/* Right endpoint circle */}
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-amber-200 rounded-full transform translate-x-1 -translate-y-1/2 z-0"></div>
            
            {/* Collections Container */}
            <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-2 relative z-10 items-center pt-10">
              {displayCategories.map((category, index) => (
                <div key={category.category_id} className="flex flex-col items-center group cursor-pointer" onClick={() => handleCategoryClick(category.category_id)}>
                  {/* Image Container */}
                  <div className="relative mb-1">
                    {/* Main image circle */}
                    <div className={`relative rounded-full overflow-hidden border border-gray-600 transition-all duration-300 ease-in-out group-hover:border-transparent ${
                      index === 2 ? 'w-[200px] h-[200px]' : 'w-[156px] h-[156px]'
                    }`}>
                      <img
                        src={getCategoryImage(category.category_name, category.category_image)}
                        alt={category.category_name || 'Category'}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 "
                      />
                      {/* White ring overlay on hover */}
                      <div className="absolute inset-0 rounded-full border-8 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="text-center mt-1">
                    <h3 className={`uppercase mt-2 tracking-[0.2em] transition-colors duration-300 ease-in-out ${
                      index === 2 
                        ? 'font-futura text-white text-[20px] font-[450] leading-normal' 
                        : 'font-poppins text-gray-500 text-[20px] font-normal leading-normal'
                    } `}>
                      {category.category_name || 'Unknown Category'}
                    </h3>
                    <p className={`uppercase tracking-[0.2em] ${
                      index === 2 
                        ? 'font-futura text-white text-[20px] font-[450] leading-normal' 
                        : 'font-poppins text-gray-500 text-[20px] font-normal leading-normal'
                    }`}>
                     
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UniqueCollections;