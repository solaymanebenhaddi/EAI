'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import type { Locale } from '@/data/site';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const locales: Locale[] = ['fr', 'en', 'ar'];

  return (
    <div className="flex items-center gap-2 border-r border-ash pr-4 mr-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`text-[10px] font-body uppercase tracking-widest transition-colors ${
            locale === l ? 'text-brass font-bold' : 'text-linen hover:text-brass'
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
