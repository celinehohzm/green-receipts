import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Activity, BarChart3, Settings, Trophy, Zap } from "lucide-react";

const navItems = [
  { path: "/", label: "Live Feed", icon: Activity },
  { path: "/connect", label: "Connect", icon: Zap },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-carbon-mint">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-foreground">Green Receipt</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-carbon-mint hover:shadow-receipt",
                    isActive
                      ? "bg-gradient-carbon text-primary-foreground shadow-carbon"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};