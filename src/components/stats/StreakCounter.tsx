import { Card, CardContent } from "@/components/ui/card";
import { Flame, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
  isActive?: boolean;
}

export const StreakCounter = ({ 
  currentStreak, 
  longestStreak, 
  className,
  isActive = false 
}: StreakCounterProps) => {
  return (
    <div className={cn("bg-card rounded-xl border border-border/30 p-6 col-span-2", className)}>
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-olive-green rounded-full" />
        <h3 className="font-sans font-medium text-foreground">Carbon Tracking</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-3xl font-serif font-normal text-olive-green mb-1">{currentStreak}</div>
          <div className="font-sans text-sm text-warm-gray">Current streak</div>
          <div className="font-sans text-xs text-sage">days tracking</div>
        </div>
        
        <div>
          <div className="text-2xl font-serif font-normal text-foreground mb-1">{longestStreak}</div>
          <div className="font-sans text-sm text-warm-gray">Best streak</div>
          <div className="font-sans text-xs text-sage">personal record</div>
        </div>
      </div>
    </div>
  );
};