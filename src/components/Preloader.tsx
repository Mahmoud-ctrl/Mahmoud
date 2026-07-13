'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { bootLog } from '@/data/portfolio';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SESSION_KEY = 'signal-preloader-done';
const LINE_INTERVAL = 320; // ms between boot-log lines
const TOTAL_MS = bootLog.length * LINE_INTERVAL + 500;

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState<boolean | null>(null); // null until sessionStorage checked
  const [lines, setLines] = useState(0);
  const [counter, setCounter] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setExiting(true);
    // Curtain animation runs 0.8s, then unmount.
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 850);
  }, [onComplete]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      onComplete?.();
      return;
    }
    setVisible(true);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible !== true) {
      document.documentElement.style.overflow = '';
      return;
    }
    if (reduced) {
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }

    const lineTimer = setInterval(() => {
      setLines((n) => Math.min(n + 1, bootLog.length));
    }, LINE_INTERVAL);

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / TOTAL_MS) * 100));
      setCounter(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(lineTimer);
      cancelAnimationFrame(raf);
    };
  }, [visible, reduced, finish]);

  if (visible !== true) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200]"
        onClick={finish}
        role="status"
        aria-label="Loading portfolio"
      >
        {/* Split curtain panels */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-bg"
          animate={exiting ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
          animate={exiting ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Boot log */}
        <motion.div
          className="absolute left-6 top-6 md:left-12 md:top-12"
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="font-mono text-xs leading-6 md:text-sm">
            {bootLog.slice(0, lines).map((line, i) => (
              <p key={i} className={line.startsWith('$') ? 'text-ink' : 'text-terminal'}>
                {line}
              </p>
            ))}
            {lines < bootLog.length && (
              <span className="animate-caret inline-block h-4 w-2 bg-terminal align-middle" />
            )}
          </div>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="absolute bottom-6 right-6 md:bottom-12 md:right-12"
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <span className="font-mono text-6xl font-medium tabular-nums text-ink md:text-8xl">
            {String(counter).padStart(3, '0')}
          </span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
