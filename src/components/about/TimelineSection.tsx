'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function TimelineSection() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const steps = t.raw('timelineSteps') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-eai-brass" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                {t('timelineLabel')}
              </span>
            </div>
            <h2 className="font-display text-display-sm text-eai-ink leading-[0.95] tracking-tight">
              {t('timelineTitle')}
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical brass line */}
            <div className="absolute left-[27px] sm:left-[27px] top-0 bottom-0 w-px bg-eai-brass/20 hidden sm:block" />

            <div className="flex flex-col gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-8 pl-0 sm:pl-16"
                >
                  {/* Number dot */}
                  <div className="shrink-0 w-14 h-14 flex items-center justify-center bg-eai-paper border border-eai-brass/30 z-10">
                    <span className="font-display text-lg text-eai-brass italic">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl text-eai-ink mb-2">{step.title}</h3>
                    <p className="font-body text-[14px] text-eai-warm-grey leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
