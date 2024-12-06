import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#e18a4b] text-white w-full mx-auto py-8 px-4 sm:px-8 md:px-14 md:py-16">
      <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16 lg:gap-32">
        {/* Brand Info */}
        <div className="flex-1 min-w-[200px] md:min-w-[310px] mb-10 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-6 sm:mb-8 text-white">AOIN</h2>
          <div className="mb-4 sm:mb-6 font-poppins text-base sm:text-[18px]">
            <p className="font-semibold mb-1">Address : <span className="font-normal">Anjis Overseas Pvt. Ltd.</span></p>
            <p className="">H-104, MIG Colony, RSS Nagar</p>
            <p className="">Indore – 452003</p>
            <p className="">Madhya Pradesh, India</p>
          </div>
          <div className="mb-4 sm:mb-6 font-poppins text-base sm:text-[18px]">
            <p className="font-semibold">Phone : <span className="font-normal">+91 78797 02202</span></p>
          </div>
          <div className="mb-4 sm:mb-6 font-poppins text-base sm:text-[18px]">
            <p className="font-semibold">Email : <span className="font-normal">auoinstore@gmail.com</span></p>
          </div>
          <div className="flex gap-3 sm:gap-3 mt-4 sm:mt-6">
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61578809217780" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full px-2 sm:px-3 py-3 sm:py-4 items-center shadow-md hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M13.397 20.9972V12.8012H16.162L16.573 9.59225H13.397V7.54825C13.397 6.62225 13.655 5.98825 14.984 5.98825H16.668V3.12725C15.8487 3.03874 15.0251 2.99634 14.201 3.00025C11.757 3.00025 10.079 4.49225 10.079 7.23125V9.58625H7.33203V12.7952H10.085V20.9972H13.397Z" fill="#0066FF"/>
</svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/aoin.in?igsh=NGk3dml2ZHk2cjM4" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full px-2 sm:px-3 py-3 sm:py-4 shadow-md hover:bg-gray-200 transition-colors">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.15004 1.8335H14.85C17.7834 1.8335 20.1667 4.21683 20.1667 7.15016V14.8502C20.1667 16.2602 19.6066 17.6125 18.6095 18.6096C17.6124 19.6067 16.2601 20.1668 14.85 20.1668H7.15004C4.21671 20.1668 1.83337 17.7835 1.83337 14.8502V7.15016C1.83337 5.7401 2.39352 4.38778 3.39059 3.39071C4.38766 2.39364 5.73997 1.8335 7.15004 1.8335ZM6.96671 3.66683C6.09149 3.66683 5.25213 4.01451 4.63326 4.63338C4.01438 5.25225 3.66671 6.09162 3.66671 6.96683V15.0335C3.66671 16.8577 5.14254 18.3335 6.96671 18.3335H15.0334C15.9086 18.3335 16.748 17.9858 17.3668 17.367C17.9857 16.7481 18.3334 15.9087 18.3334 15.0335V6.96683C18.3334 5.14266 16.8575 3.66683 15.0334 3.66683H6.96671ZM15.8125 5.04183C16.1164 5.04183 16.4079 5.16255 16.6228 5.37744C16.8377 5.59232 16.9584 5.88377 16.9584 6.18766C16.9584 6.49156 16.8377 6.783 16.6228 6.99789C16.4079 7.21277 16.1164 7.3335 15.8125 7.3335C15.5086 7.3335 15.2172 7.21277 15.0023 6.99789C14.7874 6.783 14.6667 6.49156 14.6667 6.18766C14.6667 5.88377 14.7874 5.59232 15.0023 5.37744C15.2172 5.16255 15.5086 5.04183 15.8125 5.04183ZM11 6.41683C12.2156 6.41683 13.3814 6.89971 14.2409 7.75926C15.1005 8.6188 15.5834 9.78459 15.5834 11.0002C15.5834 12.2157 15.1005 13.3815 14.2409 14.2411C13.3814 15.1006 12.2156 15.5835 11 15.5835C9.78447 15.5835 8.61868 15.1006 7.75913 14.2411C6.89959 13.3815 6.41671 12.2157 6.41671 11.0002C6.41671 9.78459 6.89959 8.6188 7.75913 7.75926C8.61868 6.89971 9.78447 6.41683 11 6.41683ZM11 8.25016C10.2707 8.25016 9.57122 8.53989 9.0555 9.05562C8.53977 9.57134 8.25004 10.2708 8.25004 11.0002C8.25004 11.7295 8.53977 12.429 9.0555 12.9447C9.57122 13.4604 10.2707 13.7502 11 13.7502C11.7294 13.7502 12.4289 13.4604 12.9446 12.9447C13.4603 12.429 13.75 11.7295 13.75 11.0002C13.75 10.2708 13.4603 9.57134 12.9446 9.05562C12.4289 8.53989 11.7294 8.25016 11 8.25016Z" fill="url(#paint0_linear_1395_428)"/>
<defs>
<linearGradient id="paint0_linear_1395_428" x1="11" y1="1.8335" x2="11" y2="20.1668" gradientUnits="userSpaceOnUse">
<stop stopColor="#EB00FF"/>
<stop offset="1" stopColor="#996300"/>
</linearGradient>
</defs>
</svg>

            </a>
            {/* Twitter */}
            <a href="https://x.com/AOIN111111" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full px-2 sm:px-3 py-2 sm:py-4 shadow-md hover:bg-gray-200 transition-colors">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3958 6.24984C22.5937 6.61442 21.7291 6.854 20.8333 6.96859C21.75 6.4165 22.4583 5.5415 22.7916 4.48942C21.927 5.01025 20.9687 5.37484 19.9583 5.58317C19.1354 4.68734 17.9791 4.1665 16.6666 4.1665C14.2187 4.1665 12.2187 6.1665 12.2187 8.63525C12.2187 8.98942 12.2604 9.33317 12.3333 9.65609C8.62496 9.46859 5.32288 7.68734 3.12496 4.98942C2.73954 5.64567 2.52079 6.4165 2.52079 7.229C2.52079 8.78109 3.30204 10.1561 4.51038 10.9373C3.77079 10.9373 3.08329 10.729 2.47913 10.4165V10.4478C2.47913 12.6144 4.02079 14.4269 6.06246 14.8332C5.40708 15.0133 4.71875 15.0383 4.05204 14.9061C4.33497 15.7941 4.88906 16.5711 5.63643 17.1279C6.38381 17.6847 7.28688 17.9933 8.21871 18.0103C6.6392 19.2608 4.68122 19.9367 2.66663 19.9269C2.31246 19.9269 1.95829 19.9061 1.60413 19.8644C3.58329 21.1353 5.93746 21.8748 8.45829 21.8748C16.6666 21.8748 21.177 15.0623 21.177 9.15609C21.177 8.95817 21.177 8.77067 21.1666 8.57275C22.0416 7.94775 22.7916 7.15609 23.3958 6.24984Z" fill="#2D88FF"/>
</svg>

            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/aoinstore" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full px-2 sm:px-3 py-3 sm:py-4 shadow-md hover:bg-gray-200 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.822 13.291 12.822 14.785V20.452H9.351V9H12.694V10.561H12.732C13.297 9.448 14.507 8.207 16.492 8.207C20.523 8.207 20.447 11.348 20.447 13.994V20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.397 4.23 7.397 5.368C7.397 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="#0077B5"/>
</svg>
            </a>
          </div>
        </div>
        {/* Information */}
        <div className="flex-1 font-segoe min-w-[140px] md:min-w-[180px] mb-8 md:mb-0">
          <h3 className="text-lg sm:text-[24px] font-semibold mb-2 text-white">Information</h3>
          <div className="w-8 sm:w-10 h-[1px]  bg-white mt-2 sm:mt-4 mb-4 sm:mb-6" />
          <ul className="space-y-2 sm:space-y-4 text-base sm:text-[18px]">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Checkout</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
          </ul>
        </div>
        {/* My Account */}
        <div className="flex-1 font-segoe min-w-[140px] md:min-w-[180px] mb-8 md:mb-0">
          <h3 className="text-lg sm:text-[24px] font-semibold mb-2 text-white">My Account</h3>
          <div className="w-8 sm:w-10 h-[1px]  bg-white mt-2 sm:mt-4 mb-4 sm:mb-6" />
          <ul className="space-y-2 sm:space-y-4  text-base sm:text-[18px]">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Shopping Cart</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
          </ul>
        </div>
        {/* Categories */}
        <div className="flex-1 font-segoe min-w-[140px] md:min-w-[180px]">
          <h3 className="text-lg sm:text-[24px] font-semibold mb-2 text-white">Categories</h3>
          <div className="w-8 sm:w-10 h-[1px]  bg-white mt-2 sm:mt-4 mb-4 sm:mb-6" />
          <ul className="space-y-2 sm:space-y-4 text-base sm:text-lg">
            <li><a href="#" className="hover:underline">Clothes</a></li>
            <li><a href="#" className="hover:underline">Dress</a></li>
            <li><a href="#" className="hover:underline">Shirt</a></li>
            <li><a href="#" className="hover:underline">Shoes</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/30 mt-10 sm:mt-20 md:mt-32" />
    </footer>
  );
};

export default Footer;
