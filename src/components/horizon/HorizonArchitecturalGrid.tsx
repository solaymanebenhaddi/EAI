'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonArchitecturalGridProps {
  /** Grid density */
  density?: number;
  /** Grid opacity */
  opacity?: number;
  /** Whether grid is animated */
  animated?: boolean;
}

export function HorizonArchitecturalGrid({
  density = 20,
  opacity = 0.1,
  animated = true,
}: HorizonArchitecturalGridProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific grid transformations
  const gridRotation = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 90] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const gridScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [1, 1.2] : 
    activeScene === 'blueprint' ? [1, 0.8] : 
    activeScene === 'manifesto' ? [1, 1] : 
    activeScene === 'services' ? [1, 1] : 
    activeScene === 'projects' ? [1, 1] : 
    activeScene === 'founder' ? [1, 1] : 
    activeScene === 'events' ? [1, 1] : 
    activeScene === 'testimonials' ? [1, 1] : 
    activeScene === 'finalCTA' ? [1, 1] : 
    [1, 1]
  );
  
  const gridOffsetY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [-20, -20] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );

  // Create grid lines
  const verticalLines = Array.from({ length: density }).map((_, i) => (
    <motion.line
      key={`vgrid-${i}`}
      x1={i * (100 / density)}
      y1="0"
      x2={i * (100 / density)}
      y2="100%"
      stroke="#B8963C"
      strokeWidth="0.5"
      strokeDasharray="2,4"
      opacity={opacity}
      initial={{ pathLength: 0 }}
      animate={isInView && animated ? { pathLength: 1 } : { pathLength: 1 }}
      transition={{ duration: 2, delay: i * 0.05 }}
    />
  ));
  
  const horizontalLines = Array.from({ length: density }).map((_, i) => (
    <motion.line
      key={`hgrid-${i}`}
      x1="0"
      y1={i * (100 / density)}
      x2="100%"
      y2={i * (100 / density)}
      stroke="#B8963C"
      strokeWidth="0.5"
      strokeDasharray="2,4"
      opacity={opacity}
      initial={{ pathLength: 0 }}
      animate={isInView && animated ? { pathLength: 1 } : { pathLength: 1 }}
      transition={{ duration: 2, delay: i * 0.05 }}
    />
  ));

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: `
          rotate(${gridRotation}deg) 
          scale(${gridScale}) 
          translateY(${gridOffsetY}px)
        `,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {verticalLines}
        {horizontalLines}
      </svg>
    </motion.div>
  );
}