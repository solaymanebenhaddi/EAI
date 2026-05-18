'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCinematicMode } from '@/hooks/useCinematicMode';
import { CinematicJourney } from './CinematicJourney';
import CinematicMobile from './CinematicMobile';

interface CinematicJourneyContainerProps {
  manifesto: React.ReactNode;
  services: React.ReactNode;
}

export function CinematicJourneyContainer({ manifesto, services }: CinematicJourneyContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCinematicCapable, isInitialized } = useCinematicMode();
  
  // Track scroll progress specifically through this continuous architectural section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Fade in at 0% -> 15% and fade out at 85% -> 100%
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Safe SSR/Hydration Fallback: render the original container structure to avoid hydration mismatches
  if (!isInitialized) {
    return (
      <div ref={containerRef} className="relative w-full z-10">
        <div className="fixed inset-0 bg-mist z-0" />
        <div className="relative z-10 bg-transparent">
          {manifesto}
          {services}
        </div>
      </div>
    );
  }

  // Mobile Layout: When 3D capabilities aren't present (mobile devices),
  // render the sections inline so the creative process (CinematicMobile) flows naturally in its own place.
  if (!isCinematicCapable) {
    return (
      <div className="relative w-full z-10 flex flex-col bg-lumen">
        <div>
          {manifesto}
        </div>
        <CinematicMobile />
        <div>
          {services}
        </div>
      </div>
    );
  }

  // Desktop Cinematic Layout: Keep the 3D scene fixed in the background while HTML layers float on top
  return (
    <div ref={containerRef} className="relative w-full z-10">
      {/* Fixed Background 3D Scene */}
      <motion.div style={{ opacity }}>
        <CinematicJourney mode="background" scrollProgress={scrollYProgress} />
      </motion.div>
      
      {/* Floating Content Layer */}
      <div className="relative z-10 bg-transparent">
        {manifesto}
        {services}
      </div>
    </div>
  );
}
