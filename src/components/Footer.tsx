export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <p>© 2019 - {new Date().getFullYear()} Tarot Pathwork. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/sitemap.xml" className="hover:text-slate-900">Sitemap</a>
          <a href="/robots.txt" className="hover:text-slate-900">Robots</a>
          <a href="/privacy" className="hover:text-slate-900">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
