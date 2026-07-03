"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteData } from "@/data/site"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setSending(true)
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
            <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold">Notre Méthode</span>
            <h2 className="font-sans text-[clamp(3rem,6vw,5rem)] leading-[0.9] font-extrabold uppercase tracking-tight mt-6 drop-shadow-sm">
              Réduire<br/>l'incertitude.
            </h2>
            <p className="mt-8 text-white/60 text-sm md:text-base leading-relaxed max-w-md">
              De l'esquisse à la remise des clés, notre processus garantit un contrôle total sur la qualité, les délais et le budget.
            </p>
          </div>
          
          <div className="space-y-0">
            {siteData.methodSteps.map((s, i) => (
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
        className="min-h-screen w-full flex flex-col px-4 md:px-12 py-20 bg-fixed bg-cover bg-center text-[var(--color-eai-paper)] relative overflow-hidden"
        style={{ backgroundImage: 'url(/assets/elaouad-events-formation.webp)' }}
      >
        <div className="absolute inset-0 bg-eai-charcoal/80 backdrop-blur-[2px] pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full mb-12 relative z-10">
          <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold block mb-4">Écosystème</span>
          <h3 className="font-sans text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-extrabold uppercase tracking-tight">
            Construire,<br/>réunir et transmettre.
          </h3>
        </div>

        {/* Vertical Split Panels Container */}
        <div className="flex-1 w-full min-h-[500px] flex flex-col lg:flex-row gap-4 relative z-10">
          {siteData.ecosystem.map((b, idx) => {
            const isHovered = hoveredPanel === idx
            const isAnyHovered = hoveredPanel !== null
            
            // Map index to a specific background image
            const panelImage = idx === 0 
              ? siteData.images.expertise 
              : idx === 1 
              ? siteData.images.ecosystem 
              : siteData.images.after

            return (
              <div
                key={b.num}
                role="button"
                tabIndex={0}
                aria-expanded={isHovered}
                onMouseEnter={() => setHoveredPanel(idx)}
                onMouseLeave={() => setHoveredPanel(null)}
                onClick={() => setHoveredPanel(idx === hoveredPanel ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setHoveredPanel(idx === hoveredPanel ? null : idx)
                  }
                }}
                className={cn(
                  "ecosystem-panel relative overflow-hidden rounded-2xl cursor-pointer flex flex-col justify-end p-6 md:p-10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/[0.04]",
                  // Dynamic flex scaling based on hover state
                  isHovered 
                    ? "flex-[2.5]" 
                    : isAnyHovered 
                    ? "flex-[0.8] opacity-60" 
                    : "flex-[1]"
                )}
                style={{ minHeight: '280px' }}
              >
                {/* Background Image panel */}
                <div 
                  className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    backgroundImage: `url(${panelImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                
                {/* Visual shade overlays */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700",
                  isHovered ? "opacity-100" : "opacity-85"
                )} />

                {/* Content inside panel */}
                <div className="relative z-10 w-full flex flex-col">
                  {/* Number tag */}
                  <span className="text-[var(--color-eai-olive)] text-xs uppercase tracking-[0.16em] font-extrabold mb-3">
                    {b.num}
                  </span>

                  {/* Title */}
                  <h4 className="text-white text-xl md:text-2xl font-sans font-bold uppercase tracking-tight">
                    {b.name}
                  </h4>

                  {/* Hidden description that expands on hover */}
                  <div className={cn(
                    "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden",
                    isHovered 
                      ? "max-h-[200px] opacity-100 mt-4 translate-y-0" 
                      : "max-h-0 opacity-0 translate-y-4"
                  )}>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">
                      {b.text}
                    </p>
                    
                    {/* Bullet list of services/key features under each member */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2">
                      {idx === 0 && ['Conception', 'Ingénierie', 'BIM'].map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-[0.12em] font-bold text-white/50 bg-white/10 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                      {idx === 1 && ['Salons', 'Forums', 'B2B Networking'].map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-[0.12em] font-bold text-white/50 bg-white/10 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                      {idx === 2 && ['Formations', 'Logiciels BIM', 'Chantier'].map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-[0.12em] font-bold text-white/50 bg-white/10 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
            <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold">Contact</span>
            <h2 className="font-sans text-[clamp(3rem,6vw,5rem)] leading-[0.92] font-extrabold uppercase tracking-tight mt-6 text-[var(--color-eai-charcoal)]">
              Votre projet<br/>mérite une<br/>vision claire.
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
                <h4 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-[var(--color-eai-charcoal)]">Demande envoyée</h4>
                <p className="text-[var(--color-eai-charcoal)]/60 text-base mt-3 max-w-[250px]">Nous vous contacterons sous 24 heures pour discuter de votre projet.</p>
              </div>
            )}

            <form onSubmit={submit} className="grid gap-6">
              <div className="grid gap-2 relative">
                <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.name ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>Nom complet *</label>
              </div>
              
              <div className="grid gap-2 relative">
                <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.phone ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>Téléphone *</label>
              </div>

              <select name="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={cn("w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none appearance-none cursor-pointer", form.type ? "text-[var(--color-eai-charcoal)]" : "text-[var(--color-eai-charcoal)]/40")}>
                <option value="" disabled hidden>Type de projet</option>
                <option value="archi" className="text-[var(--color-eai-charcoal)]">Architecture</option>
                <option value="bim" className="text-[var(--color-eai-charcoal)]">BIM</option>
                <option value="coord" className="text-[var(--color-eai-charcoal)]">Coordination</option>
                <option value="etude" className="text-[var(--color-eai-charcoal)]">Études</option>
              </select>

              <div className="grid gap-2 relative mt-2">
                <textarea name="msg" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={3}
                  className="peer w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 px-1 py-3 text-[var(--color-eai-charcoal)] outline-none focus:border-[var(--color-eai-olive)] transition-colors text-sm rounded-none resize-none" />
                <label className={cn("absolute left-1 top-3 text-sm text-[var(--color-eai-charcoal)]/40 transition-all pointer-events-none", form.msg ? "-translate-y-6 text-[10px]" : "peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-eai-olive)]")}>Parlez-nous de votre projet</label>
              </div>

              <Button type="submit" disabled={sending} className="w-full mt-6 h-14 shadow-md text-xs">
                {sending ? 'Envoi en cours...' : 'Envoyer la demande'}
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
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">ELAOUAD</span>
          <p className="text-white/50 mt-4 leading-relaxed text-xs max-w-[250px]">
            Bureau d'architecture et d'ingénierie basé au Maroc. Conception, études, coordination et suivi.
          </p>
        </div>
        
        <div className="hidden md:block relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">Navigation</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            {['Accueil', 'Expertises', 'Méthode', 'Contact'].map((l) => (
              <span key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({behavior: 'smooth'})} className="hover:text-[var(--color-eai-olive)] transition-colors cursor-pointer w-fit">{l}</span>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">Expertises</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            {['Architecture d\'intérieur', 'Urbanisme', 'BIM Consulting', 'Topographie', 'Études de faisabilité'].map((l) => (
              <span key={l} className="cursor-default">{l}</span>
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">Contact</span>
          <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
            <a href={`mailto:${siteData.contact.email}`} className="hover:text-[var(--color-eai-olive)] transition-colors w-fit">{siteData.contact.email}</a>
            <span>{siteData.contact.phone}</span>
            <span>{siteData.contact.address}</span>
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-4 border-t border-white/10 pt-6 mt-4 text-white/40 text-[10px] relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} ELAOUAD Architecture et Ingénierie. Tous droits réservés.</span>
          <span className="tracking-[0.14em] uppercase text-[9px]">Concevoir · Étudier · Coordonner · Réaliser</span>
        </div>
      </footer>
    </>
  )
}
