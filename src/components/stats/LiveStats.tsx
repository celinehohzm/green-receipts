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
    <div className="bg-card rounded-xl border border-border/30 p-6 col-span-2">
      <h3 className="font-sans font-medium text-foreground mb-6">Live Statistics</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-warm-gray">Events tracked</span>
          <span className="font-sans font-medium text-foreground">{totalEvents}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-warm-gray">Carbon footprint</span>
          <span className="font-sans font-medium text-olive-green">{formatCO2(totalCO2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-warm-gray">Efficiency score</span>
          <span className="font-sans font-medium text-foreground">{avgEfficiency.toFixed(1)}%</span>
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <div className="font-sans text-xs text-sage">
            {isLive ? "Updated in real-time" : "Paused"}
          </div>
        </div>
      </div>
    </div>
  );
};