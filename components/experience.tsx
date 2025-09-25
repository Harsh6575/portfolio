'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/section-heading';
import { MapPin, Calendar, Building, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export const experiences = [
  {
    role: "Software Developer",
    company: "Algoacharya",
    location: "Ahmedabad",
    duration: "Sept 2023 – May 2025",
    durationMonths: 20,
    type: "Full-time",
    logo: "/algoacharya-logo.webp", // Add your company logo path
    description: [
      "Built and maintained an algo-based trading platform for the Indian stock market.",
      "Developed responsive UI with Next.js, TypeScript, and Tailwind CSS, including dark mode and a custom component library.",
      "Collaborated with designers and product managers to deliver trading features and tools.",
      "Contributed to backend using Python (Django) and PostgreSQL, becoming a versatile full-stack contributor.",
    ],
    achievements: [
      { metric: "40%", description: "Reduced data fetch latency through GraphQL & REST API integration" },
      { metric: "100%", description: "Responsive design implementation across all trading features" }
    ],
    technologies: ["Next.js", "TypeScript", "Python", "Django", "PostgreSQL", "GraphQL"]
  },
  {
    role: ".NET Developer Intern",
    company: "Gujarat Informatics Limited (GIL)",
    location: "Gandhinagar", 
    duration: "Mar 2023 – May 2023",
    durationMonths: 3,
    type: "Internship",
    logo: "/gil-logo.png", // Add your company logo path
    description: [
      "Developed government web applications using .NET Core and SQL Server.",
      "Implemented REST APIs and authentication for secure user access.",
    ],
    achievements: [
      { metric: "25%", description: "Improved data retrieval speed through efficient database schema design" }
    ],
    technologies: [".NET Core", "SQL Server", "REST API", "C#"]
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          title="Professional Experience"
          subtitle="My journey in software development - building trading platforms and scalable web applications"
        />

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>
          
          {/* Duration Scale */}
          <div className="mb-8 hidden md:block">
            <div className="ml-16 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Timeline Scale:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-primary/30 rounded"></div>
                <span>3 months</span>
                <div className="w-8 h-2 bg-primary/60 rounded"></div>
                <span>6+ months</span>
                <div className="w-12 h-2 bg-primary rounded"></div>
                <span>1+ year</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block z-10"></div>
                
                {/* Experience Card */}
                <div className="md:ml-16">
                  <Card className="border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            {/* Company Logo */}
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              <img 
                                src={exp.logo} 
                                alt={`${exp.company} logo`}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  // Fallback to company initial if logo fails to load
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling!.style.display = 'flex';
                                }}
                              />
                              <div className="w-8 h-8 bg-primary/10 text-primary rounded flex items-center justify-center text-sm font-semibold hidden">
                                {exp.company.charAt(0)}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <CardTitle className="text-xl text-foreground flex items-center gap-2">
                                  {exp.role}
                                  {exp.type === 'Full-time' ? (
                                    <Briefcase className="w-4 h-4 text-primary" />
                                  ) : (
                                    <GraduationCap className="w-4 h-4 text-secondary-foreground" />
                                  )}
                                </CardTitle>
                                <Badge 
                                  variant={exp.type === 'Full-time' ? 'default' : 'secondary'}
                                  className="w-fit text-xs"
                                >
                                  {exp.type}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-sm mb-3">
                                <div className="flex items-center gap-1">
                                  <Building className="w-4 h-4" />
                                  <span className="font-medium">{exp.company}</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                              
                              {/* Duration Visualization */}
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">{exp.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      exp.durationMonths >= 12 ? 'bg-primary' : 
                                      exp.durationMonths >= 6 ? 'bg-primary/60' : 'bg-primary/30'
                                    }`}
                                    style={{ width: `${Math.min(exp.durationMonths * 4, 60)}px` }}
                                  ></div>
                                  <span className="text-xs text-muted-foreground">
                                    {exp.durationMonths >= 12 ? `${Math.floor(exp.durationMonths/12)}+ year${Math.floor(exp.durationMonths/12) > 1 ? 's' : ''}` : `${exp.durationMonths} months`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Achievement Highlights */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Key Achievements
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                                viewport={{ once: true }}
                                className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-2xl font-bold text-primary">{achievement.metric}</span>
                                  <TrendingUp className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {achievement.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Description */}
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {exp.description.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                              <span className="text-sm leading-relaxed">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 + (idx * 0.05) }}
                              viewport={{ once: true }}
                            >
                              <span className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground hover:bg-muted transition-colors cursor-default">
                                {tech}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};