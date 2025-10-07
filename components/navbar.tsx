"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", latest => {
    if (latest < 100) {
      setActive("hero");
      return;
    }
    navItems.forEach(item => {
      const section = document.getElementById(item.href);
      if (section) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= 150 && bottom >= 150) {
          setActive(item.href);
        }
      }
    });
  });

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border/30 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.button
          onClick={() => handleScroll("hero")}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <Image
            src="/400X400.svg"
            alt="Harsh Vansjaliya Logo"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
            width={40}
            height={40}
          />
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className={`relative text-sm font-medium transition-colors ${
                active === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded-full"
                />
              )}
            </button>
          ))}
          {/* <ThemeToggle /> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-expanded={open}
          className="md:hidden text-foreground hover:text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/30 px-6 py-4 space-y-3"
        >
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className={`w-full text-left text-sm font-medium transition-colors ${
                active === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* <ThemeToggle /> */}
        </motion.div>
      )}
    </nav>
  );
};
