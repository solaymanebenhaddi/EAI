"use client"

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Prevent SSR execution
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // Sync Lenis frame updates with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Store globally so the Navbar can scroll with Lenis offsets
    ;(window as any).lenis = lenis

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateTicker)
      ;(window as any).lenis = null
    }
  }, [])

  return <>{children}</>
}
