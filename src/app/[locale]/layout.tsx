import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk, Libre_Baskerville, Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Nav } from '@/components/Nav';
import { Cursor } from '@/components/ui/Cursor';
import { routing } from '@/i18n/routing';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import type { Locale } from '@/data/site';
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
  variable: '--font-display',
});

const body = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

const accent = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-accent',
});

const arabic = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'ELAOUAD Architecture et Ingénierie',
  description: 'Premium Moroccan architecture and engineering firm.',
};

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;
  const { locale } = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  
  // Use Arabic font for Arabic locale, otherwise use the standard fonts
  const fontClasses = locale === 'ar' 
    ? `${arabic.variable} font-arabic`
    : `${display.variable} ${body.variable} ${accent.variable} font-body`;

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        <SchemaOrg locale={locale as Locale} />
        {/* GA4 measurement hook */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${fontClasses} bg-eai-paper text-eai-charcoal min-h-screen antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ScrollDepthTracker />
          <Cursor />
          <div className="fixed inset-0 pointer-events-none z-10 bg-[url('/noise.png')] opacity-[0.02]" />
          <Nav />
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
