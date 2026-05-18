'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';

interface HorizonCameraPathProps {
  children: React.ReactNode;
}

export function HorizonCameraPath({ children }: HorizonCameraPathProps) {
  const { activeScene } = useHorizonScene();
  
  // Create smooth camera movement based on scroll progress
  const { scrollYProgress } = useScroll();
  
  // Camera position and rotation based on scroll and active scene
  const cameraZ = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const cameraY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -10, 10, 0]);
  const cameraX = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const cameraRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  // Scene-specific camera adjustments
  const sceneOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [-50, -50] : 
    activeScene === 'manifesto' ? [0, 30] : 
    activeScene === 'services' ? [20, -20] : 
    activeScene === 'projects' ? [-30, 30] : 
    activeScene === 'founder' ? [10, 10] : 
    activeScene === 'events' ? [-40, -40] : 
    activeScene === 'testimonials' ? [0, 20] : 
    activeScene === 'finalCTA' ? [50, -50] : 
    [0, 0]
  );

  const cameraZCombined = useTransform(
    [cameraZ, sceneOffsetZ],
    ([z, offset]) => Number(z) + Number(offset)
  );
  
  return (
    <motion.div
      className="relative w-full h-full"
      style={{
        z: cameraZCombined,
        y: cameraY,
        x: cameraX,
        rotateY: cameraRotateY,
      }}
    >
      {children}
    </motion.div>
  );
}