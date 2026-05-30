"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";

const navItems = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", latest => {
    setIsScrolled(latest > 20);

    if (latest < 100) {
      setActive("hero");
      return;
    }
    navItems.forEach(item => {
      const section = document.getElementById(item.href);
      if (section) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= 180 && bottom >= 180) {
          setActive(item.href);
        }
      }
    });
  });

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height offset of floating nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 py-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-5xl pointer-events-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border border-border/40 shadow-lg px-6 py-2"
            : "bg-transparent border border-transparent px-6 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleScroll("hero")}
            className="flex items-center group relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative overflow-hidden w-8 h-8 md:w-9 md:h-9 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
              <Image
                src="/400X400.svg"
                alt="Harsh Vansjaliya Logo"
                className="w-full h-full object-cover dark:invert"
                width={36}
                height={36}
              />
            </div>
            <span className="ml-2.5 font-bold text-sm tracking-wide hidden sm:block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              HV
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/10">
            {navItems.map(item => (
              <button
                aria-label={item.label}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  active === item.href
                    ? "text-primary-foreground dark:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {active === item.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary rounded-full border border-primary-foreground/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-expanded={open}
            className="md:hidden p-2 rounded-full border border-border/30 hover:bg-muted text-foreground transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-controls="mobile-nav"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="md:hidden absolute left-4 right-4 mt-3 bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl p-4 shadow-xl space-y-2 flex flex-col pointer-events-auto"
            aria-label="Mobile navigation"
          >
            {navItems.map(item => (
              <button
                aria-label={item.label}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  active === item.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </motion.div>
    </header>
  );
};
