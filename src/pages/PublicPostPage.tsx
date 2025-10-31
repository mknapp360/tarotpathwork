import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RichTextViewer } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  published_at: string;
  author_id: string;
}

export default function PublicPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      // First try to find by slug, fallback to ID
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        // Try by ID if slug fails
        const { data: dataById, error: errorById } = await supabase
          .from('posts')
          .select('*')
          .eq('id', slug)
          .eq('published', true)
          .single();

        if (errorById) {
          setNotFound(true);
          return;
        }
        setPost(dataById);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
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
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center flex-1">
              <h1 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Tarot Pathwork
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Discover the wisdom of the cards
              </p>
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-border" />

        {/* Rich Text Content */}
        <div className="prose-wrapper">
          <RichTextViewer content={post.content} />
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-border">
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>
      </article>
    </div>
  );
}