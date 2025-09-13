import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Globe, Clock, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIEvent {
  event_id: string;
  provider: string;
  model: string;
  region_code: string;
  start_ts: Date;
  runtime_s: number;
  tokens_in: number;
  tokens_out: number;
  gpu_type: string;
  gpu_count: number;
  energy_kwh: number;
  co2e_g: number;
  created_at: Date;
}

interface ReceiptCardProps {
  event: AIEvent;
  className?: string;
  isNew?: boolean;
}

const formatCO2Equivalent = (co2e_g: number) => {
  if (co2e_g < 1000) {
    return `${co2e_g.toFixed(1)}g CO₂e`;
  }
  return `${(co2e_g / 1000).toFixed(2)}kg CO₂e`;
};

const getProviderColor = (provider: string) => {
  const colors = {
    openai: "bg-carbon-emerald",
    anthropic: "bg-carbon-warning",
    google: "bg-carbon-success",
    azure: "bg-carbon-green",
  };
  return colors[provider.toLowerCase() as keyof typeof colors] || "bg-carbon-earth";
};

const getEquivalent = (co2e_g: number) => {
  const equivalents = [
    { threshold: 50, text: "charging a phone" },
    { threshold: 200, text: "boiling 2 cups water" },
    { threshold: 500, text: "driving 1 mile" },
    { threshold: 1000, text: "30 min TV watching" },
    { threshold: 5000, text: "1 hour laptop use" },
  ];
  
  const equivalent = equivalents.find(eq => co2e_g <= eq.threshold);
  return equivalent?.text || "significant energy use";
};

export const ReceiptCard = ({ event, className, isNew = false }: ReceiptCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-gradient-receipt border-carbon-mint shadow-receipt transition-all duration-500",
        "hover:shadow-carbon hover:scale-[1.02]",
        isNew && "animate-slide-up border-carbon-green shadow-glow",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn("w-3 h-3 rounded-full", getProviderColor(event.provider))} />
            <div>
              <div className="font-semibold text-foreground">{event.model}</div>
              <div className="text-sm text-muted-foreground">{event.provider}</div>
            </div>
          </div>
          <Badge variant="outline" className="border-carbon-green text-carbon-green">
            {formatCO2Equivalent(event.co2e_g)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Cpu size={16} className="text-carbon-green" />
            <span className="text-muted-foreground">
              {event.gpu_count}x {event.gpu_type}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-carbon-green" />
            <span className="text-muted-foreground">{event.runtime_s.toFixed(1)}s</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins size={16} className="text-carbon-green" />
            <span className="text-muted-foreground">
              {(event.tokens_in + event.tokens_out).toLocaleString()} tokens
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe size={16} className="text-carbon-green" />
            <span className="text-muted-foreground">{event.region_code}</span>
          </div>
        </div>
        
        <div className="bg-carbon-mint rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap size={16} className="text-carbon-green" />
              <span className="font-medium text-carbon-green">Energy Impact</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {event.energy_kwh.toFixed(4)} kWh
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Equivalent to <span className="font-medium text-foreground">{getEquivalent(event.co2e_g)}</span>
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground text-right">
          {event.created_at.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};