import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Calendar, ArrowRight } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug?: string
  excerpt?: string | null
  content: string            // was content_md
  cover_image?: string | null // was cover_image_url
  published_at: string | null
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentPosts()
  }, [])

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, content, cover_image, published_at')
      .eq('published', true)                       // was status='published'
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(3)

      if (error) throw error
      setRecentPosts(data || [])
    } catch (error) {
      console.error('Error fetching recent posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getExcerpt = (post: Post) => {
    if (post.excerpt) return post.excerpt
    const text = post.content.replace(/<[^>]*>/g, '')
    return text.length > 150 ? text.substring(0, 150) + '...' : text
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  return (
    <>
      <SEO
        title="Tarot Pathwork"
        description="Psychic readings & spiritual teachings through a Kabbalistic lens."
        jsonLd={[{
          "@context":"https://schema.org",
          "@type":"WebSite",
          "name":"Tarot Pathwork",
          "url":"https://www.tarotpathwork.com"
        }]}
      />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        {/* background image */}
        <img
          src="/ChakraTree2025.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />

        {/* content */}
        <div className="relative z-10 h-full">
          <div className=" flex h-full w-full items-center px-2 lg:px-2">
            <div className="max-w-2xl lg:ml-0 md:ml-8">
              <h1 className="text-4xl sm:text-6xl font-display tracking-tight text-white px-12 lg:px-12">
                Psychic readings & spiritual teaching
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto bg-tpblue ">
          <h1 className="text-center py-8 text-4xl sm:text-5xl text-white font-display tracking-tight">
            What is Tarot Pathwork?
          </h1>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
            It is a living synthesis of Kabbalah, rooted in the ancient traditions of angelology and tarot, offering a way to discern divine order in real time. 
          </p>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
            Whether you find yourself at a crossroads or seeking a greater sense of purpose, it reveals the soul's architecture through direct experience rather than belief.
            Through the cards, the Tree of Life becomes a diagnostic map of your consciousness—each spread reflecting the state of your inner alignment. Tarot Pathwork serves as a sacred technology of translation, turning revelation into action and spirit into form.
          </p>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
            You may be seeking clarity in your daily life, or initiation into deeper mysteries, this work helps you realign with your divine purpose, restore coherence between the seen and unseen, and walk the path of awareness with presence and grace. Some arrive for the articles, others book a reading or a session, and some stay to study the deeper teachings.
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <Link to="/readings" className="px-5 py-3 rounded-2xl bg-tpgold mb-4 text-white hover:opacity-90">Book a Reading</Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-slate-900">
                Recent Writings
              </h2>
              <p className="mt-2 text-slate-600">
                Latest insights and teachings from the path
              </p>
            </div>
            <Link 
              to="/blog" 
              className="hidden sm:flex items-center gap-2 text-tpblue hover:text-tpgold transition-colors"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 h-48 rounded-lg mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-full mb-1" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug || post.id}`}
                    className="group block"
                  >
                    <article className="h-full flex flex-col">
                      {post.cover_image && (
                        <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-slate-100">
                          <img 
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.published_at || ''}>
                            {formatDate(post.published_at)}
                          </time>
                        </div>
                        <h3 className="text-xl font-medium text-slate-900 group-hover:text-tpblue transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-3">
                          {getExcerpt(post)}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-tpblue group-hover:text-tpgold transition-colors">
                        <span className="text-sm font-medium">Read more</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 text-tpblue hover:text-tpgold transition-colors"
                >
                  View all posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <p>No published posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>


      {/* Deeper Info Section */}
      <section className="bg-tpblue mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid sm:grid-cols-3 gap-6 py-16 text-white">
          {[
            {title:'Kabbalah', body:'Living Tree insights and angelic correspondences.'},
            {title:'Tarot Pathwork', body:'Structured spreads for clarity and action.'},
            {title:'Courses', body:'Self-paced modules with weekly Q&A (coming soon).'},
          ].map((c, i) => (
            <div key={i} className="p-6 rounded-2xl border hover:shadow-sm">
              <h3 className="text-lg font-medium">{c.title}</h3>
              <p className="mt-2 text-white">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}