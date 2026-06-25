'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useHorizonScene, type SceneState } from './HorizonSceneContext';
import Image from 'next/image';
import { HorizonArchitecturalGrid } from './HorizonArchitecturalGrid';
import { HorizonBuildingMass } from './HorizonBuildingMass';
import { HorizonFacadePlanes } from './HorizonFacadePlanes';
import { HorizonBIMWireframe } from './HorizonBIMWireframe';
import { HorizonUrbanGrid } from './HorizonUrbanGrid';
import { HorizonGalleryPlanes } from './HorizonGalleryPlanes';
import { HorizonMediaPlane } from './HorizonMediaPlane';
import { HorizonBlueprintLines } from './HorizonBlueprintLines';

interface MediaAsset {
  type: 'video' | 'image';
  src: string;
  id: SceneState;
}

const MEDIA_MAPPING: Record<SceneState, MediaAsset> = {
  hero: { type: 'video', src: '/images/Theme/video_2026-05-18_11-48-42.mp4', id: 'hero' },
  plan: { type: 'video', src: '/images/Theme/video_2026-05-18_11-49-02.mp4', id: 'plan' },
  systeme: { type: 'video', src: '/images/Theme/video_2026-05-18_11-49-06.mp4', id: 'systeme' },
  structure: { type: 'image', src: '/images/cinematic/structure-build.png', id: 'structure' },
  espace: { type: 'image', src: '/images/cinematic/hero-space.png', id: 'espace' },
  blueprint: { type: 'video', src: '/images/Theme/video_2026-05-18_11-49-02.mp4', id: 'blueprint' },
  manifesto: { type: 'image', src: '/images/Theme/6bbd7a2c3c2bcf7d5604ad65b0740cba.jpg', id: 'manifesto' },
  services: { type: 'video', src: '/images/Theme/video_2026-05-18_11-49-06.mp4', id: 'services' },
  projects: { type: 'image', src: '/images/Theme/646eb1eee13415c2c806a6ae75b55fc8.jpg', id: 'projects' },
  founder: { type: 'image', src: '/images/Theme/f63ac9a5bd31c230f1bab0abe1b18547.jpg', id: 'founder' },
  events: { type: 'image', src: '/images/Theme/3af6a9b324fcfdbbad169f8d997b2097.jpg', id: 'events' },
  testimonials: { type: 'image', src: '/images/Theme/71b43a758c98457cc90206a261e42c75.jpg', id: 'testimonials' },
  finalCTA: { type: 'image', src: '/images/Theme/86a43d0c1b6358f3b7a6ef3fa20b0c07.jpg', id: 'finalCTA' },
  footer: { type: 'image', src: '/images/Theme/31770824efebbc39d1555b0fe046906f.jpg', id: 'footer' },
};

export function HorizonSceneEngine() {
  const { activeScene, activeService } = useHorizonScene();
  const containerRef = useRef<HTMLDivElement>(null);
   
  // Create highly optimized hardware-accelerated continuous scroll variables
  const { scrollYProgress } = useScroll();
   
  // The camera flies smoothly and continuously through the 3D grid space
  // This completely eliminates any discrete jump/jerk during transitions!
  const cameraScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.15, 1.08]);
  const cameraY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-3%', '-5%']);
  const cameraX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['0%', '1%', '-1%', '0%']);
  const cameraRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, -0.2]);

  // Keep track of active assets to crossfade liquidly
  const [currentAsset, setCurrentAsset] = useState<MediaAsset>(MEDIA_MAPPING.hero);
  const [prevAsset, setPrevAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    const nextAsset = MEDIA_MAPPING[activeScene];
    if (nextAsset.src !== currentAsset.src) {
      setPrevAsset(currentAsset);
      setCurrentAsset(nextAsset);
      
      const timer = setTimeout(() => {
        setPrevAsset(null);
      }, 1500); // 1.5s smooth cross-dissolve duration
      
      return () => clearTimeout(timer);
    }
  }, [activeScene, currentAsset]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-eai-paper select-none"
    >
      {/* Background CAD Grids (Constant, never flashes or transitions) */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-eai-charcoal" />
        <div className="absolute left-[40%] top-0 w-px h-full bg-eai-charcoal" />
        <div className="absolute left-[60%] top-0 w-px h-full bg-eai-charcoal" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-eai-charcoal" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-eai-charcoal" />
        <div className="absolute top-[60%] left-0 w-full h-px bg-eai-charcoal" />
      </div>

      {/* Unified Camera Frame moving continuously keyed to scrolling progress */}
      <motion.div
        className="relative w-full h-full origin-center"
        style={{
          scale: cameraScale,
          x: cameraX,
          y: cameraY,
          rotate: cameraRotate,
        }}
      >
        {/* Previous Asset Dissolving out slowly with cinematic zoom-out and slide-up */}
        {prevAsset && (
          <motion.div 
            className="absolute inset-0 w-full h-full z-10"
            initial={{ opacity: 0.35, scale: 1, y: '0%', rotateX: 0, filter: 'blur(0px)' }}
            animate={{ opacity: 0, scale: 1.05, y: '-4%', rotateX: 2, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {prevAsset.type === 'video' ? (
              <video
                src={prevAsset.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover filter grayscale contrast-[0.9] brightness-[1.02]"
              />
            ) : (
              <Image
                src={prevAsset.src}
                alt="Previous Structural Layer"
                fill
                priority
                className="w-full h-full object-cover filter grayscale contrast-[0.9] brightness-[1.02]"
                sizes="100vw"
              />
            )}
          </motion.div>
        )}

        {/* Current Asset Dissolving in slowly with cinematic slide-in and zoom-in */}
        <motion.div
          key={currentAsset.src}
          className="absolute inset-0 w-full h-full z-20"
          initial={{ opacity: 0, scale: 0.95, y: '4%', rotateX: -2, filter: 'blur(8px)' }}
          animate={{
            opacity: currentAsset.id === 'hero' ? 0.62 : 0.35,
            scale: 1,
            y: '0%',
            rotateX: 0,
            filter: 'blur(0px)',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentAsset.type === 'video' ? (
            <video
              src={currentAsset.src}
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover filter ${
                currentAsset.id === 'hero'
                  ? 'saturate-[1.12] contrast-[1.04] brightness-[1.04]'
                  : 'grayscale mix-blend-multiply contrast-[0.92] brightness-[1.02]'
              }`}
            />
          ) : (
            <Image
              src={currentAsset.src}
              alt="Current Structural Detail"
              fill
              priority
              className="w-full h-full object-cover filter grayscale mix-blend-multiply contrast-[0.92] brightness-[1.02]"
              sizes="100vw"
            />
          )}
        </motion.div>

        {/* Persistent Holographic golden CAD layer */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.06] mix-blend-color-burn">
          <svg width="100%" height="100%" className="w-full h-full">
            {/* Dynamic circle coordinate overlay */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="28%"
              fill="none"
              stroke="#9BAE40"
              strokeWidth="0.8"
              strokeDasharray="4 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="38%"
              fill="none"
              stroke="#9BAE40"
              strokeWidth="0.5"
              strokeDasharray="20 40"
              animate={{ rotate: -360 }}
              transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
            />
            {/* Axis Crosshairs */}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#9BAE40" strokeWidth="0.5" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#9BAE40" strokeWidth="0.5" />
            
            {/* Holographic Text Annotation */}
            <text x="52%" y="49%" fill="#9BAE40" fontSize="10" fontFamily="monospace" letterSpacing="2">
              EAI ENGINE v1.2_
            </text>
            <text x="52%" y="52%" fill="#9BAE40" fontSize="8" fontFamily="monospace" letterSpacing="1">
              SYS_ACTIVE: {activeScene.toUpperCase()}
            </text>
            <text x="52%" y="54%" fill="#9BAE40" fontSize="8" fontFamily="monospace" letterSpacing="1">
              CAM_POS: SWEEPING_AXIS
            </text>
          </svg>
        </div>

        {/* Architectural Scene Layers - These change based on active scene */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          {/* Architectural Grid Layer removed for clean premium visual */}
          {/* <HorizonArchitecturalGrid density={24} opacity={0.08} animated={true} /> */}
          
          {/* Building Mass Layer - Architecture (01) */}
          <HorizonBuildingMass 
            opacity={activeService === '01' ? 0.3 : activeScene === 'hero' ? 0.12 : 0.05} 
            animated={true} 
          />
          
          {/* Facade Planes Layer - Architecture (01) & Engineering (03) */}
          <HorizonFacadePlanes 
            opacity={activeService === '01' ? 0.2 : activeService === '03' ? 0.15 : activeScene === 'projects' ? 0.08 : 0.03} 
            animated={true} 
          />
          
          {/* BIM Wireframe Layer - BIM (02) */}
          <HorizonBIMWireframe 
            opacity={activeService === '02' ? 0.35 : activeScene === 'services' ? 0.06 : 0.02} 
            animated={true} 
          />
          
          {/* Urban Grid Layer - Urbanism (05) */}
          <HorizonUrbanGrid 
            opacity={activeService === '05' ? 0.3 : (activeScene === 'events' || activeScene === 'testimonials') ? 0.04 : 0.01} 
            animated={true} 
          />
          
          {/* Gallery Planes Layer - Interior Design (04) */}
          <HorizonGalleryPlanes 
            opacity={activeService === '04' ? 0.35 : activeScene === 'projects' ? 0.1 : 0.02} 
            animated={true} 
          />
          
          {/* Blueprint Lines Layer - Engineering (03) & Blueprint */}
          <HorizonBlueprintLines 
            opacity={activeService === '03' ? 0.3 : activeScene === 'blueprint' ? 0.2 : activeScene === 'services' ? 0.1 : 0.05} 
            animated={true} 
            style="construction" 
          />
          
          {/* Structural Blueprint Lines */}
          <HorizonBlueprintLines 
            opacity={activeScene === 'manifesto' || activeScene === 'events' ? 0.15 : 0.05} 
            animated={true} 
            style="structural" 
          />
          
          {/* Detail Blueprint Lines */}
          <HorizonBlueprintLines 
            opacity={activeScene === 'founder' || activeScene === 'testimonials' ? 0.1 : 0.05} 
            animated={true} 
            style="details" 
          />
        </div>

        {/* Global Warm Travertine Gradient Overlay to ground the assets into a single structure sheet */}
        <div
          className={`absolute inset-0 z-40 pointer-events-none mix-blend-multiply bg-gradient-to-tr from-eai-parchment via-transparent to-eai-stone-light ${
            activeScene === 'hero' ? 'opacity-[0.10]' : 'opacity-[0.25]'
          }`}
        />
        <div
          className={`absolute inset-0 z-40 pointer-events-none ${
            activeScene === 'hero'
              ? 'bg-gradient-to-t from-eai-paper/62 via-transparent to-eai-paper/18'
              : 'bg-gradient-to-t from-eai-paper via-transparent to-eai-paper/40'
          }`}
        />

        {/* Sweeping Technical Laser Line - travels slowly down the screen to distract the eye during dissolves */}
        <motion.div
          className="absolute left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-eai-brass/35 to-transparent shadow-[0_0_12px_rgba(155,174,64,0.5)]"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Scale markers on the border */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="absolute left-6 top-1/4 bottom-1/4 w-4 border-l border-y border-eai-brass/15 flex flex-col justify-between py-2 text-[8px] font-mono text-eai-brass/40">
            <span>+100m</span>
            <span>+50m</span>
            <span>0.00m</span>
            <span>-50m</span>
            <span>-100m</span>
          </div>

          {/* Dynamic Horizon Line Indicator */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-eai-brass/20 to-transparent flex items-center justify-between px-16">
            <span className="text-[8px] font-mono text-eai-brass/40 uppercase tracking-widest -mt-4">
              HORIZON AXIS
            </span>
            <span className="text-[8px] font-mono text-eai-brass/40 uppercase tracking-widest -mt-4">
              EL. 0.00
            </span>
          </div>

          {/* Global Paper Grain / Fine Noise Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#191816_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.015] mix-blend-overlay" />
        </div>
      </motion.div>
    </div>
  );
}
