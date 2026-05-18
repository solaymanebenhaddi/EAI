'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const thresholds = [25, 50, 75, 100];

export function ScrollDepthTracker() {
  const tracked = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }

      const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      const threshold = thresholds.find((item) => depth >= item && !tracked.current.has(item));

      if (threshold) {
        tracked.current.add(threshold);
        trackEvent('scroll_depth', { depth: threshold });
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
