import { useEffect } from 'react'

type SEOProps = {
  title: string
  description?: string
  jsonLd?: any[] // array of JSON-LD objects
}

export default function SEO({ title, description, jsonLd = [] }: SEOProps) {
  useEffect(() => {
    document.title = title
    const metaDesc = ensureTag('meta[name="description"]', () => {
      const m = document.createElement('meta'); m.setAttribute('name','description'); return m
    })
    if (description) metaDesc.setAttribute('content', description)

    // Basic OG tags
    const ogTitle = ensureOG('og:title')
    ogTitle.setAttribute('content', title)
    if (description) {
      const ogDesc = ensureOG('og:description')
      ogDesc.setAttribute('content', description)
    }

    // JSON-LD
    // remove previous injected
    document.querySelectorAll('script[data-json-ld="1"]').forEach(n => n.remove())
    jsonLd.forEach(obj => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.jsonLd = '1'
      s.text = JSON.stringify(obj)
      document.head.appendChild(s)
    })
  }, [title, description, JSON.stringify(jsonLd)])

  return null
}

function ensureTag(selector: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector) as HTMLElement | null
  if (!el) { el = create(); document.head.appendChild(el) }
  return el
}
function ensureOG(property: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  return el
}
