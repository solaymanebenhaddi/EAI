'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

/** Animated architectural floor plan SVG */
function FloorPlanSVG({ visible }: { visible: boolean }) {
  const strokeColor = '#6F7351';
  const dimColor = '#B79A5B';

  return (
    <svg
      viewBox="0 0 560 440"
      className="w-full h-full overflow-visible"
      aria-label="Plan architectural animé"
      role="img"
    >
      {/* Faint CAD grid */}
      <g opacity="0.18">
        {Array.from({ length: 29 }).map((_, i) => (
          <motion.line
            key={`vg-${i}`}
            x1={i * 20} y1="0" x2={i * 20} y2="440"
            stroke={strokeColor} strokeWidth="0.4"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, delay: i * 0.02 }}
          />
        ))}
        {Array.from({ length: 23 }).map((_, i) => (
          <motion.line
            key={`hg-${i}`}
            x1="0" y1={i * 20} x2="560" y2={i * 20}
            stroke={strokeColor} strokeWidth="0.4"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, delay: i * 0.02 }}
          />
        ))}
      </g>

      {/* Outer walls */}
      <motion.rect
        x="80" y="80" width="380" height="280"
        fill="none" stroke={strokeColor} strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Interior partition — vertical */}
      <motion.line
        x1="240" y1="80" x2="240" y2="280"
        stroke={strokeColor} strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      {/* Interior partition — horizontal */}
      <motion.line
        x1="80" y1="220" x2="360" y2="220"
        stroke={strokeColor} strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      />
      <motion.line
        x1="240" y1="280" x2="460" y2="280"
        stroke={strokeColor} strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.9, delay: 1.6 }}
      />

      {/* Door arcs */}
      <motion.path
        d="M 240 220 A 40 40 0 0 1 280 180"
        fill="none" stroke={strokeColor} strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
      />
      <motion.path
        d="M 80 220 A 40 40 0 0 0 120 260"
        fill="none" stroke={strokeColor} strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      />

      {/* Window indicators */}
      {[[200, 80, 280, 80], [200, 360, 280, 360]].map(([x1, y1, x2, y2], i) => (
        <motion.g key={i}>
          <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={dimColor} strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5, delay: 2.1 + i * 0.15 }}
          />
        </motion.g>
      ))}

      {/* Dimension line — width */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <line x1="80" y1="60" x2="460" y2="60" stroke={dimColor} strokeWidth="0.8" />
        <line x1="80" y1="55" x2="80" y2="65" stroke={dimColor} strokeWidth="0.8" />
        <line x1="460" y1="55" x2="460" y2="65" stroke={dimColor} strokeWidth="0.8" />
        <text x="270" y="52" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={dimColor} letterSpacing="1">
          38.00 m
        </text>
      </motion.g>

      {/* Dimension line — height */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        <line x1="58" y1="80" x2="58" y2="360" stroke={dimColor} strokeWidth="0.8" />
        <line x1="53" y1="80" x2="63" y2="80" stroke={dimColor} strokeWidth="0.8" />
        <line x1="53" y1="360" x2="63" y2="360" stroke={dimColor} strokeWidth="0.8" />
        <text
          x="50" y="225"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill={dimColor}
          letterSpacing="1"
          transform="rotate(-90 50 225)"
        >
          28.00 m
        </text>
      </motion.g>

      {/* Room labels */}
      {[
        { x: 155, y: 155, label: 'Salon' },
        { x: 350, y: 155, label: 'Cuisine' },
        { x: 155, y: 295, label: 'Chambre' },
        { x: 360, y: 320, label: 'Salle de bain' },
      ].map(({ x, y, label }) => (
        <motion.text
          key={label}
          x={x} y={y}
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill={strokeColor}
          letterSpacing="1.5"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          {label.toUpperCase()}
        </motion.text>
      ))}

      {/* Crosshair center */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 3.0, duration: 0.5 }}
        style={{ transformOrigin: '270px 220px' }}
      >
        <circle cx="270" cy="220" r="6" fill="none" stroke={dimColor} strokeWidth="1" />
        <line x1="258" y1="220" x2="282" y2="220" stroke={dimColor} strokeWidth="1" />
        <line x1="270" y1="208" x2="270" y2="232" stroke={dimColor} strokeWidth="1" />
      </motion.g>

      {/* Scale bar */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ delay: 3.1, duration: 0.5 }}
      >
        <rect x="380" y="390" width="60" height="6" fill={dimColor} opacity="0.4" />
        <rect x="410" y="390" width="1" height="6" fill={dimColor} />
        <text x="380" y="408" fontSize="7" fontFamily="monospace" fill={dimColor} letterSpacing="1">0  5m  10m</text>
      </motion.g>

      {/* Plan note */}
      <motion.text
        x="80" y="428"
        fontSize="8"
        fontFamily="monospace"
        fill={strokeColor}
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ delay: 3.2, duration: 0.5 }}
      >
        EAI — PLAN R+0 — ÉCHELLE 1:100
      </motion.text>
    </svg>
  );
}

export function CinematicPlan() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-18%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  const microLabels = ['Architecture', 'Urbanisme', "Plans d'amenagement", "Architecture d'interieur"];

  return (
    <section
      ref={sectionRef}
      id="plan"
      className="relative py-32 lg:py-52 overflow-hidden"
    >
      {/* Frosted parchment veil so content reads against the cinematic backdrop */}
      <div className="absolute inset-0 bg-eai-paper/82 backdrop-blur-[2px]" aria-hidden="true" />
      <motion.div style={{ opacity, y }} className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Section eyebrow */}
        <motion.div
          className="mb-16 flex items-center gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
            Chapitre 02
          </span>
          <span className="h-px w-12 bg-eai-brass/40" />
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-warm-grey/60">
            Le Plan
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-28 lg:items-center">
          {/* Left — animated floor plan */}
          <motion.div
            className="relative aspect-[4/3] border border-eai-line bg-eai-parchment/50 overflow-hidden shadow-[0_24px_80px_rgba(25,24,22,0.08)] backdrop-blur-sm"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-4">
              <FloorPlanSVG visible={isInView} />
            </div>
            {/* Corner ticks */}
            {[
              'top-0 left-0 border-t border-l',
              'top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l',
              'bottom-0 right-0 border-b border-r',
            ].map((cls) => (
              <div key={cls} className={`absolute h-5 w-5 border-eai-brass/30 ${cls}`} aria-hidden="true" />
            ))}
          </motion.div>

          {/* Right — copy */}
          <div className="flex flex-col gap-8">
            <motion.h2
              className="font-display text-[clamp(2.6rem,5vw,6rem)] leading-[0.92] tracking-[-0.022em] text-eai-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Concevoir avec{' '}
              <span className="text-eai-brass">précision.</span>
            </motion.h2>

            <motion.p
              className="font-body text-lg leading-8 text-eai-warm-grey max-w-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              Chaque projet commence par une lecture claire du besoin, du site,
              des contraintes et du potentiel. Nous transformons les premières
              intentions en plans cohérents, mesurables et exploitables.
            </motion.p>

            {/* Micro-labels */}
            <motion.div
              className="flex flex-col gap-3 border-t border-eai-line pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              {microLabels.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                >
                  <span className="font-body text-[9px] text-eai-brass/60 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-10 bg-eai-line" />
                  <span className="font-body text-xs uppercase tracking-[0.16em] text-eai-charcoal">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Link
                href="/expertises"
                className="group inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.14em] text-eai-brass hover:text-eai-ink transition-colors"
              >
                Explorer nos expertises
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
