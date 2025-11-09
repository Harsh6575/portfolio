import { Heart, Target, Zap } from 'lucide-react'; import { motion } from "framer-motion";

const values = [
  { icon: Heart, text: "Passionate about clean, maintainable code" },
  { icon: Target, text: "Always learning and adapting to new technologies" },
  { icon: Zap, text: "Building solutions that make a real impact" },
];

export const Values = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">What Drives Me</h3>
      <div className="space-y-3">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <value.icon className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm">{value.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}