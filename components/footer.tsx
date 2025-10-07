"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Heart, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { GITHUB_URL, LINKED_IN_URL, MAIL_URL, OPEN_TO_NEW_OP, X_URL } from "@/constants";

export const Footer = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background Watermark */}
      <div ref={bgRef} className="absolute inset-0 flex items-center pointer-events-none">
        <motion.h1
          animate={{
            x: ["30%", "-60%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="text-[5rem] md:text-[10rem] font-extrabold uppercase tracking-widest opacity-[0.1] whitespace-nowrap select-none text-foreground"
          aria-hidden="true"
        >
          Harsh&nbsp;Vansjaliya
        </motion.h1>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            <span className="sr-only">Back to top</span>
          </motion.button>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-6 text-lg font-medium"
          >
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href={LINKED_IN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href={MAIL_URL}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={24} />
            </Link>
            <Link
              href={X_URL}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaXTwitter size={24} />
            </Link>
          </motion.div>

          {/* Built With */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>using</span>
            <span className="text-foreground font-medium">Next.js</span>
            <span>•</span>
            <span className="text-foreground font-medium">TypeScript</span>
            <span>•</span>
            <span className="text-foreground font-medium">Tailwind CSS</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground text-center"
          >
            © {new Date().getFullYear()} Harsh Vansjaliya. All rights reserved.
          </motion.p>

          {/* Status */}
          {OPEN_TO_NEW_OP && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for backend opportunities</span>
            </motion.div>
          )}
        </div>
      </div>
    </footer>
  );
};
