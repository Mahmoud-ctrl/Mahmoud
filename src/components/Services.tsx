import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image'; 
import { ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  results: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  features: string[];
  experience: string;
  approach: string;
  imageUrl: string;
}

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Add imageUrl to each service object
  const services: Service[] = [
    {
      id: 0,
      title: "Frontend Development",
      subtitle: "User Interface Mastery",
      description: "Building modern, responsive web applications with React and Next.js. I create pixel-perfect interfaces that work seamlessly across all devices and browsers.",
      results: "50+ responsive web applications built with 99.9% uptime",
      size: "tall",
      features: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      experience: "4+ Years",
      approach: "Component-Driven",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 1,
      title: "Backend Development",
      subtitle: "Server-Side Architecture",
      description: "Developing robust backend systems with Node.js and Express. I build RESTful APIs and microservices that handle complex business logic efficiently.",
      results: "APIs serving 10M+ requests monthly with 99.95% reliability",
      size: "wide",
      features: ["Node.js", "Flask", "REST APIs", "GraphQL"],
      experience: "3+ Years",
      approach: "Security-First",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Database Design",
      subtitle: "Data Architecture",
      description: "Designing efficient database schemas and optimizing queries for maximum performance. I work with both SQL and NoSQL databases.",
      results: "Database queries optimized to run 300% faster on average",
      size: "medium",
      features: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
      experience: "3+ Years",
      approach: "Performance-Focused",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Full-Stack Integration",
      subtitle: "End-to-End Development",
      description: "Connecting frontend and backend systems seamlessly. I ensure smooth data flow and optimal user experience across the entire application stack.",
      results: "Complete web applications delivered 40% faster than industry average",
      size: "medium",
      features: ["Full-Stack", "API Integration", "State Management", "Real-time Data"],
      experience: "4+ Years",
      approach: "System Thinking",
      imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Cloud Deployment",
      subtitle: "DevOps & Hosting",
      description: "Deploying applications to cloud platforms with CI/CD pipelines. I ensure your applications are scalable, secure, and monitored in production.",
      results: "Zero-downtime deployments with automated scaling and monitoring",
      size: "wide",
      features: ["Vercel", "VPS", "Docker", "CI/CD"],
      experience: "2+ Years",
      approach: "Automation-First",
      imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Performance Optimization",
      subtitle: "Speed & Efficiency",
      description: "Optimizing web applications for maximum performance. I focus on Core Web Vitals, SEO, and user experience to ensure your site loads fast.",
      results: "Average 85% improvement in page load speeds and SEO scores",
      size: "small",
      features: ["Web Vitals", "SEO", "Bundle Optimization", "Caching"],
      experience: "3+ Years",
      approach: "Metrics-Driven",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2787&auto=format&fit=crop"
    }
  ];

  // Generate floating shapes matching your other sections
  const floatingShapes = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      size: 15 + (i % 3) * 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.3,
      isCircle: i % 2 === 0,
    }))
  }, []);

  const handleServiceClick = (serviceId: number) => {
    if (activeService === serviceId) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveService(null);
        setIsTransitioning(false);
      }, 300);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveService(serviceId);
        setIsTransitioning(false);

        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top;
          
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const getCardClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 min-h-[280px]';
      case 'medium':
        return 'col-span-1 row-span-2 min-h-[400px]';
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-2 min-h-[500px]';
      case 'wide':
        return 'col-span-1 md:col-span-2 row-span-1 min-h-[320px]';
      case 'tall':
        return 'col-span-1 row-span-3 min-h-[600px]';
      default:
        return 'col-span-1 row-span-1 min-h-[300px]';
    }
  };

  if (activeService !== null) {
    const service = services[activeService];
    return (
      <section 
        ref={sectionRef}
        className="min-h-screen bg-black relative overflow-hidden transition-all duration-700 ease-out"
      >
        {/* Floating shapes background matching your style */}
        <div className="absolute inset-0">
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className={`absolute border border-white/10 ${shape.isCircle ? 'rounded-full' : 'rounded-lg rotate-45'}`}
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: shape.isCircle ? [0, 360] : [0, 90, 0],
              }}
              transition={{
                duration: 8 + shape.id,
                repeat: Infinity,
                delay: shape.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative z-20 min-h-screen w-full flex items-center justify-center p-6 md:p-8 lg:p-12">
          {/* Close button */}
          <button
            onClick={() => handleServiceClick(activeService)}
            className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm z-30"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className={`max-w-6xl mx-auto transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <div className="text-center">
              {/* Service Content */}
              <div className="mb-8">
                <div className="text-sm md:text-lg font-bold mb-4 tracking-widest text-gray-400 uppercase">
                  {service.subtitle}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-none tracking-tighter">
                  {service.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto font-medium">
                  {service.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {service.features.map((feature, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <span className="text-white font-bold text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-sm text-gray-400 tracking-widest mb-2 uppercase">Results</div>
                  <div className="text-lg md:text-xl font-bold text-white">{service.results}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-sm text-gray-400 tracking-widest mb-2 uppercase">Experience</div>
                  <div className="text-lg md:text-xl font-bold text-white">{service.experience}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-sm text-gray-400 tracking-widest mb-2 uppercase">Approach</div>
                  <div className="text-lg md:text-xl font-bold text-white">{service.approach}</div>
                </div>
              </div>

              {/* CTA */}
              <motion.button 
                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="services" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating shapes background */}
      <div className="absolute inset-0">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute border border-white/10 ${shape.isCircle ? 'rounded-full' : 'rounded-lg rotate-45'}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: shape.isCircle ? [0, 360] : [0, 90, 0],
            }}
            transition={{
              duration: 10 + shape.id,
              repeat: Infinity,
              delay: shape.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className={`relative z-10 min-h-screen flex flex-col transition-all duration-700 ${isTransitioning ? 'opacity-60 blur-sm' : 'opacity-100 blur-0'}`}>
          {/* Header */}
          <div className="text-center pt-16 pb-12 px-4">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 text-white leading-tight tracking-tighter">
              What I Do
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-bold max-w-4xl mx-auto">
              Full-stack development services that scale with your business
            </p>
          </div>

          {/* Services Grid */}
          <div className="flex-1 px-4 md:px-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  // 3. Update JSX for the card
                  className={`group relative border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/30 ${getCardClasses(service.size)}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background Image */}
                  <Image
                    src={service.imageUrl}
                    alt={`${service.title} background image`}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 z-10 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
                  
                  {/* Content (ensure it's on top with z-20) */}
                  <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-xs md:text-sm font-bold mb-3 tracking-wider text-gray-400 uppercase">
                        {service.subtitle}
                      </div>
                      <h3 className={`font-bold mb-4 text-white leading-tight tracking-tight ${
                        service.size === 'large' ? 'text-2xl md:text-4xl' :
                        service.size === 'wide' ? 'text-xl md:text-3xl' :
                        'text-lg md:text-2xl'
                      }`}>
                        {service.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Experience:</span> {service.experience}
                        </div>
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Approach:</span> {service.approach}
                        </div>
                      </div>
                    </div>

                    {/* Launch indicator */}
                    <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="font-bold text-sm md:text-base tracking-wider uppercase">Learn More</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-3 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-white/20" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-12 px-4">
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-bold">Ready to build something amazing?</p>
            <motion.button 
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Start a Project
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;