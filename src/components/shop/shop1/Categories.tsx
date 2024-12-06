import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shop1ApiService, { Category } from '../../../services/shop1ApiService';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Predefined colors and images for categories (to maintain UI consistency)
  const categoryStyles = [
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745105/public_assets_shop1_LP/public_assets_images_Category1.1.svg',
      bgColor: '#5E919C',
      shadowColor: '#4D767F',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745108/public_assets_shop1_LP/public_assets_images_Category2.1.svg',
      bgColor: '#F0BBCD',
      shadowColor: '#A76D6A',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745110/public_assets_shop1_LP/public_assets_images_Category3.1.svg',
      bgColor: '#F5DB50',
      shadowColor: '#8C8353',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745113/public_assets_shop1_LP/public_assets_images_Category4.1.svg',
      bgColor: '#AB927B',
      shadowColor: '#706B50',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745115/public_assets_shop1_LP/public_assets_images_Category5.1.svg',
      bgColor: '#FFB998',
      shadowColor: '#716D57',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745118/public_assets_shop1_LP/public_assets_images_Category6.1.svg',
      bgColor: '#A3C6A4',
      shadowColor: '#4D4A3B',
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await shop1ApiService.getCategories();
        setCategories(fetchedCategories.slice(0, 6)); // Show only first 6 categories to match UI
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback to empty array if API fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    // Navigate to all products page with category filter
    navigate(`/shop1-allproductpage?category=${category.category_id}`);
  };

  // If loading, show skeleton or existing mock data temporarily
  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-4 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
                <div className="w-32 h-32 sm:w-[140px] sm:h-[140px] md:w-[151px] md:h-[151px] bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Map categories with predefined styles
  const categoriesWithStyles = categories.map((category, index) => ({
    ...category,
    ...categoryStyles[index % categoryStyles.length], // Cycle through styles
  }));

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {categoriesWithStyles.map((category, index) => (
            <div
              key={category.category_id || index}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {/* Label */}
              <h3 className="text-sm text-[#000000] mb-4 tracking-wide text-center font-platypi">
                {category.name}
              </h3>

              {/* Responsive circle wrapper */}
              <div className="relative w-32 h-32 md:top-6 sm:w-[140px] sm:h-[140px] md:w-[151px] md:h-[151px]">
                {/* Shadow */}
                <div
                  className="absolute left-1 top-0.5 w-full h-full rounded-full z-0"
                  style={{ backgroundColor: category.shadowColor }}
                />

                {/* Main Circle */}
                <div
                  className="w-full h-full rounded-full transition-transform left-3 duration-500 group-hover:scale-110 overflow-hidden relative flex items-center justify-center z-10"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-[90%] h-[90%] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
