'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export function FidiExperience() {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const thematicAreas = t.raw('fidiThematicAreas') as string[];
  const experiencePillars = t.raw('fidiExperiencePillars') as string[];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/50 overflow-hidden">
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
              {t('fidiLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
            {t('fidiTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
            {t('fidiBody')}
          </p>
        </motion.div>

        {/* Thematic areas - horizontal scroll */}
        <div className="mb-16">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass block mb-6">
            Univers thématiques
          </span>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            {thematicAreas.map((area, index) => {
              const images = [
                '/images/events/gallery-facade.webp',
                '/images/events/gallery-material.webp',
                '/images/events/gallery-interior.webp',
                '/images/events/gallery-plan.webp',
                '/images/events/gallery-light.webp',
                '/images/events/gallery-site.webp',
                '/images/events/workshops.webp',
                '/images/events/professional-networking.webp',
                '/images/events/exhibition-booths.webp',
                '/images/events/sustainable-construction.webp',
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-[60vw] md:w-[30vw] lg:w-[20vw] snap-start relative group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={images[index % images.length]}
                      alt={area}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-eai-ink/30 group-hover:bg-eai-ink/50 transition-colors duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass-pale">
                      {area}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Experience pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {experiencePillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="h-px w-8 bg-eai-brass/30 mx-auto mb-4" />
              <span className="font-body text-sm text-eai-charcoal uppercase tracking-wider">
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="https://events.eai-construction.com/fidi26/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-label uppercase tracking-widest text-eai-brass hover:text-eai-brass-soft transition-colors"
          >
            {t('fidiCta')}
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
