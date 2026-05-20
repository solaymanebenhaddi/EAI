'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export function TrainingCategories() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const categories = t.raw('categories') as Array<{
    number: string;
    title: string;
    description: string;
    courses: string[];
    image: string;
    externalUrl: string;
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
              {t('categoriesLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] mb-6 tracking-tight">
            {t('categoriesTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed">
            {t('categoriesIntro')}
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.number}
              href={category.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-eai-parchment/5 border border-eai-parchment/10 hover:border-eai-brass/30 transition-colors duration-500"
            >
              {/* Background image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-eai-ink/50 group-hover:bg-eai-ink/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Number */}
                <span className="font-display text-3xl text-eai-brass/30 italic block mb-4">
                  {category.number}
                </span>

                {/* Divider */}
                <div className="h-px w-12 bg-eai-brass/30 mb-4 group-hover:w-20 transition-all duration-500" />

                {/* Title */}
                <h3 className="font-display text-xl text-eai-paper mb-3 leading-tight">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-eai-parchment/70 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Courses list */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.courses.slice(0, 5).map((course, i) => (
                    <span
                      key={i}
                      className="font-body text-[9px] uppercase tracking-[0.1em] text-eai-parchment/50 bg-eai-parchment/5 px-2 py-1 border border-eai-parchment/10"
                    >
                      {course}
                    </span>
                  ))}
                  {category.courses.length > 5 && (
                    <span className="font-body text-[9px] uppercase tracking-[0.1em] text-eai-brass-pale/50">
                      +{category.courses.length - 5}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass group-hover:text-eai-brass-soft transition-colors">
                  Voir les formations
                  <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
