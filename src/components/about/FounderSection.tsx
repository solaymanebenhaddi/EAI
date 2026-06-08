'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function FounderSection() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const values = t.raw('founderValues') as string[];

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
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Brass corner frame */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-eai-brass/60" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-eai-brass/60" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/about/SOUKAINA.png"
                  alt="Portrait professionnel de Soukaina Elaouad, fondatrice d'ELAOUAD Architecture & Ingénierie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-eai-ink/10" />
              </div>
            </div>

            {/* Name overlay */}
            <div className="mt-8 text-center lg:text-left">
              <h3 className="font-display text-2xl text-eai-paper mb-1">
                {t('founderName')}
              </h3>
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-eai-brass-pale block mb-6">
                {t('founderRole')}
              </span>

              {/* Values */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {values.map((value, i) => (
                  <span
                    key={i}
                    className="font-body text-[9px] uppercase tracking-[0.15em] text-eai-brass-pale/70 bg-eai-parchment/5 px-3 py-1.5 border border-eai-brass/20"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-eai-brass-pale" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                  {t('founderLabel')}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6 mb-12">
              <motion.p
                className="font-body text-[15px] text-eai-parchment/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t('founderBio1')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-parchment/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('founderBio2')}
              </motion.p>
              <motion.p
                className="font-body text-[15px] text-eai-parchment/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('founderBio3')}
              </motion.p>
            </div>

            {/* Quote */}
            <motion.blockquote
              className="relative pl-8 border-l-2 border-eai-brass/40"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-accent text-[20px] lg:text-[22px] text-eai-parchment/90 leading-relaxed italic">
                {t('founderQuote')}
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
