'use client';

import { useEffect, useState } from 'react';
import { navItems, profile } from '@/data/portfolio';
import Magnetic from '@/components/ui/Magnetic';

function useBeirutClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Beirut',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useBeirutClock();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t hairline" aria-label="Footer">
      <div className="grid gap-12 px-6 py-16 md:grid-cols-3 md:px-12 md:py-20">
        {/* Socials */}
        <div>
          <p className="eyebrow mb-5">Connect</p>
          <ul className="space-y-3">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw font-mono text-sm text-ink"
                >
                  {s.label} — {s.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className="link-draw font-mono text-sm text-ink">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="link-draw font-mono text-sm text-ink">
                {profile.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Nav */}
        <div>
          <p className="eyebrow mb-5">Index</p>
          <ul className="space-y-3">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="link-draw font-mono text-sm text-ink">
                  <span className="mr-3 text-accent">0{i + 1}</span>
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Telemetry */}
        <div className="font-mono text-xs leading-7 text-muted">
          <p className="eyebrow mb-5">Telemetry</p>
          <p>
            LOCAL TIME — <span className="text-ink tabular-nums">{time || '--:--:--'}</span> BEIRUT
          </p>
          <p>
            VERSION — <span className="text-terminal">v3.0.0 · main@a3f9c2e</span>
          </p>
          <p>STACK — NEXT 15 · REACT 19 · TAILWIND 4</p>
          <p>
            © {year} {profile.name.toUpperCase()} — SIGNAL OVER NOISE
          </p>
          <div className="mt-6">
            <Magnetic>
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-block border hairline px-4 py-3 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                [ ↑ ]
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Ghost name bleeding off the bottom */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="text-ghost -mb-[0.24em] whitespace-nowrap text-center font-display text-[clamp(4rem,14vw,13rem)] font-bold leading-none tracking-tight">
          BADERALDIN
        </p>
      </div>
    </footer>
  );
}
