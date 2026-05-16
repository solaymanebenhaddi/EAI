'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function Hero() {
  const t = useTranslations('Hero');

  const titleLines = [
    { text: t('titleLine1'), color: 'text-parchment', italic: false },
    { text: t('titleLine2'), color: 'text-parchment', italic: true },
    { text: t('titleLine3'), color: 'text-brass', italic: false },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 w-[1px] h-full bg-gold-line opacity-20" />
        <div className="absolute left-2/3 top-0 w-[1px] h-full bg-gold-line opacity-20" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[55%_45%] gap-16 items-center">
        {/* LEFT COLUMN */}
        <div className="relative z-10">
          <RevealOnScroll>
            <span className="font-body text-label text-mortar uppercase tracking-widest block mb-12">
              {t('label')}
            </span>
          </RevealOnScroll>

          <div className="mb-10">
            {titleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + i * 0.12,
                }}
              >
                <h1 
                  className={`font-display text-display-xl ${line.color} ${line.italic ? 'italic' : ''}`}
                >
                  {line.text}
                </h1>
              </motion.div>
            ))}
          </div>

          <RevealOnScroll delay={0.6}>
            <p className="font-body text-[16px] text-linen max-w-[420px] mb-12 leading-relaxed">
              {t('description')}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.7} className="flex flex-wrap gap-8 items-center">
            <button className="bg-brass text-void px-8 py-4 text-label uppercase tracking-widest hover:bg-brass-glow transition-all duration-300">
              {t('primaryCta')}
            </button>
            <button className="text-parchment border-b border-mortar pb-1 text-label uppercase tracking-widest hover:border-brass hover:text-brass transition-all duration-300">
              {t('secondaryCta')}
            </button>
          </RevealOnScroll>

          {/* Scroll Indicator */}
          <div className="absolute bottom-[-100px] left-0 hidden md:flex flex-col items-center gap-6">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-[60px] bg-mortar"
            />
            <span className="font-body text-label text-mortar uppercase tracking-widest rotate-90 origin-left translate-x-2">
              {t('scroll')}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative h-[85vh] w-full">
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full h-full relative"
          >
            <ParallaxImage
              src="/images/hero.webp"
              alt="EAI Architecture"
              className="h-full"
              containerClassName="h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 right-8">
              <div className="bg-stone/80 backdrop-blur-sm border border-ash px-4 py-2 text-label text-linen">
                {t('stats')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
