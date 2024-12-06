import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Plan {
  plan_id: number;
  name: string;
}

interface PlanSummary {
  plan_name: string;
  merchant_count: number;
}

interface SubscriptionSummary {
  total_subscribed_merchants: number;
  plan_summary: PlanSummary[];
}

interface Merchant {
  id: number;
  business_name: string;
  business_email: string;
  subscription_plan: string;
  subscription_started_at: string;
  subscription_expires_at: string;
  slots_used: number;
  slots_vacant: number;
}

const MerchantSubscription = () => {
    const [summary, setSummary] = useState<SubscriptionSummary | null>(null);
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [allPlans, setAllPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ plan_id: '', start_date: '', end_date: '' });
    const [sort, setSort] = useState({ sort_by: 'subscription_started_at', sort_order: 'desc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                if (!access_token) {
                    throw new Error('No token found');
                }

                const headers = {
                    'Authorization': `Bearer ${access_token}`,
                };

                const summaryResponse = await fetch(`${API_BASE_URL}/api/superadmin/merchant-subscriptions/summary`, { headers });
                if (!summaryResponse.ok) throw new Error('Failed to fetch summary');
                const summaryData: SubscriptionSummary = await summaryResponse.json();
                setSummary(summaryData);

                const plansResponse = await fetch(`${API_BASE_URL}/api/superadmin/subscription/plans`, { headers });
                if (!plansResponse.ok) throw new Error('Failed to fetch plans');
                const plansData = await plansResponse.json();
                setAllPlans(plansData);

                const query = new URLSearchParams({
                    ...filters,
                    ...sort,
                }).toString();
                const merchantsResponse = await fetch(`${API_BASE_URL}/api/superadmin/merchant-subscriptions?${query}`, { headers });
                if (!merchantsResponse.ok) throw new Error('Failed to fetch merchants');
                const merchantsData: { merchants: Merchant[] } = await merchantsResponse.json();
                setMerchants(merchantsData.merchants);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters, sort]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const planSummaryMap = new Map(summary?.plan_summary.map(p => [p.plan_name, p.merchant_count]));

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-4">Merchant Subscriptions</h1>

            {/* Bento Grid Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Subscribed Merchants</h2>
                    <p className="text-3xl font-bold">{summary?.total_subscribed_merchants}</p>
                </div>
                {allPlans.map((plan: Plan) => (
                    <div key={plan.plan_id} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">{plan.name}</h2>
                        <p className="text-3xl font-bold">{planSummaryMap.get(plan.name) || 0}</p>
                    </div>
                ))}
            </div>

            {/* Filters and Sorting */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select onChange={(e) => setFilters({ ...filters, plan_id: e.target.value })} className="p-2 border rounded">
                    <option value="">All Plans</option>
                    {allPlans.map(plan => <option key={plan.plan_id} value={plan.plan_id}>{plan.name}</option>)}
                </select>
                <input type="date" onChange={(e) => setFilters({ ...filters, start_date: e.target.value })} className="p-2 border rounded" />
                <input type="date" onChange={(e) => setFilters({ ...filters, end_date: e.target.value })} className="p-2 border rounded" />
                <select onChange={(e) => setSort({ ...sort, sort_by: e.target.value })} className="p-2 border rounded">
                    <option value="subscription_started_at">Start Date</option>
                    <option value="subscription_expires_at">End Date</option>
                    <option value="business_name">Business Name</option>
                </select>
                <select onChange={(e) => setSort({ ...sort, sort_order: e.target.value })} className="p-2 border rounded">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Merchants Table */}
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots Used</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots Vacant</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {merchants.map((merchant: Merchant) => (
                            <tr key={merchant.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{merchant.business_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{merchant.business_email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{merchant.subscription_plan}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(merchant.subscription_started_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(merchant.subscription_expires_at).toLocaleDateString()}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{merchant.slots_used}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{merchant.slots_vacant}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MerchantSubscription;
