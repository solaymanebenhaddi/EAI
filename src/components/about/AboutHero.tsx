'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';

export function AboutHero() {
  const t = useTranslations('Apropos');
  const heroRef = useRef<HTMLElement>(null);
  const microList = t.raw('heroMicroList') as string[];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] min-h-[650px] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/hero-eai-studio.webp"
          alt="Studio d'architecture ELAOUAD avec plans et maquettes"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-eai-ink/75" />
      </div>

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[15%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[35%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[55%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[75%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[95%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-[25%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[50%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[75%] left-0 w-full h-px bg-eai-brass" />
      </div>

      {/* Location coordinates */}
      <div className="absolute top-20 right-12 hidden lg:flex flex-col gap-1 font-mono text-[9px] text-eai-brass-pale/40 tracking-wider">
        <span>33.5731 N</span>
        <span>7.5898 W</span>
        <span>CASABLANCA</span>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10 pb-24 lg:pb-32"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-eai-brass-pale" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
              {t('heroEyebrow')}
            </span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-display text-display-lg text-eai-paper leading-[0.9] mb-8 tracking-tight max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {t('heroTitle1')}
          <br />
          {t('heroTitle2')}
          <br />
          <span className="text-eai-brass-pale">{t('heroTitle3')}</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          className="font-body text-[15px] lg:text-[16px] text-eai-parchment/80 max-w-2xl mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t('heroBody')}
        </motion.p>

        <motion.p
          className="font-body text-[14px] text-eai-parchment/60 max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {t('heroSecondary')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            href="/expertises"
            onClick={() => trackEvent('cta_click', { location: 'about_hero', label: 'expertises' })}
            className="inline-flex items-center gap-3 bg-eai-brass text-eai-ink px-8 py-4 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
          >
            {t('heroCtaPrimary')}
          </Link>
          <Link
            href="/contact"
            onClick={() => trackEvent('cta_click', { location: 'about_hero', label: 'contact' })}
            className="inline-block text-eai-parchment border-b border-eai-parchment/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
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
              className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass-pale/60"
            >
              {item}{i < microList.length - 1 ? ' /' : ''}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
