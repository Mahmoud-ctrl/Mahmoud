import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Quote, Linkedin, Github, ArrowRight, X, Mail, FileX2 } from 'lucide-react';
import { Button } from './ui/button';
import Threads from './ui/Threads';

const Hero = () => {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  const socialLinks = useMemo(() => [
    { icon: Github, href: 'https://github.com/Mahmoud-ctrl', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mahmoud-baderaldin-540399378/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:baderaldinmahmud@email.com', label: 'Email' },
    { icon: FileX2, href:'#', label: 'CV' },
  ], []);

  const personalStatement = "I architect and build robust, scalable, and intuitive digital solutions that drive business growth and enhance user experiences. My expertise spans the full software development lifecycle, from concept to deployment.";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced stagger for faster load
        delayChildren: 0.1
      }
    }
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20
      }
    }
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20
      }
    }
  };

  const zoomSlideIn: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 1.05,
      y: 30,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: [0.2, 0, 0, 1],
        delay: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-[#080809] relative overflow-hidden font-sans" id="home">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 opacity-20 hidden md:block"
      >
        <Threads 
          color={[0.2, 0.4, 0.8]} 
          amplitude={0.5} 
          distance={0.3}  
          enableMouseInteraction={true}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-600/5 rounded-full blur-xl" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-purple-600/5 rounded-full blur-xl" 
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.015 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-2 sm:px-6 lg:px-8 pt-24 md:pt-0 sm:pt-32 lg:pt-20 md:pb-0 pb-8 sm:pb-18 lg:pb-4">

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[80vh]"
        >
          <div className="order-2 lg:order-2 lg:col-span-6 relative w-full mt-8">
            <motion.div
              variants={zoomSlideIn}
              className="relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/30">
                <div className="relative h-full overflow-hidden min-h-[clamp(200px,50vw,300px)] sm:min-h-[clamp(300px,60vw,400px)] flex items-center justify-center bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-slate-900/30 z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <img 
                      src="https://lebwork.b-cdn.net/7fb9010a-e2dd-434d-8420-eaf48ddafd37.png" 
                      alt="Profile" 
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-20">
                  <motion.div
                    variants={containerVariants}
                    className="space-y-2 sm:space-y-4"
                  >
                    <motion.h1 
                      variants={fadeInUp}
                      className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight" 
                    >
                      Mahmoud{' '}
                      <span className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] bg-clip-text text-transparent">
                        Baderaldin
                      </span>
                    </motion.h1>
                    
                    <motion.h2 
                      variants={fadeInUp}
                      className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-200"
                    >
                      Full-Stack Software Engineer
                    </motion.h2>

                    <motion.p 
                      variants={fadeInUp}
                      className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-[90%] sm:max-w-md"
                    >
                      Specializing in building high-performance, user-centric web applications with a focus on robust backend systems and intuitive frontend experiences.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="mt-4 sm:mt-6"
                  >
                    <Button 
                      onClick={() => setShowAvailabilityModal(true)}
                      className="group bg-[#0ea5e9] hover:bg-[#38bdf8] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <span>Let's Connect</span>
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={slideInLeft}
            className="order-1 lg:order-1 lg:col-span-3 space-y-6 sm:space-y-8 w-full"
          >
            <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-3 text-blue-400"
              >
                <Quote className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium text-slate-300">My Ethos</span>
              </motion.div>
              <motion.blockquote variants={fadeIn} className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light italic border-l-2 border-blue-400/30 pl-3 sm:pl-4">
                "{personalStatement}"
              </motion.blockquote>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
              <h3 className="text-slate-300 font-medium text-xs sm:text-sm uppercase tracking-wider">Connect</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300"
                  >
                    <social.icon size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors sm:w-[16px] sm:h-[16px]" />
                    <span className="text-slate-400 text-xs sm:text-sm group-hover:text-slate-300 transition-colors">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            className="order-3 lg:order-3 lg:col-span-3 space-y-6 sm:space-y-8 w-full"
          >
            <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
              <h3 className="text-slate-300 font-medium text-xs sm:text-sm uppercase tracking-wider">Experience</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-3 sm:p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <motion.div 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    99+
                  </motion.div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium">Projects Delivered</div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-3 sm:p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <motion.div 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    3+
                  </motion.div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium">Years Experience</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
              <h3 className="text-slate-300 font-medium text-xs sm:text-sm uppercase tracking-wider">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB', 'GraphQL', 'Docker'].map((tech, index) => ( 
                  <motion.span
                    key={tech}
                    variants={fadeIn}
                    custom={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.8 + index * 0.08,
                      type: "spring", 
                      stiffness: 300
                    }}
                    className="px-2 sm:px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-medium hover:bg-slate-700/50 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="p-2 sm:p-3 rounded-xl bg-blue-900/20 border border-blue-700/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-400 text-xs sm:text-sm font-medium">Open to New Opportunities</span>
              </div>
              <p className="text-slate-400 text-xs">Actively seeking challenging Full-Stack and Software Engineering roles.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAvailabilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAvailabilityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl max-w-[min(90vw,400px)] w-full relative mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAvailabilityModal(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 pr-8">Let's Connect!</h3>
              <p className="text-slate-300 mb-6 text-xs sm:text-sm">
                Thank you for your interest. Please feel free to reach out via:
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:baderaldinmahmud@email.com" className="flex items-center space-x-2 sm:space-x-3 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm">
                    <Mail size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="break-all">baderaldinmahmud@email.com</span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 sm:space-x-3 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm">
                    <Linkedin size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>LinkedIn Profile</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(Hero);
