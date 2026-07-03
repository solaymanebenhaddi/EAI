"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { siteData } from '@/data/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { label: 'Accueil', id: '#hero' },
    { label: 'Expertises', id: '#expertises' },
    { label: 'Transformation', id: '#transformation' },
    { label: 'Méthode', id: '#methode' },
  ]

  const scrollTo = (id: string) => {
    setOpen(false)
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(id, { offset: 0, duration: 1.2 })
    } else {
      const element = document.querySelector(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300",
          scrolled ? "bg-white/15 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
        )}
      >
        <a 
          href="#hero" 
          className="flex flex-col cursor-pointer no-underline" 
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
        >
          <span className="font-sans text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">ELAOUAD</span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.18em] text-white/60 font-bold mt-0.5">Architecture et Ingénierie</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.id} 
              href={link.id}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} 
              className="text-[11px] uppercase tracking-[0.14em] text-white hover:text-[var(--color-eai-olive)] transition-colors duration-200 cursor-pointer font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
          className="hidden md:inline-flex px-5 py-2 border border-white/30 text-[11px] uppercase tracking-[0.14em] text-white font-bold bg-white/5 hover:bg-white hover:text-black transition-all duration-200 rounded-sm no-underline"
        >
          Discuter du projet
        </a>

        {/* Hamburger */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden w-10 h-10 flex items-center justify-center relative z-50 bg-transparent border-none"
          aria-label="Menu"
        >
          <div className="relative w-6 h-5 flex items-center justify-center">
            <span className={cn("absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]", open ? 'rotate-45 translate-y-0' : '-translate-y-2')} />
            <span className={cn("absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300", open ? 'opacity-0 scale-x-0' : '')} />
            <span className={cn("absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]", open ? '-rotate-45 translate-y-0' : 'translate-y-2')} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden pointer-events-auto"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[var(--color-background)] shadow-2xl"
            >
              <div className="flex flex-col justify-center h-full px-8 gap-2 pt-16">
                {links.map((link, i) => (
                  <motion.a 
                    key={link.id} 
                    href={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} 
                    className="font-sans font-extrabold text-4xl text-foreground hover:text-[var(--color-eai-olive)] transition-colors text-left py-1 cursor-pointer no-underline block"
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 pt-6 border-t border-foreground/10"
                >
                  <p className="text-xs text-foreground/50 leading-relaxed mb-4">Bureau d&apos;architecture et d&apos;ingénierie basé au Maroc.</p>
                  <a 
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
                    className="w-full py-4 bg-foreground text-[var(--color-background)] text-xs uppercase tracking-[0.14em] hover:bg-[var(--color-eai-olive)] hover:text-[var(--color-eai-black)] transition-colors duration-200 font-medium block text-center no-underline"
                  >
                    Discuter de votre projet
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
