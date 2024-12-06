import { useState } from 'react';
import { User, Menu, X, Search, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Shop2 has a fixed shop ID of 2
  const SHOP_ID = 2;
  
  const handleCartClick = () => {
    navigate(`/shop/${SHOP_ID}/cart`);
  };

  return (
    <header className=" relative w-full max-w-[1280px] mx-auto bg-white top-0 z-50 ">
      <div className="w-[1280px] max-w-full mx-auto px-8">
        <div className="flex items-center justify-between h-24 relative">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center w-[43%] space-x-10">
            <Link to="/shop2-allproductpage" className="text-[16px] font-medium font-gilroy text-gray-900 hover:text-gray-600 transition-colors tracking-[0.1em]">
              Products
            </Link>
         
            <a href="#" className="text-[16px] font-medium font-gilroy text-gray-900 hover:text-gray-600 transition-colors tracking-[0.1em]">
              Contact us
            </a>
          </nav>

          {/* Logo - absolutely centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-bebas font-normal text-center tracking-normal text-[#222222]">
              AOIN
            </h1>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-900 hover:text-gray-600 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button 
              className="text-gray-900 hover:text-gray-600 transition-colors"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="text-gray-900 hover:text-gray-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-6">
              <Link to="/shop2/products" className="text-sm font-medium text-gray-900 tracking-[0.1em]">PRODUCTS</Link>
              <a href="#" className="text-sm font-medium text-gray-900 tracking-[0.1em]">CONTACT US</a>
            </nav>
            <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-100">
              <Search className="w-5 h-5 text-gray-900" />
              <button 
                className="text-gray-900 hover:text-gray-600 transition-colors"
                onClick={handleCartClick}
              >
                <ShoppingCart className="w-5 h-5 text-gray-900" />
              </button>
              <User className="w-5 h-5 text-gray-900" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;