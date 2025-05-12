
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logApiRequest } from "@/integrations/wordpress/api";

// WordPress OAuth configuration
const WP_OAUTH_CLIENT_ID = "GXNk9Nxs0i97NR8vCQsQILeYRzYfSP3ddY7rIjsO";
const WP_OAUTH_CLIENT_SECRET = "nWZgxlFsLkENBGBqCajPSvq6acZYFWGXEfT4upI2";
const WP_OAUTH_REDIRECT_URI = "https://britannia.co.kr/oauthwp/callback";
const WP_OAUTH_AUTHORIZE_ENDPOINT = "https://data.britannia.co.kr/oauth/authorize";
const WP_OAUTH_TOKEN_ENDPOINT = "https://data.britannia.co.kr/oauth/token";
const WP_OAUTH_USER_INFO_ENDPOINT = "https://data.britannia.co.kr/oauth/me";
const WP_OAUTH_REVOKE_ENDPOINT = "https://data.britannia.co.kr/oauth/revoke";

// Types for WordPress OAuth
export interface WordPressTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface WordPressUserInfo {
  id: number;
  email: string;
  name: string;
  roles?: string[];
  [key: string]: any; // For other fields that might be returned
}

// Generate random state for CSRF protection
export const generateOAuthState = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Store OAuth state in localStorage for verification
export const storeOAuthState = (state: string): void => {
  localStorage.setItem("wp_oauth_state", state);
};

// Verify OAuth state from callback
export const verifyOAuthState = (state: string): boolean => {
  const storedState = localStorage.getItem("wp_oauth_state");
  return storedState === state;
};

// Clear OAuth state
export const clearOAuthState = (): void => {
  localStorage.removeItem("wp_oauth_state");
};

// Get OAuth configuration for display or use
export const getOAuthConfig = () => {
  return {
    clientId: WP_OAUTH_CLIENT_ID,
    clientSecret: WP_OAUTH_CLIENT_SECRET,
    redirectUri: WP_OAUTH_REDIRECT_URI,
    authorizeEndpoint: WP_OAUTH_AUTHORIZE_ENDPOINT,
    tokenEndpoint: WP_OAUTH_TOKEN_ENDPOINT,
    userInfoEndpoint: WP_OAUTH_USER_INFO_ENDPOINT,
    revokeEndpoint: WP_OAUTH_REVOKE_ENDPOINT,
    scope: "basic"
  };
};

// Log OAuth flow details
const logOAuthFlow = async (step: string, details: any) => {
  console.log(`[OAuth Flow - ${step}]`, details);
  
  // Create a request-like object for logging
  const request = {
    method: details.method || 'GET',
    url: details.url || 'N/A',
    headers: details.headers || {},
    body: details.body || null
  };
  
  // Create a response-like object for logging
  const response = {
    status: details.status || 0,
    body: details.responseBody || `[OAuth Flow] ${step}: ${JSON.stringify(details.message || {})}`
  };
  
  // Log to API logs
  await logApiRequest(request, response, "OAuth Flow");
};

// Initiate WordPress OAuth flow
export const initiateWordPressOAuth = async (): Promise<void> => {
  try {
    console.log("Initiating WordPress OAuth flow");
    const state = generateOAuthState();
    storeOAuthState(state);
    
    const authUrl = new URL(WP_OAUTH_AUTHORIZE_ENDPOINT);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", WP_OAUTH_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", WP_OAUTH_REDIRECT_URI);
    authUrl.searchParams.append("scope", "basic");
    authUrl.searchParams.append("state", state);
    
    const authUrlString = authUrl.toString();
    console.log("Redirecting to auth URL:", authUrlString);
    
    // Log the authorization request (which is a redirect, not an API call)
    await logOAuthFlow("Authorization Request", {
      method: "GET",
      url: authUrlString,
      message: {
        state: state,
        client_id: WP_OAUTH_CLIENT_ID,
        redirect_uri: WP_OAUTH_REDIRECT_URI,
        scope: "basic"
      }
    });
    
    window.location.href = authUrlString;
  } catch (error) {
    console.error("Error initiating WordPress OAuth:", error);
    
    // Log the error
    await logOAuthFlow("Authorization Error", {
      status: 500,
      message: error instanceof Error ? { error: error.message } : { error: "Unknown error" }
    });
    
    toast.error("Failed to start authentication process");
  }
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (code: string): Promise<WordPressTokenResponse | null> => {
  try {
    console.log("Exchanging code for token with code:", code.substring(0, 5) + "...");
    
    // Create the form data for the token request
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", WP_OAUTH_REDIRECT_URI);
    params.append("client_id", WP_OAUTH_CLIENT_ID);
    params.append("client_secret", WP_OAUTH_CLIENT_SECRET);
    
    console.log("Token request params:", params.toString());
    console.log("Token endpoint:", WP_OAUTH_TOKEN_ENDPOINT);
    
    // Enhanced pre-request logging for diagnostics
    const requestHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    
    // Log all token request details before sending
    console.log("TOKEN REQUEST DETAILS:");
    console.log("- URL:", WP_OAUTH_TOKEN_ENDPOINT);
    console.log("- Method: POST");
    console.log("- Headers:", JSON.stringify(requestHeaders));
    console.log("- Body Parameters:");
    console.log("  - grant_type:", "authorization_code");
    console.log("  - code:", code.substring(0, 4) + "..." + code.substring(code.length - 4));
    console.log("  - redirect_uri:", WP_OAUTH_REDIRECT_URI);
    console.log("  - client_id:", WP_OAUTH_CLIENT_ID);
    console.log("  - client_secret:", WP_OAUTH_CLIENT_SECRET.substring(0, 4) + "..." + WP_OAUTH_CLIENT_SECRET.substring(WP_OAUTH_CLIENT_SECRET.length - 4));
    
    // Detailed logging of token request parameters
    await logOAuthFlow("Token Request - Before", {
      method: "POST",
      url: WP_OAUTH_TOKEN_ENDPOINT,
      headers: requestHeaders,
      body: params.toString(),
      message: {
        grant_type: "authorization_code",
        code_prefix: code.substring(0, 4) + "...",
        redirect_uri: WP_OAUTH_REDIRECT_URI,
        client_id: WP_OAUTH_CLIENT_ID,
        client_secret_masked: WP_OAUTH_CLIENT_SECRET.substring(0, 4) + "..." + WP_OAUTH_CLIENT_SECRET.substring(WP_OAUTH_CLIENT_SECRET.length - 4)
      }
    });
    
    // Using fetchWithTimeout to catch timeouts explicitly
    const fetchToken = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
        const response = await fetch(WP_OAUTH_TOKEN_ENDPOINT, {
          method: "POST",
          headers: requestHeaders,
          body: params.toString(),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new Error('Request timed out after 30 seconds');
        }
        throw error;
      }
    };
    
    // Try making the request with more detailed error reporting
    let response;
    try {
      console.log("Sending token request now...");
      response = await fetchToken();
      console.log("Token response received, status:", response.status);
    } catch (fetchError) {
      console.error("Fetch error during token request:", fetchError);
      
      // Try to get network error details
      const errorDetails = {
        name: fetchError.name || 'Unknown',
        message: fetchError.message || 'No message',
        stack: fetchError.stack || 'No stack trace',
        code: fetchError.code || 'No error code'
      };
      
      // Log the detailed fetch error
      await logOAuthFlow("Token Request - Network Error", {
        method: "POST",
        url: WP_OAUTH_TOKEN_ENDPOINT,
        status: 0,
        responseBody: JSON.stringify(errorDetails),
        message: errorDetails
      });
      
      throw new Error(`Network error during token request: ${errorDetails.message}`);
    }
    
    // Read and parse the response
    let responseText = '';
    let responseData = null;
    
    try {
      responseText = await response.text();
      console.log("Token raw response:", responseText);
      
      // Try to parse JSON if possible
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log("Token response data:", responseData);
        } catch (parseError) {
          console.warn("Could not parse token response as JSON:", parseError);
        }
      }
    } catch (textError) {
      console.error("Error reading response text:", textError);
    }
    
    // Log the response details
    await logOAuthFlow("Token Response", {
      method: "POST",
      url: WP_OAUTH_TOKEN_ENDPOINT,
      status: response.status,
      responseBody: responseText,
      message: {
        status: response.status,
        ok: response.ok,
        responseData: responseData || responseText
      }
    });
    
    if (!response.ok) {
      let errorText = responseText || "Unknown error";
      console.error("Token exchange error:", errorText);
      throw new Error(`Failed to exchange code for token: ${errorText} (Status: ${response.status})`);
    }
    
    // At this point we should have a valid JSON response
    if (!responseData) {
      throw new Error("Failed to parse token response as JSON");
    }
    
    const tokenData: WordPressTokenResponse = responseData;
    console.log("Token exchange successful");
    return tokenData;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    
    // Log the error
    await logOAuthFlow("Token Exchange Error", {
      status: 500,
      message: error instanceof Error ? { error: error.message } : { error: "Unknown error" }
    });
    
    toast.error(`Authentication error: ${error instanceof Error ? error.message : "Failed to get access token"}`);
    return null;
  }
};

// Get WordPress user information
export const fetchWordPressUserInfo = async (accessToken: string): Promise<WordPressUserInfo | null> => {
  try {
    console.log("Fetching WordPress user info with token");
    
    // Log the request before making it
    await logOAuthFlow("User Info Request - Before", {
      method: "GET",
      url: WP_OAUTH_USER_INFO_ENDPOINT,
      headers: {
        "Authorization": "Bearer <masked_token>"
      }
    });
    
    const response = await fetch(WP_OAUTH_USER_INFO_ENDPOINT, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    
    console.log("User info response status:", response.status);
    
    let responseText = '';
    let responseData = null;
    
    try {
      responseText = await response.text();
      console.log("User info raw response:", responseText);
      
      // Try to parse JSON if possible
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log("User info response data:", responseData);
        } catch (parseError) {
          console.warn("Could not parse user info response as JSON:", parseError);
        }
      }
    } catch (textError) {
      console.error("Error reading response text:", textError);
    }
    
    // Log the response
    await logOAuthFlow("User Info Response", {
      method: "GET",
      url: WP_OAUTH_USER_INFO_ENDPOINT,
      status: response.status,
      responseBody: responseText,
      message: {
        status: response.status,
        ok: response.ok,
        responseData: responseData || responseText
      }
    });
    
    if (!response.ok) {
      let errorText = responseText || "Unknown error";
      throw new Error(`Failed to fetch user information: ${errorText}`);
    }
    
    // At this point we should have a valid JSON response
    if (!responseData) {
      throw new Error("Failed to parse user info response as JSON");
    }
    
    const userData: WordPressUserInfo = responseData;
    console.log("User info fetched successfully:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching WordPress user info:", error);
    
    // Log the error
    await logOAuthFlow("User Info Error", {
      status: 500,
      message: error instanceof Error ? { error: error.message } : { error: "Unknown error" }
    });
    
    toast.error(`Failed to fetch user information: ${error instanceof Error ? error.message : "Unknown error"}`);
    return null;
  }
};

// Check if WordPress user has admin role
export const isWordPressUserAdmin = (userInfo: WordPressUserInfo): boolean => {
  // Check if roles field exists and contains "administrator"
  if (userInfo.roles && Array.isArray(userInfo.roles)) {
    const isAdmin = userInfo.roles.includes("administrator");
    console.log("User admin check:", isAdmin);
    return isAdmin;
  }
  return false;
};

// Revoke WordPress OAuth token
export const revokeWordPressToken = async (token: string): Promise<boolean> => {
  try {
    console.log("Revoking WordPress token");
    
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("client_id", WP_OAUTH_CLIENT_ID);
    params.append("client_secret", WP_OAUTH_CLIENT_SECRET);
    
    // Log the token revocation request
    await logOAuthFlow("Token Revocation Request", {
      method: "POST",
      url: WP_OAUTH_REVOKE_ENDPOINT,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString(),
      message: {
        token: "<masked_token>",
        client_id: WP_OAUTH_CLIENT_ID,
        client_secret: "*******" + WP_OAUTH_CLIENT_SECRET.slice(-4)
      }
    });
    
    const response = await fetch(WP_OAUTH_REVOKE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    
    console.log("Token revocation response status:", response.status);
    
    // Log the response
    let responseText = '';
    try {
      responseText = await response.text();
    } catch (error) {
      console.error("Error reading revocation response:", error);
    }
    
    await logOAuthFlow("Token Revocation Response", {
      method: "POST",
      url: WP_OAUTH_REVOKE_ENDPOINT,
      status: response.status,
      responseBody: responseText,
      message: {
        status: response.status,
        ok: response.ok
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error revoking WordPress token:", error);
    
    // Log the error
    await logOAuthFlow("Token Revocation Error", {
      status: 500,
      message: error instanceof Error ? { error: error.message } : { error: "Unknown error" }
    });
    
    return false;
  }
};
