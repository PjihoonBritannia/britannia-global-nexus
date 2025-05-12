
import { toast } from "sonner";

// WordPress API configuration
const WP_API_URL = "https://britannia.co.kr/wp-json/wp/v2";
const WP_ADMIN_URL = "https://britannia.co.kr/wp-admin";

// Encoding the application password
// Note: In a production environment, this should be stored securely on the server
const appPasswordEncoded = btoa(`britannia:XXR3 nGgK olNF QmsQ V9oq 00dg`);

// Helper function to handle API errors
const handleApiError = (error: any, message: string) => {
  console.error(`WordPress API Error: ${message}`, error);
  toast.error(`Error: ${message}`);
  return null;
};

/**
 * Fetch users from WordPress
 */
export const fetchWordPressUsers = async () => {
  try {
    const response = await fetch(`${WP_API_URL}/users?context=edit`, {
      headers: {
        Authorization: `Basic ${appPasswordEncoded}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    return handleApiError(error, "Failed to fetch users from WordPress");
  }
};

/**
 * Fetch posts from WordPress
 */
export const fetchWordPressPosts = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=true`,
      {
        headers: {
          Authorization: `Basic ${appPasswordEncoded}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const posts = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    
    return {
      posts,
      totalPages,
      totalPosts
    };
  } catch (error) {
    return handleApiError(error, "Failed to fetch posts from WordPress");
  }
};

/**
 * Get WordPress admin URLs
 */
export const getWordPressUserEditUrl = (userId: number) => {
  return `${WP_ADMIN_URL}/user-edit.php?user_id=${userId}`;
};

export const getWordPressPostEditUrl = (postId: number) => {
  return `${WP_ADMIN_URL}/post.php?post=${postId}&action=edit`;
};

/**
 * Fetch a single post from WordPress
 */
export const fetchWordPressPost = async (postId: number) => {
  try {
    const response = await fetch(`${WP_API_URL}/posts/${postId}?_embed=true`, {
      headers: {
        Authorization: `Basic ${appPasswordEncoded}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, `Failed to fetch post #${postId}`);
  }
};
