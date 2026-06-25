'use client';

/**
 * CinematicHomepage
 *
 * Wraps all 5 cinematic chapters + expertise + method + CTA.
 * Manages active-scene state for the CinematicHero via IntersectionObserver.
 */

import { useEffect, useRef, useState } from 'react';
import { CinematicHero } from './CinematicHero';
import { CinematicPlan } from './CinematicPlan';
import { CinematicSystem } from './CinematicSystem';
import { CinematicStructure } from './CinematicStructure';
import { CinematicSpace } from './CinematicSpace';
import { CinematicExpertiseGrid } from './CinematicExpertiseGrid';
import { CinematicMethod } from './CinematicMethod';
import { CinematicContactCTA } from './CinematicContactCTA';

export function CinematicHomepage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Chapter 1 — Line / Hero */}
      <div ref={heroRef}>
        <CinematicHero isActive={heroActive} />
      </div>

      {/* Connecting olive line between hero and plan */}
      <div className="relative h-px mx-6 sm:mx-10 lg:mx-14">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eai-brass/25 to-transparent" />
      </div>

      {/* Chapter 2 — Plan */}
      <CinematicPlan />

      {/* Chapter 3 — System */}
      <CinematicSystem />

      {/* Chapter 4 — Structure */}
      <CinematicStructure />

      {/* Chapter 5 — Space */}
      <CinematicSpace />

      {/* Expertise grid */}
      <CinematicExpertiseGrid />

      {/* Method */}
      <CinematicMethod />

      {/* Contact CTA */}
      <CinematicContactCTA />
    </>
  );
}
