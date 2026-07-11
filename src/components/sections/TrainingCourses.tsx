"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { ArrowRight } from 'lucide-react'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'

gsap.registerPlugin(ScrollTrigger)

export default function TrainingCourses() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.tc-elem', {
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

  const { trainingOffer } = siteData

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative w-full bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="tc-elem text-xs tracking-[0.3em] uppercase opacity-60 mb-4 font-bold text-[var(--color-eai-olive)]">
              {trainingOffer.eyebrow}
            </p>
            <h2 className="tc-elem font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mb-8">
              {trainingOffer.title}
            </h2>
            <p className="tc-elem text-lg opacity-80 leading-relaxed mb-8 max-w-lg">
              {trainingOffer.description}
            </p>
            
            <ul className="tc-elem space-y-4 mb-10">
              {trainingOffer.topics.map((topic, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <ArrowRight className="w-4 h-4 text-[var(--color-eai-olive)]" />
                  <span className="font-medium opacity-90">{topic}</span>
                </li>
              ))}
            </ul>

            <a 
              href={trainingOffer.externalUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tc-elem inline-flex items-center justify-center px-8 py-4 bg-[var(--color-eai-olive)] text-[var(--color-eai-black)] font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
            >
              Découvrir nos formations
            </a>
            <p className="tc-elem mt-4 text-xs opacity-50 font-serif italic">
              * Vous serez redirigé vers la plateforme EAI Courses
            </p>
          </div>

          <div className="tc-elem w-full max-w-sm lg:max-w-md mx-auto xl:mr-0">
            <RemoteVideo {...videoConfig.training} poster={trainingOffer.videoUrl} className="shadow-2xl" autoPlay={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
