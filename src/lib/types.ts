export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content_md: string
  cover_image_url: string | null
  tags: string[] | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}