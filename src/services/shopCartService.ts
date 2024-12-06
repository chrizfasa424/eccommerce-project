const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export interface ShopCartItem {
  cart_item_id: number;
  shop_product_id: number;
  quantity: number;
  selected_attributes: { [key: number]: string | string[] };
  product: {
    name: string;
    price: number;
    original_price: number;
    special_price?: number;
    image_url: string;
    stock: number;
    is_deleted: boolean;
  };
}

export interface AddToShopCartPayload {
  shop_product_id: number;
  quantity: number;
  selected_attributes?: { [key: number]: string | string[] };
}

export interface UpdateShopCartQuantityPayload {
  quantity: number;
}

export class ShopCartService {
  static async getShopCartItems(shopId: number, accessToken: string): Promise<ShopCartItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/items`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch shop cart items');
    }

    const data = await response.json();
    return data.data;
  }

  static async addToShopCart(
    shopId: number, 
    payload: AddToShopCartPayload, 
    accessToken: string
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add item to shop cart');
    }

    return await response.json();
  }

  static async updateShopCartQuantity(
    shopId: number,
    cartItemId: number,
    payload: UpdateShopCartQuantityPayload,
    accessToken: string
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/update/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update shop cart item');
    }

    return await response.json();
  }

  static async removeFromShopCart(
    shopId: number,
    cartItemId: number,
    accessToken: string
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/remove/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove item from shop cart');
    }

    return await response.json();
  }

  static async clearShopCart(
    shopId: number,
    accessToken: string
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to clear shop cart');
    }

    return await response.json();
  }

  static async getShopCartDetails(
    shopId: number,
    accessToken: string
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch shop cart details');
    }

    return await response.json();
  }

  static async getUserShopCarts(accessToken: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/user/carts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user shop carts');
    }

    return await response.json();
  }
} 