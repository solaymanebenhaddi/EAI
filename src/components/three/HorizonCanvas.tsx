'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    locations: number[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    mountains: [],
    locations: [],
    animationId: null
  });

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const refs = threeRefs.current;
    
    // Scene setup
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x080806, 0.00025);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.z = 300;
    refs.camera.position.y = 30;

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    // 1. Dynamic Particles Starfield
    const starCount = 2000;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        // Ivory and brass colored stars
        const color = new THREE.Color();
        const colorChoice = Math.random();
        if (colorChoice < 0.6) {
          color.setHex(0xF8F5EE); // Ivory
        } else if (colorChoice < 0.9) {
          color.setHex(0xC5A880); // Gold/Brass
        } else {
          color.setHex(0x68645C); // Travertine
        }
        
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;

        sizes[j] = Math.random() * 2.5 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          depth: { value: i }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            
            float angle = time * 0.02 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const starsPoints = new THREE.Points(geometry, material);
      refs.scene.add(starsPoints);
      refs.stars.push(starsPoints);
    }

    // 2. Custom Gold/Brass Nebula Shader
    const nebulaGeometry = new THREE.PlaneGeometry(8000, 4000, 30, 30);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xC5A880) }, // Brushed Gold/Brass
        color2: { value: new THREE.Color(0x080806) }, // Deep Obsidian Black
        opacity: { value: 0.15 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float elevation = sin(pos.x * 0.005 + time) * cos(pos.y * 0.005 + time) * 30.0;
          pos.z += elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          float mixFactor = sin(vUv.x * 5.0 + time * 0.2) * cos(vUv.y * 5.0 + time * 0.2);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.005;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    refs.nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    refs.nebula.position.z = -800;
    refs.scene.add(refs.nebula);

    // 3. Travertine & Brass Mountain Parallax Layers
    const layers = [
      { distance: -100, height: 40, color: 0x181816, opacity: 1 },
      { distance: -200, height: 60, color: 0x1E1E1C, opacity: 0.8 },
      { distance: -300, height: 80, color: 0x252522, opacity: 0.6 },
      { distance: -400, height: 100, color: 0x2E2E2A, opacity: 0.4 }
    ];

    layers.forEach((layer, index) => {
      const points = [];
      const segments = 40;
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 2400;
        const y = Math.sin(i * 0.15) * layer.height + 
                 Math.sin(i * 0.07) * layer.height * 0.5 +
                 Math.random() * layer.height * 0.1 - 120;
        points.push(new THREE.Vector2(x, y));
      }
      
      points.push(new THREE.Vector2(1200, -600));
      points.push(new THREE.Vector2(-1200, -600));

      const shape = new THREE.Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide
      });

      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance * 0.3;
      if (refs.scene) {
        refs.scene.add(mountain);
      }
      refs.mountains.push(mountain);
      refs.locations.push(layer.distance);
    });

    // 4. Easing animation loop
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.0005;

      // Rotate stars points
      refs.stars.forEach((starField) => {
        const shaderMaterial = starField.material as THREE.ShaderMaterial;
        if (shaderMaterial && shaderMaterial.uniforms) {
          shaderMaterial.uniforms.time.value = time;
        }
      });

      // Animate nebula
      if (refs.nebula) {
        const shaderMaterial = refs.nebula.material as THREE.ShaderMaterial;
        if (shaderMaterial && shaderMaterial.uniforms) {
          shaderMaterial.uniforms.time.value = time * 0.3;
        }
      }

      // Smooth camera interpolation
      if (refs.camera) {
        const targetX = refs.targetCameraX ?? 0;
        const targetY = refs.targetCameraY ?? 30;
        const targetZ = refs.targetCameraZ ?? 300;

        smoothCameraPos.current.x += (targetX - smoothCameraPos.current.x) * 0.05;
        smoothCameraPos.current.y += (targetY - smoothCameraPos.current.y) * 0.05;
        smoothCameraPos.current.z += (targetZ - smoothCameraPos.current.z) * 0.05;

        // Soft orbital floating motion
        const floatX = Math.sin(time * 0.2) * 4;
        const floatY = Math.cos(time * 0.3) * 2;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, -50, -400);
      }

      // Parallax mountain breathing animation
      refs.mountains.forEach((mountain, i) => {
        const factor = 1 + i * 0.3;
        mountain.position.x = Math.sin(time * 0.1) * 3 * factor;
        mountain.position.y = (refs.locations[i] * 0.3) + (Math.cos(time * 0.15) * 1.5 * factor);
      });

      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    animate();

    // Scroll trigger synchronization
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);

      // Camera positions corresponding to scroll depth
      refs.targetCameraX = 0;
      refs.targetCameraY = 30 + progress * 20;
      refs.targetCameraZ = 300 - progress * 320; // Dive deeply into space
    };

    window.addEventListener('scroll', handleScroll);
    
    // Resize handling
    const handleResize = () => {
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (refs.animationId) cancelAnimationFrame(refs.animationId);

      // Dispose webgl context
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });
      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-void" />
    </div>
  );
}

export default HorizonCanvas;
