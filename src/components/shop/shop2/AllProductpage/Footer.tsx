const Footer = () => {
  return (
    <footer className="bg-[#181818] text-white py-8 sm:py-12 lg:py-20 pb-4 px-4 sm:px-6 md:px-16 lg:px-10 2xl:px-28">
      <div className="max-w-full w-full mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          {/* Brand & Newsletter */}
          <div className="flex-1 min-w-[220px] flex flex-col">
            <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-bebas mb-2">AOIN</h2>
              <p className="text-gray-300 mb-6 lg:mb-10 text-sm sm:text-base font-futura leading-relaxed">
                Be The First To Hear About New Product Drops,<br className="hidden sm:block" /> Insider News, Exclusive Offers, And More.
              </p>
              <button className="bg-[#C7A17A] text-white px-6 sm:px-10 py-3 rounded-none font-futura font-semibold tracking-widest text-xs w-full sm:w-auto hover:bg-[#B8956B] transition-colors">
                SIGN UP NOW
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-4 sm:space-x-6">
              <a href="https://www.facebook.com/profile.php?id=61578809217780" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#C7A17A] transition-colors">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
              </a>
              <a href="https://x.com/AOIN111111" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#C7A17A] transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.55 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 21.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" /></svg>
              </a>
              <a href="https://www.instagram.com/aoin.in?igsh=NGk3dml2ZHk2cjM4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#C7A17A] transition-colors">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white"><rect width="20" height="20" x="2" y="2" rx="5" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Container */}
          <div className="font-futura flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-28">
            {/* Order Assistance */}
            <div className="flex-1 min-w-[180px] lg:min-w-[205px]">
              <h3 className="text-sm sm:text-base font-[450] leading-[30px] tracking-[2px] sm:tracking-[4px] mb-4 sm:mb-6 capitalize text-white font-futura">Order Assistance</h3>
              <ul className="text-white font-futura text-sm sm:text-base font-normal capitalize space-y-2">
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Book An Appointment</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Gift Wrapping</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Follow Your Order</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Stores</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex-1 min-w-[140px] lg:min-w-[165px]">
              <h3 className="text-sm sm:text-base font-[450] leading-[30px] tracking-[2px] sm:tracking-[4px] mb-4 sm:mb-6 capitalize text-white font-['Futura PT']">Company</h3>
              <ul className="text-white font-futura text-sm sm:text-base font-normal capitalize space-y-2">
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Made To Last</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Core Values</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">The Essentials Blog</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Hire Me</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Affiliates And Creators</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex-1 min-w-[130px] lg:min-w-[155px]">
              <h3 className="text-sm sm:text-base font-[450] leading-[30px] tracking-[2px] sm:tracking-[4px] mb-4 sm:mb-6 capitalize text-white font-['Futura PT']">Support</h3>
              <ul className="text-white font-futura text-sm sm:text-base font-normal capitalize space-y-2">
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Shipping And Returns</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Tracking</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Size Charts</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex-1 min-w-[110px] lg:min-w-[130px]">
              <h3 className="text-sm sm:text-base font-[450] leading-[30px] tracking-[2px] sm:tracking-[4px] mb-4 sm:mb-6 capitalize text-white font-['Futura PT']">Contact Us</h3>
              <ul className="text-white font-futura text-sm sm:text-base font-normal capitalize space-y-2">
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Shops</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">General Inquiries</a></li>
                <li><a href="#" className="hover:text-[#C7A17A] transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-end text-gray-400 gap-2">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-10 text-sm sm:text-base text-white font-futura text-center sm:text-left">
            <a href="#" className="hover:text-[#C7A17A] transition-colors">Cookies Settings</a>
            <a href="#" className="hover:text-[#C7A17A] transition-colors">Terms & Privacy</a>
            <a href="#" className="hover:text-[#C7A17A] transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
