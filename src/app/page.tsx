import HeroStudio from "@/components/sections/HeroStudio"
import VisionStatement from "@/components/sections/VisionStatement"
import FounderProfile from "@/components/sections/FounderProfile"
import ExpertiseBoard from "@/components/sections/ExpertiseBoard"
import PortfolioGallery from "@/components/sections/PortfolioGallery"
import TransformationView from "@/components/sections/TransformationView"
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel"
import EventsShowcase from "@/components/sections/EventsShowcase"
import ProjectControl from "@/components/sections/ProjectControl"

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[var(--color-background)]">
      <HeroStudio />
      {/* All sections after the hero need relative z-2 to slide OVER the fixed hero canvas */}
      <div className="relative z-[2] bg-[var(--color-background)]">
        <VisionStatement />
        <FounderProfile />
        <ExpertiseBoard />
        <PortfolioGallery />
        <TransformationView />
        <TestimonialsCarousel />
        <EventsShowcase />
        <ProjectControl />
      </div>
    </main>
  )
}
