'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function RevealOnScroll({ 
  children, 
  delay = 0, 
  once = true,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
