import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { expertises } from "@/constants/about";

export const Expertise = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">My Expertise</h3>
      {expertises.map((expertise, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 hover:border-border transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <expertise.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{expertise.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {expertise.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
