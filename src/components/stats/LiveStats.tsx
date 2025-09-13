import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveStatsProps {
  totalEvents: number;
  totalCO2: number;
  avgEfficiency: number;
  weeklyChange: number;
  isLive?: boolean;
}

export const LiveStats = ({ 
  totalEvents, 
  totalCO2, 
  avgEfficiency, 
  weeklyChange,
  isLive = false 
}: LiveStatsProps) => {
  const formatCO2 = (co2e_g: number) => {
    if (co2e_g < 1000) return `${co2e_g.toFixed(0)}g`;
    return `${(co2e_g / 1000).toFixed(1)}kg`;
  };

  const stats = [
    {
      title: "Total Events",
      value: totalEvents.toLocaleString(),
      icon: Activity,
      color: "text-carbon-green",
    },
    {
      title: "Carbon Footprint",
      value: formatCO2(totalCO2),
      icon: Zap,
      color: "text-carbon-warning",
    },
    {
      title: "Efficiency Score",
      value: `${avgEfficiency.toFixed(1)}%`,
      icon: weeklyChange >= 0 ? TrendingUp : TrendingDown,
      color: weeklyChange >= 0 ? "text-carbon-success" : "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="bg-gradient-receipt border-carbon-mint">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              {stat.title}
              {isLive && index === 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-carbon-success rounded-full animate-pulse-carbon" />
                  <span className="text-xs text-carbon-success">LIVE</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <stat.icon className={cn("w-5 h-5", stat.color)} />
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              {stat.title === "Efficiency Score" && (
                <span className={cn("text-sm font-medium", stat.color)}>
                  {weeklyChange >= 0 ? '+' : ''}{weeklyChange.toFixed(1)}%
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};