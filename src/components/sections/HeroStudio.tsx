"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smoothstep = (t: number) => t * t * (3 - 2 * t)

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const randFloat = (min: number, max: number, seed: number) => {
  return min + seededRandom(seed) * (max - min)
}

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text)

const splitTitle = (text: string) => {
  if (isArabic(text)) {
    // For Arabic, split by words to preserve cursive joining and RTL flow
    return text.split(' ').map((word, index, arr) => (
      <React.Fragment key={`word-${index}`}>
        <span className="title-char inline-block" dir="rtl">{word}</span>
        {index < arr.length - 1 && ' '}
      </React.Fragment>
    ))
  }
  return text.split('').map((char, index) => (
    <span key={`${char}-${index}`} className="title-char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export default function HeroStudio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const progressWrapperRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)

  const activeIndexRef = useRef(0)

  // Camera flight track - adjusted heights and depths to capture towering building frames
  const targetCamera = useRef({ x: -30, y: 78, z: 460 })
  const smoothCamera = useRef({ x: -30, y: 78, z: 460 })

  const targetLookAt = useRef({ x: -10, y: 56, z: -820 })
  const smoothLookAt = useRef({ x: -10, y: 56, z: -820 })

  const [isReady, setIsReady] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const t = useTranslations('HeroSlides')

  const sections = useMemo(
    () => [
      {
        title: t('VISION.title'),
        subtitle: [t('VISION.subtitle')],
        camera: { x: -30, y: 78, z: 460 },
        lookAt: { x: -10, y: 56, z: -820 }
      },
      {
        title: t('METHOD.title'),
        subtitle: [t('METHOD.subtitle')],
        camera: { x: 34, y: 84, z: -420 },
        lookAt: { x: 4, y: 72, z: -1680 }
      },
      {
        title: t('STRUCTURE.title'),
        subtitle: [t('STRUCTURE.subtitle')],
        camera: { x: 0, y: 112, z: -1420 },
        lookAt: { x: 0, y: 92, z: -2980 }
      },
      {
        title: t('TRUST.title'),
        subtitle: [t('TRUST.subtitle')],
        camera: { x: -20, y: 138, z: -2300 },
        lookAt: { x: 0, y: 105, z: -4000 }
      },
      {
        title: t('ELAOUAD.title'),
        subtitle: [t('ELAOUAD.subtitle')],
        camera: { x: 0, y: 150, z: -2700 },
        lookAt: { x: 0, y: 120, z: -4800 }
      }
    ],
    [t]
  )

  const threeRefs = useRef<any>({
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
  })

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const refs = threeRefs.current
    const clock = new THREE.Clock()

    const manager = new THREE.LoadingManager()
    
    // Add a fallback timeout so we never get stuck indefinitely at 0%
    const fallbackTimer = setTimeout(() => {
      setIsReady(true)
    }, 5000)

    manager.onProgress = (url, loaded, total) => {
      setLoadingProgress(Math.round((loaded / total) * 100))
    }
    manager.onLoad = () => {
      clearTimeout(fallbackTimer)
      setTimeout(() => setIsReady(true), 500)
    }
    manager.onError = () => {
      clearTimeout(fallbackTimer)
      setIsReady(true)
    }

    const isMobile = () => window.innerWidth < 768

    const initThree = () => {
      if (!canvasRef.current) return

      refs.scene = new THREE.Scene()
      const bgTexture = new THREE.TextureLoader(manager).load('/assets/backgound_hero.webp')
      bgTexture.colorSpace = THREE.SRGBColorSpace
      refs.scene.background = bgTexture
      refs.scene.fog = new THREE.FogExp2(0x050a14, 0.00045) // Lighter fog so bg is visible

      refs.camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        4000
      )

      refs.camera.position.set(
        smoothCamera.current.x,
        smoothCamera.current.y,
        smoothCamera.current.z
      )

      try {
        refs.renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: !isMobile(),
          alpha: false,
          powerPreference: 'high-performance'
        })
      } catch (e) {
        console.warn('WebGL context could not be created:', e)
        setIsReady(true)
        return
      }

      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2))
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 0.85
      
      // Enable Shadows for Cinematic Realism
      refs.renderer.shadowMap.enabled = true
      refs.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      if ('outputColorSpace' in refs.renderer) {
        refs.renderer.outputColorSpace = THREE.SRGBColorSpace
      }

      // Performance Optimization: Enabled Bloom on mobile per user request. 
      // Strength is lowered in handleResize.
      refs.composer = new EffectComposer(refs.renderer)
      const renderPass = new RenderPass(refs.scene, refs.camera)
      refs.composer.addPass(renderPass)

      refs.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.34,
        0.32,
        0.86
      )
      refs.composer.addPass(refs.bloomPass)

      createLighting()
      // createAtmosphere()
      // createHazePlane()
      // createSunGlow()
      createCitySkyline()
      createAtmosphericParticles()

      updateFromScroll(0)
      createScrollTrigger()

      // setIsReady(true) handled by manager.onLoad
      animate()
    }

    const createLighting = () => {
      const ambient = new THREE.AmbientLight(0x111625, 0.6)
      refs.scene.add(ambient)

      const moonKey = new THREE.DirectionalLight(0xb5cfff, 1.8)
      moonKey.position.set(260, 440, 180)
      moonKey.castShadow = true
      moonKey.shadow.mapSize.width = 1024
      moonKey.shadow.mapSize.height = 1024
      moonKey.shadow.camera.near = 10
      moonKey.shadow.camera.far = 3000
      moonKey.shadow.camera.left = -1500
      moonKey.shadow.camera.right = 1500
      moonKey.shadow.camera.top = 1500
      moonKey.shadow.camera.bottom = -1500
      moonKey.shadow.bias = -0.002
      refs.scene.add(moonKey)

      const coolFill = new THREE.DirectionalLight(0x405570, 0.6)
      coolFill.position.set(-220, 80, 120)
      refs.scene.add(coolFill)

      const cityRim = new THREE.DirectionalLight(0xffaa44, 0.5) // City glow from below
      cityRim.position.set(0, -100, -500)
      refs.scene.add(cityRim)
    }

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(1500, 32, 32)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          colorA: { value: new THREE.Color(0x0a1526) },
          colorB: { value: new THREE.Color(0x02050a) }
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
      })

      refs.atmosphere = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.atmosphere)
    }

    const createHazePlane = () => {
      const geometry = new THREE.PlaneGeometry(3500, 1500, 32, 32)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          opacity: { value: 0.2 },
          warm: { value: new THREE.Color(0x1a2639) },
          cool: { value: new THREE.Color(0x050a14) }
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
      })

      refs.hazePlane = new THREE.Mesh(geometry, material)
      refs.hazePlane.position.set(0, 130, -1200)
      refs.scene.add(refs.hazePlane)
    }

    const createSunGlow = () => {
      const geometry = new THREE.PlaneGeometry(1000, 1000)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          opacity: { value: 0.32 },
          color: { value: new THREE.Color(0xc9dfff) } // Moonlight
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
      })

      refs.sunGlow = new THREE.Mesh(geometry, material)
      refs.sunGlow.position.set(180, 185, -1500)
      refs.scene.add(refs.sunGlow)
    }

    const createCitySkyline = () => {
      const textureLoader = new THREE.TextureLoader(manager)
      const concreteTex = textureLoader.load('/textures/concrete.webp')
      concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping

      const windowTex = textureLoader.load('/textures/windows.webp')
      windowTex.wrapS = windowTex.wrapT = THREE.RepeatWrapping
      
      const streetTex = textureLoader.load('/textures/streets.webp')
      streetTex.wrapS = streetTex.wrapT = THREE.RepeatWrapping
      streetTex.repeat.set(30, 30)

      // Add Ground Plane for realism
      const groundGeom = new THREE.PlaneGeometry(8000, 8000)
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        map: streetTex,
        roughness: 0.8,
        metalness: 0.2
      })
      const ground = new THREE.Mesh(groundGeom, groundMat)
      ground.rotation.x = -Math.PI / 2
      ground.position.y = -210
      ground.receiveShadow = true
      refs.scene.add(ground)

      const injectTriplanar = (shader: any) => {
        shader.vertexShader = `
          varying vec3 vWorldPos;
          ${shader.vertexShader}
        `.replace(
          `#include <worldpos_vertex>`,
          `#include <worldpos_vertex>
           vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
        )
        shader.fragmentShader = `
          varying vec3 vWorldPos;
          
          // Pseudo-random noise for window lighting
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }
          
          ${shader.fragmentShader}
        `.replace(
          `#include <map_fragment>`,
          `
          #ifdef USE_MAP
            vec3 blend = abs(vNormal);
            blend /= dot(blend, vec3(1.0));
            vec4 cx = texture2D(map, vWorldPos.yz * 0.05);
            vec4 cy = texture2D(map, vWorldPos.xz * 0.05);
            vec4 cz = texture2D(map, vWorldPos.xy * 0.05);
            vec4 sampledDiffuseColor = cx * blend.x + cy * blend.y + cz * blend.z;
            
            // Mix the base layer color with the concrete texture to retain visibility
            diffuseColor.rgb = mix(sampledDiffuseColor.rgb, diffuseColor.rgb, 0.4);
          #endif
          `
        ).replace(
          `#include <emissivemap_fragment>`,
          `
          #include <emissivemap_fragment>
          
          // --- PROCEDURAL WINDOWS ---
          // Only apply windows to walls (where y-normal is close to 0)
          float isWall = step(0.5, 1.0 - abs(vNormal.y));
          
          // Map the 2D grid based on the facing normal
          float useX = step(0.5, abs(vNormal.x));
          vec2 winGrid = mix(vWorldPos.xy, vWorldPos.zy, useX);
          
          // Window scaling (adjusts how large the windows are)
          vec2 winScale = vec2(0.12, 0.06);
          vec2 winUv = fract(winGrid * winScale);
          vec2 winId = floor(winGrid * winScale);
          
          // Smooth edges for realism (creates nice window frames)
          float frameX = smoothstep(0.05, 0.15, winUv.x) * smoothstep(0.95, 0.85, winUv.x);
          float frameY = smoothstep(0.1, 0.2, winUv.y) * smoothstep(0.9, 0.8, winUv.y);
          float isGlass = frameX * frameY;
          
          if (isWall > 0.5 && isGlass > 0.1) {
            // Generate a random value for this specific window pane
            float noiseVal = hash(winId + floor(vWorldPos.x * 0.01) * 10.0 + floor(vWorldPos.z * 0.01) * 100.0);
            vec3 glowColor = vec3(0.0);
            
            if (noiseVal > 0.92) {
              // Neon Amber glowing window
              glowColor = vec3(1.0, 0.55, 0.15) * 5.0;
            } else if (noiseVal > 0.75) {
              // White/Blueish glowing window
              glowColor = vec3(0.7, 0.85, 1.0) * 4.0;
            } else {
              // Unlit dark glass - fake reflection by darkening the concrete behind it
              diffuseColor.rgb *= (1.0 - isGlass * 0.75);
            }
            
            // Add directly to emissive radiance so it glows independent of lighting/shadows!
            totalEmissiveRadiance += glowColor * isGlass;
          }
          `
        )
      }

      const layers = [
        { z: -100, count: 6, width: 1400, minH: 300, maxH: 700, minW: 50, maxW: 90, depth: [40, 80], windowChance: 0.25 },
        { z: -300, count: 12, width: 1300, minH: 300, maxH: 700, minW: 50, maxW: 110, depth: [35, 70], windowChance: 0.2 },
        { z: -600, count: 16, width: 1600, minH: 300, maxH: 700, minW: 40, maxW: 90, depth: [30, 60], windowChance: 0.15 },
        { z: -900, count: 20, width: 1900, minH: 300, maxH: 650, minW: 35, maxW: 80, depth: [25, 50], windowChance: 0.1 },
        { z: -1300, count: 24, width: 2200, minH: 250, maxH: 650, minW: 30, maxW: 70, depth: [20, 45], windowChance: 0.08 },
        { z: -1700, count: 28, width: 2600, minH: 250, maxH: 600, minW: 25, maxW: 60, depth: [15, 35], windowChance: 0.05 },
        { z: -2100, count: 32, width: 3000, minH: 200, maxH: 600, minW: 20, maxW: 50, depth: [12, 30], windowChance: 0.03 },
        { z: -2600, count: 36, width: 3500, minH: 200, maxH: 550, minW: 18, maxW: 45, depth: [10, 25], windowChance: 0.02 },
        { z: -3100, count: 40, width: 4000, minH: 150, maxH: 500, minW: 15, maxW: 40, depth: [8, 20], windowChance: 0.01 }
      ]

      layers.forEach((layer, layerIndex) => {
        const group = new THREE.Group()
        group.position.z = layer.z

        group.userData = {
          baseZ: layer.z,
          targetZ: layer.z,
          targetX: 0,
          layerIndex
        }

        const buildingGeometry = new THREE.BoxGeometry(1, 1, 1)
        
        // Depth gradient color based on layer index
        const frontColor = new THREE.Color(0x1a2025) // Darker in front
        const backColor = new THREE.Color(0x6a7580)  // Lighter in back
        const layerColor = frontColor.clone().lerp(backColor, layerIndex / (layers.length - 1))

        const buildingMaterial = new THREE.MeshStandardMaterial({
          color: layerColor,
          map: concreteTex,
          roughness: 0.95,
          metalness: 0.05
        })
        buildingMaterial.onBeforeCompile = injectTriplanar

        const roofMaterial = buildingMaterial.clone()

        const spacing = layer.width / layer.count

        for (let i = 0; i < layer.count; i++) {
          const seed = 1000 + layerIndex * 300 + i * 17

          let width = randFloat(layer.minW, layer.maxW, seed + 1)
          let height = randFloat(layer.minH, layer.maxH, seed + 2)
          let depth = randFloat(layer.depth[0], layer.depth[1], seed + 3)

          if (layerIndex === 0 && i === 1) {
            width = 80
            height = 660
            depth = 78
          }

          if (layerIndex === 0 && i === 3) {
            width = 75
            height = 500
            depth = 68
          }

          const xBase = -layer.width / 2 + spacing * i + spacing / 2
          const xJitter = randFloat(-spacing * 0.24, spacing * 0.24, seed + 4)
          const yBase = -210

          const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
          building.scale.set(width, height, depth)
          building.position.set(
            xBase + xJitter,
            yBase + height / 2,
            randFloat(-18, 18, seed + 5)
          )
          building.castShadow = true
          building.receiveShadow = true

          building.userData = { height, width, depth, seed }
          group.add(building)

          // Architectural Setbacks for realism (adding tiered structure)
          if (height > 350 && seededRandom(seed + 900) > 0.4) {
             const setBackH = randFloat(40, 150, seed + 901)
             const setback = new THREE.Mesh(buildingGeometry, buildingMaterial)
             setback.scale.set(width * 0.7, setBackH, depth * 0.7)
             setback.position.set(
               building.position.x,
               yBase + height + setBackH / 2,
               building.position.z
             )
             setback.castShadow = true
             setback.receiveShadow = true
             group.add(setback)
             height += setBackH // update total height for roof placement
          }

          // Rooftop details
          if (layerIndex <= 6) {
            const rooftopCount = layerIndex === 0 ? 3 : 2
            for (let r = 0; r < rooftopCount; r++) {
              const roofBox = new THREE.Mesh(buildingGeometry, roofMaterial)
              const rw = randFloat(5, 14, seed + 60 + r)
              const rh = randFloat(8, 24, seed + 70 + r)
              const rd = randFloat(4, 10, seed + 80 + r)

              roofBox.scale.set(rw, rh, rd)
              roofBox.position.set(
                building.position.x + randFloat(-width * 0.35, width * 0.35, seed + 90 + r),
                yBase + height + rh / 2,
                building.position.z + randFloat(-depth * 0.25, depth * 0.25, seed + 100 + r)
              )
              roofBox.castShadow = true
              roofBox.receiveShadow = true
              group.add(roofBox)
            }
          }

          // Spire/antenna
          if (seededRandom(seed + 99) < 0.18 && height > 280) {
            const antH = randFloat(30, 80, seed + 101)
            const antennaGeom = new THREE.CylinderGeometry(0.4, 0.4, antH, 4)
            const antenna = new THREE.Mesh(antennaGeom, roofMaterial)
            antenna.position.set(
              building.position.x + randFloat(-width * 0.2, width * 0.2, seed + 102),
              yBase + height + antH / 2,
              building.position.z
            )
            antenna.castShadow = true
            group.add(antenna)
          }
        }

        refs.scene.add(group)
        refs.cityLayers.push(group)
      })
    }

    const createAtmosphericParticles = () => {
      const particleCount = isMobile() ? 360 : 850
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        const seed = 7000 + i * 11

        positions[i * 3] = randFloat(-900, 900, seed)
        positions[i * 3 + 1] = randFloat(-90, 420, seed + 1)
        positions[i * 3 + 2] = randFloat(-900, 180, seed + 2)

        sizes[i] = randFloat(0.8, 3.2, seed + 3)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0xffaa44) } // Ember glow
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
      })

      refs.particles = new THREE.Points(geometry, material)
      refs.scene.add(refs.particles)
    }

    const SCROLL_SCREENS = sections.length;

    let isPaused = false

    const pauseLoop = () => {
      if (isPaused) return
      isPaused = true
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }
    }

    const resumeLoop = () => {
      if (!isPaused) return
      isPaused = false
      if (!refs.animationId) {
        animate()
      }
    }

    const createScrollTrigger = () => {
      refs.scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateFromScroll(self.progress)
        },
        onLeave: () => {
          pauseLoop()
        },
        onEnterBack: () => {
          resumeLoop()
        }
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const updateFromScroll = (progress: number) => {
      const capProgress = progress
      
      const scaledProgress = capProgress * (sections.length - 1)
      const baseIndex = Math.min(sections.length - 1, Math.floor(scaledProgress))
      const nextIndex = Math.min(sections.length - 1, baseIndex + 1)
      const localProgress = smoothstep(scaledProgress - baseIndex)

      const current = sections[baseIndex]
      const next = sections[nextIndex]

      targetCamera.current = {
        x: lerp(current.camera.x, next.camera.x, localProgress),
        y: lerp(current.camera.y, next.camera.y, localProgress),
        z: lerp(current.camera.z, next.camera.z, localProgress)
      }

      targetLookAt.current = {
        x: lerp(current.lookAt.x, next.lookAt.x, localProgress),
        y: lerp(current.lookAt.y, next.lookAt.y, localProgress),
        z: lerp(current.lookAt.z, next.lookAt.z, localProgress)
      }

      const displayIndex = Math.min(
        sections.length - 1,
        Math.max(0, Math.round(scaledProgress))
      )

      if (displayIndex !== activeIndexRef.current) {
        activeIndexRef.current = displayIndex
        setActiveIndex(displayIndex)
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`
      }

      // Parallax shifts on X axis
      refs.cityLayers.forEach((layer: any, index: number) => {
        const foregroundWeight = 1 / (index + 1)
        layer.userData.targetX = (capProgress - 0.5) * 34 * foregroundWeight
      })

      if (refs.hazePlane?.material?.uniforms) {
        refs.hazePlane.material.uniforms.opacity.value = 0.18 + capProgress * 0.08
      }

      if (refs.sunGlow?.material?.uniforms) {
        refs.sunGlow.material.uniforms.opacity.value = 0.3 + capProgress * 0.08
      }
    }

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      smoothCamera.current.x += (targetCamera.current.x - smoothCamera.current.x) * 0.055
      smoothCamera.current.y += (targetCamera.current.y - smoothCamera.current.y) * 0.055
      smoothCamera.current.z += (targetCamera.current.z - smoothCamera.current.z) * 0.055

      smoothLookAt.current.x += (targetLookAt.current.x - smoothLookAt.current.x) * 0.055
      smoothLookAt.current.y += (targetLookAt.current.y - smoothLookAt.current.y) * 0.055
      smoothLookAt.current.z += (targetLookAt.current.z - smoothLookAt.current.z) * 0.055

      const microFloatX = Math.sin(time * 0.13) * 2.2
      const microFloatY = Math.cos(time * 0.11) * 1.2

      refs.camera.position.set(
        smoothCamera.current.x + microFloatX,
        smoothCamera.current.y + microFloatY,
        smoothCamera.current.z
      )

      refs.camera.lookAt(
        smoothLookAt.current.x,
        smoothLookAt.current.y,
        smoothLookAt.current.z
      )

      refs.cityLayers.forEach((layer: any, index: number) => {
        const targetZ = layer.userData.baseZ
        const targetX = layer.userData.targetX ?? 0
        const drift = Math.sin(time * 0.055 + index * 1.7) * (1.2 / (index + 1))

        layer.position.z += (targetZ - layer.position.z) * 0.045
        layer.position.x += (targetX + drift - layer.position.x) * 0.04
      })

      if (refs.particles?.material?.uniforms) {
        refs.particles.material.uniforms.time.value = time
      }

      if (refs.hazePlane?.material?.uniforms) {
        refs.hazePlane.material.uniforms.time.value = time
      }

      if (refs.atmosphere?.material?.uniforms) {
        refs.atmosphere.material.uniforms.time.value = time
      }

      if (refs.composer) {
        refs.composer.render()
      } else if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
    }

    const handleResize = () => {
      if (!refs.camera || !refs.renderer) return

      refs.camera.aspect = window.innerWidth / window.innerHeight
      refs.camera.updateProjectionMatrix()

      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2))
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      
      if (refs.composer) {
        refs.composer.setSize(window.innerWidth, window.innerHeight)
      }

      if (refs.bloomPass) {
        refs.bloomPass.resolution.set(window.innerWidth, window.innerHeight)
        refs.bloomPass.strength = isMobile() ? 0.22 : 0.34
      }

      ScrollTrigger.refresh()
    }

    const disposeScene = () => {
      const geometries = new Set<any>()
      const materials = new Set<any>()

      if (refs.scene) {
        refs.scene.traverse((object: any) => {
          if (object.geometry) {
            geometries.add(object.geometry)
          }

          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: any) => materials.add(material))
            } else {
              materials.add(object.material)
            }
          }
        })
      }

      geometries.forEach((geometry) => geometry.dispose())

      materials.forEach((material) => {
        Object.keys(material).forEach((key) => {
          const value = material[key]

          if (value && typeof value === 'object' && typeof value.dispose === 'function') {
            value.dispose()
          }
        })

        material.dispose()
      })

      if (refs.scene) {
        refs.scene.clear()
      }
    }

    // Delay initialization slightly to let React unmount previous canvas cleanly during route transitions
    const initTimer = setTimeout(() => {
      initThree()
    }, 50)
    
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(initTimer)
      if (refs.scrollTrigger) {
        refs.scrollTrigger.kill()
      }

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
      }

      window.removeEventListener('resize', handleResize)

      disposeScene()

      if (refs.composer) {
        refs.composer.dispose?.()
      }

      if (refs.renderer) {
        refs.renderer.dispose()
        // Removed forceContextLoss to prevent browser WebGL context blocking on rapid remounts
      }

      refs.scene = null
      refs.camera = null
      refs.renderer = null
      refs.composer = null
      refs.bloomPass = null
      refs.cityLayers = []
      refs.particles = null
      refs.hazePlane = null
      refs.atmosphere = null
      refs.sunGlow = null
      refs.scrollTrigger = null
      refs.animationId = null
    }
  }, [sections])

  useEffect(() => {
    if (!isReady || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.set([menuRef.current, progressWrapperRef.current, contentRef.current], {
        visibility: 'visible'
      })

      gsap.from(menuRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(progressWrapperRef.current, {
        y: 34,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isReady])

  useEffect(() => {
    if (!isReady || !contentRef.current) return

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
      )

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
      )
    }, contentRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <>
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-eai-charcoal flex flex-col items-center justify-center text-eai-paper"
          >
            <div className="relative flex flex-col items-center gap-6">
              <motion.h2
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.25em', opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="font-sans text-3xl font-extrabold uppercase tracking-[0.25em] text-white"
              >
                ELAOUAD
              </motion.h2>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/50 font-bold -mt-2">Architecture & Ingénierie</span>
              
              <div className="w-40 h-[1px] bg-white/10 rounded-full overflow-hidden mt-4 relative">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1/2 bg-eai-olive"
                />
              </div>
            </div>

            {/* Bottom Left Progress Counter */}
            <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 overflow-hidden mix-blend-difference">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="font-sans text-6xl md:text-[8rem] leading-none font-extrabold uppercase tracking-tight text-white drop-shadow-lg tabular-nums"
              >
                {loadingProgress}%
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id="hero"
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${sections.length * 100}vh` }}
      >
        <section className="hero-container city-hero" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
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
            {sections.map((section, idx) => {
              const active = activeIndex === idx
              return (
                <div
                  key={idx}
                  className="absolute inset-x-[clamp(2rem,8vw,9rem)] inset-y-0 flex flex-col justify-center pointer-events-none transition-all duration-700 ease-out"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: `translateY(${active ? 0 : (idx < activeIndex ? -30 : 30)}px)`,
                  }}
                >
                  <p className="hero-kicker">Architecture · Ingénierie · Structure</p>

                  <h1 className="hero-title">
                    {splitTitle(section.title)}
                  </h1>

                  <div className="hero-subtitle city-subtitle">
                    {section.subtitle.map((line, index) => (
                      <p key={index} className="subtitle-line text-[#f0e6d2] font-light tracking-wide text-lg md:text-xl drop-shadow-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
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
      </div>
    </>
  )
}
