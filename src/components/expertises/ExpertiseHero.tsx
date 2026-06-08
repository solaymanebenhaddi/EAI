'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

export function ExpertiseHero() {
  const t = useTranslations('Expertises');
  const heroRef = useRef<HTMLElement>(null);
  const microList = t.raw('heroMicroList') as string[];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-eai-paper"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-[20%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[40%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[60%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[80%] left-0 w-full h-px bg-eai-brass" />
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-16 left-12 w-20 h-20 border-l border-t border-eai-brass/15 hidden lg:block" />
      <div className="absolute bottom-16 right-12 w-20 h-20 border-r border-b border-eai-brass/15 hidden lg:block" />

      {/* Technical coordinate decoration */}
      <div className="absolute top-20 right-20 hidden lg:flex flex-col gap-1 font-mono text-[9px] text-eai-brass/30 tracking-wider">
        <span>EXP-001</span>
        <span>33.5731 N</span>
        <span>7.5898 W</span>
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10 pt-32 lg:pt-40"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-eai-brass" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                  {t('heroEyebrow')}
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-display text-display-lg text-eai-ink leading-[0.9] mb-8 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="block">{t('heroTitle1')}</span>
              <span className="block text-eai-brass">{t('heroTitle2')}</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              className="font-body text-[17px] lg:text-lg text-eai-warm-grey max-w-2xl mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('heroBody')}
            </motion.p>

            <motion.p
              className="font-body text-[15px] text-eai-warm-grey/80 max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t('heroSecondary')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link
                href="/contact"
                onClick={() => trackEvent('cta_click', { location: 'expertises_hero', label: 'contact' })}
                className="inline-block bg-eai-ink text-eai-paper px-8 py-4 font-body text-label uppercase tracking-widest hover:bg-eai-charcoal transition-all duration-500 shadow-xl shadow-eai-ink/20"
              >
                {t('heroCtaPrimary')}
              </Link>
              <Link
                href="/projets"
                onClick={() => trackEvent('cta_click', { location: 'expertises_hero', label: 'projects' })}
                className="inline-block text-eai-charcoal border-b border-eai-charcoal/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
              >
                {t('heroCtaSecondary')}
              </Link>
            </motion.div>

            {/* Micro list */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {microList.map((item, i) => (
                <span
                  key={i}
                  className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass/60"
                >
                  {item}{i < microList.length - 1 ? ' /' : ''}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[50vh] lg:h-[70vh] w-full bg-eai-stone-light/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-eai-paper/60 via-transparent to-transparent z-10" />
              <Image
                src="/images/expertises/expertise-hero-architecture-engineering.webp"
                alt={t('heroImageAlt')}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Backing frame */}
            <div className="absolute -inset-3 border border-eai-brass/15 -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
