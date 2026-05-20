'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function EcosystemSection() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const pillars = t.raw('ecosystemPillars') as Array<{
    number: string;
    name: string;
    description: string;
    cta: string;
    link: string;
    image: string;
    imageAlt: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[15%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[85%] top-0 w-px h-full bg-eai-brass" />
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
              {t('ecosystemLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] tracking-tight mb-6">
            {t('ecosystemTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed">
            {t('ecosystemIntro')}
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden h-[420px]"
            >
              {/* Background image */}
              <Image
                src={pillar.image}
                alt={pillar.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-eai-ink/60 group-hover:bg-eai-ink/70 transition-colors duration-500" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                {/* Number */}
                <span className="font-display text-4xl text-eai-brass/20 italic absolute top-8 left-8">
                  {pillar.number}
                </span>

                {/* Label */}
                <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                  {pillar.name}
                </span>

                {/* Description */}
                <p className="font-body text-[14px] text-eai-parchment/80 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* CTA */}
                <Link
                  href={pillar.link as any}
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass group-hover:text-eai-brass-soft transition-colors"
                >
                  {pillar.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
