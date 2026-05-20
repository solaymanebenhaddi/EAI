'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function MissionVisionValues() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const values = t.raw('valuesList') as string[];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('mvvLabel')}
            </span>
            <div className="w-8 h-px bg-eai-brass" />
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
            {t('mvvTitle')}
          </h2>
        </motion.div>

        {/* Three panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-eai-parchment/50 p-10 border border-eai-line"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-eai-brass block mb-6">
              {t('missionLabel')}
            </span>
            <h3 className="font-accent text-2xl text-eai-ink mb-6 italic leading-tight">
              {t('missionTitle')}
            </h3>
            <p className="font-body text-[14px] text-eai-warm-grey leading-relaxed">
              {t('missionBody')}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-eai-ink p-10"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-eai-brass-pale block mb-6">
              {t('visionLabel')}
            </span>
            <h3 className="font-accent text-2xl text-eai-paper mb-6 italic leading-tight">
              {t('visionTitle')}
            </h3>
            <p className="font-body text-[14px] text-eai-parchment/70 leading-relaxed">
              {t('visionBody')}
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative bg-eai-parchment/50 p-10 border border-eai-line"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-eai-brass block mb-6">
              {t('valuesLabel')}
            </span>
            <h3 className="font-accent text-2xl text-eai-ink mb-8 italic leading-tight">
              {t('valuesTitle')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value, i) => (
                <span
                  key={i}
                  className="font-body text-[11px] uppercase tracking-[0.15em] text-eai-brass bg-eai-brass/10 px-4 py-2 border border-eai-brass/20 hover:bg-eai-brass hover:text-eai-ink transition-colors duration-300 cursor-default"
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
