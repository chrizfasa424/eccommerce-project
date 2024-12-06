import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[36px] font-medium text-[#FF4D00] text-center mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 text-center mb-12">
            Last updated: December 15, 2024
          </p>
          
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600">
                Welcome to AUIN, your trusted destination for fashion, technology, and lifestyle products. These Terms and Conditions govern your use of the AUIN website, mobile applications, and services. 
                By accessing or using our platform, you agree to be bound by these Terms. Please read them carefully before making any purchases.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Acceptance of Terms</h2>
                  <p className="text-gray-600">
                    By accessing or using the AUIN website, mobile applications, or any other features, technologies, or 
                    functionalities offered by AUIN on our platform or through any other means (collectively, "Services"), 
                    you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                    you may not access or use our Services.
                  </p>
                  <p className="text-gray-600 mt-2">
                    These Terms apply to all visitors, users, and others who access or use our Services. By using our Services, 
                    you represent that you are at least 18 years old or have parental consent to use our Services.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Changes to Terms</h2>
                  <p className="text-gray-600">
                    We reserve the right to modify these Terms at any time. We will provide notice of any material changes by 
                    updating the "Last Updated" date at the top of this page and posting the updated Terms on our website. 
                    Your continued use of the Services after such modifications will constitute your acknowledgment and acceptance 
                    of the modified Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Account Registration</h2>
                  <p className="text-gray-600 mb-4">
                    To access certain features of our Services, you may be required to register for an account. You agree to 
                    provide accurate, current, and complete information during the registration process and to update such 
                    information to keep it accurate, current, and complete.
                  </p>
                  <p className="text-gray-600 mb-4">
                    You are responsible for safeguarding your password and for all activities that occur under your account. 
                    You agree to notify AUIN immediately of any unauthorized use of your account or any other breach of security.
                  </p>
                  <p className="text-gray-600">
                    You may not create an account for anyone other than yourself, and you may not create more than one account 
                    per person. We reserve the right to terminate accounts that violate these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">User Conduct</h2>
                  <p className="text-gray-600 mb-4">
                    When using our Services, you agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others, including intellectual property rights</li>
                    <li>Use the Services for any illegal or unauthorized purpose</li>
                    <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                    <li>Attempt to gain unauthorized access to any portion of the Services</li>
                    <li>Use any robot, spider, scraper, or other automated means to access the Services</li>
                    <li>Create or submit unwanted email, comments, or other forms of commercial or harassing communications</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                    <li>Upload, post, or transmit any content that is harmful, threatening, abusive, or objectionable</li>
                    <li>Attempt to circumvent any security measures or access controls</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Products and Services</h2>
                  <p className="text-gray-600 mb-4">
                    AUIN strives to display product descriptions, images, and pricing as accurately as possible. However, 
                    we do not guarantee that all information is complete or correct. Product images are for illustrative purposes 
                    and may not reflect the exact appearance of the product.
                  </p>
                  <p className="text-gray-600 mb-4">
                    In the event of a pricing error, AUIN reserves the right to refuse or cancel any orders placed for products 
                    listed at the incorrect price. We will notify you if your order is affected by a pricing error.
                  </p>
                  <p className="text-gray-600">
                    Availability of products and delivery times shown on our website are estimates only and are not guaranteed. 
                    We reserve the right to limit the quantities of any products that we offer and to discontinue products at any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Ordering and Payment</h2>
                  <p className="text-gray-600 mb-4">
                    When you place an order, you offer to purchase the product at the price indicated. Our acceptance of your 
                    order happens when we send you an order confirmation email. We reserve the right to refuse or cancel any 
                    order for any reason at any time, including but not limited to product availability, pricing errors, or 
                    suspected fraud.
                  </p>
                  <p className="text-gray-600 mb-4">
                    You agree to provide current, complete, and accurate purchase and account information for all purchases 
                    made through our site. You agree to promptly update your account and other information, including your 
                    email address and credit card information, so that we can complete your transactions and contact you as needed.
                  </p>
                  <p className="text-gray-600">
                    All payments must be made in full at the time of purchase. We accept various payment methods including 
                    credit cards, debit cards, and digital wallets. Payment processing is handled by secure third-party providers.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping and Delivery</h2>
                  <p className="text-gray-600 mb-4">
                    AUIN will make every effort to ship products within the estimated timeframes. However, shipping times 
                    are estimates and not guarantees. AUIN is not responsible for delays due to shipping carrier issues, 
                    weather, customs, or other circumstances beyond our control.
                  </p>
                  <p className="text-gray-600">
                    For more information about our shipping practices, please review our <a href="/shipping-delivery" className="text-[#FF4D00] hover:underline">Shipping Policy</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Returns and Refunds</h2>
                  <p className="text-gray-600 mb-4">
                    AUIN offers a 30-day return policy for most items. Some products have specific return conditions that 
                    will be noted in the product description or in our Returns & Refunds Policy.
                  </p>
                  <p className="text-gray-600">
                    For detailed information on our return process, eligible items, and refund methods, please review our 
                    <a href="/return-refund" className="text-[#FF4D00] hover:underline ml-1">Returns & Refunds Policy</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Intellectual Property</h2>
                  <p className="text-gray-600 mb-4">
                    The Services and all contents, including but not limited to text, images, graphics, logos, icons, audio 
                    clips, and software, are the property of AUIN or its content suppliers and protected by United States 
                    and international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-600 mb-4">
                    The trademarks, service marks, and logos used and displayed on our Services are registered and unregistered 
                    trademarks of AUIN and others. Nothing on our Services should be construed as granting any license or 
                    right to use any trademarks without the prior written permission of AUIN.
                  </p>
                  <p className="text-gray-600">
                    You may not copy, reproduce, distribute, transmit, display, perform, publish, license, create derivative 
                    works from, transfer, or sell any information obtained from our Services without our prior written consent.
                  </p>
                </div>

                <div className="bg-[#FFF9E5] p-6 rounded-lg">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Disclaimer of Warranties</h2>
                  <p className="text-gray-700 mb-4">
                    THE SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS, AND SERVICES INCLUDED ON OR OTHERWISE MADE 
                    AVAILABLE TO YOU THROUGH THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, UNLESS OTHERWISE 
                    SPECIFIED IN WRITING. AUIN MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO 
                    THE OPERATION OF THE SERVICES, OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS, OR SERVICES INCLUDED ON OR 
                    OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICES.
                  </p>
                  <p className="text-gray-700">
                    TO THE FULL EXTENT PERMISSIBLE BY LAW, AUIN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT 
                    NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                  </p>
                </div>

                <div className="bg-[#FFF9E5] p-6 rounded-lg">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    AUIN WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SERVICES, INCLUDING, BUT 
                    NOT LIMITED TO, DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE SPECIFIED 
                    IN WRITING.
                  </p>
                  <p className="text-gray-700">
                    CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN 
                    DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY 
                    NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Indemnification</h2>
                  <p className="text-gray-600">
                    You agree to indemnify, defend, and hold harmless AUIN, its officers, directors, employees, agents, 
                    licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable 
                    attorneys' fees, resulting from any violation of these Terms or any activity related to your account 
                    (including negligent or wrongful conduct) by you or any other person accessing the Services using your account.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Privacy Policy</h2>
                  <p className="text-gray-600">
                    Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-[#FF4D00] hover:underline">Privacy Policy</a>, which also governs your use of the Services, 
                    to understand our practices regarding the collection and use of your information.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-600">
                    These Terms shall be governed by and construed in accordance with the laws of the State of New York, without 
                    giving effect to any principles of conflicts of law. Any dispute arising under or relating in any way to these 
                    Terms will be resolved exclusively in the federal or state courts located in New York County, New York, and 
                    you irrevocably consent to the jurisdiction of such courts.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Severability</h2>
                  <p className="text-gray-600">
                    If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain 
                    in full force and the invalid or unenforceable provision will be limited or eliminated to the minimum extent 
                    necessary.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Entire Agreement</h2>
                  <p className="text-gray-600">
                    These Terms, together with our Privacy Policy, Return Policy, and Shipping Policy, constitute the entire 
                    agreement between you and AUIN regarding the use of our Services and supersede all prior agreements and 
                    understandings, whether written or oral.
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="text-gray-600">
                    <p className="font-medium text-gray-900">AUIN E-commerce Platform</p>
                    <p>1658 Rosewood Lane</p>
                    <p>New York City, NY</p>
                    <p className="mt-2">
                      <span className="text-[#FF4D00]">Email:</span> auoinstore@gmail.com
                    </p>
                    <p>
                      <span className="text-[#FF4D00]">Phone:</span> 212 929 9953
                    </p>
                    <p>
                      <span className="text-[#FF4D00]">Customer Support:</span> auoinstore@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 