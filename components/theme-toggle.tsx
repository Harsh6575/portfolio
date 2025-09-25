'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Check system preference or localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-12 h-12 rounded-full bg-background border border-border animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: 1.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg backdrop-blur-sm bg-background/80 border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.div>
        <span className="sr-only">
          {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        </span>
      </Button>
    </motion.div>
  );
};