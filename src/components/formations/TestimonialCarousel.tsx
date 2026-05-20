'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialCarousel() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const testimonials = t.raw('testimonials') as Array<{
    quote: string;
    name: string;
    role: string;
    image: string;
  }>;

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[40%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[60%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-eai-brass-pale" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass-pale">
                {t('testimonialsLabel')}
              </span>
            </div>
            <h2 className="font-display text-display-md text-eai-paper leading-[0.95] tracking-tight">
              {t('testimonialsTitle')}
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-eai-parchment/20 text-eai-parchment/60 hover:border-eai-brass hover:text-eai-brass transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-[11px] text-eai-parchment/40 tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-eai-parchment/20 text-eai-parchment/60 hover:border-eai-brass hover:text-eai-brass transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Testimonial */}
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 items-start"
            >
              {/* Portrait */}
              <div className="relative w-20 h-20 overflow-hidden border border-eai-brass/20">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div>
                <blockquote className="font-accent text-[20px] lg:text-[24px] text-eai-parchment/90 leading-relaxed italic mb-8">
                  {testimonials[current].quote}
                </blockquote>
                <div>
                  <span className="font-body text-sm text-eai-brass-pale block">
                    {testimonials[current].name}
                  </span>
                  <span className="font-body text-xs text-eai-parchment/50">
                    {testimonials[current].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
