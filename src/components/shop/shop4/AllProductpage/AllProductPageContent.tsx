import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Shop4ProductCard, { Product } from '../Shop4ProductCard';
import shop4ApiService, { Product as ApiProduct } from '../../../../services/shop4ApiService';

// Convert API product to local Product interface
const mapApiProductToLocal = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.product_id,
  title: apiProduct.product_name,
  price: apiProduct.special_price || apiProduct.price,
  discount: apiProduct.special_price ? 
    `${Math.round(((apiProduct.price - apiProduct.special_price) / apiProduct.price) * 100)}%` : 
    '0%',
  image: apiProduct.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png"
});



// --- Sidebar ---
const Sidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState([0, 7500]);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const minPrice = 0;
    const maxPrice = 7500;

    const handleMouseDown = (e: React.MouseEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(handle);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleHandleClick = (e: React.MouseEvent, _handle: 'min' | 'max') => {
        e.preventDefault();
        e.stopPropagation();
        // Don't start dragging on click, just prevent the track click
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = Math.round(minPrice + percentage * (maxPrice - minPrice));

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        setIsDragging(handle);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = Math.round(minPrice + percentage * (maxPrice - minPrice));

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    const getMinPosition = () => ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const getMaxPosition = () => ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

    const handleClearFilters = () => {
        setPriceRange([0, 7500]);
        setInStock(false);
        setOutOfStock(false);
    };

    return (
        <div className="bg-[#161616] text-white w-[455px] h-[638px] rounded-[5px]">
            <div className="p-10">
                {/* Top Section - Breadcrumbs and Clear Filters */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-white font-poppins text-base font-normal leading-[30px] tracking-[2.4px] capitalize">Home/Pooja Items</span>
                        <button 
                            onClick={handleClearFilters}
                            className="w-[168px] h-[50px] flex-shrink-0 border border-white text-[#895200] font-poppins text-[14px] font-normal leading-normal tracking-[2.1px] capitalize hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div className="w-full h-px bg-[#E0E0E0]"></div>
                </div>

                {/* Filter By Price Section */}
                <div className="mb-6">
                    <h3 className="text-white font-futura text-[25px] font-[450] leading-[30px] capitalize mb-6">Filter By Price</h3>
                    <div className="mb-6">
                        <div className="relative" ref={sliderRef}>
                            {/* Track */}
                            <div 
                                className="w-full h-2 bg-[#374151] rounded-lg relative cursor-pointer"
                                onClick={(e) => {
                                    // Don't handle clicks if we're clicking on a handle
                                    if ((e.target as HTMLElement).closest('[data-handle]')) return;
                                    
                                    if (!sliderRef.current) return;
                                    const rect = sliderRef.current.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const width = rect.width;
                                    const percentage = Math.max(0, Math.min(1, x / width));
                                    const value = Math.round(minPrice + percentage * (maxPrice - minPrice));
                                    
                                    // Determine which handle to move based on which is closer
                                    const minDistance = Math.abs(value - priceRange[0]);
                                    const maxDistance = Math.abs(value - priceRange[1]);
                                    
                                    if (minDistance < maxDistance) {
                                        const newMin = Math.min(value, priceRange[1] - 100);
                                        setPriceRange([newMin, priceRange[1]]);
                                    } else {
                                        const newMax = Math.max(value, priceRange[0] + 100);
                                        setPriceRange([priceRange[0], newMax]);
                                    }
                                }}
                            >
                                {/* Active track */}
                                <div 
                                    className="absolute h-2 bg-[#A06020] rounded-lg"
                                    style={{
                                        left: `${getMinPosition()}%`,
                                        width: `${getMaxPosition() - getMinPosition()}%`,
                                        transition: isDragging ? 'none' : 'left 0.3s ease-out, width 0.3s ease-out'
                                    }}
                                />
                            </div>
                            
                            {/* Min Handle */}
                            <div
                                data-handle="min"
                                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                style={{ 
                                    left: `calc(${getMinPosition()}% - 12px)`,
                                    transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'min')}
                                onClick={(e) => handleHandleClick(e, 'min')}
                                onTouchStart={(e) => handleTouchStart(e, 'min')}
                            />
                            
                            {/* Max Handle */}
                            <div
                                data-handle="max"
                                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                style={{ 
                                    left: `calc(${getMaxPosition()}% - 12px)`,
                                    transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'max')}
                                onClick={(e) => handleHandleClick(e, 'max')}
                                onTouchStart={(e) => handleTouchStart(e, 'max')}
                            />
                        </div>
                    </div>
                    <div className="text-[#E0E0E0] text-sm mb-6">
                        Price: ${priceRange[0]} – ${priceRange[1]}
                    </div>
                    <button className="flex w-[197px] h-[50px] px-[31px] py-[21px] justify-center items-center gap-[11px] flex-shrink-0 bg-black text-white font-futura text-[14px] font-normal leading-normal tracking-[3.5px] uppercase hover:bg-gray-900 transition-colors">
                        FILTER
                    </button>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-[#E0E0E0] mb-6"></div>

                {/* Availability Section */}
                <div className="mb-6">
                    <h3 className="text-white font-poppins text-[25px] font-normal leading-[30px] capitalize mb-6">Availability</h3>
                    
                    {/* In Stock Option */}
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="inStock"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="inStock" className="ml-3 mt-2.5 !font-poppins !text-base !font-medium !leading-[30px] !capitalize !cursor-pointer !text-white">
                            In Stock
                        </label>
                    </div>
                    
                    {/* Separator Line */}
                    <div className="w-full h-px bg-[#CCCCCC] mb-2"></div>
                    
                    {/* Out Of Stock Option */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="outOfStock"
                            checked={outOfStock}
                            onChange={(e) => setOutOfStock(e.target.checked)}
                            className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="outOfStock" className="ml-3 mt-2.5 !font-poppins !text-base !font-normal !leading-normal !cursor-pointer !text-white">
                            Out Of Stock
                        </label>
                    </div>
                    
                    {/* Separator Line */}
                    <div className="w-full h-px bg-[#CCCCCC] mt-4"></div>
                </div>
            </div>
            <style>{`
                /* Custom checkbox styling */
                input[type="checkbox"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid white;
                    background: transparent;
                    cursor: pointer;
                    position: relative;
                }

                input[type="checkbox"]:checked {
                    background: #A06020;
                    border-color: #A06020;
                }

                input[type="checkbox"]:checked::after {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }

                /* Ensure label text is white */
                label[for="inStock"], label[for="outOfStock"] {
                    color: white !important;
                }
            `}</style>
        </div>
    );
};

// --- ProductGrid ---
const ProductGrid: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 9; // 3x3 grid

    // Get filters from URL parameters
    const categoryId = searchParams.get('category_id');
    const brandId = searchParams.get('brand_id');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: any = {
                    page: currentPage,
                    per_page: productsPerPage,
                    in_stock_only: true,
                };

                // Add filters if they exist
                if (categoryId) params.category_id = parseInt(categoryId);
                if (brandId) params.brand_id = parseInt(brandId);
                if (search) params.search = search;
                if (minPrice) params.min_price = parseFloat(minPrice);
                if (maxPrice) params.max_price = parseFloat(maxPrice);

                const response = await shop4ApiService.getProducts(params);
                
                if (response && response.success) {
                    const mappedProducts = response.products.map(mapApiProductToLocal);
                    setProducts(mappedProducts);
                    setTotalProducts(response.total);
                    setTotalPages(response.total_pages);
                } else {
                    setProducts([]);
                    setTotalProducts(0);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setTotalProducts(0);
                setTotalPages(0);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [currentPage, categoryId, brandId, search, minPrice, maxPrice]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleProductClick = (productId: number) => {
        navigate(`/shop4-productpage?id=${productId}`);
    };

    if (loading) {
        return (
            <div className="bg-black max-w-[1078px] mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-white text-xl">Loading products...</div>
                </div>
            </div>
        );
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);

    return (
        <div className="bg-black max-w-[1078px] mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[1078px] mx-auto mb-6">
                <p className="text-white text-sm opacity-80">
                    Showing {startIndex + 1}–{endIndex} of {totalProducts} Results
                </p>
            </div>
            <div className="max-w-[1078px] mx-auto">
                {products.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-white text-xl">No products found</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-20 gap-y-12 sm:gap-y-16 lg:gap-y-28">
                        {products.map((product) => (
                            <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                                <Shop4ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-12 flex justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

// --- Pagination ---
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        } else {
            onPageChange(1); // Loop back to first page
        }
    };

    // Generate array of page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center py-20 gap-4">
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`
                        w-[47px] h-[47px] rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0
                        transition-all duration-200
                        ${currentPage === page
                            ? 'bg-[#B19D7F] text-white'
                            : 'text-white hover:text-gray-300'
                        }
                    `}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNextClick}
                className="text-white hover:text-gray-300 transition-colors duration-200"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
};


// --- Hero ---
const Hero: React.FC = () => {
    return (
        <section className="text-white py-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-[36px] font-poppins font-normal leading-normal uppercase text-[#FFF] mb-4">
                    AOIN POOJA STORE
                </h1>
                <div className="text-[14px] font-poppins font-normal leading-normal tracking-[2.1px] uppercase text-[#FFF]">
                    <span className="hover:text-yellow-400 cursor-pointer transition-colors">HOME</span>
                    <span className="mx-2">-</span>
                    <span className="text-[#FFF]">POOJA SHOP</span>
                </div>
            </div>
        </section>
    );
};

// --- Combined Page Component ---
const AllProductPageContent: React.FC = () => {
    return (
        <>
            <Hero />
            <main className="container max-w-[1740px] mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
                    <aside className="lg:w-80 order-2 lg:order-1">
                        <div className="sticky top-8">
                            <Sidebar />
                        </div>
                    </aside>
                    <div className="flex-1 order-1 lg:order-2">
                        <ProductGrid />
                    </div>
                </div>
            </main>
        </>
    );
}


export default AllProductPageContent;

