"use client"

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'

gsap.registerPlugin(ScrollTrigger)

const categories = ['Tous', 'Résidentiel', 'Agricole', 'Agro-industriel', 'Études & Suivi', 'Formation']

export default function PortfolioGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous'
    ? siteData.portfolio
    : siteData.portfolio.filter(p => p.category === activeFilter)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Re-animate cards when filter changes
  useEffect(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.portfolio-card')
    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    )
  }, [activeFilter])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-eai-charcoal text-eai-paper overflow-hidden"
      style={{ paddingTop: 'clamp(4rem, 10vh, 8rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="portfolio-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Portfolio</p>
            <h2 className="font-sans text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] font-extrabold uppercase tracking-tight">
              Projets<br />signature.
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-full border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-eai-paper text-eai-charcoal border-eai-paper'
                    : 'bg-transparent text-eai-paper/60 border-white/15 hover:border-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((project, i) => (
            <div
              key={`${project.name}-${i}`}
              className="portfolio-card group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

              {/* Category tag */}
              <span className="absolute top-4 left-4 px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                {project.category}
              </span>

              {/* Content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight mb-1">{project.name}</h3>
                <p className="text-xs opacity-50 mb-2">{project.location} · {project.year}</p>
                <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-60 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
