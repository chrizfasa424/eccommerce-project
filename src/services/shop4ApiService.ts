// Shop4 API Service - Centralized API calls for Shop4
const API_BASE_URL = 'http://localhost:5110/api/public/shops/4'; // Shop ID 4 for Shop4 (Religious/Spiritual Store)

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
    min_stock_level?: number;
    low_stock_threshold?: number;
  };
  attributes?: ProductAttribute[];
  variants?: Product[];
  has_variants?: boolean;
  variant_attributes?: VariantAttribute[];
  available_attributes?: Record<string, string[]>;
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

export interface ProductAttribute {
  attribute_id: number;
  attribute?: {
    name: string;
    type: string;
    values?: { value: string }[];
  };
  value: string;
}

export interface Brand {
  brand_id: number;
  brand_name: string;
  brand_description?: string;
  brand_logo?: string;
  is_active: boolean;
}

export interface BackendCategory {
  category_id: number;
  name: string;
  description?: string;
  icon_url?: string;
  parent_id?: number;
  is_active: boolean;
  slug: string;
  sort_order: number;
  shop_id: number;
  shop_name: string;
  product_count: number;
  children: BackendCategory[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  category_description?: string;
  category_image?: string;
  parent_category_id?: number;
  is_active: boolean;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ProductDetailResponse {
  success: boolean;
  product: Product;
  related_products?: Product[];
}

export interface BrandsResponse {
  success: boolean;
  brands: Brand[];
  total: number;
}

export interface BackendCategoriesResponse {
  success: boolean;
  categories: BackendCategory[];
  shop: any;
  total: number;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
  total: number;
}

// Parameters interfaces
export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: 'name' | 'price' | 'created_at' | 'popularity';
  sort_order?: 'asc' | 'desc';
  in_stock_only?: boolean;
}

export interface CategoryQueryParams {
  page?: number;
  per_page?: number;
  parent_id?: number;
  active_only?: boolean;
}

export interface BrandQueryParams {
  page?: number;
  per_page?: number;
  active_only?: boolean;
}

class Shop4ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Product Methods
  async getProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    // Add parameters to query string (no need to add shop_id as it's in the base URL)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<ProductsResponse>(endpoint);
  }

  async getProductById(productId: number): Promise<ProductDetailResponse> {
    return this.makeRequest<ProductDetailResponse>(`/products/${productId}`);
  }

  async getProductsByCategory(categoryId: number, params: Omit<ProductQueryParams, 'category_id'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...params, category_id: categoryId });
  }

  async getProductsByBrand(brandId: number, params: Omit<ProductQueryParams, 'brand_id'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...params, brand_id: brandId });
  }

  async searchProducts(searchTerm: string, params: Omit<ProductQueryParams, 'search'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...params, search: searchTerm });
  }

  // Variant Methods
  async getProductVariants(productId: number): Promise<VariantListResponse> {
    return this.makeRequest<VariantListResponse>(`/products/${productId}/variants`);
  }

  async getVariantByAttributes(productId: number, attributes: Record<string, string>): Promise<VariantByAttributesResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(attributes).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    
    return this.makeRequest<VariantByAttributesResponse>(
      `/products/${productId}/variants/by-attributes?${queryParams.toString()}`
    );
  }

  async getAvailableAttributes(productId: number): Promise<AvailableAttributesResponse> {
    return this.makeRequest<AvailableAttributesResponse>(`/products/${productId}/available-attributes`);
  }

  // Helper method to map backend category to frontend format
  private mapBackendCategory(backendCategory: BackendCategory): Category {
    return {
      category_id: backendCategory.category_id,
      category_name: backendCategory.name,
      category_description: backendCategory.description,
      category_image: backendCategory.icon_url,
      parent_category_id: backendCategory.parent_id,
      is_active: backendCategory.is_active
    };
  }

  // Category Methods
  async getCategories(params: CategoryQueryParams = {}): Promise<CategoriesResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    const backendResponse = await this.makeRequest<BackendCategoriesResponse>(endpoint);
    
    // Map backend response to frontend format
    return {
      success: backendResponse.success,
      categories: backendResponse.categories.map(cat => this.mapBackendCategory(cat)),
      total: backendResponse.total
    };
  }

  async getCategoryById(categoryId: number): Promise<{ success: boolean; category: Category }> {
    return this.makeRequest<{ success: boolean; category: Category }>(`/categories/${categoryId}`);
  }

  async getRootCategories(): Promise<CategoriesResponse> {
    return this.getCategories({ active_only: true });
  }

  async getSubCategories(parentId: number): Promise<CategoriesResponse> {
    return this.getCategories({ parent_id: parentId, active_only: true });
  }

  // Brand Methods
  async getBrands(params: BrandQueryParams = {}): Promise<BrandsResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/brands${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<BrandsResponse>(endpoint);
  }

  async getBrandById(brandId: number): Promise<{ success: boolean; brand: Brand }> {
    return this.makeRequest<{ success: boolean; brand: Brand }>(`/brands/${brandId}`);
  }

  // Featured/Special Methods
  async getFeaturedProducts(limit: number = 10): Promise<ProductsResponse> {
    return this.getProducts({ per_page: limit, sort_by: 'popularity', sort_order: 'desc' });
  }

  async getNewArrivals(limit: number = 10): Promise<ProductsResponse> {
    return this.getProducts({ per_page: limit, sort_by: 'created_at', sort_order: 'desc' });
  }

  async getOnSaleProducts(limit: number = 10): Promise<ProductsResponse> {
    // This would need backend support to filter products on sale
    return this.getProducts({ per_page: limit });
  }

  async getRelatedProducts(productId: number, limit: number = 6): Promise<ProductsResponse> {
    return this.makeRequest<ProductsResponse>(`/products/${productId}/related?limit=${limit}`);
  }

  // Utility Methods
  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL.replace('/api/public/shops/4', '')}/uploads/${imagePath}`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  isProductOnSale(product: Product): boolean {
    return !!(product.special_price && product.special_price < product.price);
  }

  getDiscountPercentage(product: Product): number {
    if (!this.isProductOnSale(product)) return 0;
    return Math.round(((product.price - (product.special_price || 0)) / product.price) * 100);
  }
}

// Create and export a singleton instance
const shop4ApiService = new Shop4ApiService();
export default shop4ApiService;
