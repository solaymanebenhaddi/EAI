'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';

export function FeaturedProject() {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' });

  const concept = t.raw('featuredConcept') as string;
  const paragraphs = concept.split('\n\n');
  const ideas = t.raw('featuredIdeas') as string[];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/40 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('featuredLabel')}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image - 65% */}
          <motion.div
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden group">
              <img
                src="/images/projects/villa-privee-casablanca.webp"
                alt={t('featuredImageAlt')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eai-parchment/40 via-transparent to-transparent" />
            </div>
            {/* Frame */}
            <div className="absolute -inset-2 border border-eai-brass/10 -z-10 hidden lg:block" />
          </motion.div>

          {/* Editorial panel - 35% */}
          <motion.div
            className="lg:col-span-4 lg:-ml-12 relative z-10"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-eai-paper/95 backdrop-blur-xl border border-eai-line shadow-2xl p-8 lg:p-10">
              {/* Project number */}
              <span className="font-display text-5xl text-eai-brass/20 italic block mb-4">01</span>

              {/* Title */}
              <h3 className="font-display text-2xl lg:text-3xl text-eai-ink mb-4 leading-tight">
                {t('featuredTitle')}
              </h3>

              {/* Meta */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass">
                  {t('featuredCategory')}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-warm-grey/60">
                  {t('featuredLocation')} · {t('featuredYear')}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-warm-grey/50">
                  {t('featuredStatus')}
                </span>
              </div>

              {/* Concept */}
              <div className="flex flex-col gap-4 mb-8">
                {paragraphs.map((para, i) => (
                  <p key={i} className="font-body text-sm text-eai-warm-grey leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key ideas */}
              <div className="mb-8">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass block mb-3">
                  Idées clés
                </span>
                <div className="flex flex-wrap gap-2">
                  {ideas.map((idea, i) => (
                    <span
                      key={i}
                      className="font-body text-[10px] uppercase tracking-[0.1em] text-eai-charcoal bg-eai-parchment/80 px-3 py-1.5 border border-eai-line"
                    >
                      {idea}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/projets/villa-privee-casablanca"
                onClick={() => trackEvent('project_click', { slug: 'villa-privee-casablanca', location: 'featured' })}
                className="inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors group"
              >
                {t('featuredCta')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
