import React, { useState, useEffect } from 'react';

// Types
type Shop = {
  shop_id: number;
  name: string;
  description?: string;
};

type InventoryItem = {
  id: number;
  name: string;
  sku: string;
  shop_id: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  stock_qty: number;
  low_stock_threshold: number;
  available: number;
  is_published: boolean;
  active_flag: boolean;
};

type InventoryStats = {
  total_products: number;
  total_stock: number;
  low_stock_count: number;
  out_of_stock_count: number;
};

type Pagination = {
  total: number;
  current_page: number;
  per_page: number;
  pages: number;
};

type InventoryResponse = {
  products: InventoryItem[];
  pagination: Pagination;
};

type StockSummary = {
  shop: {
    id: number;
    name: string;
    description: string;
  };
  inventory_stats: InventoryStats;
  low_stock_products: any[];
  low_stock_count: number;
};

// Service layer for shop inventory management
class ShopInventoryService {
  private getApiBaseUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5110';
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async getShops(): Promise<Shop[]> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/shop/shops`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch shops');
    }
    
    const data = await response.json();
    return data.shops || data.data || [];
  }

  async getInventoryStats(shopId: number): Promise<InventoryStats> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/shop/${shopId}/inventory/stats`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch inventory stats');
    }
    
    return await response.json();
  }

  async getInventoryProducts(shopId: number, filters: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    brand?: string;
    stock_status?: string;
  }): Promise<InventoryResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.getApiBaseUrl()}/api/shop/${shopId}/inventory/products?${params}`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to fetch inventory data: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }

  async updateProductStock(productId: number, stockData: { stock_qty: number; low_stock_threshold: number }): Promise<any> {
    const response = await fetch(`${this.getApiBaseUrl()}/api/shop/products/${productId}/stock`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(stockData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to update stock: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }
}

const shopInventoryService = new ShopInventoryService();

const ShopInventoryManagement: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('All Categories');
  const [brand, setBrand] = useState<string>('All Brands');
  const [stockStatus, setStockStatus] = useState<string>('All Stock Status');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  // Edit modal
  const [editModal, setEditModal] = useState<{ open: boolean; product: InventoryItem } | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await shopInventoryService.getShops();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('Failed to load shops');
      }
    };
    fetchShops();
  }, []);

  // Fetch inventory data when shop is selected
  useEffect(() => {
    if (selectedShopId) {
      fetchInventoryData();
      fetchInventoryStats();
    }
  }, [selectedShopId, page, perPage, search, category, brand, stockStatus]);

  const fetchInventoryData = async () => {
    if (!selectedShopId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await shopInventoryService.getInventoryProducts(selectedShopId, {
        page,
        per_page: perPage,
        ...(search && { search }),
        ...(category !== 'All Categories' && { category }),
        ...(brand !== 'All Brands' && { brand }),
        ...(stockStatus !== 'All Stock Status' && { stock_status: stockStatus.toLowerCase().replace(' ', '_') })
      });
      
      setInventory(data.products || []);
    } catch (error: any) {
      console.error('Error fetching inventory:', error);
      setError(error.message || 'Failed to load inventory data');
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryStats = async () => {
    if (!selectedShopId) return;
    
    try {
      const data = await shopInventoryService.getInventoryStats(selectedShopId);
      setStats(data);
    } catch (error: any) {
      console.error('Error fetching inventory stats:', error);
    }
  };

  const updateProductStock = async (productId: number, stockData: { stock_qty: number; low_stock_threshold: number }) => {
    setUpdating(true);
    try {
      const updatedProduct = await shopInventoryService.updateProductStock(productId, stockData);
      
      // Update the local state
      setInventory(prev => prev.map(item => 
        item.id === productId 
          ? { 
              ...item, 
              stock_qty: stockData.stock_qty, 
              low_stock_threshold: stockData.low_stock_threshold,
              available: stockData.stock_qty
            }
          : item
      ));
      
      // Refresh stats
      fetchInventoryStats();
      
      return updatedProduct;
    } catch (error: any) {
      console.error('Error updating stock:', error);
      throw new Error(error.message || 'Failed to update stock');
    } finally {
      setUpdating(false);
    }
  };

  // Filter categories and brands from inventory data
  const categories = ['All Categories', ...Array.from(new Set(inventory.map(item => item.category.name)))];
  const brands = ['All Brands', ...Array.from(new Set(inventory.map(item => item.brand.name)))];

  // Edit modal handlers
  const openEditModal = (product: InventoryItem) => setEditModal({ open: true, product });
  const closeEditModal = () => setEditModal(null);
  
  const handleEditSave = async () => {
    if (!editModal) return;
    
    try {
      await updateProductStock(editModal.product.id, {
        stock_qty: editModal.product.stock_qty,
        low_stock_threshold: editModal.product.low_stock_threshold
      });
      closeEditModal();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock_qty === 0) return 'out of stock';
    if (item.stock_qty <= item.low_stock_threshold) return 'low stock';
    return 'in stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'out of stock':
        return 'bg-red-100 text-red-700';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'in stock':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      
      {/* Shop selector */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Shop:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedShopId ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value && value !== '') {
              const shopId = Number(value);
              if (!isNaN(shopId)) {
                setSelectedShopId(shopId);
              }
            } else {
              setSelectedShopId(null);
            }
          }}
        >
          <option value="" disabled>
            Choose a shop
          </option>
          {shops.map((shop) => (
            <option key={shop.shop_id} value={shop.shop_id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Show UI only if shop is selected */}
      {selectedShopId && (
        <>
          {/* Summary cards */}
          {stats && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
                <span className="text-orange-500 text-2xl font-bold">{stats.total_products}</span>
                <span className="text-gray-600 mt-2">Total Products</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
                <span className="text-orange-500 text-2xl font-bold">{stats.low_stock_count}</span>
                <span className="text-gray-600 mt-2">Low Stock Alerts</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
                <span className="text-orange-500 text-2xl font-bold">{stats.out_of_stock_count}</span>
                <span className="text-gray-600 mt-2">Out of Stock Items</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
                <span className="text-orange-500 text-2xl font-bold">{stats.total_stock}</span>
                <span className="text-gray-600 mt-2">Total Stock</span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4 mb-4 items-center">
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="border rounded px-3 py-2 w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="border rounded px-2 py-2" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select 
              className="border rounded px-2 py-2" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select 
              className="border rounded px-2 py-2" 
              value={stockStatus} 
              onChange={(e) => setStockStatus(e.target.value)}
            >
              {['All Stock Status', 'in stock', 'low stock', 'out of stock'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button className="ml-auto border px-4 py-2 rounded bg-white hover:bg-gray-100">
              Export
            </button>
            <button className="ml-2 px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600">
              + Add Product
            </button>
          </div>

          {/* Inventory table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <p className="mt-2 text-gray-600">Loading inventory...</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">PRODUCT NAME</th>
                    <th className="px-4 py-2 text-left">SKU</th>
                    <th className="px-4 py-2 text-left">CATEGORY</th>
                    <th className="px-4 py-2 text-left">BRAND</th>
                    <th className="px-4 py-2 text-left">STOCK QTY</th>
                    <th className="px-4 py-2 text-left">AVAILABLE</th>
                    <th className="px-4 py-2 text-left">STATUS</th>
                    <th className="px-4 py-2 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => {
                    const status = getStockStatus(item);
                    return (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.sku}</td>
                        <td className="px-4 py-2">{item.category.name}</td>
                        <td className="px-4 py-2">{item.brand.name}</td>
                        <td className="px-4 py-2">{item.stock_qty}</td>
                        <td className="px-4 py-2">{item.available}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button 
                            onClick={() => openEditModal(item)} 
                            className="text-orange-500 hover:text-orange-700"
                            disabled={updating}
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M12 20h9"/>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {inventory.length === 0 && !loading && (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {inventory.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, inventory.length)} of {inventory.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 border rounded bg-orange-500 text-white">
                  {page}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={inventory.length < perPage}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Edit Stock Modal */}
          {editModal?.open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Update Stock</h2>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Stock Quantity</label>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={editModal.product.stock_qty}
                    onChange={(e) => setEditModal((prev) => prev && ({ 
                      ...prev, 
                      product: { ...prev.product, stock_qty: Number(e.target.value) } 
                    }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Low Stock Threshold</label>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={editModal.product.low_stock_threshold}
                    onChange={(e) => setEditModal((prev) => prev && ({ 
                      ...prev, 
                      product: { ...prev.product, low_stock_threshold: Number(e.target.value) } 
                    }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    className="px-4 py-2 rounded bg-gray-100" 
                    onClick={closeEditModal}
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 rounded bg-orange-500 text-white font-semibold disabled:opacity-50" 
                    onClick={handleEditSave}
                    disabled={updating}
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopInventoryManagement; 