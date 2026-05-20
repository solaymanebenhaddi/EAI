import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { EventsHero } from '@/components/events/EventsHero';
import { EventsMission } from '@/components/events/EventsMission';
import { FeaturedEventsSection } from '@/components/events/FeaturedEventsSection';
import { EventFormats } from '@/components/events/EventFormats';
import { EventsEcosystemSection } from '@/components/events/EventsEcosystemSection';
import { WhyParticipate } from '@/components/events/WhyParticipate';
import { FidiExperience } from '@/components/events/FidiExperience';
import { SustainabilityEvents } from '@/components/events/SustainabilityEvents';
import { EventJourney } from '@/components/events/EventJourney';
import { EventsPlatformCTA } from '@/components/events/EventsPlatformCTA';
import { Footer } from '@/components/Footer';

function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Événements EAI | Forums Architecture, Construction, Design & BIM au Maroc',
    description: 'Découvrez ELAOUAD Events : forums, conférences, expositions et workshops autour de l\'architecture, du design intérieur, de la construction, du BIM, de la durabilité et de l\'innovation au Maroc.',
    url: 'https://eai-construction.com/events',
    mainEntity: {
      '@type': 'Organization',
      name: 'ELAOUAD Events',
      description: 'Branche événementielle d\'ELAOUAD Architecture & Ingénierie',
      url: 'https://events.eai-construction.com',
      location: {
        '@type': 'Place',
        name: 'Casablanca, Maroc',
      },
    },
    hasPart: [
      {
        '@type': 'Event',
        name: 'Forum International de la Construction 2026',
        startDate: '2026-01-08',
        endDate: '2026-01-10',
        location: {
          '@type': 'Place',
          name: 'Foire Internationale de Casablanca',
        },
        description: 'Rendez-vous stratégique pour les acteurs du bâtiment, de l\'architecture, de l\'ingénierie et des technologies de construction.',
        url: 'https://events.eai-construction.com/forum-international-de-la-construction-2026/',
      },
      {
        '@type': 'Event',
        name: 'Forum International de la Décoration Intérieure 2026',
        startDate: '2026-12-03',
        endDate: '2026-12-05',
        location: {
          '@type': 'Place',
          name: 'Casablanca, Maroc',
        },
        description: 'Événement consacré à la décoration intérieure, aux matériaux, à l\'agencement et aux solutions d\'aménagement.',
        url: 'https://events.eai-construction.com/fidi26/',
      },
    ],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Événements EAI | Forums Architecture, Construction, Design & BIM au Maroc',
    description: 'Découvrez ELAOUAD Events : forums, conférences, expositions et workshops autour de l\'architecture, du design intérieur, de la construction, du BIM, de la durabilité et de l\'innovation au Maroc.',
  };
}

export default async function EventsPage() {
  return (
    <main className="bg-void text-parchment min-h-screen">
      <Script
        id="events-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <EventsHero />
      <EventsMission />
      <FeaturedEventsSection />
      <EventFormats />
      <EventsEcosystemSection />
      <WhyParticipate />
      <FidiExperience />
      <SustainabilityEvents />
      <EventJourney />
      <EventsPlatformCTA />
      <Footer />
    </main>
  );
}
