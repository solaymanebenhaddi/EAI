import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReferencesSection } from '@/components/projets/ReferencesSection';
import { Footer } from '@/components/Footer';
import { getReferencePageContent } from '@/data/references';
import type { Locale } from '@/data/site';
import { siteUrl } from '@/data/seo';

interface ProjetsPageProps {
  params: Promise<{ locale: string }>;
}

function normalizeLocale(locale: string): Locale {
  return locale === 'en' || locale === 'ar' ? locale : 'fr';
}

function generateStructuredData(locale: Locale) {
  const content = getReferencePageContent(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.subtitle,
    url: `${siteUrl}/${locale}/projets`,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: content.projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: project.title,
        description: project.description,
        locationCreated: project.location,
        genre: project.categoryLabel,
        url: `${siteUrl}/${locale}/projets#${project.slug}`,
        image: project.image ? `${siteUrl}${project.image}` : undefined,
      })),
    },
  };
}

export async function generateMetadata(props: ProjetsPageProps): Promise<Metadata> {
  const { locale: localeInput } = await props.params;
  const locale = normalizeLocale(localeInput);
  const content = getReferencePageContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: 'Nos Références | ELAOUAD Architecture & Ingénierie',
    description: content.subtitle,
    alternates: {
      canonical: `${siteUrl}/fr/projets`,
      languages: {
        fr: `${siteUrl}/fr/projets`,
        en: `${siteUrl}/en/projets`,
        ar: `${siteUrl}/ar/projets`,
        'x-default': `${siteUrl}/fr/projets`,
      },
    },
    openGraph: {
      title: 'Nos Références | ELAOUAD Architecture & Ingénierie',
      description: content.subtitle,
      url: `${siteUrl}/${locale}/projets`,
      siteName: 'ELAOUAD Architecture & Ingénierie',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/references/residence-casablanca.png',
          width: 1200,
          height: 630,
          alt: 'Références ELAOUAD Architecture & Ingénierie',
        },
      ],
    },
  };
}

export default async function ProjetsPage(props: ProjetsPageProps) {
  const { locale: localeInput } = await props.params;
  const locale = normalizeLocale(localeInput);
  setRequestLocale(locale);

  const content = getReferencePageContent(locale);

  return (
    <>
      <main className="min-h-screen bg-eai-paper">
        <Script
          id="projets-references-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(locale)) }}
        />
        <ReferencesSection content={content} />
      </main>
      <Footer />
    </>
  );
}
