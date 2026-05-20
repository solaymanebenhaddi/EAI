'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { HorizonFrame } from './HorizonFrame';
import { HorizonGrid } from './HorizonGrid';
import { HorizonMagneticButton } from './HorizonMagneticButton';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { trackEvent } from '@/lib/analytics';
import { useHorizonScene } from './HorizonSceneContext';

function ProofStats({ isActive }: { isActive: boolean }) {
  const t = useTranslations('Hero');
  const stats = [
    { value: '100+', label: t('projectsStat') },
    { value: '10K+', label: t('visitorsStat') },
    { value: '4', label: t('continentsStat') },
  ];

  return (
    <div className="flex bg-eai-paper/80 backdrop-blur-md border border-eai-brass/20 rounded-sm shadow-sm inline-flex">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: isActive ? 1.2 + i * 0.1 : 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col py-3 px-6 ${i !== stats.length - 1 ? 'border-r border-eai-brass/10' : ''}`}
        >
          <span className="font-body text-[9px] uppercase tracking-[0.2em] text-eai-warm-grey mb-1">{stat.label}</span>
          <span className="font-display text-xl text-eai-ink">{stat.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function HorizonHero() {
  const t = useTranslations('Hero');
  const heroRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'hero';
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('hero', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Light layout grid */}
      <HorizonGrid />
      
      {/* Brass Axis Guidelines */}
      <div className="absolute left-12 top-0 w-px h-full bg-eai-brass/10 hidden lg:block" />
      <div className="absolute right-12 top-0 w-px h-full bg-eai-brass/10 hidden lg:block" />

      {/* Main Content */}
      <HorizonFrame showGrid={false} showLight={false} horizonLine={false}>
        <motion.div 
          className="container mx-auto px-6 relative z-20 pt-32 lg:pt-40"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Glass Presentation Board Container */}
          <div className="relative max-w-4xl lg:max-w-5xl bg-eai-paper/50 backdrop-blur-xl border border-white/40 shadow-2xl rounded-sm p-10 lg:p-16">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none rounded-sm" />
            
            <div className="relative z-10">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <HorizonSectionLabel>
                  {t('location')}
                </HorizonSectionLabel>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                className="font-display text-[70px] md:text-[100px] lg:text-[130px] leading-[0.85] text-eai-ink mb-10 tracking-tight"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                {[t('titleLine1'), t('titleLine2'), t('titleLine3')].map((line, i) => (
                  <motion.span
                    key={i}
                    className="block overflow-hidden"
                    initial={{ y: '100%', rotateX: 20 }}
                    animate={isActive ? { y: 0, rotateX: 0 } : { y: '100%', rotateX: 20 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
                  >
                    <span className={i === 1 ? 'text-eai-brass' : ''}>{line}</span>
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="font-body text-lg lg:text-xl text-eai-charcoal max-w-xl mb-12 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t('description')}
              </motion.p>

              {/* CTAs */}
              <motion.div 
                className="flex flex-wrap items-center gap-8 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <HorizonMagneticButton>
                  <Link
                    href="/projets"
                    onClick={() => trackEvent('cta_click', { location: 'hero', label: 'projects' })}
                    className="flex items-center justify-center bg-eai-ink text-eai-paper px-8 py-4 rounded-full text-label uppercase tracking-widest hover:bg-eai-charcoal transition-all duration-500 shadow-xl shadow-eai-ink/20"
                  >
                    {t('primaryCta')}
                  </Link>
                </HorizonMagneticButton>
                <HorizonMagneticButton>
                  <Link
                    href="/contact"
                    onClick={() => trackEvent('cta_click', { location: 'hero', label: 'consultation' })}
                    className="block text-eai-charcoal border-b border-eai-charcoal/30 pb-1 text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
                  >
                    {t('secondaryCta')}
                  </Link>
                </HorizonMagneticButton>
              </motion.div>

              {/* Proof Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="pt-8 border-t border-eai-brass/10"
              >
                <ProofStats isActive={isActive} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </HorizonFrame>

      {/* Scroll Cue */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-warm-grey/50">
          {t('scroll')}
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-eai-brass/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
