import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Live Feed" },
    { path: "/connect", label: "Connect" },
    { path: "/reports", label: "Reports" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-background border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          <Link 
            to="/" 
            className="font-serif text-2xl font-normal text-olive-green hover:text-olive-light transition-colors"
          >
            Carbon Receipts
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans text-sm transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground font-medium"
                    : "text-warm-gray hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ShoppingBag className="h-5 w-5 text-warm-gray" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};