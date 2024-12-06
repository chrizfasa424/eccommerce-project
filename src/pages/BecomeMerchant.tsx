import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BecomeMerchant: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to BusinessLogin page
    navigate('/business/login');
  }, [navigate]);
  
  // This will only show briefly before redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to business login page...</p>
    </div>
  );
};

export default BecomeMerchant; 