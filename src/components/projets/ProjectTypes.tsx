'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ProjectTypes() {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const types = t.raw('types') as Array<{
    title: string;
    description: string;
    expertises: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
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
              {t('typesLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
            {t('typesTitle')}
          </h2>
        </motion.div>

        {/* Types grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-eai-ink p-8 lg:p-10 border border-eai-ink hover:border-eai-brass/30 transition-colors duration-500"
            >
              {/* Number */}
              <span className="font-display text-3xl text-eai-brass/30 italic block mb-6">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Divider */}
              <div className="h-px w-12 bg-eai-brass/30 mb-6 group-hover:w-20 transition-all duration-500" />

              {/* Title */}
              <h3 className="font-display text-2xl text-eai-paper mb-4 leading-tight">
                {type.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-eai-parchment/70 leading-relaxed mb-6">
                {type.description}
              </p>

              {/* Expertises */}
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass-pale/60">
                {type.expertises}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
