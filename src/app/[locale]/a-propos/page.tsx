import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Apropos as AproposSection } from '@/components/sections/Apropos';
import { Manifesto } from '@/components/sections/Manifesto';
import type { Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'about');
}

export default async function AproposPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <SectionLabel className="mb-8">Notre Histoire</SectionLabel>
        <h1 className="font-display text-display-xl text-ink italic mb-12 max-w-[900px] leading-tight">
          <span className="block">L'architecture comme</span>
          <span className="block text-brass">héritage culturel.</span>
        </h1>
        <p className="font-body text-[18px] text-mortar max-w-[600px]">
          Depuis notre fondation, ELAOUAD Architecture & Ingénierie s'engage à concevoir des espaces qui transcendent leur fonction première pour devenir de véritables lieux d'expérience.
        </p>
      </div>

      <AproposSection />
      <Manifesto locale={locale as Locale} />
    </main>
  );
}
