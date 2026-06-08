'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MessageSquareText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { HorizonFrame } from './HorizonFrame';
import { HorizonGrid } from './HorizonGrid';
import { HorizonMagneticButton } from './HorizonMagneticButton';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { trackEvent } from '@/lib/analytics';
import { useHorizonScene } from './HorizonSceneContext';

function ProofStats({ isActive }: { isActive: boolean }) {
  const t = useTranslations('Hero');
  const stats = [
    { value: '100+', label: t('projectsStat') },
    { value: '10K+', label: t('visitorsStat') },
    { value: '4', label: t('continentsStat') },
  ];

  return (
    <div className="grid grid-cols-3 border border-eai-line bg-eai-paper/52 shadow-[0_24px_80px_rgba(25,24,22,0.08)] backdrop-blur-md">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: isActive ? 1.1 + index * 0.12 : 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`min-w-0 px-4 py-4 sm:px-6 ${index !== stats.length - 1 ? 'border-r border-eai-line' : ''}`}
        >
          <span className="block text-[9px] uppercase tracking-[0.18em] text-eai-warm-grey">
            {stat.label}
          </span>
          <span className="font-display mt-2 block text-3xl leading-none text-eai-ink sm:text-4xl">
            {stat.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function HorizonHero() {
  const t = useTranslations('Hero');
  const heroRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'hero';

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('hero', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.55]);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[100svh] overflow-hidden bg-transparent">
      <HorizonGrid />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_18%,rgba(214,184,106,0.12),transparent_34%),linear-gradient(90deg,rgba(248,245,238,0.72)_0%,rgba(248,245,238,0.44)_38%,rgba(248,245,238,0.14)_68%,rgba(248,245,238,0.00)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-eai-paper/72 via-eai-paper/34 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-eai-paper/78 via-eai-paper/28 to-transparent pointer-events-none" />

      <div className="absolute left-4 top-0 hidden h-full w-px bg-eai-brass/16 lg:block" />
      <div className="absolute right-4 top-0 hidden h-full w-px bg-eai-brass/16 lg:block" />
      <motion.div
        className="absolute left-0 top-[58%] z-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-eai-brass/45 to-transparent"
        style={{ scaleX: lineScale }}
      />

      <HorizonFrame showGrid={false} showLight={false} horizonLine={false}>
        <motion.div
          className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1720px] items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-36"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 flex flex-wrap items-center gap-4"
            >
              <HorizonSectionLabel>{t('location')}</HorizonSectionLabel>
              <span className="hidden h-px w-16 bg-eai-brass/40 sm:block" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-eai-taupe">
                {t('studioLabel')}
              </span>
            </motion.div>

            <motion.h1
              className="font-display max-w-[12ch] text-[4.15rem] leading-[0.78] text-eai-ink sm:text-[7.1rem] lg:text-[9.5rem] xl:text-[11.2rem]"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.12 }}
            >
              {[t('titleLine1'), t('titleLine2'), t('titleLine3')].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span
                    className={`block ${index === 1 ? 'text-eai-brass' : ''}`}
                    initial={{ y: '110%', rotateX: 18 }}
                    animate={isActive ? { y: 0, rotateX: 0 } : { y: '110%', rotateX: 18 }}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.22 + index * 0.14 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <div className="mt-8 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(290px,0.45fr)] lg:items-end">
              <motion.p
                className="max-w-3xl text-lg leading-8 text-eai-charcoal sm:text-xl sm:leading-9"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.72 }}
              >
                {t('description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.8, delay: 0.88 }}
                className="border-l border-eai-brass/35 pl-5"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-eai-brass">
                  {t('axisLabel')}
                </p>
                <p className="mt-3 text-sm leading-6 text-eai-taupe">
                  {t('videoLabel')}
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5 sm:gap-7"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.98 }}
            >
              <HorizonMagneticButton>
                <Link
                  href="/projets"
                  onClick={() => trackEvent('cta_click', { location: 'hero', label: 'projects' })}
                  className="inline-flex items-center justify-center gap-3 bg-eai-ink px-7 py-4 text-label uppercase tracking-widest text-eai-paper shadow-[0_22px_60px_rgba(25,24,22,0.22)] transition-all duration-500 hover:bg-eai-charcoal sm:px-9"
                >
                  {t('primaryCta')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </HorizonMagneticButton>
              <HorizonMagneticButton>
                <Link
                  href="/contact"
                  onClick={() => trackEvent('cta_click', { location: 'hero', label: 'consultation' })}
                  className="inline-flex items-center justify-center gap-3 border border-eai-brass/45 bg-eai-paper/36 px-7 py-4 text-label uppercase tracking-widest text-eai-charcoal backdrop-blur-md transition-all duration-300 hover:border-eai-brass hover:text-eai-brass sm:px-9"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  {t('secondaryCta')}
                </Link>
              </HorizonMagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10 max-w-3xl"
            >
              <ProofStats isActive={isActive} />
            </motion.div>
          </div>
        </motion.div>
      </HorizonFrame>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey/60">
          {t('scroll')}
        </span>
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-eai-brass/50 to-transparent"
          animate={{ scaleY: [1, 0.45, 1], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
