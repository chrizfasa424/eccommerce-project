import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/globals.css';
import Header from '../components/shop/shop1/Header';
import Hero from '../components/shop/shop1/Productpage/Hero';
// import FashionCardsSection from '../components/shop/shop1/Productpage/FashionCardsSection';
// import RatingsReviews from '../components/shop/shop1/Productpage/Rating';
import SimilarProducts from '../components/shop/shop1/Productpage/SimilarProducts';
import InstagramPromo from '../components/shop/shop1/Productpage/InstagramPromo';
import shop1ApiService, { Product } from '../services/shop1ApiService';

function Shop1ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Use the proper API call for individual product
        const response = await shop1ApiService.getProductById(parseInt(id));
        
        if (response && response.success) {
          setProduct(response.product);
          setRelatedProducts(response.related_products || []);
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      
      <Hero productData={product} />
      {/* <FashionCardsSection /> */}
      {/* <RatingsReviews /> */}
      <SimilarProducts relatedProducts={relatedProducts} />
      <InstagramPromo />
    </div>  
  );
}

export default Shop1ProductPage;