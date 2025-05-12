
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { fetchWordPressUsers, getWordPressUserEditUrl } from '@/integrations/wordpress/api';

interface WordPressUser {
  id: number;
  name: string;
  slug: string;
  description: string;
  url: string;
  avatar_urls: {
    [key: string]: string;
  };
  email?: string;
  roles: string[];
}

const WorkspaceAccounts = () => {
  const [users, setUsers] = useState<WordPressUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const wordpressUsers = await fetchWordPressUsers();
      
      if (Array.isArray(wordpressUsers) && wordpressUsers.length > 0) {
        setUsers(wordpressUsers);
      } else {
        // If we got an empty array or something unexpected
        setUsers([]);
        setError("No users found or access denied. Please check your WordPress API permissions.");
      }
    } catch (err) {
      console.error('Error in fetchUsers:', err);
      setError("An error occurred while loading WordPress users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Accounts</h1>
          <p className="text-gray-500 mt-2">
            View WordPress users from britannia.co.kr. Account management is handled in WordPress admin.
          </p>
        </div>
        
        <Button 
          onClick={() => window.open('https://britannia.co.kr/wp-admin/user-new.php', '_blank')}
          className="bg-point hover:bg-point/90 text-white"
        >
          Create User in WordPress
        </Button>
      </div>
      
      <div className="rounded-md border">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-point" />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-64 text-center px-4">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">WordPress API Error</h3>
            <p className="text-gray-500 max-w-md">{error}</p>
            <Button 
              onClick={fetchUsers} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No users found in WordPress
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_urls?.[96] || ''} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name || 'Unnamed User'}</div>
                          <div className="text-sm text-gray-500">@{user.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email || 'Hidden'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {user.roles && user.roles.length > 0 ? user.roles.map((role, index) => (
                          <span 
                            key={index}
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                              ${role === 'administrator' ? 'bg-red-100 text-red-700' : 
                                role === 'editor' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'}`}
                          >
                            {role}
                          </span>
                        )) : (
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                            No role
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => window.open(getWordPressUserEditUrl(user.id), '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded p-4 mt-4">
        <h3 className="text-amber-800 font-medium">WordPress Integration Active</h3>
        <p className="text-amber-700 text-sm mt-1">
          This page displays users from your WordPress site. To modify users, use the "Manage" button 
          to access the WordPress admin interface.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceAccounts;
