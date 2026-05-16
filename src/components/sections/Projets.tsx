'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';

export function Projets() {
  const t = useTranslations('Projets');
  const locale = useLocale();

  const featuredProject = {
    name: 'Résidence Palmier',
    category: 'Architecture Résidentielle',
    location: 'Casablanca',
    image: '/images/project1.webp',
    slug: 'residence-palmier',
  };

  const secondaryProjects = [
    {
      name: 'Siège Corporate Alpha',
      category: 'Architecture Tertiaire',
      location: 'Casablanca',
      image: '/images/project2.webp',
      slug: 'siege-corporate-alpha',
    },
    {
      name: 'Éco-Quartier Zénith',
      category: 'Urbanisme',
      location: 'Rabat',
      image: '/images/project3.webp',
      slug: 'eco-quartier-zenith',
    },
    {
      name: 'Villa Californie',
      category: 'Design Intérieur',
      location: 'Casablanca',
      image: '/images/project4.webp',
      slug: 'villa-californie',
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
        {/* FEATURED PROJECT */}
        <RevealOnScroll className="mb-16">
          <Link href={`/${locale}/projets/${featuredProject.slug}`} className="group relative block w-full h-[80vh] overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Image
                src={featuredProject.image}
                alt={featuredProject.name}
                fill
                className="object-cover"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-12 flex justify-between items-end">
              <div>
                <span className="font-body text-label text-mortar uppercase tracking-widest block mb-2">
                  {featuredProject.category}
                </span>
                <h3 className="font-display text-[36px] md:text-[48px] text-parchment italic leading-none">
                  {featuredProject.name}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-label text-mortar uppercase tracking-widest">
                  {featuredProject.location}
                </span>
                <div className="w-12 h-12 rounded-full border border-brass/50 flex items-center justify-center text-brass group-hover:bg-brass group-hover:text-void transition-all duration-300">
                  →
                </div>
              </div>
            </div>
          </Link>
        </RevealOnScroll>

        {/* SECONDARY PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {secondaryProjects.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={i * 0.1}>
              <Link href={`/${locale}/projets/${project.slug}`} className="group block">
                <div className="relative h-[55vh] overflow-hidden mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-void/0 group-hover:bg-void/30 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-brass text-void flex items-center justify-center">
                      →
                    </div>
                  </div>
                </div>
                
                <h4 className="font-body text-[18px] text-parchment mb-2 group-hover:text-brass transition-colors">
                  {project.name}
                </h4>
                <div className="flex flex-col gap-1">
                  <span className="font-body text-label text-mortar uppercase tracking-widest">
                    {project.category}
                  </span>
                  <span className="font-body text-label text-mortar uppercase tracking-widest">
                    {project.location}
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="flex justify-center">
          <Link href={`/${locale}/projets`} className="text-label text-brass border-b border-brass pb-1 uppercase tracking-widest hover:text-brass-glow hover:border-brass-glow transition-all duration-300">
            {t('viewAll')}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
