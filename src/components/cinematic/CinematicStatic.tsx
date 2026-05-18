'use client';

import { SectionLabel } from '@/components/ui/SectionLabel';

export function CinematicStatic() {
  return (
    <section className="relative w-full h-[80vh] bg-mist flex items-center justify-center border-y border-cloud overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 400 400" 
          fill="none"
          className="opacity-20 max-w-[400px] mx-auto"
        >
          <path
            d="M 50,350 L 350,350 L 350,200 L 250,200 L 250,50 L 50,50 Z M 150,50 L 150,350 M 250,200 L 50,200"
            stroke="#C4A052"
            strokeWidth="2"
            fill="none"
          />
          <path d="M 0,100 L 400,100 M 0,200 L 400,200 M 0,300 L 400,300" stroke="#C4A052" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
          <path d="M 100,0 L 100,400 M 200,0 L 200,400 M 300,0 L 300,400" stroke="#C4A052" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <SectionLabel className="mb-8">Expérience Cinématique</SectionLabel>
        <h2 className="font-display text-display-md text-ink italic mb-10 max-w-[500px]">
          Un voyage architectural depuis la vision jusqu&apos;à la matière.
        </h2>
        
        <div className="flex flex-col gap-6 text-left max-w-[400px]">
          <div className="border-l border-brass pl-6">
            <span className="font-display text-[32px] text-brass leading-none block mb-2">01</span>
            <h3 className="font-body text-[16px] text-ink mb-2">Architecture</h3>
            <p className="font-body text-[14px] text-mortar">De l&apos;esquisse à la construction.</p>
          </div>
          <div className="border-l border-brass/50 pl-6">
            <span className="font-display text-[32px] text-brass/50 leading-none block mb-2">02</span>
            <h3 className="font-body text-[16px] text-ink mb-2">BIM</h3>
            <p className="font-body text-[14px] text-mortar">Modélisation et coordination.</p>
          </div>
          <div className="border-l border-brass/30 pl-6">
            <span className="font-display text-[32px] text-brass/30 leading-none block mb-2">03</span>
            <h3 className="font-body text-[16px] text-ink mb-2">Design Intérieur</h3>
            <p className="font-body text-[14px] text-mortar">Matière, lumière et espace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}