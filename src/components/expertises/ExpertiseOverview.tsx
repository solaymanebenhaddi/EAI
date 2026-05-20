'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function ExpertiseOverview() {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const cards = t.raw('expertiseCards') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const images = [
    '/images/expertises/architecture-conception.webp',
    '/images/expertises/engineering-structure.webp',
    '/images/expertises/bim-model.webp',
    '/images/expertises/construction-coordination.webp',
    '/images/expertises/interior-design.webp',
    '/images/expertises/urban-planning.webp',
    '/images/expertises/topography-site.webp',
    '/images/expertises/amo-strategy.webp',
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
              {t('overviewLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
            {t('overviewTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey max-w-2xl leading-relaxed">
            {t('overviewIntro')}
          </p>
        </motion.div>

        {/* Cards grid - asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative bg-eai-parchment/40 border border-eai-line overflow-hidden hover:border-eai-brass/30 transition-all duration-500 ${
                index === 0 || index === 5 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image thumbnail */}
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-eai-ink/30 group-hover:bg-eai-ink/20 transition-colors duration-500 z-10" />
                <img
                  src={images[index]}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-2xl text-eai-brass italic">{card.number}</span>
                  <div className="flex-1 h-px bg-eai-brass/20" />
                </div>
                <h3 className="font-display text-xl text-eai-ink mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-eai-warm-grey leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('discoverLabel')}
                  <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
