'use client';

import { EffectComposer } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
import { Vignette } from '@react-three/postprocessing';
import { DepthOfField } from '@react-three/postprocessing';
import { Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function CinematicPostProcessing({
  bloomIntensity = 0.15,
  vignetteDarkness = 0.4,
  noiseIntensity = 0.04,
  dofEnabled = false,
}: {
  bloomIntensity?: number;
  vignetteDarkness?: number;
  noiseIntensity?: number;
  dofEnabled?: boolean;
}) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        mipmapBlur
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
      />
      <Noise
        opacity={noiseIntensity}
        blendFunction={BlendFunction.OVERLAY}
      />
      <Vignette
        darkness={vignetteDarkness}
        offset={0.5}
      />
      <DepthOfField
        focusDistance={dofEnabled ? 0.5 : 0}
        focalLength={dofEnabled ? 0.1 : 0}
        bokehScale={dofEnabled ? 1.0 : 0}
        height={480}
      />
    </EffectComposer>
  );
}

export function ReducedMotionPostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0} mipmapBlur />
      <Noise opacity={0} blendFunction={BlendFunction.OVERLAY} />
      <Vignette darkness={0.3} offset={0.5} />
      <DepthOfField focusDistance={0} focalLength={0} bokehScale={0} height={480} />
    </EffectComposer>
  );
}
