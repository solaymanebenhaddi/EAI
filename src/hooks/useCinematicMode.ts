'use client';

import { useState, useEffect } from 'react';

export function useCinematicMode() {
  const [isCinematicCapable, setIsCinematicCapable] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Determine if the device is capable of running the 3D cinematic mode.
    // 1. Must be mounted (client-side)
    // 2. Minimum screen width (e.g., 1024px for desktop)
    // 3. (Optional) Could check for WebGL support or prefers-reduced-motion
    
    const checkCapabilities = () => {
      const isDesktop = window.innerWidth >= 1024;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Basic WebGL check
      let hasWebGL = false;
      try {
        const canvas = document.createElement('canvas');
        hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        hasWebGL = false;
      }

      setIsCinematicCapable(isDesktop && !prefersReducedMotion && hasWebGL);
      setIsInitialized(true);
    };

    checkCapabilities();

    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return { isCinematicCapable, isInitialized };
}
