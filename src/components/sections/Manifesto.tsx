'use client';

import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CountUp } from '@/components/ui/CountUp';
import { useTranslations } from 'next-intl';

export function Manifesto() {
  const t = useTranslations('Manifesto');

  const stats = [
    { value: 500, suffix: '+', label: t('stats.projects') },
    { value: 15, suffix: '+', label: t('stats.experience') },
    { value: 12, suffix: '', label: t('stats.countries') },
    { value: 60, suffix: '+', label: t('stats.team') },
  ];

  return (
    <section className="bg-stone py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <span className="font-body text-label text-brass uppercase tracking-widest block mb-8">
            {t('label')}
          </span>
        </RevealOnScroll>

        <div className="max-w-[900px] mx-auto mb-20">
          <RevealOnScroll delay={0.2}>
            <h2 className="font-display text-display-lg text-parchment italic leading-tight">
              {t('line1')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.4}>
            <h2 className="font-display text-display-lg text-brass italic leading-tight">
              {t('line2')}
            </h2>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.6}>
          <div className="w-[120px] h-[1px] bg-brass/40 mx-auto mb-20" />
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={0.8 + i * 0.1}>
              <div className="flex flex-col items-center">
                <span className="font-display text-[72px] text-brass leading-none mb-4">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-body text-label text-mortar uppercase tracking-widest text-center px-4">
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
