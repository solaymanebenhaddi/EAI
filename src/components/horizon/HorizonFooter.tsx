'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/data/site';
import { useHorizonScene } from './HorizonSceneContext';

function Marquee({ phrases }: { phrases: string[] }) {
  return (
    <div className="overflow-hidden border-y border-eai-line py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...phrases, ...phrases].map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="font-body text-label uppercase tracking-[0.2em] text-eai-warm-grey/30">
            {phrase}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function HorizonFooter() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();
  const ctaLines = t.raw('ctaLines') as string[];
  const marquee = t.raw('marquee') as string[];
  const eventItems = t.raw('eventItems') as string[];
  const footerLocales: Locale[] = ['fr', 'en', 'ar'];
  const footerRef = useRef<HTMLElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { registerScene } = useHorizonScene();
  const isDarkTheme = pathname.startsWith('/events');

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('footer', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { name: t('navHome'), href: '/' },
    { name: t('navServices'), href: '/expertises' },
    { name: t('navProjects'), href: '/projets' },
    { name: t('navEvents'), href: '/events' },
    { name: t('expFormations'), href: '/formations' },
    { name: t('navAbout'), href: '/a-propos' },
    { name: t('navContact'), href: '/contact' },
  ];

  const expertiseLinks = [
    { name: t('expArchitecture'), href: '/expertises#01' },
    { name: t('expEngineering'), href: '/expertises#02' },
    { name: t('expBIM'), href: '/expertises#03' },
    { name: t('expCoordination'), href: '/expertises#04' },
    { name: t('expInterior'), href: '/expertises#05' },
    { name: t('expUrbanism'), href: '/expertises#06' },
    { name: t('expTopography'), href: '/expertises#07' },
    { name: t('expFormations'), href: '/expertises#08' },
  ];

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.05]);

  return (
    <footer ref={footerRef} id="footer" className={`relative overflow-hidden border-t ${isDarkTheme ? 'border-stone bg-void/80' : 'border-eai-line bg-eai-paper/80'} backdrop-blur-3xl`}>
      {/* Enhanced ELAOUAD Ghost Word with Fluid Blending */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden mix-blend-color-burn">
        <motion.span 
          style={{ y: ghostY, opacity: ghostOpacity }}
          className="select-none font-display text-[160px] leading-none text-eai-brass md:text-[260px] lg:text-[420px] font-bold tracking-tight"
        >
          ELAOUAD
        </motion.span>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(214,184,106,0.18),transparent_32%),radial-gradient(circle_at_78%_75%,rgba(122,145,134,0.14),transparent_34%)] mix-blend-multiply" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="py-20 text-center lg:py-32">
          <h2 className={`mb-8 font-display text-display-md leading-[0.9] ${isDarkTheme ? 'text-parchment' : 'text-eai-ink'}`}>
            {ctaLines.map((line, index) => (
              <span key={line} className={`block ${index === 1 ? 'text-eai-brass' : ''}`}>
                {line}
              </span>
            ))}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_click', { location: 'footer', label: 'contact' })}
              className="bg-eai-brass px-8 py-4 text-label uppercase tracking-widest text-eai-paper transition-all duration-500 hover:bg-eai-brass-soft md:px-10 md:py-5"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_click', { location: 'footer', label: 'consultation' })}
              className={`border ${isDarkTheme ? 'border-stone text-parchment bg-void/40' : 'border-eai-line text-eai-charcoal bg-eai-paper/40'} px-8 py-4 text-label uppercase tracking-widest transition-all duration-300 hover:border-eai-brass hover:text-eai-brass md:px-10 md:py-5`}
            >
              {t('ctaConsultation')}
            </Link>
            <a
              href="https://wa.me/212666798536"
              onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
              className={`border ${isDarkTheme ? 'border-stone text-parchment bg-void/40' : 'border-eai-line text-eai-charcoal bg-eai-paper/40'} px-8 py-4 text-label uppercase tracking-widest transition-all duration-300 hover:border-eai-brass hover:text-eai-brass md:px-10 md:py-5`}
            >
              {t('ctaWhatsapp')}
            </a>
            <Link
              href="/projets"
              onClick={() => trackEvent('cta_click', { location: 'footer', label: 'projects' })}
              className={`border ${isDarkTheme ? 'border-stone text-parchment bg-void/40' : 'border-eai-line text-eai-charcoal bg-eai-paper/40'} px-8 py-4 text-label uppercase tracking-widest transition-all duration-300 hover:border-eai-brass hover:text-eai-brass md:px-10 md:py-5`}
            >
              {t('ctaProjects')}
            </Link>
          </div>
        </div>

        <Marquee phrases={marquee} />

        <div className="grid grid-cols-2 gap-10 py-20 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          <div>
            <h4 className="mb-6 font-body text-label uppercase tracking-[0.2em] text-eai-brass">
              {t('navigation')}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={`font-body text-sm ${isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'} transition-colors`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-body text-label uppercase tracking-[0.2em] text-eai-brass">
              {t('expertise')}
            </h4>
            <ul className="flex flex-col gap-3">
              {expertiseLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={`font-body text-sm ${isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'} transition-colors`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-body text-label uppercase tracking-[0.2em] text-eai-brass">
              {t('events')}
            </h4>
            <ul className="flex flex-col gap-3">
              {eventItems.map((item) => (
                <li key={item}>
                  <Link href="/events" className={`font-body text-sm ${isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'} transition-colors`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-body text-label uppercase tracking-[0.2em] text-eai-brass">
              {t('contact')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="font-body text-sm text-eai-warm-grey">{t('office')}</li>
              <li>
                <a href="mailto:contact@eai-construction.com" className={`font-body text-sm ${isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'} transition-colors`}>
                  contact@eai-construction.com
                </a>
              </li>
              <li>
                <a href="tel:+212520198738" className={`font-body text-sm ${isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'} transition-colors`}>
                  +212 520 19 87 38
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-body text-label uppercase tracking-[0.2em] text-eai-brass">
              {t('languages')}
            </h4>
            <div className="flex gap-3">
              {footerLocales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={pathname}
                  locale={targetLocale}
                  className={`font-body text-sm uppercase tracking-widest transition-colors ${
                    locale === targetLocale 
                      ? 'text-eai-brass' 
                      : isDarkTheme ? 'text-eai-warm-grey hover:text-parchment' : 'text-eai-warm-grey hover:text-eai-charcoal'
                  }`}
                >
                  {targetLocale}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-between gap-4 border-t ${isDarkTheme ? 'border-stone' : 'border-eai-line'} py-8 md:flex-row`}>
          <p className="font-body text-xs text-eai-warm-grey/60">
            {t('copyright')}
          </p>
          <p className="font-body text-xs uppercase tracking-widest text-eai-warm-grey/40">
            {t('tagline')}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-24 left-8 z-50 flex h-12 w-12 items-center justify-center border ${isDarkTheme ? 'border-stone bg-void text-eai-warm-grey hover:border-eai-brass hover:text-eai-brass' : 'border-eai-line bg-eai-paper text-eai-warm-grey hover:border-eai-brass hover:text-eai-brass'} transition-all`}
            aria-label={t('backToTop')}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
