"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, MapPin, Award, ArrowUpRight } from 'lucide-react'
import { useLocale } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

const content = {
  fr: {
    eyebrow: "Événement Majeur | Organisé par EAI",
    title: "FIDI 2026 — Forum International de la Décoration d'Intérieur",
    desc: "Le rendez-vous incontournable en Afrique pour les architectes d'intérieur, designers et marques de prestige. Participez à des conférences inspirantes et découvrez les innovations qui façonnent les espaces de demain.",
    date: "Casablanca, 2026",
    edition: "4ème Édition",
    location: "Casablanca, Maroc",
    cta: "Réserver votre place",
    stats: [
      { value: "4ème", label: "Édition Annuelle" },
      { value: "500+", label: "Professionnels" },
      { value: "30+", label: "Exposants & Speakers" }
    ]
  },
  en: {
    eyebrow: "Major Event | Organized by EAI",
    title: "FIDI 2026 — International Interior Decoration Forum",
    desc: "The premier gathering in Africa for interior architects, designers, and prestigious brands. Attend inspiring conferences and explore the innovations shaping tomorrow's spaces.",
    date: "Casablanca, 2026",
    edition: "4th Edition",
    location: "Casablanca, Morocco",
    cta: "Book your pass",
    stats: [
      { value: "4th", label: "Annual Edition" },
      { value: "500+", label: "Professionals" },
      { value: "30+", label: "Exhibitors & Speakers" }
    ]
  },
  es: {
    eyebrow: "Evento Principal | Organizado por EAI",
    title: "FIDI 2026 — Foro Internacional de la Decoración de Interiores",
    desc: "El encuentro clave en África para arquitectos de interiores, diseñadores y marcas de prestigio. Asista a conferencias inspiradoras y explore las innovaciones que definen los espacios del mañana.",
    date: "Casablanca, 2026",
    edition: "4ª Edición",
    location: "Casablanca, Marruecos",
    cta: "Reservar su plaza",
    stats: [
      { value: "4ª", label: "Edición Anual" },
      { value: "500+", label: "Profesionales" },
      { value: "30+", label: "Expositores y Ponentes" }
    ]
  },
  it: {
    eyebrow: "Evento Principale | Organizzato da EAI",
    title: "FIDI 2026 — Forum Internazionale della Decorazione d'Interni",
    desc: "Il principale incontro in Africa per architetti d'interni, designer e marchi prestigiosi. Partecipa a conferenze stimolanti ed esplora le innovazioni che plasmano gli spazi del futuro.",
    date: "Casablanca, 2026",
    edition: "4ª Edizione",
    location: "Casablanca, Marocco",
    cta: "Prenota il tuo pass",
    stats: [
      { value: "4ª", label: "Edizione Annuale" },
      { value: "500+", label: "Professionisti" },
      { value: "30+", label: "Espositori & Relatori" }
    ]
  },
  ar: {
    eyebrow: "حدث بارز | بتنظيم من EAI",
    title: "منتدى FIDI 2026 — المنتدى الدولي للديكور الداخلي",
    desc: "الملتقى الأبرز في إفريقيا لمهندسي الديكور الداخلي والمصممين والعلامات التجارية المرموقة. شارك في مؤتمرات ملهمة واكتشف الابتكارات التي تشكل مساحات الغد.",
    date: "الدار البيضاء، 2026",
    edition: "الدورة الرابعة",
    location: "الدار البيضاء، المغرب",
    cta: "احجز مقعدك الآن",
    stats: [
      { value: "الرابعة", label: "الدورة السنوية" },
      { value: "500+", label: "محترف مشارك" },
      { value: "30+", label: "عارض ومتحدث" }
    ]
  }
}

export default function FidiHighlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const locale = useLocale() as keyof typeof content
  const t = content[locale] || content.fr

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.fidi-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      id="fidi-highlight"
      className="w-full bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] py-16 md:py-24 relative overflow-hidden border-b border-white/10"
    >
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-eai-olive)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="fidi-anim flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-eai-olive)] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[var(--color-eai-olive)]">
                {t.eyebrow}
              </span>
            </div>
            
            <h2 className="fidi-anim font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
              {t.title}
            </h2>
            
            <p className="fidi-anim text-base md:text-lg opacity-75 max-w-xl leading-relaxed font-light font-sans">
              {t.desc}
            </p>
            
            <div className="fidi-anim flex flex-wrap gap-6 pt-4 text-xs font-semibold uppercase tracking-widest text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--color-eai-olive)]" />
                <span>{t.edition}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-eai-olive)]" />
                <span>{t.location}</span>
              </div>
            </div>

            <div className="fidi-anim pt-4">
              <a 
                href="https://events.eai-construction.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-eai-olive)] text-[var(--color-eai-black)] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm shadow-lg shadow-[var(--color-eai-olive)]/15 group no-underline"
              >
                {t.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
          
          {/* Visual card stats */}
          <div className="lg:col-span-5 flex flex-col justify-center items-stretch gap-4">
            {t.stats.map((stat, i) => (
              <div 
                key={i} 
                className="fidi-anim bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[var(--color-eai-olive)]/35 transition-all duration-500 hover:bg-white/10 flex justify-between items-center group"
              >
                <div>
                  <span className="block font-sans text-3xl md:text-4xl font-extrabold text-white leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-white/50 mt-1 block font-sans">
                    {stat.label}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-[var(--color-eai-olive)] group-hover:bg-[var(--color-eai-olive)]/10 transition-colors">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
