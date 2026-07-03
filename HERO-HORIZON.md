Done — use this as a **full replacement** for the uploaded `HeroSection.jsx`. It removes the mountain system and replaces it with a **layered cinematic city skyline**, warm haze, building depth, lit windows, cleaner scroll logic, and proper cleanup. 

```jsx
'use client';

// HeroSection.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const randFloat = (min, max, seed) => {
  return min + seededRandom(seed) * (max - min);
};

const splitTitle = (text) => {
  return text.split('').map((char, index) => (
    <span key={`${char}-${index}`} className="title-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

export const Component = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const menuRef = useRef(null);
  const progressWrapperRef = useRef(null);
  const progressFillRef = useRef(null);

  const activeIndexRef = useRef(0);

  const targetCamera = useRef({ x: -30, y: 58, z: 260 });
  const smoothCamera = useRef({ x: -30, y: 58, z: 260 });

  const targetLookAt = useRef({ x: -10, y: 46, z: -520 });
  const smoothLookAt = useRef({ x: -10, y: 46, z: -520 });

  const [isReady, setIsReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = useMemo(
    () => [
      {
        title: 'HORIZON',
        subtitle: [
          'From line to skyline,',
          'we transform vision into structure'
        ],
        camera: { x: -30, y: 58, z: 260 },
        lookAt: { x: -10, y: 46, z: -520 }
      },
      {
        title: 'STRUCTURE',
        subtitle: [
          'Every plan becomes a system,',
          'every system becomes a space'
        ],
        camera: { x: 34, y: 74, z: 20 },
        lookAt: { x: 4, y: 62, z: -680 }
      },
      {
        title: 'TRUST',
        subtitle: [
          'Built with precision,',
          'designed to stand with confidence'
        ],
        camera: { x: 0, y: 92, z: -520 },
        lookAt: { x: 0, y: 82, z: -980 }
      }
    ],
    []
  );

  const activeSection = sections[activeIndex];

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    bloomPass: null,
    cityLayers: [],
    particles: null,
    hazePlane: null,
    atmosphere: null,
    sunGlow: null,
    scrollTrigger: null,
    animationId: null
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const refs = threeRefs.current;
    const clock = new THREE.Clock();

    const isMobile = () => window.innerWidth < 768;

    const initThree = () => {
      refs.scene = new THREE.Scene();
      refs.scene.background = new THREE.Color(0xe9dfc9);
      refs.scene.fog = new THREE.FogExp2(0xe9dfc9, 0.00105);

      refs.camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );

      refs.camera.position.set(
        smoothCamera.current.x,
        smoothCamera.current.y,
        smoothCamera.current.z
      );

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: !isMobile(),
        alpha: false,
        powerPreference: 'high-performance'
      });

      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.72;

      if ('outputColorSpace' in refs.renderer) {
        refs.renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      refs.composer = new EffectComposer(refs.renderer);

      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      refs.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        isMobile() ? 0.22 : 0.34,
        0.32,
        0.86
      );

      refs.composer.addPass(refs.bloomPass);

      createLighting();
      createAtmosphere();
      createHazePlane();
      createSunGlow();
      createCitySkyline();
      createAtmosphericParticles();

      updateFromScroll(0);
      createScrollTrigger();

      setIsReady(true);
      animate();
    };

    const createLighting = () => {
      const ambient = new THREE.AmbientLight(0xf5e4c8, 1.15);
      refs.scene.add(ambient);

      const sunKey = new THREE.DirectionalLight(0xffddb3, 1.5);
      sunKey.position.set(260, 240, 180);
      refs.scene.add(sunKey);

      const coolFill = new THREE.DirectionalLight(0x9fb6c6, 0.45);
      coolFill.position.set(-220, 80, 120);
      refs.scene.add(coolFill);

      const backRim = new THREE.DirectionalLight(0xffc17f, 0.65);
      backRim.position.set(100, 120, -500);
      refs.scene.add(backRim);
    };

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(1100, 32, 32);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          colorA: { value: new THREE.Color(0xffe3b6) },
          colorB: { value: new THREE.Color(0x6d8794) }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 colorA;
          uniform vec3 colorB;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            float horizon = smoothstep(-0.2, 0.9, vNormal.y);
            float rim = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 color = mix(colorB, colorA, horizon);
            float pulse = sin(time * 0.35) * 0.04 + 0.96;
            gl_FragColor = vec4(color, rim * 0.18 * pulse);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });

      refs.atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.atmosphere);
    };

    const createHazePlane = () => {
      const geometry = new THREE.PlaneGeometry(2400, 1200, 32, 32);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          opacity: { value: 0.2 },
          warm: { value: new THREE.Color(0xf3ddaf) },
          cool: { value: new THREE.Color(0x7b8d92) }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 0.004 + time * 0.25) * 8.0;
            pos.z += cos(pos.y * 0.004 + time * 0.18) * 6.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float opacity;
          uniform vec3 warm;
          uniform vec3 cool;

          void main() {
            float vertical = smoothstep(0.0, 1.0, vUv.y);
            float centerFade = 1.0 - smoothstep(0.25, 0.82, distance(vUv, vec2(0.52, 0.48)));
            vec3 color = mix(cool, warm, vertical);
            float alpha = opacity * centerFade * (0.55 + vertical * 0.45);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      refs.hazePlane = new THREE.Mesh(geometry, material);
      refs.hazePlane.position.set(0, 130, -930);
      refs.scene.add(refs.hazePlane);
    };

    const createSunGlow = () => {
      const geometry = new THREE.PlaneGeometry(760, 760);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          opacity: { value: 0.32 },
          color: { value: new THREE.Color(0xffdd9b) }
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float opacity;
          uniform vec3 color;

          void main() {
            float d = distance(vUv, vec2(0.5));
            float core = smoothstep(0.52, 0.0, d);
            float halo = smoothstep(0.72, 0.0, d) * 0.45;
            float alpha = (core + halo) * opacity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      refs.sunGlow = new THREE.Mesh(geometry, material);
      refs.sunGlow.position.set(180, 185, -1020);
      refs.scene.add(refs.sunGlow);
    };

    const createCitySkyline = () => {
      const layers = [
        {
          z: -70,
          count: 7,
          width: 950,
          minH: 260,
          maxH: 640,
          minW: 58,
          maxW: 120,
          depth: [44, 80],
          color: 0x101922,
          opacity: 1,
          windowOpacity: 0.86,
          windowChance: 0.2
        },
        {
          z: -210,
          count: 11,
          width: 1250,
          minH: 190,
          maxH: 500,
          minW: 42,
          maxW: 92,
          depth: [32, 60],
          color: 0x1b2933,
          opacity: 0.86,
          windowOpacity: 0.66,
          windowChance: 0.14
        },
        {
          z: -390,
          count: 15,
          width: 1500,
          minH: 120,
          maxH: 360,
          minW: 30,
          maxW: 72,
          depth: [24, 44],
          color: 0x344651,
          opacity: 0.62,
          windowOpacity: 0.42,
          windowChance: 0.08
        },
        {
          z: -590,
          count: 19,
          width: 1750,
          minH: 80,
          maxH: 250,
          minW: 24,
          maxW: 58,
          depth: [18, 34],
          color: 0x66747b,
          opacity: 0.38,
          windowOpacity: 0.26,
          windowChance: 0.04
        },
        {
          z: -780,
          count: 24,
          width: 2000,
          minH: 50,
          maxH: 170,
          minW: 18,
          maxW: 44,
          depth: [12, 26],
          color: 0x9a9d95,
          opacity: 0.22,
          windowOpacity: 0.16,
          windowChance: 0.025
        }
      ];

      layers.forEach((layer, layerIndex) => {
        const group = new THREE.Group();
        group.position.z = layer.z;

        group.userData = {
          baseZ: layer.z,
          targetZ: layer.z,
          targetX: 0,
          layerIndex
        };

        const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
        const buildingMaterial = new THREE.MeshStandardMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          roughness: 0.96,
          metalness: 0.04
        });

        const roofMaterial = new THREE.MeshStandardMaterial({
          color: layer.color,
          transparent: true,
          opacity: Math.min(1, layer.opacity + 0.08),
          roughness: 0.95,
          metalness: 0.05
        });

        const windowGeometry = new THREE.PlaneGeometry(3.4, 5.4);
        const windowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd9a1,
          transparent: true,
          opacity: layer.windowOpacity,
          depthWrite: false,
          side: THREE.DoubleSide
        });

        const maxWindowInstances = Math.max(1, layer.count * 280);
        const windowMesh = new THREE.InstancedMesh(
          windowGeometry,
          windowMaterial,
          maxWindowInstances
        );

        windowMesh.frustumCulled = false;

        let windowIndex = 0;
        const spacing = layer.width / layer.count;

        for (let i = 0; i < layer.count; i++) {
          const seed = 1000 + layerIndex * 300 + i * 17;

          let width = randFloat(layer.minW, layer.maxW, seed + 1);
          let height = randFloat(layer.minH, layer.maxH, seed + 2);
          let depth = randFloat(layer.depth[0], layer.depth[1], seed + 3);

          if (layerIndex === 0 && i === 2) {
            width = 118;
            height = 660;
            depth = 78;
          }

          if (layerIndex === 0 && i === 4) {
            width = 92;
            height = 500;
            depth = 68;
          }

          const xBase = -layer.width / 2 + spacing * i + spacing / 2;
          const xJitter = randFloat(-spacing * 0.24, spacing * 0.24, seed + 4);
          const yBase = -210;

          const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
          building.scale.set(width, height, depth);
          building.position.set(
            xBase + xJitter,
            yBase + height / 2,
            randFloat(-18, 18, seed + 5)
          );

          building.userData = {
            height,
            width,
            depth,
            seed
          };

          group.add(building);

          if (layerIndex <= 1) {
            const rooftopCount = layerIndex === 0 ? 3 : 2;

            for (let r = 0; r < rooftopCount; r++) {
              const roofBox = new THREE.Mesh(buildingGeometry, roofMaterial);
              const rw = randFloat(5, 14, seed + 60 + r);
              const rh = randFloat(8, 24, seed + 70 + r);
              const rd = randFloat(4, 10, seed + 80 + r);

              roofBox.scale.set(rw, rh, rd);
              roofBox.position.set(
                building.position.x + randFloat(-width * 0.35, width * 0.35, seed + 90 + r),
                yBase + height + rh / 2,
                building.position.z + randFloat(-depth * 0.25, depth * 0.25, seed + 100 + r)
              );

              group.add(roofBox);
            }
          }

          if (layerIndex <= 3 && windowIndex < maxWindowInstances) {
            const rows = Math.floor(height / 22);
            const cols = Math.max(2, Math.floor(width / 15));

            const q = new THREE.Quaternion();
            const s = new THREE.Vector3(1, 1, 1);
            const matrix = new THREE.Matrix4();

            for (let row = 1; row < rows - 1; row++) {
              for (let col = 1; col < cols - 1; col++) {
                const chanceSeed = seed + row * 131 + col * 19;

                if (seededRandom(chanceSeed) > layer.windowChance) continue;
                if (windowIndex >= maxWindowInstances) break;

                const wx = building.position.x - width / 2 + col * (width / cols);
                const wy = building.position.y - height / 2 + row * (height / rows);
                const wz = building.position.z + depth / 2 + 0.7;

                matrix.compose(new THREE.Vector3(wx, wy, wz), q, s);
                windowMesh.setMatrixAt(windowIndex, matrix);
                windowIndex++;
              }
            }
          }
        }

        if (windowIndex > 0) {
          windowMesh.count = windowIndex;
          windowMesh.instanceMatrix.needsUpdate = true;
          group.add(windowMesh);
        } else {
          windowGeometry.dispose();
          windowMaterial.dispose();
        }

        refs.scene.add(group);
        refs.cityLayers.push(group);
      });
    };

    const createAtmosphericParticles = () => {
      const particleCount = isMobile() ? 360 : 850;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const seed = 7000 + i * 11;

        positions[i * 3] = randFloat(-900, 900, seed);
        positions[i * 3 + 1] = randFloat(-90, 420, seed + 1);
        positions[i * 3 + 2] = randFloat(-900, 180, seed + 2);

        sizes[i] = randFloat(0.8, 3.2, seed + 3);
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0xffe4b8) }
        },
        vertexShader: `
          attribute float size;
          uniform float time;

          void main() {
            vec3 pos = position;
            pos.x += sin(time * 0.12 + position.y * 0.02) * 4.0;
            pos.y += cos(time * 0.09 + position.x * 0.01) * 1.5;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (260.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;

          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;

            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(color, alpha * 0.32);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      refs.particles = new THREE.Points(geometry, material);
      refs.scene.add(refs.particles);
    };

    const createScrollTrigger = () => {
      refs.scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (sections.length - 1)}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateFromScroll(self.progress);
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const updateFromScroll = (progress) => {
      const scaledProgress = progress * (sections.length - 1);
      const baseIndex = Math.min(sections.length - 1, Math.floor(scaledProgress));
      const nextIndex = Math.min(sections.length - 1, baseIndex + 1);
      const localProgress = smoothstep(scaledProgress - baseIndex);

      const current = sections[baseIndex];
      const next = sections[nextIndex];

      targetCamera.current = {
        x: lerp(current.camera.x, next.camera.x, localProgress),
        y: lerp(current.camera.y, next.camera.y, localProgress),
        z: lerp(current.camera.z, next.camera.z, localProgress)
      };

      targetLookAt.current = {
        x: lerp(current.lookAt.x, next.lookAt.x, localProgress),
        y: lerp(current.lookAt.y, next.lookAt.y, localProgress),
        z: lerp(current.lookAt.z, next.lookAt.z, localProgress)
      };

      const displayIndex = Math.min(
        sections.length - 1,
        Math.max(0, Math.round(scaledProgress))
      );

      if (displayIndex !== activeIndexRef.current) {
        activeIndexRef.current = displayIndex;
        setActiveIndex(displayIndex);
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      refs.cityLayers.forEach((layer, index) => {
        const foregroundWeight = 1 / (index + 1);

        layer.userData.targetZ =
          layer.userData.baseZ + progress * 155 * foregroundWeight;

        layer.userData.targetX =
          (progress - 0.5) * 34 * foregroundWeight;
      });

      if (refs.hazePlane?.material?.uniforms) {
        refs.hazePlane.material.uniforms.opacity.value = 0.18 + progress * 0.08;
      }

      if (refs.sunGlow?.material?.uniforms) {
        refs.sunGlow.material.uniforms.opacity.value = 0.3 + progress * 0.08;
      }
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      smoothCamera.current.x += (targetCamera.current.x - smoothCamera.current.x) * 0.055;
      smoothCamera.current.y += (targetCamera.current.y - smoothCamera.current.y) * 0.055;
      smoothCamera.current.z += (targetCamera.current.z - smoothCamera.current.z) * 0.055;

      smoothLookAt.current.x += (targetLookAt.current.x - smoothLookAt.current.x) * 0.055;
      smoothLookAt.current.y += (targetLookAt.current.y - smoothLookAt.current.y) * 0.055;
      smoothLookAt.current.z += (targetLookAt.current.z - smoothLookAt.current.z) * 0.055;

      const microFloatX = Math.sin(time * 0.13) * 2.2;
      const microFloatY = Math.cos(time * 0.11) * 1.2;

      refs.camera.position.set(
        smoothCamera.current.x + microFloatX,
        smoothCamera.current.y + microFloatY,
        smoothCamera.current.z
      );

      refs.camera.lookAt(
        smoothLookAt.current.x,
        smoothLookAt.current.y,
        smoothLookAt.current.z
      );

      refs.cityLayers.forEach((layer, index) => {
        const targetZ = layer.userData.targetZ ?? layer.userData.baseZ;
        const targetX = layer.userData.targetX ?? 0;
        const drift = Math.sin(time * 0.055 + index * 1.7) * (1.2 / (index + 1));

        layer.position.z += (targetZ - layer.position.z) * 0.045;
        layer.position.x += (targetX + drift - layer.position.x) * 0.04;
      });

      if (refs.particles?.material?.uniforms) {
        refs.particles.material.uniforms.time.value = time;
      }

      if (refs.hazePlane?.material?.uniforms) {
        refs.hazePlane.material.uniforms.time.value = time;
      }

      if (refs.atmosphere?.material?.uniforms) {
        refs.atmosphere.material.uniforms.time.value = time;
      }

      if (refs.composer) {
        refs.composer.render();
      }
    };

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;

      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();

      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);

      if (refs.bloomPass) {
        refs.bloomPass.resolution.set(window.innerWidth, window.innerHeight);
        refs.bloomPass.strength = isMobile() ? 0.22 : 0.34;
      }

      ScrollTrigger.refresh();
    };

    const disposeScene = () => {
      const geometries = new Set();
      const materials = new Set();

      if (refs.scene) {
        refs.scene.traverse((object) => {
          if (object.geometry) {
            geometries.add(object.geometry);
          }

          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => materials.add(material));
            } else {
              materials.add(object.material);
            }
          }
        });
      }

      geometries.forEach((geometry) => geometry.dispose());

      materials.forEach((material) => {
        Object.keys(material).forEach((key) => {
          const value = material[key];

          if (value && typeof value === 'object' && typeof value.dispose === 'function') {
            value.dispose();
          }
        });

        material.dispose();
      });

      if (refs.scene) {
        refs.scene.clear();
      }
    };

    initThree();
    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.scrollTrigger) {
        refs.scrollTrigger.kill();
      }

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      disposeScene();

      if (refs.composer) {
        refs.composer.dispose?.();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
        refs.renderer.forceContextLoss?.();
      }

      refs.scene = null;
      refs.camera = null;
      refs.renderer = null;
      refs.composer = null;
      refs.bloomPass = null;
      refs.cityLayers = [];
      refs.particles = null;
      refs.hazePlane = null;
      refs.atmosphere = null;
      refs.sunGlow = null;
      refs.scrollTrigger = null;
      refs.animationId = null;
    };
  }, [sections]);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([menuRef.current, progressWrapperRef.current, contentRef.current], {
        visibility: 'visible'
      });

      gsap.from(menuRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(progressWrapperRef.current, {
        y: 34,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.title-char',
        {
          yPercent: 115,
          opacity: 0
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.028,
          ease: 'power4.out'
        }
      );

      gsap.fromTo(
        '.subtitle-line',
        {
          y: 28,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.12,
          delay: 0.08,
          ease: 'power3.out'
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeIndex, isReady]);

  return (
    <section ref={containerRef} className="hero-container city-hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <div className="menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="vertical-text">ELAOUAD</div>
      </div>

      <div
        ref={contentRef}
        className="hero-content city-content"
        style={{ visibility: 'hidden' }}
        aria-live="polite"
      >
        <p className="hero-kicker">Architecture · Ingénierie · Structure</p>

        <h1 key={activeSection.title} className="hero-title">
          {splitTitle(activeSection.title)}
        </h1>

        <div key={`${activeSection.title}-subtitle`} className="hero-subtitle city-subtitle">
          {activeSection.subtitle.map((line, index) => (
            <p key={index} className="subtitle-line">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div
        ref={progressWrapperRef}
        className="scroll-progress"
        style={{ visibility: 'hidden' }}
      >
        <div className="scroll-text">SCROLL</div>

        <div className="progress-track">
          <div ref={progressFillRef} className="progress-fill" />
        </div>

        <div className="section-counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};
```

## Minimum CSS patch

Add or adapt this. The important part is that the hero is pinned by `ScrollTrigger`, so you no longer need the old `.scroll-sections`.

```css
.hero-container.city-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #e9dfc9;
  color: #f8f1e6;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.city-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(6, 14, 20, 0.68) 0%,
      rgba(6, 14, 20, 0.22) 42%,
      rgba(233, 223, 201, 0.1) 100%
    ),
    linear-gradient(
      180deg,
      rgba(244, 226, 190, 0.06) 0%,
      rgba(5, 12, 18, 0.35) 100%
    );
  z-index: 1;
}

.hero-content.city-content {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: clamp(2rem, 8vw, 9rem);
  padding-right: clamp(1.5rem, 5vw, 6rem);
  pointer-events: none;
}

.hero-kicker {
  margin: 0 0 1.2rem;
  font-size: clamp(0.72rem, 1vw, 0.95rem);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(248, 241, 230, 0.72);
}

.hero-title {
  margin: 0;
  overflow: hidden;
  font-size: clamp(4.4rem, 12vw, 14rem);
  line-height: 0.82;
  font-weight: 800;
  letter-spacing: -0.08em;
  text-transform: uppercase;
  color: rgba(255, 248, 234, 0.96);
  text-shadow: 0 24px 90px rgba(0, 0, 0, 0.45);
}

.title-char {
  display: inline-block;
  will-change: transform, opacity;
}

.hero-subtitle.city-subtitle {
  margin-top: clamp(1.4rem, 2vw, 2.4rem);
  max-width: 620px;
}

.subtitle-line {
  margin: 0;
  font-size: clamp(1rem, 1.8vw, 1.7rem);
  line-height: 1.35;
  color: rgba(255, 248, 234, 0.78);
  will-change: transform, opacity;
}

.side-menu {
  position: absolute;
  z-index: 3;
  left: clamp(1rem, 2vw, 2rem);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
}

.menu-icon span {
  width: 26px;
  height: 2px;
  background: rgba(255, 248, 234, 0.82);
}

.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 0.32em;
  font-size: 0.7rem;
  color: rgba(255, 248, 234, 0.62);
}

.scroll-progress {
  position: absolute;
  z-index: 3;
  left: clamp(2rem, 8vw, 9rem);
  right: clamp(2rem, 8vw, 9rem);
  bottom: clamp(2rem, 6vh, 4.5rem);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 248, 234, 0.72);
}

.scroll-text,
.section-counter {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.progress-track {
  position: relative;
  height: 1px;
  overflow: hidden;
  background: rgba(255, 248, 234, 0.22);
}

.progress-fill {
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: rgba(255, 248, 234, 0.88);
  will-change: transform;
}

@media (max-width: 768px) {
  .hero-content.city-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .side-menu {
    display: none;
  }

  .scroll-progress {
    left: 1.5rem;
    right: 1.5rem;
    grid-template-columns: 1fr auto;
  }

  .scroll-text {
    display: none;
  }
}
```

## Delete from the old version

Remove these parts from the old file:

```jsx
createMountains();
getLocation();
refs.mountains
refs.locations
scroll-sections
```

Also remove any old CSS that forces `.scroll-sections` or `.content-section`, because the new version uses a **single pinned cinematic hero** instead of duplicated section blocks.
