import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import shop1ApiService, { Product, Category, Brand } from '../../../../services/shop1ApiService';
import Shop1ProductCard from '../Shop1ProductCard';

// Using real data from API instead of mock data
const ProductPage = () => {
  // URL search params
  const [searchParams] = useSearchParams();
  
  // API Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dynamic Price Range States
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // UI States (keeping original behavior)
  const [price, setPrice] = useState([0, 100000]);

  // Sidebar section toggles for mobile
  const [allFiltersOpen, setAllFiltersOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  // Calculate price range from products
  const calculatePriceRange = (productList: Product[]) => {
    if (productList.length === 0) {
      return { min: 0, max: 100000 };
    }

    const prices = productList.map(product => product.price).filter(price => price > 0);
    
    if (prices.length === 0) {
      return { min: 0, max: 100000 };
    }

    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    
    return { min, max };
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [categoriesData, brandsData] = await Promise.all([
          shop1ApiService.getCategories(),
          shop1ApiService.getBrands()
        ]);
        
        setCategories(categoriesData);
        setBrands(brandsData);

        // Check for category filter from URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(parseInt(categoryParam));
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams]);

  // Load products when filters change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await shop1ApiService.getProducts({
          page: currentPage,
          per_page: itemsPerPage,
          category_id: selectedCategory || undefined,
          brand_id: selectedBrand || undefined,
          min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
          max_price: priceRange[1] < 100000 ? priceRange[1] : undefined,
          sort_by: sortBy,
          order: sortOrder
        });

        if (response.success) {
          setProducts(response.products);
          setTotalProducts(response.pagination.total_items);
          setTotalPages(response.pagination.total_pages);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, itemsPerPage, selectedCategory, selectedBrand, priceRange, sortBy, sortOrder]);

  // Calculate dynamic price range when products change
  useEffect(() => {
    if (products.length > 0) {
      const { min, max } = calculatePriceRange(products);
      setMinPrice(min);
      setMaxPrice(max);
      
      // Only update price range on initial load (when priceRange is at default values)
      const isInitialLoad = priceRange[0] === 0 && priceRange[1] === 100000;
      
      if (isInitialLoad) {
        setPriceRange([min, max]);
        setPrice([min, max]);
      }
    }
  }, [products]);

  // Handle category selection
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle brand selection
  const handleBrandChange = (brandId: number | null) => {
    setSelectedBrand(brandId);
    setCurrentPage(1);
  };

  // Slider handlers for price range
  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), price[1] - 1);
    const newPrice = [value, price[1]];
    setPrice(newPrice);
    setPriceRange(newPrice); // Update filter state
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), price[0] + 1);
    const newPrice = [price[0], value];
    setPrice(newPrice);
    setPriceRange(newPrice); // Update filter state
  };

  // Input handlers for price inputs
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const value = Number(inputValue);
    
    if (value >= minPrice && value < price[1]) {
      const newPrice = [value, price[1]];
      setPrice(newPrice);
      setPriceRange(newPrice);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const value = Number(inputValue);
    
    if (value > price[0] && value <= maxPrice) {
      const newPrice = [price[0], value];
      setPrice(newPrice);
      setPriceRange(newPrice);
    }
  };

  const handleMinInputBlur = () => {
    // Ensure the value is within valid range
    const value = Math.max(minPrice, Math.min(price[0], price[1] - 1));
    const newPrice = [value, price[1]];
    setPrice(newPrice);
    setPriceRange(newPrice);
  };

  const handleMaxInputBlur = () => {
    // Ensure the value is within valid range
    const value = Math.min(maxPrice, Math.max(price[1], price[0] + 1));
    const newPrice = [price[0], value];
    setPrice(newPrice);
    setPriceRange(newPrice);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white mx-auto min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 py-6 md:py-20 max-w-full md:max-w-[1440px]">
      {/* Mobile Filter Menu Icon */}
      <div className="md:hidden flex justify-end mb-0">
        <button
          className="p-2 rounded border border-gray-300 bg-white shadow"
          onClick={() => setAllFiltersOpen((open) => !open)}
          aria-label="Toggle Filters"
        >
          {/* Hamburger menu icon */}
          {allFiltersOpen ? (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Sidebar */}
      <aside className="w-full md:w-64 pr-0 md:pr-8 mb-8 md:mb-0">
        {/* All filter sections: show on desktop, or on mobile if allFiltersOpen is true */}
        <div className={`${allFiltersOpen ? 'block' : 'hidden'} md:block`}>
          {/* Categories */}
          <div className="mb-8">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setCategoryOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Categories</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Categories">
                {categoryOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${categoryOpen ? 'block' : 'hidden'} md:block`}>
              {categories.map((cat) => (
                <div key={cat.category_id} className="flex items-center mb-4">
                  <input 
                    type="radio" 
                    name="category" 
                    className="mr-2"
                    checked={selectedCategory === cat.category_id}
                    onChange={() => handleCategoryChange(cat.category_id)}
                  />
                  <span className="text-[16px] md:text-[18px] font-archivo font-medium">{cat.name}</span>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <input 
                  type="radio" 
                  name="category" 
                  className="mr-2"
                  checked={selectedCategory === null}
                  onChange={() => handleCategoryChange(null)}
                />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">All Categories</span>
              </div>
            </div>
          </div>
          {/* Brand */}
          <div className="mb-8 mt-10 md:mt-16">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setBrandOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Brand</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Brand">
                {brandOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${brandOpen ? 'block' : 'hidden'} md:block`}>
              {brands.map((brand) => (
                <div key={brand.brand_id} className="flex items-center mb-4">
                  <input 
                    type="radio" 
                    name="brand"
                    className="mr-2"
                    checked={selectedBrand === brand.brand_id}
                    onChange={() => handleBrandChange(brand.brand_id)}
                  />
                  <span className="text-[16px] md:text-[18px] font-archivo font-medium">{brand.name}</span>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <input 
                  type="radio" 
                  name="brand"
                  className="mr-2"
                  checked={selectedBrand === null}
                  onChange={() => handleBrandChange(null)}
                />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">All Brands</span>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="mb-8">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setPriceOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Price</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Price">
                {priceOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${priceOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">$</span>
                  <input
                    type="text"
                    value={price[0]}
                    onChange={handleMinInput}
                    onBlur={handleMinInputBlur}
                    className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal font-poppins bg-white shadow-sm focus:border-blue-500 focus:outline-none pl-4"
                    placeholder="Min"
                  />
                </div>
                <div className="flex-1 h-px bg-gray-300 mx-2 md:mx-4"></div>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">$</span>
                  <input
                    type="text"
                    value={price[1]}
                    onChange={handleMaxInput}
                    onBlur={handleMaxInputBlur}
                    className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal bg-white shadow-sm focus:border-blue-500 focus:outline-none pl-4"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              {/* Price Range Slider */}
              <div className="relative mb-4" style={{ height: 20 }}>
                {/* Track */}
                <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-gray-200 rounded-full"></div>
                
                {/* Active range track */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${((price[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    right: `${100 - ((price[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
                  }}
                ></div>
                
                {/* Min slider - covers left half */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={price[0]}
                  onChange={handleMinSlider}
                  className="absolute opacity-0 cursor-pointer"
                  style={{ 
                    zIndex: 3,
                    left: 0,
                    width: '50%',
                    height: '100%'
                  }}
                />
                
                {/* Max slider - covers right half */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={price[1]}
                  onChange={handleMaxSlider}
                  className="absolute opacity-0 cursor-pointer"
                  style={{ 
                    zIndex: 2,
                    left: '50%',
                    width: '50%',
                    height: '100%'
                  }}
                />
                
                {/* Slider thumbs */}
                <div 
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${((price[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    top: '50%'
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${((price[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    top: '50%'
                  }}
                ></div>
              </div>
              <button className="px-3 bg-black text-white py-1.5 rounded text-[14px] md:text-[16px] font-bold tracking-wide w-full md:w-auto">FILTER</button>
            </div>
          </div>
          {/* Colors */}
          <div className="mb-12">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setColorsOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Colors</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Colors">
                {colorsOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${colorsOpen ? 'block' : 'hidden'} md:block`}>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-black inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Black</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-fuchsia-500 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Violet</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-blue-600 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Blue</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Yellow</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-600 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Red</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-lime-400 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Green</span>
                </div>
              </div>
            </div>
          </div>
          {/* Size */}
          <div className="mb-12">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setSizeOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Size</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Size">
                {sizeOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${sizeOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex gap-2 md:gap-3">
                {['S', 'M', 'L', 'XS'].map((size) => (
                  <button
                    key={size}
                    className="w-[40px] md:w-[51px] h-[33px] border-2 border-[#C4C4C4] rounded-xl text-[16px] md:text-[18px] font-bold text-black bg-white hover:bg-black hover:text-white transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 ml-0 md:ml-7 gap-4 md:gap-0">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              className="border rounded px-2 py-1 text-[16px] md:text-[18px] font-poppins w-full md:w-auto"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="created_at-desc">Default Sorting</option>
              <option value="selling_price-asc">Price: Low to High</option>
              <option value="selling_price-desc">Price: High to Low</option>
              <option value="product_name-asc">Name: A to Z</option>
              <option value="product_name-desc">Name: Z to A</option>
            </select>
            <select
              className="border rounded px-2 py-1 text-[16px] md:text-[18px] font-poppins w-full md:w-auto"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={9}> Shop: 09</option>
              <option value={18}>Shop: 18</option>
              <option value={36}>Shop: 36</option>
            </select>
          </div>
          <div className="text-[16px] md:text-[18px] font-poppins md:mr-10 text-black w-full md:w-auto">
            Show {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalProducts)} Of {totalProducts} Product{totalProducts !== 1 ? 's' : ''}
          </div>
        </div>
        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-40">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 xm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0">
            {products.map((product, idx) => (
              <Shop1ProductCard
                key={product.product_id || idx}
                id={product.product_id}
                image={product.primary_image || ''}
                category={product.category_name || ''}
                name={product.product_name}
                price={product.price}
              />
            ))}
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 pb-14 md:pb-0">
            <nav className="inline-flex items-center space-x-4">
              {/* Previous Button */}
              <button
                className={`w-12 h-12 rounded-xl ${currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                } text-xl font-bold flex items-center justify-center`}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="text-2xl">&lt;</span>
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`w-12 h-12 rounded-xl ${currentPage === pageNum
                      ? 'bg-[#E7AB3C] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    } text-xl font-bold flex items-center justify-center shadow`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Next Button */}
              <button
                className={`w-12 h-12 rounded-xl ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                } text-xl font-bold flex items-center justify-center`}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="text-2xl">&gt;</span>
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
