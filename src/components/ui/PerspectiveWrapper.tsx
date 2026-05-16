'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PerspectiveWrapperProps {
  children: React.ReactNode;
}

export function PerspectiveWrapper({ children }: PerspectiveWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Perspective effects as the section leaves the viewport
  // We want the section to shrink and tilt back as the next one comes up
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.95, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen sticky top-0 overflow-hidden bg-void"
      style={{ perspective: '2000px', zIndex: 1 }}
    >
      <motion.div
        style={{ 
          scale, 
          rotateX, 
          opacity,
          z,
          filter: `brightness(${brightness})`,
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d'
        }}
        className="w-full h-full shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
