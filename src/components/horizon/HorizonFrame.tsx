'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HorizonGrid } from './HorizonGrid';
import { HorizonLight } from './HorizonLight';

interface HorizonFrameProps {
  children: ReactNode;
  className?: string;
  showGrid?: boolean;
  showLight?: boolean;
  horizonLine?: boolean;
  depth?: number;
}

export function HorizonFrame({
  children,
  className = '',
  showGrid = false,
  showLight = true,
  horizonLine = true,
  depth = 0,
}: HorizonFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth * 20, -depth * 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {showLight && <HorizonLight />}
      {showGrid && <HorizonGrid />}
      {horizonLine && (
        <div className="absolute left-0 right-0 top-1/2 h-px bg-eai-line pointer-events-none" />
      )}
      <motion.div style={{ y, opacity }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  );
}
