import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  AboutHero,
  CompanyStory,
  FounderSection,
  DifferentiationSection,
  MissionVisionValues,
  EcosystemSection,
  TeamCulture,
  DesignPrinciples,
  TrustCredibility,
  TimelineSection,
  AboutCTA,
} from '@/components/about';
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
      ? 'À propos EAI | ELAOUAD Architecture & Ingénierie à Casablanca'
      : isEn
        ? 'About EAI | ELAOUAD Architecture & Engineering in Casablanca'
        : 'حول EAI | ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء',
    description: isFr
      ? 'Découvrez ELAOUAD Architecture & Ingénierie, un écosystème marocain dédié à l\'architecture, l\'ingénierie, le BIM, la maîtrise d\'œuvre, la formation et les événements professionnels.'
      : isEn
        ? 'Discover ELAOUAD Architecture & Engineering, a Moroccan ecosystem dedicated to architecture, engineering, BIM, project management, training and professional events.'
        : 'اكتشف ELAOUAD للهندسة المعمارية والهندسة، منظومة مغربية مخصصة للعمارة والهندسة وBIM وإدارة المشاريع والتكوين والفعاليات المهنية.',
    alternates: {
      canonical: `${siteUrl}/fr/a-propos`,
      languages: {
        fr: `${siteUrl}/fr/a-propos`,
        en: `${siteUrl}/en/a-propos`,
        ar: `${siteUrl}/ar/a-propos`,
        'x-default': `${siteUrl}/fr/a-propos`,
      },
    },
    openGraph: {
      title: isFr
        ? 'À propos EAI | ELAOUAD Architecture & Ingénierie'
        : isEn
          ? 'About EAI | ELAOUAD Architecture & Engineering'
          : 'حول EAI | ELAOUAD للهندسة المعمارية والهندسة',
      description: isFr
        ? 'Découvrez ELAOUAD Architecture & Ingénierie, un écosystème marocain dédié à l\'architecture, l\'ingénierie, le BIM, la maîtrise d\'œuvre, la formation et les événements professionnels.'
        : isEn
          ? 'Discover ELAOUAD Architecture & Engineering, a Moroccan ecosystem dedicated to architecture, engineering, BIM, project management, training and professional events.'
          : 'اكتشف ELAOUAD للهندسة المعمارية والهندسة، منظومة مغربية مخصصة للعمارة والهندسة وBIM وإدارة المشاريع والتكوين والفعاليات المهنية.',
      url: `${siteUrl}/${locale}/a-propos`,
      siteName: 'ELAOUAD Architecture & Ingénierie',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/about/hero-eai-studio.webp',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Studio ELAOUAD Architecture & Ingénierie à Casablanca'
            : isEn
              ? 'ELAOUAD Architecture & Engineering studio in Casablanca'
              : 'استوديو ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء',
        },
      ],
    },
  };
}

function AboutJsonLd({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr';
  const isEn = locale === 'en';

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': ['Organization', 'ArchitecturalFirm'],
      'name': 'ELAOUAD Architecture & Ingénierie',
      'url': siteUrl,
      'logo': `${siteUrl}/images/LOGO-4k.png`,
      'image': `${siteUrl}/images/about/hero-eai-studio.webp`,
      'description': isFr
        ? 'Cabinet d\'architecture et d\'ingénierie premium basé à Casablanca, Maroc, combinant architecture, ingénierie, BIM, maîtrise d\'œuvre, formation et événements professionnels.'
        : isEn
          ? 'Premium architecture and engineering firm based in Casablanca, Morocco, combining architecture, engineering, BIM, project management, training and professional events.'
          : 'مكتب راق للهندسة المعمارية والهندسة مقره الدار البيضاء، المغرب، يجمع بين العمارة والهندسة وBIM وإدارة المشاريع والتكوين والفعاليات المهنية.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '10 Florida Center Park 2, Boulevard Zoulikha Nasri, Sidi Maarouf',
        'addressLocality': 'Casablanca',
        'postalCode': '20200',
        'addressCountry': 'MA',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+212-520-19-87-38',
        'contactType': 'customer service',
        'email': 'contact@eai-construction.com',
      },
      'founder': {
        '@type': 'Person',
        'name': 'Soukaina Elaouad',
        'jobTitle': 'Fondatrice & Directrice',
        'description': isFr
          ? 'Fondatrice et directrice d\'ELAOUAD Architecture & Ingénierie, ingénieure civile, manager de projets de construction et doctorante en architecture.'
          : isEn
            ? 'Founder and Director of ELAOUAD Architecture & Engineering, civil engineer, construction project manager and doctoral researcher in architecture.'
            : 'مؤسسة ومديرة ELAOUAD للهندسة المعمارية والهندسة، مهندسة مدنية، مديرة مشاريع البناء وباحثة دكتوراه في الهندسة المعمارية.',
      },
      'areaServed': {
        '@type': 'Country',
        'name': 'Morocco',
      },
      'knowsAbout': [
        'Architecture',
        'Engineering',
        'BIM Consulting',
        'Project Management',
        'Interior Design',
        'Urban Planning',
        'Professional Training',
        'Construction Events',
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  );
}

export default async function AproposPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <AboutJsonLd locale={locale as Locale} />
      <main className="min-h-screen">
        <AboutHero />
        <CompanyStory />
        <FounderSection />
        <DifferentiationSection />
        <MissionVisionValues />
        <EcosystemSection />
        <TeamCulture />
        <DesignPrinciples />
        <TrustCredibility />
        <TimelineSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
