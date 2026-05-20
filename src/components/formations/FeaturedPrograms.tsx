'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export function FeaturedPrograms() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const programs = t.raw('featuredPrograms') as Array<{
    slug: string;
    title: string;
    category: string;
    description: string;
    outcomes: string[];
    image: string;
    alt: string;
    externalUrl: string;
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
              {t('programsLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
            {t('programsTitle')}
          </h2>
        </motion.div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.article
              key={program.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-eai-paper border border-eai-line hover:border-eai-brass/30 transition-colors duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-eai-ink/0 group-hover:bg-eai-ink/30 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-eai-brass block mb-2">
                  {program.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg text-eai-ink mb-3 leading-tight">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-eai-warm-grey leading-relaxed mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* Outcomes */}
                <div className="mb-4">
                  <span className="font-body text-[9px] uppercase tracking-[0.15em] text-eai-warm-grey/60 block mb-2">
                    Compétences
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {program.outcomes.slice(0, 3).map((outcome, i) => (
                      <span
                        key={i}
                        className="font-body text-[9px] text-eai-charcoal/70 bg-eai-parchment/60 px-2 py-1 border border-eai-line/50"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={program.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors group/link"
                >
                  Voir sur EAI Courses
                  <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
