'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, PerspectiveCamera, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function CameraRig() {
  const cameraGroup = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Temporary geometry for the camera prototype
  const boxes = Array.from({ length: 13 }, (_, i) => ({
    position: [Math.sin(i) * 5, i * -2, Math.cos(i) * 5] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
  }));

  useFrame((state, delta) => {
    if (!cameraGroup.current) return;
    
    // The scroll offset goes from 0 to 1 over the scroll area
    const offset = scroll.offset;
    
    // Animate camera position based on scroll to simulate the 13-shot journey
    // Prototype animation for the camera rig
    cameraGroup.current.position.y = THREE.MathUtils.lerp(
      cameraGroup.current.position.y,
      -offset * 24, // Moves down through the 13 boxes
      0.1
    );
    
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroup.current.rotation.y,
      offset * Math.PI * 2,
      0.05
    );
  });

  return (
    <>
      <color attach="background" args={['#F8F8F7']} />
      <ambientLight intensity={1.0} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
      <Environment preset="apartment" />

      <group ref={cameraGroup}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      </group>

      {/* Architectural prototype elements */}
      {boxes.map((props, i) => (
        <mesh key={i} position={props.position} rotation={props.rotation} castShadow receiveShadow>
          <boxGeometry args={[2, 3, 0.5]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.01}
            anisotropy={0.1}
            distortion={0.05}
            distortionScale={0.1}
            temporalDistortion={0.0}
            color="#FFFFFF" 
            transmission={1}
          />
        </mesh>
      ))}
      
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -26, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#F4F2EE" />
      </mesh>
    </>
  );
}
