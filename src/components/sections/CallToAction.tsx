'use client';

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { motion } from 'framer-motion';

export function CallToAction() {
  const t = useTranslations('CallToAction');

  return (
    <section className="relative bg-void min-h-[70vh] flex items-center justify-center overflow-hidden py-32">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[20%] top-0 w-[1px] h-full bg-brass" />
        <div className="absolute left-[40%] top-0 w-[1px] h-full bg-brass" />
        <div className="absolute left-[60%] top-0 w-[1px] h-full bg-brass" />
        <div className="absolute left-[80%] top-0 w-[1px] h-full bg-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <RevealOnScroll>
          <span className="font-body text-label text-mortar uppercase tracking-widest block mb-12">
            {t('label')}
          </span>
          
          <div className="mb-16">
            <h2 className="font-display text-display-xl text-parchment leading-tight mb-2">
              {t('line1')}
            </h2>
            <h2 className="font-display text-display-xl text-brass italic leading-tight">
              {t('line2')}
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <button className="bg-brass text-void px-12 py-5 text-[15px] font-medium uppercase tracking-[0.15em] hover:bg-brass-glow transition-all duration-300">
              {t('primaryCta')}
            </button>
            <button className="text-linen border-b border-mortar hover:border-brass hover:text-brass pb-1 text-label uppercase tracking-[0.15em] transition-all duration-300">
              {t('secondaryCta')}
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
