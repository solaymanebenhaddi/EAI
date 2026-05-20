'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import type { Project } from '@/data/site';
import { ArrowRight } from 'lucide-react';

interface ImageGalleryProps {
  projects: Project[];
  viewProjectLabel: string;
}

export function ImageGallery({ projects, viewProjectLabel }: ImageGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!projects.length) return null;

  return (
    <div className="flex items-center gap-3 h-[400px] lg:h-[500px] w-full px-4">
      {projects.slice(0, 8).map((project, idx) => (
        <motion.div
          key={project.slug}
          className="relative group flex-grow transition-all rounded-lg overflow-hidden h-full duration-500 cursor-pointer"
          animate={{
            flex: hoveredIndex === idx ? 3 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href={`/projets/${project.slug}`}
            onClick={() => trackEvent('project_click', { slug: project.slug })}
            className="block w-full h-full relative"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 16vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-eai-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content on hover */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="font-body text-[9px] uppercase tracking-[0.2em] text-eai-brass-pale mb-2">
                {project.category}
              </span>
              <h4 className="font-display text-xl lg:text-2xl text-white mb-2 leading-tight">
                {project.title}
              </h4>
              <div className="flex items-center justify-between mt-4">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-white/70">
                  {project.location} · {project.year}
                </span>
                <ArrowRight className="text-eai-brass" size={16} />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
