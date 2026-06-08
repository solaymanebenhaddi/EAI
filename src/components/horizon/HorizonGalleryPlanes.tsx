'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonGalleryPlanesProps {
  /** Gallery planes opacity */
  opacity?: number;
  /** Whether gallery planes are animated */
  animated?: boolean;
}

export function HorizonGalleryPlanes({
  opacity = 0.12,
  animated = true,
}: HorizonGalleryPlanesProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific gallery planes transformations
  const planesRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 180] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planesOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [-50, 50] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planesScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.7, 0.9] : 
    activeScene === 'blueprint' ? [0.5, 0.7] : 
    activeScene === 'manifesto' ? [0.6, 0.8] : 
    activeScene === 'services' ? [0.6, 0.8] : 
    activeScene === 'projects' ? [0.8, 1.0] : 
    activeScene === 'founder' ? [0.7, 0.9] : 
    activeScene === 'events' ? [0.6, 0.8] : 
    activeScene === 'testimonials' ? [0.5, 0.7] : 
    activeScene === 'finalCTA' ? [0.6, 0.8] : 
    [0.7, 0.9]
  );

  // Gallery planes representation (exhibition-style display)
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transform: `
          translateZ(${planesOffsetZ}px)
          rotateY(${planesRotationY}deg)
          scale(${planesScale})
        `,
      }}
    >
      <svg width="350" height="250" viewBox="0 0 350 250">
        {/* Main exhibition wall */}
        <rect 
          x="25" 
          y="25" 
          width="300" 
          height="200" 
          fill="none" 
          stroke="#9BAE40" 
          strokeWidth="0.8"
          opacity={0.6}
        >
          <animate attributeName="opacity" 
            values="0.6;0.4;0.6" 
            dur="5s" 
            repeatCount="indefinite" 
          />
        </rect>
        
        {/* Exhibition lights */}
        <g fill="#9BAE40" opacity={0.3}>
          <circle cx="50" cy="40" r="3" />
          <circle cx="100" cy="40" r="3" />
          <circle cx="150" cy="40" r="3" />
          <circle cx="200" cy="40" r="3" />
          <circle cx="250" cy="40" r="3" />
          <circle cx="300" cy="40" r="3" />
        </g>
        
        {/* Picture frames */}
        <g stroke="#9BAE40" strokeWidth="0.6" opacity={0.7}>
          {/* Large featured piece */}
          <rect x="50" y="50" width="100" height="120" />
          
          {/* Secondary pieces */}
          <rect x="180" y="50" width="60" height="80" />
          <rect x="260" y="50" width="60" height="80" />
          <rect x="180" y="150" width="60" height="80" />
          <rect x="260" y="150" width="60" height="80" />
        </g>
        
        {/* Picture content placeholders */}
        <g fill="#9BAE40" opacity={0.2}>
          <rect x="55" y="55" width="90" height="110" />
          <rect x="185" y="55" width="50" height="70" />
          <rect x="265" y="55" width="50" height="70" />
          <rect x="185" y="155" width="50" height="70" />
          <rect x="265" y="155" width="50" height="70" />
        </g>
        
        {/* Labels/titles under pictures */}
        <g fontSize="8" fontFamily="monospace" fill="#9BAE40" opacity={0.6}>
          <text x="100" y="180" textAnchor="middle">PROJECT ONE</text>
          <text x="210" y="180" textAnchor="middle">PROJECT TWO</text>
          <text x="290" y="180" textAnchor="middle">PROJECT THREE</text>
          <text x="210" y="250" textAnchor="middle">PROJECT FOUR</text>
          <text x="290" y="250" textAnchor="middle">PROJECT FIVE</text>
        </g>
      </svg>
    </motion.div>
  );
}