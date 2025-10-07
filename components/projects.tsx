"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { GITHUB_URL } from "@/constants";

const projectsData = [
  {
    title: "Patient Management System",
    description:
      "A distributed healthcare management system built with Spring Boot microservices architecture. Designed to learn and implement enterprise-level backend patterns including API Gateway, service mesh communication, and event-driven architecture.",
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "gRPC",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "JWT",
    ],
    category: "Backend",
    status: "Completed",
    date: "2025",
    features: [
      "5-service microservices architecture",
      "API Gateway with request routing & auth",
      "gRPC inter-service communication",
      "Kafka event streaming for analytics",
      "JWT authentication & authorization",
      "Docker containerized deployment",
    ],
    links: {
      github: GITHUB_URL + "/patient-management-spring-boot",
    },
  },
  {
    title: "Algorithmic Trading Platform",
    description:
      "A sophisticated trading platform for the Indian stock market with automated strategies, real-time data analysis, and portfolio management capabilities.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "pandas",
      "NumPy",
      "yfinance",
      "Next.js",
      "GraphQL",
    ],
    category: "FinTech",
    status: "Professional Project",
    date: "2023-2025",
    features: [
      "Real-time market data integration",
      "Automated trading algorithm execution",
      "Comprehensive backtesting system",
      "Portfolio performance analytics",
      "Risk management tools",
      "Custom algorithm development interface",
    ],
    links: {},
  },
  {
    title: "Library Management System",
    description:
      "A desktop application built with JavaFX for efficient library operations, featuring book management, user authentication, and borrowing system.",
    technologies: ["Java", "JavaFX", "SQLite", "FXML", "CSS"],
    category: "Desktop",
    status: "Completed",
    date: "2023",
    features: [
      "Complete book catalog management",
      "Member registration and management",
      "Borrowing and return system",
      "Fine calculation and management",
      "Search and filtering capabilities",
      "Report generation",
    ],
    links: {
      github: GITHUB_URL + "/LibraryManagementSystemJava",
    },
  },
  {
    title: "Hotel Reservation Platform",
    description:
      "A full-stack hotel booking application inspired by Airbnb, built with modern web technologies. Features complete user authentication, property listings, booking system, and payment integration.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "NextAuth.js",
      "React-Leaflet",
      "Cloudinary",
    ],
    category: "Full-Stack",
    status: "Completed",
    date: "2022",
    features: [
      "User authentication and authorization system",
      "Property listing with image galleries",
      "Advanced search and filtering options",
      "Interactive maps integration",
      "Booking system with date selection",
      "Responsive design across all devices",
    ],
    links: {
      github: GITHUB_URL + "/airbnb-clone",
      live: "https://hotel-reservation-harsh6575.vercel.app/",
    },
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of my development work - from full-stack web applications to trading platforms"
        />

        {/* Projects List */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col h-full border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden rounded-2xl">
                {/* Content */}
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <CardDescription className="mt-2 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6 space-y-6 flex-1 flex flex-col justify-between">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Star className="w-3 h-3 text-primary flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech + Links */}
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
                          <Badge key={idx} variant={"my_primary"}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {project.links.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FaGithub className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.live && (
                        <Button size="sm" asChild>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
