import React from 'react';
import AoinLive from '../components/sections/AoinLive';
import ComingSoon from '../components/sections/ComingSoon';

const LiveShop: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16 xl:px-32 2xl:px-6 py-16">
        {/* All sections */}
        <div className="space-y-16">
          <AoinLive layout="row" />
          <ComingSoon layout="row" />
         
        </div>
      </div>
    </div>
  );
};

export default LiveShop;