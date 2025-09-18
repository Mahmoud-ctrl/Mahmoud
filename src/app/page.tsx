'use client';

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/About";
import ServicesSection from "@/components/Services";
import HorizontalScroll from "@/components/ScrollTransition";
import ContactForm from "@/components/Contact";
import Footer from "@/components/Footer";
import { SmoothCursor } from "@/components/ui/smooth-cursor";


export default function Home() {
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="cursor-none">
      {!isMobile && <SmoothCursor />}
      <Navbar scrollProgress={heroScrollProgress} />
      <Hero onScrollProgress={setHeroScrollProgress}/>
      <AboutSection />
      <ServicesSection />
      <Projects heroScrollProgress={heroScrollProgress}/>
      <HorizontalScroll />
      <ContactForm />
      <Footer />
    </div>
  );
}