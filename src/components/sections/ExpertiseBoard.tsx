"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteData } from "@/data/site"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)

export default function ExpertiseBoard() {
  const [expandedIdx, setExpandedIdx] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Services')
  const items = t.raw('items') as any[]
  const titleLines = t('title').split('\n')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      })

      gsap.from('.expertise-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const bgStyle = {
    backgroundImage: `url(${siteData.images.expertise})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <section
      id="expertises"
      ref={containerRef}
      className="relative w-full bg-eai-charcoal overflow-hidden"
      style={{ paddingTop: 'clamp(4rem, 10vh, 8rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header row */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 px-4">
          <div>
            <span className="text-eai-olive text-[10px] uppercase tracking-[0.22em] font-semibold mb-4 block">
              {t('eyebrow')}
            </span>
            <h2 className="font-sans text-eai-paper text-[clamp(2.4rem,5vw,4rem)] leading-[0.9] font-extrabold uppercase tracking-tight">
              {titleLines.map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
          </div>

          {/* Image preview */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-auto" style={bgStyle}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-white/70 text-[10px] uppercase tracking-[0.16em] font-semibold bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                Plans · BIM · Chantier
              </span>
            </div>
          </div>
        </div>

        {/* 5 Core Service Cards */}
        <div ref={cardsRef} className="space-y-3 px-4">
          {items.map((service, i) => {
            const isExpanded = expandedIdx === i
            return (
              <div
                key={service.num}
                className="expertise-card"
              >
                <button
                  onClick={() => setExpandedIdx(isExpanded ? -1 : i)}
                  aria-expanded={isExpanded}
                  aria-controls={`expertise-desc-${i}`}
                  className={cn(
                    "w-full rounded-xl p-6 md:p-8 text-left transition-all duration-400 border cursor-pointer group",
                    isExpanded
                      ? "bg-eai-paper/95 border-transparent shadow-2xl"
                      : "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08]"
                  )}
                >
                  {/* Header row: num + title + value + chevron */}
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "text-xs font-semibold tracking-[0.15em] uppercase shrink-0 w-8",
                      isExpanded ? "text-eai-olive" : "text-white/35"
                    )}>
                      {service.num}
                    </span>

                    <h3 className={cn(
                      "font-sans text-lg md:text-xl font-extrabold uppercase tracking-tight flex flex-wrap items-center gap-3 flex-1",
                      isExpanded ? "text-eai-charcoal" : "text-eai-paper"
                    )}>
                      <span>{service.title}</span>
                      {service.badge && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-[var(--color-eai-olive)] text-[var(--color-eai-black)] px-2 py-0.5 rounded-sm shadow-sm">
                          {service.badge}
                        </span>
                      )}
                    </h3>

                    <span className={cn(
                      "hidden md:block text-sm italic font-sans",
                      isExpanded ? "text-eai-olive/80" : "text-white/30"
                    )}>
                      {service.value}
                    </span>

                    {/* Chevron */}
                    <span className={cn(
                      "shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300",
                      isExpanded ? "rotate-180" : ""
                    )}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 4L6 8L10 4"
                          stroke={isExpanded ? "#1B1B1A" : "rgba(255,255,255,0.4)"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`expertise-desc-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pl-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <p className="text-sm leading-relaxed text-eai-charcoal/65 max-w-md">
                            {service.description}
                          </p>

                          <ul className="space-y-2">
                            {service.bullets.map((bullet: string, j: number) => (
                              <li key={j} className="flex items-start gap-3 text-sm font-bold text-eai-charcoal">
                                <span className="w-1.5 h-1.5 rounded-full bg-eai-olive mt-1.5 shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
