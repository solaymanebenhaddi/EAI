"use client"

import InteractiveImageBentoGallery from "@/components/ui/bento-gallery"
import { siteData } from '@/data/site'
import { useTranslations } from 'next-intl'
import ImageGallery from "@/components/ui/image-gallery"

const spanPatterns = [
  "md:col-span-2 md:row-span-2",
  "md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:row-span-2",
  "md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:row-span-2",
  "md:row-span-1",
]

import { galleryMedia } from '@/data/gallerieMedia'
export default function PortfolioGallery() {
  const t = useTranslations('Portfolio')

  const imageItems = siteData.portfolio.map((project, idx) => ({
    id: idx,
    title: project.name,
    desc: `${project.category} · ${project.location} · ${project.year}`,
    url: project.image,
    details: {
      category: project.category,
      facts: project.facts,
      missions: project.missions,
      description: project.description,
    },
    span: spanPatterns[idx % spanPatterns.length],
  }))

  return (
    <div className="w-full antialiased bg-[var(--color-eai-charcoal)]">
      <InteractiveImageBentoGallery
        imageItems={imageItems}
        title={t('title')}
        description={t('desc')}
      />
      
      <ImageGallery 
        mediaItems={galleryMedia} 
      />
    </div>
  )
}
