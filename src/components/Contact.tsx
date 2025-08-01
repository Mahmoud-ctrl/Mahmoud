import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, Easing } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  // Use a separate ref for the title to ensure its animation triggers correctly
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'baderaldinmahmud@email.com',
      href: 'mailto:baderaldinmahmud@email.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+961 71736695',
      href: 'tel:+96171736695',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Saida, Lebanon',
      href: '#',
    },
  ];

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

  return (
    <section id="contact" className="py-20 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Attach the ref directly to the motion.h2 element */}
        <motion.h2
          ref={titleRef} // Attach the ref here
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-16 text-center" // Added mb-16 and text-center for better spacing and alignment
          initial={{ y: 200, opacity: 0 }}
          animate={isTitleInView ? {
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
            animate={isTitleInView ? { filter: "blur(0px)" } : { filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Let's{' '}
          </motion.span>
          <span className="relative">
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              initial={{ y: 250, opacity: 0, skewY: 15 }}
              animate={isTitleInView ? {
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
              Connect
            </motion.span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isTitleInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, or potential collaborations.
                Feel free to reach out if you have a project in mind or just want to say hello!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white shadow-lg shadow-blue-600/25 rounded-lg flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{info.label}</div>
                    <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-card rounded-xl p-6 border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Available for projects</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Currently accepting new clients and exciting opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-card rounded-2xl p-8 border border-border shadow-luxury"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-foreground font-medium">First Name</label>
                  <Input
                    placeholder="John"
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-foreground font-medium">Last Name</label>
                  <Input
                    placeholder="Doe"
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-foreground font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-foreground font-medium">Subject</label>
                <Input
                  placeholder="Let's work together"
                  className="bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-foreground font-medium">Message</label>
                <Textarea
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-glow transition-all duration-300 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
