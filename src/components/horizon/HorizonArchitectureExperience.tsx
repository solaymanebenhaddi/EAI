'use client';

import { ReactNode } from 'react';
import { HorizonSceneProvider } from './HorizonSceneContext';
import { HorizonSceneEngine } from './HorizonSceneEngine';

interface HorizonArchitectureExperienceProps {
  children: ReactNode;
}

export function HorizonArchitectureExperience({ children }: HorizonArchitectureExperienceProps) {
  return (
    <HorizonSceneProvider>
      <div className="relative bg-eai-paper text-eai-charcoal min-h-screen w-full">
        {/* Continuous cinematic architectural backdrop */}
        <HorizonSceneEngine />

        {/* Foreground scrollable content layers */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </HorizonSceneProvider>
  );
}
