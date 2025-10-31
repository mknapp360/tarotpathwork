import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RichTextEditor } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { supabase } from '../lib/supabase';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';


export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Not authenticated',
          description: 'Please log in to edit posts',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data.author_id !== user.id) {
        toast({
          title: 'Access denied',
          description: 'You can only edit your own posts',
          variant: 'destructive',
        });
        navigate('/admin/posts');
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setSlug(data.slug || '');
      setCoverImage(data.cover_image || '');
      setPublished(data.published);

    } catch (error: any) {
      console.error('Error loading post:', error);
      toast({
        title: 'Error loading post',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please add a title to your post',
        variant: 'destructive',
      });
      return;
    }

    if (!content.trim() || content === '<p></p>') {
      toast({
        title: 'Content required',
        description: 'Please add content to your post',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const updateData: any = {
        title,
        content,
        excerpt: excerpt || null,
        slug: slug || null,
        cover_image: coverImage || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Post updated!',
        description: 'Your changes have been saved',
      });

    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    setSaving(true);

    try {
      const newPublishedState = !published;
      
      const { error } = await supabase
        .from('posts')
        .update({ 
          published: newPublishedState,
          published_at: newPublishedState ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setPublished(newPublishedState);
      
      toast({
        title: newPublishedState ? 'Post published!' : 'Post unpublished',
        description: newPublishedState 
          ? 'Your post is now live' 
          : 'Your post is now a draft',
      });

    } catch (error: any) {
      console.error('Error toggling publish:', error);
      toast({
        title: 'Failed to update',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Post deleted',
        description: 'Post has been permanently deleted',
      });

      navigate('/admin/posts');

    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Failed to delete',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Auto-generate slug if it's empty or matches the old title's slug
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin/posts')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <p className="text-sm text-muted-foreground">Make changes to your post</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              
              <Button
                variant={published ? 'outline' : 'default'}
                onClick={handlePublishToggle}
                disabled={saving}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {published ? 'Unpublish' : 'Publish'}
              </Button>
              
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Meta Fields */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Post Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Post title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  placeholder="post-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Your post will be at: /blog/{slug || 'your-slug'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  placeholder="Short description for SEO and previews"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover-image">Cover Image URL</Label>
                <Input
                  id="cover-image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
                {coverImage && (
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Content *</h2>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your post..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post
              and remove it from the blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}