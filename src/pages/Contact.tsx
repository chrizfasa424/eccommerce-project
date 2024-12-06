import React, { useState } from 'react';
import { User, ShoppingBag, CreditCard, HelpCircle, FileText, UserCheck, MessageCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const topics = [
  { key: 'order', label: 'Order Related', icon: <ShoppingBag className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { key: 'shopping', label: 'Shopping', icon: <FileText className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { key: 'account', label: 'AOIN Account', icon: <User className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { key: 'payments', label: 'Payments', icon: <CreditCard className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { key: 'sell', label: 'Sell On AOIN', icon: <UserCheck className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { key: 'others', label: 'Others', icon: <HelpCircle className="w-8 h-8 text-[#F2631F] mx-auto" /> },
];

const faqs = {
  order: [
    {
      q: 'How can I change address or phone number in Order?',
      a: 'Go to your orders, select the order, and click on “Edit Address”. Update your details and save.'
    },
    {
      q: 'How do I check the current status of my order?',
      a: 'Visit the “My Orders” section in your account to view real-time order status and tracking.'
    },
    {
      q: 'What do I do in cases of failed delivery?',
      a: 'If delivery fails, please contact our support or raise a ticket. We will assist you promptly.'
    },
    {
      q: 'Why is my order not showing?',
      a: 'Orders may take a few minutes to appear. If not visible after some time, please refresh or contact support.'
    },
  ],
  shopping: [
    {
      q: 'How do I search for products?',
      a: 'Use the search bar at the top of the page to find products by name, brand, or category.'
    },
    {
      q: 'Can I save items for later?',
      a: 'Yes, click the heart icon on any product to add it to your wishlist.'
    },
    {
      q: 'How do I apply a promo code?',
      a: 'You can enter promo codes during checkout in the “Apply Promo Code” section.'
    },
  ],
  account: [
    {
      q: 'How do I create an AOIN account?',
      a: 'Click “Sign Up” on the top right and fill in your details to create an account.'
    },
    {
      q: 'I forgot my password. What should I do?',
      a: 'Click “Forgot Password” on the sign-in page and follow the instructions to reset your password.'
    },
    {
      q: 'How do I update my profile information?',
      a: 'Go to “My Account” and click “Edit Profile” to update your information.'
    },
  ],
  payments: [
    {
      q: 'What payment methods are accepted?',
      a: 'We accept credit/debit cards, UPI, net banking, and select wallets.'
    },
    {
      q: 'Why did my payment fail?',
      a: 'Payment failures can occur due to network issues or incorrect details. Please try again or use a different method.'
    },
    {
      q: 'How do I get a payment receipt?',
      a: 'Receipts are available in the “My Orders” section after a successful payment.'
    },
  ],
  sell: [
    {
      q: 'How do I become a seller on AOIN?',
      a: 'Go to “Sell On AOIN” and complete the registration form. Our team will review and contact you.'
    },
    {
      q: 'What documents are required to sell?',
      a: 'You will need GST details, bank account information, and business verification documents.'
    },
    {
      q: 'How do I manage my products?',
      a: 'Use the seller dashboard to add, edit, or remove products from your catalog.'
    },
  ],
  others: [
    {
      q: 'How do I contact customer support?',
      a: 'Use the "Need more help?" section below or email us at auoinstore@gmail.com.'
    },
    {
      q: 'Where can I find your return policy?',
      a: 'Our return policy is available at the bottom of every page under “Policies”.'
    },
    {
      q: 'How do I unsubscribe from emails?',
      a: 'Click “Unsubscribe” at the bottom of any promotional email you receive from us.'
    },
  ],
};

const Contact: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFF7F1] py-10 px-2 font-worksans">
      {/* Sign In Prompt */}
      {!isAuthenticated && (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4 flex items-center gap-4 mb-8 border border-gray-100">
          <User className="w-8 h-8 text-[#F2631F]" />
          <div className="flex-1">
            <div className="font-semibold text-black">Getting help is easy</div>
            <div className="text-gray-500 text-sm">Sign in to get help with recent orders</div>
          </div>
          <button
            className="bg-[#F2631F] hover:bg-[#d44f12] text-white font-medium px-6 py-2 rounded-lg transition-colors"
            onClick={() => window.location.href = '/sign-in'}
          >
            Sign in
          </button>
        </div>
      )}

      {/* Browse Topics or FAQ */}
      <div className="max-w-4xl mx-auto">
        {!selectedTopic ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-black">Browse Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {topics.map((topic) => (
                <button
                  key={topic.key}
                  onClick={() => setSelectedTopic(topic.key)}
                  className="bg-white rounded-xl border border-gray-100 shadow hover:shadow-md transition-shadow flex flex-col items-center justify-center p-8 text-center group hover:border-[#F2631F] w-full"
                >
                  {topic.icon}
                  <span className="mt-4 text-base font-medium text-black group-hover:text-[#F2631F]">{topic.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
            <button
              className="flex items-center text-[#F2631F] mb-6 hover:underline"
              onClick={() => setSelectedTopic(null)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Topics
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">{topics.find(t => t.key === selectedTopic)?.label} FAQs</h2>
            <div className="space-y-6">
              {faqs[selectedTopic as keyof typeof faqs].map((faq, idx) => (
                <div key={idx} className="bg-[#FFE7DB] rounded-lg p-4 border border-[#F2631F]/20">
                  <div className="font-medium text-black mb-2">{faq.q}</div>
                  <div className="text-gray-700">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Need more help? */}
      <div className="max-w-2xl mx-auto mt-10">
        <h3 className="text-lg font-semibold mb-3 text-black">Need more help?</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-[#F2631F]" />
            <div>
              <div className="font-medium text-black">Chat with us</div>
              <div className="text-gray-500 text-sm">Get instant query assistance</div>
            </div>
          </div>
          <button
            className="ml-4 bg-[#F2631F] hover:bg-[#d44f12] text-white font-medium px-6 py-2 rounded-lg transition-colors"
            onClick={() => window.location.href = '/RaiseTicket'}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact; 