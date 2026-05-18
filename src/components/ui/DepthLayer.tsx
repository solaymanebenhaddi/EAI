'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DepthLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Z-depth in px (positive = closer to camera, negative = further) */
  depth?: number;
  /** Additional scroll-driven Y offset */
  scrollSpeed?: number;
}

/**
 * Places children at a specific Z-depth within a perspective container.
 * Combined with CinematicSection, this creates true 3D layering
 * where elements at different depths move at different visual speeds.
 */
export function DepthLayer({
  children,
  className = '',
  depth = 0,
  scrollSpeed = 0,
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [scrollSpeed * 100, -scrollSpeed * 100]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        translateZ: depth,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
