'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { useHorizonScene } from './HorizonSceneContext';

export function HorizonFounder() {
  const t = useTranslations('Apropos');
  const founderLines = t.raw('founderLines') as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'founder';
  const credentials = [t('cred1'), t('cred2'), t('cred3')];

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('founder', entry.intersectionRatio);
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

  return (
    <section ref={sectionRef} id="apropos" className="relative py-32 lg:py-48 overflow-hidden bg-transparent">
      <HorizonFrame showGrid={false} showLight>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative perspective-[1200px]">
              <motion.div
                initial={{ opacity: 0, rotateY: -15, z: -50 }}
                animate={isActive ? { opacity: 1, rotateY: 0, z: 0 } : { opacity: 0, rotateY: -15, z: -50 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[55vh] lg:h-[85vh] w-full bg-eai-paper border-[12px] border-white shadow-2xl overflow-hidden z-10"
              >
                <ParallaxImage
                  src="/images/about/SOUKAINA.png"
                  alt="Soukaina Elaouad"
                  className="h-full object-cover object-center grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-[1.5s] ease-out"
                  containerClassName="h-full"
                />
              </motion.div>
              {/* Backing structural frame */}
              <div className="absolute -inset-4 border border-eai-brass/20 z-0 hidden lg:block" />
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center lg:pl-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <HorizonSectionLabel className="mb-10">
                  {t('label')}
                </HorizonSectionLabel>
                <h2 className="font-display text-display-lg text-eai-ink leading-none mb-4 tracking-tight font-bold">
                  {founderLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                
                {/* Simulated Signature */}
                <div className="absolute -right-8 top-12 opacity-10 pointer-events-none rotate-[-12deg] hidden lg:block">
                  <span className="font-accent text-[120px] text-eai-brass leading-none">Elaouad</span>
                </div>

                <p className="font-body text-label text-eai-brass uppercase tracking-[0.2em] mb-16 block">
                  {t('role')}
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-14"
              >
                <div className="relative pl-8 border-l-2 border-eai-brass/30">
                  <blockquote className="font-accent text-[20px] lg:text-[28px] text-eai-ink leading-relaxed">
                    {t('quote')}
                  </blockquote>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.p
                  className="font-body text-[15px] text-eai-warm-grey leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {t('description')}
                </motion.p>

                <div className="flex flex-col gap-5">
                  {credentials.map((cred, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: isActive ? 0.4 + i * 0.1 : 0 }}
                      whileHover={{ x: 6 }}
                      className="flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 mt-1.5 border border-eai-brass group-hover:bg-eai-brass transition-all duration-300" />
                      <span className="font-body text-label text-eai-charcoal uppercase tracking-[0.1em] leading-tight">
                        {cred}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HorizonFrame>
    </section>
  );
}
