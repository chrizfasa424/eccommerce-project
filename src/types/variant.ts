// src/types/variant.ts
export interface VariantMedia {
  media_id: number;
  product_id: number;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  sort_order: number;
  public_id: string | null;
  is_primary: boolean;
  file_size: number | null;
  file_name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface VariantStock {
  product_id: number;
  stock_qty: number;
  low_stock_threshold: number;
}

export interface ProductVariant {
  variant_id: number;
  parent_product_id: number;
  variant_product_id: number;
  variant_sku: string;
  variant_name?: string;
  attribute_combination: Record<string, string>;
  effective_price: number;
  effective_cost: number;
  sort_order: number;
  is_active: boolean;
  is_default: boolean;
  stock: VariantStock | null;
  media: VariantMedia[];
  primary_media: VariantMedia | null;
  media_count: number;
  has_variant_specific_media: boolean;
  created_at: string;
}

export interface VariantWithProduct extends ProductVariant {
  // Additional product info when needed
  product_name: string;
  product_description: string;
  category_name: string;
  brand_name: string;
}

export interface VariantMediaStats {
  total_count: number;
  total_size_bytes: number;
  total_size_mb: number;
  max_media_count: number;
  remaining_slots: number;
  max_size_mb: number;
  remaining_size_mb: number;
  by_type: {
    [key: string]: {
      count: number;
      size_bytes: number;
      size_mb: number;
    };
  };
}

export interface VariantMediaUploadResponse {
  uploaded_media: VariantMedia[];
  uploaded_count: number;
  message: string;
}

export interface VariantCreationData {
  sku: string;
  selling_price: number;
  cost_price?: number;
  stock_qty?: number;
  low_stock_threshold?: number;
  attributes: Record<string, string>;
  variant_name?: string;
  is_default?: boolean;
  sort_order?: number;
}

export interface BulkVariantCreationData {
  combinations: Array<{
    attributes: Record<string, string>;
    selling_price: number;
    cost_price?: number;
    stock_qty?: number;
    low_stock_threshold?: number;
    name?: string;
  }>;
}
