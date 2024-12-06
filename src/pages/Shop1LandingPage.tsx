import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop1/Header';
import Hero from '../components/shop/shop1/Hero';
import ExclusiveDeals from '../components/shop/shop1/ExclusiveDeals';
import Categories from '../components/shop/shop1/Categories';
import FreshOffRunway from '../components/shop/shop1/FreshoffRunway';
import PromotionalBanners from '../components/shop/shop1/PromotionalBanners';
import OutfitCards from '../components/shop/shop1/OutfitCards';
import NewCollection from '../components/shop/shop1/NewCollection';
import AoinTrendsSection from '../components/shop/shop1/AoinTrendsSection';
import EthnicWear from '../components/shop/shop1/EthnicWear';
import FashionDesk from '../components/shop/shop1/FashionDesk';
import SubscribeSection from '../components/shop/shop1/SubscribeSection';
import Footer from '../components/shop/shop1/AllProductpage/Footer.tsx';

function Shop1LandingPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      
        <Hero />
        <ExclusiveDeals />
        <Categories />
        <FreshOffRunway />
        <PromotionalBanners />
        <OutfitCards />
        <NewCollection />
        <AoinTrendsSection />
        <EthnicWear />
        <FashionDesk />
        <SubscribeSection />
        <Footer />
    </div>  
  );
}

export default Shop1LandingPage;