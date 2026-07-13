'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** When defined, controls the reveal explicitly (true = play, false = stay hidden) instead of in-view triggering */
  immediate?: boolean;
  className?: string;
}

// Line rises out of an overflow-hidden mask — the signature reveal.
// The in-view trigger lives on the OUTER mask: the inner span starts fully
// clipped, so observing it directly would never intersect (ratio stays 0).
export default function RevealText({
  children,
  delay = 0,
  duration = 0.9,
  once = true,
  immediate,
  className,
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion();

  const variants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.65, 0, 0.35, 1] as const,
      },
    },
  };

  return (
    <motion.span
      className={`block overflow-hidden ${className ?? ''}`}
      initial="hidden"
      {...(immediate !== undefined
        ? { animate: immediate ? 'visible' : 'hidden' }
        : { whileInView: 'visible', viewport: { once, amount: 0.5 } })}
    >
      <motion.span className="block will-change-transform" variants={variants}>
        {children}
      </motion.span>
    </motion.span>
  );
}
