'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function ArchitecturalModel() {
  const columnsCount = 100;
  const slabsCount = 10;
  
  const columnsRef = useRef<THREE.InstancedMesh>(null);
  const slabsRef = useRef<THREE.InstancedMesh>(null);

  // Generate instances for columns
  const columnMatrix = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices = new Float32Array(columnsCount * 16);
    let i = 0;
    
    // Grid of columns
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        for (let y = 0; y < 4; y++) {
          if (i >= columnsCount) break;
          dummy.position.set(x * 3, y * 4, z * 3);
          dummy.scale.set(0.4, 4, 0.4);
          dummy.updateMatrix();
          dummy.matrix.toArray(matrices, i * 16);
          i++;
        }
      }
    }
    return matrices;
  }, [columnsCount]);

  // Generate instances for slabs
  const slabMatrix = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices = new Float32Array(slabsCount * 16);
    
    for (let y = 0; y < slabsCount; y++) {
      dummy.position.set(0, y * 4 + 2, 0);
      dummy.scale.set(16, 0.2, 16);
      dummy.updateMatrix();
      dummy.matrix.toArray(matrices, y * 16);
    }
    return matrices;
  }, [slabsCount]);

  // Gentle floating animation
  useFrame((state) => {
    if (columnsRef.current && slabsRef.current) {
      const t = state.clock.getElapsedTime();
      columnsRef.current.position.y = Math.sin(t * 0.2) * 0.1;
      slabsRef.current.position.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group position={[0, -5, -5]}>
      <instancedMesh ref={columnsRef} args={[undefined, undefined, columnsCount]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-instanceMatrix" args={[columnMatrix, 16]} />
        </boxGeometry>
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
      </instancedMesh>
      
      <instancedMesh ref={slabsRef} args={[undefined, undefined, slabsCount]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-instanceMatrix" args={[slabMatrix, 16]} />
        </boxGeometry>
        <meshStandardMaterial color="#E5E4E2" roughness={0.5} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}
