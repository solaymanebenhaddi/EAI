'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

export function WhyParticipate() {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const audiences = t.raw('audiences') as Array<{
    number: string;
    title: string;
    description: string;
    cta: string;
    ctaLink: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Exhibition background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/events/exhibition-booths.webp"
          alt="Stands d'exposition professionnelle"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-eai-ink/80" />
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
              {t('participateLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] mb-6 tracking-tight">
            {t('participateTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed">
            {t('participateIntro')}
          </p>
        </motion.div>

        {/* Audience blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-eai-parchment/5 border border-eai-parchment/10 p-8 lg:p-10 hover:border-eai-brass/30 transition-colors duration-500"
            >
              {/* Number */}
              <span className="font-display text-3xl text-eai-brass/20 italic block mb-6">
                {audience.number}
              </span>

              {/* Divider */}
              <div className="h-px w-12 bg-eai-brass/30 mb-6 group-hover:w-20 transition-all duration-500" />

              {/* Title */}
              <h3 className="font-display text-xl text-eai-paper mb-4 leading-tight">
                {audience.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-eai-parchment/70 leading-relaxed mb-6">
                {audience.description}
              </p>

              {/* CTA */}
              {audience.ctaLink.startsWith('http') ? (
                <a
                  href={audience.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors"
                >
                  {audience.cta}
                </a>
              ) : (
                <Link
                  href={audience.ctaLink}
                  onClick={() => trackEvent('cta_click', { location: 'why_participate', label: audience.title })}
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors"
                >
                  {audience.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
