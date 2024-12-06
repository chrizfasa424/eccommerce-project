import React, { useState, useEffect } from 'react';
import PromoProducts from './PromoProducts';

const ConditionalPromoProducts: React.FC = () => {
  const [hasProducts, setHasProducts] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkForProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promo-products/?per_page=1`);
        
        if (!response.ok) {
          setHasProducts(false);
          return;
        }

        const data = await response.json();
        
        if (data.message?.products && Array.isArray(data.message.products) && data.message.products.length > 0) {
          setHasProducts(true);
        } else {
          setHasProducts(false);
        }
      } catch (error) {
        console.error('Error checking promo products:', error);
        setHasProducts(false);
      } finally {
        setLoading(false);
      }
    };

    checkForProducts();
  }, []);

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (!hasProducts) {
    return null; // Don't render the component if no products
  }

  return <PromoProducts />;
};

export default ConditionalPromoProducts; 