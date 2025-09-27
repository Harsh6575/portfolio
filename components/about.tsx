"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import {
  Code2,
  Server,
  TrendingUp,
  Download,
  Heart,
  Target,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { TOTAL_EXPERIENCE } from '@/constants';

export const About = () => {
  const highlights = [
    {
      icon: Server,
      title: "Backend Specialist",
      description: "Building scalable APIs with Node.js and Spring Boot, learning microservices and distributed systems"
    },
    {
      icon: TrendingUp,
      title: "Algo Trading Enthusiast",
      description: "Prototyping trading strategies and data pipelines with Python, pandas, and market APIs"
    },
    {
      icon: Code2,
      title: "Full-Stack Experience",
      description: "Delivered fintech dashboards using React, Next.js, TypeScript, and Django"
    }
  ];

  const values = [
    { icon: Heart, text: "Passionate about clean, maintainable code" },
    { icon: Target, text: "Always learning and adapting to new technologies" },
    { icon: Zap, text: "Building solutions that make a real impact" }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          title="About Me"
          subtitle="My journey from frontend development to backend specialization"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed text-justify">
                I&apos;m a <span className="text-primary font-semibold">Software Developer</span> with {TOTAL_EXPERIENCE}+ years of experience,
                currently transitioning into <span className="text-primary font-semibold">backend specialization</span>. My journey began in frontend development,
                but I&apos;ve discovered my passion lies in <span className="text-primary font-semibold"> designing and  building scalable,
                  robust backend systems</span>that power seamless user experiences.
              </p>

              <p className="text-muted-foreground leading-relaxed text-justify">
                At <span className='text-primary font-semibold'>AlgoAcharya (fintech startup)</span>,I contributed to algorithmic trading platforms, working across the stack — from crafting responsive dashboards to optimizing APIs and database queries for performance. This hands-on work gave me a solid understanding of how frontend and backend connect in real-world systems.
              </p>

              <p className="text-muted-foreground leading-relaxed text-justify">
                Recently, I&apos;ve been expanding my skills into <span className="text-foreground font-medium">backend engineering with Java (Spring Boot), Go, and Docker</span>,
                alongside deep dives into <span className='text-foreground font-medium'>system design, DBMS, operating systems, and computer networks</span>. I&apos;m also exploring <span className='text-foreground font-medium'>algorithmic trading </span> with Python, pandas, and risk management strategies, combining my tech skills with my passion for financial systems.
              </p>
            </div>

            {/* Current Focus */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Currently Focusing On
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Building backend APIs with Java Spring Boot and Node.js/Express</p>
                  <p>• Exploring distributed systems and microservices architecture</p>
                  <p>• Experimenting with algorithmic trading strategies using Python and pandas</p>
                  <p>• Strengthening CS fundamentals (OS, DBMS, CN, DSA)</p>
                  <p>• Deploying apps with Docker and exploring cloud-native workflows</p>
                </div>
              </CardContent>
            </Card>

            {/* Values */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">What Drives Me</h3>
              <div className="space-y-3">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <value.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{value.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button className="group" size="lg">
                <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Highlights & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Profile Image/Logo */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border border-primary/20"
              >
                <Image
                  src="/400X400.svg"
                  alt="Harsh Vansjaliya"
                  className="w-32 h-32 opacity-80 dark:invert"
                  height={132}
                  width={132}
                />
              </motion.div>
            </div>

            {/* Expertise Highlights */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">My Expertise</h3>
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Card className="border-border/50 hover:border-border transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <highlight.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm mb-1">
                            {highlight.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-center">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{TOTAL_EXPERIENCE}+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-xs text-muted-foreground">Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-xs text-muted-foreground">Projects Built</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-xs text-muted-foreground">Learning Mode</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};