
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { initiateWordPressOAuth } from '@/integrations/wordpress/oauth';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const { user, wpUser } = useAuth();

  useEffect(() => {
    // Check if already authenticated
    if (!user && !wpUser) {
      // Initiate WordPress OAuth flow if not authenticated
      initiateWordPressOAuth();
    }
  }, [user, wpUser]);

  // If user is already authenticated, redirect to workspace
  if (user || wpUser) {
    return <Navigate to="/workspace" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-point" />
        <h1 className="text-2xl font-semibold">Redirecting to login...</h1>
        <p className="text-gray-500">Please wait while we redirect you to the authentication page.</p>
      </div>
    </div>
  );
};

export default Login;
