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

const projectsData: {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: "In Progress" | "Completed" | "Professional Project" | "Freelance";
  date: string;
  features: string[];
  links?: {
    type?: "github" | "live";
    label?: string;
    url?: string;
  }[];
}[] = [
  {
    title: "Shortify - URL Shortener",
    description:
      "A high-performance URL shortening service built to explore system design principles and scalable backend architecture. Features hash-based ID generation, multi-database integration (PostgreSQL + Redis + MongoDB), and optimized caching strategies for sub-millisecond redirects.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "SQLAlchemy",
      "Docker",
      "asyncpg",
    ],
    category: "Backend",
    status: "In Progress",
    date: "Nov 2025",
    features: [
      "Hash-based short ID generation using SHA-256 + Base62 encoding",
      "Three-tier caching architecture with Redis (7-day TTL)",
      "Async database operations with SQLAlchemy and asyncpg",
      "RESTful API with automatic documentation (Swagger/OpenAPI)",
      "Deterministic URL shortening with collision detection",
      "Real-time cache invalidation and TTL management",
      "Multi-database architecture exploring different use cases",
      "Horizontal scalability with stateless API design",
    ],
    links: [
      {
        type: "github",
        label: "View Source",
        url: `${GITHUB_URL}/shortify`,
      },
    ],
  },
  {
    title: "Tailor Management System",
    description:
      "A full-stack tailor shop management system with separate frontend and backend. Built to manage customer orders, measurements, billing, and inventory with a modern tech stack implementing RESTful APIs and responsive UI design.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "TypeScript",
      "Tailwind CSS",
      "JWT",
      "Docker",
      "Vitest",
      "Drizzle ORM",
    ],
    category: "Full Stack",
    status: "In Progress",
    date: "Oct - Nov 2025",
    features: [
      "Customer order & measurement tracking",
      "Real-time inventory management",
      "Billing & invoice generation",
      "RESTful API architecture",
      "JWT authentication & role-based access",
      "Responsive modern UI design",
    ],
    links: [
      {
        type: "github",
        label: "Backend Code",
        url: GITHUB_URL + "/tailor-track-backend",
      },
      {
        type: "github",
        label: "Frontend Code",
        url: GITHUB_URL + "/tailor-track-frontend",
      },
    ],
  },
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
    links: [
      {
        type: "github",
        label: "Code",
        url: GITHUB_URL + "/patient-management-spring-boot",
      },
    ],
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
    links: [],
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
    links: [
      {
        type: "github",
        label: "Code",
        url: GITHUB_URL + "/airbnb-clone",
      },
    ],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          title="Featured Projects"
          subtitle="Highlights of the projects I’ve built, from full-stack apps to trading systems"
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
                        variant={
                          project.status === "In Progress"
                            ? "outline"
                            : project.status === "Completed"
                              ? "default"
                              : "my_primary"
                        }
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
                    {project.links && (
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link, idx) => (
                          <Button
                            key={idx}
                            variant={link.type === "github" ? "outline" : "default"}
                            size="sm"
                            asChild
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {link.type === "github" ? (
                                <>
                                  <FaGithub className="w-4 h-4" />
                                  {link.label || "Code"}
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="w-4 h-4" />
                                  {link.label || "Demo"}
                                </>
                              )}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
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
