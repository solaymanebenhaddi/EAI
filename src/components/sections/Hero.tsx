'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { trackEvent } from '@/lib/analytics';

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
      {/* Vertical lines */}
      <div className="absolute left-[20%] top-0 w-px h-full bg-brass" />
      <div className="absolute left-[40%] top-0 w-px h-full bg-brass" />
      <div className="absolute left-[60%] top-0 w-px h-full bg-brass" />
      <div className="absolute left-[80%] top-0 w-px h-full bg-brass" />
      {/* Horizontal lines */}
      <div className="absolute top-[25%] left-0 w-full h-px bg-brass" />
      <div className="absolute top-[50%] left-0 w-full h-px bg-brass" />
      <div className="absolute top-[75%] left-0 w-full h-px bg-brass" />
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-linen/50">
        Défiler
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-brass/60 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function ProofStats({ locale }: { locale: string }) {
  const t = useTranslations('Hero');
  const stats = [
    { value: '100+', label: t('projectsStat') },
    { value: '10K+', label: t('visitorsStat') },
    { value: '4', label: t('continentsStat') },
  ];

  return (
    <div className="flex gap-8 lg:gap-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1"
        >
          <span className="font-display text-2xl lg:text-3xl text-brass">{stat.value}</span>
          <span className="font-body text-[10px] uppercase tracking-[0.15em] text-linen/60">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('Hero');
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: '-10%' });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* Background Grid */}
      <AnimatedGrid />

      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30 z-10" />
        <img
          src="/images/hero.webp"
          alt="ELAOUAD Architecture"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
      </motion.div>

      {/* Decorative Corner Lines */}
      <div className="absolute top-24 left-12 w-16 h-16 border-l border-t border-brass/20 hidden lg:block" />
      <div className="absolute bottom-24 right-12 w-16 h-16 border-r border-b border-brass/20 hidden lg:block" />

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-20 pt-32"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-brass" />
              <span className="font-body text-label uppercase tracking-[0.25em] text-linen/80">
                {t('location')}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-display text-display-xl leading-[0.85] text-parchment mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {[t('titleLine1'), t('titleLine2'), t('titleLine3')].map((line, i) => (
              <motion.span
                key={i}
                className="block overflow-hidden"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
              >
                <span className={i === 1 ? 'text-brass' : ''}>{line}</span>
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="font-body text-lg lg:text-xl text-linen/70 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <MagneticButton>
              <Link
                href="/projets"
                onClick={() => trackEvent('cta_click', { location: 'hero', label: 'projects' })}
                className="block bg-brass text-void px-10 py-5 text-label uppercase tracking-widest hover:bg-brass-glow transition-all duration-500 shadow-xl shadow-brass/10"
              >
                {t('primaryCta')}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                onClick={() => trackEvent('cta_click', { location: 'hero', label: 'consultation' })}
                className="block text-parchment border-b border-linen/30 pb-1 text-label uppercase tracking-widest hover:border-brass hover:text-brass transition-all duration-300"
              >
                {t('secondaryCta')}
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Proof Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <ProofStats locale={locale} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Cue */}
      <ScrollCue />
    </section>
  );
}
