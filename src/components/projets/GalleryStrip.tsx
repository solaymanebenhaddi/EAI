'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function GalleryStrip() {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const items = t.raw('galleryItems') as string[];

  const images = [
    '/images/projects/gallery-facade.webp',
    '/images/projects/gallery-material.webp',
    '/images/projects/gallery-plan.webp',
    '/images/projects/gallery-interior.webp',
    '/images/projects/gallery-light.webp',
    '/images/projects/gallery-site.webp',
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass-pale" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
              {t('galleryLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-paper leading-[0.95] mb-6 tracking-tight">
            {t('galleryTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-parchment/70 leading-relaxed">
            {t('galleryBody')}
          </p>
        </motion.div>

        {/* Horizontal scroll gallery */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 w-[80vw] md:w-[50vw] lg:w-[30vw] snap-start relative group"
            >
              <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                  src={src}
                  alt={items[index]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-eai-ink/20 group-hover:bg-eai-ink/40 transition-colors duration-500" />
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass-pale">
                  {items[index]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
