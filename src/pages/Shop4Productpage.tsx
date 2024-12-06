import React from 'react';
import ProductDetail from '../components/shop/shop4/ProductPage/ProductDetail';
import Header from '../components/shop/shop4/AllProductpage/Header';
import Hero from '../components/shop/shop4/AllProductpage/Hero';
import Footer from '../components/shop/shop4/Footer';

const Shop4Productpage: React.FC = () => {
  return (
    <div className="min-h-screen w-full mx-auto bg-black text-white">
      <Header/>
      <Hero/>
      <ProductDetail/>
      <Footer/>
    </div>
  );
};

export default Shop4Productpage;