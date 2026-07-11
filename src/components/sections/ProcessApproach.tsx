"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'

gsap.registerPlugin(ScrollTrigger)

export default function ProcessApproach() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.pa-elem', {
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

  return (
    <section
      ref={sectionRef}
      id="process-approach"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
        <div className="lg:col-span-8 px-6 md:px-12 lg:pl-20 xl:pl-[calc((100vw-1440px)/2+5rem)] lg:pr-16">
          <div className="mb-12">
            <p className="pa-elem text-xs tracking-[0.3em] uppercase opacity-60 mb-4 font-bold text-[var(--color-eai-olive)]">
              Découvrir Notre Approche
            </p>
            <h2 className="pa-elem font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
              Le processus EAI
            </h2>
            <p className="pa-elem text-lg opacity-80 leading-relaxed max-w-2xl">
              De l'idée initiale à l'espace finalisé, chaque étape est structurée pour garantir la qualité, le respect du budget et l'excellence architecturale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {siteData.approachSteps.map((step, i) => (
              <div key={i} className="pa-elem relative pt-6 border-t-2 border-[var(--color-eai-charcoal)]/10 hover:border-[var(--color-eai-olive)] transition-colors duration-300">
                <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-eai-charcoal)]" />
                <div className="text-[var(--color-eai-olive)] text-lg font-bold mb-2 leading-none">{step.num}</div>
                <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-xs opacity-70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-4 lg:sticky lg:top-24 mt-8 lg:mt-0 w-full h-[500px] lg:h-[calc(100vh-12rem)] min-h-[400px]">
          <div className="pa-elem w-full h-full relative shadow-2xl rounded-none lg:rounded-l-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/process.png" 
              alt="Process EAI" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
