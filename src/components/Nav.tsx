'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { Menu, X, Globe } from 'lucide-react';

export function Nav() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: t('about'), href: '/a-propos' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-600 ${
        isScrolled 
          ? 'bg-void/90 backdrop-blur-md border-b border-gold-line py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* LOGO */}
        <Link href="/" className="flex flex-col group">
          <span className="font-display text-[22px] tracking-[0.08em] text-parchment leading-tight">
            ELAOUAD
          </span>
          <span className="font-body text-[9px] tracking-[0.15em] uppercase text-mortar group-hover:text-brass transition-colors">
            Architecture & Ingénierie
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex justify-center items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-body text-label uppercase tracking-[0.12em] relative group transition-colors duration-280 ${
                  isActive ? 'text-brass' : 'text-linen hover:text-parchment'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-[1px] bg-brass transition-all duration-280 ease-out ${
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
          <div className="flex items-center gap-2 border-r border-ash/30 pr-4 md:pr-6 mr-2">
            {['fr', 'en', 'ar'].map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l as any}
                className={`text-[10px] font-body uppercase tracking-widest transition-colors ${
                  locale === l ? 'text-brass font-bold' : 'text-mortar hover:text-brass'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:block border border-brass text-brass px-5 py-2 text-label uppercase tracking-[0.1em] hover:bg-brass hover:text-void transition-all duration-280"
          >
            {t('startProject')}
          </Link>

          <button
            className="md:hidden text-parchment"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-void z-40 flex flex-col items-center justify-center gap-8 md:hidden"
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
                  className="font-display text-display-md text-parchment italic hover:text-brass transition-colors"
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
                className="mt-4 border border-brass text-brass px-8 py-3 text-label uppercase tracking-[0.15em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('startProject')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
