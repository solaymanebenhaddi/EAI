'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function DifferentiationSection() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const blocks = t.raw('diffBlocks') as Array<{
    number: string;
    title: string;
    description: string;
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
              {t('diffLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight mb-6">
            {t('diffTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
            {t('diffIntro')}
          </p>
        </motion.div>

        {/* Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-6">
          {blocks.map((block, index) => (
            <motion.div
              key={block.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-eai-ink p-8 hover:bg-eai-taupe transition-colors duration-500"
            >
              {/* Number */}
              <span className="font-display text-3xl text-eai-brass/30 italic block mb-6">
                {block.number}
              </span>

              {/* Divider */}
              <div className="h-px w-12 bg-eai-brass/30 mb-6 group-hover:w-20 transition-all duration-500" />

              {/* Title */}
              <h3 className="font-display text-lg text-eai-paper mb-4 leading-tight">
                {block.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-eai-parchment/60 leading-relaxed">
                {block.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
