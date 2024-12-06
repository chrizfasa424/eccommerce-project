import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, Clock, Globe, AlertCircle } from 'lucide-react';

const ShippingDelivery = () => {
  const [openSection, setOpenSection] = useState<string | null>('shipping');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16 xl:px-32 2xl:px-6 py-16">
        <h1 className="text-[36px] font-medium text-[#FF4D00] mb-6">Shipping & Delivery Policy</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for choosing AUIN. We are committed to providing you with a smooth and efficient 
          delivery experience. Please read our shipping and delivery policy below to understand our shipping options, timeframes, and policies.
        </p>

        {/* Shipping Options Section */}
        <div className="mb-6 border border-gray-200 rounded-lg">
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('shipping')}
          >
            <div className="flex items-center">
              <Truck className="mr-3 text-[#FF4D00]" size={20} />
              <h2 className="text-xl font-medium text-gray-900">Shipping Options</h2>
            </div>
            {openSection === 'shipping' ? 
              <ChevronUp className="text-[#FF4D00]" size={20} /> : 
              <ChevronDown className="text-[#FF4D00]" size={20} />
            }
          </button>
          
          {openSection === 'shipping' && (
            <div className="p-4 bg-white rounded-b-lg">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Standard Shipping</h3>
                  <p className="text-gray-600">3-5 business days - $5.99</p>
                  <p className="text-gray-600">Free on orders over $50</p>
                  <p className="text-sm text-gray-500 mt-1">Most popular choice for regular orders</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Express Shipping</h3>
                  <p className="text-gray-600">1-2 business days - $12.99</p>
                  <p className="text-gray-600">Free on orders over $100</p>
                  <p className="text-sm text-gray-500 mt-1">Perfect for urgent orders</p>
                </div>
                
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 mb-2">Next Day Delivery</h3>
                  <p className="text-gray-600">Order by 2pm for next business day - $19.99</p>
                  <p className="text-sm text-gray-500 mt-1">Available for most US locations (excluding Alaska, Hawaii, and remote areas)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Timeframes Section */}
        <div className="mb-6 border border-gray-200 rounded-lg">
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('timeframes')}
          >
            <div className="flex items-center">
              <Clock className="mr-3 text-[#FF4D00]" size={20} />
              <h2 className="text-xl font-medium text-gray-900">Delivery Timeframes</h2>
            </div>
            {openSection === 'timeframes' ? 
              <ChevronUp className="text-[#FF4D00]" size={20} /> : 
              <ChevronDown className="text-[#FF4D00]" size={20} />
            }
          </button>
          
          {openSection === 'timeframes' && (
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-gray-600 mb-4">
                Delivery times are estimated based on your location and chosen shipping method. Please note that 
                these are business days (Monday-Friday, excluding holidays). Delivery times may be extended during peak seasons, holidays, or due to weather conditions.
              </p>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-gray-600">Most orders are processed within 24 hours (Monday-Friday)</p>
                  <p className="text-gray-600">Orders placed after 2pm EST may be processed the next business day</p>
                  <p className="text-gray-600">During peak seasons or promotions, processing may take 1-2 additional days</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Tracking Information</h3>
                  <p className="text-gray-600">You'll receive a tracking number via email once your order ships</p>
                  <p className="text-gray-600">You can also check order status in your account dashboard</p>
                  <p className="text-gray-600">Real-time tracking updates available through our website</p>
                </div>
                
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 mb-2">Delivery Notifications</h3>
                  <p className="text-gray-600">Email notifications sent when your order ships and when it's out for delivery</p>
                  <p className="text-gray-600">SMS notifications available for express and next-day deliveries</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* International Shipping Section */}
        <div className="mb-6 border border-gray-200 rounded-lg">
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('international')}
          >
            <div className="flex items-center">
              <Globe className="mr-3 text-[#FF4D00]" size={20} />
              <h2 className="text-xl font-medium text-gray-900">International Shipping</h2>
            </div>
            {openSection === 'international' ? 
              <ChevronUp className="text-[#FF4D00]" size={20} /> : 
              <ChevronDown className="text-[#FF4D00]" size={20} />
            }
          </button>
          
          {openSection === 'international' && (
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-gray-600 mb-4">
                We ship to most international destinations. Please be aware that international shipping may involve 
                additional customs fees, taxes, or duties that are your responsibility. These fees are not included in your order total.
              </p>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">International Standard</h3>
                  <p className="text-gray-600">7-14 business days - $14.99 to $29.99 (based on destination)</p>
                  <p className="text-gray-600">Free on orders over $150</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">International Express</h3>
                  <p className="text-gray-600">3-7 business days - $24.99 to $49.99 (based on destination)</p>
                  <p className="text-gray-600">Free on orders over $200</p>
                </div>
                
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 mb-2">Countries We Don't Ship To</h3>
                  <p className="text-gray-600">Due to shipping restrictions, we currently don't ship to certain countries including:</p>
                  <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                    <li>Cuba, Iran, North Korea, Syria</li>
                    <li>Some remote islands and territories</li>
                    <li>Countries with strict import restrictions</li>
                  </ul>
                  <p className="text-gray-600 mt-2">Please contact our customer service for the current list of restricted destinations.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Policies Section */}
        <div className="mb-6 border border-gray-200 rounded-lg">
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('policies')}
          >
            <div className="flex items-center">
              <AlertCircle className="mr-3 text-[#FF4D00]" size={20} />
              <h2 className="text-xl font-medium text-gray-900">Shipping Policies</h2>
            </div>
            {openSection === 'policies' ? 
              <ChevronUp className="text-[#FF4D00]" size={20} /> : 
              <ChevronDown className="text-[#FF4D00]" size={20} />
            }
          </button>
          
          {openSection === 'policies' && (
            <div className="p-4 bg-white rounded-b-lg">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Order Changes</h3>
                  <p className="text-gray-600">Changes to orders can only be made within 1 hour of placing your order</p>
                  <p className="text-gray-600">Contact customer service immediately to request changes</p>
                  <p className="text-gray-600">Once an order is processed for shipping, changes cannot be made</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Undeliverable Packages</h3>
                  <p className="text-gray-600">Please ensure your shipping address is correct and complete</p>
                  <p className="text-gray-600">If a package is returned as undeliverable, we'll contact you about reshipping</p>
                  <p className="text-gray-600">Additional shipping fees may apply for reshipping</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Lost or Damaged Packages</h3>
                  <p className="text-gray-600">Please report any lost or damaged items within 7 days of the expected delivery date</p>
                  <p className="text-gray-600">We'll work with you to resolve the issue promptly</p>
                  <p className="text-gray-600">Take photos of damaged items for faster processing</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Address Verification</h3>
                  <p className="text-gray-600">We use address verification systems to ensure accurate delivery</p>
                  <p className="text-gray-600">If there's a discrepancy, our customer service team may contact you</p>
                  <p className="text-gray-600">Please provide a complete and accurate shipping address</p>
                </div>
                
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 mb-2">Signature Requirements</h3>
                  <p className="text-gray-600">Orders over $200 require signature upon delivery</p>
                  <p className="text-gray-600">Express and next-day deliveries may require signature</p>
                  <p className="text-gray-600">You can authorize package release in your account settings</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Carriers Section */}
        <div className="mb-6 border border-gray-200 rounded-lg">
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('carriers')}
          >
            <div className="flex items-center">
              <Truck className="mr-3 text-[#FF4D00]" size={20} />
              <h2 className="text-xl font-medium text-gray-900">Shipping Carriers</h2>
            </div>
            {openSection === 'carriers' ? 
              <ChevronUp className="text-[#FF4D00]" size={20} /> : 
              <ChevronDown className="text-[#FF4D00]" size={20} />
            }
          </button>
          
          {openSection === 'carriers' && (
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-gray-600 mb-4">
                We partner with reliable shipping carriers to ensure your orders arrive safely and on time.
              </p>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Domestic Shipping</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• USPS (United States Postal Service)</li>
                    <li>• FedEx Ground and Express</li>
                    <li>• UPS Ground and 2nd Day Air</li>
                    <li>• DHL Express (for select locations)</li>
                  </ul>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">International Shipping</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• FedEx International</li>
                    <li>• UPS Worldwide</li>
                    <li>• DHL Express International</li>
                    <li>• USPS International (for select countries)</li>
                  </ul>
                </div>
                
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 mb-2">Carrier Selection</h3>
                  <p className="text-gray-600">We automatically select the best carrier based on your location and shipping method</p>
                  <p className="text-gray-600">You can specify a preferred carrier in your account settings</p>
                  <p className="text-gray-600">Some carriers may not be available for all destinations</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-[#FFF9E5] border border-[#FF4D00]/20 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Need More Help?</h2>
          <p className="text-gray-700 mb-3">
            If you have any questions about shipping or delivery, please contact our customer service team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700"><span className="font-medium">Email:</span> <span className="text-[#FF4D00]">auoinstore@gmail.com</span></p>
              <p className="text-gray-700"><span className="font-medium">Phone:</span> <span className="text-[#FF4D00]">212 929 9953</span></p>
              <p className="text-gray-700"><span className="font-medium">Hours:</span> Monday-Friday, 9 AM - 6 PM EST</p>
            </div>
            <div>
              <p className="text-gray-700"><span className="font-medium">Live Chat:</span> Available on our website</p>
              <p className="text-gray-700"><span className="font-medium">Response Time:</span> Within 2-4 hours during business hours</p>
              <p className="text-gray-700"><span className="font-medium">Emergency:</span> For urgent shipping issues, call our hotline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;