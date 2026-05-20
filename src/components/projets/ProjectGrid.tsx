'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: string;
  concept: string;
  tags: string[];
  image: string;
  alt: string;
  filterKey: string;
  featured?: boolean;
}

interface ProjectGridProps {
  projects: ProjectData[];
  activeFilter: string;
}

export function ProjectGrid({ projects, activeFilter }: ProjectGridProps) {
  const t = useTranslations('Projets');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.filterKey === activeFilter);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('gridLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
            {t('gridTitle')}
          </h2>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isLarge = isFirst || isSecond;

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden ${
                    isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <Link
                    href={`/projets/${project.slug}`}
                    onClick={() => trackEvent('project_click', { slug: project.slug, location: 'grid' })}
                    className="block"
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                        loading="lazy"
                      />
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-eai-ink/0 group-hover:bg-eai-ink/40 transition-colors duration-500" />

                      {/* Arrow reveal */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="w-10 h-10 bg-eai-brass flex items-center justify-center">
                          <ArrowRight size={16} className="text-eai-ink" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-eai-parchment/40 border border-eai-line border-t-0">
                      {/* Category */}
                      <span className="font-body text-[9px] uppercase tracking-[0.2em] text-eai-brass block mb-2">
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-xl text-eai-ink mb-3 leading-tight">
                        {project.title}
                      </h3>

                      {/* Concept */}
                      <p className="font-body text-sm text-eai-warm-grey leading-relaxed mb-4 line-clamp-3">
                        {project.concept}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-body text-[10px] uppercase tracking-[0.12em] text-eai-warm-grey/60">
                          {project.location} · {project.year}
                        </span>
                        <span className="font-body text-[10px] uppercase tracking-[0.12em] text-eai-warm-grey/40">
                          {project.status}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-body text-[9px] uppercase tracking-[0.1em] text-eai-charcoal/60 bg-eai-paper px-2 py-1 border border-eai-line/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="font-body text-[15px] text-eai-warm-grey/60">
              Aucun projet dans cette catégorie pour le moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
