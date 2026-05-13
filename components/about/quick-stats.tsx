import { Card, CardContent } from "@/components/ui/card";
import { QUICK_STATS } from "@/constants";
import { motion } from "motion/react";

export const QuickStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4 text-center">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            {QUICK_STATS.map((stat: { label: string; value: string }, index: number) => (
              <div key={index}>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
