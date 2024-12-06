import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, PieLabelRenderProps
} from 'recharts';
import { Download } from 'lucide-react';
import ExportModal from '../../../components/business/reports/ExportModal';
import toast from 'react-hot-toast';

const CHART_COLORS = {
  primary: '#FF5733',
  secondary: '#2DD4BF',
  tertiary: '#A855F7',
  quaternary: '#3B82F6',
  fifth: '#FFD600',
  sixth: '#00E676',
  seventh: '#651FFF',
  eighth: '#FF6D00',
};
const PIE_COLORS = [
  '#34D399', // green
  '#6EE7B7', // light green
  '#FFD600', // yellow
  '#7C3AED', // purple
  '#00E676', // bright green
  '#FF6D00', // orange
  '#A855F7', // violet
  '#3B82F6', // blue
];

const STATIC_ANALYTICS: Record<string, {
  revenue: number;
  totalSold: number;
  topProduct: string;
  topCategory: string;
  averageOrderValue: number;
  conversionRate: number;
  returningCustomers: number;
  revenueTrend: { month: string; revenue: number }[];
  productSales: { name: string; sold: number }[];
  categoryDist: Array<{ name: string; value: number }>;
}> = {
  shop1: {
    revenue: 1200000,
    totalSold: 3500,
    topProduct: "Apple Watch Series 9",
    topCategory: "Wearables",
    averageOrderValue: 3428,
    conversionRate: 3.2,
    returningCustomers: 41,
    revenueTrend: [
      { month: 'Jan', revenue: 120000 },
      { month: 'Feb', revenue: 140000 },
      { month: 'Mar', revenue: 160000 },
      { month: 'Apr', revenue: 180000 },
      { month: 'May', revenue: 200000 },
      { month: 'Jun', revenue: 220000 },
    ],
    productSales: [
      { name: 'Apple Watch Series 9', sold: 1200 },
      { name: 'Apple Watch SE', sold: 900 },
      { name: 'Apple Watch Ultra', sold: 800 },
      { name: 'Apple Watch Series 8', sold: 600 },
    ],
    categoryDist: [
      { name: "Women Fashion", value: 2 },
      { name: "Men's Fashion", value: 1 },
      { name: "SportsWear", value: 1 },
      { name: "Laptop", value: 1 },
      { name: "Smartphone", value: 1 },
      { name: "Tablet's", value: 1 },
      { name: "Bluetooth H", value: 1 },
    ],
  },
  shop2: {
    revenue: 850000,
    totalSold: 2100,
    topProduct: "MacBook Pro 16",
    topCategory: "Laptops",
    averageOrderValue: 4047,
    conversionRate: 2.7,
    returningCustomers: 33,
    revenueTrend: [
      { month: 'Jan', revenue: 90000 },
      { month: 'Feb', revenue: 110000 },
      { month: 'Mar', revenue: 120000 },
      { month: 'Apr', revenue: 140000 },
      { month: 'May', revenue: 180000 },
      { month: 'Jun', revenue: 210000 },
    ],
    productSales: [
      { name: 'MacBook Pro 16', sold: 700 },
      { name: 'MacBook Air', sold: 600 },
      { name: 'MacBook Pro 14', sold: 500 },
      { name: 'MacBook Air M2', sold: 300 },
    ],
    categoryDist: [
      { name: 'Laptops', value: 3 },
      { name: 'Accessories', value: 2 },
      { name: 'Electronics', value: 1 },
    ],
  },
  shop3: {
    revenue: 430000,
    totalSold: 900,
    topProduct: "Nike Air Max",
    topCategory: "Footwear",
    averageOrderValue: 2150,
    conversionRate: 1.9,
    returningCustomers: 19,
    revenueTrend: [
      { month: 'Jan', revenue: 40000 },
      { month: 'Feb', revenue: 50000 },
      { month: 'Mar', revenue: 60000 },
      { month: 'Apr', revenue: 70000 },
      { month: 'May', revenue: 90000 },
      { month: 'Jun', revenue: 120000 },
    ],
    productSales: [
      { name: 'Nike Air Max', sold: 400 },
      { name: 'Nike Revolution', sold: 250 },
      { name: 'Nike Pegasus', sold: 150 },
      { name: 'Nike Downshifter', sold: 100 },
    ],
    categoryDist: [
      { name: 'Footwear', value: 2 },
      { name: 'Accessories', value: 1 },
      { name: 'Sportswear', value: 1 },
    ],
  },
};

const SHOP_LIST = [
  { id: "shop1", name: "Shop 1" },
  { id: "shop2", name: "Shop 2" },
  { id: "shop3", name: "Shop 3" },
];

const PRODUCT_SALES_FILTERS = [
  { year: 2024, months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  { year: 2023, months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
];

function renderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: PieLabelRenderProps & { name: string }) {
  // Fallbacks for undefined values
  const safeCx = typeof cx === 'number' ? cx : 0;
  const safeCy = typeof cy === 'number' ? cy : 0;
  const safeOuterRadius = typeof outerRadius === 'number' ? outerRadius : 80;
  const safePercent = typeof percent === 'number' ? percent : 0;
  const safeIndex = typeof index === 'number' ? index : 0;
  const RADIAN = Math.PI / 180;
  const radius = safeOuterRadius + 18;
  const x = safeCx + radius * Math.cos(-midAngle * RADIAN);
  const y = safeCy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={PIE_COLORS[safeIndex % PIE_COLORS.length]}
      textAnchor={x > safeCx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={500}
    >
      {name} {safePercent > 0 ? `${(safePercent * 100).toFixed(0)}%` : ''}
    </text>
  );
}

const ShopAnalytics: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<string>('Jan');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const analytics = selectedShop ? STATIC_ANALYTICS[selectedShop] : null;

  // Calculate total for categoryDist for percentage
  const totalCategories = analytics ? analytics.categoryDist.reduce((sum: number, c: { name: string; value: number }) => sum + c.value, 0) : 0;

  // For demo: filter productSales by selected year/month (static, so just show all or a subset)
  let filteredProductSales = analytics ? analytics.productSales : [];
  if (selectedYear === 2024 && selectedMonth === 'Jan') {
    filteredProductSales = analytics ? analytics.productSales : [];
  } else if (selectedYear === 2024 && selectedMonth === 'Feb') {
    filteredProductSales = analytics ? analytics.productSales.slice(0, 2) : [];
  } else if (selectedYear === 2023) {
    filteredProductSales = analytics ? analytics.productSales.slice(2) : [];
  }

  const handleExportReport = async (format: string) => {
    if (!selectedShop) {
      toast.error('Please select a shop first');
      return;
    }

    try {
      setIsExporting(true);
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/superadmin/shop/export-analytics?shop=${selectedShop}&year=${selectedYear}&month=${selectedMonth}&format=${format}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to export report');
      }

      // Get filename from Content-Disposition header or create default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${selectedShop}_analytics_${selectedYear}_${selectedMonth}_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`${selectedShop} analytics exported successfully as ${format.toUpperCase()}`);
      setIsExportModalOpen(false);
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#FF4D00] text-white p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shop Analytics</h1>
          <span className="text-lg font-medium">Overview & Insights</span>
        </div>
        <button
          onClick={() => setIsExportModalOpen(true)}
          disabled={!selectedShop}
          className="flex items-center gap-2 bg-white text-[#FF4D00] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Shop Selector */}
      <div className="flex items-center gap-4">
        <label className="text-orange-900 font-semibold">Select Shop:</label>
        <select
          className="p-2 rounded border border-orange-300 focus:ring-2 focus:ring-orange-400"
          value={selectedShop}
          onChange={e => setSelectedShop(e.target.value)}
        >
          <option value="">-- Choose Shop --</option>
          {SHOP_LIST.map(shop => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics Card */}
      {selectedShop && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.topProduct}</span>
            <span className="text-gray-700">Top Selling Product</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">₹{analytics.revenue.toLocaleString()}</span>
            <span className="text-gray-700">Total Revenue</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.topCategory}</span>
            <span className="text-gray-700">Top Selling Category</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.totalSold}</span>
            <span className="text-gray-700">Total Products Sold</span>
          </div>
        </div>
      )}

      {/* Analytics Content */}
      {selectedShop && analytics ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Revenue Trend Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center min-h-[350px]">
              <h3 className="text-lg font-semibold mb-4 text-orange-700 self-start">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={analytics.revenueTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={v => `₹${v.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS.primary} strokeWidth={3} activeDot={{ r: 8 }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Product Sales Bar Chart with filters */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center min-h-[350px] w-full">
              <div className="flex flex-wrap gap-4 mb-2 w-full justify-between items-center">
                <h3 className="text-lg font-semibold text-orange-700">Products Sold</h3>
                <div className="flex gap-2 items-center">
                  <select
                    className="p-1 rounded border border-orange-300 focus:ring-2 focus:ring-orange-400"
                    value={selectedYear}
                    onChange={e => {
                      setSelectedYear(Number(e.target.value));
                      setSelectedMonth(PRODUCT_SALES_FILTERS.find(f => f.year === Number(e.target.value))?.months[0] || 'Jan');
                    }}
                  >
                    {PRODUCT_SALES_FILTERS.map(f => (
                      <option key={f.year} value={f.year}>{f.year}</option>
                    ))}
                  </select>
                  <select
                    className="p-1 rounded border border-orange-300 focus:ring-2 focus:ring-orange-400"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                  >
                    {(PRODUCT_SALES_FILTERS.find(f => f.year === selectedYear)?.months || []).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filteredProductSales} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sold" fill={CHART_COLORS.secondary} name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Categories Pie Chart with Legend */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center mt-8">
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-orange-700 self-start">Product Categories</h3>
              <ResponsiveContainer width={320} height={240}>
                <PieChart>
                  <Pie
                    data={analytics.categoryDist}
                    cx={120}
                    cy={120}
                    labelLine
                    label={renderPieLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {analytics.categoryDist.map((entry: { name: string; value: number }, index: number) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => `${v} products`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend with scroll */}
            <div className="flex-1 flex flex-col items-start justify-center pl-8 max-h-[260px] overflow-y-auto w-full">
              {analytics.categoryDist.map((cat: { name: string; value: number }, idx: number) => {
                const percent = totalCategories ? ((cat.value / totalCategories) * 100) : 0;
                return (
                  <div key={cat.name} className="flex items-center mb-4 bg-gray-50 rounded-lg px-4 py-2 w-full">
                    <span className="inline-block w-3 h-3 rounded-full mr-3" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                    <span className="font-semibold text-gray-900 mr-2">{cat.name}</span>
                    <span className="text-gray-500 mr-2">{cat.value} products</span>
                    <span className="font-bold text-gray-800 ml-auto">{percent.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-orange-400">Please select a shop to view analytics.</div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportReport}
        isExporting={isExporting}
      />
    </div>
  );
};

export default ShopAnalytics; 