'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, MessageCircle, CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/data/site';

export function Nav() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locales: Locale[] = ['fr', 'en', 'ar'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/expertises' },
    { name: t('projects'), href: '/projets' },
    { name: t('events'), href: '/events' },
    { name: t('about'), href: '/a-propos' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-600 ${
        isScrolled 
          ? 'bg-eai-paper/90 backdrop-blur-md border-b border-eai-line py-4'
          : 'bg-eai-paper/72 backdrop-blur-sm border-b border-eai-line/60 py-6'
      }`}
    >
      <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/images/LOGO.png" 
            alt="ELAOUAD Architecture & Ingénierie" 
            width={50} 
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="font-display text-[18px] tracking-[0.08em] leading-tight text-eai-charcoal">
              ELAOUAD
            </span>
            <span className="font-body text-[8px] tracking-[0.15em] uppercase text-eai-warm-grey group-hover:text-eai-brass transition-colors">
              Architecture & Ingénierie
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex justify-center items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-body text-label uppercase tracking-[0.12em] relative group transition-colors duration-280 ${
                  isActive ? 'text-eai-brass' : 'text-eai-warm-grey hover:text-eai-charcoal'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-[1px] bg-eai-brass transition-all duration-280 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </Link>
            );
          })}
        </div>

        {/* CTA & HAMBURGER */}
        <div className="flex justify-end items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 pr-4 lg:pr-6 mr-2 border-r border-eai-line">
            {locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={`text-[10px] font-body uppercase tracking-widest transition-colors ${
                  locale === l ? 'text-eai-brass font-bold' : 'text-eai-warm-grey hover:text-eai-brass'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden lg:block border border-eai-brass/60 text-eai-brass px-5 py-2 text-label uppercase tracking-[0.1em] hover:bg-eai-brass hover:text-eai-paper transition-all duration-280"
          >
            {t('startProject')}
          </Link>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden text-eai-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden bg-eai-paper"
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
                  className="font-display text-display-md italic text-eai-charcoal hover:text-eai-brass transition-colors"
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
                className="mt-4 border border-eai-brass text-eai-brass px-8 py-3 text-label uppercase tracking-[0.15em] hover:bg-eai-brass hover:text-eai-paper transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('startProject')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-full left-0 right-0 z-50 grid grid-cols-2 border-b border-eai-line lg:hidden bg-eai-paper/95 backdrop-blur-md shadow-md">
        <a
          href="https://wa.me/212666880038"
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
    </nav>
  );
}
