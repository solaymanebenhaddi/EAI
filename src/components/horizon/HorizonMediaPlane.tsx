'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface HorizonMediaPlaneProps {
  /** Media type: 'image' or 'video' */
  type: 'image' | 'video';
  /** Media source URL */
  src: string;
  /** Media opacity */
  opacity?: number;
  /** Whether media is animated */
  animated?: boolean;
  /** Z-index position */
  zIndex?: number;
}

export function HorizonMediaPlane({
  type,
  src,
  opacity = 0.5,
  animated = true,
  zIndex = 0,
}: HorizonMediaPlaneProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific media plane transformations
  const planeRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planeOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const planeScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.8, 1.0] : 
    activeScene === 'blueprint' ? [0.6, 0.9] : 
    activeScene === 'manifesto' ? [0.7, 1.0] : 
    activeScene === 'services' ? [0.7, 1.0] : 
    activeScene === 'projects' ? [0.9, 1.2] : 
    activeScene === 'founder' ? [0.8, 1.0] : 
    activeScene === 'events' ? [1.0, 1.3] : 
    activeScene === 'testimonials' ? [0.8, 1.1] : 
    activeScene === 'finalCTA' ? [0.9, 1.2] : 
    [0.8, 1.0]
  );
  
  const planeOffsetX = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 pointer-events-none z-[${zIndex}]`}
      style={{
        opacity,
        transform: `
          translateZ(${planeOffsetZ}px)
          translateX(${planeOffsetX}px)
          rotateY(${planeRotationY}deg)
          scale(${planeScale})
        `,
      }}
    >
      {type === 'video' ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{
            opacity: isInView && animated ? 1 : 0.7,
            filter: isInView && animated ? 'grayscale(0)' : 'grayscale(0.2)',
          }}
        />
      ) : (
        <Image
          src={src}
          alt="Architectural Media"
          fill
          priority
          className="w-full h-full object-cover"
          style={{
            opacity: isInView && animated ? 1 : 0.7,
            filter: isInView && animated ? 'grayscale(0)' : 'grayscale(0.2)',
          }}
        />
      )}
    </motion.div>
  );
}