import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RichTextViewer } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
  created_at: string;
  published_at: string;
  cover_image?: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function load() {
      setLoading(true);
      
      try {
        // First try to find by slug
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)  // Changed from status to published
          .single();

        if (!isMounted) return;

        if (error) {
          // If slug fails, try by ID
          const { data: dataById, error: errorById } = await supabase
            .from('posts')
            .select('*')
            .eq('id', slug)
            .eq('published', true)
            .single();

          if (errorById) {
            console.error('Error loading post:', errorById);
            setPost(null);
          } else {
            setPost(dataById as Post);
          }
        } else {
          setPost(data as Post);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setPost(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    load();
    return () => { isMounted = false };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center flex-1">
              <h1 className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Tarot Pathwork
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Title and Meta */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-headerText">
            {post.title}
          </h1>
          
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>

        {/* Rich Text Content */}
        <div className="prose-wrapper">
          <RichTextViewer content={post.content} />
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-border">
          <Button onClick={() => navigate('/blog')} variant="outline">
            ← Back to Blog
          </Button>
        </div>
      </article>
    </div>
  );
}