import { Card, CardContent } from "@/components/ui/card";
import { QUICK_STATS } from "@/constants";
import { motion } from "motion/react";

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {QUICK_STATS.map((stat: { label: string; value: string }, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
        >
          <Card className="border-border/30 bg-card/25 rounded-2xl overflow-hidden glass-card shadow-xs hover:border-primary/20">
            <CardContent className="p-4 text-center space-y-1">
              <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
