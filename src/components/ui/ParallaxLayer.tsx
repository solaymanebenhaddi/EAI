'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 1.0
  className?: string;
  direction?: 'up' | 'down' | 'horizontal';
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up' 
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = speed * 400; // Increased range for more dramatic movement
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [range, -range] : direction === 'down' ? [-range, range] : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? [range, -range] : [0, 0]
  );

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
}
