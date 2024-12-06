import { Product, Category } from '../types';
import { featuredProductsData } from './featuredProductsData';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and immersive sound. Enjoy crisp audio and comfort for extended listening sessions.',
    price: 249.99,
    originalPrice: 299.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'electronics',
    featured: true,
    rating: 4.8,
    reviews: 245,
    stock: 15,
    tags: ['headphones', 'audio', 'wireless']
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    description: 'Track your fitness goals, receive notifications, and stay connected with this premium smartwatch. Water-resistant and long battery life.',
    price: 399.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'electronics',
    featured: true,
    rating: 4.6,
    reviews: 189,
    stock: 10,
    tags: ['smartwatch', 'wearable', 'fitness']
  },
  {
    id: '3',
    name: 'Ultra HD 4K Television',
    description: 'Experience stunning visuals with this Ultra HD 4K television. Smart features allow streaming from all your favorite services.',
    price: 1299.99,
    originalPrice: 1499.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5721903/pexels-photo-5721903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    rating: 4.7,
    reviews: 156,
    stock: 5,
    tags: ['tv', '4k', 'entertainment']
  },
  {
    id: '4',
    name: 'Modern Leather Sofa',
    description: 'Elegant and comfortable leather sofa perfect for any living room. Durable construction with premium materials.',
    price: 899.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'furniture',
    featured: true,
    rating: 4.5,
    reviews: 78,
    stock: 3,
    tags: ['sofa', 'furniture', 'living room']
  },
  {
    id: '5',
    name: 'Premium Coffee Maker',
    description: 'Start your day right with this premium coffee maker. Multiple brewing options and timer functionality.',
    price: 129.99,
    originalPrice: 149.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'home',
    rating: 4.3,
    reviews: 102,
    stock: 20,
    tags: ['coffee', 'kitchen', 'appliance']
  },
  {
    id: '6',
    name: 'Designer Watch Collection',
    description: 'Elegant timepieces for the discerning individual. These designer watches combine style with precision.',
    price: 299.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'fashion',
    featured: true,
    rating: 4.9,
    reviews: 67,
    stock: 8,
    tags: ['watch', 'fashion', 'accessories']
  },
  {
    id: '7',
    name: 'Casual Denim Jacket',
    description: 'Versatile denim jacket perfect for any casual outfit. Durable material and comfortable fit.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'clothing',
    rating: 4.2,
    reviews: 45,
    stock: 25,
    tags: ['jacket', 'denim', 'casual']
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this water-resistant portable speaker. Powerful sound in a compact design.',
    price: 79.99,
    originalPrice: 99.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    rating: 4.4,
    reviews: 132,
    stock: 18,
    tags: ['speaker', 'bluetooth', 'portable']
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'electronics',
    description: 'The latest gadgets and electronic devices for home and personal use.',
    productCount: 32
  },
  {
    id: '2',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'clothing',
    description: 'Fashionable clothing for men, women, and children.',
    productCount: 47
  },
  {
    id: '3',
    name: 'Home & Living',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'home-living',
    description: 'Everything you need to make your house a home.',
    productCount: 28
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    image: 'https://images.pexels.com/photos/3872522/pexels-photo-3872522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'sports',
    description: 'Equipment and apparel for all your sporting and outdoor adventures.',
    productCount: 22
  },
  {
    id: '5',
    name: 'Beauty & Health',
    image: 'https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'beauty',
    description: 'Premium cosmetics, skincare, and health products for your well-being.',
    productCount: 19
  },
  {
    id: '6',
    name: 'Toys & Games',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'toys',
    description: 'Fun toys and games for children of all ages.',
    productCount: 15
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  // First try to find in the main products array
  const foundProduct = products.find(product => product.id === id);
  
  // If not found, try in the featured products data
  if (!foundProduct) {
    return featuredProductsData.find(product => 
      product.id === id || 
      product.id === String(id) || 
      String(product.id) === id
    );
  }
  
  return foundProduct;
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerms = query.toLowerCase().split(' ');
  return products.filter(product => {
    const nameMatch = searchTerms.some(term => 
      product.name.toLowerCase().includes(term)
    );
    const descMatch = searchTerms.some(term => 
      product.description.toLowerCase().includes(term)
    );
    const tagMatch = product.tags?.some(tag => 
      searchTerms.some(term => tag.toLowerCase().includes(term))
    );
    
    return nameMatch || descMatch || tagMatch;
  });
};