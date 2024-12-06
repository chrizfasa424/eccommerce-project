export enum ProductPriceConditionType {
  LESS_THAN = "less_than",
  LESS_THAN_OR_EQUAL_TO = "less_than_or_equal_to",
  GREATER_THAN = "greater_than",
  GREATER_THAN_OR_EQUAL_TO = "greater_than_or_equal_to",
  EQUAL_TO = "equal_to",
  ANY = "any",
}

export interface GSTRule {
  id: number;
  name: string;
  description?: string | null;
  category_id: number;
  category_name?: string | null;
  price_condition_type: ProductPriceConditionType;
  price_condition_value?: string | number | null;
  gst_rate_percentage: string | number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// Simplified Category type for dropdowns
export interface BasicCategory {
  category_id: number;
  name: string;
  parent_id?: number | null;
  slug?: string;
}