'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion, animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

export function CountUp({ to, duration = 2, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        onUpdate: (value) => setCount(Math.floor(value)),
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
