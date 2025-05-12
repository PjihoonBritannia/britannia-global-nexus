import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

// WordPress API configuration
const DEFAULT_WP_API_URL = "https://britannia.co.kr/wp-json/wp/v2";
const DEFAULT_WP_ADMIN_URL = "https://britannia.co.kr/wp-admin";
const DEFAULT_WP_USERNAME = "gbadmin";

// Type definitions for WordPress API structures
interface WordPressSettings {
  id?: string;
  api_url: string;
  admin_url: string;
  username: string;
  app_password: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiLogEntry {
  request_method: string;
  request_url: string;
  request_headers?: Json;
  request_body?: string;
  response_status: number;
  response_headers?: Json;
  response_body?: string;
  timestamp?: string;
  log_type?: string;
  error?: string;
}

// Define the allowed table names based on the Supabase schema
type AllowedTable = 'content_items' | 'profiles' | 'settings' | 'user_roles' | 'wordpress_api_logs' | 'wordpress_settings';

// Helper function to get WordPress settings from Supabase
export const getWordPressSettings = async (): Promise<WordPressSettings> => {
  try {
    const { data, error } = await supabase
      .from('wordpress_settings')
      .select('*')
      .single();
      
    if (error) {
      console.error("Error fetching WordPress settings:", error);
      // Fall back to default values
      return {
        api_url: DEFAULT_WP_API_URL,
        admin_url: DEFAULT_WP_ADMIN_URL,
        username: DEFAULT_WP_USERNAME,
        app_password: "XXR3 nGgK olNF QmsQ V9oq 00dg" // Default password
      };
    }
    
    return data as WordPressSettings;
  } catch (error) {
    console.error("Error in getWordPressSettings:", error);
    // Fall back to default values
    return {
      api_url: DEFAULT_WP_API_URL,
      admin_url: DEFAULT_WP_ADMIN_URL,
      username: DEFAULT_WP_USERNAME,
      app_password: "XXR3 nGgK olNF QmsQ V9oq 00dg" // Default password
    };
  }
};

// Helper function to mask sensitive information in headers
const maskSensitiveHeaders = (headers: Record<string, string>) => {
  const maskedHeaders = { ...headers };
  
  // Mask authorization header but preserve more diagnostic information
  if (maskedHeaders.authorization || maskedHeaders.Authorization) {
    const authHeader = maskedHeaders.authorization || maskedHeaders.Authorization;
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      // For OAuth tokens, preserve token structure but mask the actual value
      const tokenParts = authHeader.split(' ');
      if (tokenParts.length > 1 && tokenParts[1].length > 8) {
        const tokenPrefix = tokenParts[1].substring(0, 4);
        const tokenSuffix = tokenParts[1].substring(tokenParts[1].length - 4);
        maskedHeaders.authorization = `Bearer ${tokenPrefix}...${tokenSuffix}`;
      } else {
        maskedHeaders.authorization = 'Bearer <masked_token>';
      }
    } else if (authHeader.toLowerCase().startsWith('basic ')) {
      // For Basic auth, preserve structure but mask value
      maskedHeaders.authorization = 'Basic <masked_credentials>';
    }
  }
  
  return maskedHeaders;
};

// Helper function to mask sensitive information in request body
const maskSensitiveBody = (body: string): string => {
  if (!body) return '';
  
  try {
    // Try to parse as JSON first
    const parsedBody = JSON.parse(body);
    
    // Check for common sensitive fields
    if (parsedBody.password) parsedBody.password = '********';
    if (parsedBody.client_secret) parsedBody.client_secret = '********';
    if (parsedBody.app_password) parsedBody.app_password = '********';
    // For OAuth flows, preserve the structure but mask values
    if (parsedBody.code) {
      if (parsedBody.code.length > 8) {
        const codePrefix = parsedBody.code.substring(0, 4);
        const codeSuffix = parsedBody.code.substring(parsedBody.code.length - 4);
        parsedBody.code = `${codePrefix}...${codeSuffix}`;
      }
    }
    if (parsedBody.access_token) {
      if (parsedBody.access_token.length > 8) {
        const tokenPrefix = parsedBody.access_token.substring(0, 4);
        const tokenSuffix = parsedBody.access_token.substring(parsedBody.access_token.length - 4);
        parsedBody.access_token = `${tokenPrefix}...${tokenSuffix}`;
      } else {
        parsedBody.access_token = '<masked_token>';
      }
    }
    if (parsedBody.token) {
      if (parsedBody.token.length > 8) {
        const tokenPrefix = parsedBody.token.substring(0, 4);
        const tokenSuffix = parsedBody.token.substring(parsedBody.token.length - 4);
        parsedBody.token = `${tokenPrefix}...${tokenSuffix}`;
      } else {
        parsedBody.token = '<masked_token>';
      }
    }
    
    return JSON.stringify(parsedBody);
  } catch (e) {
    // If not JSON, try to mask URL encoded form data
    let maskedBody = body;
    
    // For URL encoded data, mask sensitive values
    if (maskedBody.includes('client_secret=')) {
      // Extract and mask client_secret
      const clientSecretMatch = maskedBody.match(/client_secret=([^&]+)/);
      if (clientSecretMatch && clientSecretMatch[1]) {
        const secret = clientSecretMatch[1];
        if (secret.length > 8) {
          const secretPrefix = secret.substring(0, 4);
          const secretSuffix = secret.substring(secret.length - 4);
          maskedBody = maskedBody.replace(/client_secret=[^&]+/, `client_secret=${secretPrefix}...${secretSuffix}`);
        } else {
          maskedBody = maskedBody.replace(/client_secret=[^&]+/, 'client_secret=********');
        }
      }
    }
    
    if (maskedBody.includes('code=')) {
      // Extract and mask authorization code
      const codeMatch = maskedBody.match(/code=([^&]+)/);
      if (codeMatch && codeMatch[1]) {
        const code = codeMatch[1];
        if (code.length > 8) {
          const codePrefix = code.substring(0, 4);
          const codeSuffix = code.substring(code.length - 4);
          maskedBody = maskedBody.replace(/code=[^&]+/, `code=${codePrefix}...${codeSuffix}`);
        }
      }
    }
    
    if (maskedBody.includes('password=')) {
      maskedBody = maskedBody.replace(/password=[^&]+/, 'password=********');
    }
    
    if (maskedBody.includes('app_password=')) {
      maskedBody = maskedBody.replace(/app_password=[^&]+/, 'app_password=********');
    }
    
    if (maskedBody.includes('token=')) {
      // Extract and mask token
      const tokenMatch = maskedBody.match(/token=([^&]+)/);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];
        if (token.length > 8) {
          const tokenPrefix = token.substring(0, 4);
          const tokenSuffix = token.substring(token.length - 4);
          maskedBody = maskedBody.replace(/token=[^&]+/, `token=${tokenPrefix}...${tokenSuffix}`);
        } else {
          maskedBody = maskedBody.replace(/token=[^&]+/, 'token=********');
        }
      }
    }
    
    return maskedBody;
  }
};

// Helper function to extract headers from Response object
const extractResponseHeaders = (response: Response): Record<string, string> => {
  const headers: Record<string, string> = {};
  response.headers.forEach((value, name) => {
    headers[name] = value;
  });
  return headers;
};

// Helper function to log API requests to Supabase
export const logApiRequest = async (
  request: any,
  response: any,
  logType: string = 'API Request'
) => {
  try {
    console.log(`[${logType}] Logging request to ${request.url}`);
    
    // Keep only the most recent 30 logs
    const { data: existingLogs, error: countError } = await supabase
      .from('wordpress_api_logs')
      .select('id')
      .order('timestamp', { ascending: false })
      .limit(50);
    
    if (!countError && existingLogs && existingLogs.length >= 30) {
      // Calculate how many logs to remove
      const logsToRemove = existingLogs.slice(29); // Keep indices 0-29 (first 30)
      
      if (logsToRemove.length > 0) {
        const idsToRemove = logsToRemove.map(log => log.id);
        
        // Delete excess logs
        await supabase
          .from('wordpress_api_logs')
          .delete()
          .in('id', idsToRemove);
      }
    }
    
    // Mask sensitive data in headers and response
    const maskedHeaders = request.headers ? maskSensitiveHeaders(request.headers) : {};
    
    // Process request body if present
    let maskedRequestBody = '';
    if (request.body) {
      if (typeof request.body === 'string') {
        maskedRequestBody = maskSensitiveBody(request.body);
      } else if (typeof request.body === 'object') {
        maskedRequestBody = maskSensitiveBody(JSON.stringify(request.body));
      }
    }
    
    // Process response body
    let maskedResponseBody = '';
    if (response.body) {
      if (typeof response.body === 'string') {
        maskedResponseBody = response.body;
      } else if (typeof response.body === 'object') {
        maskedResponseBody = JSON.stringify(response.body);
      }
    }
    
    // Extract response headers if available
    const responseHeaders = response.headers ? 
      (typeof response.headers === 'object' ? response.headers : {}) : {};
    
    // Truncate response body if it's too large (increased limit for better debugging)
    const truncatedResponseBody = String(maskedResponseBody).substring(0, 5000);
    
    const logEntry: ApiLogEntry = {
      request_method: request.method || 'GET',
      request_url: request.url,
      request_headers: maskedHeaders as Json,
      request_body: maskedRequestBody || undefined,
      response_status: response.status || 0,
      response_headers: responseHeaders as Json,
      response_body: truncatedResponseBody,
      log_type: logType,
      error: response.error ? String(response.error) : undefined
    };
    
    const { error } = await supabase
      .from('wordpress_api_logs')
      .insert(logEntry);
      
    if (error) {
      console.error("Error logging API request:", error);
    } else {
      console.log(`[${logType}] Successfully logged request to ${request.url}`);
    }
  } catch (error) {
    console.error("Error in logApiRequest:", error);
  }
};

// Helper function to handle API errors
const handleApiError = (error: any, message: string) => {
  console.error(`WordPress API Error: ${message}`, error);
  toast.error(`Error: ${message}`);
  return null;
};

// Helper function to make authenticated WordPress API requests
export const makeWordPressApiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const settings = await getWordPressSettings();
    const { api_url, username, app_password } = settings;
    
    // Encoding the application password with username
    const appPasswordEncoded = btoa(`${username}:${app_password}`);
    
    const url = endpoint.startsWith('http') ? endpoint : `${api_url}${endpoint}`;
    
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Basic ${appPasswordEncoded}`,
      },
    };
    
    // Log the request details (before making the request)
    const requestDetails = { 
      method: requestOptions.method || 'GET', 
      url, 
      headers: requestOptions.headers,
      body: requestOptions.body ? 
        (typeof requestOptions.body === 'string' ? 
          maskSensitiveBody(requestOptions.body) : 
          JSON.stringify(requestOptions.body)
        ) : undefined
    };
    
    const startTime = Date.now();
    let responseDetails: any = { status: 0, body: "No response" };
    
    try {
      const response = await fetch(url, requestOptions);
      const responseBody = await response.clone().text();
      const responseHeaders = extractResponseHeaders(response);
      
      responseDetails = { 
        status: response.status, 
        body: responseBody,
        headers: responseHeaders
      };
      
      // Log the API request and response
      await logApiRequest(
        requestDetails,
        responseDetails,
        "WordPress API Request"
      );
      
      if (!response.ok) {
        // If response is not ok, handle the error based on status code
        if (response.status === 401) {
          toast.error("Authentication failed. Please check your WordPress credentials.");
          return null;
        }
        throw new Error(`HTTP error ${response.status}: ${responseBody}`);
      }
      
      return response;
    } catch (fetchError) {
      // Log the error
      responseDetails.body = fetchError instanceof Error ? fetchError.message : "Network error";
      responseDetails.error = fetchError;
      await logApiRequest(requestDetails, responseDetails, "WordPress API Error");
      throw fetchError;
    }
  } catch (error) {
    console.error("Error making WordPress API request:", error);
    toast.error("Failed to connect to WordPress API");
    return null;
  }
};

// Helper function to directly fetch any URL for troubleshooting
export const fetchExternalUrl = async (url: string, options: RequestInit = {}) => {
  try {
    console.log(`Fetching external URL: ${url}`);
    
    // Prepare request details for logging
    const requestDetails = {
      method: options.method || 'GET',
      url,
      headers: options.headers || {},
      body: options.body ? 
        (typeof options.body === 'string' ? 
          maskSensitiveBody(options.body) : 
          JSON.stringify(options.body)
        ) : undefined
    };
    
    // Make the request
    const response = await fetch(url, options);
    const responseText = await response.clone().text();
    const responseHeaders = extractResponseHeaders(response);
    
    // Prepare response details for logging
    const responseDetails = {
      status: response.status,
      body: responseText,
      headers: responseHeaders
    };
    
    // Log the external request
    await logApiRequest(requestDetails, responseDetails, "External URL Request");
    
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      text: responseText,
      json: () => {
        try {
          return JSON.parse(responseText);
        } catch (e) {
          console.error("Error parsing response as JSON:", e);
          return null;
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching external URL ${url}:`, error);
    
    // Log the error
    const responseDetails = {
      status: 0,
      body: error instanceof Error ? error.message : "Network error",
      error
    };
    
    await logApiRequest(
      { method: options.method || 'GET', url, headers: options.headers || {} },
      responseDetails, 
      "External URL Error"
    );
    
    return {
      ok: false,
      status: 0,
      statusText: error instanceof Error ? error.message : "Network error",
      headers: {},
      text: error instanceof Error ? error.message : "Network error",
      json: () => null
    };
  }
};

/**
 * Fetch users from WordPress
 */
export const fetchWordPressUsers = async () => {
  try {
    const response = await makeWordPressApiRequest('/users?context=edit');
    
    if (!response) {
      return [];
    }
    
    const users = await response.json();
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Error fetching WordPress users:", error);
    toast.error("Failed to fetch users from WordPress");
    // Return empty array instead of null to avoid undefined errors
    return [];
  }
};

/**
 * Fetch posts from WordPress
 */
export const fetchWordPressPosts = async (page = 1, perPage = 10, categoryId?: number) => {
  try {
    let endpoint = `/posts?page=${page}&per_page=${perPage}&_embed=true`;
    
    if (categoryId) {
      endpoint += `&categories=${categoryId}`;
    }
    
    const response = await makeWordPressApiRequest(endpoint);
    
    if (!response) {
      return { posts: [], totalPages: 0, totalPosts: 0 };
    }
    
    const posts = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    
    return {
      posts: Array.isArray(posts) ? posts : [],
      totalPages,
      totalPosts
    };
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    toast.error("Failed to fetch posts from WordPress");
    // Return empty objects instead of null to avoid undefined errors
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
};

/**
 * Get WordPress admin URLs
 */
export const getWordPressUserEditUrl = async (userId: number) => {
  const settings = await getWordPressSettings();
  return `${settings.admin_url}/user-edit.php?user_id=${userId}`;
};

export const getWordPressPostEditUrl = async (postId: number) => {
  const settings = await getWordPressSettings();
  return `${settings.admin_url}/post.php?post=${postId}&action=edit`;
};

/**
 * Fetch a single post from WordPress
 */
export const fetchWordPressPost = async (postId: number) => {
  try {
    const response = await makeWordPressApiRequest(`/posts/${postId}?_embed=true`);
    
    if (!response) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching WordPress post #${postId}:`, error);
    toast.error(`Failed to fetch post #${postId}`);
    return null;
  }
};

/**
 * Fetch a post by slug
 */
export const fetchWordPressPostBySlug = async (slug: string) => {
  try {
    const response = await makeWordPressApiRequest(`/posts?slug=${slug}&_embed=true`);
    
    if (!response) {
      return null;
    }
    
    const posts = await response.json();
    
    if (Array.isArray(posts) && posts.length > 0) {
      return posts[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching WordPress post with slug ${slug}:`, error);
    toast.error(`Failed to fetch post with slug ${slug}`);
    return null;
  }
};

/**
 * Fetch categories from WordPress
 */
export const fetchWordPressCategories = async () => {
  try {
    const response = await makeWordPressApiRequest('/categories');
    
    if (!response) {
      return [];
    }
    
    const categories = await response.json();
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    toast.error("Failed to fetch categories from WordPress");
    return [];
  }
};

/**
 * Update WordPress settings in Supabase
 */
export const updateWordPressSettings = async (settings: WordPressSettings) => {
  try {
    const { data, error } = await supabase
      .from('wordpress_settings')
      .upsert(settings, { onConflict: 'id' })
      .select()
      .single();
      
    if (error) {
      console.error("Error updating WordPress settings:", error);
      toast.error("Failed to update WordPress settings");
      return false;
    }
    
    toast.success("WordPress settings updated successfully");
    return true;
  } catch (error) {
    console.error("Error in updateWordPressSettings:", error);
    toast.error("An error occurred while updating WordPress settings");
    return false;
  }
};

/**
 * Fetch API logs from Supabase
 */
export const fetchWordPressApiLogs = async (limit = 30) => {
  try {
    const { data, error } = await supabase
      .from('wordpress_api_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error("Error fetching WordPress API logs:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchWordPressApiLogs:", error);
    return [];
  }
};

// Add admin functionality to view database values directly for troubleshooting
export const fetchDatabaseTable = async (tableName: AllowedTable, limit: number = 100) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(limit);
      
    if (error) {
      console.error(`Error fetching table ${tableName}:`, error);
      return null;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchDatabaseTable for ${tableName}:`, error);
    return null;
  }
};
