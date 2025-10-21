import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

export default function Home() {

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
            Whether you find yourself at a crossroads or seeking a greater sense of purpose, it reveals the soul’s architecture through direct experience rather than belief.
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

      <section className="grid sm:grid-cols-3 gap-6 mt-8">
        {[
          {title:'Kabbalah', body:'Living Tree insights and angelic correspondences.'},
          {title:'Tarot Pathwork', body:'Structured spreads for clarity and action.'},
          {title:'Courses', body:'Self-paced modules with weekly Q&A (coming soon).'},
        ].map((c, i) => (
          <div key={i} className="p-6 rounded-2xl border hover:shadow-sm">
            <h3 className="text-lg font-medium">{c.title}</h3>
            <p className="mt-2 text-slate-600">{c.body}</p>
          </div>
        ))}
      </section>
    </>
  )
}
