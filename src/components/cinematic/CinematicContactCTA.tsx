'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function CinematicContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      className="relative py-32 lg:py-52 overflow-hidden bg-eai-ink"
    >
      {/* Subtle architectural grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[20, 40, 60, 80].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 h-full w-px bg-white/[0.03]"
            style={{ left: `${pct}%` }}
          />
        ))}
        {[33, 66].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 w-full h-px bg-white/[0.03]"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>

      {/* Resolving olive line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eai-brass/50 to-transparent pointer-events-none"
        style={{ scaleX: lineScale, originX: 0.5 }}
      />

      {/* Ghost word */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="font-display text-[200px] lg:text-[380px] text-white/[0.02] leading-none select-none uppercase">
          ELAOUAD
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          {/* Headline block */}
          <div>
            <motion.div
              className="mb-10 flex items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="h-px w-10 bg-eai-brass/50" />
              <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
                Démarrer votre projet
              </span>
            </motion.div>

            <motion.h2
              className="font-display text-[clamp(3rem,6.5vw,9rem)] leading-[0.88] text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {['Vous avez un projet', 'à structurer ?'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 1 ? 'text-eai-brass' : ''}`}
                    initial={{ y: '105%' }}
                    animate={isInView ? { y: 0 } : { y: '105%' }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.14 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              className="mt-8 max-w-xl font-body text-lg leading-8 text-white/60"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.52 }}
            >
              Parlons de votre vision, de vos contraintes et de la meilleure
              manière de transformer votre idée en espace réalisable.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.68 }}
            >
              <Link
                href="/contact"
                onClick={() => trackEvent('cta_click', { location: 'cinematic_contact_cta', label: 'consultation' })}
                className="group inline-flex items-center gap-3 bg-eai-brass px-8 py-4 font-body text-[10px] uppercase tracking-widest text-eai-paper shadow-[0_14px_40px_rgba(111,115,81,0.3)] transition-all duration-500 hover:bg-eai-brass-soft"
              >
                Demander une consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/projets"
                onClick={() => trackEvent('cta_click', { location: 'cinematic_contact_cta', label: 'projets' })}
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 font-body text-[10px] uppercase tracking-widest text-white/70 transition-all duration-300 hover:border-eai-brass hover:text-eai-brass"
              >
                Voir nos projets
              </Link>
            </motion.div>
          </div>

          {/* Contact info panel */}
          <motion.div
            className="flex flex-col gap-8 border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <div>
              <span className="font-body block text-[9px] uppercase tracking-[0.26em] text-eai-brass mb-5">
                Contact direct
              </span>
              <div className="flex flex-col gap-5">
                <a
                  href="mailto:contact@eai-construction.com"
                  className="group flex items-start gap-4 transition-colors hover:text-eai-brass"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-eai-brass/60" aria-hidden="true" />
                  <span className="font-body text-sm text-white/70 group-hover:text-eai-brass transition-colors">
                    contact@eai-construction.com
                  </span>
                </a>
                <a
                  href="tel:+212520198738"
                  className="group flex items-start gap-4 transition-colors hover:text-eai-brass"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-eai-brass/60" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-sm text-white/70 group-hover:text-eai-brass transition-colors">
                      +212 520 19 87 38
                    </span>
                    <span className="font-body text-sm text-white/70 group-hover:text-eai-brass transition-colors">
                      +212 666 79 85 36
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="font-body block text-[9px] uppercase tracking-[0.26em] text-eai-brass mb-3">
                Adresse
              </span>
              <p className="font-body text-sm leading-7 text-white/50">
                Casablanca, Maroc<br />
                Actif au Maroc et à l&apos;international
              </p>
            </div>

            <a
              href="https://wa.me/212666798536"
              onClick={() => trackEvent('whatsapp_click', { location: 'cinematic_contact_cta' })}
              className="flex items-center justify-center gap-3 border border-eai-brass/40 py-3 font-body text-[10px] uppercase tracking-[0.14em] text-eai-brass/80 transition-all duration-300 hover:bg-eai-brass hover:text-eai-paper"
            >
              Écrire sur WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
