'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import { editable } from '@theatre/r3f';
import { shotRanges, getCurrentShot, type ShotLabel } from './TheatreBridge';

// Camera keyframes for each shot (position + rotation)
const cameraKeyframes: Record<ShotLabel, { position: [number, number, number]; rotation: [number, number, number] }> = {
  shot_hero_establishing: {
    position: [0, 20, 25],
    rotation: [-Math.PI / 4, 0, 0],
  },
  shot_enter_blueprint: {
    position: [0, 18, 22],
    rotation: [-Math.PI / 3.5, Math.PI / 12, 0],
  },
  shot_blueprint_top_view: {
    position: [0, 14, 18],
    rotation: [-Math.PI / 3, Math.PI / 8, 0],
  },
  shot_foundation_tilt: {
    position: [0, 10, 14],
    rotation: [-Math.PI / 3.5, Math.PI / 6, 0],
  },
  shot_structure_tracking: {
    position: [0, 6, 10],
    rotation: [-Math.PI / 5, Math.PI / 5, 0],
  },
  shot_expertise_architecture: {
    position: [0, 4, 8],
    rotation: [-Math.PI / 6, Math.PI / 6, 0],
  },
  shot_expertise_bim: {
    position: [0, 3.5, 9],
    rotation: [-Math.PI / 7, Math.PI / 5, 0],
  },
  shot_expertise_interior: {
    position: [0, 3, 10],
    rotation: [-Math.PI / 8, Math.PI / 4.5, 0],
  },
  shot_gallery_flythrough: {
    position: [0, 5, 12],
    rotation: [-Math.PI / 8, Math.PI / 4, 0],
  },
  shot_founder_dolly: {
    position: [0, 4.5, 11],
    rotation: [-Math.PI / 8, 0, 0],
  },
  shot_event_crane: {
    position: [0, 6, 14],
    rotation: [-Math.PI / 7, -Math.PI / 12, 0],
  },
  shot_testimonials_pan: {
    position: [0, 8, 18],
    rotation: [-Math.PI / 6, -Math.PI / 10, 0],
  },
  shot_final_pullback: {
    position: [0, 15, 30],
    rotation: [-Math.PI / 5, -Math.PI / 12, 0],
  },
};

// Flatten keyframes into a linear sequence for interpolation
const shotSequence = Object.entries(cameraKeyframes).map(([shot, data]) => ({
  shot: shot as ShotLabel,
  position: new THREE.Vector3(...data.position),
  rotation: new THREE.Euler(...data.rotation),
}));

function lerpVector3(a: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Vector3) {
  out.lerpVectors(a, b, t);
  return out;
}

function lerpEuler(a: THREE.Euler, b: THREE.Euler, t: number, out: THREE.Euler) {
  out.set(
    THREE.MathUtils.lerp(a.x, b.x, t),
    THREE.MathUtils.lerp(a.y, b.y, t),
    THREE.MathUtils.lerp(a.z, b.z, t),
  );
  return out;
}

export function TheatreCameraRig({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const theatreInitialized = useRef(false);
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempRot = useMemo(() => new THREE.Euler(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const { set } = useThree();

  useEffect(() => {
    if (theatreInitialized.current || typeof window === 'undefined') return;
    theatreInitialized.current = true;

    // Initialize Theatre.js project
    const project = getProject('ELAOUAD Cinematic');
    const sheet = project.sheet('Camera Rig');
    
    // Log initialization
    if (process.env.NODE_ENV === 'development') {
      console.log('[Theatre] Camera rig sheet initialized');
    }
  }, []);

  // Set camera as default when mounted
  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  useFrame(() => {
    if (!groupRef.current || !cameraRef.current) return;

    const progress = Math.max(0, Math.min(1, scrollProgress));
    const currentShotLabel = getCurrentShot(progress);
    const shots: readonly ShotLabel[] = Object.keys(shotRanges) as ShotLabel[];
    const shotIndex = shots.indexOf(currentShotLabel);
    
    // Get current shot range
    const [shotStart, shotEnd] = shotRanges[currentShotLabel];
    const shotProgress = shotEnd > shotStart ? (progress - shotStart) / (shotEnd - shotStart) : 0;
    
    // Get current and next keyframe
    const currentKeyframe = shotSequence[shotIndex] ?? shotSequence[0];
    const nextKeyframe = shotSequence[Math.min(shotIndex + 1, shotSequence.length - 1)];
    
    // Smooth interpolation within shot
    const easedProgress = shotProgress * shotProgress * (3 - 2 * shotProgress); // smoothstep
    
    lerpVector3(currentKeyframe.position, nextKeyframe.position, easedProgress, targetPos);
    lerpEuler(currentKeyframe.rotation, nextKeyframe.rotation, easedProgress, targetRot);
    
    // Apply to group (camera parent)
    groupRef.current.position.lerp(targetPos, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.x, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.z, 0.04);
    
    // FOV animation - wider at start, tighter at end
    cameraRef.current.fov = THREE.MathUtils.lerp(50, 30, progress);
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <group ref={groupRef}>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 20, 25]}
        fov={50}
        near={0.1}
        far={100}
      />
    </group>
  );
}

export function TheatreShotIndicator({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const currentShotLabel = getCurrentShot(scrollProgress);
  const shots: readonly ShotLabel[] = Object.keys(shotRanges) as ShotLabel[];
  const shotIndex = shots.indexOf(currentShotLabel);
  const totalShots = shots.length;
  
  return (
    <div className="fixed bottom-24 right-6 z-50 font-mono text-[10px] text-mortar/60 tracking-widest uppercase hidden lg:block">
      <div className="flex items-center gap-2">
        <span className="text-brass">{String(shotIndex + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(totalShots).padStart(2, '0')}</span>
      </div>
      <div className="mt-1 max-w-[120px] truncate opacity-50">
        {currentShotLabel.replace('shot_', '').replace(/_/g, ' ')}
      </div>
    </div>
  );
}
