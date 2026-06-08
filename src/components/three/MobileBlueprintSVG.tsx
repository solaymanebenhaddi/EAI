'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

function AnimatedPath({ d, progress, delay = 0, duration = 0.3, ...props }: any) {
  const pathLength = useTransform(
    progress,
    [delay, delay + duration],
    [0, 1]
  );
  
  return (
    <motion.path
      d={d}
      stroke="#9BAE40"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, ...props.style }}
      {...props}
    />
  );
}

function FloorPlanGrid({ progress }: { progress: any }) {
  return (
    <g>
      {/* Horizontal grid lines */}
      {[50, 100, 150, 200, 250, 300, 350].map((y, i) => (
        <AnimatedPath
          key={`h-${i}`}
          d={`M 0,${y} L 400,${y}`}
          progress={progress}
          delay={0.02 + i * 0.02}
          strokeWidth={0.5}
          strokeDasharray="4 4"
          style={{ opacity: 0.3 }}
        />
      ))}
      {/* Vertical grid lines */}
      {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
        <AnimatedPath
          key={`v-${i}`}
          d={`M ${x},0 L ${x},400`}
          progress={progress}
          delay={0.02 + i * 0.02}
          strokeWidth={0.5}
          strokeDasharray="4 4"
          style={{ opacity: 0.3 }}
        />
      ))}
    </g>
  );
}

function FoundationOutline({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.1, 0.2, 0.5, 0.6], [0, 1, 1, 0.8]);
  
  return (
    <motion.g style={{ opacity }}>
      {/* Foundation rectangle */}
      <AnimatedPath
        d="M 40,360 L 360,360 L 360,280 L 40,280 Z"
        progress={progress}
        delay={0.1}
        duration={0.15}
        strokeWidth={2}
      />
      {/* Foundation fill */}
      <motion.rect
        x="40"
        y="280"
        width="320"
        height="80"
        fill="#9BAE40"
        style={{
          opacity: useTransform(progress, [0.15, 0.25, 0.35], [0, 0.05, 0.08])
        }}
      />
      {/* Dimension lines */}
      <AnimatedPath
        d="M 40,375 L 360,375 M 40,370 L 40,380 M 360,370 L 360,380"
        progress={progress}
        delay={0.25}
        strokeWidth={0.8}
        style={{ opacity: 0.5 }}
      />
      {/* Dimension markers */}
      <motion.text
        x="200"
        y="388"
        textAnchor="middle"
        fontSize="10"
        fill="#9BAE40"
        fontFamily="monospace"
        style={{
          opacity: useTransform(progress, [0.25, 0.3], [0, 0.6])
        }}
      >
        24.00m
      </motion.text>
    </motion.g>
  );
}

function BuildingStructure({ progress }: { progress: any }) {
  return (
    <g>
      {/* Main building outline */}
      <AnimatedPath
        d="M 80,280 L 80,120 L 160,120 L 160,80 L 240,80 L 240,120 L 320,120 L 320,280"
        progress={progress}
        delay={0.3}
        duration={0.2}
        strokeWidth={2.5}
      />
      {/* Floor divisions */}
      {[240, 200, 160, 120].map((y, i) => (
        <AnimatedPath
          key={`floor-${i}`}
          d={`M 80,${y} L 320,${y}`}
          progress={progress}
          delay={0.45 + i * 0.04}
          strokeWidth={1}
          style={{ opacity: 0.6 }}
        />
      ))}
      {/* Vertical structural columns */}
      {[120, 160, 200, 240, 280].map((x, i) => (
        <AnimatedPath
          key={`col-${i}`}
          d={`M ${x},280 L ${x},120`}
          progress={progress}
          delay={0.4 + i * 0.03}
          strokeWidth={1.5}
          style={{ opacity: 0.5 }}
        />
      ))}
      {/* Glass facade hint */}
      <motion.rect
        x="160"
        y="120"
        width="80"
        height="40"
        fill="#ADB3B5"
        style={{
          opacity: useTransform(progress, [0.5, 0.6], [0, 0.1])
        }}
      />
      {/* Entrance canopy */}
      <AnimatedPath
        d="M 180,280 L 180,260 L 220,260 L 220,280"
        progress={progress}
        delay={0.6}
        strokeWidth={1.5}
      />
    </g>
  );
}

function BIMOverlay({ progress }: { progress: any }) {
  return (
    <g>
      {/* BIM grid overlay - horizontal */}
      {[140, 180, 220, 260].map((y, i) => (
        <AnimatedPath
          key={`bim-h-${i}`}
          d={`M 60,${y} L 340,${y}`}
          progress={progress}
          delay={0.52 + i * 0.03}
          strokeWidth={0.5}
          stroke="#ADB3B5"
          strokeDasharray="2 3"
          style={{ opacity: 0.4 }}
        />
      ))}
      {/* BIM grid overlay - vertical */}
      {[100, 140, 180, 220, 260, 300].map((x, i) => (
        <AnimatedPath
          key={`bim-v-${i}`}
          d={`M ${x},280 L ${x},100`}
          progress={progress}
          delay={0.52 + i * 0.03}
          strokeWidth={0.5}
          stroke="#ADB3B5"
          strokeDasharray="2 3"
          style={{ opacity: 0.4 }}
        />
      ))}
      {/* BIM nodes */}
      {[
        [120, 240], [160, 200], [200, 160], [240, 200], [280, 240]
      ].map(([cx, cy], i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r="3"
            fill="#ADB3B5"
            style={{
              opacity: useTransform(progress, [0.55 + i * 0.04, 0.6 + i * 0.04], [0, 0.8])
            }}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r="6"
            stroke="#ADB3B5"
            strokeWidth="0.5"
            fill="none"
            style={{
              opacity: useTransform(progress, [0.55 + i * 0.04, 0.6 + i * 0.04], [0, 0.4])
            }}
          />
        </g>
      ))}
    </g>
  );
}

function BrassAccents({ progress }: { progress: any }) {
  return (
    <g>
      {/* Horizontal brass lines */}
      {[120, 160, 200, 240].map((y, i) => (
        <AnimatedPath
          key={`brass-h-${i}`}
          d={`M 80,${y} L 320,${y}`}
          progress={progress}
          delay={0.6 + i * 0.04}
          strokeWidth={0.8}
          style={{ opacity: 0.7 }}
        />
      ))}
      {/* Corner details */}
      <AnimatedPath
        d="M 80,120 L 70,120 L 70,130 M 320,120 L 330,120 L 330,130 M 80,280 L 70,280 L 70,270 M 320,280 L 330,280 L 330,270"
        progress={progress}
        delay={0.75}
        strokeWidth={1}
      />
      {/* Title block */}
      <AnimatedPath
        d="M 260,360 L 360,360 L 360,390 L 260,390 Z"
        progress={progress}
        delay={0.8}
        strokeWidth={1}
      />
      <motion.text
        x="310"
        y="378"
        textAnchor="middle"
        fontSize="8"
        fill="#9BAE40"
        fontFamily="monospace"
        style={{
          opacity: useTransform(progress, [0.82, 0.86], [0, 0.7])
        }}
      >
        ELAOUAD
      </motion.text>
      <motion.text
        x="310"
        y="386"
        textAnchor="middle"
        fontSize="6"
        fill="#9BAE40"
        fontFamily="monospace"
        style={{
          opacity: useTransform(progress, [0.84, 0.88], [0, 0.5])
        }}
      >
        BIM MODEL
      </motion.text>
    </g>
  );
}

export function MobileBlueprintSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <motion.svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[400px]"
      >
        {/* Phase 1: Grid foundation */}
        <FloorPlanGrid progress={scrollYProgress} />
        
        {/* Phase 2: Foundation outline */}
        <FoundationOutline progress={scrollYProgress} />
        
        {/* Phase 3: Building structure rises */}
        <BuildingStructure progress={scrollYProgress} />
        
        {/* Phase 4: BIM overlay */}
        <BIMOverlay progress={scrollYProgress} />
        
        {/* Phase 5: Brass accents and details */}
        <BrassAccents progress={scrollYProgress} />
      </motion.svg>
    </div>
  );
}
