'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type SceneState =
  | 'hero'
  | 'blueprint'
  | 'manifesto'
  | 'services'
  | 'projects'
  | 'founder'
  | 'events'
  | 'testimonials'
  | 'finalCTA'
  | 'footer';

interface HorizonSceneContextType {
  activeScene: SceneState;
  setActiveScene: (scene: SceneState) => void;
  registerScene: (scene: SceneState, ratio: number) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  activeService: string | null;
  setActiveService: (serviceId: string | null) => void;
}

const HorizonSceneContext = createContext<HorizonSceneContextType | undefined>(undefined);

export function HorizonSceneProvider({ children }: { children: React.ReactNode }) {
  const [activeScene, setActiveSceneState] = useState<SceneState>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeService, setActiveService] = useState<string | null>(null);
   
  // Use a mutable ref for intersection ratios to completely prevent state re-renders during active scrolling!
  const sceneRatiosRef = useRef<Record<SceneState, number>>({
    hero: 0,
    blueprint: 0,
    manifesto: 0,
    services: 0,
    projects: 0,
    founder: 0,
    events: 0,
    testimonials: 0,
    finalCTA: 0,
    footer: 0,
  });
  
  const activeSceneRef = useRef<SceneState>('hero');

  const setActiveScene = useCallback((scene: SceneState) => {
    activeSceneRef.current = scene;
    setActiveSceneState(scene);
  }, []);

  const registerScene = useCallback((scene: SceneState, ratio: number) => {
    sceneRatiosRef.current[scene] = ratio;
    
    // Determine the scene with the largest visible surface area
    let dominantScene = activeSceneRef.current;
    let maxRatio = 0;

    Object.entries(sceneRatiosRef.current).forEach(([key, val]) => {
      if (val > maxRatio) {
        maxRatio = val;
        dominantScene = key as SceneState;
      }
    });

    // Only update state if the dominant section actually crosses the boundary!
    if (maxRatio > 0.05 && dominantScene !== activeSceneRef.current) {
      activeSceneRef.current = dominantScene;
      setActiveSceneState(dominantScene);
    }
  }, []);

  return (
    <HorizonSceneContext.Provider
      value={{
        activeScene,
        setActiveScene,
        registerScene,
        scrollProgress,
        setScrollProgress,
        activeService,
        setActiveService,
      }}
    >
      {children}
    </HorizonSceneContext.Provider>
  );
}

export function useHorizonScene() {
  const context = useContext(HorizonSceneContext);
  if (!context) {
    // Fallback for subpages that use these components without the global 3D engine provider
    return {
      activeScene: 'hero',
      setActiveScene: () => {},
      registerScene: () => {},
      scrollProgress: 0,
      setScrollProgress: () => {},
      activeService: null,
      setActiveService: () => {},
    } as HorizonSceneContextType;
  }
  return context;
}