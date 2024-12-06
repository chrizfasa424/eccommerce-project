export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images?: string[];
  category: string;
  featured?: boolean;
  favourite?: boolean;
  isNew?: boolean;
  isBuiltIn?: boolean;
  rating: number;
  reviews: number;
  stock: number;
  tags?: string[];
  primary_image?: string;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
  sku: string;
  category_id?: number;
  brand_id?: number;
  attributes?: any[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  taxId: string;
  website?: string;
  owner: {
    fullName: string;
  };
}

export interface CartItem {
  cart_item_id: number;
  cart_id?: number;
  product_id: number;
  merchant_id?: number;
  quantity: number;
  selected_attributes?: {[key: number]: string | string[]};
  is_deleted?: boolean;
  product: {
    id: string | number;
    name: string;
    sku?: string;
    price: number;
    original_price?: number;
    special_price?: number;
    image_url: string;
    stock: number;
    is_deleted?: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  description?: string;
  productCount: number;
}