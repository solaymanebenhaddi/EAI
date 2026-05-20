'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function ExpertiseMatrix() {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const phases = t.raw('matrixPhases') as Array<{
    number: string;
    phase: string;
    objective: string;
    deliverables: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('matrixLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
            {t('matrixTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey max-w-2xl leading-relaxed">
            {t('matrixIntro')}
          </p>
        </motion.div>

        {/* Desktop matrix */}
        <div className="hidden lg:block">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-6 pb-4 border-b border-eai-brass/20 mb-2">
            <div className="col-span-1">
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass">
                {t('matrixPhaseLabel')}
              </span>
            </div>
            <div className="col-span-3">
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass">
                {t('matrixObjectiveLabel')}
              </span>
            </div>
            <div className="col-span-8">
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass">
                {t('matrixDeliverablesLabel')}
              </span>
            </div>
          </div>

          {/* Phase rows */}
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-12 gap-6 py-6 border-b border-eai-line hover:bg-eai-paper/60 transition-colors px-2 -mx-2"
            >
              <div className="col-span-1">
                <span className="font-display text-2xl text-eai-brass italic">{phase.number}</span>
              </div>
              <div className="col-span-3">
                <h4 className="font-display text-lg text-eai-ink mb-2">{phase.phase}</h4>
                <p className="font-body text-sm text-eai-warm-grey">{phase.objective}</p>
              </div>
              <div className="col-span-8">
                <p className="font-body text-sm text-eai-charcoal leading-relaxed">
                  {phase.deliverables}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="lg:hidden flex flex-col gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-eai-line bg-eai-paper/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-xl text-eai-brass italic">{phase.number}</span>
                  <span className="font-display text-lg text-eai-ink">{phase.phase}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-eai-brass transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-eai-line pt-4">
                      <p className="font-body text-sm text-eai-warm-grey mb-3">
                        {phase.objective}
                      </p>
                      <p className="font-body text-sm text-eai-charcoal leading-relaxed">
                        {phase.deliverables}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
