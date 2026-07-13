'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionHeading from '@/components/ui/SectionHeading';
import Magnetic from '@/components/ui/Magnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Magnetic>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          [ Visit ] <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </Magnetic>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-draw inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink"
      >
        <Github className="h-3.5 w-3.5" aria-hidden /> [ GitHub ]
      </a>
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
      <p className="eyebrow mb-4">
        {project.year} · {project.category.toUpperCase()} ·{' '}
        {project.stack.map((s) => s.toUpperCase()).join(' / ')}
      </p>
      <h3 className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
        {project.title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{project.pitch}</p>
      <dl className="mt-6 flex flex-wrap gap-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="border hairline px-3 py-2">
            <dt className="eyebrow text-[0.5625rem]">{m.label}</dt>
            <dd
              className={`font-mono text-xs ${m.value === 'LIVE' ? 'text-terminal' : 'text-ink'}`}
            >
              {m.value === 'LIVE' ? '● LIVE' : m.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 font-mono text-xs text-muted">{project.liveLabel}</p>
      <div className="mt-8">
        <ProjectLinks project={project} />
      </div>
    </>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const horizontal = isDesktop && !reduced;

  useEffect(() => {
    if (!horizontal) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(Math.min(projects.length - 1, Math.floor(self.progress * projects.length)));
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Re-measure once images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [horizontal]);

  return (
    <section id="work" className="border-t hairline" aria-label="Selected works">
      <div className="px-6 pt-28 md:px-12 md:pt-44">
        <SectionHeading eyebrow="03 / SELECTED WORKS" title="SHIPPED" className="mb-16 md:mb-20" />
      </div>

      {horizontal ? (
        <div ref={sectionRef} className="relative h-dvh overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center">
            {projects.map((project, i) => (
              <article
                key={project.index}
                className="relative flex h-full w-[85vw] shrink-0 items-center border-l hairline px-16 first:border-l-0"
              >
                {/* Ghost index */}
                <span
                  aria-hidden
                  className="text-ghost pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 select-none font-display text-[22rem] font-bold leading-none"
                >
                  {project.index}
                </span>

                <div className="relative z-10 grid w-full grid-cols-12 items-center gap-12">
                  <div className="col-span-5">
                    <ProjectInfo project={project} />
                  </div>
                  <div className="col-span-7">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        sizes="60vw"
                        className={`object-cover transition-transform duration-[2500ms] ease-out ${
                          active === i ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-bg/20" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Counter + progress */}
          <div className="absolute bottom-8 left-16 z-20 font-mono text-sm text-muted">
            <span className="text-ink">{String(active + 1).padStart(2, '0')}</span> —{' '}
            {String(projects.length).padStart(2, '0')}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-line">
            <div
              ref={progressRef}
              className="h-full origin-left bg-accent"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      ) : (
        /* Vertical fallback: stacked cards */
        <div className="space-y-20 px-6 pb-28 md:px-12">
          {projects.map((project) => (
            <article key={project.index} className="relative border-t hairline pt-10 first:border-t-0">
              <span
                aria-hidden
                className="text-ghost pointer-events-none absolute -top-2 right-0 select-none font-display text-[7rem] font-bold leading-none"
              >
                {project.index}
              </span>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-bg/20" />
              </div>
              <div className="mt-8">
                <ProjectInfo project={project} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
