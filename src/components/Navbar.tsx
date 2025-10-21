// Navbar.tsx
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const base = 'h-16 w-full flex items-center justify-between px-12 lg:px-12'
  const link = 'px-3 py-2 rounded-xl hover:bg-white/10 transition'
  const active = 'bg-tpblack/10'

  return (
    <header
      className={
        transparent
          ? `fixed inset-x-0 top-0 z-50 ${scrolled ? 'bg-tpblack/80 backdrop-blur' : 'bg-transparent'}`
          : 'sticky top-0 z-50 bg-tpwhite/80 backdrop-blur border-b'
      }
    >
      <div className={base + (transparent && !scrolled ? ' text-white' : '')}>
        <NavLink to="/" className="font-display text-2xl text-tpwhite lg:text-3xl tracking-tight">Tarot Pathwork</NavLink>
        <div className="flex-grow" />
        <nav className="flex gap-1 text-xl text-tpwhite">
          <NavLink to="/blog" className={({isActive}) => `${link} ${isActive?active:''}`} >Articles</NavLink>
          <NavLink to="/contact" className={({isActive}) => `${link} ${isActive?active:''}`}>Contact</NavLink>
          <NavLink to="/readings" className={({isActive}) => `${link} ${isActive?active:''}`}>Book A Reading</NavLink>
        
         {/* Divider (optional) */}
        <div className="h-15 w-px bg-white/20 mx-1 hidden sm:block" />

        {/* Social icons as custom images */}
        <a
          href="https://www.tiktok.com/@tarotpathwork"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <img
            src="/tiktok-onBrand.png"
            alt="TikTok"
            className="w-10 h-10 object-contain opacity-80 hover:opacity-100 transition"
          />
        </a>

        <a
          href="https://www.reddit.com/user/Daoist360/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <img
            src="reddit-onBrand.png"
            alt="Reddit"
            className="w-10 h-10 object-contain opacity-80 hover:opacity-100 transition"
          />
        </a>

        <a
          href="https://www.youtube.com/@tarotpathwork"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <img
            src="youtube-onBrand.png"
            alt="YouTube"
            className="w-10 h-10 object-contain opacity-80 hover:opacity-100 transition"
          />
        </a>
      </nav>
      </div>
    </header>
  )
}
