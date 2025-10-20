import { writeFileSync } from 'fs'
import { STATIC_ROUTES } from '../lib/routes.ts' assert { type: 'ts' }

// Simple sitemap for static routes
const BASE = process.env.SITE_URL || 'https://www.yourdomain.com'
const now = new Date().toISOString()

const urls = STATIC_ROUTES.map(p => `
  <url>
    <loc>${BASE}${p === '/' ? '' : p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.7'}</priority>
  </url>`).join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

writeFileSync('dist/sitemap.xml', xml.trim(), 'utf-8')
console.log('sitemap.xml generated')
