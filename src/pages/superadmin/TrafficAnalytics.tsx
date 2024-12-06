import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, Clock, TrendingUp, Users, BarChart2, PieChart as PieChartIcon, RefreshCw, Loader2, Info, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ExportModal from '../../components/business/reports/ExportModal';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the types for our traffic data
interface HourlyAnalytics {
  hour: number;
  hour_display: string;
  total_visits: number;
  unique_visitors: number;
  bounced_visits: number;
  conversions: number;
  bounce_rate: number;
  conversion_rate: number;
}

interface ConversionRateData {
  overall: {
    total_visitors: number;
    total_purchases: number;
    conversion_rate: number;
  };
  monthly_breakdown: Array<{
    month: string;
    visitors: number;
    purchases: number;
    conversion_rate: number;
  }>;
  summary: {
    average_monthly_conversion: number;
    best_month: {
      month: string;
      conversion_rate: number;
    } | null;
    worst_month: {
      month: string;
      conversion_rate: number;
    } | null;
  };
}

interface HourlyAnalyticsResponse {
  status: string;
  data: {
    hourly_breakdown: HourlyAnalytics[];
    summary: {
      total_visits: number;
      total_unique_visitors: number;
      total_bounced_visits: number;
      total_conversions: number;
      overall_bounce_rate: number;
      overall_conversion_rate: number;
      peak_hours: {
        most_visits: {
          hour: string;
          visits: number;
        };
        best_conversion: {
          hour: string;
          rate: number;
        };
      };
    };
  };
  message?: string;
}

const CHART_COLORS = {
  primary: '#FF5733',
  secondary: '#2DD4BF',
  tertiary: '#A855F7',
  quaternary: '#3B82F6',
  background: '#FFF5E6'
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
            {entry.name.includes('Rate') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MetricCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const TrafficAnalytics: React.FC = () => {
  const [hourlyData, setHourlyData] = useState<HourlyAnalytics[]>([]);
  const [summary, setSummary] = useState<HourlyAnalyticsResponse['data']['summary'] | null>(null);
  const [conversionData, setConversionData] = useState<ConversionRateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { accessToken, user } = useAuth();
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const fetchHourlyAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [analyticsResponse, conversionResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/superadmin/analytics/hourly`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }),
        fetch(`${API_BASE_URL}/api/superadmin/analytics/conversion-rate`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
      ]);

      if (!analyticsResponse.ok || !conversionResponse.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const analyticsData: HourlyAnalyticsResponse = await analyticsResponse.json();
      const conversionData: { status: string; data: ConversionRateData } = await conversionResponse.json();

      if (analyticsData.status === 'success' && conversionData.status === 'success') {
        setHourlyData(analyticsData.data.hourly_breakdown);
        setSummary(analyticsData.data.summary);
        setConversionData(conversionData.data);
      } else {
        throw new Error('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data. Please try again later.');
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !['admin', 'superadmin'].includes(user.role.toLowerCase())) {
      toast.error('Access denied. Admin role required.');
      return;
    }
    fetchHourlyAnalytics();
  }, [user, refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  const handleExportReport = async (format: string) => {
    try {
      setIsExporting(true);
      
      const response = await fetch(`${API_BASE_URL}/api/superadmin/analytics/export-traffic-report?format=${format}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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
      let filename = `traffic_analytics_report_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
      
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

      toast.success(`Traffic analytics report exported successfully as ${format.toUpperCase()}`);
      setIsExportModalOpen(false);
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="end"
        fontSize={12}
        transform={`rotate(-45, ${x}, ${y})`}
        fill="#666"
      >
        {payload.value}
      </text>
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">
          <TrendingUp size={48} />
        </div>
        <p className="text-xl font-semibold text-gray-800">Error</p>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchHourlyAnalytics}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-3 rounded-lg shadow-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Traffic Analytics</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleRefresh}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <MetricCard
          title="Total Visits"
          value={summary?.total_visits.toLocaleString()}
          subtitle={`${summary?.total_unique_visitors.toLocaleString()} unique visitors`}
          icon={Users}
          color="orange"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${summary?.overall_bounce_rate.toFixed(2)}%`}
          subtitle={`${summary?.total_bounced_visits.toLocaleString()} bounced visits`}
          icon={BarChart2}
          color="red"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionData?.overall.conversion_rate.toFixed(2)}%`}
          subtitle={`${conversionData?.overall.total_purchases.toLocaleString()} purchases from ${conversionData?.overall.total_visitors.toLocaleString()} visitors`}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Peak Hours and Best Month */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Peak Traffic Hour</h3>
            <div className="bg-orange-100 p-2 rounded-full">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{summary?.peak_hours.most_visits.hour}</p>
          <p className="text-sm text-gray-600">{summary?.peak_hours.most_visits.visits.toLocaleString()} visits</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Best Conversion Month</h3>
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{conversionData?.summary.best_month?.month || 'N/A'}</p>
          <p className="text-sm text-gray-600">{conversionData?.summary.best_month?.conversion_rate.toFixed(2)}% conversion rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Monthly Conversion</h3>
            <div className="bg-blue-100 p-2 rounded-full">
              <BarChart2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{conversionData?.summary.average_monthly_conversion.toFixed(2)}%</p>
          <p className="text-sm text-gray-600">Average conversion rate across all months</p>
        </div>
      </div>

      {/* Hourly Traffic Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Hourly Traffic Overview</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <span>Hover over the chart for detailed metrics</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hour_display"
              tick={renderCustomTick}
              interval={0}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={50} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total_visits"
              stroke={CHART_COLORS.primary}
              name="Total Visits"
              strokeWidth={2}
              dot={{ stroke: CHART_COLORS.primary, strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: CHART_COLORS.primary, strokeWidth: 2, fill: CHART_COLORS.primary }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="unique_visitors"
              stroke={CHART_COLORS.secondary}
              name="Unique Visitors"
              strokeWidth={2}
              dot={{ stroke: CHART_COLORS.secondary, strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: CHART_COLORS.secondary, strokeWidth: 2, fill: CHART_COLORS.secondary }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bounce_rate"
              stroke={CHART_COLORS.tertiary}
              name="Bounce Rate (%)"
              strokeWidth={2}
              dot={{ stroke: CHART_COLORS.tertiary, strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: CHART_COLORS.tertiary, strokeWidth: 2, fill: CHART_COLORS.tertiary }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversion_rate"
              stroke={CHART_COLORS.quaternary}
              name="Conversion Rate (%)"
              strokeWidth={2}
              dot={{ stroke: CHART_COLORS.quaternary, strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: CHART_COLORS.quaternary, strokeWidth: 2, fill: CHART_COLORS.quaternary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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

export default TrafficAnalytics;