"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslations, useLocale } from 'next-intl'
import { siteData } from '@/data/site'
import { cn } from '@/lib/utils'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import GlobalSearch from '../ui/GlobalSearch'

const announcements = {
  fr: [
    "📢 FIDI 2026 : Forum International de la Décoration d'Intérieur à Casablanca (4ème Édition)",
    "✨ Prestation Clé : Conception & Visualisation 3D réaliste pour vos espaces",
    "📞 Contactez-nous : +212 666 798536 / +212 688018863 / +212 520 198738"
  ],
  en: [
    "📢 FIDI 2026: International Interior Decoration Forum in Casablanca (4th Edition)",
    "✨ Key Service: Realistic 3D Design & Space Visualization for your projects",
    "📞 Call us: +212 666 798536 / +212 688018863 / +212 520 198738"
  ],
  es: [
    "📢 FIDI 2026: Foro Internacional de la Decoración de Interiores en Casablanca (4ª Edición)",
    "✨ Servicio Clave: Diseño 3D realista y visualización espacial para sus proyectos",
    "📞 Contáctenos: +212 666 798536 / +212 688018863 / +212 520 198738"
  ],
  it: [
    "📢 FIDI 2026: Forum Internazionale della Decorazione d'Interni a Casablanca (4ª Edizione)",
    "✨ Servizio Chiave: Progettazione 3D realistica e visualizzazione spaziale",
    "📞 Contattaci: +212 666 798536 / +212 688018863 / +212 520 198738"
  ],
  ar: [
    "📢 منتدى FIDI 2026: المنتدى الدولي للديكور الداخلي بالدار البيضاء (الدورة الرابعة)",
    "✨ خدمة رئيسية: تصميم ثلاثي الأبعاد واقعي وتجسيد متكامل لمشاريعكم",
    "📞 اتصل بنا: +212 666 798536 / +212 688018863 / +212 520 198738"
  ]
};

function AnnouncementBar() {
  const locale = useLocale() as keyof typeof announcements;
  const list = announcements[locale] || announcements.fr;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [list]);

  const renderText = (text: string) => {
    if (text.includes("+212")) {
      const label = text.split(':')[0] + ': ';
      return (
        <span className="flex items-center gap-1.5 flex-wrap justify-center">
          {label}
          <a href="tel:+212666798536" className="text-[var(--color-eai-olive)] hover:underline font-extrabold">+212 666 798536</a>
          <span className="opacity-30">|</span>
          <a href="tel:+212688018863" className="text-[var(--color-eai-olive)] hover:underline font-extrabold">+212 688 01 88 63</a>
          <span className="opacity-30">|</span>
          <a href="tel:+212520198738" className="text-[var(--color-eai-olive)] hover:underline font-extrabold">+212 520 198738</a>
        </span>
      );
    }
    return text;
  };

  return (
    <div className="w-full bg-[var(--color-eai-black)] text-[var(--color-eai-paper)] py-1.5 px-4 text-center border-b border-[var(--color-eai-olive)]/20 relative z-50 flex items-center justify-center min-h-[30px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em]"
        >
          {renderText(list[index])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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

  const t = useTranslations('Nav')

  const links = [
    { label: t('home'), id: '#hero' },
    { label: t('expertises'), id: '#expertises' },
    { label: t('transformation'), id: '#transformation' },
    { label: t('method'), id: '#methode' },
  ]

  const pathname = usePathname()
  const router = useRouter()

  const scrollTo = (id: string) => {
    setOpen(false)
    
    if (pathname !== '/') {
      router.push('/' + id)
      return
    }

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
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col w-full">
      <AnnouncementBar />
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-full flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300",
          scrolled ? "bg-[var(--color-eai-charcoal)]/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
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
          <Link 
            href="/careers" 
            className="text-[11px] uppercase tracking-[0.14em] text-white hover:text-[var(--color-eai-olive)] transition-colors duration-200 cursor-pointer font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] no-underline"
          >
            Carrières
          </Link>
        </div>

        <a 
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
          className="hidden md:inline-flex px-5 py-2 border border-white/30 text-[11px] uppercase tracking-[0.14em] text-white font-bold bg-white/5 hover:bg-white hover:text-black transition-all duration-200 rounded-sm no-underline"
        >
          {t('discuss')}
        </a>
        <div className="hidden md:flex ml-4 border-l border-white/20 pl-4 items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            {siteData.socials.map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[var(--color-eai-olive)] transition-colors"
                aria-label={social.platform}
              >
                {social.icon === 'linkedin' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                )}
                {social.icon === 'instagram' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                )}
                {social.icon === 'facebook' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                )}
              </a>
            ))}
          </div>
          <LanguageSwitcher />
          <GlobalSearch />
        </div>

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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + links.length * 0.05 }}
                >
                  <Link 
                    href="/careers" 
                    onClick={() => setOpen(false)}
                    className="font-sans font-extrabold text-4xl text-foreground hover:text-[var(--color-eai-olive)] transition-colors text-left py-1 cursor-pointer no-underline block"
                  >
                    Carrières
                  </Link>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 pt-6 border-t border-foreground/10"
                >
                  <div className="flex justify-center mb-6">
                    <GlobalSearch />
                  </div>
                  <p className="text-xs text-foreground/50 leading-relaxed mb-4">{t('subtitle')}</p>
                  <a 
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
                    className="w-full py-4 bg-foreground text-[var(--color-background)] text-xs uppercase tracking-[0.14em] hover:bg-[var(--color-eai-olive)] hover:text-[var(--color-eai-black)] transition-colors duration-200 font-medium block text-center no-underline"
                  >
                    {t('discuss')}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
