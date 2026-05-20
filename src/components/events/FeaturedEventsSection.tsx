'use client';

import { useTranslations } from 'next-intl';
import { FeaturedEventCard } from '@/components/events/FeaturedEventCard';

export function FeaturedEventsSection() {
  const t = useTranslations('Events');
  const events = t.raw('featuredEvents') as Array<{
    shortTitle: string;
    title: string;
    date: string;
    location: string;
    description: string;
    topics: string[];
    audience: string;
    image: string;
    alt: string;
    externalUrl: string;
    ctaLabel: string;
  }>;

  return (
    <section className="bg-eai-paper">
      <div className="container mx-auto px-6 pt-24 lg:pt-32 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-eai-brass" />
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
            {t('featuredLabel')}
          </span>
        </div>
        <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
          {t('featuredTitle')}
        </h2>
      </div>
      <div className="flex flex-col">
        {events.map((event, index) => (
          <FeaturedEventCard key={event.shortTitle} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
