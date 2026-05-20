'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function EventsMission() {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper overflow-hidden">
      {/* Exhibition grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_120px] gap-12 lg:gap-16 items-start">
          {/* Label */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-eai-brass" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                  {t('missionLabel')}
                </span>
              </div>
              {/* Conference image */}
              <div className="hidden lg:block relative h-48 w-48 overflow-hidden mt-8">
                <div className="absolute inset-0 bg-eai-ink/20" />
                <img
                  src="/images/events/professional-networking.webp"
                  alt="Réseau professionnel lors d'un événement ELAOUAD Events"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-1">
            <motion.h2
              className="font-display text-display-md text-eai-ink leading-[0.95] mb-10 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('missionTitle')}
            </motion.h2>

            <div className="flex flex-col gap-6">
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('missionBody1')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('missionBody2')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('missionBody3')}
              </motion.p>
            </div>
          </div>

          {/* Pull quote */}
          <motion.div
            className="lg:col-span-1 relative pl-6 border-l-2 border-eai-brass/40"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <blockquote className="font-accent text-[18px] lg:text-[20px] text-eai-ink leading-relaxed italic">
              {t('missionQuote')}
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
