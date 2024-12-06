import React, { useState, useEffect } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TrendData {
  month: string;
  orders: number;
  sales: number;
  visitors: number;
}

interface TrendResponse {
  status: string;
  data: TrendData[];
}

interface OrderStats {
  total_sales: {
    value: number;
    change_percent: number;
  };
  total_orders: {
    value: number;
    change_percent: number;
  };
  average_order_value: {
    value: number;
    change_percent: number;
  };
}

interface OrderStatsResponse {
  status: string;
  data: OrderStats;
}

interface RecentOrder {
  order_id: string;
  customer_name: string;
  order_date: string;
  order_status: string;
  payment_status: string;
  total_amount: number;
}

interface RecentOrdersResponse {
  status: string;
  data: RecentOrder[];
}

interface TopProduct {
  id: number;
  name: string;
  revenue: number;
  sold: number;
}

interface TopProductsResponse {
  status: string;
  data: TopProduct[];
}

// Status badges for orders
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = "";
  let textColor = "";

  switch (status.toLowerCase()) {
    case "delivered":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "shipped":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    case "processing":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "pending":
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      break;
    case "cancelled":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

interface Stat {
  name: string;
  value: string;
  change: string;
  trend: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
}

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const { accessToken, user } = useAuth();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch revenue and orders trend
      const trendResponse = await fetch(
        `${API_BASE_URL}/api/merchant-dashboard/analytics/revenue-orders-trend`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!trendResponse.ok) {
        throw new Error("Failed to fetch trend data");
      }

      const trendData: TrendResponse = await trendResponse.json();
      // console.log('Revenue Orders Trend Response:', trendData);
      if (trendData.status === "success") {
        setTrendData(trendData.data);
      }

      // Fetch order stats
      const statsResponse = await fetch(
        `${API_BASE_URL}/api/merchant-dashboard/analytics/merchant-performance`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!statsResponse.ok) {
        throw new Error("Failed to fetch order stats");
      }

      const statsData: OrderStatsResponse = await statsResponse.json();
      // console.log('Order Stats Response:', statsData);
      if (statsData.status === "success") {
        setOrderStats(statsData.data);
      }

      // Fetch recent orders
      const ordersResponse = await fetch(
        `${API_BASE_URL}/api/merchant-dashboard/analytics/recent-orders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!ordersResponse.ok) {
        throw new Error("Failed to fetch recent orders");
      }

      const ordersData: RecentOrdersResponse = await ordersResponse.json();
      // console.log('Recent Orders Response:', ordersData);
      if (ordersData.status === "success") {
        setRecentOrders(ordersData.data);
      }

      // Fetch top products
      const productsResponse = await fetch(
        `${API_BASE_URL}/api/merchant-dashboard/analytics/top-products`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!productsResponse.ok) {
        throw new Error("Failed to fetch top products");
      }

      const productsData: TopProductsResponse = await productsResponse.json();
      // console.log('Top Products Response:', productsData);
      if (productsData.status === "success") {
        setTopProducts(productsData.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "merchant") {
      toast.error("Access denied. Merchant role required.");
      return;
    }
    fetchData();
  }, [user, timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ArrowPathIcon className="h-8 w-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">
          <ClipboardDocumentCheckIcon className="h-12 w-12" />
        </div>
        <p className="text-xl font-semibold text-gray-800">Error</p>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Stats summary for KPIs
  const stats: Stat[] = [
    {
      name: "Total Sales",
      value: formatCurrency(orderStats?.total_sales?.value ?? 0),
      change: "vs last period",
      trend: orderStats?.total_sales?.change_percent ?? 0,
      icon: CurrencyDollarIcon,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
    {
      name: "Total Orders",
      value: orderStats?.total_orders?.value?.toLocaleString() ?? "0",
      change: "vs last period",
      trend: orderStats?.total_orders?.change_percent ?? 0,
      icon: ShoppingBagIcon,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
    {
      name: "Average Order Value",
      value: formatCurrency(orderStats?.average_order_value?.value ?? 0),
      change: "vs last period",
      trend: orderStats?.average_order_value?.change_percent ?? 0,
      icon: ShoppingBagIcon,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
    {
      name: "Conversion Rate",
      value: `${(
        ((orderStats?.total_orders?.value ?? 0) /
          (trendData[0]?.visitors ?? 1)) *
        100
      ).toFixed(1)}%`,
      change: "vs last period",
      trend: 0,
      icon: ClipboardDocumentCheckIcon,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
  ];
  // Custom Tooltip for Viewing full product names on hover
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow text-xs max-w-[200px] whitespace-normal break-words">
          {/* ✅ This <p> will wrap long product names */}
          <p className="font-semibold break-words text-gray-900 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name === "Revenue"
                ? formatCurrency(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  

  
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setTimeframe("daily")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeframe === "daily"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-orange-50"
            } border border-gray-300`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === "weekly"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-orange-50"
            } border-t border-b border-gray-300`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeframe === "monthly"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-orange-50"
            } border border-gray-300`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:border-orange-300 transition-colors"
          >
            <div className="flex flex-col-reverse sm:flex-row md:flex-col-reverse xl:flex-row items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.trend > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatPercentage(stat.trend)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Orders Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Sales & Orders
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name, props) => {
                    const key = props.dataKey;
                    return [
                      key === "sales" ? formatCurrency(Number(value)) : value,
                      key === "sales" ? "Sales" : "Orders",
                    ];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#4f46e5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#06b6d4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tickFormatter={(name) =>
                    name.length > 20 ? name.slice(0, 18) + "…" : name
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sold" name="Units Sold" fill="#4f46e5" />
                <Bar dataKey="revenue" name="Revenue" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          <Link
            to="/business/orders"
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(recentOrders || []).map((order) => (
                <tr
                  key={order.order_id}
                  className="hover:bg-orange-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600 hover:text-orange-700">
                    {order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.order_status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/business/orders/${order.order_id}`}
                      className="text-orange-600 hover:text-orange-700 mr-3"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
