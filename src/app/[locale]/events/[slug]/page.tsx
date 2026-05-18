import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { getEvent, getEventSlugs, type Locale } from '@/data/site';
import { createEventMetadata } from '@/data/seo';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getEventSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params;
  return createEventMetadata(locale, slug);
}

export default async function EventDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const event = getEvent(locale as Locale, slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="bg-void min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-16">
        <Link href="/events" className="font-body text-label text-mortar uppercase tracking-widest hover:text-brass transition-colors mb-12 inline-flex items-center gap-2">
          <span>←</span> Retour aux événements
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mt-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-label text-brass tracking-widest uppercase">{event.date}</span>
              <span className="w-1 h-1 rounded-full bg-parchment/30" />
              <span className="font-body text-label text-parchment/70 tracking-widest uppercase">{event.location}</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment italic leading-tight max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full h-[70vh] mb-20 relative">
        <ParallaxImage
          src={event.image}
          alt={event.title}
          className="h-full object-cover"
          containerClassName="h-full"
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Type</p>
              <p className="font-body text-[16px] text-parchment">{event.type}</p>
            </div>
            <div className="w-full h-[1px] bg-ash" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Localisation</p>
              <p className="font-body text-[16px] text-parchment">{event.location}</p>
            </div>
            <div className="w-full h-[1px] bg-ash" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Date</p>
              <p className="font-body text-[16px] text-parchment">{event.date}</p>
            </div>
          </div>
          
          <div>
            <SectionLabel className="mb-8">À Propos</SectionLabel>
            <p className="font-body text-[20px] leading-relaxed text-linen max-w-[800px] mb-12">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
