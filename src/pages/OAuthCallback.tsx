
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
import { Button } from '@/components/ui/button';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const { setWordPressSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Get authorization code and state from URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        // Check for error parameter (OAuth error response)
        const oauthError = searchParams.get('error');
        const oauthErrorDescription = searchParams.get('error_description');
        
        if (oauthError) {
          throw new Error(`OAuth Error: ${oauthError}${oauthErrorDescription ? ` - ${oauthErrorDescription}` : ''}`);
        }
        
        // Validate code and state
        if (!code) {
          throw new Error('Authorization code is missing from the callback URL.');
        }
        
        if (!state || !verifyOAuthState(state)) {
          throw new Error('Invalid state parameter. This could be a CSRF attack.');
        }
        
        console.log("Authorization code and state verified");
        
        // Exchange code for access token
        const tokenData = await exchangeCodeForToken(code);
        if (!tokenData) {
          throw new Error('Failed to exchange authorization code for access token.');
        }
        
        console.log("Successfully exchanged code for token");
        
        // Fetch user info with the access token
        const userInfo = await fetchWordPressUserInfo(tokenData.access_token);
        if (!userInfo) {
          throw new Error('Failed to fetch user information.');
        }
        
        console.log("Successfully fetched user information");
        
        // Check if user is admin
        const isAdmin = isWordPressUserAdmin(userInfo);
        console.log("Admin status:", isAdmin);
        
        // Set WordPress session in AuthContext
        setWordPressSession(userInfo, isAdmin, tokenData.access_token);
        
        // Clear OAuth state from localStorage
        clearOAuthState();
        
        // Show success message and redirect to workspace
        toast.success(`Welcome, ${userInfo.name || 'User'}`);
        navigate('/workspace');
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred during authentication.');
        setDetailedError(JSON.stringify({
          code: searchParams.get('code') ? "Present (first 5 chars): " + searchParams.get('code')?.substring(0, 5) + "..." : "Missing",
          state: searchParams.get('state') ? "Present" : "Missing",
          error: searchParams.get('error'),
          error_description: searchParams.get('error_description'),
          url: window.location.href
        }, null, 2));
      } finally {
        setProcessing(false);
      }
    };
    
    processOAuthCallback();
  }, [searchParams, navigate, setWordPressSession]);

  const retryAuthentication = () => {
    window.location.href = '/login';
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center p-6 max-w-lg bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h1 className="text-2xl font-semibold mb-4">Authentication Failed</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          
          {detailedError && (
            <div className="mb-6">
              <details className="text-left">
                <summary className="cursor-pointer text-point font-medium">Technical Details</summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-60">
                  {detailedError}
                </pre>
              </details>
            </div>
          )}
          
          <Button 
            onClick={retryAuthentication} 
            className="bg-point text-white px-6 py-2 rounded hover:bg-point/90"
          >
            Try Again
          </Button>
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
