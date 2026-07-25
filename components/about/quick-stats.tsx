import { Card, CardContent } from "@/components/ui/card";
import { TOTAL_EXPERIENCE } from "@/constants";
import { skillsData } from "@/constants/skills";
import { experiences } from "@/constants/experience";
import { motion } from "motion/react";

export const QuickStats = ({ projectsCount }: { projectsCount: number }) => {
  const stats = [
    { label: "Years Experience", value: `${TOTAL_EXPERIENCE}+` },
    { label: "Skill Areas", value: `${skillsData.length}` },
    { label: "Featured Projects", value: `${projectsCount}` },
    { label: "Roles Held", value: `${experiences.length}` },
  ];

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
          <Card className="border-border bg-card rounded-2xl overflow-hidden shadow-xs hover:border-foreground/15">
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
