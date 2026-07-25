"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export const AnimatedCard = ({ children, index = 0 }: { children: ReactNode; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};
