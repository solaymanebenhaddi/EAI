'use client';

import { Canvas } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import { BlueprintScene } from '../three/BlueprintScene';
import { TheatreCameraRig, TheatreShotIndicator } from '../cinematic/TheatreSceneController';

export default function CinematicDesktop({ scrollProgress = 0 }: { scrollProgress?: number | MotionValue<number> }) {
  const progress = typeof scrollProgress === 'number' ? scrollProgress : 0;
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <TheatreCameraRig scrollProgress={progress} />
        <BlueprintScene scrollProgress={scrollProgress} useExternalCamera />
      </Canvas>
      {/* Subtle overlay to help text readability */}
      <div className="absolute inset-0 bg-lumen/10 backdrop-blur-[2px]" />
      <TheatreShotIndicator scrollProgress={progress} />
    </div>
  );
}
