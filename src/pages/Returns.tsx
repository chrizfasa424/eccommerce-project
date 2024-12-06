import React from 'react';
import { RotateCcw, DollarSign, AlertCircle, ShieldCheck } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Returns & Refunds Policy</h1>
          <p className="text-gray-600 text-center mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          {/* Quick overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <RotateCcw className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">30-Day Returns</h3>
                <p className="text-gray-600 text-sm">
                  Return most items within 30 days of delivery
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <DollarSign className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Full Refunds</h3>
                <p className="text-gray-600 text-sm">
                  Get your money back to original payment method
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <AlertCircle className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Some Exceptions</h3>
                <p className="text-gray-600 text-sm">
                  Certain products have special return conditions
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <ShieldCheck className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Free Return Shipping</h3>
                <p className="text-gray-600 text-sm">
                  On defective or incorrectly shipped items
                </p>
              </div>
            </div>
          </div>
          
          {/* Return Eligibility */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Return Eligibility</h2>
            <p className="text-gray-700 mb-4">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc list-outside text-gray-700 pl-5 space-y-2 mb-6">
              <li>Within 30 days of the original purchase date</li>
              <li>In the same condition that you received it</li>
              <li>Unused and in the original packaging</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
            </ul>
            
            <p className="text-gray-700 mb-4">
              <strong>Items that cannot be returned:</strong>
            </p>
            <ul className="list-disc list-outside text-gray-700 pl-5 space-y-2">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personalized or custom-made items</li>
              <li>Intimate or sanitary goods, once opened</li>
              <li>Hazardous materials</li>
              <li>Items marked as "final sale" or "non-returnable"</li>
            </ul>
          </div>
          
          {/* Return Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Return Process</h2>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold">How to Return an Item</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Initiate a Return:</strong> Log into your account, go to "Order History", find your order and select "Return Item". Alternatively, contact our customer service team.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Receive Return Authorization:</strong> Once your return request is approved, you'll receive a Return Merchandise Authorization (RMA) number and return shipping instructions via email.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Package Your Return:</strong> Securely pack the item in its original packaging if possible. Include the RMA number and original receipt in the package.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-sm">4</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Ship Your Return:</strong> Ship your return using the shipping method specified in your return instructions. We recommend using a trackable shipping service.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-sm">5</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Wait for Processing:</strong> Once we receive your return, we'll inspect the item and process your refund within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Refunds */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Refunds</h2>
            <p className="text-gray-700 mb-4">
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
            </p>
            <p className="text-gray-700 mb-4">
              If your return is approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days. Depending on your credit card company, it may take an additional 2-10 business days for the refund to appear on your statement.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="font-semibold mb-3">Refund Methods</h3>
              <ul className="list-disc list-outside text-gray-700 pl-5 space-y-2">
                <li><strong>Original Payment Method:</strong> Credit/debit card payments will be refunded to the same card used for purchase.</li>
                <li><strong>Store Credit:</strong> If the original payment method is no longer available, or if you prefer, we can issue store credit for the amount of your purchase.</li>
                <li><strong>Gift Returns:</strong> Returns for items received as gifts will be issued as store credit if the gift receipt is provided.</li>
              </ul>
            </div>
          </div>
          
          {/* Return Shipping */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Return Shipping</h2>
            <p className="text-gray-700 mb-4">
              You will be responsible for paying the shipping costs to return your item. Shipping costs are non-refundable, and if a refund is issued, the cost of return shipping will be deducted from your refund.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Exceptions:</strong> We will cover return shipping costs in the following cases:
            </p>
            <ul className="list-disc list-outside text-gray-700 pl-5 space-y-2">
              <li>Defective items</li>
              <li>Damaged items (must be reported within 48 hours of delivery)</li>
              <li>Incorrectly shipped items (wrong item or size)</li>
            </ul>
          </div>
          
          {/* Exchanges */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Exchanges</h2>
            <p className="text-gray-700 mb-4">
              We do not process exchanges directly. If you wish to exchange an item for a different size, color, or product, please return the original item for a refund and place a new order for the desired item.
            </p>
            <p className="text-gray-700">
              This ensures the fastest processing time and avoids potential inventory issues.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Questions About Returns?</h2>
            <p className="mb-6">
              If you have any questions about our return policy or need assistance with a return, please contact our customer service team:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> <a href="mailto:returns@shopeasy.com" className="text-blue-300 hover:underline">returns@shopeasy.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+18001234567" className="text-blue-300 hover:underline">1-800-123-4567</a>
              </p>
              <p>
                <strong>Hours:</strong> Monday-Friday, 9AM-5PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns; 