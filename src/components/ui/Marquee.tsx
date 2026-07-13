'use client';

import React from 'react';

interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
}

function MarqueeRow({ items, direction = 'left', className }: MarqueeRowProps) {
  // Content duplicated once; keyframes translate -50% for a seamless loop.
  const content = [...items, ...items];
  return (
    <div className={`marquee-row overflow-hidden ${className ?? ''}`}>
      <div
        className={`flex w-max items-center gap-0 whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {content.map((item, i) => (
          <span key={i} className="flex items-center font-mono text-sm tracking-[0.2em] text-muted">
            <span className="px-6">{item}</span>
            <span aria-hidden className="text-accent">
              —
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee({ items }: { items: string[] }) {
  return (
    <div aria-hidden className="border-y hairline py-8 md:py-10" role="presentation">
      <MarqueeRow items={items} direction="left" />
      <MarqueeRow items={[...items].reverse()} direction="right" className="mt-6 opacity-50" />
    </div>
  );
}
