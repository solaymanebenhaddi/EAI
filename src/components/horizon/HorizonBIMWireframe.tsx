'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonBIMWireframeProps {
  /** Wireframe opacity */
  opacity?: number;
  /** Whether wireframe is animated */
  animated?: boolean;
}

export function HorizonBIMWireframe({
  opacity = 0.08,
  animated = true,
}: HorizonBIMWireframeProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific BIM wireframe transformations
  const wireframeRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 30] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const wireframeOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [-30, -30] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const wireframeScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.6, 0.8] : 
    activeScene === 'blueprint' ? [0.8, 1.2] : 
    activeScene === 'manifesto' ? [0.7, 1.0] : 
    activeScene === 'services' ? [0.5, 0.7] : 
    activeScene === 'projects' ? [0.6, 0.9] : 
    activeScene === 'founder' ? [0.6, 0.9] : 
    activeScene === 'events' ? [0.4, 0.6] : 
    activeScene === 'testimonials' ? [0.5, 0.8] : 
    activeScene === 'finalCTA' ? [0.7, 1.0] : 
    [0.6, 0.8]
  );

  // BIM wireframe representation
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transform: `
          translateZ(${wireframeOffsetZ}px)
          rotateY(${wireframeRotationY}deg)
          scale(${wireframeScale})
        `,
      }}
    >
      <svg width="400" height="300" viewBox="0 0 400 300">
        {/* Main building outline */}
        <rect 
          x="50" 
          y="50" 
          width="300" 
          height="200" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="0.5"
          strokeDasharray="4,4"
        >
          <animate attributeName="strokeDasharray" 
            values="4,4;8,2;4,4" 
            dur="5s" 
            repeatCount="indefinite" 
          />
        </rect>
        
        {/* Structural grid */}
        <g stroke="#B8963C" strokeWidth="0.3" opacity={0.6}>
          {/* Vertical structural lines */}
          <line x1="100" y1="50" x2="100" y2="250" />
          <line x1="150" y1="50" x2="150" y2="250" />
          <line x1="200" y1="50" x2="200" y2="250" />
          <line x1="250" y1="50" x2="250" y2="250" />
          
          {/* Horizontal structural lines */}
          <line x1="50" y1="100" x2="350" y2="100" />
          <line x1="50" y1="150" x2="350" y2="150" />
          <line x1="50" y1="200" x2="350" y2="200" />
        </g>
        
        {/* Floor plates */}
        <g stroke="#B8963C" strokeWidth="0.2" opacity={0.4}>
          <rect x="60" y="80" width="280" height="10" fill="none" />
          <rect x="60" y="130" width="280" height="10" fill="none" />
          <rect x="60" y="180" width="280" height="10" fill="none" />
        </g>
        
        {/* Core and services */}
        <rect 
          x="180" 
          y="60" 
          width="40" 
          height="180" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="0.4"
          strokeDasharray="2,4"
        />
      </svg>
    </motion.div>
  );
}