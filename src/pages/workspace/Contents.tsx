
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, MoreVertical, FileText, Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  content_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

const WorkspaceContents = () => {
  const { user } = useAuth();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false);
  const [isEditContentOpen, setIsEditContentOpen] = useState(false);
  const [isDeleteContentOpen, setIsDeleteContentOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    content_type: 'page',
    status: 'draft'
  });
  
  useEffect(() => {
    fetchContents();
  }, []);
  
  const fetchContents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching contents:', error);
        toast.error('Failed to load contents');
        return;
      }
      
      setContents(data || []);
    } catch (error) {
      console.error('Error in fetchContents:', error);
      toast.error('An error occurred while loading contents');
    } finally {
      setLoading(false);
    }
  };
  
  const createContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert({
          title: newContent.title,
          content: newContent.content,
          content_type: newContent.content_type,
          status: newContent.status,
          created_by: user?.id,
          updated_by: user?.id
        })
        .select();
      
      if (error) throw error;
      
      toast.success('Content created successfully');
      setIsCreateContentOpen(false);
      setNewContent({
        title: '',
        content: '',
        content_type: 'page',
        status: 'draft'
      });
      fetchContents();
    } catch (error: any) {
      console.error('Error creating content:', error);
      toast.error(error.message || 'Failed to create content');
    }
  };
  
  const updateContent = async () => {
    if (!selectedContent) return;
    
    try {
      const { error } = await supabase
        .from('content_items')
        .update({
          title: selectedContent.title,
          content: selectedContent.content,
          content_type: selectedContent.content_type,
          status: selectedContent.status,
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedContent.id);
      
      if (error) throw error;
      
      toast.success('Content updated successfully');
      setIsEditContentOpen(false);
      fetchContents();
    } catch (error: any) {
      console.error('Error updating content:', error);
      toast.error(error.message || 'Failed to update content');
    }
  };
  
  const deleteContent = async () => {
    if (!selectedContent) return;
    
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', selectedContent.id);
      
      if (error) throw error;
      
      toast.success('Content deleted successfully');
      setIsDeleteContentOpen(false);
      fetchContents();
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast.error(error.message || 'Failed to delete content');
    }
  };
  
  const handleEditContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditContentOpen(true);
  };
  
  const handleDeleteContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDeleteContentOpen(true);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-500 mt-2">Create and manage website content.</p>
        </div>
        
        <Button 
          onClick={() => setIsCreateContentOpen(true)}
          className="bg-point hover:bg-point/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Content
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No content items found
                  </TableCell>
                </TableRow>
              ) : (
                contents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{content.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{content.content_type}</span>
                    </TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(content.status)}`}
                      >
                        {content.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(content.created_at)}</TableCell>
                    <TableCell>{formatDate(content.updated_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditContent(content)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteContent(content)}
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
      
      {/* Create Content Dialog */}
      <Dialog open={isCreateContentOpen} onOpenChange={setIsCreateContentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Content title"
                value={newContent.title}
                onChange={(e) => setNewContent({...newContent, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={8}
                placeholder="Enter content here..."
                value={newContent.content}
                onChange={(e) => setNewContent({...newContent, content: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content_type">Content Type</Label>
                <select
                  id="content_type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newContent.content_type}
                  onChange={(e) => setNewContent({...newContent, content_type: e.target.value})}
                >
                  <option value="page">Page</option>
                  <option value="post">Post</option>
                  <option value="announcement">Announcement</option>
                  <option value="news">News</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newContent.status}
                  onChange={(e) => setNewContent({...newContent, status: e.target.value})}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={createContent}>Create Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Content Dialog */}
      <Dialog open={isEditContentOpen} onOpenChange={setIsEditContentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedContent.title}
                  onChange={(e) => setSelectedContent({...selectedContent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  rows={8}
                  value={selectedContent.content}
                  onChange={(e) => setSelectedContent({...selectedContent, content: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-content_type">Content Type</Label>
                  <select
                    id="edit-content_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedContent.content_type}
                    onChange={(e) => setSelectedContent({...selectedContent, content_type: e.target.value})}
                  >
                    <option value="page">Page</option>
                    <option value="post">Post</option>
                    <option value="announcement">Announcement</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedContent.status}
                    onChange={(e) => setSelectedContent({...selectedContent, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={updateContent}>Update Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Content Dialog */}
      <Dialog open={isDeleteContentOpen} onOpenChange={setIsDeleteContentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this content?</p>
            <p className="font-medium mt-2">{selectedContent?.title}</p>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={deleteContent}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceContents;
