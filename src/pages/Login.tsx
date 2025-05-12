
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { initiateWordPressOAuth } from '@/integrations/wordpress/oauth';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Login = () => {
  const { user, wpUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [initializingOAuth, setInitializingOAuth] = useState(false);

  useEffect(() => {
    // Only start the OAuth flow if user is not already authenticated
    if (!user && !wpUser && !initializingOAuth) {
      setInitializingOAuth(true);
      
      try {
        console.log("Starting WordPress OAuth flow");
        // Initiate WordPress OAuth flow
        initiateWordPressOAuth();
      } catch (error) {
        console.error("Error initiating OAuth:", error);
        setError("Failed to start the authentication process. Please try again.");
        setInitializingOAuth(false);
      }
    }
  }, [user, wpUser, initializingOAuth]);

  // If user is already authenticated, redirect to workspace
  if (user || wpUser) {
    return <Navigate to="/workspace" replace />;
  }

  const handleRetry = () => {
    setError(null);
    setInitializingOAuth(false);
    // The useEffect will trigger the OAuth flow again
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Login Failed</h1>
            <p className="text-gray-500 mb-6">
              There was a problem starting the authentication process.
            </p>
            <Button onClick={handleRetry} className="bg-point hover:bg-point/90 text-white">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
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
