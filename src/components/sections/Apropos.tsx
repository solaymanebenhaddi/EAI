'use client';

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export function Apropos() {
  const t = useTranslations('Apropos');

  const credentials = [
    t('cred1'),
    t('cred2'),
    t('cred3'),
  ];

  return (
    <section className="bg-void py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[45%_55%] gap-20 items-center">
        {/* LEFT CONTENT */}
        <div>
          <RevealOnScroll>
            <span className="font-body text-label text-brass uppercase tracking-widest block mb-6">
              {t('label')}
            </span>
            <h2 className="font-display text-display-md text-parchment italic mb-2">
              {t('founder')}
            </h2>
            <p className="font-body text-label text-mortar uppercase tracking-widest mb-12">
              {t('role')}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="border-l-2 border-brass pl-8 mb-12">
              <blockquote className="font-accent text-[20px] text-linen leading-relaxed italic">
                "{t('quote')}"
              </blockquote>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <p className="font-body text-[15px] text-mortar leading-relaxed mb-12 max-w-[480px]">
              Forte d'une expérience solide dans le secteur de la construction au Maroc, Soukaina Elaouad dirige EAI avec une vision claire : l'excellence architecturale comme moteur de transformation urbaine et sociale.
            </p>
          </RevealOnScroll>

          <div className="flex flex-col gap-4">
            {credentials.map((cred, i) => (
              <RevealOnScroll key={i} delay={0.6 + i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" />
                  <span className="font-body text-label text-linen uppercase tracking-widest leading-normal">
                    {cred}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <RevealOnScroll className="relative h-[80vh]">
          <ParallaxImage
            src="/images/founder.webp"
            alt="Soukaina Elaouad"
            className="h-full object-top"
            containerClassName="h-full"
          />
          
          {/* Decorative Frame */}
          <div className="absolute bottom-[-20px] right-[-20px] w-40 h-40 border-r-2 border-b-2 border-brass pointer-events-none z-10" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
