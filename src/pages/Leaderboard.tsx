import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Leaf } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alex Chen", efficiency: 96.5, co2Saved: 1240, streak: 42, avatar: "AC" },
  { rank: 2, name: "Sarah Kim", efficiency: 94.2, co2Saved: 1180, streak: 38, avatar: "SK" },
  { rank: 3, name: "Mike Rodriguez", efficiency: 92.8, co2Saved: 1065, streak: 35, avatar: "MR" },
  { rank: 4, name: "You", efficiency: 92.0, co2Saved: 985, streak: 12, avatar: "YO", isCurrentUser: true },
  { rank: 5, name: "Emma Wilson", efficiency: 91.5, co2Saved: 945, streak: 28, avatar: "EW" },
  { rank: 6, name: "David Park", efficiency: 90.2, co2Saved: 890, streak: 22, avatar: "DP" },
  { rank: 7, name: "Lisa Johnson", efficiency: 89.8, co2Saved: 856, streak: 19, avatar: "LJ" },
  { rank: 8, name: "James Liu", efficiency: 88.9, co2Saved: 798, streak: 15, avatar: "JL" },
];

const achievements = [
  { icon: Leaf, title: "Eco Warrior", description: "30+ day streak", unlocked: true },
  { icon: TrendingUp, title: "Efficiency Expert", description: "95%+ efficiency", unlocked: false },
  { icon: Trophy, title: "Carbon Saver", description: "1kg CO₂ saved", unlocked: true },
  { icon: Medal, title: "Top 10", description: "Rank in top 10", unlocked: true },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Trophy className="text-yellow-500" size={20} />;
    case 2: return <Medal className="text-gray-400" size={20} />;
    case 3: return <Award className="text-orange-500" size={20} />;
    default: return <span className="font-bold text-muted-foreground">#{rank}</span>;
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-carbon bg-clip-text text-transparent mb-2">
            Sustainability Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Compete with others to build the most sustainable AI practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-receipt border-carbon-mint">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={20} className="text-carbon-green" />
                  Weekly Rankings
                </CardTitle>
                <CardDescription>
                  Based on efficiency score and carbon savings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        user.isCurrentUser 
                          ? "bg-gradient-carbon text-primary-foreground shadow-carbon" 
                          : "bg-carbon-mint hover:bg-carbon-mint/80"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 flex justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={user.isCurrentUser ? "bg-primary-foreground text-primary" : ""}>
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className={`text-sm ${user.isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {user.streak} day streak
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">{user.efficiency}%</div>
                        <div className={`text-sm ${user.isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {user.co2Saved}g saved
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="bg-gradient-receipt border-carbon-mint">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} className="text-carbon-green" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Unlock badges for sustainable AI practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.title}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.unlocked ? "bg-carbon-success/10 border border-carbon-success/20" : "bg-muted/50"
                      }`}
                    >
                      <achievement.icon 
                        size={20} 
                        className={achievement.unlocked ? "text-carbon-success" : "text-muted-foreground"} 
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                          {achievement.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-carbon-success">
                          ✓
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card className="bg-carbon-mint/20 border-carbon-mint">
              <CardHeader>
                <CardTitle className="text-carbon-green">Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Current Rank</span>
                    <span className="font-bold">#4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency Score</span>
                    <span className="font-bold text-carbon-success">92.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon Saved</span>
                    <span className="font-bold">985g CO₂e</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak</span>
                    <span className="font-bold">12 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;