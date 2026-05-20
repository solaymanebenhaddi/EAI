'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getProjects, type Locale, type Project } from '@/data/site';
import { trackEvent } from '@/lib/analytics';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';
import { ImageGallery } from '@/components/ui/ImageGallery';

function FeaturedProject({ project, viewProjectLabel, isSectionActive }: { project: Project; viewProjectLabel: string; isSectionActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.9, 1, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.6], [15, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6], [100, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, rotateX, y, opacity }}
      animate={isSectionActive ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-24 perspective-[1500px]"
    >
      <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-white/20 border border-white/40 overflow-hidden group shadow-2xl backdrop-blur-md rounded-sm">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
        />
        {/* Liquid Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-eai-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-eai-ink/90 via-eai-ink/20 to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass-pale">
                {project.category}
              </span>
              <span className="w-8 h-px bg-eai-brass-pale/60" />
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-white/80">
                {project.location}
              </span>
            </div>
            <h3 className="font-display text-4xl lg:text-6xl text-white mb-2 leading-none">
              {project.title}
            </h3>
          </div>
          
          <Link
            href={`/projets/${project.slug}`}
            onClick={() => trackEvent('project_click', { slug: project.slug })}
            className="inline-flex items-center gap-3 font-body text-label uppercase tracking-[0.12em] text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 border border-white/20 rounded-full transition-all duration-300 group-hover:border-eai-brass group-hover:text-eai-brass-pale"
          >
            {viewProjectLabel}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function HorizonProjects({ locale }: { locale: Locale }) {
  const t = useTranslations('Projets');
  const projects = getProjects(locale);
  const categories = useMemo(() => [t('all'), ...Array.from(new Set(projects.map((project) => project.category)))], [projects, t]);
  const [activeCategory, setActiveCategory] = useState(t('all'));
  const filteredProjects = activeCategory === t('all')
    ? projects
    : projects.filter((project) => project.category === activeCategory);
  const featured = filteredProjects[0] ?? projects[0];
  const gallery = filteredProjects.filter((project) => project.slug !== featured?.slug).slice(0, 8);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, registerScene } = useHorizonScene();
  const isActive = activeScene === 'projects';

  // Scene Registration Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registerScene('projects', entry.intersectionRatio);
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
    <section ref={sectionRef} id="projets" className="relative py-32 lg:py-48 bg-transparent">
      <HorizonFrame showGrid={false} showLight>
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <HorizonSectionLabel className="mb-8">
                {t('label')}
              </HorizonSectionLabel>
              <h2 className="font-display text-display-md text-eai-ink leading-[0.9]">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/projets"
              className="hidden lg:inline-flex font-body text-label uppercase tracking-[0.12em] text-eai-brass hover:text-eai-brass-soft transition-colors"
            >
              {t('viewAll')}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 flex gap-3 overflow-x-auto pb-3" 
            aria-label={t('filtersLabel')}
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 border px-5 py-3 font-body text-[10px] uppercase tracking-[0.16em] transition-all ${
                  activeCategory === category
                    ? 'border-eai-brass bg-eai-brass text-eai-paper'
                    : 'border-eai-line text-eai-warm-grey hover:border-eai-brass hover:text-eai-brass bg-eai-paper/40'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Project */}
          {featured && <FeaturedProject project={featured} viewProjectLabel={t('viewProject')} isSectionActive={isActive} />}

          {/* Interactive Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 -mx-6 lg:-mx-10"
          >
            <ImageGallery
              projects={gallery.length > 0 ? gallery : filteredProjects}
              viewProjectLabel={t('viewProject')}
            />
          </motion.div>

          {/* Mobile View All */}
          <div className="mt-12 text-center lg:hidden">
            <Link
              href="/projets"
              className="inline-flex font-body text-label uppercase tracking-[0.12em] text-eai-brass hover:text-eai-brass-soft transition-colors border-b border-eai-brass/30 pb-1"
            >
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </HorizonFrame>
    </section>
  );
}
