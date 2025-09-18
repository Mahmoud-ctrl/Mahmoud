'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  year: string;
  category: string;
}

interface ProjectsProps {
  heroScrollProgress: number;
}

// --- Project Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "LEBWORK",
    subtitle: "Next-Gen Freelancing",
    description: "Empowering businesses and freelancers to collaborate effortlessly with intuitive project management, secure payments, real-time communication, and AI-powered insights that turn connections into successful partnerships.",
    image: "https://lebwork.b-cdn.net/stuff/f62008a8edae4c43ba4e6957d8a05e78.png",
    tech: ["React", "Flask", "PostgreSQL", "Whish Money"],
    github: "https://github.com/Mahmoud-ctrl/Lebwork",
    live: "https://lebwork.net",
    year: "2025",
    category: "Freelance Marketplace"
  },
  {
    id: 2,
    title: "XSignals AI",
    subtitle: "Crypto Innovation",
    description: "Next-generation trading intelligence that transforms market complexity into precise, AI-powered signals for consistently profitable decisions.",
    image: "https://lebwork.b-cdn.net/stuff/1440x0.jpg",
    tech: ["React", "Python", "Blockchain", "AI"],
    github: "https://github.com/Mahmoud-ctrl/XSignalsAI",
    live: "https://xsignalsai.com",
    year: "2024",
    category: "Crypto/AI"
  },
  {
    id: 3,
    title: "E-STORE",
    subtitle: "Tech Commerce Platform",
    description: "Modern e-commerce platform with dynamic product catalogs, advanced search functionality, and streamlined inquiry system connecting customers directly with sales teams for personalized service.",
    image: "https://lebwork.b-cdn.net/stuff/images_PC%20System.jpg",
    tech: ["React", "Flask", "PostgreSQL", "WhatsApp API"],
    live: "https://aidibysmartech.com",
    github: "https://github.com/Mahmoud-ctrl/SmartTech",
    year: "2024",
    category: "E-Commerce"
  },
  {
    id: 4,
    title: "Booknest",
    subtitle: "Smarter Appointments, Healthier Smiles",
    description: "A powerful, intuitive system that transforms complex dental scheduling into seamless, efficient appointments, enhancing both patient experience and clinic workflow.",
    image: "https://lebwork.b-cdn.net/stuff/istockphoto-1152845300-2048x2048.jpg",
    tech: ["React", "Tailwind CSS","Netlify"],
    github: "https://github.com/Mahmoud-ctrl/Booknest",
    live: "https://preeminent-kashata-bc8bb1.netlify.app/",
    year: "2024",
    category: "Appointment Booking"
  }
];

// --- Individual Project Panel ---
const ProjectPanel: React.FC<{ 
  project: Project; 
  index: number; 
  isActive: boolean;
  heroProgress: number;
}> = ({ project, index, isActive, heroProgress }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id='projects'
      className="min-w-full min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: heroProgress > 0.5 ? 1 : 0,
        x: heroProgress > 0.5 ? 0 : 100
      }}
      transition={{ 
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isHovered ? 0.4 : 0.7
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center min-h-[80vh] lg:min-h-full">
          
          {/* Left Content - Project Info */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Project Number & Meta */}
            <motion.div
              className="flex items-start gap-3 sm:gap-4 lg:gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                x: isActive ? 0 : -30,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white/20 leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="pt-2 sm:pt-3 lg:pt-4">
                <p className="text-white/60 text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2">
                  {project.year} • {project.category}
                </p>
                <div className="w-12 sm:w-16 h-px bg-white/30" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isActive ? 1 : 0.8,
                y: isActive ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] mb-2 sm:mb-3 lg:mb-4">
                {project.title}
              </h2>
              <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-light text-white/80 mb-3 sm:mb-4 lg:mb-6">
                {project.subtitle}
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-none lg:max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.6,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div 
              className="flex flex-wrap gap-1.5 sm:gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {project.tech.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white/80 border border-white/20 rounded-full backdrop-blur-sm"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    scale: 1.05 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 group text-sm sm:text-base"
                  whileHover={{ scale: 1.05, gap: '0.75rem' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Live
                  <ArrowUpRight 
                    size={16} 
                    className="sm:w-[18px] sm:h-[18px] group-hover:rotate-45 transition-transform duration-300" 
                  />
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 group text-sm sm:text-base"
                  whileHover={{ scale: 1.05, gap: '0.75rem' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Source
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="lg:col-span-5 lg:col-start-8 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden"
              animate={{
                scale: isHovered ? 1.02 : 1,
                rotate: isHovered ? (index % 2 === 0 ? 1 : -1) : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0 
              }}
              viewport={{ once: true }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
              
              {/* Floating accent */}
              <motion.div
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Horizontal Projects Component ---
const HorizontalProjects: React.FC<ProjectsProps> = ({ heroScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Smooth scrolling with spring physics
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { 
    damping: 50, 
    stiffness: 400,
    restDelta: 0.5 
  });

  // Detect if the section is in view
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation functions - wrapped in useCallback to prevent unnecessary re-renders
  const scrollToProject = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const targetX = -index * container.clientWidth;
    x.set(targetX);
    setCurrentIndex(index);
    
    // Update navigation state
    setCanScrollLeft(index > 0);
    setCanScrollRight(index < projects.length - 1);
  }, [x]);

  const nextProject = useCallback(() => {
    if (currentIndex < projects.length - 1) {
      scrollToProject(currentIndex + 1);
    }
  }, [currentIndex, scrollToProject]);

  const prevProject = useCallback(() => {
    if (currentIndex > 0) {
      scrollToProject(currentIndex - 1);
    }
  }, [currentIndex, scrollToProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, isInView]);

  // Enhanced touch/swipe handling for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(currentY - startY);
      
      // Prevent vertical scrolling if horizontal movement is detected
      if (deltaX > deltaY && deltaX > 20) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const endTime = Date.now();
      const deltaX = startX - endX;
      const deltaTime = endTime - startTime;
      const velocity = Math.abs(deltaX) / deltaTime;
      
      // Swipe detection: minimum distance OR sufficient velocity
      if (Math.abs(deltaX) > 50 || (velocity > 0.5 && Math.abs(deltaX) > 30)) {
        if (deltaX > 0) {
          // Swiped left - go to next project
          nextProject();
        } else {
          // Swiped right - go to previous project
          prevProject();
        }
      }
      
      isDragging = false;
    };

    const container = containerRef.current;
    if (container && isMobile) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [nextProject, prevProject, isMobile]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black min-h-screen overflow-hidden"
    >
      
      {/* Main Horizontal Scroll Container */}
      <motion.div
        ref={scrollContainerRef}
        className="flex min-h-screen"
        style={{ x: smoothX }}
      >
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            isActive={index === currentIndex}
            heroProgress={heroScrollProgress}
          />
        ))}
      </motion.div>

      {/* Navigation Controls - Desktop Only */}
      {isInView && !isMobile && (
        <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 z-50">
          <motion.div 
            className="flex items-center justify-center gap-4 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Previous Button */}
            <motion.button
              onClick={prevProject}
              disabled={!canScrollLeft}
              className="p-2 rounded-full text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              whileHover={canScrollLeft ? { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                  animate={{
                    backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
                    scale: index === currentIndex ? 1.2 : 1,
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextProject}
              disabled={!canScrollRight}
              className="p-2 rounded-full text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              whileHover={canScrollRight ? { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={canScrollRight ? { scale: 0.9 } : {}}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Mobile Side Navigation Arrows */}
      {isMobile && (
        <>
          {/* Left Arrow */}
          <motion.button
            onClick={prevProject}
            disabled={!canScrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={nextProject}
            disabled={!canScrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Mobile Progress Counter */}
          <motion.div 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 text-white/60 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-mono">
              <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>
          </motion.div>
        </>
      )}

      {/* Project Counter - Responsive positioning */}
      {isInView && !isMobile && (
        <motion.div 
          className="absolute top-1/2 right-4 sm:right-6 lg:right-8 transform -translate-y-1/2 z-50 text-white/60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs sm:text-sm font-mono tracking-wider">
            <span className="text-white text-base sm:text-lg">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      {isInView && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/10 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-white"
            animate={{
              width: `${((currentIndex + 1) / projects.length) * 100}%`
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Keyboard Hint - Only show on desktop */}
      {isInView && !isMobile && (
        <motion.div
          className="absolute bottom-28 sm:bottom-32 lg:bottom-36 right-4 sm:right-6 lg:right-8 text-white/40 text-xs z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>← → Navigate</p>
        </motion.div>
      )}

      {/* Mobile swipe hint */}
      {isInView && isMobile && (
        <motion.div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/40 text-xs z-40"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>Swipe to navigate</p>
        </motion.div>
      )}
    </section>
  );
};

export default HorizontalProjects;