'use client';

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      id: '01',
      title: t('architecture'),
      description: "Conception architecturale innovante, alliant esthétique et fonctionnalité pour des projets résidentiels et tertiaires d'exception.",
      image: '/images/service1.webp',
      reversed: false,
    },
    {
      id: '02',
      title: t('bim'),
      description: "Accompagnement dans la transformation numérique des projets de construction via des processus BIM collaboratifs et performants.",
      image: '/images/service2.webp',
      reversed: true,
    },
    {
      id: '03',
      title: t('interior'),
      description: "Design d'espaces intérieurs sur mesure, privilégiant les matériaux nobles et une attention minutieuse aux détails.",
      image: '/images/service3.webp',
      reversed: false,
    },
  ];

  return (
    <section className="bg-void py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <RevealOnScroll>
          <span className="font-body text-label text-brass uppercase tracking-widest block mb-6">
            {t('label')}
          </span>
          <h2 className="font-display text-display-md text-parchment italic">
            {t('title')}
          </h2>
        </RevealOnScroll>
      </div>

      <div className="flex flex-col">
        {services.map((service, i) => (
          <div key={service.id} className="relative">
            {i !== 0 && (
              <div className="container mx-auto px-6">
                <div className="w-full h-[1px] bg-ash/60" />
              </div>
            )}
            
            <div className={`grid grid-cols-1 md:grid-cols-[60%_40%] ${service.reversed ? 'md:grid-cols-[40%_60%]' : ''}`}>
              {/* IMAGE COLUMN */}
              <div className={`relative h-[70vh] ${service.reversed ? 'md:order-2' : ''}`}>
                <ParallaxImage
                  src={service.image}
                  alt={service.title}
                  className="h-full"
                  containerClassName="h-full"
                />
                <div className="absolute bottom-4 left-6 pointer-events-none opacity-10">
                  <span className="font-display text-[120px] text-brass leading-none">
                    {service.id}
                  </span>
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div className={`flex flex-col justify-center p-12 md:p-20 bg-void ${service.reversed ? 'md:order-1' : ''}`}>
                <RevealOnScroll>
                  <span className="font-body text-label text-brass uppercase tracking-widest block mb-4">
                    {service.id}
                  </span>
                  <h3 className="font-display text-display-md text-parchment italic mb-8">
                    {service.title}
                  </h3>
                  <p className="font-body text-[16px] text-mortar max-w-[380px] mb-10 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="w-fit text-label text-brass uppercase tracking-widest border-b border-transparent hover:border-brass transition-all duration-300 pb-1">
                    {t('explore')}
                  </button>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
