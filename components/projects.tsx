"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projectsData } from "@/constants/projects";

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
