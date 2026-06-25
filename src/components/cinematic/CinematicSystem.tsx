'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/** Engineering / System diagram — layered technical SVG */
function SystemDiagramSVG({ visible }: { visible: boolean }) {
  const primary = '#6F7351';
  const accent = '#B79A5B';
  const faint = 'rgba(111,115,81,0.25)';

  const nodes = [
    { x: 280, y: 100, label: 'Conception' },
    { x: 100, y: 220, label: 'Structure' },
    { x: 460, y: 220, label: 'Études' },
    { x: 100, y: 340, label: 'Budget' },
    { x: 460, y: 340, label: 'Planning' },
    { x: 280, y: 440, label: 'Livraison' },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 5], [4, 5],
  ];

  return (
    <svg viewBox="0 0 560 520" className="w-full h-full" aria-label="Diagramme du système de coordination" role="img">
      {/* Background contour lines — topographic feel */}
      {[1, 2, 3].map((n) => (
        <motion.ellipse
          key={n}
          cx="280" cy="270"
          rx={120 * n} ry={80 * n}
          fill="none" stroke={faint} strokeWidth="0.6"
          strokeDasharray="6 6"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 1.2, delay: 0.2 + n * 0.2 }}
          style={{ transformOrigin: '280px 270px' }}
        />
      ))}

      {/* Structural grid */}
      {[140, 280, 420].map((x) => (
        <motion.line
          key={`sg-v${x}`}
          x1={x} y1="60" x2={x} y2="480"
          stroke={faint} strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      ))}
      {[130, 260, 390].map((y) => (
        <motion.line
          key={`sg-h${y}`}
          x1="60" y1={y} x2="500" y2={y}
          stroke={faint} strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      ))}

      {/* Timeline flow bar */}
      <motion.line
        x1="60" y1="480" x2="500" y2="480"
        stroke={accent} strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, delay: 0.5 }}
      />
      {['Analyse', 'Conception', 'Études', 'Consultation', 'Exécution'].map((label, i) => (
        <motion.g key={label} initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.6 + i * 0.1 }}>
          <line x1={60 + i * 110} y1="475" x2={60 + i * 110} y2="485" stroke={accent} strokeWidth="1" />
          <text x={60 + i * 110} y="498" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={accent} letterSpacing="1">
            {label.toUpperCase()}
          </text>
        </motion.g>
      ))}

      {/* Graph edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={`e${a}-${b}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={primary} strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={node.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle cx={node.x} cy={node.y} r="22" fill="#F5F1EA" stroke={primary} strokeWidth="1.5" />
          <circle cx={node.x} cy={node.y} r="5" fill={i === 0 || i === 5 ? accent : primary} />
          <text x={node.x} y={node.y + 38} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={primary} letterSpacing="1">
            {node.label.toUpperCase()}
          </text>
        </motion.g>
      ))}

      {/* Cost/budget annotation */}
      <motion.g initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.4 }}>
        <rect x="390" y="60" width="130" height="56" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="400" y="78" fontSize="8" fontFamily="monospace" fill={accent} letterSpacing="1">AMO: ACTIF</text>
        <text x="400" y="92" fontSize="8" fontFamily="monospace" fill={accent} letterSpacing="1">BIM: COORDONNÉ</text>
        <text x="400" y="106" fontSize="8" fontFamily="monospace" fill={accent} letterSpacing="1">TOPO: VALIDÉE</text>
      </motion.g>

      {/* Coordination flow pulse */}
      <motion.circle
        cx="280" cy="270" r="6"
        fill={accent} opacity="0.5"
        animate={visible ? { scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 2.8 }}
        style={{ transformOrigin: '280px 270px' }}
      />
    </svg>
  );
}

const services = [
  'Études techniques',
  'Études économiques',
  "Assistance a maitrise d'ouvrage",
  'Coordination des travaux',
  'Topographie',
  'Suivi de chantier',
];

export function CinematicSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-16%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section
      ref={sectionRef}
      id="systeme"
      className="relative py-32 lg:py-52 overflow-hidden bg-transparent"
    >
      <motion.div style={{ opacity, y }} className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Section eyebrow */}
        <motion.div
          className="mb-16 flex items-center gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
            Chapitre 03
          </span>
          <span className="h-px w-12 bg-eai-brass/40" />
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-warm-grey/60">
            Le Système
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-28 lg:items-center">
          {/* Left — copy block */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <motion.h2
              className="font-display text-[clamp(2.6rem,5vw,6rem)] leading-[0.92] tracking-[-0.022em] text-eai-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Structurer{' '}
              <span className="text-eai-brass">l&apos;intelligence</span>
              {' '}du projet.
            </motion.h2>

            <motion.p
              className="font-body text-lg leading-8 text-eai-warm-grey max-w-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              Études techniques, faisabilité, dossiers d&apos;appels d&apos;offres,
              coordination et maîtrise d&apos;œuvre : chaque décision est organisée
              pour sécuriser le projet avant, pendant et après son exécution.
            </motion.p>

            {/* Service tags */}
            <motion.div
              className="flex flex-col gap-3 border-t border-eai-line pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              {services.map((svc, i) => (
                <motion.div
                  key={svc}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.07 }}
                >
                  <motion.div
                    className="h-1 w-1 rounded-full bg-eai-brass"
                    animate={isInView ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="font-body text-xs uppercase tracking-[0.14em] text-eai-charcoal">
                    {svc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — system diagram */}
          <motion.div
            className="relative aspect-square border border-eai-line bg-eai-parchment/40 overflow-hidden shadow-[0_24px_80px_rgba(25,24,22,0.08)] backdrop-blur-sm order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-4">
              <SystemDiagramSVG visible={isInView} />
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
        </div>
      </motion.div>
    </section>
  );
}
