import SEO from '../components/SEO'

 
export default function Kabbalah() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Kabbalah — Tarot Pathwork",
      "url": "https://www.tarotpathwork.com/kabbalah",
      "description": "A practical introduction to the Living Tree, paths, and angelic correspondences in the Tarot Pathwork system."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tarotpathwork.com" },
        { "@type":"ListItem", "position":2, "name":"Kabbalah", "item":"https://www.tarotpathwork.com/kabbalah" }
      ]
    }
  ]
 
  return (
    <>
      <SEO
        title="Kabbalah — The Living Tree | Tarot Pathwork"
        description="The Living Tree of Kabbalah: sephiroth, paths, and angelic correspondences—explained in clear, practical language."
        jsonLd={jsonLd}
      />
 
      {/* HERO: 2 columns, image left, text right */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          {/* Image (left) */}
          <div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <img
                src="/kabbalahHero.png"
                alt="Stylized Tree of Life diagram with luminous pathways"
                className="block w-full h-full object-cover"
              />
            </div>
          </div>
 
          {/* Text (right) */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl items-center font-display tracking-tight text-slate-900">
              Kabbalah The Architecture of Divine Order
            </h1>
            <p className="mt-4 text-lg text-slate-600">
                The Kabbalah has taken many forms across the centuries—Jewish (in all its forms), Christian, Hermetic—each seeking to map the descent of divine light into creation and its return through our own understanding. In Tarot Pathwork, this map is both studied and lived. My work draws from Christian Kabbalah, where Christ is the Logos, the living bridge between the infinite and the human; and from Hermetic Kabbalah, which translates the Tree of Life into a language of alchemy, astrology, and tarot, just as the ancients intended. Together they form a path of revelation and embodiment—a way to discern divine order in real time, not as belief, but as experience.
                Through contemplation, ritual, and the cards themselves, the Tree becomes a mirror of the soul and a diagram of healing. It is from the meeting of these two rivers—the Christian and the Hermetic—that a new current has emerged in my work, one I call Lucian Kabbalah.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#living-tree" className="px-5 py-3 rounded-2xl bg-slate-900 text-white hover:opacity-90">
                Explore the Tree
              </a>
              <a href="/blog" className="px-5 py-3 rounded-2xl border hover:bg-slate-50">
                Read Articles
              </a>
            </div>
          </div>
        </div>
      </section>
 
      {/* BODY SECTIONS (stubs) */}
      <section id="living-tree" className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="prose">
          <h2>The Living Tree</h2>
          <p>
            The Tree of Life is a dynamic diagram of flow—Keter to Malkhut—bridged by
            twenty-two illuminated pathways. In Tarot Pathwork we pair these with tarot
            attributions and angelic correspondences to create a practical, testable system.
          </p>
        </div>
      </section>
    </>
  )
}