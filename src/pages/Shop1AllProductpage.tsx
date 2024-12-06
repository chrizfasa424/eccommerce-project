import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop1/AllProductpage/Header';
import Productpage from '../components/shop/shop1/AllProductpage/ProductPage';
import Footer from '../components/shop/shop1/AllProductpage/Footer';

function Shop1AllProductpage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      <Productpage />
            <Footer />
    </div>  
  );
}

export default Shop1AllProductpage;