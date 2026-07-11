"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { beforeAfterVideos } from '@/data/videoConfig'
import RemoteVideo from '@/components/ui/RemoteVideo'

gsap.registerPlugin(ScrollTrigger)

export default function BeforeAfterVideos() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.ba-elem', {
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
      id="before-after-videos"
      className="relative w-full bg-[var(--color-eai-paper)] text-[var(--color-eai-charcoal)] py-24 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="ba-elem text-xs tracking-[0.3em] uppercase opacity-60 mb-4 font-bold text-[var(--color-eai-olive)]">
            Avant / Après
          </p>
          <h2 className="ba-elem font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            Réalisations & Transformations
          </h2>
          <p className="ba-elem text-lg opacity-80 leading-relaxed">
            Découvrez la métamorphose de nos projets, de l'état existant jusqu'à la livraison finale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterVideos.map((video) => (
            <div key={video.id} className="ba-elem bg-white p-4 rounded-xl shadow-lg border border-black/5 flex flex-col">
              <div className="mb-4">
                <RemoteVideo {...video} className="shadow-sm w-full max-w-xs mx-auto" playOnHover={true} />
              </div>
              <div className="px-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-eai-olive)] font-bold">{video.category}</span>
                </div>
                {video.location && (
                  <p className="text-xs text-black/50 font-medium mb-2">{video.location}</p>
                )}
                <p className="text-sm opacity-70 mb-4 flex-1">{video.description}</p>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-black/50 mt-auto pt-4 border-t border-black/5">
                  <span className="bg-black/5 px-2 py-1 rounded">{video.beforeLabel}</span>
                  <span>→</span>
                  <span className="bg-[var(--color-eai-olive)]/20 text-[var(--color-eai-olive)] px-2 py-1 rounded">{video.afterLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
