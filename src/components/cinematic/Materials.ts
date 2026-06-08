'use client';

import * as THREE from 'three';

export const architecturalMaterials = {
  travertine: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C8C0B0'),
    roughness: 0.85,
    metalness: 0.05,
    envMapIntensity: 0.4,
  }),
  
  stone: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1A1916'),
    roughness: 0.9,
    metalness: 0.0,
    envMapIntensity: 0.3,
  }),
  
  brass: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9BAE40'),
    roughness: 0.35,
    metalness: 0.85,
    envMapIntensity: 1.0,
  }),
  
  brassGlow: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DDE7A4'),
    roughness: 0.25,
    metalness: 0.9,
    emissive: new THREE.Color('#9BAE40'),
    emissiveIntensity: 0.4,
    envMapIntensity: 1.2,
  }),
  
  glass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#4A4840'),
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.6,
    thickness: 0.5,
    envMapIntensity: 1.5,
    ior: 1.5,
  }),
  
  concrete: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2C2B27'),
    roughness: 0.95,
    metalness: 0.0,
    envMapIntensity: 0.2,
  }),
  
  wood: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7A7468'),
    roughness: 0.7,
    metalness: 0.0,
    envMapIntensity: 0.5,
  }),
  
  sage: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ADB3B5'),
    roughness: 0.6,
    metalness: 0.1,
    envMapIntensity: 0.4,
  }),
  
  blueprint: new THREE.MeshBasicMaterial({
    color: new THREE.Color('#9BAE40'),
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }),
  
  grid: new THREE.LineBasicMaterial({
    color: new THREE.Color('#9BAE40'),
    transparent: true,
    opacity: 0.08,
  }),
};

export function getMaterial(name: keyof typeof architecturalMaterials): THREE.Material {
  return architecturalMaterials[name].clone();
}