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
  const active = 'bg-white/10'

  return (
    <header
      className={
        transparent
          ? `fixed inset-x-0 top-0 z-50 ${scrolled ? 'bg-white/80 backdrop-blur border-b' : 'bg-transparent'}`
          : 'sticky top-0 z-50 bg-white/80 backdrop-blur border-b'
      }
    >
      <div className={base + (transparent && !scrolled ? ' text-white' : '')}>
        <NavLink to="/" className="font-display text-2xl lg:text-3xl tracking-tight">Tarot Pathwork</NavLink>
        <div className="flex-grow" />
        <nav className="flex gap-1 text-sm">
          <NavLink to="/blog" className={({isActive}) => `${link} ${isActive?active:''}`}>Articles</NavLink>
          <NavLink to="/contact" className={({isActive}) => `${link} ${isActive?active:''}`}>Contact</NavLink>
          <NavLink to="/readings" className={({isActive}) => `${link} ${isActive?active:''}`}>Book A Reading</NavLink>
        </nav>
      </div>
    </header>
  )
}
