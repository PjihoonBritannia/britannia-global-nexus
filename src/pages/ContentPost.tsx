
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWordPressPostBySlug } from '@/integrations/wordpress/api';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, Calendar, User } from 'lucide-react';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
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

const ContentPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      if (!slug) {
        setError('Post not found');
        setLoading(false);
        return;
      }
      
      try {
        const postData = await fetchWordPressPostBySlug(slug);
        
        if (postData) {
          setPost(postData);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error(`Error fetching post with slug ${slug}:`, err);
        setError('Failed to load post from WordPress');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleGoBack = () => {
    navigate('/contents');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={handleGoBack}
        className="mb-6 flex items-center hover:bg-gray-100"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Contents
      </Button>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-point" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-gray-500">{error}</p>
          <Button 
            className="mt-4 bg-point hover:bg-point/90 text-white" 
            onClick={handleGoBack}
          >
            Go Back to Contents
          </Button>
        </div>
      ) : post ? (
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <div className="h-72 overflow-hidden">
              <img 
                src={post._embedded['wp:featuredmedia'][0].source_url} 
                alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 
              className="text-3xl font-bold mb-4" 
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            
            <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-4">
              {post._embedded?.author?.[0]?.name && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post._embedded.author[0].name}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        </article>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">Post not found</p>
          <Button 
            className="mt-4 bg-point hover:bg-point/90 text-white" 
            onClick={handleGoBack}
          >
            Go Back to Contents
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentPost;
