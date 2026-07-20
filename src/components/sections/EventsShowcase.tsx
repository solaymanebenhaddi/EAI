"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export default function EventsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('Events')
  const stats = t.raw('stats') as Array<{value: string, label: string}>

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.events-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.events-stat', {
        scrollTrigger: {
          trigger: '.events-stats-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { events } = siteData
  const titleLines = t('title').split('\n')

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative w-full min-h-[80vh] overflow-hidden flex items-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${events.image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-eai-charcoal/80 backdrop-blur-[2px] z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="events-content lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-sm">
              <RemoteVideo {...videoConfig.currentEvent} poster="/assets/elaouad-events-formation.webp" className="shadow-2xl border border-white/10" autoPlay={true} />
            </div>
          </div>

          <div className="events-content lg:col-span-7 max-w-2xl">
            {/* Eyebrow */}
            <p className="text-xs tracking-[0.3em] uppercase text-eai-olive mb-6">
              {t('eyebrow')}
            </p>

            {/* Title */}
            <h2 className="mb-8">
              {titleLines.map((line, i) => (
                <span
                  key={i}
                  className="block font-sans text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] font-extrabold uppercase tracking-tight text-eai-paper"
                >
                  {line}
                </span>
              ))}
            </h2>

            {/* Description */}
            <p className="text-[clamp(0.9rem,1.1vw,1.05rem)] leading-relaxed text-eai-paper/65 max-w-lg mb-12">
              {t('description')}
            </p>

            {/* CTA */}
            <a
              href="https://events.eai-construction.com/fidi26-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 text-sm tracking-[0.15em] uppercase border border-eai-olive/60 text-eai-paper rounded-full hover:bg-eai-olive/15 transition-all duration-300 no-underline"
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="translate-x-0 group-hover:translate-x-1 transition-transform">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="events-stats-row grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/10 max-w-4xl">
          {stats.map((stat, i) => (
            <div key={i} className="events-stat">
              <span className="block font-sans text-[clamp(2.0rem,3.5vw,3rem)] font-extrabold text-eai-paper leading-none mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-eai-paper/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
