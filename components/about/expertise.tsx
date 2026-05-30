import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { expertises } from "@/constants/about";

export const Expertise = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {expertises.map((expertise, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          className="h-full"
        >
          <Card className="border-border/30 bg-card/25 rounded-2xl h-full glass-card hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5 flex flex-col items-center text-center space-y-3.5 h-full">
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
                <expertise.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                  {expertise.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {expertise.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
