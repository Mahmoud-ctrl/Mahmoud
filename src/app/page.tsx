'use client';

import { useState } from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GrainOverlay from '@/components/ui/GrainOverlay';
import SmoothCursor from '@/components/ui/smooth-cursor';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import About from '@/components/About';
import Capabilities from '@/components/Capabilities';
import Works from '@/components/Works';
import Marquee from '@/components/ui/Marquee';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { marqueeItems } from '@/data/portfolio';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <SmoothScrollProvider>
      <Preloader onComplete={() => setBooted(true)} />
      <GrainOverlay />
      <SmoothCursor />
      <Navbar />
      <main id="top">
        <Hero start={booted} />
        <Manifesto />
        <About />
        <Capabilities />
        <Works />
        <Marquee items={marqueeItems} />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
