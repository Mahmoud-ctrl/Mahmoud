'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { capabilities } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  // Cursor-following preview (desktop only)
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springX = useSpring(previewX, { stiffness: 150, damping: 20, mass: 0.4 });
  const springY = useSpring(previewY, { stiffness: 150, damping: 20, mass: 0.4 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      previewX.set(e.clientX - rect.left + 24);
      previewY.set(e.clientY - rect.top - 100);
    },
    [reduced, previewX, previewY]
  );

  const toggleRow = (i: number) => setExpanded((cur) => (cur === i ? null : i));

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative border-t hairline px-6 py-28 md:px-12 md:py-44"
      aria-label="Capabilities"
      onMouseMove={onMouseMove}
    >
      <SectionHeading eyebrow="02 / CAPABILITIES" title="WHAT I DO" className="mb-16 md:mb-24" />

      <div role="list">
        {capabilities.map((cap, i) => {
          const isOpen = expanded === i;
          return (
            <div key={cap.index} role="listitem" className="border-t hairline last:border-b">
              <button
                className={`group relative block w-full py-6 text-left transition-colors duration-300 md:py-8 ${
                  hovered === i ? 'bg-bg-elevated' : ''
                }`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => toggleRow(i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-5 md:gap-10">
                  <span className="font-mono text-sm text-accent">{cap.index}</span>
                  <span
                    className={`flex-1 font-display text-2xl font-bold tracking-tight text-ink transition-transform duration-300 md:text-5xl ${
                      hovered === i ? 'md:translate-x-3' : ''
                    }`}
                  >
                    {cap.title}
                  </span>
                  <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted lg:block">
                    {cap.tags.join(' · ')}
                  </span>
                  <span className="hidden font-mono text-xs text-muted md:block">{cap.years}</span>
                  <ArrowUpRight
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-90 text-accent' : hovered === i ? '-rotate-12 text-accent' : ''
                    }`}
                    aria-hidden
                  />
                </div>
              </button>

              {/* Accordion detail */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.35, ease: [0.65, 0, 0.35, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-8 pl-10 pr-4 md:grid-cols-12 md:pl-24">
                      <div className="md:col-span-7">
                        <p className="eyebrow mb-3">{cap.subtitle}</p>
                        <p className="max-w-xl text-base leading-relaxed text-muted">
                          {cap.description}
                        </p>
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-terminal">
                          {cap.results}
                        </p>
                      </div>
                      <div className="md:col-span-5">
                        <div className="flex flex-wrap gap-2">
                          {cap.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border hairline px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 font-mono text-xs text-muted">
                          APPROACH — {cap.approach} · {cap.years}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Floating image preview follows cursor on desktop */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-30 hidden h-[200px] w-[320px] overflow-hidden lg:block"
          style={{ x: springX, y: springY }}
          animate={{ opacity: hovered !== null && expanded === null ? 1 : 0, scale: hovered !== null ? 1 : 0.92 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          {capabilities.map((cap, i) => (
            <Image
              key={cap.index}
              src={cap.image}
              alt=""
              fill
              sizes="320px"
              className={`object-cover transition-opacity duration-300 ${
                hovered === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
