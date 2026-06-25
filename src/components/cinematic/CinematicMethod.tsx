'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Écouter',
    desc: 'Comprendre votre programme, vos contraintes, votre budget et vos ambitions.',
  },
  {
    number: '02',
    title: 'Analyser',
    desc: 'Lecture du site, des réglementations, des enjeux techniques et de faisabilité.',
  },
  {
    number: '03',
    title: 'Concevoir',
    desc: 'Transformer les intentions en plans cohérents, mesurables et exploitables.',
  },
  {
    number: '04',
    title: 'Coordonner',
    desc: 'Piloter les intervenants, les études, la consultation et la réalisation.',
  },
  {
    number: '05',
    title: 'Livrer',
    desc: "Accompagner jusqu'a la reception avec rigueur, qualite et transparence.",
  },
];

export function CinematicMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-14%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="methode"
      className="relative py-32 lg:py-48 overflow-hidden bg-transparent"
    >
      <div className="mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-eai-brass/50" />
            <span className="font-body text-[9px] uppercase tracking-[0.28em] text-eai-brass">
              Notre méthode
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,6rem)] leading-[0.92] tracking-[-0.022em] text-eai-ink">
            Une méthode claire pour transformer une{' '}
            <span className="text-eai-brass">vision en projet maîtrisé.</span>
          </h2>
        </motion.div>

        {/* Steps — vertical timeline on desktop, stack on mobile */}
        <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-5">
          {/* Connecting line (desktop) */}
          <div className="absolute hidden lg:block top-[32px] left-0 right-0 h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-eai-brass/50 via-eai-brass/30 to-eai-brass/50"
              style={{ scaleX: lineScaleY, originX: 0 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col gap-5 py-6 lg:px-6 lg:py-0 lg:pt-14"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {/* Node circle */}
              <div className="flex items-center gap-4 lg:flex-col lg:gap-0 lg:items-start">
                <motion.div
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-eai-brass/40 bg-eai-paper"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-body text-[9px] text-eai-brass">{step.number}</span>
                </motion.div>

                {/* Mobile connecting line */}
                {i < steps.length - 1 && (
                  <div className="h-full w-px bg-eai-line lg:hidden" />
                )}
              </div>

              <div className="lg:mt-8">
                <h3 className="font-display text-2xl text-eai-ink mb-2 lg:text-3xl">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-6 text-eai-warm-grey">
                  {step.desc}
                </p>
              </div>

              {/* Active highlight bar */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px lg:hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(111,115,81,0.35), transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
