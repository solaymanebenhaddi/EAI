"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { ExternalLink } from 'lucide-react'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export default function MayushDesign() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('MayushDesign')

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.md-elem', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { mayushDesign } = siteData

  return (
    <section
      ref={sectionRef}
      id="mayush-design"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-0 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch bg-white">
        <div className="md-elem lg:col-span-7 px-6 md:px-12 lg:pl-20 xl:pl-[calc((100vw-1440px)/2+5rem)] lg:pr-16 py-16 md:py-24">
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/mayush-logo.png" 
              alt="Mayush Design" 
              className="h-16 md:h-20 w-auto object-contain" 
            />
          </div>
          
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-6 text-[#1F2E3D]">
            {t('title')}
          </h2>
          <p className="text-lg opacity-80 leading-relaxed mb-8 text-[#4A5568]">
            {t('description')}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {mayushDesign.categories.map((cat, i) => (
              <a 
                key={i} 
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-50 border border-slate-200 text-sm font-medium rounded-full text-[#1F2E3D] hover:border-[#ED9426] hover:text-[#ED9426] transition-colors duration-300 cursor-pointer no-underline block"
              >
                {cat.name}
              </a>
            ))}
          </div>

          <a 
            href={mayushDesign.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ED9426] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#1F2E3D] transition-colors duration-300 rounded-sm gap-3 shadow-lg shadow-[#ED9426]/20"
          >
            Visiter Mayush Design
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="md-elem lg:col-span-5 w-full h-[400px] lg:h-full min-h-[400px] lg:min-h-0 relative">
          <RemoteVideo 
            {...videoConfig.mayush} 
            poster={mayushDesign.image} 
            className="!aspect-auto w-full h-full !rounded-none overflow-hidden shadow-2xl" 
            autoPlay={true}
          />
        </div>
      </div>
    </section>
  )
}
