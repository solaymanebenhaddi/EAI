'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Camera tilt effect: how much rotateX changes on scroll (degrees) */
  tiltIntensity?: number;
  /** Camera zoom: scale from this value to 1 as section enters */
  zoomFrom?: number;
  /** Camera pan direction */
  panDirection?: 'left' | 'right' | 'none';
  /** Pan intensity in px */
  panIntensity?: number;
  /** Whether to apply a depth-of-field blur effect on entry */
  depthOfField?: boolean;
  /** Perspective distance in px */
  perspective?: number;
}

export function CinematicSection({
  children,
  className = '',
  tiltIntensity = 4,
  zoomFrom = 0.92,
  panDirection = 'none',
  panIntensity = 60,
  depthOfField = true,
  perspective = 1200,
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Camera tilt: rotateX from tiltIntensity to 0 to -tiltIntensity
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [tiltIntensity, 0, 0, -tiltIntensity]);

  // Camera zoom: scale up as section enters view
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [zoomFrom, 1, 1, zoomFrom]);

  // Camera pan: horizontal shift
  const panX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    panDirection === 'left'
      ? [panIntensity, 0, -panIntensity]
      : panDirection === 'right'
      ? [-panIntensity, 0, panIntensity]
      : [0, 0, 0]
  );

  // Depth of field: slight blur on entry/exit
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [4, 0, 0, 4]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  // Opacity fade
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: `${perspective}px`, perspectiveOrigin: '50% 50%' }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          x: panX,
          opacity,
          filter: depthOfField ? filterBlur : undefined,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
