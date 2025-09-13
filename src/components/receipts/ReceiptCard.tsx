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

const formatCO2Equivalent = (co2e_g: number): string => {
  if (co2e_g < 1000) {
    return `${co2e_g.toFixed(1)}g`;
  }
  return `${(co2e_g / 1000).toFixed(2)}kg`;
};

const getProviderColor = (provider: string): string => {
  const colors: Record<string, string> = {
    'OpenAI': 'bg-emerald-500',
    'Anthropic': 'bg-orange-500',
    'Google': 'bg-blue-500',
    'Azure': 'bg-indigo-500',
  };
  return colors[provider] || 'bg-gray-500';
};

const getEquivalent = (co2e_g: number): string => {
  if (co2e_g < 5) return "charging a phone";
  if (co2e_g < 20) return "boiling 1 cup of water";
  if (co2e_g < 50) return "watching TV for 30 min";
  if (co2e_g < 100) return "driving 200m";
  if (co2e_g < 500) return "charging a laptop";
  return "driving 1km";
};

export const ReceiptCard = ({ event, className, isNew = false }: ReceiptCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border/30 hover:border-border/60 transition-all duration-200 shadow-light hover:shadow-card",
      isNew && "animate-slide-up",
      className
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-card rounded-lg flex items-center justify-center">
              <div className={cn("w-2 h-2 rounded-full", getProviderColor(event.provider))} />
            </div>
            <div>
              <h3 className="font-sans font-medium text-base text-foreground">{event.provider}</h3>
              <p className="font-sans text-sm text-warm-gray">{formatCO2Equivalent(event.co2e_g)}</p>
              <p className="font-sans text-sm text-sage">{event.model} →</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-12 h-12 bg-olive-green rounded-full flex items-center justify-center hover:bg-olive-light transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-sans text-warm-gray">Energy:</span>
            <span className="font-sans font-medium text-foreground">{event.energy_kwh.toFixed(3)} kWh</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-sans text-warm-gray">Runtime:</span>
            <span className="font-sans font-medium text-foreground">{event.runtime_s.toFixed(1)}s</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-sans text-warm-gray">Tokens:</span>
            <span className="font-sans font-medium text-foreground">{(event.tokens_in + event.tokens_out).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-sans text-warm-gray">Equivalent:</span>
            <span className="font-sans text-xs text-sage">{getEquivalent(event.co2e_g)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};