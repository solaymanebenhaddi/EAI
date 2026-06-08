'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, X } from 'lucide-react';
import type { Locale } from '@/data/site';
import {
  getReferencePageContent,
  type ReferenceCategory,
  type ReferenceProject,
} from '@/data/references';
import { trackEvent } from '@/lib/analytics';
import { HorizonFrame } from './HorizonFrame';
import { HorizonSectionLabel } from './HorizonSectionLabel';
import { useHorizonScene } from './HorizonSceneContext';

function ReferenceVisual({
  project,
  className,
  priority = false,
}: {
  project: ReferenceProject;
  className: string;
  priority?: boolean;
}) {
  if (!project.image) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-eai-stone-light ${className}`}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,24,22,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(25,24,22,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="relative border border-eai-brass/30 bg-eai-paper/80 px-5 py-4 text-center text-[10px] uppercase tracking-[0.18em] text-eai-brass">
          Image à ajouter
        </div>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={project.alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 90vw, 100vw"
      className={className}
    />
  );
}

function FeaturedProject({
  project,
  viewProjectLabel,
  isSectionActive,
  onOpen,
}: {
  project: ReferenceProject;
  viewProjectLabel: string;
  isSectionActive: boolean;
  onOpen: (project: ReferenceProject) => void;
}) {
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
        <ReferenceVisual
          project={project}
          priority
          className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
        />
        {/* Liquid Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-eai-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-eai-ink/90 via-eai-ink/20 to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-eai-brass-pale">
                {project.categoryLabel}
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
          
          <button
            type="button"
            onClick={() => {
              trackEvent('project_click', { slug: project.slug, location: 'home_featured_reference_modal' });
              onOpen(project);
            }}
            className="inline-flex items-center gap-3 font-body text-label uppercase tracking-[0.12em] text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 border border-white/20 rounded-full transition-all duration-300 group-hover:border-eai-brass group-hover:text-eai-brass-pale"
          >
            {viewProjectLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ReferenceGallery({
  projects,
  viewProjectLabel,
  onOpen,
}: {
  projects: ReferenceProject[];
  viewProjectLabel: string;
  onOpen: (project: ReferenceProject) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!projects.length) {
    return null;
  }

  return (
    <div className="flex h-[420px] w-full items-center gap-3 overflow-x-auto px-4 pb-2 lg:h-[500px] lg:overflow-visible">
      {projects.slice(0, 8).map((project, index) => (
        <motion.div
          key={project.slug}
          className="group relative h-full min-w-[76vw] flex-grow cursor-pointer overflow-hidden border border-eai-line bg-eai-glass shadow-[0_24px_70px_rgba(25,24,22,0.10)] transition-all duration-500 sm:min-w-[44vw] lg:min-w-0"
          animate={{ flex: hoveredIndex === index ? 3 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            type="button"
            onClick={() => {
              trackEvent('project_click', { slug: project.slug, location: 'home_reference_gallery_modal' });
              onOpen(project);
            }}
            className="relative block h-full w-full text-left"
          >
            <ReferenceVisual
              project={project}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-eai-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
              <span className="font-body mb-2 text-[9px] uppercase tracking-[0.2em] text-eai-brass-pale">
                {project.categoryLabel}
              </span>
              <h4 className="font-display mb-2 text-2xl leading-tight text-white lg:text-3xl">
                {project.title}
              </h4>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-white/75">
                  {project.location}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.16em] text-eai-brass-pale">
                  {viewProjectLabel}
                </span>
              </div>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectDetailsModal({
  project,
  factsTitle,
  missionsTitle,
  closeLabel,
  detailsLabel,
  onClose,
}: {
  project: ReferenceProject | null;
  factsTitle: string;
  missionsTitle: string;
  closeLabel: string;
  detailsLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-eai-ink/45 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-project-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden border border-eai-brass/25 bg-eai-paper shadow-[0_35px_120px_rgba(14,13,11,0.32)] lg:grid-cols-[0.95fr_1.05fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center border border-eai-line bg-eai-paper/85 text-eai-ink shadow-sm backdrop-blur transition hover:border-eai-brass hover:text-eai-brass"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative min-h-[260px] bg-eai-stone-light sm:min-h-[360px] lg:min-h-full">
          <ReferenceVisual
            project={project}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,11,0.04),rgba(14,13,11,0.32))]" />
          <div className="absolute bottom-5 left-5 border border-eai-brass/40 bg-eai-paper/85 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-eai-charcoal backdrop-blur">
            {project.categoryLabel}
          </div>
        </div>

        <div className="max-h-[92vh] overflow-y-auto p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-eai-brass">
            {project.location}
          </p>
          <h3
            id="home-project-modal-title"
            className="font-display mt-4 text-4xl leading-[0.95] text-eai-ink sm:text-5xl"
          >
            {project.title}
          </h3>
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-eai-warm-grey">
            {project.type}
          </p>
          <p className="mt-6 text-base leading-8 text-eai-taupe">
            {project.description}
          </p>

          <div className="mt-8">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
              {factsTitle}
            </h4>
            <dl className="mt-4 grid gap-3 border-y border-eai-line py-4 sm:grid-cols-2">
              {project.facts.map((fact) => (
                <div key={`${project.slug}-modal-${fact.label}`}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-eai-warm-grey">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-eai-charcoal">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
              {missionsTitle}
            </h4>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-eai-taupe">
              {project.missions.map((mission) => (
                <li key={`${project.slug}-modal-${mission}`} className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-eai-brass" aria-hidden="true" />
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/projets#${project.slug}`}
            onClick={() => trackEvent('project_click', { slug: project.slug, location: 'home_reference_modal_detail_link' })}
            className="mt-8 inline-flex items-center gap-2 border-b border-eai-brass pb-2 text-[11px] uppercase tracking-[0.18em] text-eai-ink transition hover:text-eai-brass"
          >
            {detailsLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function HorizonProjects({ locale }: { locale: Locale }) {
  const t = useTranslations('Projets');
  const content = getReferencePageContent(locale);
  const projects = content.projects;
  const categories = content.filters;
  const [activeCategory, setActiveCategory] = useState<ReferenceCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ReferenceProject | null>(null);
  const filteredProjects = activeCategory === 'all'
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
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`shrink-0 border px-5 py-3 font-body text-[10px] uppercase tracking-[0.16em] transition-all ${
                  activeCategory === category.key
                    ? 'border-eai-brass bg-eai-brass text-eai-paper'
                    : 'border-eai-line text-eai-warm-grey hover:border-eai-brass hover:text-eai-brass bg-eai-paper/40'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Featured Project */}
          {featured && (
            <FeaturedProject
              project={featured}
              viewProjectLabel={t('viewProject')}
              isSectionActive={isActive}
              onOpen={setSelectedProject}
            />
          )}

          {/* Interactive Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 -mx-6 lg:-mx-10"
          >
            <ReferenceGallery
              projects={gallery.length > 0 ? gallery : filteredProjects}
              viewProjectLabel={t('viewProject')}
              onOpen={setSelectedProject}
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
      <ProjectDetailsModal
        project={selectedProject}
        factsTitle={content.factsTitle}
        missionsTitle={content.missionsTitle}
        closeLabel="Fermer la référence"
        detailsLabel={content.ctaLabel}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
