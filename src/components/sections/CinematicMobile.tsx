'use client';

import { useTranslations } from 'next-intl';
import { MobileBlueprintSVG } from '../three/MobileBlueprintSVG';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export default function CinematicMobile() {
  const t = useTranslations('Cinematic');
  
  return (
    <section className="relative w-full h-[100vh] bg-lumen flex items-center justify-center border-y border-cloud overflow-hidden">
      {/* Background SVG Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <MobileBlueprintSVG />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <RevealOnScroll>
          <span className="font-body text-label text-brass tracking-widest uppercase block mb-8">
            {t('label')}
          </span>
          <h2 className="font-display text-display-md text-ink italic mb-10 max-w-[400px]">
            {t('title')}
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col gap-8 text-left max-w-[300px]">
            <div className="border-l border-brass pl-6">
              <span className="font-display text-[32px] text-brass leading-none block mb-2">01</span>
              <h3 className="font-body text-[16px] text-ink mb-2">{t('step1Title')}</h3>
              <p className="font-body text-[14px] text-mortar">{t('step1Desc')}</p>
            </div>
            <div className="border-l border-brass/50 pl-6">
              <span className="font-display text-[32px] text-brass/50 leading-none block mb-2">02</span>
              <h3 className="font-body text-[16px] text-ink mb-2">{t('step2Title')}</h3>
              <p className="font-body text-[14px] text-mortar">{t('step2Desc')}</p>
            </div>
            <div className="border-l border-brass/30 pl-6">
              <span className="font-display text-[32px] text-brass/30 leading-none block mb-2">03</span>
              <h3 className="font-body text-[16px] text-ink mb-2">{t('step3Title')}</h3>
              <p className="font-body text-[14px] text-mortar">{t('step3Desc')}</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
