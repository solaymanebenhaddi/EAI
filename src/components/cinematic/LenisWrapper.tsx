'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useCinematicMode } from '@/hooks/useCinematicMode';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isCinematicCapable } = useCinematicMode();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    
    lenisRef.current = lenis;
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  
  return <>{children}</>;
}