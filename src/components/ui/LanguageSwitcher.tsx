"use client"

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const locales = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'AR', name: 'العربية' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    // @ts-ignore - passing scroll: false to prevent jump/reload
    router.replace(pathname, { locale: newLocale, scroll: false });
    setIsOpen(false);
  };

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-white hover:text-white/70 transition-colors"
      >
        <Globe size={14} className="opacity-70" />
        {currentLocale.label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-4 bg-eai-charcoal/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden min-w-[140px] shadow-2xl"
          >
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`w-full text-left px-4 py-3 text-xs tracking-[0.1em] transition-colors flex items-center justify-between
                  ${locale === l.code ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                `}
              >
                <span>{l.name}</span>
                <span className="opacity-50 text-[10px] uppercase">{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
