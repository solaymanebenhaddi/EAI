import { ReactNode } from 'react';

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-brass/40 text-label font-body">[</span>
      <h3 className="text-label font-body tracking-[0.15em] text-brass uppercase">
        {children}
      </h3>
      <span className="text-brass/40 text-label font-body">]</span>
    </div>
  );
}
