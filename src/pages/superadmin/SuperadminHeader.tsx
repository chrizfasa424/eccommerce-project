// src/components/superadmin/SuperadminHeader.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Menu, ChevronDown } from 'lucide-react';
import LogoutConfirmationPopup from '../../components/LogoutConfirmationPopup';
import useClickOutside from '../../hooks/useClickOutside';
import toast from 'react-hot-toast';

interface SuperadminHeaderProps {
  onMenuClick?: () => void;
}

const SuperadminHeader: React.FC<SuperadminHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileMenuRef, () => {
    setIsProfileMenuOpen(false);
  });

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
    setIsProfileMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutPopupOpen(false);
    toast.success('Successfully logged out!');
    navigate('/');
  };

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-30">
      <div className="px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 mr-2 text-orange-500 hover:text-orange-400 hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </button>
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1751687784/public_assets_images/public_assets_images_logo.svg" 
              alt="ShopEasy Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation Links - could be expanded */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            </div>
          </div>
          
          {/* Right side icons and profile */}
          <div className="flex items-center space-x-4">
            {/* Profile dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 focus:outline-none"
              >
                <div className="bg-gray-800 p-2 rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user?.name || user?.email}</div>
                  
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#ffedd5] ring-1 ring-gray-800 ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => {
                        navigate('/superadmin/profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-orange-800 hover:bg-[#fed7aa] hover:text-orange-900"
                      role="menuitem"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/superadmin/settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-orange-800 hover:bg-[#fed7aa] hover:text-orange-900"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left block px-4 py-2 text-sm text-orange-800 hover:bg-[#fed7aa] hover:text-orange-900"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add the LogoutConfirmationPopup */}
          <LogoutConfirmationPopup
            isOpen={isLogoutPopupOpen}
            onClose={() => setIsLogoutPopupOpen(false)}
            onConfirm={handleLogoutConfirm}
          />
        </div>
      </div>
    </header>
  );
};

export default SuperadminHeader;