'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export function InstructorProfiles() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const instructors = t.raw('instructors') as Array<{
    name: string;
    title: string;
    bio: string;
    image: string;
    coursesCount: number;
  }>;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('instructorsLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight">
            {t('instructorsTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed mt-6">
            {t('instructorsBody')}
          </p>
        </motion.div>

        {/* Instructors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-eai-parchment/50">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-eai-ink/0 group-hover:bg-eai-ink/20 transition-colors duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-display text-lg text-eai-ink mb-1">{instructor.name}</h3>
              <span className="font-body text-[11px] uppercase tracking-[0.15em] text-eai-brass block mb-3">
                {instructor.title}
              </span>
              <p className="font-body text-sm text-eai-warm-grey leading-relaxed mb-3 line-clamp-3">
                {instructor.bio}
              </p>
              <span className="font-mono text-[11px] text-eai-warm-grey/50">
                {instructor.coursesCount} formations
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
