import { Card, CardContent } from "@/components/ui/card";
import { TOTAL_EXPERIENCE } from "@/constants";
import { skillsData } from "@/constants/skills";
import { projectsData } from "@/constants/projects";
import { experiences } from "@/constants/experience";
import { motion } from "motion/react";

const uniqueTechCount = new Set(skillsData.flatMap(group => group.items)).size;

const stats = [
  { label: "Years Experience", value: `${TOTAL_EXPERIENCE}+` },
  { label: "Technologies", value: `${uniqueTechCount}+` },
  { label: "Projects Built", value: `${projectsData.length}` },
  { label: "Roles Held", value: `${experiences.length}` },
];

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
        >
          <Card className="border-border bg-card rounded-2xl overflow-hidden shadow-xs hover:border-primary/20">
            <CardContent className="p-4 text-center space-y-1">
              <div className="text-xl sm:text-2xl font-black text-primary">{stat.value}</div>
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
