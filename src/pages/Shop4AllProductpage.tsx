import React from 'react';
import Footer from '../components/shop/shop4/Footer';
import Header from '../components/shop/shop4/AllProductpage/Header';
import AllProductPageContent from '../components/shop/shop4/AllProductpage/AllProductPageContent';

const Shop4AllProductpage: React.FC = () => {
  return (
    <div className="bg-black">
      <Header />
      <AllProductPageContent />
      <Footer />
    </div>
  );
};

export default Shop4AllProductpage;
