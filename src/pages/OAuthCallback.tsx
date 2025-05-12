
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  exchangeCodeForToken, 
  fetchWordPressUserInfo, 
  isWordPressUserAdmin, 
  verifyOAuthState,
  clearOAuthState
} from '@/integrations/wordpress/oauth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setWordPressSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Get authorization code and state from URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        // Validate code and state
        if (!code) {
          setError('Authorization code is missing from the callback URL.');
          return;
        }
        
        if (!state || !verifyOAuthState(state)) {
          setError('Invalid state parameter. This could be a CSRF attack.');
          return;
        }
        
        // Exchange code for access token
        const tokenData = await exchangeCodeForToken(code);
        if (!tokenData) {
          setError('Failed to exchange authorization code for access token.');
          return;
        }
        
        // Fetch user info with the access token
        const userInfo = await fetchWordPressUserInfo(tokenData.access_token);
        if (!userInfo) {
          setError('Failed to fetch user information.');
          return;
        }
        
        // Check if user is admin
        const isAdmin = isWordPressUserAdmin(userInfo);
        
        // Set WordPress session in AuthContext
        setWordPressSession(userInfo, isAdmin, tokenData.access_token);
        
        // Clear OAuth state from localStorage
        clearOAuthState();
        
        // Show success message and redirect to workspace
        toast.success(`Welcome, ${userInfo.name || 'User'}`);
        navigate('/workspace');
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        setError('An unexpected error occurred during authentication.');
      } finally {
        setProcessing(false);
      }
    };
    
    processOAuthCallback();
  }, [searchParams, navigate, setWordPressSession]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h1 className="text-2xl font-semibold mb-4">Authentication Failed</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="bg-point text-white px-6 py-2 rounded hover:bg-point/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-point" />
        <h1 className="text-2xl font-semibold">Processing authentication...</h1>
        <p className="text-gray-500">Please wait while we complete your login.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
