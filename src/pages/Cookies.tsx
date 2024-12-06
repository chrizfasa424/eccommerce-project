import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Cookie Policy</h1>
          <p className="text-gray-600 text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p>
              This Cookie Policy explains how AUIN ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, AUIN) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
            
            <h2>Why Do We Use Cookies?</h2>
            <p>
              We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
            </p>
            
            <h2>Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
            </p>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.
            </p>
            <ul>
              <li><strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.</li>
              <li><strong>Persistent Cookies:</strong> These cookies remain on your device until you delete them or they expire.</li>
            </ul>
            
            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            <ul>
              <li><strong>Analytics Cookies:</strong> We use analytics cookies to collect information about how visitors use our site, including which pages visitors go to most often and if they receive error messages from certain pages.</li>
              <li><strong>Customization Cookies:</strong> These cookies allow us to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features.</li>
            </ul>
            
            <h3>Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </p>
            <ul>
              <li><strong>Social Media Cookies:</strong> These cookies are used to enable you to share pages and content on our Website through third-party social media networks.</li>
              <li><strong>Marketing Cookies:</strong> These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you.</li>
            </ul>
            
            <h2>How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided below.
            </p>
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-blue-600 hover:underline">http://www.youronlinechoices.com</a>.
            </p>
            
            <h2>What About Other Tracking Technologies?</h2>
            <p>
              Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Website or opened an e-mail that we have sent them. This allows us, for example, to monitor the traffic patterns of users from one page within our Website to another, to deliver or communicate with cookies, to understand whether you have come to our Website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
            </p>
            
            <h2>Do You Use Flash Cookies or Local Shared Objects?</h2>
            <p>
              Our Website may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.
            </p>
            <p>
              If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" className="text-blue-600 hover:underline">Website Storage Settings Panel</a>. You can also control Flash Cookies by going to the <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html" className="text-blue-600 hover:underline">Global Storage Settings Panel</a> and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies, how to prevent Flash LSOs from being placed on your computer without your being asked, and how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).
            </p>
            
            <h2>Do You Serve Targeted Advertising?</h2>
            <p>
              Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other personally identifying details unless you choose to provide these.
            </p>
            
            <h2>How Often Will You Update This Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
            
            <h2>Where Can I Get Further Information?</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at auoinstore@gmail.com or contact us at:
            </p>
            <p>
              <strong>AUIN</strong><br />
              789 Fashion Avenue, Suite 1000<br />
              New York, NY 10018<br />
              Phone: 1-800-AUIN-HELP (1-800-284-6435)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage; 