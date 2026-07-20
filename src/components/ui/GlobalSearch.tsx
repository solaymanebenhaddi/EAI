"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, Loader2 } from 'lucide-react'
import { siteData } from '@/data/site'
import { useTranslations } from 'next-intl'

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    
    // Simulate network delay for search feel
    setTimeout(() => {
      const q = query.toLowerCase()
      const found: any[] = []



      // Search 3D Conception
      siteData.conception3D.categories.forEach(item => {
        if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
          found.push({ type: 'Conception 3D', title: item.name, desc: item.description, link: '#conception3d' })
        }
      })

      // Search Services
      siteData.coreServices.forEach(item => {
        if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
          found.push({ type: 'Service', title: item.title, desc: item.description, link: '#expertises' })
        }
      })

      // Search Mayush
      siteData.mayushDesign.categories.forEach(item => {
        if (item.name.toLowerCase().includes(q)) {
          found.push({ type: 'Mayush Design', title: item.name, desc: 'Catégorie de produit', link: item.url })
        }
      })

      setResults(found)
      setLoading(false)
    }, 400)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center text-white hover:text-[var(--color-eai-olive)] transition-colors"
        aria-label="Recherche globale"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[var(--color-eai-paper)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              role="dialog"
              aria-modal="true"
            >
              <form onSubmit={handleSearch} className="flex items-center px-4 py-4 border-b border-[var(--color-eai-charcoal)]/10">
                <Search className="w-5 h-5 text-[var(--color-eai-charcoal)]/50 mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Rechercher des projets, services, formations..."
                  className="flex-1 bg-transparent border-none outline-none text-[var(--color-eai-charcoal)] text-lg placeholder:text-[var(--color-eai-charcoal)]/40"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" onClick={() => setIsOpen(false)} className="p-2 text-[var(--color-eai-charcoal)]/50 hover:text-[var(--color-eai-charcoal)]">
                  <X className="w-5 h-5" />
                </button>
              </form>

              <div className="flex-1 overflow-y-auto p-2">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[var(--color-eai-charcoal)]/50">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p>Recherche en cours...</p>
                  </div>
                ) : results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((r, i) => (
                      <li key={i}>
                        <a 
                          href={r.link} 
                          onClick={(e) => {
                            e.preventDefault()
                            setIsOpen(false)
                            document.querySelector(r.link)?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="flex flex-col p-4 hover:bg-[var(--color-eai-charcoal)]/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-eai-olive)] bg-[var(--color-eai-olive)]/10 px-2 py-0.5 rounded-sm">
                              {r.type}
                            </span>
                            <span className="font-bold text-[var(--color-eai-charcoal)]">{r.title}</span>
                          </div>
                          <span className="text-sm text-[var(--color-eai-charcoal)]/70 line-clamp-1">{r.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : query && !loading ? (
                  <div className="py-12 text-center text-[var(--color-eai-charcoal)]/50">
                    Aucun résultat trouvé pour "{query}"
                  </div>
                ) : (
                  <div className="py-12 text-center text-[var(--color-eai-charcoal)]/40 text-sm">
                    Tapez votre recherche puis appuyez sur Entrée
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
