import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://eai-construction.com',
      siteName: 'ELAOUAD',
      images: [
        {
          url: '/assets/elaouad-architecture.webp',
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = await getTranslations({ locale, namespace: 'SEO' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ELAOUAD Architecture & Engineering",
    "url": "https://eai-construction.com",
    "logo": "https://eai-construction.com/logo.png",
    "description": t('description'),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+212-000-000-000",
      "contactType": "customer service"
    }
  };

  return (
    <html lang={locale} dir={dir} className={`${interTight.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-full flex flex-col no-scrollbar">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
