'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');
  const tServices = useTranslations('Services');
  const locale = useLocale();

  const navLinks = [
    { name: t('services'), href: `/${locale}/expertises` },
    { name: t('projects'), href: `/${locale}/projets` },
    { name: t('about'), href: `/${locale}/a-propos` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const expertises = [
    tServices('architecture'),
    tServices('bim'),
    tServices('interior'),
    'Urbanisme',
  ];

  return (
    <footer className="bg-stone border-t border-ash pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* ROW 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <Link href={`/${locale}`} className="flex flex-col">
            <span className="font-display text-[28px] tracking-[0.08em] text-parchment leading-tight">
              ELAOUAD
            </span>
          </Link>
          <p className="font-body text-label text-mortar uppercase tracking-[0.15em]">
            {tFooter('tagline')}
          </p>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="font-body text-label text-brass uppercase tracking-widest mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="font-body text-label text-mortar uppercase hover:text-brass transition-colors w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-label text-brass uppercase tracking-widest mb-6">Expertises</h4>
            <div className="flex flex-col gap-3">
              {expertises.map((item) => (
                <span 
                  key={item} 
                  className="font-body text-label text-mortar uppercase w-fit cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-label text-brass uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-3 font-body text-label text-mortar uppercase">
              <span>+212 522 XXX XXX</span>
              <a href="mailto:contact@eai-construction.com" className="hover:text-brass transition-colors">
                contact@eai-construction.com
              </a>
              <span>Casablanca, Maroc</span>
            </div>
          </div>

          <div>
            <h4 className="font-body text-label text-brass uppercase tracking-widest mb-6">Langues</h4>
            <div className="flex gap-4 font-body text-label text-mortar uppercase">
              <Link href="/fr" className={`${locale === 'fr' ? 'text-brass' : 'hover:text-brass'}`}>FR</Link>
              <Link href="/ar" className={`${locale === 'ar' ? 'text-brass' : 'hover:text-brass'}`}>العربية</Link>
              <Link href="/en" className={`${locale === 'en' ? 'text-brass' : 'hover:text-brass'}`}>EN</Link>
            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="border-t border-ash pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-label text-dust text-center md:text-left">
            {tFooter('copyright')}
          </p>
          <div className="flex gap-6">
            {/* Social links placeholder */}
            <span className="font-body text-label text-mortar uppercase hover:text-brass transition-colors cursor-pointer">LinkedIn</span>
            <span className="font-body text-label text-mortar uppercase hover:text-brass transition-colors cursor-pointer">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}