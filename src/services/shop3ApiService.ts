// Shop3 API Service - Centralized API calls for Shop3
const API_BASE_URL = 'http://localhost:5110/api/public/shops/3'; // Shop ID 3 for Shop3

// All interfaces are copied from shop1ApiService for consistency
export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  short_description: string;
  full_description: string;
  meta_description?: string;
  meta_title?: string;
  meta_keywords?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  selling_price: number;
  special_price?: number;
  is_on_special_offer: boolean;
  primary_image: string;
  media?: {
    images: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    videos: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    primary_image: string;
    total_media: number;
  };
  category_id: number;
  category_name: string;
  brand_id?: number;
  brand_name?: string;
  is_in_stock: boolean;
  stock?: {
    stock_qty: number;
    min_stock_level: number;
  };
  attributes?: ProductAttribute[];
  variants?: Product[];
  has_variants?: boolean;
  variant_attributes?: VariantAttribute[];
  total_variants?: number;
  is_parent_product?: boolean;
  current_variant_attributes?: Record<string, string>;
}

export interface ProductVariant {
  variant_id: number;
  variant_sku: string;
  variant_name?: string;
  attribute_combination: Record<string, string>;
  effective_price: number;
  stock_qty: number;
  is_in_stock: boolean;
  media: {
    images: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    videos: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    primary_image: string;
    total_media: number;
  };
  primary_image: string;
}

export interface VariantAttribute {
  name: string;
  values: string[];
}

export interface VariantListResponse {
  success: boolean;
  parent_product_id: number;
  parent_product_name: string;
  variants: ProductVariant[];
  total_variants: number;
}

export interface VariantByAttributesResponse {
  success: boolean;
  variant: ProductVariant;
}

export interface AvailableAttributesResponse {
  success: boolean;
  parent_product_id: number;
  attributes: VariantAttribute[];
  total_variants: number;
}

export interface Media {
  url: string;
  type: string;
  is_primary: boolean;
}

export interface Category {
  category_id: number;
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  product_count?: number;
  image?: string;
  bgColor?: string;
  shadowColor?: string;
}

export interface Brand {
  brand_id: number;
  name: string;
  description?: string;
  logo_url?: string;
  is_active: boolean;
  product_count?: number;
}

export interface ProductAttribute {
  id: number;
  attribute_id: number;
  product_id: number;
  value: string;
  value_id?: number;
  attribute?: {
    attribute_id: number;
    name: string;
    attribute_type: string;
    category_id: number;
    category_name: string;
    shop_id: number;
    shop_name: string;
    slug: string;
    type: string;
    is_required: boolean;
    is_filterable: boolean;
    is_active: boolean;
    sort_order: number;
    description?: string;
    values?: Array<{
      value_id: number;
      attribute_id: number;
      value: string;
      sort_order: number;
      is_active: boolean;
      created_at: string;
      updated_at: string;
      deleted_at?: string;
    }>;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
  };
  attribute_value?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ProductListResponse {
  success: boolean;
  shop: {
    shop_id: number;
    name: string;
    description: string;
  };
  products: Product[];
  pagination: {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
    has_next: boolean;
    has_prev: boolean;
  };
  filters_applied: {
    category_id?: number;
    brand_id?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by: string;
    order: string;
  };
}

export interface ProductDetailResponse {
  success: boolean;
  shop: {
    shop_id: number;
    name: string;
    description: string;
  };
  product: Product;
  related_products: Product[];
}

class Shop3ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.fetchApi<{categories: Category[]}>('/categories');
      return response.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getBrands(): Promise<Brand[]> {
    try {
      const response = await this.fetchApi<{brands: Brand[]}>('/brands');
      return response.brands;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.fetchApi<{featured_products: Product[]}>(`/products/featured?limit=${limit}`);
      return response.featured_products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }

  async getProducts(options: {
    page?: number;
    per_page?: number;
    category_id?: number;
    brand_id?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by?: string;
    order?: string;
  } = {}): Promise<ProductListResponse> {
    try {
      const params = new URLSearchParams();
      if (options.page) params.append('page', options.page.toString());
      if (options.per_page) params.append('per_page', options.per_page.toString());
      if (options.category_id) params.append('category_id', options.category_id.toString());
      if (options.brand_id) params.append('brand_id', options.brand_id.toString());
      if (options.min_price) params.append('min_price', options.min_price.toString());
      if (options.max_price) params.append('max_price', options.max_price.toString());
      if (options.search) params.append('search', options.search);
      if (options.sort_by) params.append('sort_by', options.sort_by);
      if (options.order) params.append('order', options.order);
      const queryString = params.toString();
      const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
      return await this.fetchApi<ProductListResponse>(endpoint);
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        shop: { shop_id: 3, name: 'Shop 3', description: '' },
        products: [],
        pagination: {
          page: 1,
          per_page: 20,
          total_pages: 0,
          total_items: 0,
          has_next: false,
          has_prev: false
        },
        filters_applied: {
          sort_by: 'created_at',
          order: 'desc'
        }
      };
    }
  }

  async getProductById(productId: number): Promise<ProductDetailResponse | null> {
    try {
      return await this.fetchApi<ProductDetailResponse>(`/products/${productId}`);
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  }

  async getProductMedia(productId: number): Promise<{images: Media[], videos: Media[], primary_image: string}> {
    try {
      const response = await this.fetchApi<{
        media: {
          images: Media[];
          videos: Media[];
          primary_image: string;
          total_media: number;
        }
      }>(`/products/${productId}/media`);
      return {
        images: response.media.images,
        videos: response.media.videos,
        primary_image: response.media.primary_image
      };
    } catch (error) {
      console.error('Error fetching product media:', error);
      return {
        images: [],
        videos: [],
        primary_image: ''
      };
    }
  }

  async getProductsByCategory(categoryId: number, options: {
    page?: number;
    per_page?: number;
    sort_by?: string;
    order?: string;
  } = {}): Promise<ProductListResponse> {
    return this.getProducts({
      ...options,
      category_id: categoryId
    });
  }

  async searchProducts(query: string, options: {
    page?: number;
    per_page?: number;
    category_id?: number;
    brand_id?: number;
  } = {}): Promise<ProductListResponse> {
    return this.getProducts({
      ...options,
      search: query
    });
  }

  async getProductVariants(productId: number): Promise<VariantListResponse | null> {
    try {
      return await this.fetchApi<VariantListResponse>(`/products/${productId}/variants`);
    } catch (error) {
      console.error('Error fetching product variants:', error);
      return null;
    }
  }

  async getVariantByAttributes(productId: number, attributes: Record<string, string>): Promise<VariantByAttributesResponse | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/variants/by-attributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attributes })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('Error fetching variant by attributes:', error);
      return null;
    }
  }

  async getAvailableAttributes(productId: number): Promise<AvailableAttributesResponse | null> {
    try {
      return await this.fetchApi<AvailableAttributesResponse>(`/products/${productId}/attributes`);
    } catch (error) {
      console.error('Error fetching available attributes:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
const shop3ApiService = new Shop3ApiService();
export default shop3ApiService;
