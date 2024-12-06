import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-white py-16">
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

export default Hero;