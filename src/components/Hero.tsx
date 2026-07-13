'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import { profile } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import RevealText from '@/components/ui/RevealText';
import Magnetic from '@/components/ui/Magnetic';

const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), { ssr: false });

const HERO_LINES = ['I BUILD', 'SOFTWARE THAT', 'ACTUALLY SHIPS.'];

interface HeroProps {
  start: boolean;
}

export default function Hero({ start }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const showFluid = isDesktop && !reduced;

  return (
    <section ref={ref} className="relative flex min-h-dvh flex-col overflow-hidden" aria-label="Intro">
      {/* Background: WebGL fluid on desktop, static spotlight elsewhere */}
      <div className="absolute inset-0" aria-hidden>
        {showFluid ? (
          <LiquidEther
            colors={['#FF4D00', '#1A1A2E', '#3D2010']}
            mouseForce={18}
            cursorSize={110}
            resolution={0.5}
            autoDemo
            autoSpeed={0.4}
            autoIntensity={1.8}
            style={{ opacity: 0.35 }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 70% 20%, var(--accent-glow), transparent 60%)',
            }}
          />
        )}
        {/* Bottom fade so display type sits on solid ground */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <motion.div
        className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-6 pt-28 md:px-12 md:pb-10"
        style={reduced ? undefined : { y: textY, opacity: textOpacity }}
      >
        {/* Eyebrow */}
        <div className="mb-8 overflow-hidden md:mb-12">
          <motion.p
            className="eyebrow"
            initial={{ y: '110%' }}
            animate={start ? { y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            {profile.name} — {profile.role}
          </motion.p>
        </div>

        {/* Display lines */}
        <h1 className="relative font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-ink">
          {HERO_LINES.map((line, i) => (
            <RevealText
              key={line}
              immediate={start}
              once
              delay={0.12 * i + 0.1}
              className="text-[clamp(3rem,11vw,10.5rem)]"
            >
              {i === 2 ? (
                <>
                  ACTUALLY <span className="text-accent">SHIPS.</span>
                </>
              ) : (
                line
              )}
            </RevealText>
          ))}
          {/* Playfair interjection */}
          <motion.span
            className="pointer-events-none absolute right-[6%] top-[2%] hidden font-serif text-[clamp(1.2rem,2.4vw,2.2rem)] italic tracking-normal normal-case text-muted md:block"
            initial={{ opacity: 0, rotate: -4 }}
            animate={start ? { opacity: 1, rotate: -4 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            aria-hidden
          >
            — obsessively.
          </motion.span>
        </h1>

        {/* CTA row */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-6 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Magnetic>
            <a
              href="#contact"
              className="inline-block border border-accent bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-bg transition-colors hover:bg-transparent hover:text-accent"
            >
              Hire me →
            </a>
          </Magnetic>
          <a
            href="#work"
            className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-ink"
          >
            View the work
          </a>
          <span className="ml-auto hidden font-mono text-xs tracking-[0.18em] text-muted md:inline">
            [ SCROLL<span className="animate-caret">_</span> ]
          </span>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="relative z-10 border-t hairline"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-4 md:px-12 md:py-5 ${i > 0 ? 'border-l hairline' : ''} ${
                i >= 2 ? 'border-t hairline md:border-t-0' : ''
              }`}
            >
              <dt className="eyebrow mb-1">{stat.label}</dt>
              <dd className="font-mono text-sm text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
