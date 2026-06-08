'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarCheck, Menu, MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/data/site';

export function Nav() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locales: Locale[] = ['fr', 'en', 'ar'];
  const isDarkTheme = pathname.startsWith('/events');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/expertises' },
    { name: t('projects'), href: '/projets' },
    { name: t('events'), href: '/events' },
    { name: t('courses'), href: '/formations' },
    { name: t('about'), href: '/a-propos' },
    { name: t('contact'), href: '/contact' },
  ];

  const navSurface = isScrolled
    ? isDarkTheme
      ? 'border-b border-stone bg-void/90 py-4 backdrop-blur-md'
      : 'border-b border-eai-line bg-eai-paper/90 py-4 backdrop-blur-md'
    : isDarkTheme
      ? 'border-b border-stone/60 bg-void/72 py-5 backdrop-blur-sm'
      : 'border-b border-eai-line/60 bg-eai-paper/82 py-5 backdrop-blur-sm';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] border border-eai-brass bg-eai-paper px-4 py-3 text-label uppercase tracking-[0.12em] text-eai-ink shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-eai-brass"
      >
        {t('skipToContent')}
      </a>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-600 ${navSurface}`}>
        <div className="relative z-50 mx-auto flex w-full max-w-[1720px] items-center justify-between gap-5 px-5 sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3 xl:w-[220px]">
            <Image
              src="/images/LOGO-4k.png"
              alt="ELAOUAD Architecture & Ingénierie"
              width={250}
              height={100}
              className="h-10 w-auto shrink-0 object-contain"
              priority
            />
            <div className="flex min-w-0 flex-col">
              <span className={`font-display text-[18px] leading-tight tracking-[0.08em] ${isDarkTheme ? 'text-parchment' : 'text-eai-charcoal'}`}>
                ELAOUAD
              </span>
              <span className={`hidden font-body text-[8px] uppercase tracking-[0.15em] transition-colors group-hover:text-eai-brass sm:block ${isDarkTheme ? 'text-stone-300' : 'text-eai-warm-grey'}`}>
                Architecture & Ingénierie
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative whitespace-nowrap font-body text-[10px] uppercase tracking-[0.12em] transition-colors duration-280 2xl:text-label ${
                    isActive
                      ? 'text-eai-brass'
                      : isDarkTheme
                        ? 'text-stone-400 hover:text-parchment'
                        : 'text-eai-warm-grey hover:text-eai-charcoal'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-eai-brass transition-all duration-280 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-5 xl:w-[260px] 2xl:w-[360px]">
            <div className={`flex items-center gap-2 border-r pr-3 sm:pr-4 xl:pr-5 ${isDarkTheme ? 'border-stone' : 'border-eai-line'}`}>
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={pathname}
                  locale={targetLocale}
                  className={`font-body text-[10px] uppercase tracking-widest transition-colors ${
                    locale === targetLocale
                      ? 'font-bold text-eai-brass'
                      : isDarkTheme
                        ? 'text-stone-400 hover:text-eai-brass'
                        : 'text-eai-warm-grey hover:text-eai-brass'
                  }`}
                >
                  {targetLocale}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              className="hidden whitespace-nowrap border border-eai-brass/60 px-5 py-2 text-label uppercase tracking-[0.1em] text-eai-brass transition-all duration-280 hover:bg-eai-brass hover:text-eai-paper 2xl:block"
            >
              {t('startProject')}
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`flex h-10 w-10 items-center justify-center border transition-colors xl:hidden ${
                isDarkTheme ? 'border-stone text-parchment' : 'border-eai-line text-eai-charcoal'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-start gap-6 overflow-y-auto pb-12 pt-28 xl:hidden ${isDarkTheme ? 'bg-void' : 'bg-eai-paper'}`}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`font-display text-display-md italic transition-colors ${
                    isDarkTheme ? 'text-parchment hover:text-eai-brass' : 'text-eai-charcoal hover:text-eai-brass'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.1 }}
            >
              <Link
                href="/contact"
                className="mt-4 border border-eai-brass px-8 py-3 text-label uppercase tracking-[0.15em] text-eai-brass transition-all hover:bg-eai-brass hover:text-eai-paper"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('startProject')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobileMenuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-eai-line bg-eai-paper/95 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] backdrop-blur-md lg:hidden">
          <a
            href="https://wa.me/212666798536"
            onClick={() => trackEvent('whatsapp_click', { location: 'mobile_sticky_nav' })}
            className="flex h-14 items-center justify-center gap-2 border-r border-eai-line font-body text-label uppercase tracking-[0.12em] text-eai-warm-grey transition-colors hover:text-eai-brass"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>{t('whatsapp')}</span>
          </a>
          <Link
            href="/contact"
            onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_nav', label: 'consultation' })}
            className="flex h-14 items-center justify-center gap-2 bg-eai-brass font-body text-label uppercase tracking-[0.12em] text-eai-paper transition-colors hover:bg-eai-brass-soft"
          >
            <CalendarCheck size={16} aria-hidden="true" />
            <span>{t('startProject')}</span>
          </Link>
        </div>
      )}
    </>
  );
}
