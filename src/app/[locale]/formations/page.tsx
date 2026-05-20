import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/data/seo';
import {
  FormationsHero,
  FormationsMission,
  TrainingCategories,
  FeaturedPrograms,
  LearningMethod,
  TestimonialCarousel,
  PlatformGateway,
  InstructorProfiles,
  CertificationSection,
  FAQSection,
  FormationsCTA,
} from '@/components/formations';
import { Footer } from '@/components/Footer';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'formations');
}

export default async function FormationsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ELAOUAD Courses — Formations professionnelles en architecture, BIM et construction',
    description:
      'Plateforme de formation professionnelle d\'ELAOUAD Architecture & Ingénierie. Programmes pratiques en architecture, BIM, logiciels 3D, gestion de projet, conduite de chantier et design intérieur.',
    url: 'https://elaouad.com/formations',
    inLanguage: ['fr', 'en', 'ar'],
    isPartOf: {
      '@type': 'WebSite',
      name: 'ELAOUAD Architecture & Ingénierie',
      url: 'https://elaouad.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'Course',
          position: 1,
          name: 'BIM Management — De la maquette à la coordination',
          description: 'Maîtrisez la modélisation BIM, la coordination entre disciplines et la gestion des données projet.',
          provider: {
            '@type': 'Organization',
            name: 'ELAOUAD Architecture & Ingénierie',
            url: 'https://elaouad.com',
          },
          educationalLevel: 'Intermediate',
          inLanguage: 'fr',
          url: 'https://courses.eai-construction.com',
        },
        {
          '@type': 'Course',
          position: 2,
          name: 'Revit Architecture — Conception complète de projet',
          description: 'Apprenez à concevoir un projet architectural complet avec Revit.',
          provider: {
            '@type': 'Organization',
            name: 'ELAOUAD Architecture & Ingénierie',
            url: 'https://elaouad.com',
          },
          educationalLevel: 'Beginner',
          inLanguage: 'fr',
          url: 'https://courses.eai-construction.com',
        },
        {
          '@type': 'Course',
          position: 3,
          name: 'Conduite de chantier — Piloter l\'exécution',
          description: 'Développez les compétences essentielles pour piloter un chantier.',
          provider: {
            '@type': 'Organization',
            name: 'ELAOUAD Architecture & Ingénierie',
            url: 'https://elaouad.com',
          },
          educationalLevel: 'Intermediate',
          inLanguage: 'fr',
          url: 'https://courses.eai-construction.com',
        },
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'ELAOUAD Architecture & Ingénierie',
      url: 'https://elaouad.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elaouad.com/logo.png',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <FormationsHero />
        <FormationsMission />
        <TrainingCategories />
        <FeaturedPrograms />
        <LearningMethod />
        <TestimonialCarousel />
        <PlatformGateway />
        <InstructorProfiles />
        <CertificationSection />
        <FAQSection />
        <FormationsCTA />
      </main>
      <Footer />
    </>
  );
}
