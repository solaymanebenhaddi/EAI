"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'

gsap.registerPlugin(ScrollTrigger)

export default function InteriorDesignIntro() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.intro-elem', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="interior-design-intro"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="intro-elem text-xs tracking-[0.3em] uppercase opacity-60 mb-6 font-bold text-[var(--color-eai-olive)]">
            Design Intérieur & Aménagement
          </p>
          <h2 className="intro-elem font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mb-8 leading-[1.1]">
            Sculpter l'espace, <br /> Révéler le potentiel.
          </h2>
          <div className="intro-elem space-y-6 text-lg opacity-80 leading-relaxed max-w-lg">
            <p>
              EAI s'impose comme le spécialiste de l'aménagement intérieur et du design d'espace. Nous créons des environnements personnalisés pour des projets résidentiels et professionnels, alliant sensibilité créative et rigueur technique.
            </p>
            <p>
              Grâce à la visualisation 3D avant exécution et à notre service d'aménagement clé en main, nous transformons chaque espace pour qu'il reflète votre identité unique, tout en maîtrisant les coûts et les délais.
            </p>
          </div>
        </div>
        <div className="intro-elem flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-sm lg:max-w-md">
            <RemoteVideo {...videoConfig.interiorDesign} poster="/assets/elaouad-after-interior.webp" className="shadow-2xl" autoPlay={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
