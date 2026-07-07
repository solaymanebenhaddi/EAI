import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['fr', 'en', 'ar', 'it', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed', // Only add locale to URL if not default
  localeDetection: false
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
