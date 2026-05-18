'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';
import { architecturalMaterials } from '../cinematic/Materials';

function ModularStructure({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!groupRef.current) return;
    const buildingProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.5));
    groupRef.current.scale.y = THREE.MathUtils.lerp(0, 1, buildingProgress);
  });
  
  const floorPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = -2; x <= 2; x++) {
        positions.push([x * 1.2, y * 0.4 + 0.2, 0]);
      }
    }
    return positions;
  }, []);
  
  const columnPositions = useMemo(() => {
    return [
      [-3, 0, -1.5], [3, 0, -1.5], [-3, 0, 1.5], [3, 0, 1.5],
      [-1.5, 0, -1.5], [1.5, 0, -1.5], [-1.5, 0, 1.5], [1.5, 0, 1.5],
    ] as [number, number, number][];
  }, []);
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core structure - floors rising */}
      {floorPositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.35, 1.1]} />
          <primitive object={architecturalMaterials.concrete} attach="material" />
        </mesh>
      ))}
      
      {/* Structural columns */}
      {columnPositions.map((pos, i) => (
        <mesh key={`col-${i}`} position={[pos[0], 1.6, pos[2]]} castShadow>
          <boxGeometry args={[0.15, 3.2, 0.15]} />
          <primitive object={architecturalMaterials.stone} attach="material" />
        </mesh>
      ))}
      
      {/* Glass facades */}
      <mesh position={[0, 1.6, 1.01]} receiveShadow>
        <planeGeometry args={[7, 3.2]} />
        <primitive object={architecturalMaterials.glass} attach="material" />
      </mesh>
      
      <mesh position={[0, 1.6, -1.01]} receiveShadow>
        <planeGeometry args={[7, 3.2]} />
        <primitive object={architecturalMaterials.glass} attach="material" />
      </mesh>
      
      {/* Side glass panels */}
      <mesh position={[3.51, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4, 3.2]} />
        <primitive object={architecturalMaterials.glass} attach="material" />
      </mesh>
      
      <mesh position={[-3.51, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4, 3.2]} />
        <primitive object={architecturalMaterials.glass} attach="material" />
      </mesh>
      
      {/* Brass accent lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`line-${i}`} position={[0, (i + 1) * 0.4, 1.02]}>
          <boxGeometry args={[6, 0.02, 0.02]} />
          <primitive object={architecturalMaterials.brassGlow} attach="material" />
        </mesh>
      ))}
      
      {/* Travertine base/foundation */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <primitive object={architecturalMaterials.travertine} attach="material" />
      </mesh>
      
      {/* Entrance canopy */}
      <mesh position={[4, 1.2, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 3]} />
        <primitive object={architecturalMaterials.stone} attach="material" />
      </mesh>
      
      {/* Brass entrance detail */}
      <mesh position={[4, 1.3, 1.51]}>
        <planeGeometry args={[1.8, 0.05]} />
        <primitive object={architecturalMaterials.brass} attach="material" />
      </mesh>
      
      {/* Rooftop detail */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <boxGeometry args={[4, 0.15, 2]} />
        <primitive object={architecturalMaterials.concrete} attach="material" />
      </mesh>
      
      {/* Rooftop brass railing */}
      <mesh position={[0, 3.5, 1.01]}>
        <boxGeometry args={[4, 0.03, 0.03]} />
        <primitive object={architecturalMaterials.brass} attach="material" />
      </mesh>
    </group>
  );
}

function BIMOverlay({ visible }: { visible: boolean }) {
  const overlayRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!overlayRef.current) return;
    overlayRef.current.visible = visible;
    overlayRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });
  
  return (
    <group ref={overlayRef} visible={false}>
      {Array.from({ length: 6 }).map((_, floor) => (
        <line key={floor}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={5}
              array={new Float32Array([
                -3, floor * 0.4, 1.5,
                3, floor * 0.4, 1.5,
                3, floor * 0.4, -1.5,
                -3, floor * 0.4, -1.5,
                -3, floor * 0.4, 1.5,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7A9186" opacity={0.6} transparent />
        </line>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                -3 + i * 1.5, 0, 1.5,
                -3 + i * 1.5, 3.2, 1.5,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7A9186" opacity={0.6} transparent />
        </line>
      ))}
    </group>
  );
}

function BlueprintGrid({ progress }: { progress: number }) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!gridRef.current) return;
    gridRef.current.position.z = THREE.MathUtils.lerp(0, -15, progress);
  });
  
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-20, 0, i - 15, 20, 0, i - 15])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C4A052" opacity={0.08} transparent />
        </line>
      );
      lines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([i - 15, 0, -20, i - 15, 0, 20])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C4A052" opacity={0.08} transparent />
        </line>
      );
    }
    return lines;
  }, []);
  
  return <group ref={gridRef}>{gridLines}</group>;
}

function FloorPlan({ progress }: { progress: number }) {
  const planRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!planRef.current) return;
    const planProgress = Math.max(0, Math.min(1, progress / 0.2));
    planRef.current.scale.setScalar(planProgress);
    planRef.current.position.y = THREE.MathUtils.lerp(0.5, 3, planProgress);
  });
  
  return (
    <group ref={planRef} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[6, 4]} />
        <primitive object={architecturalMaterials.blueprint} attach="material" />
      </mesh>
      {/* Floor plan lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                -3 + i * 2, 0.01, -2,
                -3 + i * 2, 0.01, 2,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C4A052" opacity={0.3} transparent />
        </line>
      ))}
    </group>
  );
}

function GalleryPanels({ progress }: { progress: number }) {
  const galleryRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!galleryRef.current) return;
    const galleryProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.3));
    galleryRef.current.position.x = THREE.MathUtils.lerp(-15, 15, galleryProgress);
  });
  
  const panels = useMemo(() => {
    return [
      { position: [-12, 1.5, -3] as [number, number, number], size: [2, 3] as [number, number] },
      { position: [-8, 1.5, -3] as [number, number, number], size: [2.5, 3] as [number, number] },
      { position: [-4, 1.5, -3] as [number, number, number], size: [2, 3] as [number, number] },
      { position: [0, 1.5, -3] as [number, number, number], size: [3, 2] as [number, number] },
      { position: [5, 1.5, -3] as [number, number, number], size: [2, 3] as [number, number] },
      { position: [9, 1.5, -3] as [number, number, number], size: [2.5, 3] as [number, number] },
    ];
  }, []);
  
  return (
    <group ref={galleryRef}>
      {panels.map((panel, i) => (
        <mesh key={i} position={panel.position} castShadow>
          <planeGeometry args={panel.size} />
          <meshStandardMaterial 
            color="#1A1916" 
            roughness={0.8} 
            emissive="#C4A052"
            emissiveIntensity={0.05 * (i % 2 === 0 ? 1 : 0.5)}
          />
        </mesh>
      ))}
    </group>
  );
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#F0EBE0" 
        roughness={0.9} 
        metalness={0.0}
      />
    </mesh>
  );
}

function LandscapeDetails({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!groupRef.current) return;
    const landscapeProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.2));
    groupRef.current.scale.setScalar(landscapeProgress);
  });
  
  const treePositions = useMemo(() => {
    return [
      [-8, 0, 5], [-6, 0, 7], [8, 0, 4], [10, 0, 6],
      [-12, 0, 3], [14, 0, 8], [-5, 0, -6], [7, 0, -5],
    ] as [number, number, number][];
  }, []);
  
  return (
    <group ref={groupRef} scale={0}>
      {/* Trees (simple geometric representations) */}
      {treePositions.map((pos, i) => (
        <group key={`tree-${i}`} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 1.6, 8]} />
            <meshStandardMaterial color="#8B7355" roughness={0.9} />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, 2, 0]} castShadow>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial color="#7A9186" roughness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.15, 3]} receiveShadow>
        <planeGeometry args={[2, 8]} />
        <meshStandardMaterial color="#E8E0D0" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function BlueprintScene({ scrollProgress = 0, useExternalCamera = false }: { scrollProgress?: number | MotionValue<number>, useExternalCamera?: boolean }) {
  const cameraGroup = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const bimRef = useRef(true);
  
  useFrame((state) => {
    if (useExternalCamera) return;
    if (!cameraGroup.current || !cameraRef.current) return;
    
    const progress = typeof scrollProgress === 'number' 
      ? scrollProgress 
      : scrollProgress.get();
    
    // BIM overlay toggle at specific progress point
    bimRef.current = progress > 0.45 && progress < 0.6;
    
    // Camera path based on 13 shots
    const shotProgress = progress;
    
    let targetY: number, targetZ: number, targetRotX: number, targetRotY: number;
    
    if (shotProgress < 0.077) {
      // shot_hero_establishing
      targetY = THREE.MathUtils.lerp(20, 18, shotProgress / 0.077);
      targetZ = 25;
      targetRotX = -Math.PI / 4;
      targetRotY = 0;
    } else if (shotProgress < 0.231) {
      // shot_enter_blueprint to shot_blueprint_top_view
      const p = (shotProgress - 0.077) / 0.154;
      targetY = THREE.MathUtils.lerp(18, 8, p);
      targetZ = THREE.MathUtils.lerp(25, 15, p);
      targetRotX = THREE.MathUtils.lerp(-Math.PI / 4, -Math.PI / 3, p);
      targetRotY = THREE.MathUtils.lerp(0, Math.PI / 8, p);
    } else if (shotProgress < 0.385) {
      // shot_foundation_tilt to shot_structure_tracking
      const p = (shotProgress - 0.231) / 0.154;
      targetY = THREE.MathUtils.lerp(8, 3, p);
      targetZ = THREE.MathUtils.lerp(15, 8, p);
      targetRotX = THREE.MathUtils.lerp(-Math.PI / 3, -Math.PI / 6, p);
      targetRotY = THREE.MathUtils.lerp(Math.PI / 8, Math.PI / 6, p);
    } else if (shotProgress < 0.615) {
      // shot_expertise_* (BIM overlay visible)
      const p = (shotProgress - 0.385) / 0.23;
      targetY = THREE.MathUtils.lerp(3, 5, p);
      targetZ = THREE.MathUtils.lerp(8, 12, p);
      targetRotX = THREE.MathUtils.lerp(-Math.PI / 6, -Math.PI / 8, p);
      targetRotY = THREE.MathUtils.lerp(Math.PI / 6, Math.PI / 4, p);
    } else if (shotProgress < 0.769) {
      // shot_gallery_flythrough to shot_founder_dolly
      const p = (shotProgress - 0.615) / 0.154;
      targetY = THREE.MathUtils.lerp(5, 4, p);
      targetZ = THREE.MathUtils.lerp(12, 10, p);
      targetRotX = -Math.PI / 8;
      targetRotY = THREE.MathUtils.lerp(Math.PI / 4, 0, p);
    } else {
      // shot_event_crane to shot_final_pullback
      const p = (shotProgress - 0.769) / 0.231;
      targetY = THREE.MathUtils.lerp(4, 15, p);
      targetZ = THREE.MathUtils.lerp(10, 30, p);
      targetRotX = THREE.MathUtils.lerp(-Math.PI / 8, -Math.PI / 5, p);
      targetRotY = THREE.MathUtils.lerp(0, -Math.PI / 12, p);
    }
    
    // Smooth interpolation
    cameraGroup.current.position.y = THREE.MathUtils.lerp(cameraGroup.current.position.y, targetY, 0.03);
    cameraGroup.current.position.z = THREE.MathUtils.lerp(cameraGroup.current.position.z, targetZ, 0.03);
    cameraGroup.current.rotation.x = THREE.MathUtils.lerp(cameraGroup.current.rotation.x, targetRotX, 0.03);
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(cameraGroup.current.rotation.y, targetRotY, 0.03);
    
    // FOV animation
    cameraRef.current.fov = THREE.MathUtils.lerp(45, 30, progress);
    cameraRef.current.updateProjectionMatrix();
  });
  
  const progress = typeof scrollProgress === 'number' ? scrollProgress : 0;
  
  return (
    <>
      <color attach="background" args={['#F8F8F7']} />
      <fog attach="fog" args={['#F8F8F7', 8, 60]} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.25} color="#F0EBE0" />
      <directionalLight 
        position={[10, 25, 8]} 
        intensity={0.9} 
        color="#E8C070"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight position={[-8, 8, 5]} intensity={0.4} color="#C4A052" />
      <pointLight position={[8, 4, -5]} intensity={0.3} color="#7A9186" />
      
      {/* Camera rig (only when not using Theatre.js external camera) */}
      {!useExternalCamera && (
        <group ref={cameraGroup}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 20, 25]}
            fov={45}
            near={0.1}
            far={100}
          />
        </group>
      )}
      
      {/* Scene elements */}
      <GroundPlane />
      <BlueprintGrid progress={progress} />
      <FloorPlan progress={progress} />
      <ModularStructure progress={progress} />
      <BIMOverlay visible={bimRef.current} />
      <GalleryPanels progress={progress} />
      <LandscapeDetails progress={progress} />
      
      {/* Environment for reflections */}
      <Environment preset="city" background={false} />
    </>
  );
}
