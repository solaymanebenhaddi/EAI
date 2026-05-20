'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ExternalLink } from 'lucide-react';

export function FormationsCTA() {
  const t = useTranslations('Formations');
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

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-px bg-eai-brass-pale" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
              {t('ctaLabel')}
            </span>
            <div className="w-10 h-px bg-eai-brass-pale" />
          </div>

          {/* Title */}
          <h2 className="font-display text-display-lg text-eai-paper leading-[0.9] mb-8 tracking-tight">
            {t('ctaTitle')}
          </h2>

          {/* Body */}
          <p className="font-body text-[16px] text-eai-parchment/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('ctaBody')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://courses.eai-construction.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-eai-brass text-eai-ink px-10 py-5 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
            >
              {t('ctaPrimary')}
              <ExternalLink size={14} />
            </a>
            <Link
              href="/contact"
              className="inline-block text-eai-parchment border-b border-eai-parchment/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
