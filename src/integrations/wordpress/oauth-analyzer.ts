
import { getOAuthConfig } from './oauth';

// Interface for OAuth analysis results
export interface OAuthAnalysisResult {
  category: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
  recommendation?: string;
}

// Function to analyze the OAuth configuration against best practices
export const analyzeOAuthConfiguration = (): OAuthAnalysisResult[] => {
  const config = getOAuthConfig();
  const results: OAuthAnalysisResult[] = [];
  
  // Check client ID
  if (!config.clientId) {
    results.push({
      category: 'Client ID',
      status: 'error',
      message: 'Client ID is not configured.',
      recommendation: 'Configure a valid client ID in the OAuth settings.'
    });
  } else if (config.clientId.length < 10) {
    results.push({
      category: 'Client ID',
      status: 'warning',
      message: 'Client ID seems unusually short.',
      recommendation: 'Verify that the client ID matches exactly what is configured on the WordPress OAuth server.'
    });
  } else {
    results.push({
      category: 'Client ID',
      status: 'ok',
      message: 'Client ID is properly configured.'
    });
  }
  
  // Check client secret
  if (!config.clientSecret) {
    results.push({
      category: 'Client Secret',
      status: 'error',
      message: 'Client secret is not configured.',
      recommendation: 'Configure a valid client secret in the OAuth settings.'
    });
  } else if (config.clientSecret.length < 10) {
    results.push({
      category: 'Client Secret',
      status: 'warning',
      message: 'Client secret seems unusually short.',
      recommendation: 'Verify that the client secret matches exactly what is configured on the WordPress OAuth server.'
    });
  } else {
    results.push({
      category: 'Client Secret',
      status: 'ok',
      message: 'Client secret is properly configured.'
    });
  }
  
  // Check redirect URI
  if (!config.redirectUri) {
    results.push({
      category: 'Redirect URI',
      status: 'error',
      message: 'Redirect URI is not configured.',
      recommendation: 'Configure a valid redirect URI in the OAuth settings.'
    });
  } else if (!config.redirectUri.startsWith('https://')) {
    results.push({
      category: 'Redirect URI',
      status: 'warning',
      message: 'Redirect URI does not use HTTPS, which is less secure.',
      recommendation: 'Consider using HTTPS for the redirect URI for better security.'
    });
  } else if (!config.redirectUri.includes('/callback') && !config.redirectUri.includes('/oauth')) {
    results.push({
      category: 'Redirect URI',
      status: 'warning',
      message: 'Redirect URI does not follow the common pattern for OAuth callbacks.',
      recommendation: 'Verify that the redirect URI matches exactly what is configured on the WordPress OAuth server.'
    });
  } else {
    results.push({
      category: 'Redirect URI',
      status: 'ok',
      message: 'Redirect URI is properly configured.'
    });
  }
  
  // Check endpoints
  if (!config.authorizeEndpoint || !config.authorizeEndpoint.includes('/oauth/authorize')) {
    results.push({
      category: 'Authorization Endpoint',
      status: 'warning',
      message: 'Authorization endpoint may not follow the standard WordPress OAuth pattern.',
      recommendation: 'Verify the authorization endpoint URL with your WordPress OAuth server configuration.'
    });
  } else {
    results.push({
      category: 'Authorization Endpoint',
      status: 'ok',
      message: 'Authorization endpoint is properly configured.'
    });
  }
  
  if (!config.tokenEndpoint || !config.tokenEndpoint.includes('/oauth/token')) {
    results.push({
      category: 'Token Endpoint',
      status: 'warning',
      message: 'Token endpoint may not follow the standard WordPress OAuth pattern.',
      recommendation: 'Verify the token endpoint URL with your WordPress OAuth server configuration.'
    });
  } else {
    results.push({
      category: 'Token Endpoint',
      status: 'ok',
      message: 'Token endpoint is properly configured.'
    });
  }
  
  // Check for potential CORS issues
  const domain = extractDomain(config.redirectUri);
  const authDomain = extractDomain(config.authorizeEndpoint);
  
  if (domain && authDomain && domain !== authDomain) {
    results.push({
      category: 'CORS Configuration',
      status: 'warning',
      message: `Redirect URI domain (${domain}) differs from authorization endpoint domain (${authDomain}).`,
      recommendation: 'Ensure that CORS is properly configured on the WordPress OAuth server to allow requests from your domain.'
    });
  }
  
  // Check for scope
  if (!config.scope) {
    results.push({
      category: 'Scope',
      status: 'error',
      message: 'OAuth scope is not configured.',
      recommendation: 'Configure appropriate OAuth scopes based on the access required.'
    });
  } else if (!config.scope.includes('openid') && !config.scope.includes('profile')) {
    results.push({
      category: 'Scope',
      status: 'warning',
      message: 'OAuth scope does not include standard profile scopes.',
      recommendation: 'Consider including "openid" and "profile" scopes for user information access.'
    });
  } else {
    results.push({
      category: 'Scope',
      status: 'ok',
      message: 'OAuth scope is properly configured.'
    });
  }
  
  return results;
};

// Helper function to extract domain from URL
const extractDomain = (url: string): string | null => {
  try {
    if (!url) return null;
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error('Error extracting domain from URL:', error);
    return null;
  }
};

// Function to provide detailed analysis of the OAuth flow implementation
export const analyzeOAuthImplementation = (): OAuthAnalysisResult[] => {
  const results: OAuthAnalysisResult[] = [];
  
  // Check for CSRF protection with state parameter
  const hasCSRFProtection = typeof localStorage.getItem('wp_oauth_state') === 'function';
  if (!hasCSRFProtection) {
    results.push({
      category: 'CSRF Protection',
      status: 'warning',
      message: 'CSRF protection with state parameter verification may not be properly implemented.',
      recommendation: 'Ensure that a random state parameter is generated for each OAuth request and verified when handling the callback.'
    });
  } else {
    results.push({
      category: 'CSRF Protection',
      status: 'ok',
      message: 'CSRF protection with state parameter verification is implemented.'
    });
  }
  
  // Check for token handling security
  results.push({
    category: 'Token Storage',
    status: 'warning',
    message: 'Review how OAuth tokens are stored in the application.',
    recommendation: 'Store access tokens securely and avoid exposing them in client-side storage for production environments.'
  });
  
  // Check for token revocation
  const config = getOAuthConfig();
  if (!config.revokeEndpoint) {
    results.push({
      category: 'Token Revocation',
      status: 'warning',
      message: 'Token revocation endpoint is not configured.',
      recommendation: 'Implement token revocation on logout for better security.'
    });
  }
  
  // Add general recommendations
  results.push({
    category: 'Error Handling',
    status: 'warning',
    message: 'Review error handling in the OAuth implementation.',
    recommendation: 'Ensure comprehensive error handling at each step of the OAuth flow with detailed logs for debugging.'
  });
  
  results.push({
    category: 'Protocol Compliance',
    status: 'warning',
    message: 'Verify compliance with OAuth 2.0 specifications.',
    recommendation: 'Ensure strict adherence to OAuth 2.0 protocol standards, especially for authorization code flow.'
  });
  
  return results;
};

// Diagnostic function to test endpoints directly
export const testOAuthEndpoints = async (): Promise<OAuthAnalysisResult[]> => {
  const config = getOAuthConfig();
  const results: OAuthAnalysisResult[] = [];
  
  // Test authorization endpoint with an OPTIONS request to check CORS
  try {
    // This would need to be implemented with actual HTTP requests
    results.push({
      category: 'Authorization Endpoint',
      status: 'warning',
      message: 'Direct testing of authorization endpoint requires user interaction.',
      recommendation: 'Manually verify the authorization endpoint by initiating the OAuth flow.'
    });
  } catch (error) {
    results.push({
      category: 'Authorization Endpoint',
      status: 'error',
      message: 'Error testing authorization endpoint: ' + (error instanceof Error ? error.message : String(error)),
      recommendation: 'Verify the endpoint URL and server configuration.'
    });
  }
  
  return results;
};
