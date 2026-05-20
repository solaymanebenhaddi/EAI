'use client';

import { useState } from 'react';
import { ProjectFilters } from '@/components/projets/ProjectFilters';
import { ProjectGrid } from '@/components/projets/ProjectGrid';

type FilterKey = 'all' | 'residential' | 'interior' | 'commercial' | 'urban' | 'hospitality' | 'public' | 'bim';

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
  filterKey: FilterKey;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects: ProjectData[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  return (
    <section className="bg-eai-paper">
      <div className="container mx-auto px-6 pt-24 lg:pt-32">
        <ProjectFilters onFilterChange={setActiveFilter} activeFilter={activeFilter} />
      </div>
      <ProjectGrid projects={projects} activeFilter={activeFilter} />
    </section>
  );
}
