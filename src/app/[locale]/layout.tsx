import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk, Libre_Baskerville } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/ui/Cursor';
import { routing } from '@/i18n/routing';

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <body
        className={`${display.variable} ${body.variable} ${accent.variable} bg-void text-parchment min-h-screen font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Cursor />
          <div className="fixed inset-0 pointer-events-none z-10 bg-[url('/noise.png')] opacity-[0.035]" />
          <Nav />
          {props.children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
