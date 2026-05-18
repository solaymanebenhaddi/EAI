import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Events as EventsSection } from '@/components/sections/Events';
import type { Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'events');
}

export default async function EventsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <SectionLabel className="mb-8">Événements</SectionLabel>
        <h1 className="font-display text-display-xl text-ink italic mb-12 max-w-[900px] leading-tight">
          <span className="block">La culture de</span>
          <span className="block text-brass">l'échange.</span>
        </h1>
        <p className="font-body text-[18px] text-mortar max-w-[600px]">
          Conférences, masterclasses, et participations aux grands forums internationaux. Nous croyons au partage du savoir et au dialogue avec notre communauté.
        </p>
      </div>

      <EventsSection locale={locale as Locale} />
    </main>
  );
}
