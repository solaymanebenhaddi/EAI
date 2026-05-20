'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function TeamCulture() {
  const t = useTranslations('Apropos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const blocks = t.raw('cultureBlocks') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-eai-brass" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                  {t('cultureLabel')}
                </span>
              </div>
              <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight mb-8">
                {t('cultureTitle')}
              </h2>
              <div className="flex flex-col gap-6">
                <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
                  {t('cultureBody1')}
                </p>
                <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
                  {t('cultureBody2')}
                </p>
              </div>
            </motion.div>

            {/* Culture blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-6 border-l border-eai-brass/30"
                >
                  <span className="font-mono text-[10px] text-eai-brass block mb-2">
                    {block.number}
                  </span>
                  <h3 className="font-display text-lg text-eai-ink mb-2">{block.title}</h3>
                  <p className="font-body text-sm text-eai-warm-grey leading-relaxed">
                    {block.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:order-2 order-1"
          >
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/about/team-meeting.webp"
                  alt="Équipe de projet travaillant sur des plans, des maquettes et des documents techniques"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-eai-ink/10" />
              </div>
              {/* Process labels */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-eai-warm-grey/60 bg-eai-parchment/50 px-3 py-1.5 border border-eai-line">
                  Architecture
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-eai-warm-grey/60 bg-eai-parchment/50 px-3 py-1.5 border border-eai-line">
                  Ingénierie
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-eai-warm-grey/60 bg-eai-parchment/50 px-3 py-1.5 border border-eai-line">
                  BIM
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-eai-warm-grey/60 bg-eai-parchment/50 px-3 py-1.5 border border-eai-line">
                  Coordination
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
