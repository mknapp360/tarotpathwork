import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/types'

const PAGE_SIZE = 9

export default function BlogIndex(){
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      const from = page * PAGE_SIZE
      const to = from + PAGE_SIZE - 1
      const { data, error } = await supabase
        .from('posts')
        .select('id,title,slug,excerpt,cover_image_url,published_at,tags,status')
        .eq('status','published')
        .order('published_at', { ascending: false, nullsFirst: false })
        .range(from, to)
      if (!isMounted) return
      if (error) console.error(error)
      if (data) {
        setPosts(prev => [...prev, ...data as unknown as Post[]])
        if ((data as Post[]).length < PAGE_SIZE) setHasMore(false)
      }
      setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [page])

  const jsonLd=[{
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "name":"Tarot Pathwork Blog",
    "url":"https://www.yourdomain.com/blog"
  }]

  return (
    <>
      <SEO title="Blog — Insights & Teachings" description="Essays on Kabbalah, tarot spreads, angelic correspondences." jsonLd={jsonLd}/>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Blog</h1>

        {posts.length === 0 && !loading && (
          <p className="text-slate-600">No posts yet.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p.id} className="rounded-2xl border overflow-hidden hover:shadow">
              {p.cover_image_url && (
                <Link to={`/blog/${p.slug}`}>
                  <img src={p.cover_image_url} alt="" className="w-full h-40 object-cover" />
                </Link>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                {p.published_at && (
                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(p.published_at).toLocaleDateString()}
                  </p>
                )}
                {p.excerpt && <p className="mt-2 text-slate-700">{p.excerpt}</p>}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs bg-slate-100 rounded-full px-2 py-1">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={loading}
              className="px-5 py-2 rounded-xl border hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}
      </section>
    </>
  )
}

