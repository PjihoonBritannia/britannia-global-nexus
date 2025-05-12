
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

// Initiate WordPress OAuth flow
export const initiateWordPressOAuth = (): void => {
  const state = generateOAuthState();
  storeOAuthState(state);
  
  const authUrl = new URL(WP_OAUTH_AUTHORIZE_ENDPOINT);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("client_id", WP_OAUTH_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", WP_OAUTH_REDIRECT_URI);
  authUrl.searchParams.append("scope", "openid profile email");
  authUrl.searchParams.append("state", state);
  
  window.location.href = authUrl.toString();
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (code: string): Promise<WordPressTokenResponse | null> => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", WP_OAUTH_REDIRECT_URI);
    params.append("client_id", WP_OAUTH_CLIENT_ID);
    params.append("client_secret", WP_OAUTH_CLIENT_SECRET);
    
    const response = await fetch(WP_OAUTH_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_description || "Failed to exchange code for token");
    }
    
    const tokenData: WordPressTokenResponse = await response.json();
    return tokenData;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    toast.error("Authentication error: Failed to get access token");
    return null;
  }
};

// Get WordPress user information
export const fetchWordPressUserInfo = async (accessToken: string): Promise<WordPressUserInfo | null> => {
  try {
    const response = await fetch(WP_OAUTH_USER_INFO_ENDPOINT, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    
    const userData: WordPressUserInfo = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching WordPress user info:", error);
    toast.error("Failed to fetch user information");
    return null;
  }
};

// Check if WordPress user has admin role
export const isWordPressUserAdmin = (userInfo: WordPressUserInfo): boolean => {
  // Check if roles field exists and contains "administrator"
  if (userInfo.roles && Array.isArray(userInfo.roles)) {
    return userInfo.roles.includes("administrator");
  }
  return false;
};

// Revoke WordPress OAuth token
export const revokeWordPressToken = async (token: string): Promise<boolean> => {
  try {
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("client_id", WP_OAUTH_CLIENT_ID);
    params.append("client_secret", WP_OAUTH_CLIENT_SECRET);
    
    const response = await fetch(WP_OAUTH_REVOKE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error revoking WordPress token:", error);
    return false;
  }
};
