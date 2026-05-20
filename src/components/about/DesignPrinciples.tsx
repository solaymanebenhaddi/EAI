'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function DesignPrinciples() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const principles = t.raw('designPrinciples') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass-pale" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
              {t('principlesLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] tracking-tight">
            {t('principlesTitle')}
          </h2>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-eai-parchment/5 border border-eai-parchment/10 p-10 hover:border-eai-brass/30 transition-colors duration-500">
                {/* Number */}
                <span className="font-display text-4xl text-eai-brass/20 italic block mb-6">
                  {principle.number}
                </span>

                {/* Divider */}
                <div className="h-px w-16 bg-eai-brass/30 mb-6 group-hover:w-24 transition-all duration-500" />

                {/* Title */}
                <h3 className="font-display text-2xl text-eai-paper mb-4 leading-tight">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[14px] text-eai-parchment/60 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
