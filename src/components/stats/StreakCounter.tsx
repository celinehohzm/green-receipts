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
    <Card className={cn("bg-gradient-receipt border-carbon-mint", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isActive ? "bg-gradient-carbon animate-pulse-carbon" : "bg-carbon-mint"
            )}>
              <Flame 
                size={20} 
                className={cn(
                  isActive ? "text-primary-foreground" : "text-carbon-green"
                )} 
              />
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">
                {currentStreak} day{currentStreak !== 1 ? 's' : ''}
              </div>
              <div className="text-sm text-muted-foreground">Current streak</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-carbon-green">
              <TrendingUp size={16} />
              <span className="font-semibold">{longestStreak}</span>
            </div>
            <div className="text-xs text-muted-foreground">Best streak</div>
          </div>
        </div>
        
        {currentStreak >= 7 && (
          <div className="mt-3 p-2 bg-carbon-success/10 border border-carbon-success/20 rounded-lg">
            <p className="text-sm text-carbon-success font-medium">
              🌱 You're building sustainable AI habits!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};