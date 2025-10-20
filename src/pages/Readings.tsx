import SEO from '../components/SEO'
export default function Readings(){
  const jsonLd = [{
    "@context":"https://schema.org",
    "@type":"Service",
    "name":"Tarot Reading",
    "provider":{"@type":"Person","name":"Frater Lucis"},
    "areaServed":"Global",
    "offers":{"@type":"Offer","priceCurrency":"GBP","price":"60"}
  }]
  return (
    <>
      <SEO title="Tarot Readings — Book a Session" description="Book a 30–60 minute tarot reading aligned to your path." jsonLd={jsonLd}/>
      <div className="prose">
        <h1>Readings</h1>
        <p>Choose a format that suits your question and schedule…</p>
      </div>
    </>
  )
}
