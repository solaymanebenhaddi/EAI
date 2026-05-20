'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

interface FeaturedEventProps {
  event: {
    shortTitle: string;
    title: string;
    date: string;
    location: string;
    description: string;
    topics: string[];
    audience: string;
    image: string;
    alt: string;
    externalUrl: string;
    ctaLabel: string;
  };
  index: number;
}

export function FeaturedEventCard({ event, index }: FeaturedEventProps) {
  const t = useTranslations('Events');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' });

  const paragraphs = event.description.split('\n\n');

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden bg-eai-ink group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh] lg:min-h-[60vh]">
        {/* Image - 60% */}
        <div className="lg:col-span-7 relative overflow-hidden">
          <img
            src={event.image}
            alt={event.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-eai-ink/60 via-transparent to-transparent lg:bg-gradient-to-t lg:from-eai-ink/40 lg:via-transparent lg:to-transparent" />
          {/* Date badge */}
          <div className="absolute top-8 left-8 bg-eai-brass text-eai-ink px-4 py-2 font-body text-[10px] uppercase tracking-widest">
            {event.date}
          </div>
        </div>

        {/* Content - 40% */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          {/* Short label */}
          <span className="font-display text-4xl text-eai-brass/20 italic block mb-4">
            {event.shortTitle}
          </span>

          {/* Title */}
          <h3 className="font-display text-2xl lg:text-3xl text-eai-paper mb-4 leading-tight">
            {event.title}
          </h3>

          {/* Location */}
          <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass-pale/60 block mb-6">
            {event.location}
          </span>

          {/* Description */}
          <div className="flex flex-col gap-4 mb-8">
            {paragraphs.map((para, i) => (
              <p key={i} className="font-body text-sm text-eai-parchment/70 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Topics */}
          <div className="mb-8">
            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass-pale/40 block mb-3">
              Thématiques
            </span>
            <div className="flex flex-wrap gap-2">
              {event.topics.map((topic, i) => (
                <span
                  key={i}
                  className="font-body text-[9px] uppercase tracking-[0.1em] text-eai-parchment/60 bg-eai-parchment/5 px-3 py-1.5 border border-eai-parchment/10"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              // Track external link click
            }}
            className="inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass hover:text-eai-brass-soft transition-colors group/link"
          >
            {event.ctaLabel}
            <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
