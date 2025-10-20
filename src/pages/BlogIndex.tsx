import SEO from '../components/SEO'
export default function BlogIndex(){
  const jsonLd=[{
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "name":"Tarot Pathwork Blog",
    "url":"https://www.yourdomain.com/blog"
  }]
  return (
    <>
      <SEO title="Blog — Insights & Teachings" description="Essays on Kabbalah, tarot spreads, angelic correspondences." jsonLd={jsonLd}/>
      <div className="prose">
        <h1>Blog</h1>
        <p>Posts coming soon.</p>
      </div>
    </>
  )
}
