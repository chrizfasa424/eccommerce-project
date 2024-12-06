const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { GSTRule, BasicCategory } from "../../types/gst";
import { ProductPriceConditionType } from "../../types/gst";

const GST_RULES_ENDPOINT = `${API_BASE_URL}/api/superadmin/gst-rules`;
const CATEGORIES_ENDPOINT = `${API_BASE_URL}/api/superadmin/categories`;

export const fetchGSTRules = async (): Promise<GSTRule[]> => {
  const response = await fetch(GST_RULES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch GST rules");
  }
  return response.json();
};

export const fetchGSTRuleById = async (ruleId: number): Promise<GSTRule> => {
  const response = await fetch(`${GST_RULES_ENDPOINT}/${ruleId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch GST rule ${ruleId}`);
  }
  return response.json();
};

export const createGSTRule = async (
  data: Partial<GSTRule>
): Promise<GSTRule> => {
  // Ensure numeric fields are numbers if they were strings from form
  const payload = {
    ...data,
    category_id: Number(data.category_id),
    gst_rate_percentage: Number(data.gst_rate_percentage),
    price_condition_value: data.price_condition_value
      ? Number(data.price_condition_value)
      : null,
  };
  const response = await fetch(GST_RULES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create GST rule");
  }
  return response.json();
};

export const updateGSTRule = async (
  ruleId: number,
  dataToUpdate: Partial<GSTRule>
): Promise<GSTRule> => {
  const payloadForBody: { [key: string]: any } = {};

  if (dataToUpdate.name !== undefined) payloadForBody.name = dataToUpdate.name;
  if (dataToUpdate.description !== undefined)
    payloadForBody.description = dataToUpdate.description;
  if (dataToUpdate.category_id !== undefined)
    payloadForBody.category_id = Number(dataToUpdate.category_id);
  if (dataToUpdate.price_condition_type !== undefined)
    payloadForBody.price_condition_type = dataToUpdate.price_condition_type;

  if (dataToUpdate.price_condition_value !== undefined) {
    payloadForBody.price_condition_value =
      dataToUpdate.price_condition_value === null
        ? null
        : Number(dataToUpdate.price_condition_value);
  } else if (
    dataToUpdate.price_condition_type === ProductPriceConditionType.ANY
  ) {
    // If type is changing to ANY and value wasn't explicitly set to null, ensure it becomes null
    payloadForBody.price_condition_value = null;
  }

  if (dataToUpdate.gst_rate_percentage !== undefined)
    payloadForBody.gst_rate_percentage = Number(
      dataToUpdate.gst_rate_percentage
    );
  if (dataToUpdate.is_active !== undefined)
    payloadForBody.is_active = dataToUpdate.is_active;
  if (dataToUpdate.start_date !== undefined)
    payloadForBody.start_date = dataToUpdate.start_date; 
  if (dataToUpdate.end_date !== undefined)
    payloadForBody.end_date = dataToUpdate.end_date; 
  const response = await fetch(`${GST_RULES_ENDPOINT}/${ruleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(payloadForBody),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to update GST rule ${ruleId}`);
  }
  return response.json();
};

export const deleteGSTRule = async (ruleId: number): Promise<void> => {
  const response = await fetch(`${GST_RULES_ENDPOINT}/${ruleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    if (response.status === 204) return;
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete GST rule ${ruleId}`);
  }
};

// Fetch categories for dropdowns in the form
export const fetchAllCategoriesForGST = async (): Promise<BasicCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/api/superadmin/categories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch categories");
  }
  const categoriesData: BasicCategory[] = await response.json();

  // Flatten categories if they are nested
  const flattenedCategories: BasicCategory[] = [];
  const flatten = (cats: any[]) => {
    cats.forEach((cat) => {
      flattenedCategories.push({
        category_id: cat.category_id,
        name: cat.name,
        parent_id: cat.parent_id,
        slug: cat.slug,
      });
      if (cat.children && cat.children.length > 0) {
        flatten(cat.children);
      }
    });
  };
  flatten(categoriesData);
  return flattenedCategories;
};
