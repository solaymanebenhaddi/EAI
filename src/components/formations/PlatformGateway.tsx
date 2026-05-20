'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink, Monitor, BookOpen, Users, Award, Clock, Zap } from 'lucide-react';

export function PlatformGateway() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const features = t.raw('platformFeatures') as string[];
  const icons = [Monitor, BookOpen, Users, Award, Clock, Zap];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-eai-brass" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                  {t('platformLabel')}
                </span>
              </div>
              <h2 className="font-display text-display-md text-eai-ink leading-[0.95] mb-6 tracking-tight">
                {t('platformTitle')}
              </h2>
              <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed mb-10">
                {t('platformBody')}
              </p>
            </motion.div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => {
                const Icon = icons[index] || Monitor;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-eai-ink/5 text-eai-brass">
                      <Icon size={14} />
                    </div>
                    <span className="font-body text-[13px] text-eai-charcoal leading-snug">
                      {feature}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="https://courses.eai-construction.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-3 bg-eai-brass text-eai-ink px-8 py-4 font-body text-label uppercase tracking-widest hover:bg-eai-brass-soft transition-all duration-500 shadow-xl shadow-eai-brass/20"
            >
              {t('platformCta')}
              <ExternalLink size={14} />
            </motion.a>
          </div>

          {/* Platform preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden bg-eai-paper border border-eai-line shadow-2xl shadow-eai-ink/10">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-eai-parchment/80 border-b border-eai-line">
                <div className="w-2.5 h-2.5 rounded-full bg-eai-warm-grey/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-eai-warm-grey/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-eai-warm-grey/20" />
                <span className="ml-4 font-mono text-[10px] text-eai-warm-grey/50">
                  courses.eai-construction.com
                </span>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[4/3]">
                <img
                  src="/images/formations/platform-preview.webp"
                  alt="Aperçu de la plateforme EAI Courses"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eai-ink/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
