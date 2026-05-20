'use client';

import { useTranslations } from 'next-intl';
import { EventsEcosystem } from '@/components/events/EventsEcosystem';

export function EventsEcosystemSection() {
  const t = useTranslations('Events');
  const events = t.raw('ecosystemEvents') as Array<{
    slug: string;
    title: string;
    category: string;
    date: string;
    location: string;
    status: 'upcoming' | 'past';
    description: string;
    filterKeys: string[];
    image: string;
    alt: string;
    externalUrl: string;
  }>;

  return <EventsEcosystem events={events} />;
}
