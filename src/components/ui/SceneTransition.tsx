'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SceneTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function SceneTransition({ children, className = '' }: SceneTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // Reveal clip-path from bottom
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div style={{ clipPath }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
