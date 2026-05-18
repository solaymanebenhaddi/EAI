'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHorizonScene } from './HorizonSceneContext';
import { useScroll, useTransform } from 'framer-motion';

interface HorizonBlueprintLinesProps {
  /** Blueprint lines opacity */
  opacity?: number;
  /** Whether blueprint lines are animated */
  animated?: boolean;
  /** Line style: 'construction', 'structural', 'details' */
  style?: 'construction' | 'structural' | 'details';
}

export function HorizonBlueprintLines({
  opacity = 0.3,
  animated = true,
  style = 'construction',
}: HorizonBlueprintLinesProps) {
  const { activeScene } = useHorizonScene();
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Scene-specific blueprint lines transformations
  const linesRotationY = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );
  
  const linesOffsetZ = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0, 0] : 
    activeScene === 'blueprint' ? [0, 0] : 
    activeScene === 'manifesto' ? [0, 0] : 
    activeScene === 'services' ? [0, 0] : 
    activeScene === 'projects' ? [0, 0] : 
    activeScene === 'founder' ? [0, 0] : 
    activeScene === 'events' ? [0, 0] : 
    activeScene === 'testimonials' ? [0, 0] : 
    activeScene === 'finalCTA' ? [0, 0] : 
    [0, 0]
  );

  const linesScale = useTransform(scrollYProgress, [0, 1], 
    activeScene === 'hero' ? [0.5, 0.8] : 
    activeScene === 'blueprint' ? [0.8, 1.2] : 
    activeScene === 'manifesto' ? [0.7, 1.0] : 
    activeScene === 'services' ? [0.6, 0.9] : 
    activeScene === 'projects' ? [0.9, 1.1] : 
    activeScene === 'founder' ? [0.8, 1.0] : 
    activeScene === 'events' ? [0.7, 1.0] : 
    activeScene === 'testimonials' ? [0.6, 0.9] : 
    activeScene === 'finalCTA' ? [0.8, 1.1] : 
    [0.5, 0.8]
  );

  // Define blueprint line styles
  const getLineDefinitions = () => {
    switch (style) {
      case 'construction':
        return [
          // Foundation lines
          { x1: 50, y1: 200, x2: 350, y2: 200 },
          { x1: 100, y1: 150, x2: 100, y2: 250 },
          { x1: 200, y1: 150, x2: 200, y2: 250 },
          { x1: 300, y1: 150, x2: 300, y2: 250 },
          // Floor lines
          { x1: 50, y1: 180, x2: 350, y2: 180 },
          { x1: 50, y1: 160, x2: 350, y2: 160 },
          { x1: 50, y1: 140, x2: 350, y2: 140 },
          { x1: 50, y1: 120, x2: 350, y2: 120 },
          { x1: 50, y1: 100, x2: 350, y2: 100 },
        ];
      case 'structural':
        return [
          // Columns
          { x1: 100, y1: 50, x2: 100, y2: 200 },
          { x1: 200, y1: 50, x2: 200, y2: 200 },
          { x1: 300, y1: 50, x2: 300, y2: 200 },
          // Beams
          { x1: 80, y1: 100, x2: 320, y2: 100 },
          { x1: 80, y1: 150, x2: 320, y2: 150 },
          { x1: 80, y1: 200, x2: 320, y2: 200 },
          // Braces
          { x1: 100, y1: 100, x2: 200, y2: 150 },
          { x1: 200, y1: 100, x2: 300, y2: 150 },
        ];
      case 'details':
        return [
          // Window outlines
          { x1: 120, y1: 80, x2: 120, y2: 120 },
          { x1: 120, y1: 120, x2: 160, y2: 120 },
          { x1: 160, y1: 80, x2: 160, y2: 120 },
          { x1: 120, y1: 80, x2: 160, y2: 80 },
          { x1: 220, y1: 80, x2: 220, y2: 120 },
          { x1: 220, y1: 120, x2: 260, y2: 120 },
          { x1: 260, y1: 80, x2: 260, y2: 120 },
          { x1: 220, y1: 80, x2: 260, y2: 80 },
          // Door outlines
          { x1: 180, y1: 50, x2: 180, y2: 150 },
          { x1: 180, y1: 150, x2: 220, y2: 150 },
          { x1: 220, y1: 50, x2: 220, y2: 150 },
          { x1: 180, y1: 50, x2: 220, y2: 50 },
        ];
      default:
        return [];
    }
  };

  const lineDefinitions = getLineDefinitions();

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transform: `
          translateZ(${linesOffsetZ}px)
          rotateY(${linesRotationY}deg)
          scale(${linesScale})
        `,
      }}
    >
      <svg width="400" height="250" viewBox="0 0 400 250">
        {lineDefinitions.map((line, index) => (
          <motion.line
            key={`blueprint-line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#B8963C"
            strokeWidth={style === 'construction' ? 0.3 : style === 'structural' ? 0.5 : 0.2}
            strokeDasharray={style === 'construction' ? "2,2" : style === 'structural' ? "4,2" : "1,3"}
            opacity={opacity}
            initial={{ pathLength: 0 }}
            animate={isInView && animated ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1.5, delay: index * 0.05 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}