'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonBuildingMassProps {
  /** Building mass opacity */
  opacity?: number;
  /** Whether building mass is animated */
  animated?: boolean;
}

export function HorizonBuildingMass({
  opacity = 0.15,
  animated = true,
}: HorizonBuildingMassProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific building mass transformations
  const massScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.5, 0.8] : 
    activeScene === 'blueprint' ? [0.2, 0.6] : 
    activeScene === 'manifesto' ? [0.3, 0.7] : 
    activeScene === 'services' ? [0.4, 0.9] : 
    activeScene === 'projects' ? [0.6, 1.0] : 
    activeScene === 'founder' ? [0.4, 0.8] : 
    activeScene === 'events' ? [0.8, 1.2] : 
    activeScene === 'testimonials' ? [0.5, 0.9] : 
    activeScene === 'finalCTA' ? [0.7, 1.1] : 
    [0.5, 0.8]
  );
  
  const massRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 30] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const massOffsetX = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [-10, -10] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const massOffsetY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [20, 20] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );

  // Simple building mass representation
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transform: `
          translate3d(${massOffsetX}px, ${massOffsetY}px, -100px)
          rotateY(${massRotationY}deg)
          scale(${massScale})
        `,
      }}
    >
      <svg width="200" height="150" viewBox="0 0 200 150">
        {/* Main building mass */}
        <rect 
          x="25" 
          y="25" 
          width="150" 
          height="100" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="1"
          opacity={0.8}
        >
          <animate attributeName="opacity" 
            values="0.8;0.6;0.8" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </rect>
        
        {/* Building details */}
        <rect 
          x="35" 
          y="35" 
          width="130" 
          height="20" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="0.5"
        />
        
        <rect 
          x="35" 
          y="65" 
          width="130" 
          height="20" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="0.5"
        />
        
        <rect 
          x="35" 
          y="95" 
          width="130" 
          height="20" 
          fill="none" 
          stroke="#B8963C" 
          strokeWidth="0.5"
        />
        
        {/* Windows */}
        <rect x="45" y="45" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="70" y="45" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="95" y="45" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="120" y="45" width="15" height="10" fill="#B8963C" opacity={0.3} />
        
        <rect x="45" y="75" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="70" y="75" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="95" y="75" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="120" y="75" width="15" height="10" fill="#B8963C" opacity={0.3} />
        
        <rect x="45" y="105" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="70" y="105" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="95" y="105" width="15" height="10" fill="#B8963C" opacity={0.3} />
        <rect x="120" y="105" width="15" height="10" fill="#B8963C" opacity={0.3} />
      </svg>
    </motion.div>
  );
}