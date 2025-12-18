"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Code,
  Database,
  Server,
  Wrench,
  Braces,
  Calendar,
  CandlestickChart,
  Terminal,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export const skillsData: {
  category: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  period: string;
  description: string;
  items: string[];
  priority: boolean;
}[] = [
  {
    category: "Backend Development",
    icon: Server,
    period: "2023 - Present",
    description:
      "Building scalable backend systems, well-structured APIs, and production-ready service architectures.",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Django",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "JWT Authentication",
      "Caching Strategies",
      "API Design",
    ],
    priority: true,
  },
  {
    category: "Frontend Development",
    icon: Code,
    period: "2022 - Present",
    description:
      "Developing modern, responsive user interfaces and integrating complex backend APIs.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "shadcn/ui",
      "API Integration",
    ],
    priority: true,
  },
  {
    category: "Cloud & DevOps",
    icon: Wrench,
    period: "2023 - Present",
    description: "Deploying, containerizing, and managing applications on cloud infrastructure.",
    items: [
      "AWS EC2",
      "AWS S3",
      "AWS IAM",
      "Docker",
      "Docker Compose",
      "CI/CD",
      "Linux",
      "Vercel",
      "Git",
      "GitHub",
      "Bitbucket",
      "Postman",
    ],
    priority: true,
  },
  {
    category: "Database & System Concepts",
    icon: Database,
    period: "2023 - Present",
    description: "Designing efficient data models and optimizing database performance.",
    items: ["Schema Design", "Query Optimization", "Indexing", "Transactions", "Normalization"],
    priority: false,
  },
  {
    category: "Python & Market Data Analysis",
    icon: CandlestickChart,
    period: "2023 - Present",
    description:
      "Working with market data to analyze trends, visualize insights, and experiment with trading strategies.",
    items: [
      "Python",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "yfinance",
      "Jupyter Notebooks",
      "Data Analysis",
      "Basic Strategy Backtesting",
    ],
    priority: false,
  },
  {
    category: "Languages",
    icon: Terminal,
    period: "2022 - Present",
    description: "Programming languages used across backend, frontend, and automation projects.",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    priority: false,
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
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
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
                              <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                              <Badge variant="secondary" className="text-xs font-medium w-fit">
                                {skillGroup.period}
                              </Badge>
                            </div>
                            <CardDescription>{skillGroup.description}</CardDescription>
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
                              transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="my_primary">{skill}</Badge>
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
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-border/30 hover:border-border transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <CardTitle className="text-base">{skillGroup.category}</CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          {skillGroup.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-sm rounded-full bg-muted/50 text-foreground hover:bg-muted transition-colors cursor-default"
                            >
                              {skill}
                            </span>
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
