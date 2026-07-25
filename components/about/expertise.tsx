import { Card, CardContent } from "@/components/ui/card";
import { expertises } from "@/constants/about";

export const Expertise = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {expertises.map((expertise, index) => (
        <Card
          key={index}
          className="border-border bg-card rounded-2xl h-full hover:border-foreground/20 transition-all duration-300"
        >
          <CardContent className="p-5 flex flex-col items-center text-center space-y-3.5 h-full">
            <div className="p-3 rounded-xl bg-muted text-foreground border border-border shadow-inner">
              <expertise.icon className="w-5 h-5 text-foreground" />
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
      ))}
    </div>
  );
};
