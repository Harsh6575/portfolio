"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Server, 
  Wrench, 
  Braces, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { SectionHeading } from './section-heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export const skillsData = [
  {
    category: "Backend Focus",
    icon: Server,
    period: "2024 - Present",
    description: "Current specialization in scalable backend systems",
    items: [
      "Node.js", 
      "Express.js", 
      "Django", 
      "REST API", 
      "GraphQL", 
      ".NET Core",
      "PostgreSQL",
      "MongoDB"
    ],
    priority: true
  },
  {
    category: "Algorithmic Trading",
    icon: TrendingUp,
    period: "2024 - Present", 
    description: "Market data analysis and automated strategies",
    items: [
      "Python",
      "pandas", 
      "NumPy", 
      "yfinance",
      "Jupyter Notebooks",
      "Data Analysis"
    ],
    priority: true
  },
  {
    category: "Frontend & Full-Stack",
    icon: Code,
    period: "2022 - Present",
    description: "Modern web development with React ecosystem",
    items: [
      "Next.js", 
      "React", 
      "TypeScript", 
      "JavaScript (ES6+)", 
      "Tailwind CSS", 
      "shadcn/ui"
    ],
    priority: false
  },
  {
    category: "Databases",
    icon: Database,
    period: "2023 - Present",
    description: "Database design and optimization",
    items: [
      "PostgreSQL", 
      "MongoDB", 
      "SQL Server", 
      "Database Design",
      "Query Optimization"
    ],
    priority: false
  },
  {
    category: "Tools & DevOps", 
    icon: Wrench,
    period: "2022 - Present",
    description: "Development workflow and deployment tools",
    items: [
      "Git", 
      "Docker", 
      "Postman", 
      "VS Code",
      "Linux",
      "Vercel",
      "CI/CD"
    ],
    priority: false
  },
  {
    category: "Languages",
    icon: Braces,
    period: "2022 - Present", 
    description: "Programming languages in active use",
    items: [
      "TypeScript", 
      "JavaScript", 
      "Python", 
      "C#",
      "SQL"
    ],
    priority: false
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          title="Skills & Expertise"
          subtitle="My technical journey and current focus areas - from frontend foundations to backend specialization"
        />

        {/* Priority Skills (Current Focus) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Current Focus Areas
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skillsData
              .filter(skill => skill.priority)
              .map((skillGroup, index) => {
                const Icon = skillGroup.icon;
                return (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <CardTitle className="text-lg">
                                {skillGroup.category}
                              </CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {skillGroup.period}
                              </Badge>
                            </div>
                            <CardDescription>
                              {skillGroup.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 + (idx * 0.05) }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Braces className="w-5 h-5 text-muted-foreground" />
            Additional Skills & Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {skillsData
              .filter(skill => !skill.priority)
              .map((skillGroup, index) => {
                const Icon = skillGroup.icon;
                return (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-border/30 hover:border-border transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <CardTitle className="text-base">
                            {skillGroup.category}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          {skillGroup.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-xs hover:bg-muted/70 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};