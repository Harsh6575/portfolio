import { motion } from "motion/react";
import { values } from "@/constants/about";

export const Values = () => {
  return (
    <div className="space-y-3 pt-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
        Core Driving Principles
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-card/50 transition-all cursor-default text-xs font-semibold shadow-xs"
          >
            <value.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{value.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
