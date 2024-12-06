import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop3/ProductPage/Header';
import ProductPage from '../components/shop/shop3/AllProductpage/ProductPage';
import Footer from '../components/shop/shop3/AllProductpage/Footer';

function Shop3AllProductpage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      <ProductPage />
      <Footer />
    </div>  
  );
}

export default Shop3AllProductpage;