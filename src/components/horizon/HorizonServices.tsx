'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getServices, type Locale, type Service } from '@/data/site';
import { trackEvent } from '@/lib/analytics';
import { ChevronRight } from 'lucide-react';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';

function ServicePanel({ 
  service, 
  index, 
  isActive, 
  onClick,
  onHover,
  onLeave,
  total,
  exploreLabel,
  isSectionActive
}: { 
  service: Service; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  total: number;
  exploreLabel: string;
  isSectionActive: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={panelRef}
      className={`relative border-b border-eai-line cursor-pointer transition-all duration-500 px-6 lg:px-10 -mx-6 lg:-mx-10 rounded-xl ${
        isActive ? 'py-12 lg:py-16 bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl z-10' : 'py-8 lg:py-10 bg-transparent hover:bg-white/10'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: isSectionActive ? index * 0.1 : 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Number */}
        <div className="col-span-1">
          <span className="font-mono text-sm text-eai-brass/60">{service.id}</span>
        </div>

        {/* Title */}
        <div className="col-span-4 lg:col-span-3">
          <h3 className={`font-display text-2xl lg:text-3xl transition-colors duration-300 ${
            isActive ? 'text-eai-ink font-bold' : 'text-eai-warm-grey'
          }`}>
            {service.title}
          </h3>
        </div>

        {/* Value Statement */}
        <div className="col-span-5 lg:col-span-5">
          <p className={`font-body text-sm lg:text-base transition-all duration-500 ${
            isActive ? 'text-eai-charcoal' : 'text-eai-warm-grey/60'
          }`}>
            {service.value}
          </p>
        </div>

        {/* Arrow */}
        <div className="col-span-2 lg:col-span-2 flex justify-end">
          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="text-eai-brass/60" size={20} />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="hidden lg:flex col-span-1 justify-end">
          <span className="font-mono text-[10px] text-eai-warm-grey/40">
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-8 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description + Bullets */}
              <div className="flex flex-col gap-6">
                <p className="font-body text-base text-eai-charcoal leading-relaxed">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-eai-brass/60" />
                      <span className="font-body text-sm text-eai-warm-grey">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/expertises#${service.id}`}
                  onClick={() => trackEvent('cta_click', { location: 'services', label: service.title })}
                  className="mt-4 inline-flex items-center gap-2 font-body text-label uppercase tracking-[0.12em] text-eai-brass hover:text-eai-brass-soft transition-colors"
                >
                  {exploreLabel} <ChevronRight size={14} />
                </Link>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] bg-eai-stone-light/30 border border-eai-line overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HorizonServices({ locale }: { locale: Locale }) {
  const t = useTranslations('Services');
  const services = getServices(locale);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene, setActiveService } = useHorizonScene();
  const isActive = activeScene === 'services';

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('services', entry.intersectionRatio);
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

  // Sync active service with context
  useEffect(() => {
    if (isActive && activeIndex !== null) {
      setActiveService(services[activeIndex].id);
    } else {
      setActiveService(null);
    }
  }, [activeIndex, isActive, setActiveService, services]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 bg-transparent">
      <HorizonFrame showGrid={false} showLight>
        <div className="container mx-auto px-6">
           {/* Section Header */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20"
          >
            <HorizonSectionLabel className="mb-8">
              {t('label')}
            </HorizonSectionLabel>
            <h2 className="font-display text-display-md text-eai-ink leading-[0.9] mb-6">
              {t('title')}
            </h2>
            <p className="font-body text-lg text-eai-warm-grey max-w-xl">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Service Panels */}
          <div className="flex flex-col">
            {services.map((service, index) => (
              <ServicePanel
                key={service.id}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
                total={services.length}
                exploreLabel={t('explore')}
                isSectionActive={isActive}
              />
            ))}
          </div>
        </div>
      </HorizonFrame>
    </section>
  );
}
