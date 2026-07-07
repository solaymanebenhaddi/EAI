"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export default function VisionStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Stagger paragraphs
      gsap.from('.vision-paragraph', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
      })

      // Title reveal
      gsap.from('.vision-title-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      })

      // Image
      gsap.from('.vision-image-wrapper', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      })

      // Stats counters
      if (statsRef.current) {
        gsap.from('.vision-stat', {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const t = useTranslations('Vision')
  const titleLines = t('title').split('\n')
  const paragraphs = [t('p1'), t('p2'), t('p3')]
  const stats = t.raw('stats') as {value: string, label: string}[]
  const { vision } = siteData

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen w-full bg-eai-charcoal text-eai-paper overflow-hidden"
      style={{ paddingTop: 'clamp(4rem, 10vh, 8rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center">
        {/* Eyebrow */}
        <p className="vision-title-line text-xs tracking-[0.3em] uppercase opacity-50 mb-6">
          {t('eyebrow')}
        </p>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Editorial text */}
          <div>
            <h2 className="mb-10">
              {titleLines.map((line, i) => (
                <span
                  key={i}
                  className="vision-title-line block font-sans text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05] font-extrabold uppercase tracking-tight"
                >
                  {line}
                </span>
              ))}
            </h2>

            <div className="space-y-6 max-w-xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`vision-paragraph text-[clamp(0.9rem,1.1vw,1.05rem)] leading-relaxed ${
                    i === paragraphs.length - 1
                      ? 'font-serif text-[clamp(1.1rem,1.4vw,1.3rem)] italic opacity-90'
                      : 'opacity-65'
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="vision-image-wrapper relative aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src={vision.image}
              alt="ELAOUAD Architecture — Plans et conception BIM"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-eai-charcoal/40 to-transparent" />
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="vision-stat text-center lg:text-left">
              <span className="block font-sans text-[clamp(2.5rem,4vw,3.8rem)] font-extrabold leading-none mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase opacity-45">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
