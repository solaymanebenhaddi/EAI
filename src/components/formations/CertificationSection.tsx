'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, CheckCircle } from 'lucide-react';

export function CertificationSection() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const benefits = t.raw('certificationBenefits') as string[];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[15%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[85%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Award size={18} className="text-eai-brass-pale" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                  {t('certificationLabel')}
                </span>
              </div>
              <h2 className="font-display text-display-md text-eai-paper leading-[0.95] mb-6 tracking-tight">
                {t('certificationTitle')}
              </h2>
              <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed mb-10">
                {t('certificationBody')}
              </p>
            </motion.div>

            {/* Benefits list */}
            <div className="flex flex-col gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle size={16} className="shrink-0 text-eai-brass-pale mt-0.5" />
                  <span className="font-body text-[14px] text-eai-parchment/80 leading-snug">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificate preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative bg-eai-parchment/10 border border-eai-parchment/20 p-12">
              {/* Certificate border */}
              <div className="absolute inset-4 border border-eai-brass/30" />
              <div className="absolute inset-6 border border-eai-brass/15" />

              {/* Content */}
              <div className="relative text-center py-12">
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-eai-brass-pale/60 block mb-8">
                  ELAOUAD Architecture & Ingénierie
                </span>
                <h3 className="font-display text-2xl text-eai-paper mb-4">
                  Certificat de Formation
                </h3>
                <div className="w-16 h-px bg-eai-brass/40 mx-auto mb-6" />
                <p className="font-accent text-[16px] text-eai-parchment/60 italic mb-8">
                  Délivré à l'issue d'un parcours de formation professionnelle
                </p>
                <div className="flex justify-center gap-16 text-center">
                  <div>
                    <span className="font-mono text-[10px] text-eai-parchment/40 block">Date</span>
                    <span className="font-body text-sm text-eai-parchment/70">2026</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-eai-parchment/40 block">Signature</span>
                    <span className="font-body text-sm text-eai-parchment/70">EAI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
