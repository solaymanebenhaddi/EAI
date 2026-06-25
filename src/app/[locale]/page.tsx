import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { CinematicHomepage } from '@/components/cinematic/CinematicHomepage';
import { HorizonProjects } from '@/components/horizon/HorizonProjects';
import { HorizonFounder } from '@/components/horizon/HorizonFounder';
import { HorizonTestimonials } from '@/components/horizon/HorizonTestimonials';
import { HorizonArchitectureExperience } from '@/components/horizon/HorizonArchitectureExperience';
import { Footer } from '@/components/Footer';
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
    <>
      <HorizonArchitectureExperience>
        {/* Cinematic scroll experience: Line → Plan → System → Structure → Space */}
        <CinematicHomepage />

        {/* Existing reference projects gallery (keeps existing data intact) */}
        <HorizonProjects locale={locale as Locale} />

        {/* Founder section */}
        <HorizonFounder />

        {/* Testimonials */}
        <HorizonTestimonials locale={locale as Locale} />
      </HorizonArchitectureExperience>
      <Footer />
    </>
  );
}
