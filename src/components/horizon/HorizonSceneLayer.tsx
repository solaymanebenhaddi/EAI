'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HorizonSceneLayerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Layer depth for parallax effect */
  depth?: number;
  /** Whether this layer should be affected by scroll */
  parallax?: boolean;
  /** Opacity of the layer */
  opacity?: number;
}

export function HorizonSceneLayer({
  className = '',
  style = {},
  children,
  depth = 0,
  parallax = true,
  opacity = 1,
}: HorizonSceneLayerProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        ...style,
        opacity,
        transform: parallax ? `translateZ(${depth * 50}px)` : 'none',
        pointerEvents: 'none',
      }}
    >
      {children}
    </motion.div>
  );
}