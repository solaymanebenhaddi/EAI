import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  ContactHero,
  ContactOptions,
  ContactForm,
  PrepareRequest,
  RequestRouting,
  OfficeDetails,
  AfterSubmission,
  ContactFAQ,
  ContactFinalCTA,
} from '@/components/contact';
import { Footer } from '@/components/Footer';
import type { Locale } from '@/data/site';
import { siteUrl } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const isFr = locale === 'fr';
  const isEn = locale === 'en';

  return {
    metadataBase: new URL(siteUrl),
    title: isFr
      ? 'Contact EAI | ELAOUAD Architecture & Ingénierie Casablanca'
      : isEn
        ? 'Contact EAI | ELAOUAD Architecture & Engineering Casablanca'
        : 'اتصل بـ EAI | ELAOUAD للهندسة المعمارية والهندسة الدار البيضاء',
    description: isFr
      ? 'Contactez ELAOUAD Architecture & Ingénierie à Casablanca pour vos projets d\'architecture, ingénierie, BIM, design intérieur, maîtrise d\'œuvre, formations ou événements professionnels.'
      : isEn
        ? 'Contact ELAOUAD Architecture & Engineering in Casablanca for architecture, engineering, BIM, interior design, project management, training or professional events.'
        : 'اتصل بـ ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء لمشاريع العمارة والهندسة وBIM والتصميم الداخلي وإدارة المشاريع والتكوين أو الفعاليات المهنية.',
    alternates: {
      canonical: `${siteUrl}/fr/contact`,
      languages: {
        fr: `${siteUrl}/fr/contact`,
        en: `${siteUrl}/en/contact`,
        ar: `${siteUrl}/ar/contact`,
        'x-default': `${siteUrl}/fr/contact`,
      },
    },
    openGraph: {
      title: isFr
        ? 'Contact EAI | ELAOUAD Architecture & Ingénierie'
        : isEn
          ? 'Contact EAI | ELAOUAD Architecture & Engineering'
          : 'اتصل بـ EAI | ELAOUAD للهندسة المعمارية والهندسة',
      description: isFr
        ? 'Contactez ELAOUAD Architecture & Ingénierie à Casablanca pour vos projets d\'architecture, ingénierie, BIM, design intérieur, maîtrise d\'œuvre, formations ou événements professionnels.'
        : isEn
          ? 'Contact ELAOUAD Architecture & Engineering in Casablanca for architecture, engineering, BIM, interior design, project management, training or professional events.'
          : 'اتصل بـ ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء لمشاريع العمارة والهندسة وBIM والتصميم الداخلي.',
      url: `${siteUrl}/${locale}/contact`,
      siteName: 'ELAOUAD Architecture & Ingénierie',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/contact/hero-contact.webp',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Contact ELAOUAD Architecture & Ingénierie à Casablanca'
            : isEn
              ? 'Contact ELAOUAD Architecture & Engineering in Casablanca'
              : 'اتصل بـ ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء',
        },
      ],
    },
  };
}

function ContactJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'mainEntity': {
      '@type': ['ProfessionalService', 'ArchitecturalFirm'],
      'name': 'ELAOUAD Architecture & Ingénierie',
      'url': siteUrl,
      'logo': `${siteUrl}/images/LOGO-4k.png`,
      'image': `${siteUrl}/images/contact/hero-contact.webp`,
      'telephone': '+212-520-19-87-38',
      'email': 'contact@eai-construction.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '10 Florida Center Park 2, Boulevard Zoulikha Nasri, Sidi Maârouf',
        'addressLocality': 'Casablanca',
        'postalCode': '20200',
        'addressCountry': 'MA',
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+212-520-19-87-38',
        'contactType': 'customer service',
        'email': 'contact@eai-construction.com',
        'availableLanguage': ['French', 'English', 'Arabic'],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <ContactJsonLd />
      <main className="min-h-screen">
        <ContactHero />
        <ContactOptions />
        <ContactForm />
        <PrepareRequest />
        <RequestRouting />
        <OfficeDetails />
        <AfterSubmission />
        <ContactFAQ />
        <ContactFinalCTA />
      </main>
      <Footer />
    </>
  );
}
