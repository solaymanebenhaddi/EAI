'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

interface ExpertiseDetailProps {
  number: string;
  labelKey: string;
  titleKey: string;
  bodyKey: string;
  valueKey: string;
  deliverablesKey: string;
  imageAltKey: string;
  imagePath: string;
  reversed?: boolean;
  dark?: boolean;
}

export function ExpertiseDetail({
  labelKey,
  titleKey,
  bodyKey,
  valueKey,
  deliverablesKey,
  imageAltKey,
  imagePath,
  reversed = false,
  dark = false,
}: ExpertiseDetailProps) {
  const t = useTranslations('Expertises');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' });

  const body = t.raw(bodyKey) as string;
  const paragraphs = body.split('\n\n');
  const deliverables = t.raw(deliverablesKey) as string[];
  const imageAlt = t(imageAltKey);

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 lg:py-32 ${dark ? 'bg-eai-ink' : 'bg-eai-paper'}`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
            reversed ? '' : ''
          }`}
        >
          {/* Text content */}
          <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-eai-brass" />
                <span
                  className={`font-body text-[10px] uppercase tracking-[0.25em] ${
                    dark ? 'text-eai-brass-pale' : 'text-eai-brass'
                  }`}
                >
                  {t(labelKey)}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className={`font-display text-display-md leading-[0.95] mb-10 tracking-tight ${
                dark ? 'text-eai-paper' : 'text-eai-ink'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t(titleKey)}
            </motion.h2>

            {/* Body paragraphs */}
            <div className="flex flex-col gap-5 mb-10">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className={`font-body text-[15px] leading-relaxed ${
                    dark ? 'text-eai-parchment/80' : 'text-eai-warm-grey'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Client value box */}
            <motion.div
              className={`p-6 border-l-2 border-eai-brass/40 mb-10 ${
                dark ? 'bg-eai-brass/[0.05]' : 'bg-eai-brass/[0.04]'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span
                className={`font-body text-[10px] uppercase tracking-[0.2em] block mb-3 ${
                  dark ? 'text-eai-brass-pale' : 'text-eai-brass'
                }`}
              >
                {t('clientValueLabel')}
              </span>
              <p
                className={`font-body text-sm leading-relaxed ${
                  dark ? 'text-eai-parchment/70' : 'text-eai-charcoal'
                }`}
              >
                {t(valueKey)}
              </p>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span
                className={`font-body text-[10px] uppercase tracking-[0.2em] block mb-4 ${
                  dark ? 'text-eai-brass-pale' : 'text-eai-brass'
                }`}
              >
                {t('deliverablesLabel')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        dark ? 'text-eai-brass-pale/60' : 'text-eai-brass/60'
                      }`}
                    />
                    <span
                      className={`font-body text-sm ${
                        dark ? 'text-eai-parchment/70' : 'text-eai-warm-grey'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className={`lg:col-span-5 relative ${reversed ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden">
              <div
                className={`absolute inset-0 z-10 ${
                  dark
                    ? 'bg-gradient-to-t from-eai-ink via-transparent to-transparent'
                    : 'bg-gradient-to-t from-eai-paper/40 via-transparent to-transparent'
                }`}
              />
              <Image
                src={imagePath}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Frame */}
            <div
              className={`absolute -inset-3 border -z-10 hidden lg:block ${
                dark ? 'border-eai-brass/10' : 'border-eai-brass/15'
              }`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
