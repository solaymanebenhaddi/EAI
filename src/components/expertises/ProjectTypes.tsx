'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ProjectTypes() {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const types = t.raw('projectTypes') as Array<{
    title: string;
    description: string;
    expertises: string;
  }>;

  const bgImages = [
    '/images/expertises/architecture-conception.webp',
    '/images/expertises/bim-model.webp',
    '/images/expertises/interior-design.webp',
    '/images/expertises/urban-planning.webp',
    '/images/expertises/engineering-structure.webp',
  ];

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
              {t('projectTypesLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
            {t('projectTypesTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey max-w-2xl leading-relaxed">
            {t('projectTypesIntro')}
          </p>
        </motion.div>

        {/* Project type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-72 overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={bgImages[index % bgImages.length]}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-eai-ink/70 group-hover:bg-eai-ink/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <span className="font-display text-2xl text-eai-brass italic mb-2 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl text-eai-paper mb-3 leading-tight">
                  {type.title}
                </h3>
                <p className="font-body text-sm text-eai-parchment/70 leading-relaxed mb-4">
                  {type.description}
                </p>
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass-pale">
                  {type.expertises}
                </span>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-eai-brass/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
