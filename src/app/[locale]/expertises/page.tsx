import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Services } from '@/components/sections/Services';
import type { Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'expertises');
}

export default async function ExpertisesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <SectionLabel className="mb-8">Nos Expertises</SectionLabel>
        <h1 className="font-display text-display-xl text-ink italic mb-12 max-w-[900px] leading-tight">
          <span className="block">L'ingénierie au service</span>
          <span className="block text-brass">de l'esthétique.</span>
        </h1>
        <p className="font-body text-[18px] text-mortar max-w-[600px]">
          Une approche multidisciplinaire qui intègre l'architecture créative, l'ingénierie de précision et l'innovation BIM pour donner vie à des projets complexes.
        </p>
      </div>

      <Services locale={locale as Locale} />
    </main>
  );
}
