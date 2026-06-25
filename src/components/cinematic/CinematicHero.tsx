'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

/** Animated CAD line that draws across the viewport on mount */
function ArchitecturalLine({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Primary olive architectural line — the core metaphor */}
      <motion.line
        x1="0" y1="540" x2="1440" y2="540"
        stroke="#6F7351"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
      {/* Measurement tick marks */}
      {[180, 360, 540, 720, 900, 1080, 1260].map((x, i) => (
        <motion.line
          key={x}
          x1={x} y1="530" x2={x} y2="550"
          stroke="#6F7351"
          strokeWidth="0.8"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ delay: 1.8 + i * 0.06, duration: 0.4 }}
        />
      ))}
      {/* Dimension annotation */}
      <motion.text
        x="720" y="520"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        letterSpacing="2"
        fill="#6F7351"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        AXIAL LINE — EL. 0.00
      </motion.text>
      {/* CAD Grid faint overlay */}
      <g opacity="0.03">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`v${i}`}
            x1={i * 180} y1="0" x2={i * 180} y2="900"
            stroke="#6F7351"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.6 + i * 0.04 }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.line
            key={`h${i}`}
            x1="0" y1={i * 150} x2="1440" y2={i * 150}
            stroke="#6F7351"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.05 }}
          />
        ))}
      </g>
      {/* Crosshair at center */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        style={{ transformOrigin: '720px 450px' }}
      >
        <circle cx="720" cy="450" r="16" fill="none" stroke="#6F7351" strokeWidth="0.8" />
        <circle cx="720" cy="450" r="3" fill="#6F7351" opacity="0.5" />
        <line x1="700" y1="450" x2="740" y2="450" stroke="#6F7351" strokeWidth="0.8" />
        <line x1="720" y1="430" x2="720" y2="470" stroke="#6F7351" strokeWidth="0.8" />
      </motion.g>
    </svg>
  );
}

interface CinematicHeroProps {
  isActive: boolean;
}

export function CinematicHero({ isActive }: CinematicHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-transparent"
    >
      {/* Vertical margin lines */}
      <div className="absolute left-6 top-0 h-full w-px bg-eai-brass/12 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-6 top-0 h-full w-px bg-eai-brass/12 pointer-events-none" aria-hidden="true" />

      {/* The main architectural line + CAD grid overlay */}
      <ArchitecturalLine isActive={isActive} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1720px] flex-col justify-center px-6 pb-24 pt-36 sm:px-10 lg:px-14"
      >
        {/* Eyebrow label */}
        <motion.div
          className="mb-10 flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="h-px w-10 bg-eai-brass/50" />
          <span className="font-body text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
            Casablanca, Maroc
          </span>
          <span className="hidden h-px w-10 bg-eai-brass/30 sm:block" />
          <span className="hidden font-body text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey/60 sm:block">
            Architecture & Ingénierie
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="mb-10 overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(4rem,9.5vw,11.5rem)] leading-[0.88] tracking-[-0.025em] text-eai-ink"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {['De la ligne', "à l'espace."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 1 ? 'text-eai-brass' : ''}`}
                  initial={{ y: '105%' }}
                  animate={isActive ? { y: 0 } : { y: '105%' }}
                  transition={{
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3 + i * 0.15,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Sub-headline + description */}
        <div className="grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <motion.p
            className="font-body max-w-2xl text-lg leading-8 text-eai-warm-grey sm:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.85, delay: 0.68 }}
          >
            Architecture, ingénierie et coordination de projets au Maroc.
            ELAOUAD Architecture et Ingénierie accompagne les maîtres d&apos;ouvrage,
            promoteurs et porteurs de projets dans la conception, l&apos;étude, la
            coordination et le suivi de leurs espaces.
          </motion.p>

          <motion.div
            className="border-l border-eai-brass/30 pl-6"
            initial={{ opacity: 0, y: 14 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 0.82 }}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.22em] text-eai-brass">
              Ligne → Plan → Système → Structure → Espace
            </p>
            <p className="mt-3 font-body text-sm leading-6 text-eai-warm-grey/70">
              Une méthode intégrée. De la première esquisse à la livraison.
            </p>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.96 }}
        >
          <Link
            href="/expertises"
            onClick={() => trackEvent('cta_click', { location: 'cinematic_hero', label: 'approach' })}
            className="group inline-flex items-center justify-center gap-3 bg-eai-ink px-7 py-4 font-body text-[10px] uppercase tracking-widest text-eai-paper shadow-[0_18px_50px_rgba(25,24,22,0.18)] transition-all duration-500 hover:bg-eai-taupe sm:px-9"
          >
            Découvrir notre approche
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/expertises"
            onClick={() => trackEvent('cta_click', { location: 'cinematic_hero', label: 'expertises' })}
            className="inline-flex items-center justify-center gap-3 border border-eai-brass/40 bg-transparent px-7 py-4 font-body text-[10px] uppercase tracking-widest text-eai-charcoal backdrop-blur-sm transition-all duration-300 hover:border-eai-brass hover:text-eai-brass sm:px-9"
          >
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            Voir nos expertises
          </Link>
        </motion.div>

        {/* Key stats strip */}
        <motion.div
          className="mt-14 grid max-w-xl grid-cols-3 border border-eai-line bg-eai-paper/50 shadow-[0_16px_60px_rgba(25,24,22,0.07)] backdrop-blur-md"
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {[
            { value: '8+', label: 'Années d\'expertise' },
            { value: '50+', label: 'Projets réalisés' },
            { value: '100%', label: 'Engagement livraison' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 py-5 sm:px-6 ${i !== 2 ? 'border-r border-eai-line' : ''}`}
            >
              <span className="font-body block text-[9px] uppercase tracking-[0.18em] text-eai-warm-grey">
                {stat.label}
              </span>
              <span className="font-display mt-2 block text-3xl leading-none text-eai-ink sm:text-4xl">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        aria-hidden="true"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.22em] text-eai-warm-grey/50">Scroll</span>
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-eai-brass/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
