import SEO from '../components/SEO'
export default function Contact(){
  const jsonLd=[{
    "@context":"https://schema.org",
    "@type":"ContactPage",
    "name":"Contact Tarot Pathwork",
    "url":"https://www.yourdomain.com/contact"
  }]
  return (
    <>
      <SEO title="Contact — Get in Touch" description="Questions, collaborations, press. Reach out." jsonLd={jsonLd}/>
      <div className="prose">
        <h1>Contact</h1>
        <p>Email: hello@yourdomain.com</p>
      </div>
    </>
  )
}
