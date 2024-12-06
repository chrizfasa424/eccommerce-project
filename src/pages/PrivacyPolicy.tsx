import React, { useState } from 'react';

interface SectionHeaderProps {
  id: string;
  title: string;
}

interface SectionContentProps {
  id: string;
  children: React.ReactNode;
}

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState<string>("introduction");
  
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId);
  };

  const SectionHeader: React.FC<SectionHeaderProps> = ({ id, title }) => (
    <div 
      className="flex items-center justify-between p-4 cursor-pointer bg-white border-l-4 border-[#FF4D00] shadow-sm hover:bg-gray-50 transition-colors mb-2"
      onClick={() => toggleSection(id)}
    >
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      <svg 
        className={`w-5 h-5 text-[#FF4D00] transform transition-transform ${expandedSection === id ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  );
  
  const SectionContent: React.FC<SectionContentProps> = ({ id, children }) => (
    <div 
      className={`bg-white overflow-hidden transition-all duration-300 ${
        expandedSection === id 
          ? 'max-h-screen p-5 opacity-100 mb-6 border-l border-r border-b border-gray-200 shadow-sm rounded-b-lg' 
          : 'max-h-0 p-0 opacity-0'
      }`}
    >
      {children}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16 xl:px-32 2xl:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-medium text-[#FF4D00] mb-2">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At AUIN, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data when you shop with us.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <p className="text-gray-700">
            Last updated: <span className="font-medium">December 15, 2024</span>
          </p>
          <p className="text-gray-700 mt-2">
            This privacy policy applies to all users of AUIN's e-commerce platform, including our website, mobile applications, and any related services.
          </p>
        </div>
        
        <div className="space-y-2">
          <SectionHeader id="introduction" title="Introduction" />
          <SectionContent id="introduction">
            <p className="text-gray-700">
              Welcome to AUIN, your trusted destination for fashion, technology, and lifestyle products. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you visit our website, use our mobile app, make purchases, or interact with our services.
            </p>
            <p className="text-gray-700 mt-4">
              By using AUIN's platform, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </SectionContent>

          <SectionHeader id="information-collection" title="Information We Collect" />
          <SectionContent id="information-collection">
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us and information that is automatically collected when you use our services.
            </p>
            <h3 className="text-lg font-medium text-[#FF4D00] mb-2">Personal Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Name, email address, phone number, and shipping address</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Account credentials and profile information</li>
              <li>Order history, wishlist items, and shopping preferences</li>
              <li>Customer service communications and feedback</li>
              <li>Product reviews and ratings</li>
              <li>Information provided when participating in promotions or surveys</li>
            </ul>

            <h3 className="text-lg font-medium text-[#FF4D00] mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, click patterns)</li>
              <li>Location information (with your consent)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Referral sources and marketing campaign data</li>
              <li>Mobile app usage statistics and crash reports</li>
            </ul>
          </SectionContent>

          <SectionHeader id="information-use" title="How We Use Your Information" />
          <SectionContent id="information-use">
            <p className="text-gray-700 mb-4">
              We use your information to provide, improve, and personalize our services:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Processing & Fulfillment</h3>
                <p className="text-gray-700">Process orders, process payments, arrange shipping, and provide order updates.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Service</h3>
                <p className="text-gray-700">Respond to inquiries, provide support, and handle returns and refunds.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personalization</h3>
                <p className="text-gray-700">Recommend products, customize your shopping experience, and show relevant content.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing & Communications</h3>
                <p className="text-gray-700">Send promotional emails, newsletters, and updates about new products and offers.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Security & Fraud Prevention</h3>
                <p className="text-gray-700">Detect and prevent fraudulent transactions and protect our platform.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Improvement</h3>
                <p className="text-gray-700">Analyze usage patterns, improve our website, and develop new features.</p>
              </div>
            </div>
          </SectionContent>

          <SectionHeader id="information-sharing" title="How We Share Your Information" />
          <SectionContent id="information-sharing">
            <p className="text-gray-700 mb-4">
              We may share your information with trusted partners and service providers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li><strong>Payment Processors:</strong> Secure payment processing (Stripe, PayPal, etc.)</li>
              <li><strong>Shipping Partners:</strong> Order fulfillment and delivery (FedEx, UPS, USPS, etc.)</li>
              <li><strong>Technology Providers:</strong> Website hosting, analytics, and customer support tools</li>
              <li><strong>Marketing Partners:</strong> Email marketing and advertising services (with your consent)</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-[#FF4D00] p-4 rounded">
              <p className="text-gray-900 font-medium">
                AUIN does not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </div>
          </SectionContent>

          <SectionHeader id="cookies" title="Cookies and Tracking Technologies" />
          <SectionContent id="cookies">
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your shopping experience and provide personalized content.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600">Required for basic website functionality, shopping cart, and security.</p>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Cookies</h3>
                <p className="text-gray-600">Help us understand how visitors interact with our website and improve performance.</p>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-600">Remember your preferences, language settings, and shopping cart items.</p>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600">Used to deliver relevant advertisements and track campaign performance.</p>
              </div>
            </div>
            <p className="text-gray-700">
              You can manage your cookie preferences through your browser settings or our cookie consent banner.
            </p>
          </SectionContent>

          <SectionHeader id="privacy-rights" title="Your Privacy Rights" />
          <SectionContent id="privacy-rights">
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Access & Portability</h3>
                <p className="text-gray-600 text-sm">Request access to your personal information and receive a copy of your data</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Correction</h3>
                <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Deletion</h3>
                <p className="text-gray-600 text-sm">Request deletion of your personal information (with certain exceptions)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Objection & Restriction</h3>
                <p className="text-gray-600 text-sm">Object to or restrict certain processing of your information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Marketing Preferences</h3>
                <p className="text-gray-600 text-sm">Opt-out of marketing communications and control your preferences</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Data Portability</h3>
                <p className="text-gray-600 text-sm">Request transfer of your information to another service provider</p>
              </div>
            </div>
            <p className="text-gray-700">
              To exercise these rights or for any privacy-related inquiries, please contact us at:
              <br />
              Email: auoinstore@gmail.com
              <br />
              Phone: 212 929 9953
              <br />
              Address: 1658 Rosewood Lane, New York City, NY
            </p>
          </SectionContent>

          <SectionHeader id="data-security" title="Data Security" />
          <SectionContent id="data-security">
            <div className="flex items-start space-x-4">
              <div className="bg-[#FFF9E5] p-2 rounded-full">
                <svg className="w-6 h-6 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing with PCI DSS compliance</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and employee training</li>
                  <li>Data backup and disaster recovery procedures</li>
                  <li>Monitoring for suspicious activities</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but we are committed to maintaining the highest standards of data protection.
                </p>
              </div>
            </div>
          </SectionContent>

          <SectionHeader id="childrens-privacy" title="Children's Privacy" />
          <SectionContent id="childrens-privacy">
            <p className="text-gray-700">
              AUIN's services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information from our records.
            </p>
          </SectionContent>

          <SectionHeader id="international-transfers" title="International Data Transfers" />
          <SectionContent id="international-transfers">
            <p className="text-gray-700 mb-4">
              AUIN operates globally and may transfer your information to countries other than your own. When we do so, we ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy and applicable laws.
            </p>
            <p className="text-gray-700">
              For users in the European Union, we rely on adequacy decisions, standard contractual clauses, and other appropriate safeguards for international data transfers.
            </p>
          </SectionContent>

          <SectionHeader id="policy-updates" title="Updates to This Policy" />
          <SectionContent id="policy-updates">
            <p className="text-gray-700">
              We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </SectionContent>

          <SectionHeader id="contact-us" title="Contact Us" />
          <SectionContent id="contact-us">
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-[#FFF9E5] p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 font-medium">AUIN E-commerce Platform</p>
                  <p className="text-gray-700">1658 Rosewood Lane</p>
                  <p className="text-gray-700">New York City, NY</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> auoinstore@gmail.com</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> 212 929 9953</p>
                  <p className="text-gray-700"><span className="font-medium">Customer Support:</span> auoinstore@gmail.com</p>
                </div>
              </div>
            </div>
          </SectionContent>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;