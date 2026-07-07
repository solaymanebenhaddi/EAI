"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteData } from "@/data/site"
import { Button } from "@/components/ui/Button"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)

export default function TransformationView() {
  const containerRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Transformation')
  const titleLines = t('title').split('\n')
  const tags = t.raw('tags') as string[]

  // Slider State
  const [slider, setSlider] = useState(50)
  const baRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const moveSlider = useCallback((clientX: number) => {
    if (!baRef.current) return
    const r = baRef.current.getBoundingClientRect()
    setSlider(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="transformation"
      ref={containerRef}
      className="h-screen w-full flex flex-col px-1.5 md:px-2.5 pt-1.5 md:pt-2 pb-1.5 md:pb-2 gap-1.5 md:gap-2 bg-[var(--color-background)]"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-2">
        {/* Left — heading card */}
        <div ref={leftRef} className="md:col-span-4 rounded-xl md:rounded-2xl bg-white shadow-sm border border-[var(--color-eai-charcoal)]/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-eai-paper)]/50 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[var(--color-eai-olive)] text-[10px] uppercase tracking-[0.22em] font-semibold">{t('eyebrow')}</span>
            <h2 className="font-sans text-[var(--color-eai-charcoal)] text-[2.5rem] md:text-[3.5rem] leading-[0.9] font-extrabold uppercase tracking-tight mt-4 drop-shadow-sm">
              {titleLines.map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="mt-5 text-[var(--color-eai-charcoal)]/70 text-sm leading-relaxed max-w-sm font-medium">
              {t('desc')}
            </p>
          </div>
          <div className="relative z-10">
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
              {tags.map((l: string) => (
                <span key={l} className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-eai-charcoal)]/60 font-semibold border-t border-[var(--color-eai-charcoal)]/10 pt-2 w-[calc(50%-1.5rem)] md:w-auto flex-1 min-w-[80px]">
                  {l}
                </span>
              ))}
            </div>
            <Button variant="outline" className="mt-8 border-[var(--color-eai-charcoal)]/20 hover:bg-[var(--color-eai-charcoal)] hover:text-white" onClick={() => document.getElementById('methode')?.scrollIntoView({behavior: 'smooth'})}>
              {t('cta')}
            </Button>
          </div>
        </div>

        {/* Right — before/after slider */}
        <div 
          ref={(el) => {
            if (el) {
              rightRef.current = el
              baRef.current = el
            }
          }}
          onMouseDown={() => { dragging.current = true }}
          onMouseUp={() => { dragging.current = false }}
          onMouseLeave={() => { dragging.current = false }}
          onMouseMove={(e) => { if (dragging.current) moveSlider(e.clientX) }}
          onTouchMove={(e) => { if (e.touches[0]) moveSlider(e.touches[0].clientX) }}
          onClick={(e) => moveSlider(e.clientX)}
          className="md:col-span-8 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[300px] md:min-h-0 cursor-ew-resize select-none shadow-md"
        >
          {/* Before */}
          <div className="absolute inset-0 grayscale contrast-125 brightness-90">
            <Image src={siteData.images.before} alt="Avant" fill className="object-cover" />
          </div>
          <div className="absolute top-6 left-6 bg-[var(--color-eai-charcoal)]/80 text-[var(--color-eai-paper)] px-4 py-2 text-[10px] uppercase tracking-[0.16em] z-20 font-bold rounded-full backdrop-blur-md">
            {t('before')}
          </div>

          {/* After */}
          <div className="absolute inset-0" style={{ clipPath: `polygon(${slider}% 0, 100% 0, 100% 100%, ${slider}% 100%)` }}>
            <Image src={siteData.images.after} alt="Après" fill className="object-cover" />
            <div className="absolute top-6 right-6 bg-[var(--color-eai-olive)] text-[var(--color-eai-black)] px-4 py-2 text-[10px] uppercase tracking-[0.16em] z-20 font-bold rounded-full shadow-lg">
              {t('after')}
            </div>
          </div>

          {/* Divider */}
          <div className="absolute top-0 bottom-0 w-[3px] bg-[var(--color-eai-olive)] z-20 pointer-events-none drop-shadow-md" style={{ left: `${slider}%` }} />
          <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border-[3px] border-[var(--color-eai-olive)] flex items-center justify-center pointer-events-none shadow-xl" style={{ left: `${slider}%`, top: '50%' }}>
            <span className="text-[var(--color-eai-olive)] text-lg font-black select-none leading-none mb-[2px]">↔</span>
          </div>

          {/* Captions */}
          <div className="absolute bottom-6 inset-x-6 z-20 flex justify-between text-white text-[10px] uppercase tracking-[0.16em] font-semibold pointer-events-none">
            <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">{t('existant')}</span>
            <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">{t('projete')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
