"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'

gsap.registerPlugin(ScrollTrigger)

export default function Conception3D() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      ref={sectionRef}
      id="conception3d"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4 text-[var(--color-eai-olive)] font-bold">
            {conception3D.eyebrow}
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            {conception3D.title}
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            {conception3D.description}
          </p>
        </div>

        <div className="c3d-card w-full max-w-sm mx-auto mb-16 shadow-2xl">
          <RemoteVideo {...videoConfig.conception3D} poster="/assets/elaouad-before-sketch.png" autoPlay={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conception3D.categories.map((cat, i) => (
            <div key={i} className="c3d-card group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="font-sans text-xl font-bold uppercase tracking-wide mb-2">{cat.name}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
