'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonUrbanGridProps {
  /** Urban grid opacity */
  opacity?: number;
  /** Whether urban grid is animated */
  animated?: boolean;
}

export function HorizonUrbanGrid({
  opacity = 0.06,
  animated = true,
}: HorizonUrbanGridProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific urban grid transformations
  const gridRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 45] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const gridOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [-100, -100] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const gridScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.4, 0.6] : 
    activeScene === 'blueprint' ? [0.3, 0.5] : 
    activeScene === 'manifesto' ? [0.3, 0.5] : 
    activeScene === 'services' ? [0.3, 0.5] : 
    activeScene === 'projects' ? [0.3, 0.5] : 
    activeScene === 'founder' ? [0.3, 0.5] : 
    activeScene === 'events' ? [0.8, 1.2] : 
    activeScene === 'testimonials' ? [0.3, 0.5] : 
    activeScene === 'finalCTA' ? [0.3, 0.5] : 
    [0.4, 0.6]
  );

  // Urban grid representation (site plan / master plan)
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transform: `
          translateZ(${gridOffsetZ}px)
          rotateY(${gridRotationY}deg)
          scale(${gridScale})
        `,
      }}
    >
      <svg width="500" height="400" viewBox="0 0 500 400">
        {/* Site boundary */}
        <rect 
          x="50" 
          y="50" 
          width="400" 
          height="300" 
          fill="none" 
          stroke="#9BAE40" 
          strokeWidth="0.8"
          strokeDasharray="6,6"
        >
          <animate attributeName="strokeDasharray" 
            values="6,6;8,4;6,6" 
            dur="6s" 
            repeatCount="indefinite" 
          />
        </rect>
        
        {/* Building footprints */}
        <g fill="none" stroke="#9BAE40" strokeWidth="0.6" opacity={0.7}>
          {/* Main building */}
          <rect x="100" y="100" width="80" height="120" />
          <rect x="220" y="80" width="100" height="160" />
          <rect x="350" y="150" width="60" height="90" />
          
          {/* Secondary buildings */}
          <rect x="150" y="250" width="60" height="80" />
          <rect x="280" y="220" width="70" height="100" />
          <rect x="380" y="280" width="50" height="70" />
        </g>
        
        {/* Roads and paths */}
        <g stroke="#9BAE40" strokeWidth="0.4" opacity={0.5}>
          {/* Main access road */}
          <path d="M50,200 L150,200 L150,100 L250,100 L250,200 L350,200" />
          
          {/* Secondary paths */}
          <path d="M100,300 L100,250 L200,250 L200,300" />
          <path d="M300,300 L300,250 L400,250 L400,300" />
        </g>
        
        {/* Landscape elements */}
        <g fill="none" stroke="#9BAE40" strokeWidth="0.3" opacity={0.4}>
          {/* Trees */}
          <circle cx="80" cy="280" r="12" />
          <circle cx="120" cy="280" r="10" />
          <circle cx="160" cy="280" r="14" />
          <circle cx="200" cy="280" r="8" />
          <circle cx="240" cy="280" r="12" />
          <circle cx="280" cy="280" r="10" />
          <circle cx="320" cy="280" r="14" />
          <circle cx="360" cy="280" r="9" />
          <circle cx="420" cy="280" r="11" />
          
          {/* Water feature */}
          <ellipse cx="150" cy="350" rx="40" ry="20" />
        </g>
        
        {/* North arrow */}
        <g transform="translate(450,50)">
          <line x1="0" y1="-20" x2="0" y2="0" stroke="#9BAE40" strokeWidth="0.6" />
          <polygon points="0,-20 -5,0 5,0" fill="#9BAE40" />
          <text x="0" y="10" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#9BAE40">N</text>
        </g>
        
        {/* Scale bar */}
        <g transform="translate(450,350)">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#9BAE40" strokeWidth="0.6" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#9BAE40" strokeWidth="0.6" />
          <line x1="50" y1="-5" x2="50" y2="5" stroke="#9BAE40" strokeWidth="0.6" />
          <text x="25" y="-10" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#9BAE40">10m</text>
        </g>
      </svg>
    </motion.div>
  );
}