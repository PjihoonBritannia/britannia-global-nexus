
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, LogIn } from 'lucide-react';
import { initiateWordPressOAuth } from '@/integrations/wordpress/oauth';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wpLoading, setWpLoading] = useState(false);
  const { signIn, user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/workspace" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWordPressLogin = async () => {
    try {
      setWpLoading(true);
      console.log("Starting WordPress OAuth flow");
      await initiateWordPressOAuth();
    } catch (error) {
      console.error('WordPress login error:', error);
    } finally {
      // Note: This may not execute if redirect happens successfully
      setWpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img 
              src="https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_black.svg"
              alt="Britannia Inc." 
              className="h-12 mx-auto mb-8"
            />
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Management Workspace
            </h1>
            <p className="text-gray-500 mb-8">
              Sign in to access the administration panel
            </p>
          </div>
          
          {/* WordPress OAuth Login Button */}
          <div className="mb-6">
            <Button
              onClick={handleWordPressLogin}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={wpLoading}
            >
              {wpLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Connecting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" /> Sign in with WordPress
                </span>
              )}
            </Button>
          </div>
          
          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">OR</span>
            </div>
          </div>
          
          {/* Supabase Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-11 bg-point hover:bg-point/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In with Email <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
