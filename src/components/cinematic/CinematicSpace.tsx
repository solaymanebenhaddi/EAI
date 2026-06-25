'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function CinematicSpace() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-14%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [80, 0, 0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.98]);

  return (
    <section
      ref={sectionRef}
      id="espace"
      className="relative py-32 lg:py-52 overflow-hidden"
    >
      <div className="absolute inset-0 bg-eai-parchment/78 backdrop-blur-[1px]" aria-hidden="true" />
      <motion.div style={{ opacity, y }} className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Section eyebrow */}
        <motion.div
          className="mb-16 flex items-center gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
            Chapitre 05
          </span>
          <span className="h-px w-12 bg-eai-brass/40" />
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-warm-grey/60">
            L&apos;Espace
          </span>
        </motion.div>

        {/* Main cinematic image — full-width reveal */}
        <motion.div
          className="relative aspect-[21/9] overflow-hidden border border-eai-line shadow-[0_40px_120px_rgba(25,24,22,0.16)] mb-20"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="absolute inset-0 w-full h-full" style={{ scale: imageScale }}>
            <Image
              src="/images/cinematic/hero-space.png"
              alt="Espace architectural marocain contemporain réalisé par EAI"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          {/* Warm veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-eai-ink/70 via-eai-ink/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-eai-ink/30 to-transparent" />

          {/* Moroccan geometry detail overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <pattern id="zellige" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M5 0L10 5L5 10L0 5Z" fill="none" stroke="#B79A5B" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#zellige)" />
            </svg>
          </div>

          {/* Text over image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <span className="font-body text-[9px] uppercase tracking-[0.26em] text-eai-brass-pale">
                Casablanca, Maroc
              </span>
              <span className="h-px w-10 bg-eai-brass-pale/50" />
              <span className="font-body text-[9px] uppercase tracking-[0.22em] text-white/60">
                Architecture & Ingénierie
              </span>
            </motion.div>
            <motion.h2
              className="font-display text-[clamp(2.4rem,5.5vw,7.5rem)] leading-[0.88] text-white max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Transformer les projets en espaces{' '}
              <span className="text-eai-brass-pale">maîtrisés.</span>
            </motion.h2>
          </div>

          {/* CAD line that "resolves" across the image */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-eai-brass/60 via-eai-brass/30 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 2.0, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Bottom copy + CTAs */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <motion.p
              className="font-body text-xl leading-9 text-eai-warm-grey mb-8"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              ELAOUAD Architecture et Ingénierie conçoit, structure et accompagne
              des projets où l&apos;esthétique, la technique et l&apos;exécution avancent
              ensemble.
            </motion.p>
            <motion.p
              className="font-body text-[10px] uppercase tracking-[0.28em] text-eai-warm-grey/40"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.7 }}
            >
              Basé à Casablanca. Actif au Maroc et à l&apos;international.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.78, duration: 0.8 }}
          >
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_click', { location: 'cinematic_space', label: 'parler_projet' })}
              className="group inline-flex items-center gap-3 bg-eai-ink px-8 py-4 font-body text-[10px] uppercase tracking-widest text-eai-paper shadow-[0_14px_40px_rgba(25,24,22,0.2)] transition-all duration-500 hover:bg-eai-taupe"
            >
              Parler de votre projet
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/expertises"
              onClick={() => trackEvent('cta_click', { location: 'cinematic_space', label: 'expertises' })}
              className="inline-flex items-center gap-3 border border-eai-brass/40 px-8 py-4 font-body text-[10px] uppercase tracking-widest text-eai-charcoal transition-all duration-300 hover:border-eai-brass hover:text-eai-brass"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Explorer nos expertises
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
