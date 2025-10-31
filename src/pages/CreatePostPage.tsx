import { useState } from 'react';
import { RichTextEditor } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { supabase } from '../lib/supabase';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Not authenticated',
          description: 'Please log in to create posts',
          variant: 'destructive',
        });
        return;
      }

      // Save to your posts table - adjust table name/columns as needed
      const { error } = await supabase
        .from('posts')
        .insert({
          title,
          content, // This is now rich HTML
          author_id: user.id,
          published: false, // Draft by default
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Post saved!',
        description: 'Your post has been saved as a draft',
      });

      // Navigate to posts list or edit page
      navigate('/admin/posts');

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
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Create Post</h1>
                <p className="text-sm text-muted-foreground">Write your blog post or article</p>
              </div>
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <Input
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing or type / for plugins"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}