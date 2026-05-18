'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  imageSrc: string;
}

export function ProjectCard({ slug, title, category, location, year, imageSrc }: ProjectCardProps) {
  return (
    <Link
      href={`/projets/${slug}`}
      onClick={() => trackEvent('project_click', { slug })}
      className="group block relative overflow-hidden rounded-sm"
      data-cursor-image
    >
      <div className="relative aspect-[16/9] md:aspect-[4/5] overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-lumen/90 via-lumen/40 to-transparent opacity-90 md:opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end h-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-label text-brass tracking-widest uppercase">{category}</span>
            <span className="w-1 h-1 rounded-full bg-ink/30" />
            <span className="text-label text-parchment/70 tracking-widest uppercase">{year}</span>
          </div>
          <h3 className="font-display text-display-md text-parchment mb-1">{title}</h3>
          <p className="font-body text-parchment/70 tracking-wider text-sm">{location}</p>
          
          <div className="mt-4 flex items-center text-brass text-sm font-body tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
            Voir le projet <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
