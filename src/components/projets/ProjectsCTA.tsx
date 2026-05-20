'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

export function ProjectsCTA() {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const body = t.raw('ctaBody') as string;
  const paragraphs = body.split('\n\n');

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-eai-ink">
      {/* Architectural grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute left-1/4 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-eai-brass-pale" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                {t('ctaLabel')}
              </span>
              <div className="w-8 h-px bg-eai-brass-pale" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display text-display-md text-eai-paper leading-[0.95] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('ctaTitle')}
          </motion.h2>

          {/* Body */}
          <div className="flex flex-col gap-4 mb-12">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="font-body text-[15px] text-eai-parchment/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_click', { location: 'projets_final', label: 'contact' })}
              className="inline-block bg-eai-brass text-eai-ink px-10 py-5 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/expertises"
              onClick={() => trackEvent('cta_click', { location: 'projets_final', label: 'expertises' })}
              className="inline-block text-eai-parchment border-b border-eai-parchment/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
