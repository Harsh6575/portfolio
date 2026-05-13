"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Download, Target } from "lucide-react";
import Image from "next/image";
import { TOTAL_EXPERIENCE, ABOUT_BIO, FOCAL_POINTS, RESUME_URL, APP_NAME } from "@/constants";
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
          subtitle="My journey through full-stack development and system architecture"
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
                {ABOUT_BIO.intro.replace("{TOTAL_EXPERIENCE}", TOTAL_EXPERIENCE.toString())}
              </p>

              <p className="text-muted-foreground leading-relaxed">{ABOUT_BIO.experience}</p>
            </div>

            {/* Current Focus & Education */}
            <div className="grid gap-4">
              {/* <div className="grid sm:grid-cols-2 gap-4"> */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Focus
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {FOCAL_POINTS.map((point: string, index: number) => (
                      <p key={index}>• {point}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <Values />

            {/* CTA */}
            <div className="pt-4">
              <Button className="group" size="lg" asChild>
                <a
                  href={RESUME_URL}
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
                className="w-48 h-48 bg-linear-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border border-primary/20"
              >
                <Image
                  src="/400X400.svg"
                  alt={APP_NAME}
                  className="w-32 h-32 opacity-80 dark:invert"
                  height={132}
                  width={132}
                  unoptimized={true}
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
