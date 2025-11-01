import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RichTextViewer } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  published: boolean;
  created_at: string;
  published_at: string;
  cover_image?: string;
}


export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    loadPost();
  }, [slug]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  async function loadPost() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        const { data: dataById } = await supabase
          .from('posts')
          .select('*')
          .eq('id', slug)
          .eq('published', true)
          .single();
        setPost(dataById as Post);
      } else {
        setPost(data as Post);
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setRecentPosts(data as Post[]);
      }
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
  };

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

  const sharePage = `${window.location.origin}/api/share/${post.slug || post.id}`;
  const shareText = encodeURIComponent(`Check out this post: ${post.title}`);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/blog')}>
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

        {/* Share Section */}
        
        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            If you found this article helpful, please share with others
          </h3>

          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(sharePage)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-full hover:bg-muted transition"
            >
              <Twitter className="w-5 h-5 text-sky-500" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-full hover:bg-muted transition"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-full hover:bg-muted transition"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
            </a>

            {/* Copy Link Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                const toast = document.createElement('div');
                toast.textContent = 'Link copied!';
                toast.className =
                  'fixed bottom-6 right-6 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fadeInOut';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
              className="p-2 border rounded-full hover:bg-muted transition"
              title="Copy link"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Recent Posts Teaser */}
        {recentPosts.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h3 className="text-lg font-semibold mb-6">Recent Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((rp) => (
                <Card
                  key={rp.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {rp.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rp.cover_image}
                        alt={rp.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <time
                      dateTime={rp.published_at}
                      className="text-xs text-muted-foreground block mb-2"
                    >
                      {new Date(rp.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <Link
                      to={`/blog/${rp.slug || rp.id}`}
                      className="font-semibold text-headerText hover:text-yellow-600 transition-colors"
                    >
                      {rp.title}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
