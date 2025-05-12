
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
import { toast } from 'sonner';
import { Loader2, ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fetchWordPressPosts, getWordPressPostEditUrl } from '@/integrations/wordpress/api';

interface WordPressPostMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  status: string;
  slug: string;
  author: number;
  featured_media: number;
  _embedded?: {
    author?: {
      name: string;
    }[];
    'wp:featuredmedia'?: WordPressPostMedia[];
  };
}

const WorkspaceContents = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;
  
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);
  
  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      
      const result = await fetchWordPressPosts(page, postsPerPage);
      
      if (result && result.posts) {
        setPosts(result.posts);
        setTotalPages(result.totalPages);
        setTotalPosts(result.totalPosts);
      } else {
        setPosts([]);
        setTotalPages(1);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load WordPress posts');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'publish':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getFeaturedImageUrl = (post: WordPressPost) => {
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return null;
  };
  
  const getAuthorName = (post: WordPressPost) => {
    if (post._embedded && post._embedded.author && post._embedded.author[0]) {
      return post._embedded.author[0].name;
    }
    return 'Unknown author';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-500 mt-2">View WordPress content from britannia.co.kr. Content management is handled in WordPress admin.</p>
        </div>
        
        <Button 
          onClick={() => window.open('https://britannia.co.kr/wp-admin/post-new.php', '_blank')}
          className="bg-point hover:bg-point/90 text-white"
        >
          Create Post in WordPress
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
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No posts found in WordPress
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getFeaturedImageUrl(post) ? (
                          <img 
                            src={getFeaturedImageUrl(post) || ''} 
                            alt={post.title.rendered}
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{post.title.rendered}</div>
                          <div className="text-sm text-gray-500">/{post.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getAuthorName(post)}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(post.date)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => window.open(getWordPressPostEditUrl(post.id), '_blank')}
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
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {posts.length} of {totalPosts} posts
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-amber-50 border border-amber-200 rounded p-4 mt-4">
        <h3 className="text-amber-800 font-medium">WordPress Integration Active</h3>
        <p className="text-amber-700 text-sm mt-1">
          This page displays content from your WordPress site. To modify content, use the "Manage" button 
          to access the WordPress admin interface.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceContents;
