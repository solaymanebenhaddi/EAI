'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

const expertises = [
  { number: '01', title: 'Architecture', desc: "Concevoir des lieux avec sens, precision et caractere." },
  { number: '02', title: "Architecture d'interieur", desc: "Des espaces interieurs coherents, elegants et fonctionnels." },
  { number: '03', title: 'Urbanisme', desc: "Penser l'espace a l'echelle du territoire." },
  { number: '04', title: "Amenagements d'espaces", desc: "Espaces publics et prives concus pour l'usage et la qualite de vie." },
  { number: '05', title: 'Etudes de faisabilite', desc: "Analyser, verifier et securiser avant de s'engager." },
  { number: '06', title: 'Etudes techniques & economiques', desc: 'La base technique pour fiabiliser les decisions.' },
  { number: '07', title: "Assistance a maitrise d'ouvrage", desc: 'Accompagner le decideur a chaque etape strategique.' },
  { number: '08', title: 'Coordination des travaux', desc: 'Piloter le chantier avec methode et exigence.' },
  { number: '09', title: "Maitrise d'oeuvre", desc: 'Controle, conformite et qualite du debut a la reception.' },
  { number: '10', title: 'Topographie', desc: 'Comprendre le terrain avant de transformer le projet.' },
  { number: '11', title: 'Gestion de projets', desc: 'Une vision globale pour coordonner toutes les decisions.' },
  { number: '12', title: 'Formations professionnelles', desc: "Transmettre les competences qui construisent les metiers de demain." },
];

export function CinematicExpertiseGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-14%' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="expertises"
      className="relative py-32 lg:py-48 bg-transparent"
    >
      <div className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-eai-brass/50" />
              <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
                Domaines d&apos;intervention
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.4rem,4.5vw,6rem)] leading-[0.92] tracking-[-0.022em] text-eai-ink max-w-xl">
              Une chaîne d&apos;expertise{' '}
              <span className="text-eai-brass">complète.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/expertises"
              className="group inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.14em] text-eai-brass hover:text-eai-ink transition-colors border-b border-eai-brass/30 pb-1"
            >
              Toutes les expertises
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Expertise items */}
        <div className="flex flex-col">
          {expertises.map((exp, i) => (
            <motion.div
              key={exp.number}
              className="relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover accent line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-eai-brass"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
              />

              <Link
                href={`/expertises#${exp.number}`}
                className="group flex items-center gap-6 border-b border-eai-line py-5 pl-6 pr-4 transition-colors duration-300 hover:bg-eai-paper/60 sm:gap-10"
              >
                <span className="font-body w-8 shrink-0 text-[10px] uppercase tracking-[0.18em] text-eai-brass/60">
                  {exp.number}
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-8">
                  <h3 className="font-body shrink-0 text-base font-medium uppercase tracking-[0.08em] text-eai-charcoal transition-colors group-hover:text-eai-brass sm:text-lg sm:w-64 lg:w-80">
                    {exp.title}
                  </h3>
                  <p className="font-body text-sm text-eai-warm-grey/70 leading-relaxed transition-opacity group-hover:opacity-100 opacity-0 sm:opacity-70">
                    {exp.desc}
                  </p>
                </div>

                <motion.div
                  className="shrink-0 text-eai-warm-grey/40 transition-colors group-hover:text-eai-brass"
                  animate={{ x: hoveredIndex === i ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
