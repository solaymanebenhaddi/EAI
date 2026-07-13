"use client"

import InteractiveImageBentoGallery, { ImageItem } from "@/components/ui/bento-gallery"
import { siteData } from '@/data/site'
import { useTranslations } from 'next-intl'
import { galleryMedia } from '@/data/gallerieMedia'

// We have ~80 items now. These span patterns create the masonry look.
// We can use a slightly richer set of patterns to keep the 3-row grid interesting.
const spanPatterns = [
  "md:col-span-2 md:row-span-2",
  "md:row-span-1 md:col-span-1",
  "md:col-span-2 md:row-span-1",
  "md:row-span-2 md:col-span-1",
  "md:row-span-1 md:col-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:row-span-1 md:col-span-1",
  "md:col-span-2 md:row-span-2",
  "md:row-span-1 md:col-span-2",
]

export default function PortfolioGallery() {
  const t = useTranslations('Portfolio')

  // 2. Map latest creation gallery items
  const galleryItems: ImageItem[] = galleryMedia.map((media, idx) => ({
    id: `gallery-${idx}`,
    url: media.src,
    type: media.type as "image" | "video",
  }))

  const mergedItems = [...galleryItems]

  // 4. Assign alternating span patterns
  const finalImageItems = mergedItems.map((item, idx) => ({
    ...item,
    span: spanPatterns[idx % spanPatterns.length],
  }))

  return (
    <div className="w-full antialiased bg-[var(--color-eai-charcoal)]">
      <InteractiveImageBentoGallery
        imageItems={finalImageItems}
        title={t('title')}
        description={t('desc')}
      />
    </div>
  )
}
