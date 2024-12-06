import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to SignIn page
    navigate('/sign-in');
  }, [navigate]);
  
  // This will only show briefly before redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to sign in page...</p>
    </div>
  );
};

export default Register; 