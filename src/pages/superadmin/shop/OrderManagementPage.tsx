import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PrinterIcon, LockClosedIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';

// Dummy order data with details
const DUMMY_ORDERS = [
  {
    order_id: 'ORD-20250715054041-76C63D',
    order_date: '2025-07-15T05:40:41Z',
    shop_id: 1,
    shop_name: 'Luxe Hub',
    shipping_address_details: {
      address_line1: '102 B mahalaxmi nagar indore MP',
      city: 'Gwalior',
      postal_code: '474001',
    },
    items: [
      {
        name: 'Lenovo Smartchoice Yoga Slim 7 Intel Core Ultra 5 125H Built-in AI 14"(35.5cm) WUXGA-OLED 400Nits Laptop',
        sku: 'LEN-SMA-YOG-SLI-7-IN',
        price: 59999.99,
        quantity: 1,
      },
    ],
    subtotal: 50847.45,
    tax: 9152.54,
    shipping: 0.0,
    total_amount: '59999.99',
    currency: 'INR',
    order_status: 'PENDING_PAYMENT',
    payment_status: 'PENDING',
    payment_method: 'cash_on_delivery',
    status_history: [
      {
        status: 'PENDING_PAYMENT',
        date: '2025-07-15T05:40:41Z',
        note: 'Order created.'
      }
    ]
  },
  // ... other orders ...
];

const statusBadge = (status: string) => {
  let color = '';
  switch (status) {
    case 'DELIVERED': color = 'bg-emerald-100 text-emerald-800'; break;
    case 'SHIPPED': color = 'bg-sky-100 text-sky-800'; break;
    case 'PROCESSING': color = 'bg-amber-100 text-amber-800'; break;
    case 'PENDING_PAYMENT': color = 'bg-orange-100 text-orange-800'; break;
    case 'CANCELLED': color = 'bg-rose-100 text-rose-800'; break;
    case 'SUCCESSFUL': color = 'bg-emerald-100 text-emerald-800'; break;
    case 'FAILED': color = 'bg-rose-100 text-rose-800'; break;
    case 'REFUNDED': color = 'bg-purple-100 text-purple-800'; break;
    case 'PENDING': color = 'bg-orange-100 text-orange-800'; break;
    default: color = 'bg-gray-100 text-gray-800';
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} capitalize`}>
      {status.replace('_', ' ').toLowerCase()}
    </span>
  );
};

const OrderManagementPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = DUMMY_ORDERS.find(o => o.order_id === orderId);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-orange-600 hover:underline"><ArrowLeftIcon className="h-5 w-5 mr-1" />Back</button>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500">No order found for ID: {orderId}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-orange-600 hover:underline"><ArrowLeftIcon className="h-5 w-5 mr-1" />Back to Orders</button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Order <span className="font-mono">#{order.order_id}</span></h1>
          <button onClick={() => window.print()} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center"><PrinterIcon className="h-5 w-5 mr-2" />Print Invoice</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main Info */}
          <div className="space-y-4 lg:col-span-2">
            {/* Order Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-gray-800 mb-2">Order Status</div>
              <div className="flex flex-wrap gap-3 items-center mb-1">
                {statusBadge(order.order_status)}
                {statusBadge(order.payment_status)}
              </div>
              <div className="text-xs text-gray-500">Placed on {new Date(order.order_date).toLocaleDateString()}</div>
            </div>
            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                <LockClosedIcon className="h-5 w-5 text-orange-500" />
                Order Items ({order.items.length})
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <div className="text-gray-900 font-semibold">{order.currency} {item.price.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
                      <div className="text-xs text-gray-500">( {item.quantity} × {order.currency} {item.price.toLocaleString(undefined, {minimumFractionDigits:2})} )</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Status History */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-gray-800 mb-2">Status History</div>
              <div className="space-y-2">
                {order.status_history.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                    <div>
                      <div className="font-medium text-gray-700 text-sm">{h.status.replace('_', ' ').toLowerCase()}</div>
                      <div className="text-xs text-gray-500">{new Date(h.date).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{h.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Summary & Info */}
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="font-semibold text-gray-800 mb-2">Order Summary</div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{order.currency} {order.subtotal.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{order.currency} {order.tax.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{order.currency} {order.shipping.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2"><span>Total</span><span>{order.currency} {parseFloat(order.total_amount).toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
              </div>
            </div>
            {/* Customer Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2"><UserIcon className="h-5 w-5 text-orange-500" /> Customer Information</div>
              <div className="text-sm">
                <div className="font-medium">Shipping Address</div>
                <div>{order.shipping_address_details.address_line1}</div>
                <div>{order.shipping_address_details.city} {order.shipping_address_details.postal_code ? ', ' + order.shipping_address_details.postal_code : ''}</div>
              </div>
            </div>
            {/* Payment Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2"><CreditCardIcon className="h-5 w-5 text-orange-500" /> Payment Information</div>
              <div className="text-sm">
                <div className="font-medium">Payment Method</div>
                <div>{order.payment_method.replace('_', ' ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Printable Invoice Section */}
      {order && (
        <div className="print-invoice screen-hidden watermark-bg" style={{position: 'relative', zIndex: 1}}>
          <h2 className="text-2xl font-bold mb-2">Invoice</h2>
          <div className="mb-2">
            <strong>Order ID:</strong> {order.order_id}<br/>
            <strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}<br/>
            <strong>Customer:</strong> {order.shipping_address_details.address_line1}, {order.shipping_address_details.city} {order.shipping_address_details.postal_code}
          </div>
          <hr className="my-2" />
          <table className="w-full text-sm mb-4 border-collapse">
            <tbody>
              {order.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <th className="border-b text-left">Item</th>
                    <td className="border-b text-left" colSpan={3}>{item.name}</td>
                  </tr>
                  <tr>
                    <th className="border-b text-left">Qty</th>
                    <td className="border-b text-left" colSpan={3}>{item.quantity}</td>
                  </tr>
                  <tr>
                    <th className="border-b text-left">Price</th>
                    <td className="border-b text-left" colSpan={3}>{order.currency} {item.price.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                  </tr>
                  <tr>
                    <th className="border-b text-left">Total</th>
                    <td className="border-b text-left" colSpan={3}>{order.currency} {(item.price * item.quantity).toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                  </tr>
                  
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="text-right space-y-1">
            <div>Subtotal: {order.currency} {order.subtotal.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
            <div>Tax: {order.currency} {order.tax.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
            <div>Shipping: {order.currency} {order.shipping.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
            <div className="font-bold">Total: {order.currency} {parseFloat(order.total_amount).toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage; 