'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

export function FormationsBridge() {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const body = t.raw('formationsBody') as string;
  const paragraphs = body.split('\n\n');

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-24 bg-eai-ink">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-eai-ink/40 z-10" />
              <img
                src="/images/expertises/material-detail.webp"
                alt="Formation professionnelle en architecture et construction"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-eai-brass-pale" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                  {t('formationsLabel')}
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="font-display text-display-sm text-eai-paper leading-[0.95] mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('formationsTitle')}
            </motion.h2>

            <div className="flex flex-col gap-4 mb-10">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="font-body text-[15px] text-eai-parchment/70 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/formations"
                onClick={() => trackEvent('cta_click', { location: 'expertises_formations', label: 'formations' })}
                className="inline-flex items-center gap-3 font-body text-label uppercase tracking-widest text-eai-brass-pale hover:text-eai-brass transition-colors border-b border-eai-brass-pale/30 pb-1 hover:border-eai-brass"
              >
                {t('formationsCta')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
