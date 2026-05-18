'use client';

import dynamic from 'next/dynamic';
import { MotionValue } from 'framer-motion';
import { useCinematicMode } from '@/hooks/useCinematicMode';

const CinematicDesktop = dynamic(() => import('./CinematicDesktop'), { ssr: false });
const CinematicMobile = dynamic(() => import('./CinematicMobile'), { ssr: false });

export function CinematicJourney({ 
  mode = 'default',
  scrollProgress = 0 
}: { 
  mode?: 'default' | 'background',
  scrollProgress?: number | MotionValue<number>
}) {
  const { isCinematicCapable, isInitialized } = useCinematicMode();

  if (!isInitialized) {
    return <div className="fixed inset-0 bg-mist z-0" />;
  }

  return (
    <div className={mode === 'background' ? 'fixed inset-0 z-0 pointer-events-none' : ''}>
      {isCinematicCapable ? <CinematicDesktop scrollProgress={scrollProgress} /> : <CinematicMobile />}
    </div>
  );
}
