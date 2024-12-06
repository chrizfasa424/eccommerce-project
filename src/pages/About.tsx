import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          
          {/* Hero section */}
          <div className="rounded-xl overflow-hidden mb-12">
            <img 
              src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Our Team" 
              className="w-full h-80 object-cover"
            />
          </div>
          
          {/* Our Story section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2018, ShopEasy began with a simple mission: to make online shopping truly easy and enjoyable. 
              What started as a small operation in a garage has grown into a thriving e-commerce platform serving customers worldwide.
            </p>
            <p className="text-gray-700 mb-4">
              Our founders, a team of technology enthusiasts and retail experts, noticed a gap in the market for a user-friendly, 
              all-in-one shopping platform that prioritizes customer experience. With their combined expertise, they created ShopEasy 
              to revolutionize the way people shop online.
            </p>
            <p className="text-gray-700">
              Today, we offer thousands of products across dozens of categories, working with both established brands and emerging artisans.
              Our platform continues to grow, but our core values remain the same: quality, convenience, and customer satisfaction.
            </p>
          </div>
          
          {/* Our Mission section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic">
                "To create the most convenient and trusted online shopping destination where quality products meet exceptional customer service, 
                making everyday commerce better for everyone."
              </p>
            </div>
          </div>
          
          {/* What Sets Us Apart section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-gray-700">
                  We carefully select each product in our catalog to ensure quality and value for our customers.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-700">
                  Our policies and practices are designed with customer satisfaction as the top priority.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-gray-700">
                  We support small businesses and give back to the communities we serve through various initiatives.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Our Leadership Team</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Jane Smith",
                  role: "CEO & Co-Founder",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
                },
                {
                  name: "John Doe",
                  role: "CTO & Co-Founder",
                  image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                },
                {
                  name: "Emily Johnson",
                  role: "CMO",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "COO",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3 overflow-hidden rounded-full mx-auto w-32 h-32">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Join Us CTA */}
          <div className="bg-black text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className="mb-6">
              We're always looking for talented individuals to join our team. Check out our careers page for current openings.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
              View Career Opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 