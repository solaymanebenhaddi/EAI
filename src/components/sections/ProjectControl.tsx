"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteData } from "@/data/site"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectControl() {
  const methodRef = useRef<HTMLElement>(null)
  const ecosystemRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: '', phone: '', type: '', msg: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const tMethod = useTranslations('Method')
  const tEco = useTranslations('Ecosystem')
  const tContact = useTranslations('Contact')
  const tFooter = useTranslations('Footer')

  const methodTitleLines = tMethod('title').split('\n')
  const ecoTitleLines = tEco('title').split('\n')
  const contactTitleLines = tContact('title').split('\n')

  const methodSteps = tMethod.raw('steps') as any[]
  const ecoItems = tEco.raw('items') as any[]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setSending(true)
    setErrorMsg(null)
    
    // Simulate network delay for now
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', phone: '', type: '', msg: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Method section animation
      gsap.from(".method-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: methodRef.current,
          start: "top 75%",
        },
      })

      // Ecosystem section animation
      gsap.from(".ecosystem-panel", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ecosystemRef.current,
          start: "top 75%",
        },
      })

      // Contact section animation
      gsap.from(".contact-elem", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 75%",
        },
      })

      // Footer
      gsap.from(footerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION: METHOD
          ═══════════════════════════════════════════ */}
      <section 
        id="methode"
        ref={methodRef}
        className="min-h-screen w-full flex flex-col justify-center px-4 md:px-12 py-20 bg-fixed bg-cover bg-center text-[var(--color-eai-paper)] relative overflow-hidden"
        style={{ backgroundImage: 'url(/assets/elaouad-events-formation.webp)' }}
      >
        <div className="absolute inset-0 bg-eai-charcoal/85 backdrop-blur-[2px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
          <div className="method-item">
            <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold">{tMethod('eyebrow')}</span>
            <h2 className="font-sans text-[clamp(3rem,6vw,5rem)] leading-[0.9] font-extrabold uppercase tracking-tight mt-6 drop-shadow-sm">
              {methodTitleLines.map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="mt-8 text-white/60 text-sm md:text-base leading-relaxed max-w-md">
              {tMethod('desc')}
            </p>
          </div>
          
          <div className="space-y-0">
            {methodSteps.map((s, i) => (
              <div key={s.num} className="method-item grid grid-cols-[40px_1fr] gap-6 border-t border-white/10 py-6 group hover:border-eai-olive/60 transition-colors">
                <span className="text-[var(--color-eai-olive)] text-xs tracking-[0.16em] font-semibold mt-1">{s.num}</span>
                <div>
                  <span className="text-white/90 text-lg md:text-xl font-bold font-sans uppercase tracking-tight group-hover:text-eai-olive transition-colors">{s.title}</span>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION: ECOSYSTEM
          ═══════════════════════════════════════════ */}
      <section 
        id="ecosystem"
        ref={ecosystemRef}
        className="w-full flex flex-col px-4 md:px-12 py-32 bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full mb-16 md:mb-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold block mb-6">{tEco('eyebrow')}</span>
              <h3 className="font-sans text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-extrabold uppercase tracking-tight">
                {ecoTitleLines.map((line: string, i: number) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>
            </div>
            <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
              {tEco('desc')}
            </p>
          </div>
        </div>

        {/* 3-Column Premium Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {ecoItems.map((b, idx) => {
            const panelImage = idx === 0 
              ? siteData.images.expertise 
              : idx === 1 
              ? siteData.images.ecosystem 
              : siteData.images.after

            const isCard2 = idx === 1;
            const isCard3 = idx === 2;
            const url = isCard2 ? 'https://events.eai-construction.com' : isCard3 ? 'https://courses.eai-construction.com' : undefined;
            const Component = url ? 'a' : 'div';
            const props = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {};

            return (
              <Component
                key={b.num}
                {...props}
                className={`ecosystem-panel group relative h-[450px] md:h-[600px] w-full overflow-hidden flex flex-col justify-end p-8 md:p-10 border border-white/10 bg-white/5 ${url ? 'cursor-pointer block no-underline' : ''}`}
              >
                {/* Background Image - scales softly on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${panelImage})` }}
                />
                
                {/* Dual Gradient Overlay for depth and text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-[var(--color-eai-charcoal)]/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top: Number & Tags */}
                  <div className="flex justify-between items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <span className="text-[var(--color-eai-olive)] text-xs uppercase tracking-[0.2em] font-extrabold">
                      {b.num}
                    </span>
                    <div className="flex flex-col gap-2 items-end">
                      {b.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] uppercase tracking-[0.15em] font-bold text-white/70 bg-white/10 px-3 py-1.5 rounded-sm backdrop-blur-md">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Title & Text */}
                  <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-8 group-hover:translate-y-0">
                    <h4 className="text-white text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight mb-4">
                      {b.name}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {b.text}
                    </p>
                  </div>
                </div>
                
                {/* Animated bottom border accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-eai-olive)] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              </Component>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION: CONTACT
          ═══════════════════════════════════════════ */}
      <section 
        id="contact"
        ref={contactRef}
        className="min-h-screen w-full flex items-center justify-center px-4 md:px-12 py-20 bg-[var(--color-background)] relative"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="contact-elem">
            <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold">{tContact('eyebrow')}</span>
            <h2 className="font-sans text-[clamp(3rem,6vw,5rem)] leading-[0.92] font-extrabold uppercase tracking-tight mt-6 text-[var(--color-eai-charcoal)]">
              {contactTitleLines.map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <div className="mt-8 text-[var(--color-eai-charcoal)]/60 text-sm leading-relaxed font-medium space-y-2">
              <a href={`mailto:${siteData.contact.email}`} className="block hover:text-[var(--color-eai-olive)] transition-colors text-lg text-[var(--color-eai-charcoal)]">{siteData.contact.email}</a>
              <span className="block">{siteData.contact.phone}</span>
              <span className="block">{siteData.contact.address}</span>
            </div>
          </div>

          <div className="contact-elem bg-white border border-[var(--color-eai-charcoal)]/10 p-8 md:p-12 rounded-xl md:rounded-2xl shadow-sm relative overflow-hidden">
            {sent && (
              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--color-eai-olive)]/15 border-2 border-[var(--color-eai-olive)] flex items-center justify-center text-[var(--color-eai-olive)] text-3xl font-bold mb-6">✓</div>
                <h4 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-[var(--color-eai-charcoal)]">{tContact('success')}</h4>
                <p className="text-[var(--color-eai-charcoal)]/60 text-base mt-3 max-w-[250px]">{tContact('successDesc')}</p>
              </div>
            )}
            
            {errorMsg && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-4 py-2 rounded shadow-md z-30">
                {errorMsg}
              </div>
            )}

            <form onSubmit={submit} className="grid gap-6">
              <div className="grid gap-2 relative">
                <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.name ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>{tContact('form.name')}</label>
              </div>
              
              <div className="grid gap-2 relative">
                <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.phone ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>{tContact('form.phone')}</label>
              </div>

              <select name="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={cn("w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none appearance-none cursor-pointer", form.type ? "text-[var(--color-eai-charcoal)]" : "text-[var(--color-eai-charcoal)]/40")}>
                <option value="" disabled hidden>{tContact('form.type')}</option>
                <option value="archi" className="text-[var(--color-eai-charcoal)]">{tContact('types.archi')}</option>
                <option value="bim" className="text-[var(--color-eai-charcoal)]">{tContact('types.bim')}</option>
                <option value="coord" className="text-[var(--color-eai-charcoal)]">{tContact('types.coord')}</option>
                <option value="etude" className="text-[var(--color-eai-charcoal)]">{tContact('types.etude')}</option>
              </select>

              <div className="grid gap-2 relative mt-2">
                <textarea name="msg" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={3}
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none resize-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.msg ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>{tContact('form.msg')}</label>
              </div>

              <Button type="submit" disabled={sending} className="w-full mt-6 h-14 shadow-md text-xs">
                {sending ? tContact('form.sending') : tContact('form.btn')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer ref={footerRef} className="bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-[11px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">{tFooter('brand')}</span>
          <p className="text-white/50 mt-4 leading-relaxed text-xs max-w-[250px]">
            {tFooter('desc')}
          </p>
        </div>
        
        <div className="hidden md:block relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">{tFooter('navTitle')}</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            {['Accueil', 'Expertises', 'Méthode', 'Contact'].map((l) => (
              <span key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({behavior: 'smooth'})} className="hover:text-[var(--color-eai-olive)] transition-colors cursor-pointer w-fit">{l}</span>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">{tFooter('expTitle')}</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            {['Architecture d\'intérieur', 'Urbanisme', 'BIM Consulting', 'Topographie', 'Études de faisabilité'].map((l) => (
              <span key={l} className="cursor-default">{l}</span>
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">{tFooter('contactTitle')}</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            <a href={`mailto:${siteData.contact.email}`} className="hover:text-[var(--color-eai-olive)] transition-colors w-fit">{siteData.contact.email}</a>
            <span>{siteData.contact.phone}</span>
            <span>{siteData.contact.address}</span>
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-4 border-t border-white/10 pt-6 mt-4 text-white/40 text-[10px] relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} {tFooter('brand')}. {tFooter('rights')}</span>
          <span className="tracking-[0.14em] uppercase text-[9px]">{tFooter('slogan')}</span>
        </div>
      </footer>
    </>
  )
}
