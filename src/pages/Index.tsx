import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { ReceiptCard, AIEvent } from "@/components/receipts/ReceiptCard";
import { StreakCounter } from "@/components/stats/StreakCounter";
import { LiveStats } from "@/components/stats/LiveStats";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data generator for demonstration
const generateMockEvent = (): AIEvent => {
  const providers = ['OpenAI', 'Anthropic', 'Google', 'Azure'];
  const models = ['gpt-4', 'claude-3', 'gemini-pro', 'gpt-3.5-turbo'];
  const regions = ['us-west-2', 'eu-central-1', 'ap-southeast-1'];
  const gpuTypes = ['A100', 'V100', 'H100', 'RTX4090'];
  
  const provider = providers[Math.floor(Math.random() * providers.length)];
  const runtime = Math.random() * 30 + 1; // 1-31 seconds
  const tokensIn = Math.floor(Math.random() * 2000) + 100;
  const tokensOut = Math.floor(Math.random() * 1000) + 50;
  const energyKwh = runtime * 0.0005 + (tokensIn + tokensOut) * 0.000001;
  
  return {
    event_id: Math.random().toString(36).substr(2, 9),
    provider,
    model: models[Math.floor(Math.random() * models.length)],
    region_code: regions[Math.floor(Math.random() * regions.length)],
    start_ts: new Date(Date.now() - Math.random() * 3600000),
    runtime_s: runtime,
    tokens_in: tokensIn,
    tokens_out: tokensOut,
    gpu_type: gpuTypes[Math.floor(Math.random() * gpuTypes.length)],
    gpu_count: Math.floor(Math.random() * 4) + 1,
    energy_kwh: energyKwh,
    co2e_g: energyKwh * (300 + Math.random() * 200), // 300-500 g CO2e per kWh
    created_at: new Date(),
  };
};

const Index = () => {
  const [events, setEvents] = useState<AIEvent[]>([]);
  const [newEventId, setNewEventId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);
  const { toast } = useToast();

  // Initialize with mock data
  useEffect(() => {
    const initialEvents = Array.from({ length: 5 }, generateMockEvent)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    setEvents(initialEvents);
  }, []);

  // Simulate real-time events
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newEvent = generateMockEvent();
      setEvents(prev => [newEvent, ...prev.slice(0, 99)]);
      setNewEventId(newEvent.event_id);
      
      toast({
        title: "New AI Event",
        description: `${newEvent.provider} - ${(newEvent.co2e_g).toFixed(1)}g CO₂e`,
        duration: 3000,
      });

      // Clear the new event highlight after animation
      setTimeout(() => setNewEventId(null), 2000);
    }, 8000 + Math.random() * 7000); // Random interval 8-15 seconds

    return () => clearInterval(interval);
  }, [isLive, toast]);

  const totalCO2 = events.reduce((sum, event) => sum + event.co2e_g, 0);
  const avgEfficiency = events.length > 0 
    ? (events.reduce((sum, event) => sum + (1000 / event.co2e_g), 0) / events.length) * 100
    : 0;

  return (
    <div className="min-h-screen pb-8">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl text-foreground">All Aisles/</h1>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mb-12">
            <button className="px-6 py-3 bg-olive-green text-white rounded-full font-sans text-sm font-medium">
              Default
            </button>
            <button className="px-6 py-3 bg-secondary text-foreground rounded-full font-sans text-sm font-medium border border-border/30 hover:bg-accent transition-colors">
              A-Z
            </button>
            <button className="px-6 py-3 bg-secondary text-foreground rounded-full font-sans text-sm font-medium border border-border/30 hover:bg-accent transition-colors">
              $ → $$
            </button>
            <Button
              variant={isLive ? "secondary" : "default"}
              onClick={() => setIsLive(!isLive)}
              className="gap-2 ml-auto"
            >
              <RefreshCw size={16} className={isLive ? "animate-spin" : ""} />
              {isLive ? "Live" : "Paused"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <StreakCounter currentStreak={12} longestStreak={25} />
            <LiveStats 
              totalEvents={events.length}
              totalCO2={totalCO2}
              avgEfficiency={avgEfficiency}
              weeklyChange={Math.random() * 20 - 10}
              isLive={isLive}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              Recent Events
              {isLive && (
                <div className="w-2 h-2 bg-carbon-success rounded-full animate-pulse-carbon" />
              )}
            </h2>
            
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events yet. Connect your AI providers to start tracking.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <ReceiptCard
                    key={event.event_id}
                    event={event}
                    isNew={event.event_id === newEventId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
