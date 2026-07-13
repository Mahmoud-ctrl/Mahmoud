'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { navItems, profile } from '@/data/portfolio';
import Magnetic from '@/components/ui/Magnetic';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
          scrolled ? 'border-b hairline bg-bg/70 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 md:px-12" aria-label="Primary">
          <a href="#top" className="font-mono text-sm font-medium tracking-widest text-ink">
            MB<span className="text-accent">©</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Magnetic>
              <a
                href="#contact"
                className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink md:flex"
              >
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-terminal" />
                Open for work
              </a>
            </Magnetic>

            {/* Mobile menu toggle */}
            <button
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-bg px-6 pb-10 pt-24"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    className="block font-display text-5xl font-bold uppercase leading-tight tracking-tight text-ink"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.65, 0, 0.35, 1] }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mr-4 font-mono text-sm text-accent">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t hairline pt-6">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-terminal">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-terminal" />
                Open for work
              </p>
              <div className="flex flex-wrap gap-6">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-muted"
                  >
                    {s.label}
                  </a>
                ))}
                <a
                  href={`mailto:${profile.email}`}
                  className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-muted"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
