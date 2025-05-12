
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { WordPressUserInfo, revokeWordPressToken } from '@/integrations/wordpress/oauth';

export type AuthSource = 'supabase' | 'wordpress';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  wpUser: WordPressUserInfo | null;
  authSource: AuthSource | null;
  setWordPressSession: (userInfo: WordPressUserInfo, isAdmin: boolean, accessToken: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [wpUser, setWpUser] = useState<WordPressUserInfo | null>(null);
  const [authSource, setAuthSource] = useState<AuthSource | null>(null);
  const [wpAccessToken, setWpAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for WordPress session first
    const wpUserData = localStorage.getItem('wp_user_info');
    const wpToken = localStorage.getItem('wp_access_token');
    const wpIsAdmin = localStorage.getItem('wp_is_admin') === 'true';
    
    if (wpUserData && wpToken) {
      try {
        setWpUser(JSON.parse(wpUserData));
        setWpAccessToken(wpToken);
        setIsAdmin(wpIsAdmin);
        setAuthSource('wordpress');
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing WordPress user data:', error);
        // Clear invalid WP session data
        localStorage.removeItem('wp_user_info');
        localStorage.removeItem('wp_access_token');
        localStorage.removeItem('wp_is_admin');
      }
    }
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Only check admin status after a small delay to avoid recursion issues
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
        setAuthSource('supabase');
      } else {
        setIsAdmin(false);
        setAuthSource(null);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id);
        setAuthSource('supabase');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Logged in successfully');
      navigate('/workspace');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Handle WordPress signout if needed
      if (authSource === 'wordpress' && wpAccessToken) {
        await revokeWordPressToken(wpAccessToken);
        localStorage.removeItem('wp_user_info');
        localStorage.removeItem('wp_access_token');
        localStorage.removeItem('wp_is_admin');
        setWpUser(null);
        setWpAccessToken(null);
        setIsAdmin(false);
        setAuthSource(null);
        toast.success('Logged out successfully');
        navigate('/');
        return;
      }
      
      // Handle Supabase signout
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const setWordPressSession = (userInfo: WordPressUserInfo, isAdminUser: boolean, accessToken: string) => {
    setWpUser(userInfo);
    setIsAdmin(isAdminUser);
    setAuthSource('wordpress');
    setWpAccessToken(accessToken);
    
    // Store WP user info in localStorage for persistence
    localStorage.setItem('wp_user_info', JSON.stringify(userInfo));
    localStorage.setItem('wp_access_token', accessToken);
    localStorage.setItem('wp_is_admin', isAdminUser ? 'true' : 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signOut,
        isAdmin,
        wpUser,
        authSource,
        setWordPressSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
