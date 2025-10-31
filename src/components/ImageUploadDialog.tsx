import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ImageUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

export function ImageUploadDialog({ open, onClose, onInsert }: ImageUploadDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      onInsert(publicUrl);
      onClose();
      
      toast({
        title: 'Image uploaded',
        description: 'Image has been added to your post',
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) {
      toast({
        title: 'URL required',
        description: 'Please enter an image URL',
        variant: 'destructive',
      });
      return;
    }

    onInsert(imageUrl);
    setImageUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'upload'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'url'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <LinkIcon className="w-4 h-4 inline mr-2" />
            URL
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-4 py-4">
            <Label htmlFor="image-upload">Choose an image to upload</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}

        {/* URL Tab */}
        {activeTab === 'url' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleUrlInsert}>Insert Image</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}