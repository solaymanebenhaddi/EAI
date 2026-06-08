'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonFacadePlanesProps {
  /** Facade planes opacity */
  opacity?: number;
  /** Whether facade planes are animated */
  animated?: boolean;
}

export function HorizonFacadePlanes({
  opacity = 0.1,
  animated = true,
}: HorizonFacadePlanesProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific facade planes transformations
  const planesRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 15] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planesOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [-20, -20] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planesScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.8, 1.0] : 
    activeScene === 'blueprint' ? [0.5, 0.7] : 
    activeScene === 'manifesto' ? [0.6, 0.9] : 
    activeScene === 'services' ? [0.7, 1.0] : 
    activeScene === 'projects' ? [0.9, 1.2] : 
    activeScene === 'founder' ? [0.7, 1.0] : 
    activeScene === 'events' ? [1.0, 1.3] : 
    activeScene === 'testimonials' ? [0.8, 1.1] : 
    activeScene === 'finalCTA' ? [0.9, 1.2] : 
    [0.8, 1.0]
  );

  // Facade planes representation
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
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Facade planes */}
        <rect 
          x="50" 
          y="50" 
          width="200" 
          height="100" 
          fill="none" 
          stroke="#9BAE40" 
          strokeWidth="0.8"
          opacity={0.6}
        >
          <animate attributeName="opacity" 
            values="0.6;0.4;0.6" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </rect>
        
        {/* Vertical facade divisions */}
        <line 
          x1="150" 
          y1="50" 
          x2="150" 
          y2="150" 
          stroke="#9BAE40" 
          strokeWidth="0.5"
          strokeDasharray="4,2"
        />
        
        {/* Horizontal facade divisions */}
        <line 
          x1="50" 
          y1="100" 
          x2="250" 
          y2="100" 
          stroke="#9BAE40" 
          strokeWidth="0.5"
          strokeDasharray="4,2"
        />
        
        {/* Window grid */}
        <g stroke="#9BAE40" strokeWidth="0.3" opacity={0.4}>
          {/* Vertical window dividers */}
          <line x1="80" y1="60" x2="80" y2="140" />
          <line x1="120" y1="60" x2="120" y2="140" />
          <line x1="160" y1="60" x2="160" y2="140" />
          <line x1="200" y1="60" x2="200" y2="140" />
          
          {/* Horizontal window dividers */}
          <line x1="60" y1="80" x2="220" y2="80" />
          <line x1="60" y1="100" x2="220" y2="100" />
          <line x1="60" y1="120" x2="220" y2="120" />
        </g>
      </svg>
    </motion.div>
  );
}