import React, { useState, useEffect } from 'react';
import { FunnelIcon, EyeIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

// Dummy shops
const DUMMY_SHOPS = [
  { shop_id: 1, name: 'Luxe Hub' },
  { shop_id: 2, name: 'Prime Store' },
  { shop_id: 3, name: 'Vault Fashion' },
];

// Dummy orders
const DUMMY_ORDERS = [
  {
    order_id: 'ORD-20250715054041-76C63D',
    order_date: '2025-07-15T05:40:41Z',
    shop_id: 1,
    shop_name: 'Luxe Hub',
    shipping_address_details: { address_line1: '102 B mahalaxmi nagar indore MP', city: 'Gwalior' },
    items: [{}, {}],
    total_amount: '59999.99',
    currency: 'INR',
    order_status: 'PENDING_PAYMENT',
    payment_status: 'PENDING',
  },
  {
    order_id: 'ORD-20250710061653-9FA59F',
    order_date: '2025-07-10T06:16:53Z',
    shop_id: 2,
    shop_name: 'Prime Store',
    shipping_address_details: { address_line1: '102 B mahalaxmi nagar indore MP', city: 'Gwalior' },
    items: [{}],
    total_amount: '7513.99',
    currency: 'INR',
    order_status: 'PENDING_PAYMENT',
    payment_status: 'PENDING',
  },
  {
    order_id: 'ORD-20250710061559-59E3BD',
    order_date: '2025-07-10T06:15:59Z',
    shop_id: 3,
    shop_name: 'Vault Fashion',
    shipping_address_details: { address_line1: '102 B mahalaxmi nagar indore MP', city: 'Gwalior' },
    items: [{}],
    total_amount: '93414.97',
    currency: 'INR',
    order_status: 'PENDING_PAYMENT',
    payment_status: 'PENDING',
  },
  {
    order_id: 'ORD-20250710061242-34ED48',
    order_date: '2025-07-10T06:12:42Z',
    shop_id: 1,
    shop_name: 'Luxe Hub',
    shipping_address_details: { address_line1: '102 B mahalaxmi nagar indore MP', city: 'Gwalior' },
    items: [{}, {}, {}],
    total_amount: '556439.94',
    currency: 'INR',
    order_status: 'PENDING_PAYMENT',
    payment_status: 'PENDING',
  },
];

const STATUS_OPTIONS = [
  'All',
  'PENDING_PAYMENT',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];
const PAYMENT_OPTIONS = [
  'All',
  'PENDING',
  'SUCCESSFUL',
  'FAILED',
  'REFUNDED',
];

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = '';
  let textColor = '';
  switch (status) {
    case 'DELIVERED': bgColor = 'bg-emerald-100'; textColor = 'text-emerald-800'; break;
    case 'SHIPPED': bgColor = 'bg-sky-100'; textColor = 'text-sky-800'; break;
    case 'PROCESSING': bgColor = 'bg-amber-100'; textColor = 'text-amber-800'; break;
    case 'PENDING_PAYMENT': bgColor = 'bg-orange-100'; textColor = 'text-orange-800'; break;
    case 'CANCELLED': bgColor = 'bg-rose-100'; textColor = 'text-rose-800'; break;
    case 'SUCCESSFUL': bgColor = 'bg-emerald-100'; textColor = 'text-emerald-800'; break;
    case 'FAILED': bgColor = 'bg-rose-100'; textColor = 'text-rose-800'; break;
    case 'REFUNDED': bgColor = 'bg-purple-100'; textColor = 'text-purple-800'; break;
    case 'PENDING': bgColor = 'bg-orange-100'; textColor = 'text-orange-800'; break;
    default: bgColor = 'bg-gray-100'; textColor = 'text-gray-800';
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
    </span>
  );
};

const MobileOrderCard = ({ order, onView }: { order: any, onView: (orderId: string) => void }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{order.order_id}</h3>
        <p className="text-xs text-gray-500">{new Date(order.order_date).toLocaleDateString()}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onView(order.order_id)} className="text-orange-600 hover:text-orange-900">
          <EyeIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Shop:</span>
        <span className="text-gray-900 truncate max-w-32">{order.shop_name || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Customer:</span>
        <span className="text-gray-900 truncate max-w-32">{order.shipping_address_details?.address_line1 || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Items:</span>
        <span className="text-gray-900">{order.items.length}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Total:</span>
        <span className="text-gray-900 font-medium">{order.currency} {parseFloat(order.total_amount).toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Status:</span>
        <StatusBadge status={order.order_status} />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Payment:</span>
        <StatusBadge status={order.payment_status} />
      </div>
    </div>
  </div>
);

const ShopOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [shops] = useState(DUMMY_SHOPS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(DUMMY_ORDERS);
      setLoading(false);
    }, 500);
  }, []);

  // Filtering logic
  const filteredOrders = orders.filter(order => {
    const matchesShop = selectedShop === 'All' || String(order.shop_id) === String(selectedShop);
    const matchesStatus = selectedStatus === 'All' || order.order_status === selectedStatus;
    const matchesPayment = selectedPayment === 'All' || order.payment_status === selectedPayment;
    const matchesSearch = !searchTerm || order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) || (order.shipping_address_details?.address_line1 || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesShop && matchesStatus && matchesPayment && matchesSearch;
  });

  const tableZoomStyle = { fontSize: `${zoom}em` };
  const cellPadding = `${Math.max(0.5, 1 * zoom)}rem`;

  const handleView = (orderId: string) => {
    navigate(`/superadmin/order-management/${orderId}`);
  };

  if (loading) return (<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Shop Orders</h1>
      </div>
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="relative">
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search orders..." className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm" />
          </div>
          <select value={selectedShop} onChange={e => setSelectedShop(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm">
            <option value="All">All Shops</option>
            {shops.map(shop => <option key={shop.shop_id} value={shop.shop_id}>{shop.name}</option>)}
          </select>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm">
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status.replace('_', ' ')}</option>)}
          </select>
          <select value={selectedPayment} onChange={e => setSelectedPayment(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm">
            <option value="All">All Payment Status</option>
            {PAYMENT_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <button className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"><FunnelIcon className="h-4 w-4 mr-2" /><span className="hidden sm:inline">More Filters</span><span className="sm:hidden">Filters</span></button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
        <div className="block lg:hidden"><div className="p-4">{filteredOrders.length === 0 ? (<div className="text-center py-8"><p className="text-gray-500">No orders found</p></div>) : (<div className="space-y-4">{filteredOrders.map(order => (<MobileOrderCard key={order.order_id} order={order} onView={handleView} />))}</div>)}</div></div>
        <div className="hidden lg:block"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200" style={tableZoomStyle}><thead className="bg-gray-50"><tr>{['Order ID', 'Date', 'Shop', 'Customer', 'Items', 'Total', 'Status', 'Payment', 'Actions'].map(header => (<th key={header} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ padding: cellPadding }}><div className="flex items-center space-x-1"><span>{header}</span></div></th>))}</tr></thead><tbody className="bg-white divide-y divide-gray-200">{filteredOrders.map(order => (<tr key={order.order_id} className="hover:bg-orange-50"><td className="text-sm font-medium text-gray-900" style={{ padding: cellPadding }}>{order.order_id}</td><td className="text-sm text-gray-500" style={{ padding: cellPadding }}>{new Date(order.order_date).toLocaleDateString()}</td><td className="text-sm text-gray-900" style={{ padding: cellPadding }}>{order.shop_name || 'N/A'}</td><td className="whitespace-normal text-sm text-gray-900 max-w-xs" style={{ padding: cellPadding }}><div>{order.shipping_address_details?.address_line1 || 'N/A'}</div><div className="text-gray-500">{order.shipping_address_details?.city || 'N/A'}</div></td><td className="text-sm text-gray-500" style={{ padding: cellPadding }}>{order.items.length}</td><td className="text-sm text-gray-900" style={{ padding: cellPadding }}>{order.currency} {parseFloat(order.total_amount).toFixed(2)}</td><td style={{ padding: cellPadding }}><StatusBadge status={order.order_status} /></td><td style={{ padding: cellPadding }}><StatusBadge status={order.payment_status} /></td><td className="text-sm text-gray-500" style={{ padding: cellPadding }}><div className="flex space-x-2"><button onClick={() => handleView(order.order_id)} className="text-orange-600 hover:text-orange-900"><EyeIcon className="h-5 w-5" /></button></div></td></tr>))}</tbody></table></div></div>
        <div className="hidden lg:block fixed z-50 bottom-20 right-4 flex flex-col space-y-3"><button className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-orange-100 transition" onClick={() => setZoom(z => Math.min(2, z + 0.1))} title="Zoom In" type="button"><MagnifyingGlassPlusIcon className="w-7 h-7 text-orange-600" /></button><button className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-orange-100 transition" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} title="Zoom Out" type="button"><MagnifyingGlassMinusIcon className="w-7 h-7 text-orange-600" /></button></div>
      </div>
    </div>
  );
};

export default ShopOrders; 