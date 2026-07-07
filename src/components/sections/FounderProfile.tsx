"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export default function FounderProfile() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.founder-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      })

      gsap.from('.founder-text-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
      })

      gsap.from('.founder-quote-block', {
        scrollTrigger: {
          trigger: '.founder-quote-block',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const t = useTranslations('Founder')
  const titleLines = t('title').split('\n')
  const { founder } = siteData

  return (
    <section
      ref={sectionRef}
      id="fondatrice"
      className="relative min-h-screen w-full bg-eai-paper overflow-hidden flex items-center"
      style={{ paddingTop: 'clamp(4rem, 10vh, 8rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Eyebrow */}
        <p className="founder-text-block text-xs tracking-[0.3em] uppercase text-eai-charcoal/40 mb-6">
          {t('eyebrow')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Portrait */}
          <div className="founder-image relative aspect-[3/4] max-h-[680px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={founder.image}
              alt={`${t('name')} — ${t('role')}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback: show initials on a gradient if the real photo isn't available yet
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #1B1B1A 0%, #3a3a38 100%)'
                  parent.innerHTML = `
                    <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;flex-direction:column;gap:1rem;">
                      <span style="font-size:6rem;font-weight:800;color:rgba(244,242,236,0.6);font-family:var(--font-sans);">SE</span>
                      <span style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(244,242,236,0.35);">Portrait à venir</span>
                    </div>
                  `
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Right — Biography */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-4">
              {titleLines.map((line, i) => (
                <span
                  key={i}
                  className="founder-text-block block font-sans text-[clamp(2rem,4vw,3.4rem)] leading-[1.1] font-extrabold uppercase tracking-tight text-eai-charcoal"
                >
                  {line}
                </span>
              ))}
            </h2>

            <p className="founder-text-block text-sm tracking-[0.15em] uppercase text-eai-charcoal/50 mb-8">
              {t('name')} — {t('role')}
            </p>

            <div className="space-y-5 max-w-lg">
              <p className="founder-text-block text-[clamp(0.9rem,1.05vw,1rem)] leading-relaxed text-eai-charcoal/70">
                {t('intro')}
              </p>
              <p className="founder-text-block text-[clamp(0.9rem,1.05vw,1rem)] leading-relaxed text-eai-charcoal/70">
                {t('philosophy')}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="founder-quote-block mt-10 pl-6 border-l-2 border-eai-olive/60">
              <p className="font-sans text-[clamp(1.05rem,1.3vw,1.25rem)] italic leading-relaxed text-eai-charcoal/80">
                &ldquo;{t('quote')}&rdquo;
              </p>
              <cite className="block mt-4 text-xs tracking-[0.15em] uppercase text-eai-charcoal/40 not-italic">
                — {t('name')}
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
