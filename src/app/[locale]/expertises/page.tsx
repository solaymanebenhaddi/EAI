import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ExpertiseHero } from '@/components/expertises/ExpertiseHero';
import { ExpertiseApproach } from '@/components/expertises/ExpertiseApproach';
import { ExpertiseOverview } from '@/components/expertises/ExpertiseOverview';
import { ExpertiseDetail } from '@/components/expertises/ExpertiseDetail';
import { ExpertiseMatrix } from '@/components/expertises/ExpertiseMatrix';
import { ProjectTypes } from '@/components/expertises/ProjectTypes';
import { ExpertiseMethod } from '@/components/expertises/ExpertiseMethod';
import { FormationsBridge } from '@/components/expertises/FormationsBridge';
import { ExpertiseFinalCTA } from '@/components/expertises/ExpertiseFinalCTA';
import { Footer } from '@/components/Footer';
import type { Locale } from '@/data/site';

function generateStructuredData(locale: string) {
  const baseUrl = 'https://eai-construction.com';
  const localePrefix = locale === 'fr' ? '' : `/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ELAOUAD Architecture & Ingénierie',
    description: locale === 'fr'
      ? 'Cabinet d\'architecture et d\'ingénierie à Casablanca, Maroc. Expertise en architecture, études techniques, BIM consulting, maîtrise d\'œuvre, design intérieur, urbanisme, topographie et AMO.'
      : locale === 'en'
      ? 'Architecture and engineering firm in Casablanca, Morocco. Expertise in architecture, technical studies, BIM consulting, project management, interior design, urban planning, topography and client assistance.'
      : 'مكتب هندسة معمارية وهندسة في الدار البيضاء، المغرب. خبرة في الهندسة المعمارية والدراسات الفنية واستشارات BIM وإدارة المشاريع والتصميم الداخلي والتعمير والطبوغرافيا ومساعدة صاحب المشروع.',
    url: `${baseUrl}${localePrefix}/expertises`,
    telephone: '+212520198738',
    email: 'contact@eai-construction.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
    },
    serviceType: [
      'Architecture',
      'Engineering',
      'BIM Consulting',
      'Project Management',
      'Interior Design',
      'Urban Planning',
      'Topography',
      'Client Assistance',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Expertises EAI',
      itemListElement: [
        { '@type': 'Service', 'name': 'Architecture', 'position': 1 },
        { '@type': 'Service', 'name': 'Ingénierie & études techniques', 'position': 2 },
        { '@type': 'Service', 'name': 'BIM Consulting', 'position': 3 },
        { '@type': 'Service', 'name': 'Maîtrise d\'œuvre & coordination', 'position': 4 },
        { '@type': 'Service', 'name': 'Design intérieur', 'position': 5 },
        { '@type': 'Service', 'name': 'Urbanisme & aménagement', 'position': 6 },
        { '@type': 'Service', 'name': 'Topographie', 'position': 7 },
        { '@type': 'Service', 'name': 'AMO & conseil stratégique', 'position': 8 },
      ],
    },
  };
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === 'fr'
      ? 'Expertises EAI | Architecture, Ingénierie, BIM & Maîtrise d\'œuvre au Maroc'
      : locale === 'en'
      ? 'EAI Expertise | Architecture, Engineering, BIM & Project Management in Morocco'
      : 'خبرات EAI | الهندسة المعمارية والهندسة وBIM وإدارة المشاريع في المغرب',
    description: locale === 'fr'
      ? 'Découvrez les expertises d\'ELAOUAD Architecture & Ingénierie : architecture, études techniques, BIM consulting, maîtrise d\'œuvre, design intérieur, urbanisme, topographie et AMO au Maroc.'
      : locale === 'en'
      ? 'Discover ELAOUAD Architecture & Engineering expertise: architecture, technical studies, BIM consulting, project management, interior design, urban planning, topography and client assistance in Morocco.'
      : 'اكتشف خبرات ELAOUAD للهندسة المعمارية والهندسة: الهندسة المعمارية، الدراسات الفنية، استشارات BIM، إدارة المشاريع، التصميم الداخلي، التعمير، الطبوغرافيا ومساعدة صاحب المشروع في المغرب.',
  };
}

export default async function ExpertisesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-eai-paper min-h-screen">
      <Script
        id="expertises-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(locale)) }}
      />
      <ExpertiseHero />
      <ExpertiseApproach />
      <ExpertiseOverview />

      {/* Detailed expertise sections */}
      <ExpertiseDetail
        number="01"
        labelKey="detail01Label"
        titleKey="detail01Title"
        bodyKey="detail01Body"
        valueKey="detail01Value"
        deliverablesKey="detail01Deliverables"
        imageAltKey="detail01ImageAlt"
        imagePath="/images/expertises/expertise-architecture-residential.webp"
      />

      <ExpertiseDetail
        number="02"
        labelKey="detail02Label"
        titleKey="detail02Title"
        bodyKey="detail02Body"
        valueKey="detail02Value"
        deliverablesKey="detail02Deliverables"
        imageAltKey="detail02ImageAlt"
        imagePath="/images/expertises/expertise-engineering-structure-grid.webp"
        reversed
      />

      <ExpertiseDetail
        number="03"
        labelKey="detail03Label"
        titleKey="detail03Title"
        bodyKey="detail03Body"
        valueKey="detail03Value"
        deliverablesKey="detail03Deliverables"
        imageAltKey="detail03ImageAlt"
        imagePath="/images/expertises/expertise-bim-coordination-room.webp"
        dark
      />

      <ExpertiseDetail
        number="04"
        labelKey="detail04Label"
        titleKey="detail04Title"
        bodyKey="detail04Body"
        valueKey="detail04Value"
        deliverablesKey="detail04Deliverables"
        imageAltKey="detail04ImageAlt"
        imagePath="/images/expertises/expertise-project-management-review.webp"
        reversed
      />

      <ExpertiseDetail
        number="05"
        labelKey="detail05Label"
        titleKey="detail05Title"
        bodyKey="detail05Body"
        valueKey="detail05Value"
        deliverablesKey="detail05Deliverables"
        imageAltKey="detail05ImageAlt"
        imagePath="/images/expertises/expertise-interior-material-palette.webp"
      />

      <ExpertiseDetail
        number="06"
        labelKey="detail06Label"
        titleKey="detail06Title"
        bodyKey="detail06Body"
        valueKey="detail06Value"
        deliverablesKey="detail06Deliverables"
        imageAltKey="detail06ImageAlt"
        imagePath="/images/expertises/expertise-urban-masterplan.webp"
        reversed
      />

      <ExpertiseDetail
        number="07"
        labelKey="detail07Label"
        titleKey="detail07Title"
        bodyKey="detail07Body"
        valueKey="detail07Value"
        deliverablesKey="detail07Deliverables"
        imageAltKey="detail07ImageAlt"
        imagePath="/images/expertises/expertise-topography-survey.webp"
      />

      <ExpertiseDetail
        number="08"
        labelKey="detail08Label"
        titleKey="detail08Title"
        bodyKey="detail08Body"
        valueKey="detail08Value"
        deliverablesKey="detail08Deliverables"
        imageAltKey="detail08ImageAlt"
        imagePath="/images/expertises/expertise-amo-strategy-studio.webp"
        reversed
      />

      <ExpertiseMatrix />
      <ProjectTypes />
      <ExpertiseMethod />
      <FormationsBridge />
      <ExpertiseFinalCTA />
      <Footer />
    </main>
  );
}
