import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Image from '@tiptap/extension-image';
import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2,
  Quote,
  Minus,
  Undo,
  Redo,
  ImageIcon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { ImageUploadDialog } from './ImageUploadDialog';

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: element => element.getAttribute('height'),
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return { height: attributes.height };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const container = document.createElement('div');
      container.className = 'image-resizer';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.maxWidth = '100%';
      container.style.margin = '1rem 0';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.borderRadius = '0.5rem';
      
      if (node.attrs.width) {
        img.style.width = node.attrs.width + 'px';
      }

      container.appendChild(img);

      // Only add resize handles in edit mode
      if (editor.isEditable) {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.right = '0';
        resizeHandle.style.width = '20px';
        resizeHandle.style.height = '20px';
        resizeHandle.style.background = '#3b82f6';
        resizeHandle.style.borderRadius = '0 0 0.5rem 0';
        resizeHandle.style.cursor = 'nwse-resize';
        resizeHandle.style.opacity = '0';
        resizeHandle.style.transition = 'opacity 0.2s';

        container.addEventListener('mouseenter', () => {
          resizeHandle.style.opacity = '0.8';
        });

        container.addEventListener('mouseleave', () => {
          resizeHandle.style.opacity = '0';
        });

        let startX = 0;
        let startWidth = 0;

        const onMouseDown = (e: MouseEvent) => {
          e.preventDefault();
          startX = e.clientX;
          startWidth = img.offsetWidth;

          const onMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const newWidth = Math.max(100, Math.min(startWidth + deltaX, container.parentElement!.offsetWidth));
            img.style.width = newWidth + 'px';
          };

          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Update node attributes
            const newWidth = img.offsetWidth;
            if (typeof getPos === 'function') {
              editor.commands.updateAttributes('image', { width: newWidth });
            }
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        };

        resizeHandle.addEventListener('mousedown', onMouseDown);
        container.appendChild(resizeHandle);
      }

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') {
            return false;
          }
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || '';
          if (updatedNode.attrs.width) {
            img.style.width = updatedNode.attrs.width + 'px';
          }
          return true;
        },
      };
    };
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing or type / for plugins',
  editable = true 
}: RichTextEditorProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      ResizableImage.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageInsert = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const MenuBar = () => (
    <div className="border-b border-border bg-muted/30 sticky top-0 z-10 flex flex-wrap gap-1 p-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(editor.isActive('bold') && 'bg-accent')}
      >
        <Bold className="w-4 h-4" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(editor.isActive('italic') && 'bg-accent')}
      >
        <Italic className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-border my-auto mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive('heading', { level: 1 }) && 'bg-accent')}
      >
        <Heading1 className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive('heading', { level: 2 }) && 'bg-accent')}
      >
        <Heading2 className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-border my-auto mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') && 'bg-accent')}
      >
        <List className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive('orderedList') && 'bg-accent')}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') && 'bg-accent')}
      >
        <Quote className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-border my-auto mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowImageDialog(true)}
      >
        <ImageIcon className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-border my-auto mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <>
      <style>
        {`
          .image-resizer:hover .resize-handle {
            opacity: 0.8 !important;
          }
          
          .image-resizer img {
            transition: none;
          }
        `}
      </style>
      
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        {editable && <MenuBar />}
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      <ImageUploadDialog
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onInsert={handleImageInsert}
      />
    </>
  );
}

// Read-only viewer component for displaying posts
export function RichTextViewer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-content">
      <EditorContent editor={editor} />
    </div>
  );
}