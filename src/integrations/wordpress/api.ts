
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
  response_status: number;
  response_body?: string;
  timestamp?: string;
}

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

// Helper function to log API requests to Supabase
export const logApiRequest = async (request: any, response: any) => {
  try {
    const logEntry: ApiLogEntry = {
      request_method: request.method || 'GET',
      request_url: request.url,
      request_headers: request.headers,
      response_status: response.status,
      response_body: typeof response.body === 'object' ? JSON.stringify(response.body) : String(response.body).substring(0, 1000),
    };
    
    const { error } = await supabase
      .from('wordpress_api_logs')
      .insert(logEntry);
      
    if (error) {
      console.error("Error logging API request:", error);
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
    
    const response = await fetch(url, requestOptions);
    
    // Log the API request and response
    await logApiRequest(
      { method: requestOptions.method || 'GET', url, headers: requestOptions.headers },
      { status: response.status, body: await response.clone().text() }
    );
    
    if (!response.ok) {
      // If response is not ok, handle the error based on status code
      if (response.status === 401) {
        toast.error("Authentication failed. Please check your WordPress credentials.");
        return null;
      }
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error making WordPress API request:", error);
    toast.error("Failed to connect to WordPress API");
    return null;
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
export const fetchWordPressApiLogs = async (limit = 20) => {
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
