'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';
import { manifesto } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const words = manifesto.sentence.split(' ');
  const strikeIndex = words.indexOf(manifesto.strikeWord);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let annotation: RoughAnnotation | null = null;
    if (strikeRef.current) {
      annotation = annotate(strikeRef.current, {
        type: 'strike-through',
        color: '#FF4D00',
        strokeWidth: 3,
        animationDuration: 500,
      });
    }

    if (reduced) {
      // Static: everything lit, strike drawn once.
      gsap.set(section.querySelectorAll('[data-word]'), { opacity: 1 });
      annotation?.show();
      return () => annotation?.remove();
    }

    const wordEls = section.querySelectorAll('[data-word]');
    const strikeAt = (strikeIndex + 1) / words.length;
    let struck = false;

    const tween = gsap.fromTo(
      wordEls,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > strikeAt && !struck) {
              struck = true;
              annotation?.show();
            } else if (self.progress < strikeAt - 0.05 && struck) {
              struck = false;
              annotation?.hide();
            }
          },
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      annotation?.remove();
    };
  }, [reduced, strikeIndex, words.length]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden border-t hairline"
      aria-label="Manifesto"
    >
      <div className="px-6 py-24 md:px-12">
        <p className="eyebrow mb-10">{manifesto.eyebrow}</p>
        <p className="max-w-6xl font-display text-[clamp(1.9rem,5.2vw,4.5rem)] font-bold leading-[1.15] tracking-tight text-ink">
          {words.map((word, i) => {
            const isStrike = i === strikeIndex;
            const isAccent = word.startsWith(manifesto.accentWord);
            return (
              <span key={i}>
                <span
                  data-word
                  ref={isStrike ? strikeRef : undefined}
                  className={`inline-block ${isAccent ? 'text-accent' : ''}`}
                >
                  {word}
                </span>{' '}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
