'use client';

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export function Events() {
  const t = useTranslations('Events');

  const stats = [
    { value: '10 000+', label: 'Visiteurs' },
    { value: '450+', label: 'Exposants' },
    { value: '100+', label: 'Conférences' },
    { value: '60+', label: 'Nationalités' },
  ];

  return (
    <section className="bg-travertine py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <RevealOnScroll>
          <span className="font-body text-label text-brass uppercase tracking-widest block mb-4">
            {t('label')}
          </span>
        </RevealOnScroll>
      </div>

      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="relative w-full h-[65vh] overflow-hidden group">
            <ParallaxImage
              src="/images/event.webp"
              alt={t('event')}
              className="h-full"
              containerClassName="h-full"
            />
            <div className="absolute inset-0 bg-void/40 transition-colors duration-500 group-hover:bg-void/20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <RevealOnScroll delay={0.2}>
                <span className="font-body text-label text-brass/80 uppercase tracking-widest block mb-6">
                  {t('event')}
                </span>
                <h2 className="font-display text-[48px] md:text-[64px] text-parchment italic leading-tight mb-4">
                  {t('date')}
                </h2>
                <p className="font-body text-label text-linen uppercase tracking-widest mb-10">
                  {t('location')}
                </p>
                <button className="border border-brass text-brass px-10 py-4 text-label uppercase tracking-widest hover:bg-brass hover:text-void transition-all duration-300">
                  {t('cta')}
                </button>
              </RevealOnScroll>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-travertine to-transparent" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={0.4 + i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-[40px] md:text-[56px] text-brass leading-none mb-2">
                  {stat.value}
                </span>
                <span className="font-body text-label text-mortar uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
