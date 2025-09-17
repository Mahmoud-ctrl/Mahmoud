'use client';

import { useState } from "react";
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
  
  return (
    <div className="cursor-none">
      <SmoothCursor />
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