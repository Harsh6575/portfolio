'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/section-heading';
import { MapPin, Calendar, Building, Briefcase, GraduationCap } from 'lucide-react';
import { CompanyLogo } from './company-logo';

export const experiences = [
  {
    role: "Software Developer",
    company: "Algoacharya",
    location: "Ahmedabad",
    duration: "Sept 2023 – May 2025",
    type: "Full-time",
    logo: "/algoacharya-logo.webp", // Add your company logo path
    description: [
      "Built and maintained an algo-based trading platform for the Indian stock market.",
      "Developed responsive UI with Next.js, TypeScript, and Tailwind CSS, including dark mode and a custom component library.",
      "Integrated GraphQL & REST APIs, reducing data fetch latency by 40%.",
      "Collaborated with designers and product managers to deliver trading features and tools.",
      "Contributed to backend using Python (Django) and PostgreSQL, becoming a versatile full-stack contributor.",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "Django", "PostgreSQL", "GraphQL"]
  },
  {
    role: ".NET Developer Intern",
    company: "Gujarat Informatics Limited (GIL)",
    location: "Gandhinagar",
    duration: "Mar 2023 – May 2023",
    type: "Internship",
    logo: "/gil-logo.png", // Add your company logo path
    description: [
      "Developed government web applications using .NET Core and SQL Server.",
      "Designed efficient database schemas, improving data retrieval speed by 25%.",
      "Implemented REST APIs and authentication for secure user access.",
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
                              <CompanyLogo
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                fallback="/fallback-logo.png"
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Description */}
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {exp.description.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 + (idx * 0.1) }}
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
                              transition={{ duration: 0.3, delay: 0.3 + (idx * 0.05) }}
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