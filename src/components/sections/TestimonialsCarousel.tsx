"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

// Map each testimonial to a corresponding premium project/context asset
const testimonialImages = [
  siteData.images.after,      // Luxurious residential interior
  siteData.images.expertise,  // High-precision BIM / planning
  siteData.images.ecosystem,  // Networking / event ecosystem
]

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { testimonials } = siteData
  const total = testimonials.length

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total)
    }, 6000)
  }, [total])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const handleManual = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setActive((index + total) % total)
    startTimer()
  }

  // Scroll entrance animation
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.reveal-testimonials', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="temoignages"
      className="relative w-full bg-eai-paper text-eai-charcoal overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        paddingTop: 'clamp(4rem, 10vh, 8rem)',
        paddingBottom: 'clamp(4rem, 10vh, 8rem)',
      }}
    >
      <div className="reveal-testimonials max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full relative">
        {/* Top Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-eai-charcoal/10 pb-8 mb-12 lg:mb-16">
          <div>
            <span className="text-eai-olive text-[10px] uppercase tracking-[0.22em] font-semibold block mb-4">
              Avis Clients
            </span>
            <h2 className="font-sans text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[0.95] font-extrabold uppercase tracking-tight">
              Preuve de<br />confiance.
            </h2>
          </div>
          <p className="text-sm text-eai-charcoal/50 max-w-xs mt-4 md:mt-0 font-medium leading-relaxed">
            Ce que disent nos partenaires à propos de notre rigueur d&apos;ingénierie et de notre créativité.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[520px] md:min-h-[440px] lg:min-h-[400px] w-full">
          {testimonials.map((t, i) => {
            const isActive = active === i
            return (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch transition-all duration-700 ease-in-out",
                  isActive
                    ? "opacity-100 translate-x-0 pointer-events-auto z-10"
                    : "opacity-0 translate-x-8 pointer-events-none z-0"
                )}
              >
                {/* Left Column: Visual project display (5 cols) */}
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={testimonialImages[i]}
                    alt={`Review showcase ${i + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-[6s] ease-linear",
                      isActive ? "scale-105" : "scale-100"
                    )}
                    loading="lazy"
                  />
                  {/* Visual shadow mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  
                  {/* Minimal counter label in corner */}
                  <div className="absolute bottom-6 left-6 z-20 bg-eai-paper/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold tracking-[0.16em] uppercase text-eai-charcoal">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                </div>

                {/* Right Column: Quote content (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center py-4">
                  
                  {/* Auto progress line indicator */}
                  <div className="w-full h-[2px] bg-eai-charcoal/10 rounded-full overflow-hidden mb-8">
                    <div
                      className={cn(
                        "h-full bg-eai-olive origin-left w-full",
                        isActive ? "animate-progress-fill" : "scale-x-0"
                      )}
                      style={{
                        transformOrigin: 'left center',
                        animationDuration: '6000ms',
                        animationTimingFunction: 'linear',
                        animationFillMode: 'both',
                      }}
                    />
                  </div>

                  {/* Testimonial Quote display */}
                  <div className="space-y-6 lg:space-y-8">
                    <blockquote className="relative">
                      <span className="text-eai-olive/20 text-[5rem] font-sans absolute -top-8 -left-4 select-none leading-none">&ldquo;</span>
                      <p className="font-sans text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.35] font-semibold text-eai-charcoal tracking-tight max-w-2xl pl-6 relative z-10">
                        {t.quote}
                      </p>
                    </blockquote>

                    <div className="pl-6">
                      <cite className="not-italic">
                        <span className="block text-base font-bold text-eai-charcoal uppercase tracking-wider">
                          {t.author}
                        </span>
                        <span className="block text-xs font-semibold text-eai-olive uppercase tracking-[0.2em] mt-1">
                          {t.company}
                        </span>
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation & Controls (Fixed below the sliding container) */}
        <div className="flex items-center justify-between border-t border-eai-charcoal/10 pt-8 mt-6 relative z-20">
          {/* Pagination text tabs */}
          <div className="flex items-center gap-6">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => handleManual(i)}
                className={cn(
                  "text-xs font-bold tracking-[0.16em] uppercase pb-2 transition-all cursor-pointer border-b-2 hover:text-eai-charcoal",
                  active === i
                    ? "border-eai-olive text-eai-charcoal"
                    : "border-transparent text-eai-charcoal/35"
                )}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          {/* Prev / Next circular arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleManual(active - 1)}
              className="w-12 h-12 rounded-full border border-eai-charcoal/15 flex items-center justify-center text-eai-charcoal/50 hover:border-eai-charcoal/50 hover:text-eai-charcoal/90 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Précédent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button
              onClick={() => handleManual(active + 1)}
              className="w-12 h-12 rounded-full border border-eai-charcoal/15 flex items-center justify-center text-eai-charcoal/50 hover:border-eai-charcoal/50 hover:text-eai-charcoal/90 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Suivant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
