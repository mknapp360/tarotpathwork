import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/types'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status','published')
        .limit(1)
        .single()
      if (!isMounted) return
      if (error) console.error(error)
      setPost(data as Post | null)
      setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [slug])

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-10">Loading…</div>
  if (!post) return <div className="mx-auto max-w-3xl px-4 py-10">Not found.</div>

  const jsonLd = [{
    "@context":"https://schema.org",
    "@type":"Article",
    "headline": post.title,
    "datePublished": post.published_at ?? post.created_at,
    "dateModified": post.updated_at,
    "image": post.cover_image_url ?? undefined,
    "author": { "@type":"Person", "name":"Frater Lucis" },
    "mainEntityOfPage": { "@type":"WebPage", "@id": `https://www.yourdomain.com/blog/${post.slug}` }
  }]

  return (
    <>
      <SEO title={`${post.title} — Tarot Pathwork`} description={post.excerpt ?? undefined} jsonLd={jsonLd}/>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose">
        <header className="not-prose mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{post.title}</h1>
          {post.published_at && (
            <p className="text-sm text-slate-500 mt-1">{new Date(post.published_at).toLocaleDateString()}</p>
          )}
          {post.cover_image_url && (
            <img src={post.cover_image_url} alt="" className="mt-4 w-full rounded-xl" />
          )}
        </header>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content_md}
        </ReactMarkdown>
      </article>
    </>
  )
}
