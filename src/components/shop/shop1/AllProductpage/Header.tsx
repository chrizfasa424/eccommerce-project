import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Heroicons SVGs (inline for simplicity)
const MailIcon = () => (
  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-1.27 1.27a16.06 16.06 0 006.6 6.6l1.27-1.27a2 2 0 011.95-.45l1.2.3A2 2 0 0021 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" /></svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" fill="black"/>
</svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clipPath="url(#clip0_1395_246)">
    <path d="M6.00011 7.5H18.0001C19.5001 7.5 20.7501 9 21.0001 10.5L22.5001 19.5C22.7502 21.0008 21.0001 22.5 19.5001 22.5H4.50011C3.00011 22.5 1.24998 21.0008 1.50011 19.5L3.00011 10.5C3.25011 9 4.50011 7.5 6.00011 7.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 10.5001V5.98267" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 6V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.78979 17.936H22.2104" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 6C16.5 4.5 15.6282 2.90128 14.2413 2.10055C12.8544 1.29982 11.1456 1.29982 9.75871 2.10055C8.3718 2.90128 7.5 4.5 7.5 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1395_246">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);
const MenuIcon = ({ className = "" }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={`w-4 h-4 ml-1 inline ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
);
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.99996 2.5C9.99996 2.5 4.84496 6.95 1.96413 9.36C1.87242 9.43984 1.79853 9.53808 1.74728 9.64834C1.69602 9.75861 1.66854 9.87842 1.66663 10C1.66663 10.221 1.75442 10.433 1.9107 10.5893C2.06698 10.7455 2.27895 10.8333 2.49996 10.8333H4.16663V16.6667C4.16663 16.8877 4.25442 17.0996 4.4107 17.2559C4.56698 17.4122 4.77894 17.5 4.99996 17.5H7.49996C7.72097 17.5 7.93293 17.4122 8.08921 17.2559C8.24549 17.0996 8.33329 16.8877 8.33329 16.6667V13.3333H11.6666V16.6667C11.6666 16.8877 11.7544 17.0996 11.9107 17.2559C12.067 17.4122 12.2789 17.5 12.5 17.5H15C15.221 17.5 15.4329 17.4122 15.5892 17.2559C15.7455 17.0996 15.8333 16.8877 15.8333 16.6667V10.8333H17.5C17.721 10.8333 17.9329 10.7455 18.0892 10.5893C18.2455 10.433 18.3333 10.221 18.3333 10C18.3321 9.8761 18.3028 9.75409 18.2475 9.6432C18.1922 9.53232 18.1124 9.43548 18.0141 9.36C15.1533 6.95 9.99996 2.5 9.99996 2.5Z" fill="black"/>
  </svg>
  
);

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Toys',
];
const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
];
const navLinks = [
  { label: 'HOME', href: '/shop1' },
  { label: 'PRODUCTS', href: '#', active: true },
  { label: 'BLOG', href: '#' },
  { label: 'CONTACT', href: '#' },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(categories[0]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);

  // Shop1 has a fixed shop ID of 1
  const SHOP_ID = 1;

  const handleCartClick = () => {
    navigate(`/shop/${SHOP_ID}/cart`);
  };

  // Close dropdowns on outside click
  const catRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCategoryOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDepartmentsOpen(false);
      // Close mobile nav/dept on outside click
      if (mobileNavOpen || mobileDeptOpen) {
        const navMenu = document.getElementById('mobile-nav-menu');
        const deptMenu = document.getElementById('mobile-dept-menu');
        if (mobileNavOpen && navMenu && !navMenu.contains(e.target as Node)) setMobileNavOpen(false);
        if (mobileDeptOpen && deptMenu && !deptMenu.contains(e.target as Node)) setMobileDeptOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileNavOpen, mobileDeptOpen]);

  return (
    <div className="w-full mx-auto">
      <div className="w-full">
        {/* Top Bar */}
        <div className='w-full'>
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm max-w-[1440px] mx-auto px-4 sm:px-8 md:px-14 lg:px-16 py-2 border-b bg-white gap-2 sm:gap-0">
            <div className="flex items-center max-w-[1080px] gap-2 md:gap-10 lg:gap-32">
              <a href="mailto:auoinstore@gmail.com" className="hover:underline"><MailIcon />auoinstore@gmail.com</a>
              <a href="tel:+6511188888" className="hover:underline"><PhoneIcon />+65 11.188.8888</a>
            </div>
            <div className="flex items-center gap-4 md:gap-8 lg:gap-16 sm:mr-20 md:mr-10 lg:mr-40">
              <div className="flex items-center gap-2 sm:gap-4 mr-0">
                <a href="#" aria-label="Facebook" className="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" viewBox="0 0 10 21" fill="none"><path d="M6.49636 20.1386V11.3597H9.45801L9.89824 7.92243H6.49636V5.73306C6.49636 4.7412 6.77271 4.06211 8.19623 4.06211H10V0.997625C9.12242 0.902826 8.24021 0.857411 7.35754 0.861593C4.73972 0.861593 2.94237 2.45971 2.94237 5.39351V7.91601H0V11.3532H2.9488V20.1386H6.49636Z" fill="#0066FF"/></svg></a>
                <a href="#" aria-label="Instagram" className="text-pink-500"><svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.14992 2.33325H14.8499C17.7833 2.33325 20.1666 4.71659 20.1666 7.64992V15.3499C20.1666 16.76 19.6064 18.1123 18.6094 19.1094C17.6123 20.1064 16.26 20.6666 14.8499 20.6666H7.14992C4.21659 20.6666 1.83325 18.2833 1.83325 15.3499V7.64992C1.83325 6.23985 2.3934 4.88754 3.39047 3.89047C4.38754 2.8934 5.73985 2.33325 7.14992 2.33325ZM6.96659 4.16659C6.09137 4.16659 5.252 4.51426 4.63313 5.13313C4.01426 5.752 3.66659 6.59137 3.66659 7.46659V15.5333C3.66659 17.3574 5.14242 18.8333 6.96659 18.8333H15.0333C15.9085 18.8333 16.7478 18.4856 17.3667 17.8667C17.9856 17.2478 18.3333 16.4085 18.3333 15.5333V7.46659C18.3333 5.64242 16.8574 4.16659 15.0333 4.16659H6.96659ZM15.8124 5.54159C16.1163 5.54159 16.4078 5.66231 16.6226 5.87719C16.8375 6.09208 16.9583 6.38352 16.9583 6.68742C16.9583 6.99131 16.8375 7.28276 16.6226 7.49765C16.4078 7.71253 16.1163 7.83325 15.8124 7.83325C15.5085 7.83325 15.2171 7.71253 15.0022 7.49765C14.7873 7.28276 14.6666 6.99131 14.6666 6.68742C14.6666 6.38352 14.7873 6.09208 15.0022 5.87719C15.2171 5.66231 15.5085 5.54159 15.8124 5.54159ZM10.9999 6.91659C12.2155 6.91659 13.3813 7.39947 14.2408 8.25901C15.1004 9.11855 15.5833 10.2843 15.5833 11.4999C15.5833 12.7155 15.1004 13.8813 14.2408 14.7408C13.3813 15.6004 12.2155 16.0833 10.9999 16.0833C9.78434 16.0833 8.61855 15.6004 7.75901 14.7408C6.89947 13.8813 6.41659 12.7155 6.41659 11.4999C6.41659 10.2843 6.89947 9.11855 7.75901 8.25901C8.61855 7.39947 9.78434 6.91659 10.9999 6.91659ZM10.9999 8.74992C10.2706 8.74992 9.5711 9.03965 9.05537 9.55537C8.53965 10.0711 8.24992 10.7706 8.24992 11.4999C8.24992 12.2293 8.53965 12.9287 9.05537 13.4445C9.5711 13.9602 10.2706 14.2499 10.9999 14.2499C11.7293 14.2499 12.4287 13.9602 12.9445 13.4445C13.4602 12.9287 13.7499 12.2293 13.7499 11.4999C13.7499 10.7706 13.4602 10.0711 12.9445 9.55537C12.4287 9.03965 11.7293 8.74992 10.9999 8.74992Z" fill="url(#paint0_linear_1395_293)"/>
<defs>
<linearGradient id="paint0_linear_1395_293" x1="10.9999" y1="2.33325" x2="10.9999" y2="20.6666" gradientUnits="userSpaceOnUse">
<stop stopColor="#EB00FF"/>
<stop offset="1" stopColor="#996300"/>
</linearGradient>
</defs>
</svg>
</a>
                <a href="#" aria-label="Twitter" className="text-blue-400"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3959 6.25008C22.5938 6.61466 21.7292 6.85425 20.8334 6.96883C21.7501 6.41675 22.4584 5.54175 22.7917 4.48966C21.9272 5.0105 20.9688 5.37508 19.9584 5.58341C19.1355 4.68758 17.9792 4.16675 16.6667 4.16675C14.2188 4.16675 12.2188 6.16675 12.2188 8.6355C12.2188 8.98967 12.2605 9.33342 12.3334 9.65633C8.62508 9.46883 5.323 7.68758 3.12508 4.98966C2.73966 5.64591 2.52091 6.41675 2.52091 7.22925C2.52091 8.78133 3.30216 10.1563 4.5105 10.9376C3.77091 10.9376 3.08341 10.7292 2.47925 10.4167V10.448C2.47925 12.6147 4.02091 14.4272 6.06258 14.8334C5.4072 15.0136 4.71887 15.0385 4.05216 14.9063C4.33509 15.7943 4.88918 16.5713 5.63656 17.1281C6.38393 17.6849 7.287 17.9935 8.21883 18.0105C6.63932 19.261 4.68134 19.937 2.66675 19.9272C2.31258 19.9272 1.95841 19.9063 1.60425 19.8647C3.58341 21.1355 5.93758 21.8751 8.45841 21.8751C16.6667 21.8751 21.1772 15.0626 21.1772 9.15633C21.1772 8.95842 21.1772 8.77091 21.1667 8.573C22.0417 7.948 22.7917 7.15633 23.3959 6.25008Z" fill="#2D88FF"/>
</svg>
</a>
              </div>
              <div className="relative flex" ref={langRef}>
                <div className="h-8 sm:h-10 border-l border-gray-300"></div>
                <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 px-2 py-1">
                  <span>{lang.flag}</span> {lang.label} <ChevronDownIcon />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    {languages.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l); setLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <span>{l.flag}</span> {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto items-center justify-between px-4 sm:px-8 md:px-14 lg:px-16 py-4 md:py-10 bg-white gap-4 md:gap-0">
          {/* Top bar with Logo and Icons for mobile */}
          <div className="flex w-full justify-between items-center md:hidden">
            <div className="text-2xl xs:text-[28px] font-playfair font-bold tracking-wide">AOIN</div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="hover:text-orange-400">
                  <HeartIcon />
                </button>
                <span className="absolute -top-2 -right-2 text-[10px] rounded-full px-1.5 bg-[#FFB998]">1</span>
              </div>
              <div className="relative">
                <button 
                  className="hover:text-orange-400 transition-colors"
                  onClick={handleCartClick}
                >
                  <CartIcon />
                </button>
                <span className="absolute -top-2 -right-2 text-[10px] rounded-full px-1.5 bg-[#FFB998]">3</span>
              </div>
              <button onClick={() => setMobileNavOpen((v) => !v)} aria-label="Open navigation">
                <MenuIcon />
              </button>
            </div>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block text-[36px] font-playfair font-bold tracking-wide">AOIN</div>

          {/* Search Bar */}
          <div className="w-full md:flex-1 flex items-center md:mx-10 lg:ml-20 nav2:ml-48 max-w-full md:max-w-2xl lg:max-w-2xl">
            <div className="flex w-full md:w-[600px] nav2:w-[600px] h-14 md:h-[44px] nav:h-[48px] lg:h-[59px] rounded-2xl border border-gray-300 min-w-0">
              <div className="relative hidden md:block" ref={catRef}>
                <button
                  onClick={() => setCategoryOpen((v) => !v)}
                  className="flex items-center justify-between font-poppins px-5 h-full text-[14px] lg:text-[16px] min-w-[160px] focus:outline-none"
                  style={{ border: 'none' }}
                >
                  <span>{category}</span>
                  <span className="ml-2"><ChevronDownIcon /></span>
                </button>
                {categoryOpen && (
                  <div className="absolute left-0 w-40 lg:w-48 bg-white border rounded shadow z-10">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setCategory(cat); setCategoryOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-px h-8 md:h-10 my-auto bg-gray-300 hidden md:block" />
              <input
                type="text"
                className="flex-1 px-4 py-1 md:py-2 text-sm md:text-base focus:outline-none focus:ring-0 bg-white border-0 placeholder:text-black min-w-0 rounded-l-2xl md:rounded-none"
                placeholder="What do you need?"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', boxShadow: 'none' }}
              />
              <button className="px-4 py-3 md:py-2 transition-colors rounded-r-2xl md:rounded-xl flex items-center justify-center bg-[#FFB998]" style={{ border: 'none', boxShadow: 'none' }}>
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Desktop Wishlist, Cart, Price */}
          <div className="hidden md:flex items-center gap-6 mr-10">
            <div className="relative">
              <button className="hover:text-orange-400">
                <HeartIcon />
              </button>
              <span className="absolute -top-2 -right-2 text-xs rounded-full px-1.5 bg-[#FFB998]">1</span>
            </div>
            <div className="relative">
              <button 
                className="hover:text-orange-400 transition-colors"
                onClick={handleCartClick}
              >
                <CartIcon />
              </button>
              <span className="absolute -top-2 -right-2 text-xs rounded-full px-1.5 bg-[#FFB998]">3</span>
            </div>
            <span className="text-base font-archivo font-medium">$150.00</span>
          </div>

          {/* Mobile Price */}
          <div className="flex md:hidden justify-end w-full">
            <span className="text-sm font-archivo font-medium">$150.00</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className='w-full px-2 xs:px-4 sm:px-8 md:px-14 lg:px-16 nav2:px-16 2xl:px-28   bg-[#E7E7E7] font-archivo'>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-gray-100 max-w-[1440px] mx-auto" style={{ backgroundColor: '#FFB998' }}>
            <div className="relative" ref={deptRef}>
              <button onClick={() => setDepartmentsOpen((v) => !v)} className="flex items-center gap-1 px-4 py-4 md:text-[14px] lg: text-[17px] font-medium">
                <MenuIcon className="md:mr-1 lg:mr-4" /> ALL DEPARTMENTS <ChevronDownIcon className="md:ml-4  lg:ml-24" />
              </button>
              {departmentsOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10">
                  {categories.slice(1).map((cat) => (
                    <div key={cat} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{cat}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center font-archivo justify-end gap-0 bg-[#E7E7E7] h-full overflow-x-auto min-w-0">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={` md:px-4 nav2:px-10 py-4 md:text-[14px] lg:text-[17px] font-medium font-archivo transition-colors ${link.active ? 'bg-[#FFB998]' : 'hover:bg-[#FFB998] text-gray-700'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile Nav */}
          {mobileNavOpen && (
            <div id="mobile-nav-menu" className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40 flex flex-col">
              <div className="bg-white w-4/5 max-w-xs h-full shadow-lg p-6 relative">
                <button className="absolute top-4 right-4" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="mb-6">
                  <button onClick={() => setMobileDeptOpen((v) => !v)} className="flex items-center gap-2 px-2 py-3 w-full text-left text-lg font-medium">
                    <MenuIcon /> ALL DEPARTMENTS <ChevronDownIcon />
                  </button>
                  {mobileDeptOpen && (
                    <div id="mobile-dept-menu" className="ml-6 mt-2 border-l border-gray-200">
                      {categories.slice(1).map((cat) => (
                        <div key={cat} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{cat}</div>
                      ))}
                    </div>
                  )}
                </div>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`px-4 py-3 text-lg font-medium rounded transition-colors ${link.active ? 'bg-[#FFB998]' : 'hover:bg-[#FFB998] text-gray-700'}`}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-1" onClick={() => setMobileNavOpen(false)}></div>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center max-w-[1450px] gap-1 xs:gap-2 py-1 xs:py-2 md:py-4 text-sm xs:text-base md:text-lg mx-auto px-2 xs:px-4 sm:px-8 md:px-16 bg-white border-b">
          <HomeIcon /> <span className="font-semibold">Home</span> <span className="text-gray-400">›</span> <span className="text-gray-400">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
