'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

type FilterKey = 'all' | 'upcoming' | 'design' | 'construction' | 'sustainability' | 'bim' | 'conferences';

interface EventData {
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: 'upcoming' | 'past';
  description: string;
  filterKeys: string[];
  image: string;
  alt: string;
  externalUrl: string;
}

interface EventsEcosystemProps {
  events: EventData[];
}

export function EventsEcosystem({ events }: EventsEcosystemProps) {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filterLabels: Record<FilterKey, string> = {
    all: t('filterAll'),
    upcoming: t('filterUpcoming'),
    design: t('filterDesign'),
    construction: t('filterConstruction'),
    sustainability: t('filterSustainability'),
    bim: t('filterBIM'),
    conferences: t('filterConferences'),
  };

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((e) => e.filterKeys.includes(activeFilter));

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('ecosystemLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-8 tracking-tight">
            {t('ecosystemTitle')}
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 pb-6 border-b border-eai-line">
            {(Object.keys(filterLabels) as FilterKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`font-body text-[10px] uppercase tracking-[0.16em] transition-all duration-300 pb-1 border-b-2 ${
                  activeFilter === key
                    ? 'text-eai-brass border-eai-brass'
                    : 'text-eai-warm-grey/60 border-transparent hover:text-eai-charcoal hover:border-eai-brass/30'
                }`}
              >
                {filterLabels[key]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.article
                key={event.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden bg-eai-parchment/40 border border-eai-line hover:border-eai-brass/30 transition-colors duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-eai-ink/0 group-hover:bg-eai-ink/40 transition-colors duration-500" />

                  {/* Status badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 font-body text-[9px] uppercase tracking-widest ${
                    event.status === 'upcoming'
                      ? 'bg-eai-brass text-eai-ink'
                      : 'bg-eai-ink/60 text-eai-parchment backdrop-blur-sm'
                  }`}>
                    {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                  </div>

                  {/* External link reveal */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-eai-brass flex items-center justify-center">
                      <ExternalLink size={14} className="text-eai-ink" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="font-body text-[9px] uppercase tracking-[0.2em] text-eai-brass block mb-2">
                    {event.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl text-eai-ink mb-3 leading-tight">
                    {event.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body text-[10px] uppercase tracking-[0.12em] text-eai-warm-grey/60">
                      {event.date}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.12em] text-eai-warm-grey/40">
                      {event.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-eai-warm-grey leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={event.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors group/link"
                  >
                    Voir sur EAI Events
                    <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="font-body text-[15px] text-eai-warm-grey/60">
              Aucun événement dans cette catégorie pour le moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
