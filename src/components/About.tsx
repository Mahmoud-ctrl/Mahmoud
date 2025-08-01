import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, Easing } from 'framer-motion';
import { 
  User, 
  Code, 
  Target, 
  Lightbulb, 
  Coffee, 
  Clock, 
  Heart,
  Zap,
  BookOpen,
  Puzzle,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('approach');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animated counter hook
  const useAnimatedCounter = (end: number, duration: number = 2) => {
    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 100, damping: 30 });
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        count.set(end);
      }
    }, [isInView, end, count]);

    useEffect(() => {
      return rounded.on('change', (latest) => {
        setDisplayCount(Math.round(latest));
      });
    }, [rounded]);

    return displayCount;
  };

  const projectsCount = useAnimatedCounter(150);
  const yearsCount = useAnimatedCounter(5);
  const clientsCount = useAnimatedCounter(50);

  const tabs = [
    { 
      id: 'approach', 
      label: 'My Approach', 
      icon: Target,
      content: {
        title: "Problem-Solving Philosophy",
        description: "I believe in understanding the 'why' before diving into the 'how'. Every project starts with deep research and user empathy.",
        points: [
          "Research-driven development with user-centric design",
          "Iterative prototyping and continuous feedback loops",
          "Clean, maintainable code that scales with business needs",
          "Cross-functional collaboration and agile methodologies"
        ]
      }
    },
    { 
      id: 'values', 
      label: 'Core Values', 
      icon: Heart,
      content: {
        title: "What Drives Me",
        description: "Quality, innovation, and continuous learning are at the heart of everything I create.",
        points: [
          "Craftsmanship over quick fixes - building things right",
          "Transparency and honest communication throughout projects",
          "Continuous learning and staying ahead of technology trends",
          "Mentoring others and contributing to the developer community"
        ]
      }
    },
    { 
      id: 'process', 
      label: 'Work Process', 
      icon: Zap,
      content: {
        title: "How I Work",
        description: "A structured yet flexible approach that adapts to project needs while maintaining high standards.",
        points: [
          "Discovery & Planning: Understanding requirements and constraints",
          "Design & Architecture: Creating scalable system designs",
          "Development & Testing: Building with quality and performance",
          "Deployment & Optimization: Launching and continuous improvement"
        ]
      }
    }
  ];

  const personalCards = [
    {
      id: 'coffee',
      icon: Coffee,
      title: 'Fueled by Coffee',
      shortDesc: 'Coffee enthusiast',
      fullDesc: 'I believe the best code is written with a perfect cup of coffee. My daily ritual includes trying different brewing methods and discovering new roasts from around the world.',
      color: 'from-amber-900/20 to-orange-900/20',
      borderColor: 'border-amber-700/30',
      iconColor: 'text-amber-400'
    },
    {
      id: 'learning',
      icon: BookOpen,
      title: 'Lifelong Learner',
      shortDesc: 'Always curious',
      fullDesc: 'Technology evolves rapidly, and I thrive on staying at the forefront. Whether it\'s exploring new frameworks, reading research papers, or experimenting with emerging technologies.',
      color: 'from-blue-900/20 to-indigo-900/20',
      borderColor: 'border-blue-700/30',
      iconColor: 'text-blue-400'
    },
    {
      id: 'puzzle',
      icon: Puzzle,
      title: 'Problem Solver',
      shortDesc: 'Love challenges',
      fullDesc: 'Complex problems don\'t intimidate me—they energize me. I approach each challenge as a puzzle to solve, breaking down complexity into manageable, elegant solutions.',
      color: 'from-purple-900/20 to-violet-900/20',
      borderColor: 'border-purple-700/30',
      iconColor: 'text-purple-400'
    }
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
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99] as Easing
      }
    }
  };

  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as Easing
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    collapsed: { 
      height: 'auto',
      transition: { 
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98] as Easing
      }
    },
    expanded: { 
      height: 'auto',
      transition: { 
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98] as Easing
      }
    }
  };

  return (
    <div ref={ref} className="bg-[#080809] text-white py-16 sm:py-20 lg:py-32 relative overflow-hidden" id="about">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
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
            >
              <User className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">About Me</span>
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
              Crafting Digital{' '} 
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
                Experiences
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
              I'm a full-stack engineer passionate about building scalable, user-centric applications 
              that solve real-world problems through clean code and innovative thinking.
            </motion.p>
          </motion.div>

          {/* Tab Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon size={16} />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {tabs.map((tab) => (
                  activeTab === tab.id && (
                    <motion.div
                      key={tab.id}
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="max-w-4xl mx-auto text-center space-y-6"
                    >
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {tab.content.title}
                      </h3>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {tab.content.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-8">
                        {tab.content.points.map((point, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <ArrowRight size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300 text-sm sm:text-base">{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Personal Cards Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-white">
              Beyond the Code
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  animate={expandedCard === card.id ? "expanded" : "collapsed"}
                  className={`p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                    `bg-gradient-to-br ${card.color} ${card.borderColor}`
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <card.icon size={24} className={card.iconColor} />
                      <div>
                        <h4 className="font-semibold text-white">{card.title}</h4>
                        <p className="text-slate-400 text-sm">{card.shortDesc}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-slate-400" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedCard === card.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {card.fullDesc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;