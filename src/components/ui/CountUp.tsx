'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

export function CountUp({ to, duration = 2, suffix = '' }: CountUpProps) {
  // Initialize with `to` to guarantee the value is present in HTML/SSR
  const [count, setCount] = useState(to);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Reset to 0 only once JS loads and is ready to animate
    if (!hasAnimated) {
      setCount(0);
    }
  }, [hasAnimated]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const controls = animate(0, to, {
        duration,
        onUpdate: (value) => setCount(Math.floor(value)),
        onComplete: () => setHasAnimated(true),
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
