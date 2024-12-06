import React from 'react';
import Footer from '../components/shop/shop4/Footer';
import AwesomeCollection from '../components/shop/shop4/AwesomeCollection';
import CelebrateFestivals from '../components/shop/shop4/CelebrateFestivals';
import HeroOne from '../components/shop/shop4/HeroOne';
import NewCollection from '../components/shop/shop4/NewCollection';
import NewlyUpdated from '../components/shop/shop4/NewlyUpdated';
import PureGol from '../components/shop/shop4/PureGol';
import RecentProduct from '../components/shop/shop4/RecentProduct';
import TrendyDeals from '../components/shop/shop4/TrendyDeals';
import UniqueCollections from '../components/shop/shop4/UniqueCollections';

const Shop4LandingPage: React.FC = () => {
  return (
    <div className="bg-black">
      <HeroOne />
      <UniqueCollections />
      <AwesomeCollection />
      <NewlyUpdated />
      <RecentProduct />
      <TrendyDeals />
      <CelebrateFestivals />
      <PureGol />
      <NewCollection />
      <Footer />
    </div>
  );
};

export default Shop4LandingPage;
