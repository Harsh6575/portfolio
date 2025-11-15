import { Card, CardContent } from "@/components/ui/card";
import { TOTAL_EXPERIENCE } from "@/constants";

export const QuickStats = () => {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4 text-center">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{TOTAL_EXPERIENCE}+</div>
            <div className="text-xs text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">10+</div>
            <div className="text-xs text-muted-foreground">Technologies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">6+</div>
            <div className="text-xs text-muted-foreground">Projects Built</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-xs text-muted-foreground">Learning Mode</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
