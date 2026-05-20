'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';

export function CaseStudyPreview() {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const steps = t.raw('caseStudySteps') as Array<{
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
              {t('caseStudyLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
            {t('caseStudyTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
            {t('caseStudyBody')}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Brass number */}
              <span className="font-display text-4xl text-eai-brass/20 italic block mb-4">
                {step.number}
              </span>
              <div className="h-px w-12 bg-eai-brass/30 mb-4" />
              <h3 className="font-display text-xl text-eai-ink mb-3">{step.title}</h3>
              <p className="font-body text-sm text-eai-warm-grey leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/projets/villa-privee-casablanca"
            onClick={() => trackEvent('cta_click', { location: 'case_study', label: 'detail' })}
            className="inline-flex items-center gap-3 font-body text-label uppercase tracking-widest text-eai-brass hover:text-eai-brass-soft transition-colors group"
          >
            {t('caseStudyCta')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
