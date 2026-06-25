'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const services = [
  {
    number: '01',
    title: 'Architecture',
    sub: 'Conception & Maîtrise d\'œuvre',
    description: 'De l\'esquisse à la réception, nous concevons des projets résidentiels, tertiaires et publics avec rigueur et singularité.',
    tags: ['Résidentiel', 'Tertiaire', 'Public', 'Rénovation'],
    href: '/expertises',
    accent: 'Architecture',
  },
  {
    number: '02',
    title: 'Design d\'intérieur',
    sub: 'Aménagement & Décoration',
    description: 'Des intérieurs cohérents qui conjuguent fonctionnalité et esthétique — depuis les plans jusqu\'aux matériaux finaux.',
    tags: ['Résidentiel', 'Hôtellerie', 'Commercial', 'Scénographie'],
    href: '/expertises',
    accent: 'Intérieur',
  },
  {
    number: '03',
    title: 'Ingénierie',
    sub: 'Études techniques & Coordination',
    description: 'Topographie, études de faisabilité, assistance à maîtrise d\'ouvrage et coordination de chantier pour sécuriser chaque décision.',
    tags: ['Topographie', 'AMO', 'Faisabilité', 'Coordination'],
    href: '/expertises',
    accent: 'Ingénierie',
  },
];

export function HomeServices() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="bg-eai-paper py-24 lg:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-eai-brass-soft" aria-hidden="true" />
              <span className="font-body text-[10px] uppercase tracking-[0.18em] text-eai-brass">Expertises</span>
            </motion.div>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(36px,5vw,64px)] italic leading-[0.95] tracking-[-0.02em] text-eai-charcoal"
            >
              Trois piliers,<br />
              <span className="text-eai-brass-soft">un seul engagement.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/expertises"
              className="group flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.14em] text-eai-warm-grey transition-colors hover:text-eai-charcoal"
            >
              Toutes les expertises
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Services list */}
        <div className="divide-y divide-eai-line">
          {services.map((service, i) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={service.href}
                className="group flex flex-col gap-4 py-8 transition-all duration-300 hover:px-4 sm:flex-row sm:items-start sm:gap-12"
              >
                {/* Number */}
                <span className="shrink-0 font-body text-[10px] uppercase tracking-[0.2em] text-eai-sand pt-1">
                  {service.number}
                </span>

                {/* Main content */}
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:gap-10">
                  <div className="flex-1">
                    <h3 className="font-display text-[clamp(28px,3.5vw,44px)] italic leading-none tracking-[-0.01em] text-eai-charcoal transition-colors duration-300 group-hover:text-eai-brass">
                      {service.title}
                    </h3>
                    <p className="mt-1 font-body text-[11px] uppercase tracking-[0.12em] text-eai-warm-grey">
                      {service.sub}
                    </p>
                  </div>
                  <div className="max-w-xs flex-1">
                    <p className="font-body text-sm leading-relaxed text-eai-warm-grey">
                      {service.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Domaines">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-eai-line px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.12em] text-eai-warm-grey"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex shrink-0 items-center self-center">
                  <div className="flex h-10 w-10 items-center justify-center border border-eai-line transition-all duration-300 group-hover:border-eai-brass group-hover:bg-eai-brass">
                    <ArrowUpRight size={16} className="text-eai-warm-grey transition-colors group-hover:text-eai-paper" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
