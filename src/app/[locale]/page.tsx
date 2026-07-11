import HeroStudio from "@/components/sections/HeroStudio"
import InteriorDesignIntro from "@/components/sections/InteriorDesignIntro"
import FounderProfile from "@/components/sections/FounderProfile"
import Conception3D from "@/components/sections/Conception3D"
import TurnkeyServices from "@/components/sections/TurnkeyServices"
import BeforeAfterVideos from "@/components/sections/BeforeAfterVideos"
import TransformationView from "@/components/sections/TransformationView"
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel"
import ProcessApproach from "@/components/sections/ProcessApproach"
import TrainingCourses from "@/components/sections/TrainingCourses"
import PortfolioGallery from "@/components/sections/PortfolioGallery"
import MayushDesign from "@/components/sections/MayushDesign"
import EventsShowcase from "@/components/sections/EventsShowcase"
import LocationMap from "@/components/sections/LocationMap"
import ProjectControl from "@/components/sections/ProjectControl"
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col w-full bg-[var(--color-background)]">
      <HeroStudio />
      {/* All sections after the hero need relative z-2 to slide OVER the fixed hero canvas */}
      <div className="relative z-[2] bg-[var(--color-background)]">
        <InteriorDesignIntro />
        <FounderProfile />
        <Conception3D />
        <TurnkeyServices />
        <BeforeAfterVideos />
        <TransformationView />
        <TestimonialsCarousel />
        <ProcessApproach />
        <TrainingCourses />
        <PortfolioGallery />
        <MayushDesign />
        <EventsShowcase />
        <LocationMap />
        <ProjectControl />
      </div>
    </main>
  )
}
