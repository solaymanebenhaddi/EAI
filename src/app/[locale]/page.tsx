import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { HorizonArchitectureExperience } from '@/components/horizon/HorizonArchitectureExperience';
import { HorizonHero } from '@/components/horizon/HorizonHero';
import { HorizonBlueprint } from '@/components/horizon/HorizonBlueprint';
import { HorizonManifesto } from '@/components/horizon/HorizonManifesto';
import { HorizonServices } from '@/components/horizon/HorizonServices';
import { HorizonProjects } from '@/components/horizon/HorizonProjects';
import { HorizonFounder } from '@/components/horizon/HorizonFounder';
import { HorizonEvents } from '@/components/horizon/HorizonEvents';
import { HorizonTestimonials } from '@/components/horizon/HorizonTestimonials';
import { HorizonFinalCTA } from '@/components/horizon/HorizonFinalCTA';
import { HorizonFooter } from '@/components/horizon/HorizonFooter';
import type { Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'home');
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <HorizonArchitectureExperience>
      <HorizonHero />
      <HorizonBlueprint />
      <HorizonManifesto locale={locale as Locale} />
      <HorizonServices locale={locale as Locale} />
      <HorizonProjects locale={locale as Locale} />
      <HorizonFounder />
      <HorizonEvents locale={locale as Locale} />
      <HorizonTestimonials locale={locale as Locale} />
      <HorizonFinalCTA />
      <HorizonFooter />
    </HorizonArchitectureExperience>
  );
}
