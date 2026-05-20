'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const filterKeys = ['all', 'residential', 'interior', 'commercial', 'urban', 'hospitality', 'public', 'bim'] as const;
type FilterKey = typeof filterKeys[number];

interface ProjectFiltersProps {
  onFilterChange: (filter: FilterKey) => void;
  activeFilter: FilterKey;
}

export function ProjectFilters({ onFilterChange, activeFilter }: ProjectFiltersProps) {
  const t = useTranslations('Projets');

  const filterLabels: Record<FilterKey, string> = {
    all: t('filterAll'),
    residential: t('filterResidential'),
    interior: t('filterInterior'),
    commercial: t('filterCommercial'),
    urban: t('filterUrban'),
    hospitality: t('filterHospitality'),
    public: t('filterPublic'),
    bim: t('filterBIM'),
  };

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 pb-6 border-b border-eai-line">
      {filterKeys.map((key) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`font-body text-[10px] uppercase tracking-[0.16em] transition-all duration-300 pb-1 border-b-2 ${
            activeFilter === key
              ? 'text-eai-brass border-eai-brass'
              : 'text-eai-warm-grey/60 border-transparent hover:text-eai-charcoal hover:border-eai-brass/30'
          }`}
        >
          {filterLabels[key]}
        </button>
      ))}
    </div>
  );
}
