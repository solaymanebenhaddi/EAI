'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

function BlueprintLines() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
      {/* Architectural grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 w-px h-full bg-brass"
          style={{ left: `${(i + 1) * 8.33}%` }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 w-full h-px bg-brass"
          style={{ top: `${(i + 1) * 12.5}%` }}
        />
      ))}
    </div>
  );
}

function ShutterWord({ word, delay = 0 }: { word: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.span
        className="font-display text-display-lg text-parchment/5 block"
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {word}
      </motion.span>
    </div>
  );
}

export function CinematicBlueprint() {
  const t = useTranslations('Blueprint');
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section ref={sectionRef} className="relative py-48 bg-void overflow-hidden">
      <BlueprintLines />
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        {/* Giant Background Shutter Words */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="flex gap-16 lg:gap-32 opacity-[0.03]">
            <ShutterWord word="VISION" delay={0} />
            <ShutterWord word="STRUCTURE" delay={0.2} />
            <ShutterWord word="MATIÈRE" delay={0.4} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Blueprint Visual */}
          <RevealOnScroll>
            <div className="relative aspect-[4/3] bg-stone/50 border border-ash/30 overflow-hidden">
              {/* Blueprint SVG */}
              <svg viewBox="0 0 400 300" className="w-full h-full opacity-30">
                {/* Grid */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line key={`vg-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="#C4A052" strokeWidth="0.3" />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line key={`hg-${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#C4A052" strokeWidth="0.3" />
                ))}
                {/* Building outline */}
                <rect x="100" y="80" width="200" height="140" fill="none" stroke="#C4A052" strokeWidth="1.5" />
                <line x1="100" y1="150" x2="300" y2="150" stroke="#C4A052" strokeWidth="0.8" />
                <line x1="200" y1="80" x2="200" y2="220" stroke="#C4A052" strokeWidth="0.8" />
                {/* Dimension lines */}
                <line x1="100" y1="240" x2="300" y2="240" stroke="#C4A052" strokeWidth="0.5" />
                <line x1="100" y1="235" x2="100" y2="245" stroke="#C4A052" strokeWidth="0.5" />
                <line x1="300" y1="235" x2="300" y2="245" stroke="#C4A052" strokeWidth="0.5" />
                <text x="200" y="255" textAnchor="middle" fill="#C4A052" fontSize="10" fontFamily="monospace">24.00m</text>
              </svg>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
              
              {/* Annotation */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-brass/60 tracking-widest">
                PLAN DE MASSE — ÉCHELLE 1:100
              </div>
            </div>
          </RevealOnScroll>

          {/* Right - Content */}
          <div className="flex flex-col gap-8">
            <RevealOnScroll>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-brass" />
                <span className="font-body text-label uppercase tracking-[0.25em] text-linen/60">
                  {t('label')}
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <h2 className="font-display text-display-md text-parchment leading-[0.9]">
                {t('title')}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <p className="font-body text-lg text-linen/70 leading-relaxed max-w-lg">
                {t('description')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.6}>
              <div className="flex flex-col gap-4 pt-4">
                {['Vision', 'Structure', 'Matière', 'Lumière'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-brass/60 w-6">{String(i + 1).padStart(2, '0')}</span>
                    <div className="w-16 h-px bg-ash/50" />
                    <span className="font-body text-sm uppercase tracking-[0.15em] text-linen/80">{step}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
