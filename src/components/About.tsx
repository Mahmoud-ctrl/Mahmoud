'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import RotatingText from './RotatingText';
import { SparklesText } from './ui/sparkles-text';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-12 md:py-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-xl"></div>
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="items-center">
          <div 
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Hi, I&apos;m Mahmoud 👋
            </h3>

            <div className="text-gray-300 leading-relaxed font-bold">

              <div className=" lg:block text-3xl xl:text-4xl 2xl:text-[62px] leading-tight">
                <span>Full-stack developer from Lebanon, building responsive </span>
                <RotatingText
                  texts={['powerful', 'scalable', 'intuitive', 'modern', 'efficient']}
                  mainClassName="bg-white text-black overflow-hidden py-1 px-3 justify-center rounded-lg inline-flex items-center mx-2"
                  staggerFrom={"last"}  
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
                <span> applications with a focus on great user <span className="lg:hidden">experiences.</span></span>
                <SparklesText className="inline hidden lg:block">experiences.</SparklesText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;