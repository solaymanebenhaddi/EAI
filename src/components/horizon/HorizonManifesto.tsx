'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { CountUp } from '@/components/ui/CountUp';
import { getLocalizedStats, manifestoStats, type Locale } from '@/data/site';
import { useHorizonScene } from './HorizonSceneContext';

export function HorizonManifesto({ locale }: { locale: Locale }) {
  const t = useTranslations('Manifesto');
  const manifestoLines = t.raw('lines') as string[];
  const stats = getLocalizedStats(manifestoStats, locale);
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'manifesto';
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('manifesto', entry.intersectionRatio);
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

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]);
  const backgroundWordX = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      <motion.div className="absolute inset-0 bg-eai-stone-light/10 backdrop-blur-[2px]" style={{ opacity: bgOpacity }} />
      
      {/* Giant Background Word with smooth scroll-linked drift */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span 
          style={{ x: backgroundWordX }}
          className="font-display text-[200px] lg:text-[400px] text-eai-brass/[0.03] leading-none select-none whitespace-nowrap uppercase tracking-widest"
        >
          {t('backgroundWord')}
        </motion.span>
      </div>

      <HorizonFrame showGrid={false} showLight>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Left - Label */}
            <div className="flex flex-col justify-start">
              <HorizonSectionLabel className="mb-6">
                {t('label')}
              </HorizonSectionLabel>
              <p className="font-body text-sm uppercase tracking-[0.2em] text-eai-warm-grey/70 max-w-[200px] leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Right - Manifesto + Stats */}
            <div className="flex flex-col">
              {/* Manifesto Lines */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-20 lg:mb-32"
              >
                {manifestoLines.map((line, index) => (
                  <h2
                    key={line}
                    className={`font-display text-display-lg italic leading-[0.95] ${
                      index === 0 ? 'mb-6 text-eai-ink' : 'text-eai-brass'
                    }`}
                  >
                    {line}
                  </h2>
                ))}
              </motion.div>

              {/* Stats Grid with dynamic interactive spring hovers */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-16">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: isActive ? 0.4 + i * 0.1 : 0 }}
                    whileHover={{ y: -8, scale: 1.04 }}
                    className="flex flex-col cursor-pointer p-6 border border-transparent hover:border-eai-brass/10 hover:bg-eai-brass/[0.02] transition-all duration-300 rounded shadow-none hover:shadow-lg backdrop-blur-none hover:backdrop-blur-sm"
                  >
                    <span className="font-display text-5xl lg:text-6xl text-eai-ink leading-none mb-4">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="font-body text-[10px] text-eai-brass uppercase tracking-[0.15em]">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </HorizonFrame>
    </section>
  );
}
