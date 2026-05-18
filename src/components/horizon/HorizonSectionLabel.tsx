import { ReactNode } from 'react';

interface HorizonSectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function HorizonSectionLabel({ children, className = '' }: HorizonSectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="w-12 h-px bg-eai-brass" />
      <span className="font-body text-label uppercase tracking-[0.25em] text-eai-warm-grey">
        {children}
      </span>
    </div>
  );
}
