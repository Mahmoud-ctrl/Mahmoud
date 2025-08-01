import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, Easing } from 'framer-motion';
import { 
  Code, Database, Cloud, Smartphone, Palette, Settings, Zap, Trophy, Star,
  TrendingUp, Target, Cpu, Globe, Shield, Layers, GitBranch
} from 'lucide-react';
import { 
  SiTypescript, SiPython, SiReact, SiTailwindcss, SiVuedotjs, SiThreedotjs, SiNodedotjs, 
  SiPostgresql, SiGraphql, SiRedis, SiDocker, SiGithub, SiReactbootstrap, SiFlutter, SiIos, SiAndroid
  
} from 'react-icons/si';
import Icon from './icons';

const SkillsScroll = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Track when animations should start
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Animated skill level component with fixed reloading
  const SkillBar = ({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) => {
    const progress = useMotionValue(0);
    const animatedProgress = useSpring(progress, { stiffness: 100, damping: 30 });

    useEffect(() => {
      if (hasAnimated) {
        const timer = setTimeout(() => {
          progress.set(level);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [hasAnimated, level, delay, progress]);

    return (
      <div className="space-y-2" >
        <div className="flex justify-between items-center">
          <span className="text-slate-300 font-medium">{skill}</span>
          <span className="text-blue-400 text-sm font-semibold">{level}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full relative"
            initial={{ width: 0 }}
            animate={hasAnimated ? { width: level + '%' } : { width: 0 }}
            transition={{ 
              duration: 1.5, 
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-2 h-full bg-white rounded-full opacity-60"
              animate={hasAnimated ? { 
                x: [0, 4, 0],
                opacity: [0.6, 1, 0.6]
              } : {}}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  };

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'React/Next.js', level: 95, icon: <SiReact /> },
        { name: 'TypeScript', level: 90, icon: <SiTypescript /> },
        { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss /> },
        { name: 'Three.js/WebGL', level: 85, icon: <SiThreedotjs /> },
        { name: 'Framer Motion', level: 88, icon: <Icon name="framer" /> },
        { name: 'Vue.js', level: 80, icon: <Icon name="vue" /> }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-400',
      skills: [
        { name: 'Node.js/Express', level: 93, icon: <SiNodedotjs /> },
        { name: 'Python/Django', level: 88, icon: <Icon name="python" /> },
        { name: 'PostgreSQL/MongoDB', level: 90, icon: <SiPostgresql /> },
        { name: 'GraphQL/REST APIs', level: 92, icon: <SiGraphql />},
        { name: 'Redis/Caching', level: 85, icon: <SiRedis /> },
        { name: 'Microservices', level: 83, icon: '🔧' }
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-purple-500 to-violet-400',
      skills: [
        { name: 'AWS/Azure', level: 87, icon: '☁️' },
        { name: 'Docker/Kubernetes', level: 85, icon: <SiDocker /> },
        { name: 'CI/CD Pipelines', level: 88, icon: <Icon name="cicd" /> },
        { name: 'GitHub Actions', level: 85, icon: <SiGithub /> },
        { name: 'Monitoring Tools', level: 80, icon: '📈' },
        { name: 'Serverless', level: 82, icon: '⚡' }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-orange-500 to-red-400',
      skills: [
        { name: 'React Native', level: 88, icon: <SiReactbootstrap /> },
        { name: 'Flutter/Dart', level: 82, icon: <SiFlutter /> },
        { name: 'iOS/Swift', level: 75, icon: <SiIos /> },
        { name: 'Android/Kotlin', level: 78, icon: <SiAndroid />},
        { name: 'App Store Deploy', level: 85, icon: '🚀' },
        { name: 'Mobile UI/UX', level: 87, icon: '✨' }
      ]
    }
  };

  const additionalSkills = [
    { category: 'Design', icon: Palette, skills: ['Figma', 'Adobe Suite', 'UI/UX Design', 'Prototyping'] },
    { category: 'Tools', icon: Settings, skills: ['Git/GitHub', 'VS Code', 'Postman', 'Jira'] },
    { category: 'Methodologies', icon: Target, skills: ['Agile/Scrum', 'TDD', 'Clean Architecture', 'Code Reviews'] },
    { category: 'Soft Skills', icon: Trophy, skills: ['Leadership', 'Communication', 'Problem Solving', 'Mentoring'] }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99] as Easing
      }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as Easing
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as Easing
    }
  };

  return (
    <div ref={ref} className="bg-[#080809] text-white py-16 sm:py-20 lg:py-32 relative overflow-hidden" id='skills'>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16 lg:space-y-24"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.div
              className="inline-flex items-center space-x-3 text-blue-400 mb-4"
              whileHover={{ scale: 1.05 }}
              animate={floatingAnimation}
            >
              <Zap className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Technical Skills</span>
            </motion.div>
            
            <motion.h2 
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        initial={{ y: 200, opacity: 0 }}
                        animate={isInView ? { 
                          y: [200, -10, 5, -2, 0], 
                          opacity: [0, 0.7, 0.9, 1, 1] 
                        } : { y: 200, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          times: [0, 0.4, 0.6, 0.8, 1],
                          ease: "easeOut"
                        }}
                        variants={itemVariants}
                      >
                        <motion.span
                          initial={{ filter: "blur(10px)" }}
                          animate={isInView ? { filter: "blur(0px)" } : { filter: "blur(10px)" }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          Mastery Through{' '}
                        </motion.span>
                        <span className="relative">
                          <motion.span 
                            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                            initial={{ y: 250, opacity: 0, skewY: 15 }}
                            animate={isInView ? { 
                              y: [250, -15, 8, 0], 
                              opacity: [0, 0.8, 1, 1],
                              skewY: [15, -5, 2, 0]
                            } : { y: 250, opacity: 0, skewY: 15 }}
                            transition={{ 
                              duration: 1.8,
                              delay: 0.3,
                              times: [0, 0.5, 0.8, 1],
                              ease: "easeOut"
                            }}
                          >
                            Innovation
                          </motion.span>
                          <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          />
                        </span>
                      </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Constantly evolving my technical arsenal to build cutting-edge solutions 
              that push the boundaries of what's possible in modern software development.
            </motion.p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-3 px-4 sm:px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/50 border border-slate-600'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 hover:text-white border border-slate-800'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                <category.icon size={18} />
                <span className="text-sm sm:text-base">{category.title}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Main Skills Display - Two Column Layout */}
          <AnimatePresence>
            <motion.div
              
              className="space-y-8"
            >
              {/* Category Header */}
              <motion.div
                className="flex items-center justify-center space-x-4 mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${skillCategories[activeCategory as keyof typeof skillCategories].color} bg-opacity-10`}
                  
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {React.createElement(skillCategories[activeCategory as keyof typeof skillCategories].icon, { 
                    size: 32, 
                    className: "text-white" 
                  })}
                </motion.div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    {skillCategories[activeCategory as keyof typeof skillCategories].title}
                  </h3>
                  <div className={`h-1 w-24 bg-gradient-to-r ${skillCategories[activeCategory as keyof typeof skillCategories].color} rounded-full mt-2`} />
                </div>
              </motion.div>

              {/* Skills Grid - Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <motion.div
                      className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        y: -2,
                        backgroundColor: "rgba(30, 41, 59, 0.5)"
                      }}
                    >
                      {/* Hover glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${skillCategories[activeCategory as keyof typeof skillCategories].color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                      />
                      
                      {/* Skill header */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center space-x-3">
                          <motion.span 
                            className="text-3xl"
                            animate={{ 
                              rotate: hoveredSkill === skill.name ? [0, -10, 10, 0] : 0,
                              scale: hoveredSkill === skill.name ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {skill.icon}
                          </motion.span>
                          <span className="font-bold text-white text-lg">{skill.name}</span>
                        </div>
                        
                        <motion.div
                          animate={{ 
                            rotate: hoveredSkill === skill.name ? 360 : 0,
                            scale: hoveredSkill === skill.name ? 1.2 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Star size={18} className="text-yellow-400" />
                        </motion.div>
                      </div>
                      
                      {/* Skill bar */}
                      <div className="relative z-10">
                        <SkillBar skill="" level={skill.level} delay={index * 100} />
                      </div>

                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Additional Skills Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Additional Expertise
              </h3>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalSkills.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  variants={skillCardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      className="p-3 rounded-xl bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors"
                      whileHover={{ rotate: 15 }}
                    >
                      <category.icon size={22} className="text-blue-400" />
                    </motion.div>
                    <h4 className="font-bold text-white">{category.category}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="flex items-center space-x-3 text-slate-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: skillIndex * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <motion.div
              className="inline-flex items-center space-x-2 text-blue-400"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp size={20} />
              <span className="text-sm font-medium">Always Learning, Always Growing</span>
            </motion.div>
            
            <p className="text-slate-300 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. These skills represent my current expertise, 
              but I'm constantly exploring new technologies and methodologies to stay at the forefront of innovation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsScroll;