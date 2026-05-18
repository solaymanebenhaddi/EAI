'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { eventStats, getEvents, getLocalizedStats, type Locale } from '@/data/site';
import { trackEvent } from '@/lib/analytics';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';

export function HorizonEvents({ locale }: { locale: Locale }) {
  const t = useTranslations('Events');
  const headlineLines = t.raw('headlineLines') as string[];
  const whyItems = t.raw('whyItems') as string[];
  const timeline = t.raw('timeline') as string[];
  const events = getEvents(locale);
  const fidi = events[0];
  const stats = getLocalizedStats(eventStats, locale);
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'events';

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('events', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-32 lg:py-48">
      <HorizonFrame showGrid showLight>
        <div className="container mx-auto px-6">
          <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <HorizonSectionLabel className="mb-10">
                {t('label')}
              </HorizonSectionLabel>
              <h2 className="font-display text-display-lg leading-[0.95] text-eai-ink">
                {headlineLines.map((line, index) => (
                  <span key={line} className={`block ${index === 0 ? 'text-eai-brass' : ''}`}>
                    {line}
                  </span>
                ))}
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-xl font-body text-lg leading-relaxed text-eai-warm-grey lg:justify-self-end"
            >
              {fidi?.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden border border-eai-line bg-eai-parchment/60 backdrop-blur-md shadow-[0_34px_90px_rgba(25,24,22,0.10)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(184,150,60,0.12),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(122,145,134,0.20),transparent_30%)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
                <Image
                  src={fidi?.image ?? '/images/event.webp'}
                  alt={fidi?.title ?? t('event')}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eai-ink/45 via-transparent to-eai-paper/10" />
                <div className="absolute left-6 top-6 border border-eai-brass-pale/60 bg-eai-paper/70 px-4 py-3 backdrop-blur-md">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass">
                    {t('date')}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col justify-between p-8 md:p-12 lg:p-16">
                <div>
                  <p className="mb-5 font-body text-[11px] uppercase tracking-[0.22em] text-eai-brass">
                    {t('location')}
                  </p>
                  <h3 className="mb-8 font-display text-[46px] leading-[0.95] text-eai-ink md:text-[76px]">
                    {fidi?.title ?? 'FIDI 2026'}
                  </h3>
                  <p className="max-w-2xl font-body text-base leading-relaxed text-eai-taupe">
                    {t('event')}
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-l border-eai-brass/30 pl-4">
                      <p className="font-display text-[34px] leading-none text-eai-ink">{stat.value}</p>
                      <p className="mt-3 font-body text-[10px] uppercase tracking-[0.14em] text-eai-warm-grey">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Link
                    href="/events/fidi-2026"
                    onClick={() => trackEvent('event_cta_click', { slug: 'fidi-2026', label: 'learn_more' })}
                    className="bg-eai-brass px-7 py-4 font-body text-label uppercase tracking-[0.14em] text-eai-paper transition-colors hover:bg-eai-brass-soft"
                  >
                    {t('cta')}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => trackEvent('event_cta_click', { slug: 'fidi-2026', label: 'exhibitor' })}
                    className="border border-eai-line px-7 py-4 font-body text-label uppercase tracking-[0.14em] text-eai-charcoal transition-colors hover:border-eai-brass hover:text-eai-brass bg-eai-paper/40"
                  >
                    {t('exhibitorCta')}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => trackEvent('event_cta_click', { slug: 'fidi-2026', label: 'partner' })}
                    className="border border-eai-line px-7 py-4 font-body text-label uppercase tracking-[0.14em] text-eai-charcoal transition-colors hover:border-eai-brass hover:text-eai-brass bg-eai-paper/40"
                  >
                    {t('partnerCta')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Why Participate */}
            <div className="border border-white/20 py-10 bg-white/10 backdrop-blur-xl px-8 shadow-xl rounded-sm">
              <h3 className="mb-8 font-body text-label uppercase tracking-[0.18em] text-eai-brass">
                {t('whyTitle')}
              </h3>
              <div className="grid gap-6">
                {whyItems.map((item, index) => (
                  <motion.p
                    key={item}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.15 + index * 0.08 : 0 }}
                    className="border-l-2 border-eai-brass/50 pl-5 font-body text-[15px] leading-relaxed text-eai-ink font-medium"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative border border-white/20 py-10 bg-white/10 backdrop-blur-xl px-8 shadow-xl rounded-sm">
              <div className="absolute left-0 right-0 top-[40%] hidden h-px bg-eai-brass/30 md:block" />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 relative z-10">
                {timeline.map((item, index) => (
                  <div key={item} className="relative bg-white/40 p-6 border border-white/50 shadow-lg backdrop-blur-md rounded-sm transform transition-transform hover:-translate-y-2 cursor-default">
                    <span className="mb-6 block font-mono text-[11px] text-eai-ink font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.15em] text-eai-ink font-bold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee Sponsor Strip */}
          <div className="mt-16 overflow-hidden border-y border-white/20 bg-white/5 backdrop-blur-md py-6">
            <motion.div 
              className="flex whitespace-nowrap gap-16 lg:gap-32 items-center px-4"
              animate={{ x: [0, -1035] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 lg:gap-32 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <span className="font-display text-2xl font-bold tracking-widest uppercase text-eai-ink">Partner {i % 5 + 1}</span>
                  <span className="w-1.5 h-1.5 bg-eai-brass rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/events"
              className="group flex items-center gap-6 text-label uppercase tracking-[0.15em] text-eai-charcoal"
            >
              <span className="transition-colors group-hover:text-eai-brass">{t('viewAll')}</span>
              <span className="flex h-10 w-10 items-center justify-center border border-eai-line transition-all duration-500 group-hover:border-eai-brass group-hover:bg-eai-brass group-hover:text-eai-paper bg-eai-paper/30">
                →
              </span>
            </Link>
          </div>
        </div>
      </HorizonFrame>
    </section>
  );
}
