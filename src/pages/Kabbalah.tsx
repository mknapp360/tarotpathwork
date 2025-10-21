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
 
      {/* SECTION 1 */}
      <section className="w-full bg-black">
        <div className="mx-auto grid lg:grid-cols-2 items-center">

          {/* Image (left) */}
            <div className="bg-tpwhite">
            <h1 className="text-3xl sm:text-5xl pt-6 pb-2 items-center font-display tracking-tight text-tpwhite">
              The Living Tree
            </h1>
            <p className="mt-4 mr-8 text-lg text-tpwhite">
                The Tree of Life is not a diagram to be memorized but a living organism through which the Divine expresses, descends, and returns. Its ten sephiroth are not fixed spheres; they are living qualities—emanations of intelligence that pulse through every level of creation. Each is both a station of consciousness and a doorway through which the Infinite perceives itself.
            </p>
            <p className="mt-4 mr-8 text-lg text-tpwhite">
                In the classical sense, the Tree begins in Ain Soph Aur, the limitless light that precedes all being. From that brilliance emerges Kether, the Crown, pure intention at the edge of manifestation. From Kether flows the lightning path downward through wisdom and understanding, mercy and severity, beauty and foundation, until it finally roots in Malkuth, the Kingdom—our embodied world. The return journey reverses the same currents: the soul, having touched matter, learns to raise it back toward light.
            <p className="mt-4 mb-8 mr-8 text-lg text-tpwhite">
                Within Tarot Pathwork, the Tree is a spiritual anatomy—a map of the psyche and the soul’s movement through the Four Worlds:
            </p>
            <ul className="mt-4 mb-8 mr-8 text-lg text-tpwhite">
                <li>Atziluth / Fire – the realm of divine will and first impulse.</li>
                <li>Briah / Water – the world of creation, emotion, and angelic design.</li>
                <li>Yetzirah / Air – the world of formation and intellect, where angels shape archetypes into thought.</li>
                <li>Assiah / Earth – the world of action and manifestation, where the divine dream becomes matter.</li>
            </ul>
            <p className="mt-4 mb-8 mr-8 text-lg text-tpwhite">
                To contemplate the Tree is to align with these currents—to sense where energy is flowing freely and where it has become obstructed. When we meditate upon the sephiroth, we are not studying symbols; we are engaging living intelligences that speak through intuition, synchronicity, and revelation. The Tree becomes a mirror for every choice we make, every revelation we receive, every prayer we speak.
            </p>
            <p className="mt-4 mb-8 mr-8 text-lg text-tpwhite">
                In this way, the Living Tree serves as the backbone of Lucian Kabbalah: the eternal dialogue between light and form, heaven and earth, spirit and soul. To work with it is to remember that creation itself is still unfolding—and that we are invited to take part in its continual emanation.
            </p>
          </div>
 
          {/* Text (right) */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src="/originalTreeofLife.png"
                alt="historicalsketch of medieval hebrew tree of life"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
        </div>
      </section>
    </>
  )
}