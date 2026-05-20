'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function AboutCTA() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-eai-ink overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[25%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[40%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[55%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[85%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[60%] left-0 w-full h-px bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-eai-brass-pale" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                {t('ctaLabel')}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-display-lg text-eai-paper leading-[0.9] mb-8 tracking-tight">
              {t('ctaTitle1')}
              <br />
              <span className="text-eai-brass-pale">{t('ctaTitle2')}</span>
            </h2>

            {/* Body */}
            <p className="font-body text-[16px] text-eai-parchment/70 max-w-xl mb-12 leading-relaxed">
              {t('ctaBody')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-eai-brass text-eai-ink px-10 py-5 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/projets"
                className="inline-block text-eai-parchment border-b border-eai-parchment/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12 lg:border-l border-eai-parchment/10"
          >
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-parchment/40 block mb-2">
                  Email
                </span>
                <a
                  href="mailto:contact@eai-construction.com"
                  className="font-body text-[16px] text-eai-parchment/80 hover:text-eai-brass transition-colors"
                >
                  contact@eai-construction.com
                </a>
              </div>
              <div>
                <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-parchment/40 block mb-2">
                  Téléphone
                </span>
                <a
                  href="tel:+212520198738"
                  className="font-body text-[16px] text-eai-parchment/80 hover:text-eai-brass transition-colors"
                >
                  +212 520 19 87 38
                </a>
              </div>
              <div>
                <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-parchment/40 block mb-2">
                  Bureau
                </span>
                <span className="font-body text-[16px] text-eai-parchment/80">
                  Casablanca, Maroc
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
