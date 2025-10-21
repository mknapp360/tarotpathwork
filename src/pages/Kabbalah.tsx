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
 
      {/* HERO SECTION */}
      <section className="w-full bg-black">
        <div className="mx-auto grid lg:grid-cols-2 items-center">
          {/* Image (left) */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src="/kabbalahHero.png"
                alt="Stylized Tree of Life diagram with luminous pathways"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          
 
          {/* Text (right) */}
          <div className="bg-black">
            <h1 className="text-3xl sm:text-5xl pt-6 pb-2 items-center font-display tracking-tight text-tpwhite">
              Kabbalah
            </h1>
            <h1 className="text-3xl sm:text-5xl items-center font-display tracking-tight text-tpwhite">
              The Architecture of Divine Order
            </h1>
            <p className="mt-4 mr-8 text-lg text-tpwhite">
                The Kabbalah has taken many forms across the centuries—Jewish (in all its forms), Christian, Hermetic—each seeking to map the descent of divine light into creation and its return through our own understanding.
            </p>
            <p className="mt-4 mr-8 text-lg text-tpwhite">
                In Tarot Pathwork, this map is both studied and lived. My work draws from Christian Kabbalah, where Christ is the Logos, the living bridge between the infinite and the human; and from Hermetic Kabbalah, which translates the Tree of Life into a language of alchemy, astrology, and tarot, just as the ancients intended. Together they form a path of revelation and embodiment—a way to discern divine order in real time, not as belief, but as experience.
            </p>
            <p className="mt-4 mb-8 mr-8 text-lg text-tpwhite">
                Through contemplation, ritual, and the cards themselves, the Tree becomes a mirror of the soul and a diagram of healing. It is from the meeting of these two rivers—the Christian and the Hermetic—that a new current has emerged in my work, one I call Lucian Kabbalah.
            </p>
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