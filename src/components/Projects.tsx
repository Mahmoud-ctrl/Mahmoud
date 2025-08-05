import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, Easing } from 'framer-motion';
import { ExternalLink, Github, Eye, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const projects = [
    {
      title: 'Lebwork (Freelancing Platform)',
      description: 'A comprehensive full-stack freelancing platform that connects talented freelancers with clients. Features include project management, secure payment processing, real-time messaging, portfolio showcases, and AI integration.',
      image: 'https://lebwork.b-cdn.net/Screenshot%202025-07-31%20172126.png',
      tags: ['React', 'Flask', 'PostgreSQL', 'Whish'],
      liveUrl: 'https://www.lebwork.net',
      githubUrl: 'https://github.com/Mahmoud-ctrl/Lebwork',
      featured: true,
    },
    {
      title: 'Tech E-Store',
      description: 'A modern and responsive e-commerce platform designed for purchasing the latest tech products with ease. Built using React, Node.js, and PostgreSQL, the platform features a clean user interface, dynamic product listings, and an intuitive admin dashboard for managing inventory and orders.',
      image: 'https://lebwork.b-cdn.net/Screenshot%202025-07-31%20172308.png',
      tags: ['React', 'Node.js', 'Postgresql'],
      liveUrl: 'https://aidibysmartech.com/',
      githubUrl: 'https://github.com/Mahmoud-ctrl/SmartTech',
      featured: true,
    },
    {
      title: 'Events Hoster',
      description: ' An event management platform built with Typescript, Tailwind CSS, and Vite. It offers a user-friendly interface for hosting and managing events, with features like event creation, registration, and event management.',
      image: 'https://lebwork.b-cdn.net/Screenshot%202025-07-31%20172944.png',
      tags: ['Typescript', 'TailwindCss', 'Vite'],
      liveUrl: 'https://cute-sable-1480fa.netlify.app/',
      githubUrl: 'https://github.com/Mahmoud-ctrl/NovaVenue',
      featured: false,
    },
    {
      title: 'Movie Streaming Platform',
      description: 'Kinoklick is a full-featured movie streaming website developed using Flask, SQLite, HTML, and Tailwind CSS. The platform allows users to browse and stream a wide selection of movies and TV shows, with clean UI design and smooth navigation.',
      image: 'https://lebwork.b-cdn.net/Screenshot%202025-07-31%20173555.png',
      tags: ['HTML', 'TailwindCss', 'Flask', 'SQLite'],
      liveUrl: 'https://kinoklick.onrender.com/',
      githubUrl: 'https://github.com/Mahmoud-ctrl/KinoKlick',
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as Easing,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { y: 100, opacity: 0, rotateX: 90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.21, 0.47, 0.32, 0.98] as Easing,
        type: "spring" as const,
        stiffness: 120
      }
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-[#080809] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            <motion.span
              initial={{ filter: "blur(10px)", y: 50 }}
              animate={isInView ? { filter: "blur(0px)", y: 0 } : { filter: "blur(10px)", y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Featured{' '}
            </motion.span>
            <span className="relative">
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                initial={{ y: 50, opacity: 0, rotateY: 90 }}
                animate={isInView ? { 
                  y: 0, 
                  opacity: 1,
                  rotateY: 0
                } : { y: 50, opacity: 0, rotateY: 90 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                Projects
              </motion.span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Discover my latest work and creative solutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid gap-12 sm:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects
            .filter(project => project.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <motion.div 
                  className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  style={{ y: index % 2 === 0 ? y1 : y2 }}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                      <span className="text-blue-400 font-medium tracking-wider uppercase text-xs sm:text-sm">
                        Featured Project
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  <motion.div 
                    className="flex flex-wrap gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/50 text-secondary-foreground rounded-full text-xs sm:text-sm border border-border hover:border-primary/50 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.8 + tagIndex * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 1 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 group"
                      >
                        <Eye className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Live Demo
                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                      >
                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Source Code
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className={`relative group order-first lg:order-none ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                  style={{ y: index % 2 === 0 ? y2 : y1 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-border bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-sm">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}

          {/* Other Projects Grid */}
          <motion.div 
            className="mt-12 sm:mt-16"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Other Notable Projects
            </motion.h3>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {projects
                .filter(project => !project.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50, rotateX: 45 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-500 group overflow-hidden"
                  >
                    <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl opacity-20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        
                      </motion.div>
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover overlay with project links */}
                      <motion.div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={18} className="sm:w-5 sm:h-5" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -12 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={18} className="sm:w-5 sm:h-5" />
                        </motion.a>
                      </motion.div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <motion.h4 
                        className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        {project.title}
                      </motion.h4>

                      <motion.p 
                        className="text-muted-foreground text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      >
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="px-2.5 sm:px-3 py-1 bg-secondary/30 text-secondary-foreground rounded-full text-xs border border-border/50 hover:border-primary/30 transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.6 + tagIndex * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;