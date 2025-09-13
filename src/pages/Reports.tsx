import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Calendar, BarChart3, Target } from "lucide-react";

const Reports = () => {
  const weeklyData = [
    { week: "This Week", co2: 245, events: 18, efficiency: 92 },
    { week: "Last Week", co2: 312, events: 23, efficiency: 88 },
    { week: "2 Weeks Ago", co2: 289, events: 21, efficiency: 85 },
    { week: "3 Weeks Ago", co2: 356, events: 28, efficiency: 82 },
  ];

  const goals = [
    { metric: "Weekly CO₂", target: 200, current: 245, unit: "g" },
    { metric: "Efficiency", target: 95, current: 92, unit: "%" },
    { metric: "Events", target: 15, current: 18, unit: "" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-carbon bg-clip-text text-transparent mb-2">
            Weekly Reports
          </h1>
          <p className="text-muted-foreground">
            Track your AI carbon footprint trends and sustainability goals
          </p>
        </div>

        <div className="grid gap-6">
          {/* Goals Section */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} className="text-carbon-green" />
                Sustainability Goals
              </CardTitle>
              <CardDescription>
                Your progress towards weekly carbon reduction targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {goals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  const isOnTrack = progress <= 100;
                  
                  return (
                    <div key={goal.metric} className="p-4 bg-carbon-mint rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{goal.metric}</span>
                        <Badge 
                          variant={isOnTrack ? "default" : "destructive"}
                          className={isOnTrack ? "bg-carbon-success" : ""}
                        >
                          {isOnTrack ? "On Track" : "Over Target"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{goal.current}{goal.unit}</span>
                          <span className="text-muted-foreground">/ {goal.target}{goal.unit}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              isOnTrack ? "bg-carbon-success" : "bg-destructive"
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trends */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={20} className="text-carbon-green" />
                Weekly Trends
              </CardTitle>
              <CardDescription>
                Track your carbon footprint over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((week, index) => (
                  <div 
                    key={week.week} 
                    className="flex items-center justify-between p-4 bg-carbon-mint rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Calendar size={16} className="text-carbon-green" />
                      <div>
                        <div className="font-medium">{week.week}</div>
                        <div className="text-sm text-muted-foreground">
                          {week.events} events
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-bold">{week.co2}g CO₂e</div>
                        <div className="text-sm text-muted-foreground">carbon</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-carbon-success">{week.efficiency}%</div>
                        <div className="text-sm text-muted-foreground">efficiency</div>
                      </div>
                      {index > 0 && (
                        <div className="flex items-center space-x-1">
                          <TrendingDown size={16} className="text-carbon-success" />
                          <span className="text-sm font-medium text-carbon-success">
                            -{Math.round(((weeklyData[index - 1].co2 - week.co2) / weeklyData[index - 1].co2) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="bg-carbon-success/10 border-carbon-success/20">
            <CardHeader>
              <CardTitle className="text-carbon-success">🌱 Sustainability Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Great progress!</strong> You've reduced your weekly carbon footprint by 21% 
                  compared to last month's average.
                </p>
                <p>
                  <strong>Tip:</strong> Using shorter prompts and batch processing can reduce runtime 
                  and further lower your carbon impact.
                </p>
                <p>
                  <strong>Goal insight:</strong> You're close to your weekly target. Consider using 
                  more efficient models for simple tasks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;