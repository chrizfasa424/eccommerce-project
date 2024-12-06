import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/globals.css';
import Header from '../components/shop/shop2/Productpage/Header';
import ProductDetail from '../components/shop/shop2/Productpage/ProductDetail';
import SimilarProducts from '../components/shop/shop2/Productpage/SimilarProducts';

function Shop2Productpage() {
  const { productId } = useParams<{ productId: string }>();

  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      <ProductDetail />
   
      <SimilarProducts currentProductId={productId ? Number(productId) : undefined} />
    </div>  
  );
}

export default Shop2Productpage;