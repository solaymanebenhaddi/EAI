'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export function SustainabilityEvents() {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const topics = t.raw('sustainabilityTopics') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute top-[25%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[50%] left-0 w-full h-px bg-eai-brass" />
        <div className="absolute top-[75%] left-0 w-full h-px bg-eai-brass" />
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
              {t('sustainabilityLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] mb-6 tracking-tight">
            {t('sustainabilityTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed">
            {t('sustainabilityBody')}
          </p>
        </motion.div>

        {/* Topics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-eai-parchment/5 border border-eai-parchment/10 p-8 hover:border-eai-brass/30 transition-colors duration-500"
            >
              {/* Number */}
              <span className="font-display text-3xl text-eai-brass/20 italic block mb-4">
                {topic.number}
              </span>

              {/* Divider */}
              <div className="h-px w-12 bg-eai-brass/30 mb-4" />

              {/* Title */}
              <h3 className="font-display text-xl text-eai-paper mb-3 leading-tight">
                {topic.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-eai-parchment/60 leading-relaxed">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://events.eai-construction.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-label uppercase tracking-widest text-eai-brass-pale hover:text-eai-brass transition-colors"
          >
            {t('sustainabilityCta')}
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
