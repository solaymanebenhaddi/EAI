'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { HorizonMagneticButton } from './HorizonMagneticButton';
import { useHorizonScene } from './HorizonSceneContext';

export function HorizonFinalCTA() {
  const t = useTranslations('CallToAction');
  const headlineLines = t.raw('headlineLines') as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'finalCTA';

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('finalCTA', entry.intersectionRatio);
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

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      {/* Architectural converging lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 w-px h-full bg-eai-brass/10" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-eai-brass/10" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-eai-brass/10" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-eai-brass/10" />
      </div>

      <HorizonFrame showGrid={false} showLight>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <HorizonSectionLabel className="mb-12 justify-center">
              {t('label')}
            </HorizonSectionLabel>
          </motion.div>

          <motion.h2
            className="font-display text-display-xl text-eai-ink leading-[0.92] tracking-[-0.03em] mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headlineLines.map((line, index) => (
              <span key={line} className={`block ${index === 1 ? 'text-eai-brass' : ''}`}>
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HorizonMagneticButton>
              <Link
                href="/contact"
                onClick={() => trackEvent('cta_click', { location: 'final_cta', label: 'contact' })}
                className="flex items-center justify-center bg-eai-ink text-white px-12 py-5 rounded-full font-body text-label uppercase tracking-widest hover:bg-eai-charcoal transition-all duration-500 shadow-2xl shadow-eai-ink/30 border border-white/10"
              >
                {t('primaryCta')}
              </Link>
            </HorizonMagneticButton>
            <HorizonMagneticButton>
              <Link
                href="/projets"
                onClick={() => trackEvent('cta_click', { location: 'final_cta', label: 'process' })}
                className="flex items-center justify-center gap-4 px-10 py-5 rounded-full font-body text-label text-eai-charcoal uppercase tracking-widest group bg-white/20 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <span className="w-8 h-[1px] bg-eai-charcoal/40 group-hover:w-12 group-hover:bg-eai-brass transition-all duration-500" />
                {t('secondaryCta')}
              </Link>
            </HorizonMagneticButton>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 font-body text-label text-eai-warm-grey uppercase tracking-[0.15em] bg-eai-paper/40 backdrop-blur-sm py-8 px-12 border border-eai-line shadow-sm"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-eai-brass mb-1">{t('email')}</span>
              <a href="mailto:contact@eai-construction.com" className="hover:text-eai-brass transition-colors">
                contact@eai-construction.com
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-eai-brass mb-1">{t('phone')}</span>
              <a href="tel:+212520198738" className="hover:text-eai-brass transition-colors">
                +212 520 19 87 38
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-eai-brass mb-1">{t('office')}</span>
              <span>{t('officeValue')}</span>
            </div>
          </motion.div>
        </div>
      </HorizonFrame>
    </section>
  );
}
