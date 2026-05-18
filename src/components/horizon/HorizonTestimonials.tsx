'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getTestimonials, type Locale } from '@/data/site';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';

export function HorizonTestimonials({ locale }: { locale: Locale }) {
  const t = useTranslations('Testimonials');
  const testimonials = getTestimonials(locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'testimonials';

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('testimonials', entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [registerScene]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      {/* Background giant number */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.span
          className="absolute -right-20 top-1/2 -translate-y-1/2 font-display text-[300px] lg:text-[500px] text-eai-brass/[0.03] leading-none select-none"
          animate={{ opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {String(currentIndex + 1).padStart(2, '0')}
        </motion.span>
      </div>

      <HorizonFrame showGrid={false} showLight>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-sm py-16 lg:py-24 relative overflow-hidden">
            {/* Liquid Glass Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            
            {/* Section Header */}
          <HorizonSectionLabel className="mb-20 px-8">
            {t('label')}
          </HorizonSectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center px-8">
            {/* Left - Giant Index + Controls */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
              <motion.div
                className="font-display text-8xl lg:text-9xl text-eai-brass/20 leading-none mb-8"
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {String(currentIndex + 1).padStart(2, '0')}
              </motion.div>
              
              {/* Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 border border-eai-line flex items-center justify-center text-eai-warm-grey hover:text-eai-brass hover:border-eai-brass transition-all bg-eai-paper/40"
                  aria-label={t('previous')}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-8 h-1 transition-all ${
                        i === currentIndex ? 'bg-eai-brass' : 'bg-eai-line'
                      }`}
                      aria-label={t('goTo', { number: i + 1 })}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-12 h-12 border border-eai-line flex items-center justify-center text-eai-warm-grey hover:text-eai-brass hover:border-eai-brass transition-all bg-eai-paper/40"
                  aria-label={t('next')}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right - Quote */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="relative">
                    <span className="absolute -top-8 -left-4 font-display text-8xl text-eai-brass/10 leading-none">"</span>
                    <p className="font-accent text-2xl lg:text-3xl text-eai-ink leading-relaxed italic mb-12 pl-8">
                      {testimonials[currentIndex].text}
                    </p>
                    <div className="flex items-center gap-6 pl-8">
                      <div className="w-12 h-px bg-eai-brass/40" />
                      <div>
                        <span className="font-body text-sm text-eai-charcoal block">
                          {testimonials[currentIndex].name}
                        </span>
                        <span className="font-body text-xs text-eai-warm-grey block mt-1">
                          {testimonials[currentIndex].title}
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 pl-8">
                      <span className="inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-eai-brass/60 border border-eai-brass/20 px-4 py-2 bg-eai-paper/30">
                        {testimonials[currentIndex].proof}
                      </span>
                    </div>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>
            </div>
          </div>
        </motion.div>
      </HorizonFrame>
    </section>
  );
}
