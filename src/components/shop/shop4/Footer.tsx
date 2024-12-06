import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), #222121' }}>
      {/* Top section with service features */}
      <div className="border-b border-gray-800">
        <div className="max-w-[1920px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center">
            {/* Free Delivery */}
            <div className="flex items-end space-x-6">
                <img className="w-30 h-16" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463004/public_assets_shop4/public_assets_shop4_Layer_4.png' alt=''/>
              <div className="font-futura mb-2 ">
                <h3 className="font-normal text-[16px] uppercase tracking-wide">FREE DELIVERY</h3>
                <p className="text-[16px]">PRODUCTS</p>
              </div>
            </div>

            {/* Free & Easy Returns */}
            <div className="flex items-center space-x-6">
               <img className="w-17 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463001/public_assets_shop4/public_assets_shop4_Layer_4%20%281%29.png' alt=''/>
              <div>
                <h3 className="font-normal font-futura text-sm uppercase tracking-wide">FREE & EASY</h3>
                <p className="text-[16px] font-futura">RETURNS</p>
              </div>
            </div>

            {/* 24/7 Service */}
            <div className="flex items-center space-x-6">
                <img className="w-17 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463002/public_assets_shop4/public_assets_shop4_Layer_4%20%282%29.png' alt=''/>
              <div>
                <h3 className="font-normal font-futura text-[16px] uppercase tracking-wide">24/7 NON-STOP</h3>
                <p className="text-[16px] font-futura">SERVICE</p>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="flex items-center space-x-6">
                <img className="w-20 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463003/public_assets_shop4/public_assets_shop4_Layer_4%20%283%29.png' alt=''/>
              <div>
                <h3 className="font-normal font-futura text-sm uppercase tracking-wide">100% SECURE</h3>
                <p className="text-[16px] font-futura">CHECKOUT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-[1920px] mx-auto px-32 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Company Info Container */}
          <div className="lg:col-span-3">
            <div className="text-white font-junge text-[22px] font-normal tracking-[3.3px] uppercase bg-gradient-to-r from-[#383838] to-[#9e9e9e] bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: '#aea8a8' }}>
              AOIN POOJA STORE
            </div>
            <p className="font-poppins text-[16px] mt-3 mb-10">The Essence Of Every Pooja, In One Place</p>
            
            <button
              className="w-[163px] h-[50px] bg-[#BB9D7B] text-[#FFFFFF] font-[400] text-[14px] leading-normal tracking-[3px] text-center capitalize flex-shrink-0"
              style={{ fontFamily: '"Futura Md BT"' }}
            >
              Sign Up Now
            </button>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61578809217780" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/AOIN111111" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/aoin.in?igsh=NGk3dml2ZHk2cjM4" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>

              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/aoinstore" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                <div className="w-5 h-5 bg-red-500 rounded"></div>
              </a>
            </div>
          </div>

          {/* Links Container */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-end">
            {/* Order Assistance */}
            <div>
              <h3 className="mb-4 text-white font-futura text-base font-normal leading-[30px] tracking-[4px] uppercase">ORDER ASSISTANCE</h3>
              <ul className="space-y-3">
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Book An Appointment</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Shipping & Delivery</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Return & Refunds</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Gift Wrapping</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Follow Your Order</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Stores</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-white font-futura text-base font-normal leading-[30px] tracking-[4px] uppercase">COMPANY</h3>
              <ul className="space-y-3">
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Made To Last</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Our Mission</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Core Values</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">The Essentials Blog</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Hire Me</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Affiliates And Creators</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-white font-futura text-base font-normal leading-[30px] tracking-[4px] uppercase">SUPPORT</h3>
              <ul className="space-y-3">
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">FAQ</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Shipping And Returns</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Tracking</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Size Charts</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-4 text-white font-futura text-base font-normal leading-[30px] tracking-[4px] uppercase">CONTACT US</h3>
              <ul className="space-y-3">
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Shops</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">General Inquiries</a></li>
                <li className="text-white font-futura text-base font-normal leading-[30px] capitalize"><a href="#" className="hover:text-gray-300 transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1920px] mx-auto px-32 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className=" text-sm font-poppins ">© 2023 Aoin Pooja Store, All Rights Reserved</p>
            <div className="flex font-futura space-x-6">
              <a href="#" className=" text-sm hover:text-white transition-colors">Cookies Settings</a>
              <a href="#" className=" text-sm hover:text-white transition-colors">Terms & Privacy</a>
              <a href="#" className=" text-sm hover:text-white transition-colors">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;