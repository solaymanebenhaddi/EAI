'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';

function BlueprintSVG() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div className="w-full h-full perspective-[1200px]">
      <motion.div
        className="w-full h-full origin-bottom"
        initial={{ rotateX: 60, rotateZ: -20, scale: 0.8, opacity: 0 }}
        animate={isInView ? { rotateX: 45, rotateZ: -10, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg ref={ref} viewBox="0 0 600 450" className="w-full h-full overflow-visible">
          {/* Base Grid */}
          <g opacity="0.4">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.line
                key={`vg-${i}`}
                x1={i * 20} y1="0" x2={i * 20} y2="450"
                stroke="#9BAE40" strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: i * 0.05 }}
              />
            ))}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.line
                key={`hg-${i}`}
                x1="0" y1={i * 20} x2="600" y2={i * 20}
                stroke="#9BAE40" strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: i * 0.05 }}
              />
            ))}
          </g>

          {/* Complex Architectural Plan */}
          <g stroke="#9BAE40" fill="none">
            {/* Outer Walls */}
            <motion.path
              d="M100 100 L400 100 L400 300 L300 300 L300 350 L100 350 Z"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />
            {/* Inner Walls */}
            <motion.path
              d="M150 100 L150 250 M250 100 L250 200 M250 200 L400 200 M100 250 L300 250"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
            />
            {/* Doors & Windows (Arcs and Lines) */}
            <motion.path
              d="M150 200 A 30 30 0 0 1 180 170 M250 150 A 30 30 0 0 0 220 120"
              strokeWidth="1"
              strokeDasharray="4 2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </g>

          {/* Dimension Lines & Markers */}
          <g fill="#9BAE40" fontSize="12" fontFamily="monospace">
            {/* Width Dimension */}
            <motion.line
              x1="100" y1="80" x2="400" y2="80"
              stroke="#9BAE40" strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 1.8 }}
            />
            <motion.text
              x="250" y="70" textAnchor="middle"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}
            >
              32.50m
            </motion.text>
            
            {/* Length Dimension */}
            <motion.line
              x1="80" y1="100" x2="80" y2="350"
              stroke="#9BAE40" strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
            />
            <motion.text
              x="60" y="225" transform="rotate(-90 60 225)" textAnchor="middle"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.4 }}
            >
              24.00m
            </motion.text>

            {/* Target Crosshairs */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 2.6 }}>
              <circle cx="250" cy="200" r="4" fill="none" stroke="#9BAE40" strokeWidth="1" />
              <line x1="242" y1="200" x2="258" y2="200" stroke="#9BAE40" strokeWidth="1" />
              <line x1="250" y1="192" x2="250" y2="208" stroke="#9BAE40" strokeWidth="1" />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

export function HorizonBlueprint() {
  const t = useTranslations('Blueprint');
  const steps = t.raw('steps') as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const { registerScene } = useHorizonScene();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('blueprint', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 bg-transparent overflow-hidden">
      <HorizonFrame showGrid showLight>
        <motion.div style={{ opacity, y }} className="container mx-auto px-6">
          <div className="pointer-events-none absolute inset-x-0 top-16 hidden justify-center overflow-hidden lg:flex">
            <span className="font-display text-[180px] text-eai-brass/[0.035] leading-none">
              {t('backgroundWord')}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Blueprint Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] bg-eai-parchment/60 border border-eai-line overflow-hidden shadow-lg backdrop-blur-md"
            >
              <BlueprintSVG />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-eai-brass tracking-widest">
                {t('planNote')}
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <HorizonSectionLabel>
                  {t('label')}
                </HorizonSectionLabel>
              </motion.div>

              <motion.h2
                className="font-display text-display-md text-eai-ink leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('title')}
              </motion.h2>

              <motion.p
                className="font-body text-lg text-eai-warm-grey leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('description')}
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-eai-brass/60 w-6">{String(i + 1).padStart(2, '0')}</span>
                    <div className="w-16 h-px bg-eai-line" />
                    <span className="font-body text-sm uppercase tracking-[0.15em] text-eai-charcoal">{step}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </HorizonFrame>
    </section>
  );
}
