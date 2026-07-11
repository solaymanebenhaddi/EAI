"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/data/site'
import { CheckCircle2 } from 'lucide-react'
import RemoteVideo from '@/components/ui/RemoteVideo'
import { videoConfig } from '@/data/videoConfig'

gsap.registerPlugin(ScrollTrigger)

export default function TurnkeyServices() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.ts-elem', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { turnkeyServices } = siteData

  return (
    <section
      ref={sectionRef}
      id="turnkey-services"
      className="relative w-full bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div className="w-full max-w-sm ts-elem">
            <RemoteVideo {...videoConfig.turnkey} poster="/assets/residence-casablanca.png" autoPlay={true} />
          </div>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div>
            <p className="ts-elem text-xs tracking-[0.3em] uppercase opacity-50 mb-4 text-[var(--color-eai-olive)] font-bold">
              {turnkeyServices.eyebrow}
            </p>
            <h2 className="ts-elem font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6 leading-tight">
              {turnkeyServices.title}
            </h2>
            <p className="ts-elem text-lg opacity-80 leading-relaxed mb-8">
              {turnkeyServices.description}
            </p>
            <ul className="ts-elem space-y-3">
              {turnkeyServices.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-eai-olive)] shrink-0 mt-0.5" />
                  <span className="opacity-90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {turnkeyServices.steps.map((step, i) => (
              <div key={i} className="ts-elem bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[var(--color-eai-olive)] transition-colors">
                <div className="text-[var(--color-eai-olive)] text-[10px] font-bold tracking-widest mb-1">STEP {step.num}</div>
                <h3 className="font-bold text-sm leading-tight">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
