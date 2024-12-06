import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p>
              At ShopEasy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to ShopEasy (collectively, the "Site").
            </p>
            
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2>Collection of Your Information</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            
            <h3>Personal Data</h3>
            <p>
              Personally identifiable information that you voluntarily provide to us when registering on the Site, expressing an interest in obtaining information about us or our products and services, or otherwise contacting us. This personally identifiable information may include, but is not limited to:
            </p>
            <ul>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Billing information, including credit card numbers</li>
              <li>Username and password</li>
            </ul>
            
            <h3>Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
            
            <h3>Financial Data</h3>
            <p>
              Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly with any questions.
            </p>
            
            <h3>Mobile Device Data</h3>
            <p>
              Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.
            </p>
            
            <h3>Third-Party Data</h3>
            <p>
              Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Site permission to access this information.
            </p>
            
            <h2>Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Process your orders and manage payments.</li>
              <li>Send you promotional emails and newsletters (you may unsubscribe at any time).</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Prevent fraudulent transactions and monitor against theft.</li>
              <li>Process your payments for purchases.</li>
            </ul>
            
            <h2>Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            
            <h3>By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            
            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            
            <h3>Marketing Communications</h3>
            <p>
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
            </p>
            
            <h3>Interactions with Other Users</h3>
            <p>
              If you interact with other users of the Site, those users may see your name, profile photo, and descriptions of your activity.
            </p>
            
            <h3>Online Postings</h3>
            <p>
              When you post comments, contributions, or other content to the Site, your posts may be viewed by all users and may be publicly distributed outside the Site in perpetuity.
            </p>
            
            <h3>Business Transfers</h3>
            <p>
              We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </p>
            
            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2>Cookies and Web Beacons</h2>
            <p>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. For more information on how we use cookies, please refer to our Cookie Policy posted on the Site, which is incorporated into this Privacy Policy. By using the Site, you agree to be bound by our Cookie Policy.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              The Site is not directed to anyone under the age of 13. We do not knowingly collect or solicit information from anyone under the age of 13. If we learn that we have collected personal information from a child under age 13, we will delete that information as quickly as possible. If you believe that we might have any information from a child under 13, please contact us.
            </p>
            
            <h2>Your Choices About Your Information</h2>
            <p>
              You have certain choices regarding the information we collect and how that information is used. These include:
            </p>
            <ul>
              <li>You can opt-out of receiving marketing emails from us by clicking on the unsubscribe link in the emails.</li>
              <li>You can update or correct your personal information by logging into your account or contacting us.</li>
              <li>You can request that we delete your personal information, although we may retain certain information as required by law or for legitimate business purposes.</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>ShopEasy, Inc.</strong><br />
              123 Commerce St, Suite 500<br />
              New York, NY 10001<br />
              Email: privacy@shopeasy.com<br />
              Phone: 1-800-123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 