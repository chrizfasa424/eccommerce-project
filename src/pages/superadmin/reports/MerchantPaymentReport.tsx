import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AnalyticsCards from '../../../components/superadmin/reports/merchant-payment/AnalyticsCards';
import MerchantSearch from '../../../components/superadmin/reports/merchant-payment/MerchantSearch';
import PaymentSummaryTable from '../../../components/superadmin/reports/merchant-payment/PaymentSummaryTable';
import BulkPaymentModal from '../../../components/superadmin/reports/merchant-payment/BulkPaymentModal';
import OrderDetailsModal from '../../../components/superadmin/reports/merchant-payment/OrderDetailsModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FilterOptions {
  category: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface MerchantTransaction {
  id: number;
  order_id: string;
  merchant_id: number;
  order_amount: number;
  platform_fee_percent: number;
  platform_fee_amount: number;
  gst_on_fee_amount: number;
  payment_gateway_fee: number;
  final_payable_amount: number;
  payment_status: 'pending' | 'paid';
  settlement_date: string;
  created_at: string;
  updated_at: string;
  merchant?: {
    id: number;
    business_name: string;
    store_id: string;
    category: string;
  };
  order?: {
    order_id: string;
    order_date: string;
    total_amount: number;
  };
}

interface TransactionSummary {
  total_transactions: number;
  pending_transactions: number;
  paid_transactions: number;
  total_order_amount: number;
  total_platform_fees: number;
  total_payment_gateway_fees: number;
  total_gst: number;
  total_payable_to_merchants: number;
  pending_amount: number;
  paid_amount: number;
}

interface TransactionStatistics {
  total_transactions: number;
  total_order_amount: number;
  total_platform_fees: number;
  total_payment_gateway_fees: number;
  total_gst: number;
  total_payable: number;
  pending_amount: number;
  paid_amount: number;
  fee_distribution: {
    '5%': { count: number; amount: number };
    '4%': { count: number; amount: number };
    '3%': { count: number; amount: number };
    '2%': { count: number; amount: number };
  };
  status_distribution: {
    pending: number;
    paid: number;
  };
}

interface AnalyticsData {
  totalMerchants: number;
  totalTransferred: number;
  pendingPayouts: number;
  averagePayoutTime: number;
  payoutSuccessRate: number;
  merchantsWithPendingPayments: number;
  totalCommissionEarned: number;
  paymentTrends: {
    thisMonth: number;
    lastMonth: number;
  };
}

const MerchantPaymentReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<MerchantTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<MerchantTransaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalMerchants: 0,
    totalTransferred: 0,
    pendingPayouts: 0,
    averagePayoutTime: 0,
    payoutSuccessRate: 0,
    merchantsWithPendingPayments: 0,
    totalCommissionEarned: 0,
    paymentTrends: {
      thisMonth: 0,
      lastMonth: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [statistics, setStatistics] = useState<TransactionStatistics | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Fetch transactions from API
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.dateFrom) queryParams.append('from', filters.dateFrom);
      if (filters.dateTo) queryParams.append('to', filters.dateTo);

      const response = await fetch(`${API_BASE_URL}/api/superadmin/merchant-transactions?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.dateFrom, filters.dateTo]);

  // Fetch transaction summary
  const fetchTransactionSummary = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.dateFrom) queryParams.append('from_date', filters.dateFrom);
      if (filters.dateTo) queryParams.append('to_date', filters.dateTo);

      const response = await fetch(`${API_BASE_URL}/api/superadmin/merchant-transactions/summary?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction summary');
      }

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
    }
  }, [filters.dateFrom, filters.dateTo]);

  // Fetch transaction statistics
  const fetchTransactionStatistics = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.dateFrom) queryParams.append('from_date', filters.dateFrom);
      if (filters.dateTo) queryParams.append('to_date', filters.dateTo);

      const response = await fetch(`${API_BASE_URL}/api/superadmin/merchant-transactions/statistics?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction statistics');
      }

      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching transaction statistics:', error);
    }
  }, [filters.dateFrom, filters.dateTo]);

  // Calculate analytics from summary and statistics using useMemo
  const calculatedAnalytics = useMemo(() => {
    if (!summary || !statistics) {
      return {
        totalMerchants: 0,
        totalTransferred: 0,
        pendingPayouts: 0,
        averagePayoutTime: 3,
        payoutSuccessRate: 0,
        merchantsWithPendingPayments: 0,
        totalCommissionEarned: 0,
        paymentTrends: {
          thisMonth: 0,
          lastMonth: 0
        }
      };
    }

    return {
      totalMerchants: summary.total_transactions,
      totalTransferred: summary.paid_amount,
      pendingPayouts: summary.pending_amount,
      averagePayoutTime: 3, // Mock value - could be calculated from actual data
      payoutSuccessRate: summary.total_transactions > 0 
        ? Math.round((summary.paid_transactions / summary.total_transactions) * 100)
        : 0,
      merchantsWithPendingPayments: summary.pending_transactions,
      totalCommissionEarned: summary.total_platform_fees + summary.total_gst,
      paymentTrends: {
        thisMonth: summary.total_payable_to_merchants,
        lastMonth: summary.total_payable_to_merchants * 0.9 // Mock comparison
      }
    };
  }, [summary, statistics]);

  // Update analytics when calculatedAnalytics changes
  useEffect(() => {
    setAnalytics(calculatedAnalytics);
  }, [calculatedAnalytics]);

  // Initial data fetch - only run once
  useEffect(() => {
    fetchTransactions();
    fetchTransactionSummary();
    fetchTransactionStatistics();
  }, []); // Empty dependency array - only run on mount

  // Apply filters and search
  useEffect(() => {
    let filtered = transactions;

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.order_id.toLowerCase().includes(searchLower) ||
        String(transaction.merchant_id).toLowerCase().includes(searchLower) ||
        (transaction.merchant?.business_name?.toLowerCase().includes(searchLower)) ||
        (transaction.merchant?.store_id?.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(transaction => transaction.payment_status === filters.status);
    }

    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter(transaction => {
        const settlementDate = new Date(transaction.settlement_date);
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        if (fromDate && toDate) {
          return settlementDate >= fromDate && settlementDate <= toDate;
        } else if (fromDate) {
          return settlementDate >= fromDate;
        } else if (toDate) {
          return settlementDate <= toDate;
        }
        return true;
      });
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, filters, transactions]);

  // Refresh data when filters change - but only for date filters
  useEffect(() => {
    if (filters.dateFrom || filters.dateTo) {
      fetchTransactionSummary();
      fetchTransactionStatistics();
    }
  }, [filters.dateFrom, filters.dateTo, fetchTransactionSummary, fetchTransactionStatistics]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handleViewOrder = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderModalOpen(true);
  }, []);

  const handleBulkPayment = useCallback(async (selectedTransactionIds: number[]) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/superadmin/merchant-transactions/bulk-mark-paid`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_ids: selectedTransactionIds
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process bulk payments');
      }

      const result = await response.json();
      toast.success(`Successfully marked ${result.updated_count} transactions as paid`);
      
      // Refresh data
      await fetchTransactions();
      await fetchTransactionSummary();
      await fetchTransactionStatistics();
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error processing bulk payments:', error);
      toast.error('Failed to process bulk payments');
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchTransactionSummary, fetchTransactionStatistics]);

  // Transform transactions to merchant format for the table
  const transformTransactionsToMerchants = useCallback(() => {
    const merchantMap = new Map<number, any>();

    filteredTransactions.forEach(transaction => {
      const merchantId = transaction.merchant_id;
      
      if (!merchantMap.has(merchantId)) {
        merchantMap.set(merchantId, {
          id: merchantId.toString(),
          merchantName: transaction.merchant?.business_name || `Merchant ${merchantId}`,
          storeId: transaction.merchant?.store_id || `STORE${merchantId}`,
          category: transaction.merchant?.category || 'general',
          totalOrders: 0,
          ordersDelivered: 0,
          eligibleForPayment: 0,
          amountTransferred: 0,
          pendingAmount: 0,
          lastPaymentDate: transaction.settlement_date,
          status: transaction.payment_status,
          orders: []
        });
      }

      const merchant = merchantMap.get(merchantId);
      merchant.totalOrders++;
      
      if (transaction.payment_status === 'paid') {
        merchant.amountTransferred += transaction.final_payable_amount;
        merchant.ordersDelivered++;
      } else {
        merchant.pendingAmount += transaction.final_payable_amount;
        merchant.eligibleForPayment++;
      }

      merchant.orders.push({
        orderId: transaction.order_id,
        productName: `Order ${transaction.order_id}`,
        deliveryDate: transaction.settlement_date,
        orderAmount: transaction.order_amount,
        commission: transaction.platform_fee_amount + transaction.payment_gateway_fee + transaction.gst_on_fee_amount,
        netAmount: transaction.final_payable_amount,
        paymentStatus: transaction.payment_status
      });
    });

    return Array.from(merchantMap.values());
  }, [filteredTransactions]);

  const eligiblePayments = useMemo(() => ({
    totalAmount: filteredTransactions
      .filter(t => t.payment_status === 'pending')
      .reduce((sum, t) => sum + t.final_payable_amount, 0),
    merchantCount: new Set(
      filteredTransactions
        .filter(t => t.payment_status === 'pending')
        .map(t => t.merchant_id)
    ).size
  }), [filteredTransactions]);

  if (loading && transactions.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading merchant payment data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 sm:mb-3">
          Merchant Payment Report
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Track and manage merchant payments, view delivery status, and process eligible payments.
        </p>
      </div>

      <AnalyticsCards
        totalMerchants={analytics.totalMerchants}
        totalTransferred={analytics.totalTransferred}
        pendingPayouts={analytics.pendingPayouts}
        averagePayoutTime={analytics.averagePayoutTime}
        payoutSuccessRate={analytics.payoutSuccessRate}
        merchantsWithPendingPayments={analytics.merchantsWithPendingPayments}
        totalCommissionEarned={analytics.totalCommissionEarned}
        paymentTrends={analytics.paymentTrends}
      />

      <div className="flex flex-col gap-4 sm:gap-6 mb-6">
        <div className="w-full">
          <MerchantSearch
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={eligiblePayments.merchantCount === 0}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaMoneyBillWave className="text-xl" />
            <span>Transfer Eligible Payments</span>
          </button>
        </div>
      </div>

      <PaymentSummaryTable
        data={transformTransactionsToMerchants()}
        onViewOrder={handleViewOrder}
      />

      <BulkPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBulkPayment}
        merchants={transformTransactionsToMerchants()}
        totalAmount={eligiblePayments.totalAmount}
        merchantCount={eligiblePayments.merchantCount}
      />
      <OrderDetailsModal
        orderId={selectedOrderId}
        open={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
};

export default MerchantPaymentReport; 