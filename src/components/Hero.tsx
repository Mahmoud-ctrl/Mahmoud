'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useTransform, useScroll, useInView } from 'framer-motion';
import LiquidEther from './ui/LiquidEther';

interface HeroProps {
  onScrollProgress?: (progress: number) => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollProgress }) => {
  const containerRef = useRef<HTMLElement>(null);
  const lastProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isHeroInView = useInView(containerRef, { amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const throttledProgressCallback = useCallback((progress: number) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (Math.abs(progress - lastProgressRef.current) > 0.001) {
        onScrollProgress?.(progress);
        lastProgressRef.current = progress;
      }
      rafRef.current = null;
    });
  }, [onScrollProgress]);

  useEffect(() => {
    return scrollYProgress.on("change", throttledProgressCallback);
  }, [scrollYProgress, throttledProgressCallback]);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section 
        id="home"
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ 
          position: 'relative',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        {/* LiquidEther Background - Keep the unique element */}
        <div 
          className="absolute inset-0 pointer-events-auto"
          style={{
            willChange: 'auto',
            contain: 'layout style paint',
          }}
        >
          <LiquidEther
            colors={['#5227FF', '#ffffff', '#888888']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={isHeroInView}
            autoSpeed={0.7} 
            autoIntensity={2.8} 
            takeoverDuration={0.5} 
            autoResumeDelay={100}
            autoRampDuration={0.8}
          />
        </div>

        <motion.div 
          style={{ 
            y, 
            opacity,
            willChange: 'transform, opacity',
          }}
          className="relative z-20 text-center text-white px-4 max-w-7xl mx-auto pointer-events-auto"
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs sm:text-sm tracking-wider text-gray-400 uppercase whitespace-nowrap">
              Based in Lebanon • Available Worldwide
            </span>
          </motion.div>

          {/* Mobile-optimized typography - single line names */}
          <motion.h1 
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Mahmoud Baderaldin
          </motion.h1>

          <motion.h2 
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide text-white whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Full Stack Web Developer
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed font-bold px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Crafting digital experiences that matter — from sleek frontends to robust backends.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.button 
              className="px-6 sm:px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase font-bold cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Hire Me              
            </motion.button>
            
            <motion.button 
              className="px-6 sm:px-8 py-3 text-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase font-bold cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              View My Work
            </motion.button>
          </motion.div>

          {/* Mobile-optimized tech stack */}
          <motion.div 
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {/* Mobile: Stack vertically */}
            <div className="flex flex-wrap justify-center gap-2 text-xs tracking-widest text-gray-400 uppercase font-bold sm:hidden">
              <span>React & Next.js</span>
              <span>•</span>
              <span>Node.js & Express</span>
              <span>•</span>
              <span>Database Design</span>
              <span>•</span>
              <span>API Development</span>
            </div>
                        
            {/* Desktop: Horizontal with separators */}
            <div className="hidden sm:flex flex-wrap justify-center gap-4 lg:gap-8 text-xs tracking-widest text-gray-400 uppercase font-bold">
              <span>React & Next.js</span>
              <span>•</span>
              <span>Node.js & Express</span>
              <span>•</span>
              <span>Database Design</span>
              <span>•</span>
              <span>API Development</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Clean scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
          style={{ 
            opacity,
            willChange: 'opacity' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"
            style={{ willChange: 'transform' }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;