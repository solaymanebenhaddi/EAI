'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ExpertiseApproach() {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-eai-brass" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                {t('approachLabel')}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display text-display-md text-eai-ink leading-[0.95] mb-12 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('approachTitle')}
          </motion.h2>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('approachBody1')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('approachBody2')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('approachBody3')}
              </motion.p>
            </div>

            {/* Pull quote */}
            <motion.div
              className="relative pl-6 border-l-2 border-eai-brass/40"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <blockquote className="font-accent text-[18px] lg:text-[20px] text-eai-ink leading-relaxed italic">
                {t('approachQuote')}
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
