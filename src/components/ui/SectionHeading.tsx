'use client';

import React from 'react';
import RevealText from './RevealText';

interface SectionHeadingProps {
  eyebrow: string; // e.g. "02 / CAPABILITIES"
  title: string; // e.g. "WHAT I DO"
  className?: string;
}

// Mono eyebrow + huge display title with a ghost duplicate behind it.
export default function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <span
        aria-hidden
        className="text-ghost pointer-events-none absolute -top-[0.35em] left-0 select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,14rem)] font-bold leading-none tracking-tighter"
      >
        {title}
      </span>
      <div className="relative">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-ink">
          <RevealText>{title}</RevealText>
        </h2>
      </div>
    </div>
  );
}
