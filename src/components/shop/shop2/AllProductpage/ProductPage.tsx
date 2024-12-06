import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Shop2ProductCard from '../Shop2ProductCard';
import shop2ApiService, { Product, Category, Brand } from '../../../../services/shop2ApiService';

const collections = [
  { name: "Graphic Hoodies", disabled: false },
  { name: "TrackSuits", disabled: false },
  { name: "Denim Jackets", disabled: false },
  { name: "Sunglasses", disabled: true },
  { name: "Printed Co-Ord Sets", disabled: true },
  { name: "Denim Jackets", disabled: false },
];

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // API Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Price filter state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const minLimit = 0;
  const maxLimit = 1000000;
  const priceGap = 0;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);

  // Sort dropdown state
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Sort By List");
  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
    "Oldest First",
    "Name: A-Z",
    "Name: Z-A"
  ];

  // Filter states
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'price' | 'categories' | 'brands'>('price');

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleBrandToggle = (brandId: number) => {
    setSelectedBrandIds(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Navigation handler
  const handleProductClick = (productId: number) => {
    navigate(`/shop2/product/${productId}`);
  };

  // Mobile sidebar handlers
  const openMobileSidebar = () => {
    console.log('Opening mobile sidebar');
    setIsMobileSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileSidebar = () => {
    console.log('Closing mobile sidebar');
    setIsMobileSidebarOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleMobileFilterApply = () => {
    closeMobileSidebar();
    setCurrentPage(1);
  };

  // Debug mobile sidebar state
  useEffect(() => {
    console.log('Mobile sidebar state changed:', isMobileSidebarOpen);
  }, [isMobileSidebarOpen]);

  // Update URL with current filter state
  const updateURL = useCallback(() => {
    console.log('updateURL called with:', {
      searchTerm,
      selectedCategoryIds,
      selectedBrandIds,
      minPrice,
      maxPrice,
      sortOption
    });

    const params = new URLSearchParams();
    
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedCategoryIds.length > 0) params.set('category', selectedCategoryIds.join(','));
    if (selectedBrandIds.length > 0) params.set('brand', selectedBrandIds.join(','));
    if (minPrice > 0) params.set('min_price', minPrice.toString());
    if (maxPrice < 1000000) params.set('max_price', maxPrice.toString());
    if (sortOption !== "Sort By List") params.set('sort', sortOption);
    
    const newURL = params.toString() ? `/shop2-allproductpage?${params.toString()}` : '/shop2-allproductpage';
    console.log('Navigating to:', newURL);
    navigate(newURL, { replace: true });
  }, [searchTerm, selectedCategoryIds, selectedBrandIds, minPrice, maxPrice, sortOption, navigate]);

  // Load initial data and parse URL parameters
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setInitialLoadComplete(false); // Reset flag when location changes
        const [categoriesData, brandsData] = await Promise.all([
          shop2ApiService.getCategories(),
          shop2ApiService.getBrands()
        ]);
        
        setCategories(categoriesData);
        setBrands(brandsData);

        // Parse URL search parameters
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        const categoryParam = searchParams.get('category');
        const brandParam = searchParams.get('brand');
        const minPriceParam = searchParams.get('min_price');
        const maxPriceParam = searchParams.get('max_price');
        const sortParam = searchParams.get('sort');

        // Set initial search term if provided
        if (searchQuery) {
          setSearchTerm(searchQuery);
        }

        // Set initial category filter if provided
        if (categoryParam) {
          const categoryIds = categoryParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
          if (categoryIds.length > 0) {
            setSelectedCategoryIds(categoryIds);
          }
        }

        // Set initial brand filter if provided
        if (brandParam) {
          const brandIds = brandParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
          if (brandIds.length > 0) {
            setSelectedBrandIds(brandIds);
          }
        }

        // Set initial price filters if provided
        if (minPriceParam) {
          const minPriceValue = parseInt(minPriceParam);
          if (!isNaN(minPriceValue)) {
            setMinPrice(minPriceValue);
          }
        }

        if (maxPriceParam) {
          const maxPriceValue = parseInt(maxPriceParam);
          if (!isNaN(maxPriceValue)) {
            setMaxPrice(maxPriceValue);
          }
        }

        // Set initial sort option if provided
        if (sortParam) {
          setSortOption(sortParam);
        }

        // Mark initial load as complete
        setInitialLoadComplete(true);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setError('Failed to load initial data');
        setInitialLoadComplete(true); // Still mark as complete even on error
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [location.search]);

  // Track if initial load is complete
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Update URL when filters change (but not on initial load)
  useEffect(() => {
    console.log('URL update useEffect triggered, initialLoadComplete:', initialLoadComplete);
    // Only update URL after initial load is complete
    if (initialLoadComplete) {
      console.log('Calling updateURL because initialLoadComplete is true');
      updateURL();
    }
  }, [searchTerm, selectedCategoryIds, selectedBrandIds, minPrice, maxPrice, sortOption, updateURL, initialLoadComplete]);

  // Load products when filters change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map sort options to API parameters
        const sortMapping = {
          "Price: Low to High": { sort_by: "selling_price", order: "asc" },
          "Price: High to Low": { sort_by: "selling_price", order: "desc" },
          "Newest First": { sort_by: "created_at", order: "desc" },
          "Oldest First": { sort_by: "created_at", order: "asc" },
          "Name: A-Z": { sort_by: "product_name", order: "asc" },
          "Name: Z-A": { sort_by: "product_name", order: "desc" }
        };

        const selectedSort = sortMapping[sortOption as keyof typeof sortMapping] || { sort_by: "created_at", order: "desc" };

        const response = await shop2ApiService.getProducts({
          page: currentPage,
          per_page: perPage,
          min_price: minPrice > 0 ? minPrice : undefined,
          max_price: maxPrice < 1000000 ? maxPrice : undefined,
          category_id: selectedCategoryIds.length === 1 ? selectedCategoryIds[0] : undefined,
          brand_id: selectedBrandIds.length === 1 ? selectedBrandIds[0] : undefined,
          search: searchTerm.trim() || undefined,
          sort_by: selectedSort.sort_by,
          order: selectedSort.order
        });

        if (response.success) {
          setProducts(response.products);
          setTotalProducts(response.pagination.total_items);
          setTotalPages(response.pagination.total_pages);
        } else {
          setError('Failed to fetch products');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, sortOption, minPrice, maxPrice, selectedCategoryIds, selectedBrandIds, searchTerm]);

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setSortOpen(false);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Handle price filter
  const handlePriceFilter = () => {
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Clear all filters
  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000000);
    setSelectedCategoryIds([]);
    setSelectedBrandIds([]);
    setSearchTerm('');
    setCurrentPage(1);
    setSortOption("Sort By List");
    
    // Clear URL parameters
    navigate('/shop2-allproductpage', { replace: true });
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B19D7F]"></div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error Loading Products</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#B19D7F] text-white rounded hover:bg-[#A08C6F]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <hr className="w-[1280px] border-t border-black mb-6 mx-auto" />
      <div className="min-h-screen w-full mx-auto flex flex-col lg:flex-row justify-center py-8 px-2 sm:px-4 md:px-2 2xl:px-20">
       
        {/* Container */}
        <div className="flex flex-col lg:flex-row w-full 2xl:gap-12 px-0 md:px-4 2xl:px-10">
        
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-full lg:w-[340px] 2xl:w-[455px] h-auto lg:h-[1746px] bg-[#DFD1C6] rounded-xl shadow p-4 md:p-6 mb-6 lg:mb-0 lg:mr-8 flex-shrink-0">
            <div className="flex items-center px-2 justify-between mb-6 pt-2">
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] font-bebas tracking-widest text-gray-700">{totalProducts} RESULTS</span>
                {(selectedCategoryIds.length > 0 || selectedBrandIds.length > 0 || searchTerm.trim() || minPrice > 0 || maxPrice < 1000000) && (
                  <span className="text-xs text-gray-500 mt-1">
                    Filters applied: {
                      [
                        selectedCategoryIds.length > 0 && `${selectedCategoryIds.length} categories`,
                        selectedBrandIds.length > 0 && `${selectedBrandIds.length} brands`,
                        searchTerm.trim() && 'search',
                        (minPrice > 0 || maxPrice < 1000000) && 'price'
                      ].filter(Boolean).join(', ')
                    }
                  </span>
                )}
              </div>
              <button 
                onClick={clearFilters}
                className="bg-black text-white font-bebas text-[20px] lg:text-[14px] px-6 2xl:px-6 lg:px-4 py-3 rounded-full font-semibold tracking-[0.2em]" 
                style={{letterSpacing:'0.2em'}}
              >
                CLEAR FILTERS
              </button>
            </div>
            {/* Price Filter */}
            <hr className="border-t mb-8" style={{ background: '#888181', height: '1px', border: 'none' }} />
            <div className="mb-8">
              <div className="font-bold text-[25px] font-bebas mb-6 tracking-tight">FILTER BY PRICE</div>
              <div className="relative w-[85%] mx-auto flex items-center justify-center h-10 mb-2">
                {/* Permanent white track behind everything */}
                <div
                  className="absolute left-0 right-0 rounded-full"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '2px', // adjust thickness as needed
                    background: '#fff',
                    zIndex: 0,
                  }}
                />
                {/* Track (existing, can be removed if redundant) */}
                <div className="absolute  left-0 right-0 h-0 bg-[#bfa16a] rounded-full" style={{top: '50%', transform: 'translateY(-50%)'}}></div>
                {/* Selected Range */}
                <div
                  className="absolute h-1 bg-[#B19D7F] rounded-full"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    right: `${100 - ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    zIndex: 1,
                  }}
                ></div>
                {/* Min Handle */}
                <input
                  type="range"
                  min={minLimit}
                  max={maxPrice - priceGap}
                  value={minPrice}
                  onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - priceGap))}
                  className="absolute w-full accent-[#bfa16a] pointer-events-auto z-10"
                  style={{ WebkitAppearance: 'none', background: 'transparent', height: '40px' }}
                />
                {/* Max Handle */}
                <input
                  type="range"
                  min={minPrice + priceGap}
                  max={maxLimit}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + priceGap))}
                  className="absolute w-full accent-[#bfa16a] pointer-events-auto z-10"
                  style={{ WebkitAppearance: 'none', background: 'transparent', height: '40px' }}
                />
                {/* Custom handles */}
                <div
                  className="absolute"
                  style={{
                    left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                    pointerEvents: 'none',
                  }}
                >
                  <div className="w-10 h-10 bg-[#bfa16a] rounded-full border-4 border-white shadow" />
                </div>
                <div
                  className="absolute"
                  style={{
                    left: `${((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                    pointerEvents: 'none',
                  }}
                >
                  <div className="w-10 h-10 bg-[#bfa16a] rounded-full border-4 border-white shadow" />
                </div>
              </div>
              <div className="flex justify-start text-xl font-bold text-black mt-4 mb-8">
                <span>Price: ₹{minPrice.toLocaleString()} — ₹{maxPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={handlePriceFilter}
                className="bg-black text-white text-[14px] font-poppins px-4 py-2 rounded-full font-semibold w-1/2 tracking-[0.2em]" 
                style={{letterSpacing:'0.2em'}}
              >
                FILTER
              </button>
            </div>
            {/* Search */}
            

            {/* Categories */}
            <div className="mb-8">
              <div className="font-bold text-[25px] font-bebas mb-6 tracking-tight">CATEGORIES</div>
              <div className="flex flex-col gap-2 text-[16px] max-h-48 overflow-y-auto">
                {categories.map((category) => {
                  const id = `category-${category.category_id}`;
                  return (
                    <label
                      key={category.category_id}
                      htmlFor={id}
                      className="flex gap-4 font-normal whitespace-nowrap cursor-pointer select-none items-center"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedCategoryIds.includes(category.category_id)}
                        onChange={() => handleCategoryToggle(category.category_id)}
                        className="sr-only"
                      />
                      <span className="inline-block self-center align-middle" style={{ marginRight: "6px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <g clipPath="url(#clip0_1492_716)">
                            <path d="M18.4885 1.11108H1.51104C1.29001 1.11108 1.11084 1.29026 1.11084 1.51128V18.4888C1.11084 18.7098 1.29001 18.889 1.51104 18.889H18.4885C18.7095 18.889 18.8887 18.7098 18.8887 18.4888V1.51128C18.8887 1.29026 18.7095 1.11108 18.4885 1.11108Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            {selectedCategoryIds.includes(category.category_id) && (
                              <path d="M5 10.5L9 14L15 7" stroke="#1A8917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </g>
                          <defs>
                            <clipPath id="clip0_1492_716">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span className="truncate">
                        {category.name} 
                        {category.product_count !== undefined && (
                          <span className="text-gray-500 text-sm ml-1">({category.product_count})</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <div className="font-bold text-[25px] font-bebas mb-6 tracking-tight">BRANDS</div>
              <div className="flex flex-col gap-2 text-[16px] max-h-48 overflow-y-auto">
                {brands.map((brand) => {
                  const id = `brand-${brand.brand_id}`;
                  return (
                    <label
                      key={brand.brand_id}
                      htmlFor={id}
                      className="flex gap-4 font-normal whitespace-nowrap cursor-pointer select-none items-center"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedBrandIds.includes(brand.brand_id)}
                        onChange={() => handleBrandToggle(brand.brand_id)}
                        className="sr-only"
                      />
                      <span className="inline-block self-center align-middle" style={{ marginRight: "6px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <g clipPath="url(#clip0_1492_716)">
                            <path d="M18.4885 1.11108H1.51104C1.29001 1.11108 1.11084 1.29026 1.11084 1.51128V18.4888C1.11084 18.7098 1.29001 18.889 1.51104 18.889H18.4885C18.7095 18.889 18.8887 18.7098 18.8887 18.4888V1.51128C18.8887 1.29026 18.7095 1.11108 18.4885 1.11108Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            {selectedBrandIds.includes(brand.brand_id) && (
                              <path d="M5 10.5L9 14L15 7" stroke="#1A8917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </g>
                          <defs>
                            <clipPath id="clip0_1492_716">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span className="truncate">
                        {brand.name}
                        {brand.product_count !== undefined && (
                          <span className="text-gray-500 text-sm ml-1">({brand.product_count})</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            {/* Shop For */}
            <div className="mb-8">
              <div className="font-bold text-[25px] font-bebas mb-6 tracking-tight">SHOP FOR</div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white border-none rounded-full px-2.5 py-4 text-[14px] font-poppins font-medium tracking-[0.15em] text-black shadow-sm">TOPWEAR</span>
                <span className="bg-white border-none rounded-full px-2.5 py-4 text-[14px] font-poppins font-medium tracking-[0.15em] text-black shadow-sm">BOTTOMWEAR</span>
                <span className="bg-white border-none rounded-full px-2.5 py-4 text-[14px] font-poppins font-medium tracking-[0.15em] text-black shadow-sm">WINTERWEAR</span>
                <span className="bg-white border-none rounded-full px-2.5 py-4 text-[14px] font-poppins font-medium tracking-[0.15em] text-black shadow-sm">TRADITIONAL</span>
              </div>
            </div>
            {/* Collections */}
            <div className="mb-8">
              <div className="font-extrabold text-[25px] mb-6 uppercase font-bebas">COLLECTIONS</div>
              <ul className="text-xl">
                {collections.map((col, i) => (
                  <React.Fragment key={i}>
                    <li className="flex items-center py-3">
                      <span className="mr-4 text-2xl" style={{fontWeight: 'bold'}}>&bull;</span>
                      <span>{col.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/\s+/g, ' ').trim()}</span>
                    </li>
                    {i !== collections.length - 1 && (
                      <hr className="border-t" style={{ background: '#D9D9D9', height: '1px', border: 'none' }} />
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            {/* Conditions */}
            <div className="mb-2">
              <div className="font-extrabold text-[25px] mb-6 uppercase font-bebas">CONDITIONS</div>
              <span className="bg-white border-none rounded-full px-10 py-4 text-xl font-medium  text-black shadow" style={{letterSpacing:'0.1em', fontFamily: 'inherit'}}>NEW</span>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-auto">
            {/* Mobile Search Bar */}
            <div className="lg:hidden mb-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B19D7F] focus:border-transparent shadow-sm"
                />
                
              </div>
            </div>

            {/* Mobile Filter and Sort Buttons */}
            <div className="lg:hidden mb-4 px-4">
              <div className="flex gap-3 h-[50px] ">
                {/* Filter Button */}
                <button
                  onClick={openMobileSidebar}
                  className="flex-1 bg-[#DFD1C6] text-black font-bebas text-lg px-4 py-2 rounded-xl shadow flex items-center justify-center hover:bg-[#C8B8AD] transition-colors"
                >
                  <span className="tracking-widest">FILTERS</span>
                  {(selectedCategoryIds.length > 0 || selectedBrandIds.length > 0 || searchTerm.trim() || minPrice > 0 || maxPrice < 1000000) && (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full ml-2">
                      {[
                        selectedCategoryIds.length,
                        selectedBrandIds.length,
                        searchTerm.trim() ? 1 : 0,
                        (minPrice > 0 || maxPrice < 1000000) ? 1 : 0
                      ].reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </button>

                {/* Sort Button */}
                <div className="flex-1 relative">
                  <button
                    className="w-full bg-black text-white font-bebas text-lg px-4 py-2 rounded-xl shadow flex items-center justify-center hover:bg-gray-800 transition-colors"
                    onClick={() => setSortOpen((prev) => !prev)}
                  >
                    <span className="tracking-widest mr-2">{sortOption.toUpperCase()}</span>
                    <svg className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {/* Mobile Sort Dropdown */}
                  {sortOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-black rounded-xl shadow-lg z-50 border border-gray-800">
                      {sortOptions.map((option) => (
                        <div
                          key={option}
                          className={`px-4 py-3 text-white text-sm font-semibold cursor-pointer hover:bg-gray-900 rounded-xl transition-all ${sortOption === option ? 'bg-gray-900' : ''}`}
                          onClick={() => handleSortChange(option)}
                          style={{ letterSpacing: '0.15em', fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          {option.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block mb-6 px-8">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B19D7F] focus:border-transparent shadow-sm"
                />
                
              </div>
            </div>

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 sm:px-8 md:px-12 lg:px-8 mb-8 md:mb-16 gap-4 md:gap-0">
              <span className="font-normal text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bebas tracking-widest">
                SHOWING {((currentPage - 1) * perPage) + 1}-{Math.min(currentPage * perPage, totalProducts)} OF {totalProducts} RESULTS
              </span>
              {/* Desktop Sort Button - Hidden on Mobile */}
              <div className="hidden lg:block relative w-full md:w-auto">
                <button
                  className="flex items-center bg-black text-white text-base sm:text-lg md:text-xl px-4 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-semibold tracking-[0.2em] focus:outline-none select-none min-w-0 md:min-w-[350px] justify-between w-full md:w-auto"
                  style={{ letterSpacing: '0.2em', fontFamily: 'Bebas Neue, sans-serif', fontWeight: 600 }}
                  onClick={() => setSortOpen((prev) => !prev)}
                >
                  <span className="mr-4 sm:mr-8 md:mr-10 mt-1 tracking-[0.2em] text-lg sm:text-xl md:text-[16px]">{sortOption.toUpperCase()}</span>
                  <svg className={`ml-2 sm:ml-4 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 md:right-10 mt-2 w-full bg-black rounded-xl shadow-lg z-50 border border-gray-800">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-white text-base sm:text-lg font-semibold cursor-pointer hover:bg-gray-900 rounded-xl transition-all ${sortOption === option ? 'bg-gray-900' : ''}`}
                        onClick={() => handleSortChange(option)}
                        style={{ letterSpacing: '0.15em', fontFamily: 'Bebas Neue, sans-serif' }}
                      >
                        {option.toUpperCase()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 md:gap-x-4 2xl:gap-x-8 gap-y-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <Shop2ProductCard
                    key={product.product_id}
                    image={product.primary_image || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"}
                    name={product.product_name}
                    price={product.selling_price}
                    discount={product.special_price ? Math.round(((product.selling_price - product.special_price) / product.selling_price) * 100) : undefined}
                    shopProductId={product.product_id}
                    onClick={() => handleProductClick(product.product_id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400 text-sm mt-2">Products count: {products.length}</p>
                  <p className="text-gray-400 text-sm">Total products: {totalProducts}</p>
                </div>
              )}
            </div>
            {/* Pagination - centered below grid */}
            {totalPages > 1 && (
              <div className="py-16 mb-32 flex justify-center">
                <nav className="flex items-center space-x-3">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentPage === i + 1 ? 'bg-[#B19D7F] text-white shadow' : 'border border-gray-300 text-black bg-white'}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button className="ml-2" onClick={() => setCurrentPage(currentPage + 1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="30" viewBox="0 0 14 30" fill="none">
                        <path d="M1.00037 1.0001L12.5228 13.6215C13.0549 14.2043 13.0549 15.1495 12.5228 15.7322L1.00037 28.3501" stroke="black" strokeWidth="2"/>
                      </svg>
                    </button>
                  )}
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[9999] lg:hidden transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-y-0' : 'translate-y-full'
      }`} style={{ maxHeight: '85vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bebas font-bold tracking-widest">FILTERS</h2>
          <button
            onClick={closeMobileSidebar}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { key: 'price', label: 'PRICE' },
            { key: 'categories', label: 'CATEGORIES' },
            { key: 'brands', label: 'BRANDS' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilterTab(tab.key as any)}
              className={`flex-1 py-4 text-center font-bebas font-semibold tracking-widest transition-colors ${
                activeFilterTab === tab.key 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Price Filter */}
          {activeFilterTab === 'price' && (
            <div className="space-y-6">
              <div className="font-bold text-xl font-bebas tracking-tight">FILTER BY PRICE</div>
              <div className="relative w-full flex items-center justify-center h-10 mb-4">
                <div className="absolute left-0 right-0 rounded-full h-1 bg-gray-200" style={{top: '50%', transform: 'translateY(-50%)'}}></div>
                <div
                  className="absolute h-1 bg-[#B19D7F] rounded-full"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    right: `${100 - ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min={minLimit}
                  max={maxPrice - priceGap}
                  value={minPrice}
                  onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - priceGap))}
                  className="absolute w-full accent-[#B19D7F] pointer-events-auto z-10"
                  style={{ WebkitAppearance: 'none', background: 'transparent', height: '40px' }}
                />
                <input
                  type="range"
                  min={minPrice + priceGap}
                  max={maxLimit}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + priceGap))}
                  className="absolute w-full accent-[#B19D7F] pointer-events-auto z-10"
                  style={{ WebkitAppearance: 'none', background: 'transparent', height: '40px' }}
                />
                <div
                  className="absolute w-6 h-6 bg-[#B19D7F] rounded-full border-2 border-white shadow"
                  style={{
                    left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                />
                <div
                  className="absolute w-6 h-6 bg-[#B19D7F] rounded-full border-2 border-white shadow"
                  style={{
                    left: `${((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                />
              </div>
              <div className="text-center text-lg font-bold text-black">
                Price: ₹{minPrice.toLocaleString()} — ₹{maxPrice.toLocaleString()}
              </div>
            </div>
          )}

          {/* Categories Filter */}
          {activeFilterTab === 'categories' && (
            <div className="space-y-4">
              <div className="font-bold text-xl font-bebas tracking-tight mb-4">CATEGORIES</div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {categories.map((category) => {
                  const id = `mobile-category-${category.category_id}`;
                  return (
                    <label
                      key={category.category_id}
                      htmlFor={id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedCategoryIds.includes(category.category_id)}
                        onChange={() => handleCategoryToggle(category.category_id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        selectedCategoryIds.includes(category.category_id) 
                          ? 'bg-black border-black' 
                          : 'border-gray-300'
                      }`}>
                        {selectedCategoryIds.includes(category.category_id) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        )}
                      </div>
                      <span className="flex-1">
                        {category.name}
                        {category.product_count !== undefined && (
                          <span className="text-gray-500 text-sm ml-2">({category.product_count})</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Brands Filter */}
          {activeFilterTab === 'brands' && (
            <div className="space-y-4">
              <div className="font-bold text-xl font-bebas tracking-tight mb-4">BRANDS</div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {brands.map((brand) => {
                  const id = `mobile-brand-${brand.brand_id}`;
                  return (
                    <label
                      key={brand.brand_id}
                      htmlFor={id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedBrandIds.includes(brand.brand_id)}
                        onChange={() => handleBrandToggle(brand.brand_id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        selectedBrandIds.includes(brand.brand_id) 
                          ? 'bg-black border-black' 
                          : 'border-gray-300'
                      }`}>
                        {selectedBrandIds.includes(brand.brand_id) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        )}
                      </div>
                      <span className="flex-1">
                        {brand.name}
                        {brand.product_count !== undefined && (
                          <span className="text-gray-500 text-sm ml-2">({brand.product_count})</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}


        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button
              onClick={clearFilters}
              className="flex-1 py-3 px-6 border border-gray-300 text-black font-bebas font-semibold tracking-widest rounded-lg hover:bg-gray-50 transition-colors"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handleMobileFilterApply}
              className="flex-1 py-3 px-6 bg-black text-white font-bebas font-semibold tracking-widest rounded-lg hover:bg-gray-800 transition-colors"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
