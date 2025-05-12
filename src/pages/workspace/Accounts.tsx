
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Loader2, MoreVertical, UserPlus, Edit, Trash2 } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  roles?: string[];
}

const WorkspaceAccounts = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    avatar_url: '',
    role: 'viewer'
  });
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching users:', authError);
        toast.error('Failed to load users');
        return;
      }
      
      if (!authUsers || !authUsers.users) {
        setUsers([]);
        return;
      }
      
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url');
        
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }
      
      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
        
      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }
      
      // Combine data
      const combinedUsers = authUsers.users.map(user => {
        const userProfile = profiles?.find(p => p.id === user.id);
        const userRoles = roles
          ?.filter(r => r.user_id === user.id)
          ?.map(r => r.role);
          
        return {
          id: user.id,
          email: user.email || '',
          profile: {
            full_name: userProfile?.full_name || null,
            avatar_url: userProfile?.avatar_url || null,
          },
          roles: userRoles || []
        };
      });
      
      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast.error('An error occurred while loading users');
    } finally {
      setLoading(false);
    }
  };
  
  const createUser = async () => {
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          full_name: newUser.full_name,
          avatar_url: newUser.avatar_url,
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Add role
        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: newUser.role
        });
        
        toast.success('User created successfully');
        setIsCreateUserOpen(false);
        setNewUser({
          email: '',
          password: '',
          full_name: '',
          avatar_url: '',
          role: 'viewer'
        });
        fetchUsers();
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    }
  };
  
  const updateUser = async () => {
    if (!selectedUser) return;
    
    try {
      // Update user in Supabase Auth
      const { error } = await supabase.auth.admin.updateUserById(
        selectedUser.id,
        {
          email: selectedUser.email,
          user_metadata: {
            full_name: selectedUser.profile?.full_name,
            avatar_url: selectedUser.profile?.avatar_url,
          }
        }
      );
      
      if (error) throw error;
      
      // Update profile
      await supabase.from('profiles').update({
        full_name: selectedUser.profile?.full_name,
        avatar_url: selectedUser.profile?.avatar_url,
      }).eq('id', selectedUser.id);
      
      toast.success('User updated successfully');
      setIsEditUserOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(error.message || 'Failed to update user');
    }
  };
  
  const deleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase.auth.admin.deleteUser(selectedUser.id);
      
      if (error) throw error;
      
      toast.success('User deleted successfully');
      setIsDeleteUserOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  };
  
  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };
  
  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };
  
  const getInitials = (name?: string | null) => {
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
          <p className="text-gray-500 mt-2">Manage user accounts and permissions.</p>
        </div>
        
        <Button 
          onClick={() => setIsCreateUserOpen(true)}
          className="bg-point hover:bg-point/90 text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Create User
        </Button>
      </div>
      
      <div className="rounded-md border">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-point" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profile?.avatar_url || ''} />
                          <AvatarFallback>{getInitials(user.profile?.full_name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.profile?.full_name || 'Unnamed User'}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {user.roles?.map((role, index) => (
                          <span 
                            key={index}
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                              ${role === 'admin' ? 'bg-red-100 text-red-700' : 
                                role === 'editor' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'}`}
                          >
                            {role}
                          </span>
                        ))}
                        {(!user.roles || user.roles.length === 0) && (
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                            No role
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      {/* Create User Dialog */}
      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                placeholder="John Doe"
                value={newUser.full_name}
                onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL (optional)</Label>
              <Input
                id="avatar_url"
                placeholder="https://example.com/avatar.png"
                value={newUser.avatar_url}
                onChange={(e) => setNewUser({...newUser, avatar_url: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={createUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-full_name">Full Name</Label>
                <Input
                  id="edit-full_name"
                  value={selectedUser.profile?.full_name || ''}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser, 
                    profile: { ...selectedUser.profile, full_name: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-avatar_url">Avatar URL</Label>
                <Input
                  id="edit-avatar_url"
                  value={selectedUser.profile?.avatar_url || ''}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser, 
                    profile: { ...selectedUser.profile, avatar_url: e.target.value }
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={updateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this user?</p>
            <p className="font-medium mt-2">{selectedUser?.email}</p>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={deleteUser}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceAccounts;
