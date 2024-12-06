import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['HOME', 'PAGES', 'ACCESSORIES', 'PORTFOLIO', 'SHOP', 'ABOUT', 'CONTACT'];

  return (
    <header className="bg-black text-white relative">
      <div className="container max-w-[1920px] mx-auto px-20 pt-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-white font-junge text-[22px] font-normal tracking-[3.3px] uppercase bg-gradient-to-r from-[#383838] to-[#9e9e9e] bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: '#aea8a8' }}>
          AOIN POOJA STORE
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-16">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white font-poppins text-[14px] font-normal leading-normal tracking-[2.1px] uppercase hover:text-yellow-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Search 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <ShoppingCart 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <Menu 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
        </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-black z-50 border-t border-gray-800">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-3 text-white font-poppins text-[14px] font-normal leading-normal tracking-[2.1px] uppercase hover:bg-gray-900 hover:text-yellow-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-6 py-4 border-t border-gray-800 mt-2">
                <Search className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;