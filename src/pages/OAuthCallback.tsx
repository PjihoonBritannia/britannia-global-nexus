
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  exchangeCodeForToken, 
  fetchWordPressUserInfo, 
  isWordPressUserAdmin, 
  verifyOAuthState,
  clearOAuthState,
  getOAuthConfig
} from '@/integrations/wordpress/oauth';
import { fetchExternalUrl } from '@/integrations/wordpress/api';
import { Loader2, AlertCircle, RefreshCcw, FileSearch, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<string>("error");
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [manualTestResults, setManualTestResults] = useState<Record<string, any>>({});
  const [isPerformingManualTest, setIsPerformingManualTest] = useState(false);
  const { setWordPressSession } = useAuth();
  const navigate = useNavigate();

  // Function to perform manual token endpoint test
  const performManualTokenTest = async () => {
    try {
      setIsPerformingManualTest(true);
      
      const code = searchParams.get('code');
      if (!code) {
        setManualTestResults({
          status: 'error',
          message: 'No authorization code available in URL parameters'
        });
        setIsPerformingManualTest(false);
        return;
      }
      
      const config = getOAuthConfig();
      const testResults: Record<string, any> = {};
      
      // Basic OPTIONS request to check endpoint availability and CORS
      try {
        testResults.optionsRequest = await fetchExternalUrl(config.tokenEndpoint, { method: 'OPTIONS' });
      } catch (error) {
        testResults.optionsRequest = {
          ok: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
      
      // Prepare manual token request
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", config.redirectUri);
      params.append("client_id", config.clientId);
      params.append("client_secret", config.clientSecret);
      
      // Attempt token request with specified mode
      try {
        const tokenResponse = await fetchExternalUrl(config.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: params.toString(),
          mode: 'cors',
          credentials: 'omit' // Don't send cookies to avoid CORS issues
        });
        
        testResults.tokenRequest = tokenResponse;
      } catch (error) {
        testResults.tokenRequest = {
          ok: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
      
      setManualTestResults(testResults);
      setActiveTab("manual-test");
    } catch (error) {
      setManualTestResults({
        status: 'error',
        message: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsPerformingManualTest(false);
    }
  };

  // Function to run OAuth diagnostics
  const runDiagnostics = async () => {
    try {
      setIsRunningDiagnostics(true);
      const diagnostics: Record<string, any> = {};
      
      // Get OAuth configuration
      const config = getOAuthConfig();
      diagnostics.configuration = config;
      
      // Extract data from URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      
      diagnostics.urlParameters = {
        code: code ? `${code.substring(0, 4)}...${code.substring(code.length - 4)}` : null,
        state: state || null,
        error: error || null,
        error_description: errorDescription || null
      };
      
      // Verify state (without processing)
      if (state) {
        const storedState = localStorage.getItem("wp_oauth_state");
        diagnostics.stateVerification = {
          providedState: state,
          storedState: storedState,
          matches: storedState === state
        };
      }
      
      // Network connectivity checks
      try {
        // DNS resolution check
        const tokenEndpointUrl = new URL(config.tokenEndpoint);
        diagnostics.networkConnectivity = {
          hostToCheck: tokenEndpointUrl.hostname,
          testType: 'Fetch HEAD request'
        };
        
        // Basic connectivity test with HEAD request (lightweight)
        const connectivityTest = await fetchExternalUrl(
          config.tokenEndpoint, 
          { 
            method: 'HEAD'
          }
        );
        
        diagnostics.networkConnectivity.result = {
          success: connectivityTest.ok,
          status: connectivityTest.status,
          statusText: connectivityTest.statusText
        };
      } catch (error) {
        diagnostics.networkConnectivity = {
          error: error instanceof Error ? error.message : String(error)
        };
      }
      
      // Test token endpoint with OPTIONS request
      try {
        const tokenEndpointTest = await fetchExternalUrl(
          config.tokenEndpoint, 
          { 
            method: 'OPTIONS',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        
        diagnostics.tokenEndpointTest = {
          status: tokenEndpointTest.status,
          statusText: tokenEndpointTest.statusText,
          headers: tokenEndpointTest.headers,
          allowsMethods: tokenEndpointTest.headers['allow'] || tokenEndpointTest.headers['Access-Control-Allow-Methods'] 
        };
      } catch (error) {
        diagnostics.tokenEndpointTest = {
          error: error instanceof Error ? error.message : String(error)
        };
      }
      
      // Browser capabilities
      diagnostics.browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled,
        language: navigator.language
      };
      
      setDiagnosticInfo(diagnostics);
      setActiveTab("diagnostics");
    } catch (error) {
      console.error("Error running diagnostics:", error);
      toast.error("Failed to run diagnostics");
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

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
          throw new Error('Invalid state parameter. This could be a CSRF attack or the session has expired.');
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
        
        // Format error message for display
        let errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during authentication.';
        if (errorMessage.includes("Network Error") || errorMessage.includes("Failed to fetch")) {
          errorMessage = `Network error occurred when connecting to the authorization server. This could be due to connectivity issues, CORS restrictions, or server unavailability. Details: ${errorMessage}`;
        }
        
        setError(errorMessage);
        
        // Collect diagnostic information for debugging
        const diagnosticData = {
          code: searchParams.get('code') ? `${searchParams.get('code')?.substring(0, 4)}...${searchParams.get('code')?.substring(searchParams.get('code')?.length || 0 - 4)}` : "Missing",
          state: searchParams.get('state') ? "Present" : "Missing",
          stateVerification: searchParams.get('state') ? `Result: ${verifyOAuthState(searchParams.get('state') || '')}` : "N/A",
          error: searchParams.get('error'),
          error_description: searchParams.get('error_description'),
          url: window.location.href,
          fullError: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          oauth_config: {
            clientId: getOAuthConfig().clientId,
            redirectUri: getOAuthConfig().redirectUri,
            authorizeEndpoint: getOAuthConfig().authorizeEndpoint,
            tokenEndpoint: getOAuthConfig().tokenEndpoint
          }
        };
        
        setDetailedError(JSON.stringify(diagnosticData, null, 2));
        setActiveTab("error");
        
        // Automatically run diagnostics
        runDiagnostics();
      } finally {
        setProcessing(false);
      }
    };
    
    processOAuthCallback();
  }, [searchParams, navigate, setWordPressSession]);

  const retryAuthentication = () => {
    window.location.href = '/login';
  };

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-point" />
          <h1 className="text-2xl font-semibold">Processing authentication...</h1>
          <p className="text-gray-500">Please wait while we complete your login.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream p-4">
        <div className="text-center w-full max-w-3xl bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="text-red-500 text-5xl mb-4">
              <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Authentication Failed</h1>
            <div className="text-gray-700 mb-6 p-4 bg-red-50 rounded-md border border-red-100">
              {error}
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="error">Error Details</TabsTrigger>
              <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
              <TabsTrigger value="manual-test">Manual Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="error" className="p-6">
              {detailedError && (
                <div className="mb-6">
                  <h3 className="font-medium text-left mb-2">Technical Details</h3>
                  <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto max-h-60 text-left">
                    {detailedError}
                  </pre>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="diagnostics" className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-left">OAuth Diagnostics</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={runDiagnostics}
                  disabled={isRunningDiagnostics}
                >
                  {isRunningDiagnostics ? (
                    <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Running...</>
                  ) : (
                    <><RefreshCcw className="h-4 w-4 mr-1" /> Run Diagnostics</>
                  )}
                </Button>
              </div>
              
              {Object.keys(diagnosticInfo).length > 0 ? (
                <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto max-h-80 text-left">
                  {JSON.stringify(diagnosticInfo, null, 2)}
                </pre>
              ) : (
                <div className="p-4 bg-gray-50 text-gray-500 text-center">
                  {isRunningDiagnostics ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      <p>Running diagnostics...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FileSearch className="h-8 w-8 mb-2" />
                      <p>Click "Run Diagnostics" to check the OAuth configuration</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manual-test" className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-left">Manual Token Request Test</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={performManualTokenTest}
                    disabled={isPerformingManualTest}
                  >
                    {isPerformingManualTest ? (
                      <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Testing...</>
                    ) : (
                      <><RefreshCcw className="h-4 w-4 mr-1" /> Test Token Endpoint</>
                    )}
                  </Button>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Testing Process</CardTitle>
                    <CardDescription>
                      This test attempts to exchange the authorization code for an access token manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(manualTestResults).length > 0 ? (
                      <pre className="p-3 bg-gray-100 rounded text-xs overflow-auto max-h-80 text-left">
                        {JSON.stringify(manualTestResults, null, 2)}
                      </pre>
                    ) : (
                      <div className="p-4 bg-gray-50 text-gray-500 text-center">
                        {isPerformingManualTest ? (
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin mb-2" />
                            <p>Performing token request test...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <FileSearch className="h-6 w-6 mb-2" />
                            <p>Click "Test Token Endpoint" to run a manual test</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="text-sm text-gray-500 mt-2">
                  <p className="mb-1">Troubleshooting resources:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <a 
                        href="https://wp-oauth.com/docs/general/grant-types/authorization-code/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        WP OAuth Server Documentation <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://auth0.com/docs/authenticate/protocols/oauth" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        OAuth 2.0 Reference <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex space-x-4 justify-center p-6 border-t border-gray-100">
            <Button 
              onClick={retryAuthentication} 
              className="bg-point text-white px-6 py-2 rounded hover:bg-point/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null; // Default case should be handled by the processing state above
};

export default OAuthCallback;
