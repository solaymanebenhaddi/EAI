'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type {
  ReferenceCategory,
  ReferencePageContent,
  ReferenceProject,
} from '@/data/references';
import { trackEvent } from '@/lib/analytics';

interface ReferencesSectionProps {
  content: ReferencePageContent;
}

function ReferenceImage({
  project,
  missingImageLabel,
  priority,
}: {
  project: ReferenceProject;
  missingImageLabel: string;
  priority: boolean;
}) {
  if (!project.image) {
    return (
      <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden bg-eai-stone-light">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,24,22,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(25,24,22,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-eai-brass/40" />
        <div className="relative max-w-[260px] border border-eai-brass/30 bg-eai-paper/80 p-5 text-center shadow-[0_20px_60px_rgba(25,24,22,0.08)]">
          {/* Developer note: add a dedicated greenhouse/agricultural technical facility image for this reference. */}
          <p className="text-[10px] uppercase tracking-[0.22em] text-eai-brass">
            {missingImageLabel}
          </p>
          <p className="mt-3 text-sm leading-6 text-eai-taupe">
            {project.missingImageNote}
          </p>
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
      sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
      className="object-cover transition duration-700 ease-[var(--ease-arch)] group-hover/card:scale-[1.035]"
    />
  );
}

function ReferenceCard({
  project,
  content,
  index,
}: {
  project: ReferenceProject;
  content: ReferencePageContent;
  index: number;
}) {
  return (
    <article
      id={project.slug}
      className="group/card grid overflow-hidden border border-eai-line bg-[rgba(255,255,255,0.48)] shadow-[0_28px_90px_rgba(25,24,22,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-eai-brass/35 hover:shadow-[0_36px_110px_rgba(25,24,22,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-eai-stone-light">
        <ReferenceImage
          project={project}
          missingImageLabel={content.missingImageLabel}
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,11,0.05),rgba(14,13,11,0.38))]" />
        <div className="absolute left-4 top-4 border border-eai-brass/40 bg-eai-paper/85 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-eai-charcoal shadow-sm backdrop-blur-sm">
          {project.categoryLabel}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-eai-paper">
          <MapPin className="h-3.5 w-3.5 text-eai-brass-pale" aria-hidden="true" />
          {project.location}
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-eai-brass">
            {project.type}
          </p>
          <h2 className="mt-3 text-2xl leading-[1.05] text-eai-ink sm:text-[1.7rem]">
            {project.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-eai-taupe">
            {project.description}
          </p>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
            {content.factsTitle}
          </h3>
          <dl className="mt-3 grid grid-cols-1 gap-2 border-y border-eai-line py-3 sm:grid-cols-2">
            {project.facts.map((fact) => (
              <div key={`${project.slug}-${fact.label}`} className="min-w-0">
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

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
            {content.missionsTitle}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-eai-taupe">
            {project.missions.map((mission) => (
              <li key={`${project.slug}-${mission}`} className="flex gap-3">
                <span className="mt-2 h-px w-5 shrink-0 bg-eai-brass" aria-hidden="true" />
                <span>{mission}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`#${project.slug}`}
          onClick={() => trackEvent('project_click', { slug: project.slug, location: 'references_grid' })}
          className="inline-flex w-fit items-center gap-2 border-b border-eai-brass pb-2 text-[11px] uppercase tracking-[0.18em] text-eai-ink transition hover:text-eai-brass"
        >
          {content.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function ReferencesSection({ content }: ReferencesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ReferenceCategory>('all');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return content.projects;
    }

    return content.projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, content.projects]);

  return (
    <section className="relative isolate overflow-hidden bg-eai-paper pb-24 pt-32 text-eai-charcoal sm:pt-36 lg:pb-32 lg:pt-40">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,rgba(155,174,64,0.24),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(173,179,181,0.20),transparent_30%),linear-gradient(135deg,#F8F5EE_0%,#F0EBE0_44%,#E7DFD1_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(25,24,22,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(25,24,22,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />
      <div className="absolute left-0 right-0 top-[28rem] -z-10 h-px bg-eai-brass/30" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="grid gap-8 border-b border-eai-line pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-eai-brass">
              {content.eyebrow}
            </p>
            <h1 className="font-display mt-5 text-6xl leading-[0.9] text-eai-ink sm:text-7xl lg:text-8xl">
              {content.title}
            </h1>
          </div>
          <div className="max-w-3xl lg:justify-self-end">
            <p className="text-xl leading-8 text-eai-taupe sm:text-2xl sm:leading-10">
              {content.subtitle}
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-eai-warm-grey">
              {content.sourceLabel}
            </p>
          </div>
        </header>

        <nav
          className="mt-8 overflow-x-auto pb-2"
          aria-label="Filtrer les références"
        >
          <div className="flex min-w-max gap-3">
            {content.filters.map((filter) => {
              const isActive = activeFilter === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.key)}
                  className={[
                    'border px-4 py-3 text-[11px] uppercase tracking-[0.16em] transition duration-300',
                    isActive
                      ? 'border-eai-brass bg-eai-ink text-eai-paper shadow-[0_14px_40px_rgba(25,24,22,0.18)]'
                      : 'border-eai-line bg-eai-glass text-eai-taupe hover:border-eai-brass/60 hover:text-eai-ink',
                  ].join(' ')}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ReferenceCard
              key={project.slug}
              project={project}
              content={content}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
