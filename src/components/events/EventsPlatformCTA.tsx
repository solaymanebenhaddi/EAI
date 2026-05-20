'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

export function EventsPlatformCTA() {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-eai-ink">
      {/* Architectural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute left-1/4 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
                {t('platformLabel')}
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
            {t('platformTitle')}
          </motion.h2>

          {/* Body */}
          <motion.p
            className="font-body text-[15px] text-eai-parchment/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('platformBody')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="https://events.eai-construction.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('external_link', { destination: 'events_platform', location: 'final_cta' })}
              className="inline-flex items-center gap-3 bg-eai-brass text-eai-ink px-10 py-5 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
            >
              {t('platformCtaPrimary')}
              <ExternalLink size={14} />
            </a>
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_click', { location: 'events_final', label: 'partnership' })}
              className="inline-block text-eai-parchment border-b border-eai-parchment/30 pb-1 font-body text-label uppercase tracking-widest hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
            >
              {t('platformCtaSecondary')}
            </Link>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 font-body text-label text-eai-parchment/50 uppercase tracking-[0.15em]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-eai-brass-pale/60">Email</span>
              <a href="mailto:contact@eai-construction.com" className="hover:text-eai-brass transition-colors text-sm normal-case tracking-normal">
                contact@eai-construction.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-eai-brass-pale/60">Téléphone</span>
              <a href="tel:+212520198738" className="hover:text-eai-brass transition-colors text-sm normal-case tracking-normal">
                +212 520 19 87 38
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-eai-brass-pale/60">WhatsApp</span>
              <a href="tel:+212666798536" className="hover:text-eai-brass transition-colors text-sm normal-case tracking-normal">
                +212 666 79 85 36
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-eai-brass-pale/60">Bureau</span>
              <span className="text-sm normal-case tracking-normal">Casablanca, Maroc</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
