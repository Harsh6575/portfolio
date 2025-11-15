"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Download, Target } from "lucide-react";
import Image from "next/image";
import { TOTAL_EXPERIENCE } from "@/constants";
import { Values } from "./about/values";
import { Expertise } from "./about/expertise";
import { QuickStats } from "./about/quick-stats";

export const About = () => {
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
              <p className="text-lg text-foreground/90 leading-relaxed">
                I&apos;m a <span className="text-primary font-semibold">Software Developer</span>{" "}
                with {TOTAL_EXPERIENCE}+ years of experience, currently transitioning into{" "}
                <span className="text-primary font-semibold">backend specialization</span>. My
                journey began in frontend development, but I&apos;ve discovered my passion lies in{" "}
                <span className="text-primary font-semibold">
                  designing and building scalable, robust backend systems
                </span>
                that power seamless user experiences.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                At{" "}
                <span className="text-foreground font-semibold">AlgoAcharya (fintech startup)</span>
                , I contributed to algorithmic trading platforms, working across the stack, from
                crafting responsive dashboards to optimizing APIs and database queries for
                performance. This hands-on work gave me a solid understanding of how frontend and
                backend connect in real-world systems.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Recently, I&apos;ve been expanding my skills into{" "}
                <span className="text-foreground font-medium">
                  backend engineering with Node.js, Python (FastAPI/Django), and Docker
                </span>
                , alongside deep dives into{" "}
                <span className="text-foreground font-medium">
                  system design, databases (PostgreSQL, Redis, MongoDB), and distributed systems
                </span>
                . I&apos;m also actively building{" "}
                <span className="text-foreground font-medium">algorithmic trading systems</span>{" "}
                with Python, pandas, and risk management strategies, combining my tech skills with
                my passion for financial systems.
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
                  <p>• Building production-ready APIs with Node.js and Python</p>
                  <p>• Digging into system design and scalable backend architecture</p>
                  <p>• Working with PostgreSQL, Redis, and MongoDB in real projects</p>
                  <p>• Creating algorithmic trading strategies using Python + pandas</p>
                  <p>• Learning microservices concepts and distributed systems</p>
                  <p>• Deploying containerized apps with Dockerx</p>
                </div>
              </CardContent>
            </Card>

            {/* Values */}
            <Values />

            {/* CTA */}
            <div className="pt-4">
              <Button className="group" size="lg" asChild>
                <a
                  href="https://raw.githubusercontent.com/Harsh6575/portfolio-data/main/assets/Harsh_Vansjaliya_Resume.pdf"
                  download="Harsh_Vansjaliya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </a>
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
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
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
            <Expertise />

            {/* Quick Stats */}
            <QuickStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
