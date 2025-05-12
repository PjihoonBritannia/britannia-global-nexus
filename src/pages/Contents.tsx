
import React, { useState, useEffect } from 'react';
import { fetchWordPressPosts } from '@/integrations/wordpress/api';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

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
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: [{
      source_url: string;
      alt_text: string;
    }];
    author?: [{
      name: string;
    }];
  };
}

const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Contents = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;  // Show 6 posts per page

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchWordPressPosts(currentPage, postsPerPage);
        
        if (result && result.posts) {
          setPosts(result.posts);
          setTotalPages(result.totalPages);
        } else {
          setError('No posts found or error fetching posts');
          setPosts([]);
        }
      } catch (err) {
        console.error('Error fetching WordPress posts:', err);
        setError('Failed to load posts from the WordPress site');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, [currentPage]);
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <SectionTitle
        title="Latest Content"
        subtitle="News, Articles, and Insights from Britannia Global Nexus"
        className="mb-12"
      />
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-point" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-gray-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div className="text-sm text-gray-500 mb-4">
                    {post._embedded?.author?.[0]?.name && (
                      <span className="mr-3">By {post._embedded.author[0].name}</span>
                    )}
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div 
                    className="text-gray-600 mb-6 flex-grow line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-point hover:bg-point/90 text-white px-4 py-2 rounded inline-block mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Contents;
