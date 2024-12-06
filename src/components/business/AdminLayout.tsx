import React, { useState, useEffect, useRef } from "react";
import {
  Outlet,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useClickOutside from "../../hooks/useClickOutside";
import LogoutConfirmationPopup from "../LogoutConfirmationPopup";
import toast from "react-hot-toast";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  CubeIcon,
  TagIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ChatBubbleLeftIcon,
  DocumentChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Package } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Modified navigation items - updated Reports section
const navigationItems = [
  { name: "Dashboard", path: "/business/dashboard", icon: ChartBarIcon },
  {
    name: "Catalog",
    icon: CubeIcon,
    submenu: [
      { name: "Products", path: "/business/catalog/products", icon: CubeIcon },
      // { name: 'Wholesale', path: '/business/catalog/wholesale', icon: CubeIcon },
      {
        name: "Aoin Live",
        path: "/business/catalog/aoinlive",
        icon: ChatBubbleLeftIcon,
      },
    ],
  },
  { name: "Orders", path: "/business/orders", icon: ShoppingBagIcon },
  { name: "Inventory", path: "/business/inventory", icon: Package },
  // { name: 'Customers', path: '/business/customers', icon: UserGroupIcon },
  { name: "Promotions", path: "/business/product-placements", icon: TagIcon },
  { name: "Reviews", path: "/business/reviews", icon: StarIcon },
  {
    name: "Reports",
    icon: DocumentChartBarIcon,
    submenu: [
      {
        name: "Sales Report",
        path: "/business/reports/sales",
        icon: ChartBarIcon,
      },
      // { name: 'Customers Report', path: '/business/reports/customers', icon: UserGroupIcon },
      {
        name: "Products Report",
        path: "/business/reports/products",
        icon: CubeIcon,
      },
    ],
  },
  { name: "Support", path: "/business/support", icon: ChatBubbleLeftIcon },
  { name: "Settings", path: "/business/settings", icon: CogIcon },
];

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isMerchant, logout, user, accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [popoverOpenMenus, setPopoverOpenMenus] = useState<{
    [key: string]: boolean;
  }>({});

  useClickOutside(profileMenuRef, () => {
    setIsProfileMenuOpen(false);
  });

  // Check verification status
  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (!user || !accessToken) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/merchants/verification-status`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch verification status");
        }

        const data = await response.json();
        setVerificationStatus(data.verification_status);

        // If not verified and not already on verification pages, redirect
        if (
          data.verification_status !== "approved" &&
          !location.pathname.includes("/business/verification") &&
          !location.pathname.includes("/business/verification-status")
        ) {
          navigate("/business/verification");
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && isMerchant) {
      checkVerificationStatus();
    }
  }, [
    user,
    accessToken,
    isAuthenticated,
    isMerchant,
    location.pathname,
    navigate,
  ]);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-expand submenu if current path matches a submenu item
  useEffect(() => {
    navigationItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some((subItem) =>
          location.pathname.startsWith(subItem.path)
        );
        if (isSubmenuActive) {
          setExpandedMenus((prev) => ({ ...prev, [item.name]: true }));
        }
      }
    });
  }, [location.pathname]);

  // Handle unauthorized access
  if (!isAuthenticated || !isMerchant) {
    return <Navigate to="/business-login" state={{ from: location }} replace />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Block access if not verified and not on verification pages
  if (
    verificationStatus !== "approved" &&
    !location.pathname.includes("/business/verification") &&
    !location.pathname.includes("/business/verification-status")
  ) {
    return <Navigate to="/business/verification" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (name: string) => {
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
    setIsProfileMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutPopupOpen(false);
    toast.success("Successfully logged out!");
    navigate("/");
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Top Navigation - fixed height */}
      <header className="bg-black shadow z-10 h-16 flex-shrink-0 w-full">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Menu Button and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-orange-500 hover:text-orange-400 focus:outline-none"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1751687784/public_assets_images/public_assets_images_logo.svg"
              alt="ShopEasy Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Right: Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <div className="relative">
              <button
                className="p-1 rounded-full text-orange-500 hover:text-orange-400 focus:outline-none"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
                <BellIcon className="h-6 w-6" />
              </button>
              
              {/* Notifications Dropdown */}
            {/* {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-black ring-1 ring-gray-800 ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-sm font-medium text-orange-500">Notifications</p>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-b-0"
                        >
                          <p className="text-sm font-medium text-orange-500">New Order #{1000 + item}</p>
                          <p className="text-xs text-orange-400 mt-1">
                            A new order has been placed by Customer {item}
                          </p>
                          <p className="text-xs text-orange-300 mt-1">Just now</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-800">
                      <Link to="/business/notifications" className="text-sm font-medium text-orange-500 hover:text-orange-400">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              )} */}
            {/* </div> */}

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center space-x-2 text-sm focus:outline-none"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-orange-500 font-medium">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "M"}
                </div>
                <span className="hidden md:block text-orange-500 font-medium">
                  {user?.name || user?.email?.split("@")[0] || "Merchant"}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-orange-500" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#ffedd5] ring-1 ring-gray-800 ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/business/settings"
                      className="block px-4 py-2 text-sm text-orange-800 hover:bg-[#fed7aa] hover:text-orange-900"
                      role="menuitem"
                    >
                      Settings
                    </Link>
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
        </div>
      </header>

      {/* Main flex container for sidebar + content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            ${
              isMobile
                ? `${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } fixed inset-y-0 left-0 z-30`
                : "relative"
            }
            ${!isMobile && isSidebarCollapsed ? "w-16" : "w-64"}
            bg-[#ffedd5] shadow-lg transform transition-all duration-300 ease-in-out flex flex-col flex-shrink-0
          `}
        >
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-orange-200 flex-shrink-0">
            <div className="flex flex-col items-center w-full">
              <span
                className={`text-lg font-semibold text-orange-800 transition-opacity duration-200 ${
                  !isMobile && isSidebarCollapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100"
                }`}
              >
                Merchant Portal
              </span>
            </div>
            {/* Collapse/Expand Button (Desktop only) */}
            {!isMobile && (
              <button
                onClick={toggleSidebarCollapse}
                className="ml-2 text-orange-500 hover:text-orange-400 focus:outline-none"
                title={
                  isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
                }
              >
                {isSidebarCollapsed ? (
                  <ChevronDownIcon className="h-6 w-6 rotate-90" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 -rotate-90" />
                )}
              </button>
            )}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="ml-4 md:hidden text-orange-500 hover:text-orange-400 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="py-4 flex-1 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigationItems.map((item) => {
                const hasSubmenu = !!item.submenu;
                const isMenuActive = hasSubmenu
                  ? item.submenu.some((subItem) =>
                      location.pathname.startsWith(subItem.path)
                    )
                  : location.pathname === item.path ||
                    (item.name === "Catalog" &&
                      location.pathname.startsWith("/business/catalog"));
                const isExpanded = expandedMenus[item.name] || false;
                const popoverOpen = popoverOpenMenus[item.name] || false;
                return (
                  <div key={item.name} className="relative group">
                    {hasSubmenu ? (
                      <div
                        onMouseEnter={() => {
                          if (!isMobile && isSidebarCollapsed)
                            setPopoverOpenMenus((prev) => ({
                              ...prev,
                              [item.name]: true,
                            }));
                        }}
                        onMouseLeave={() => {
                          if (!isMobile && isSidebarCollapsed)
                            setPopoverOpenMenus((prev) => ({
                              ...prev,
                              [item.name]: false,
                            }));
                        }}
                      >
                        <button
                          onClick={() => {
                            if (!isMobile && isSidebarCollapsed) {
                              setPopoverOpenMenus((prev) => ({
                                ...prev,
                                [item.name]: !prev[item.name],
                              }));
                            } else {
                              toggleSubmenu(item.name);
                            }
                          }}
                          className={`${
                            isMenuActive
                              ? "bg-[#fed7aa] text-orange-800"
                              : "text-orange-800 hover:bg-[#fed7aa] hover:text-orange-800"
                          }
                            w-full flex items-center justify-between px-2 py-2 text-base font-medium rounded-md transition-colors
                            ${
                              !isMobile && isSidebarCollapsed
                                ? "justify-center px-0"
                                : ""
                            }`}
                          title={
                            !isMobile && isSidebarCollapsed
                              ? item.name
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            <item.icon
                              className={`${
                                isMenuActive
                                  ? "text-orange-800"
                                  : "text-orange-600 group-hover:text-orange-800"
                              }
                                mr-3 flex-shrink-0 h-6 w-6 transition-colors
                                ${
                                  !isMobile && isSidebarCollapsed
                                    ? "mx-auto mr-0"
                                    : ""
                                }`}
                            />
                            {((!isMobile && !isSidebarCollapsed) ||
                              (isMobile && isSidebarOpen)) &&
                              item.name}
                          </div>
                          {((!isMobile && !isSidebarCollapsed) ||
                            (isMobile && isSidebarOpen)) && (
                            <ChevronDownIcon
                              className={`${
                                isExpanded ? "transform rotate-180" : ""
                              } h-4 w-4 text-orange-600 transition-transform`}
                            />
                          )}
                        </button>
                        {/* Submenu items */}
                        {/* Expanded sidebar: show submenu inline */}
                        {!isMobile && !isSidebarCollapsed && isExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubItemActive =
                                location.pathname.startsWith(subItem.path);
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className={`${
                                    isSubItemActive
                                      ? "bg-[#fed7aa] text-orange-800"
                                      : "text-orange-800 hover:bg-[#fed7aa] hover:text-orange-800"
                                  }
                                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                                >
                                  <subItem.icon
                                    className={`${
                                      isSubItemActive
                                        ? "text-orange-800"
                                        : "text-orange-600 group-hover:text-orange-800"
                                    }
                                      mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                                  />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {/* Mobile sidebar: show submenu inline */}
                        {isMobile && isSidebarOpen && isExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubItemActive =
                                location.pathname.startsWith(subItem.path);
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className={`${
                                    isSubItemActive
                                      ? "bg-[#fed7aa] text-orange-800"
                                      : "text-orange-800 hover:bg-[#fed7aa] hover:text-orange-800"
                                  }
            group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                                >
                                  <subItem.icon
                                    className={`${
                                      isSubItemActive
                                        ? "text-orange-800"
                                        : "text-orange-600 group-hover:text-orange-800"
                                    }
              mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                                  />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {/* Collapsed sidebar: show submenu as popover */}
                        {!isMobile && isSidebarCollapsed && popoverOpen && (
                          <div className="absolute left-full top-0 mt-0 ml-2 w-48 rounded-md shadow-lg bg-[#ffedd5] ring-1 ring-gray-800 ring-opacity-5 z-50">
                            <div className="py-1">
                              {item.submenu.map((subItem) => {
                                const isSubItemActive =
                                  location.pathname.startsWith(subItem.path);
                                return (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className={`${
                                      isSubItemActive
                                        ? "bg-[#fed7aa] text-orange-800"
                                        : "text-orange-800 hover:bg-[#fed7aa] hover:text-orange-800"
                                    }
                                      group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                                  >
                                    <subItem.icon
                                      className={`${
                                        isSubItemActive
                                          ? "text-orange-800"
                                          : "text-orange-600 group-hover:text-orange-800"
                                      }
                                        mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                                    />
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`${
                          isMenuActive
                            ? "bg-[#fed7aa] text-orange-800"
                            : "text-orange-800 hover:bg-[#fed7aa] hover:text-orange-800"
                        }
                          group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors
                          ${
                            !isMobile && isSidebarCollapsed
                              ? "justify-center px-0"
                              : ""
                          }`}
                        title={
                          !isMobile && isSidebarCollapsed
                            ? item.name
                            : undefined
                        }
                      >
                        <item.icon
                          className={`${
                            isMenuActive
                              ? "text-orange-800"
                              : "text-orange-600 group-hover:text-orange-800"
                          }
                            mr-3 flex-shrink-0 h-6 w-6 transition-colors
                            ${
                              !isMobile && isSidebarCollapsed
                                ? "mx-auto mr-0"
                                : ""
                            }`}
                        />
                        {((!isMobile && !isSidebarCollapsed) ||
                          (isMobile && isSidebarOpen)) &&
                          item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content - allows scrolling within content area */}
        <main className="flex-1 overflow-auto relative transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Dark Overlay for Mobile when Sidebar is Open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Add the LogoutConfirmationPopup */}
      <LogoutConfirmationPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default AdminLayout;
