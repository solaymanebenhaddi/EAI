'use client';

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function Testimonials() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      text: "EAI a su transformer notre vision en espace de vie exceptionnel. Leur rigueur technique et leur sens de l'esthétique sont incomparables.",
      name: "Karim N.",
      title: "Directeur Général | Résidence Palmier",
    },
    {
      text: "Un cabinet qui pense comme des architectes mais qui livre comme des ingénieurs. La précision de leur BIM consulting nous a économisé des mois de travail.",
      name: "Sarah M.",
      title: "Directrice de Projet | Siège Corporate Alpha",
    },
    {
      text: "La qualité du suivi chantier et la précision des détails nous a bluffés. EAI ne fait pas de compromis.",
      name: "Omar T.",
      title: "Promoteur Immobilier | Éco-Quartier Zénith",
    },
  ];

  return (
    <section className="bg-stone py-32 overflow-hidden">
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

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.15}>
              <div className="bg-travertine border border-ash p-10 h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brass text-[14px]">★</span>
                  ))}
                </div>
                
                <p className="font-accent text-[17px] text-linen leading-relaxed italic mb-10 flex-grow">
                  "{item.text}"
                </p>
                
                <div className="w-full h-[1px] bg-ash mb-8" />
                
                <div>
                  <h4 className="font-body text-[15px] text-parchment font-medium mb-1">
                    {item.name}
                  </h4>
                  <p className="font-body text-label text-mortar uppercase tracking-widest leading-normal">
                    {item.title}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
