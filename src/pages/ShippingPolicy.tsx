import React from 'react';
import { Truck, Clock, Globe, CreditCard } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">AUIN Shipping Policy</h1>
          <p className="text-gray-600 text-center mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          {/* Quick overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Truck className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Premium Free Shipping</h3>
                <p className="text-gray-600 text-sm">
                  On all orders over $75 within the United States
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Clock className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Fast Processing</h3>
                <p className="text-gray-600 text-sm">
                  Same-day processing for orders before 2 PM EST
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Globe className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">International Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Available to 100+ countries worldwide
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <CreditCard className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Customs & Duties</h3>
                <p className="text-gray-600 text-sm">
                  May apply on international orders
                </p>
              </div>
            </div>
          </div>
          
          {/* Shipping Methods Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Shipping Methods</h2>
            
            <div className="border-t border-gray-200">
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">AUIN Standard Shipping</h3>
                <p className="text-gray-700 mb-2">
                  Delivery in 3-5 business days within the continental United States.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>Free for orders over $75</li>
                  <li>$6.95 for orders under $75</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">AUIN Express Shipping</h3>
                <p className="text-gray-700 mb-2">
                  Delivery in 2 business days within the continental United States.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>$12.95 flat rate for all orders</li>
                  <li>Order must be placed before 2 PM EST for same-day processing</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">AUIN Priority Overnight</h3>
                <p className="text-gray-700 mb-2">
                  Next business day delivery within the continental United States.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>$24.95 flat rate for all orders</li>
                  <li>Order must be placed before 1 PM EST for same-day processing</li>
                  <li>Not available for PO Boxes or APO/FPO addresses</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">International Shipping</h3>
                <p className="text-gray-700 mb-2">
                  Delivery to over 100 countries worldwide.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>Standard International: $14.99, delivery in 7-14 business days</li>
                  <li>Express International: $29.99, delivery in 3-5 business days</li>
                  <li>Customs duties and taxes may apply and are the responsibility of the recipient</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <p className="text-gray-700 mb-3">
                All orders are processed within 1-2 business days from the time of purchase. Orders placed during weekends or holidays will be processed on the next business day.
              </p>
              <p className="text-gray-700">
                Once your order has been processed and shipped, you will receive a shipping confirmation email with tracking information.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p className="text-gray-700 mb-3">
                Some products cannot be shipped to certain locations due to regulations. If this applies to an item in your order, we will notify you.
              </p>
              <p className="text-gray-700">
                We do not ship to P.O. boxes for overnight delivery or certain oversized items.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Delays</h2>
              <p className="text-gray-700 mb-3">
                While we make every effort to ship and deliver orders according to the estimated delivery times, there may be occasional delays due to weather conditions, customs issues, or other circumstances beyond our control.
              </p>
              <p className="text-gray-700">
                If there are significant delays with your order, we will contact you via email or phone.
              </p>
            </div>
            
                          <div>
                <h2 className="text-2xl font-semibold mb-4">Questions About Your Shipment?</h2>
                <p className="text-gray-700 mb-6">
                  Our dedicated shipping support team is here to help:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg inline-block">
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> <a href="mailto:auoinstore@gmail.com" className="text-blue-600 hover:underline">auoinstore@gmail.com</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> <a href="tel:+18002846435" className="text-blue-600 hover:underline">1-800-AUIN-HELP (1-800-284-6435)</a>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy; 