'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { about, profile } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionHeading from '@/components/ui/SectionHeading';
import Magnetic from '@/components/ui/Magnetic';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const photoInView = useInView(photoRef, { amount: 0.45, once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t hairline px-6 py-28 md:px-12 md:py-44"
      aria-label="About"
    >
      <SectionHeading eyebrow={about.eyebrow} title="THE OPERATOR" className="mb-16 md:mb-24" />

      <div className="grid gap-12 md:grid-cols-12 md:gap-0">
        {/* Photo — grayscale ignites to color when it enters view */}
        <div className="md:col-span-5 md:pr-12">
          <div ref={photoRef} className="relative overflow-hidden">
            <motion.div style={reduced ? undefined : { y: parallaxY }} className="relative -my-10">
              <Image
                src="/mahmoud-mountain.jpg"
                alt="Mahmoud Baderaldin in the mountains of Lebanon"
                width={1000}
                height={800}
                sizes="(min-width: 768px) 40vw, 100vw"
                className={`w-full object-cover transition-[filter] duration-[1400ms] ease-out ${
                  photoInView || reduced ? 'grayscale-0' : 'grayscale'
                }`}
              />
            </motion.div>
          </div>
          <p className="eyebrow mt-4">{about.photoCaption}</p>
        </div>

        {/* Editorial column with visible rule */}
        <div className="md:col-span-7 md:border-l md:hairline md:pl-12">
          <p className="max-w-xl font-serif text-2xl italic leading-snug text-ink md:text-3xl">
            “{about.pullQuote}”
          </p>

          <div className="mt-10 max-w-xl space-y-6 text-base leading-relaxed text-muted md:text-lg">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.12 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Facts table */}
          <dl className="mt-12 max-w-xl">
            {about.facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-t hairline py-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.08 }}
              >
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="text-right font-mono text-sm text-ink">
                  {fact.label === 'Status' ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-terminal" />
                      {fact.value}
                    </span>
                  ) : (
                    fact.value
                  )}
                </dd>
              </motion.div>
            ))}
            <div className="border-t hairline" />
          </dl>

          <Magnetic className="mt-10">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border hairline px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              [ Download CV ]
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
