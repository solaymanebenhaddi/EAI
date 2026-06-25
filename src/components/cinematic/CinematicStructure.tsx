'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

/** Axonometric wireframe SVG that "rises" from the floor plan */
function WireframeSVG({ visible }: { visible: boolean }) {
  const primary = '#6F7351';
  const accent = '#B79A5B';

  // Axonometric box points (simple box)
  // Front face bottom-left → bottom-right → top-right → top-left
  const fx = 120; const fy = 280; const fw = 200; const fh = 160;
  // Right face — offset by (80, -40) for isometric feel
  const dx = 80; const dy = -40;

  const frontFace = `${fx},${fy} ${fx + fw},${fy} ${fx + fw},${fy - fh} ${fx},${fy - fh}`;
  const topFace = `${fx},${fy - fh} ${fx + fw},${fy - fh} ${fx + fw + dx},${fy - fh + dy} ${fx + dx},${fy - fh + dy}`;
  const rightFace = `${fx + fw},${fy} ${fx + fw + dx},${fy + dy} ${fx + fw + dx},${fy - fh + dy} ${fx + fw},${fy - fh}`;

  return (
    <svg viewBox="0 0 560 420" className="w-full h-full" aria-label="Structure axonométrique animée" role="img">
      {/* Foundation grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.line
          key={`fg-${i}`}
          x1={80 + i * 60} y1="300" x2={120 + i * 50 + dx} y2={300 + dy}
          stroke={primary} strokeWidth="0.4" opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
        />
      ))}

      {/* Structural columns rising */}
      {[fx, fx + fw / 2, fx + fw].map((cx, i) => (
        <motion.g key={cx}>
          <motion.line
            x1={cx} y1="300" x2={cx} y2={fy - fh}
            stroke={primary} strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: 0.5 + i * 0.15 }}
          />
          {/* Column ticks at floor level */}
          <motion.rect
            x={cx - 4} y="296" width="8" height="8"
            fill="none" stroke={accent} strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 0.8 } : { opacity: 0 }}
            transition={{ delay: 1.0 + i * 0.1 }}
          />
        </motion.g>
      ))}

      {/* Floors / slabs appearing */}
      {[280, 200, 120].map((floorY, i) => (
        <motion.line
          key={`floor-${floorY}`}
          x1={fx} y1={floorY} x2={fx + fw} y2={floorY}
          stroke={primary} strokeWidth="1.5"
          strokeDasharray={i === 2 ? '0' : '5 5'}
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.9 + i * 0.2 }}
        />
      ))}

      {/* Front face */}
      <motion.polygon
        points={frontFace}
        fill="rgba(248,245,238,0.15)" stroke={primary} strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      />

      {/* Top face */}
      <motion.polygon
        points={topFace}
        fill="rgba(111,115,81,0.07)" stroke={primary} strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      />

      {/* Right face */}
      <motion.polygon
        points={rightFace}
        fill="rgba(183,154,91,0.06)" stroke={accent} strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.9, duration: 0.6 }}
      />

      {/* Beam marks */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`beam-${i}`}
          x1={fx + i * fw / 2} y1={fy - fh}
          x2={fx + i * fw / 2 + dx} y2={fy - fh + dy}
          stroke={accent} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 0.6, delay: 2.1 + i * 0.1 }}
        />
      ))}

      {/* Phase labels */}
      {[
        { x: 60, y: 390, label: 'FONDATIONS' },
        { x: 200, y: 390, label: 'STRUCTURE' },
        { x: 360, y: 390, label: 'FAÇADES' },
        { x: 480, y: 390, label: 'FINITIONS' },
      ].map(({ x, y, label }, i) => (
        <motion.text
          key={label}
          x={x} y={y}
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill={i <= 1 ? primary : accent}
          opacity={i <= 1 ? 0.8 : 0.4}
          letterSpacing="1.5"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: i <= 1 ? 0.8 : 0.4 } : { opacity: 0 }}
          transition={{ delay: 2.3 + i * 0.1, duration: 0.4 }}
        >
          {label}
        </motion.text>
      ))}

      {/* Dimension annotation */}
      <motion.g initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.6 }}>
        <line x1={fx + fw + dx + 20} y1={fy + dy} x2={fx + fw + dx + 20} y2={fy - fh + dy} stroke={accent} strokeWidth="0.8" />
        <line x1={fx + fw + dx + 15} y1={fy + dy} x2={fx + fw + dx + 25} y2={fy + dy} stroke={accent} strokeWidth="0.8" />
        <line x1={fx + fw + dx + 15} y1={fy - fh + dy} x2={fx + fw + dx + 25} y2={fy - fh + dy} stroke={accent} strokeWidth="0.8" />
        <text
          x={fx + fw + dx + 36} y={(fy + fy - fh) / 2 + dy / 2}
          fontSize="9" fontFamily="monospace" fill={accent}
          transform={`rotate(-90 ${fx + fw + dx + 36} ${(fy + fy - fh) / 2 + dy / 2})`}
        >
          H=12.00m
        </text>
      </motion.g>

      {/* EAI notation */}
      <motion.text
        x="80" y="408"
        fontSize="8" fontFamily="monospace" fill={primary}
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ delay: 3.0 }}
      >
        EAI — VUE AXONOMÉTRIQUE — PHASE EXÉCUTION
      </motion.text>
    </svg>
  );
}

export function CinematicStructure() {
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
      id="structure"
      className="relative py-32 lg:py-52 overflow-hidden"
    >
      <div className="absolute inset-0 bg-eai-paper/80 backdrop-blur-[2px]" aria-hidden="true" />
      <motion.div style={{ opacity, y }} className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Section eyebrow */}
        <motion.div
          className="mb-16 flex items-center gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
            Chapitre 04
          </span>
          <span className="h-px w-12 bg-eai-brass/40" />
          <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-warm-grey/60">
            La Structure
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-28 lg:items-center">
          {/* Left — wireframe visual */}
          <motion.div
            className="relative aspect-[4/3] border border-eai-line bg-eai-parchment/40 overflow-hidden shadow-[0_24px_80px_rgba(25,24,22,0.08)] backdrop-blur-sm"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-2">
              <WireframeSVG visible={isInView} />
            </div>
            {/* Inset image reveal — construction photo */}
            <motion.div
              className="absolute bottom-4 right-4 w-40 h-28 overflow-hidden border border-eai-brass/30 shadow-lg"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              <Image
                src="/images/cinematic/structure-build.png"
                alt="Chantier de construction EAI"
                fill
                className="object-cover filter grayscale brightness-90"
                sizes="160px"
              />
              <div className="absolute inset-0 bg-eai-brass/10" />
              <span className="absolute bottom-2 left-2 font-body text-[7px] uppercase tracking-[0.15em] text-eai-paper/80">
                Réalisation
              </span>
            </motion.div>
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Piloter la{' '}
              <span className="text-eai-brass">réalisation.</span>
            </motion.h2>

            <motion.p
              className="font-body text-lg leading-8 text-eai-warm-grey max-w-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              Du dossier technique au chantier, EAI assure le suivi, la
              coordination et la maîtrise des étapes clés pour préserver
              la qualité, les délais et la cohérence du projet.
            </motion.p>

            {/* Phase micro-copy */}
            <motion.p
              className="font-body text-[10px] uppercase tracking-[0.24em] text-eai-warm-grey/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Conception. Études. Coordination. Suivi.
            </motion.p>

            {/* Phases timeline */}
            <motion.div
              className="relative mt-2 flex flex-col gap-0 border-l border-eai-brass/25 pl-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              {[
                { phase: 'Conception', desc: 'Esquisse, plans, volumes, orientations' },
                { phase: 'Études', desc: 'Faisabilité, calculs, coordination technique' },
                { phase: 'Consultation', desc: 'Dossiers, analyse des offres, DCE' },
                { phase: 'Exécution', desc: 'Suivi chantier, contrôle qualité, réception' },
              ].map((item, i) => (
                <motion.div
                  key={item.phase}
                  className="relative py-4"
                  initial={{ opacity: 0, x: 14 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.75 + i * 0.1 }}
                >
                  <div className="absolute -left-[25px] top-[22px] h-2.5 w-2.5 rounded-full border border-eai-brass bg-eai-paper" />
                  <span className="font-body text-[10px] uppercase tracking-[0.16em] text-eai-brass block">
                    {item.phase}
                  </span>
                  <span className="font-body text-sm text-eai-warm-grey leading-6 mt-0.5 block">
                    {item.desc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
