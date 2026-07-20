"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export default function Conception3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('Conception3D')
  const categories = t.raw('categories') as Array<{name: string, description: string}>

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.c3d-card', {
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

  const { conception3D } = siteData

  // Helper function to render a standard category item
  const renderCategory = (catData: any, i18nCat: any, index: number, customClass = "") => (
    <div key={index} className={`c3d-card group cursor-pointer flex flex-col ${customClass}`}>
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-sm">
        <img
          src={catData.image}
          alt={i18nCat.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <h3 className="font-sans text-xl font-bold uppercase tracking-wide mb-2">{i18nCat.name}</h3>
      <p className="text-sm opacity-70 leading-relaxed flex-1">{i18nCat.description}</p>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="conception3d"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4 text-[var(--color-eai-olive)] font-bold">
            {t('eyebrow')}
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            {t('title')}
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            {t('description')}
          </p>
          {t('announcement') && (
            <div className="c3d-card mt-8 bg-[var(--color-eai-olive)]/15 border border-[var(--color-eai-olive)]/40 p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-4">
              <span className="bg-[var(--color-eai-olive)] text-[var(--color-eai-black)] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-sm whitespace-nowrap">
                Prestation Clé
              </span>
              <p className="text-sm font-semibold opacity-90 text-[var(--color-eai-charcoal)] leading-relaxed">
                {t('announcement').replace('PRESTATION CLÉ : ', '')}
              </p>
            </div>
          )}
        </div>

        {/* 3-Column Flex Masonry to eliminate vertical gaps */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-8">
            {renderCategory(conception3D.categories[0], categories[0], 0)}
            {renderCategory(conception3D.categories[3], categories[3], 3)}
            {renderCategory(conception3D.categories[5], categories[5], 5)}
          </div>

          {/* Column 2 (Center) */}
          <div className="flex-1 flex flex-col gap-8">
            {renderCategory(conception3D.categories[1], categories[1], 1)}
            
            <div className="c3d-card rounded-lg overflow-hidden shadow-2xl relative bg-black aspect-[9/16] lg:aspect-auto lg:h-[600px]">
              <RemoteVideo 
                {...videoConfig.conception3D} 
                poster="/assets/elaouad-before-sketch.png" 
                autoPlay={true} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {renderCategory(conception3D.categories[6], categories[6], 6)}
          </div>

          {/* Column 3 */}
          <div className="flex-1 flex flex-col gap-8">
            {renderCategory(conception3D.categories[2], categories[2], 2)}
            {renderCategory(conception3D.categories[4], categories[4], 4)}
            {renderCategory(conception3D.categories[7], categories[7], 7)}
          </div>

        </div>
      </div>
    </section>
  )
}
