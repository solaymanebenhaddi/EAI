"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function LocationMap() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.lm-elem', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { locationMap, contact } = siteData

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative w-full bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] py-12"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lm-elem">
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight mb-4">
            Notre Siège
          </h2>
          <div className="flex items-start gap-4 opacity-80 mb-6">
            <MapPin className="w-6 h-6 shrink-0 mt-1 text-[var(--color-eai-olive)]" />
            <div>
              <p className="text-lg leading-relaxed">{contact.address}</p>
              <p className="mt-2 text-sm">Venez discuter de votre projet avec nos experts en architecture et design d'intérieur.</p>
            </div>
          </div>
          <a
            href={locationMap.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 border border-white/30 text-xs uppercase tracking-widest hover:bg-white hover:text-[var(--color-eai-charcoal)] transition-colors duration-300"
          >
            Obtenir l'itinéraire
          </a>
        </div>
        <div className="lm-elem relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-white/5">
          <iframe
            src={locationMap.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="EAI Construction Map Location"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  )
}
