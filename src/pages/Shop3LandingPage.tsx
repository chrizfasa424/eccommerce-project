import React from 'react';
import '../styles/globals.css';
import Aoinpeople from '../components/shop/shop3/AoinPeople';
import Aoinfashion from '../components/shop/shop3/AoinFashion';
import Aoinmasteriece from '../components/shop/shop3/AoinMasteriece';
import Sydneycity from '../components/shop/shop3/SydneyCity';
import AoinCatalog from '../components/shop/shop3/AoinCatalog';
import AoinJoinus from '../components/shop/shop3/AoinJoinUs';

function Shop3LandingPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Aoinpeople />
      <Aoinfashion />
      <Aoinmasteriece />
     <Sydneycity/>
     <AoinCatalog/>
     <AoinJoinus />
    </div>  
  );
}

export default Shop3LandingPage;