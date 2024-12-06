import React from 'react';
import { Truck, Wallet, Headphones } from 'lucide-react';

const services = [
  {
    icon: <Truck className="w-12 h-12 text-[#F2631F]" />,
    title: 'Free Shipping',
    description: 'For invoices over $1,500'
  },
  {
    icon: <Wallet className="w-12 h-12 text-[#F2631F]" />,
    title: 'Cash Back',
    description: 'When paying for products via Dasun Wallet'
  },
  {
    icon: <Headphones className="w-12 h-12 text-[#F2631F]" />,
    title: '24/7 Support',
    description: 'When something goes wrong'
  }
];

const Services: React.FC = () => {
  return (
    <div>
      <section className="pb-8">
        <div className="container mx-auto px-4 xl:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center px-0 py-6 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-[18px] font-worksans font-semibold mb-2 text-black">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-[14px] font-worksans ">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 xl:px-14 my-20">
        <video
          autoPlay
          loop
          muted
          playsInline
            webkit-playsinline="true"
          className="rounded-lg shadow-lg w-full h-auto"
          style={{ height: '422px', objectFit: 'cover' }}
        >
          <source src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691073/public_assets_videos/lp1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Services;
