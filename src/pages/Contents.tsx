
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWordPressPosts, fetchWordPressCategories } from '@/integrations/wordpress/api';
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
  slug: string;
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

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
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
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  const postsPerPage = 6;  // Show 6 posts per page

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchWordPressCategories();
        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (err) {
        console.error('Error fetching WordPress categories:', err);
      }
    };
    
    loadCategories();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchWordPressPosts(currentPage, postsPerPage, selectedCategory || undefined);
        
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
  }, [currentPage, selectedCategory]);
  
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
  
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };
  
  const handlePostClick = (slug: string) => {
    navigate(`/contents/${slug}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <SectionTitle
        title="Latest Content"
        subtitle="News, Articles, and Insights from Britannia Global Nexus"
        className="mb-8"
      />
      
      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => handleCategorySelect(null)}
            className={selectedCategory === null ? "bg-point hover:bg-point/90 text-white" : ""}
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategorySelect(category.id)}
              className={selectedCategory === category.id ? "bg-point hover:bg-point/90 text-white" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>
      
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
          <div className="space-y-6">
            {posts.map(post => (
              <div 
                key={post.id}
                className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 md:w-2/3 flex flex-col">
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
                  <div className="mt-auto">
                    <Button 
                      className="bg-point hover:bg-point/90 text-white"
                    >
                      Read More
                    </Button>
                  </div>
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
