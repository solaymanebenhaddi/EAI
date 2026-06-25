'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '+50', label: 'Projets livrés' },
    { value: '8', label: "Années d'expérience" },
    { value: '3', label: 'Disciplines' },
    { value: '100%', label: 'Engagement client' },
  ];

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] overflow-hidden bg-eai-ink"
      aria-label="Accueil — ELAOUAD Architecture"
    >
      {/* Parallax image */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/home/hero-arch.png"
          alt="Projet architectural ELAOUAD — Maroc"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-eai-ink/60 via-eai-ink/30 to-eai-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-eai-ink/50 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-28 sm:px-10 lg:px-16 xl:px-20"
      >
        {/* Top label row */}
        <div className="flex items-center justify-between">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-eai-brass-soft" aria-hidden="true" />
              <span className="font-body text-[10px] uppercase tracking-[0.18em] text-eai-brass-soft">
                Architecture · Design · Ingénierie
              </span>
            </motion.div>
          )}
          {mounted && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-body text-[10px] uppercase tracking-[0.12em] text-white/40"
            >
              Maroc — 2024
            </motion.span>
          )}
        </div>

        {/* Main headline */}
        <div className="max-w-5xl">
          {mounted && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(52px,8vw,120px)] italic leading-[0.9] tracking-[-0.02em] text-white"
              >
                Concevoir.
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(52px,8vw,120px)] italic leading-[0.9] tracking-[-0.02em] text-eai-brass-soft"
              >
                Construire.
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(52px,8vw,120px)] italic leading-[0.9] tracking-[-0.02em] text-white"
              >
                Transmettre.
              </motion.h1>
            </>
          )}

          {mounted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 max-w-sm font-body text-sm leading-relaxed text-white/60 sm:text-base"
            >
              Cabinet d&apos;architecture et d&apos;ingénierie basé au Maroc.
              Projets résidentiels, tertiaires et publics — de la conception à la livraison.
            </motion.p>
          )}

          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-10 flex items-center gap-5"
            >
              <Link
                href="/projets"
                className="group flex items-center gap-2 border border-white/20 px-6 py-3 font-body text-[11px] uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-eai-brass-soft hover:text-eai-brass-soft"
              >
                Voir nos projets
                <ArrowDownRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-eai-brass-soft px-6 py-3 font-body text-[11px] uppercase tracking-[0.14em] text-eai-ink transition-all duration-300 hover:bg-eai-brass-pale"
              >
                Démarrer un projet
              </Link>
            </motion.div>
          )}
        </div>

        {/* Stats strip */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="border-t border-white/10 pt-6"
          >
            <dl className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:gap-y-0">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-1 ${i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''}`}>
                  <dt className="font-body text-[10px] uppercase tracking-[0.12em] text-white/40">{s.label}</dt>
                  <dd className="font-display text-3xl italic text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 right-10 z-10 hidden items-center gap-3 lg:flex"
          aria-hidden="true"
        >
          <span className="font-body text-[9px] uppercase tracking-[0.2em] text-white/30">Défiler</span>
          <div className="flex h-10 w-px flex-col overflow-hidden bg-white/10">
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              className="h-full w-full bg-eai-brass-soft"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
