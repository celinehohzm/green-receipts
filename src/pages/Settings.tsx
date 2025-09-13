import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Globe, Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-carbon bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and carbon tracking settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-carbon-green" />
                Profile
              </CardTitle>
              <CardDescription>
                Manage your personal information and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" defaultValue="Alex Chen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="alex@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Default Region</Label>
                <Select defaultValue="us-west-2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-west-2">US West 2 (Oregon)</SelectItem>
                    <SelectItem value="us-east-1">US East 1 (Virginia)</SelectItem>
                    <SelectItem value="eu-central-1">EU Central 1 (Frankfurt)</SelectItem>
                    <SelectItem value="ap-southeast-1">AP Southeast 1 (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gradient-carbon">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} className="text-carbon-green" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure when and how you receive carbon footprint updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Real-time Events</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when new AI events are tracked
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Receive weekly carbon footprint summaries
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Goal Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get reminded about your sustainability goals
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Achievement Unlocks</div>
                  <div className="text-sm text-muted-foreground">
                    Celebrate when you unlock new badges
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Carbon Tracking */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} className="text-carbon-green" />
                Carbon Tracking
              </CardTitle>
              <CardDescription>
                Customize how carbon footprint is calculated and displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Intensity Data Preference</Label>
                <Select defaultValue="marginal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marginal">Marginal (real-time grid impact)</SelectItem>
                    <SelectItem value="average">Average (annual grid mix)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Marginal intensity reflects the actual impact of increased energy demand
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Include Embodied Carbon</div>
                  <div className="text-sm text-muted-foreground">
                    Account for manufacturing carbon cost of hardware
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Real-time Intensity Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Use live grid intensity data when available
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gradient-receipt border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} className="text-carbon-green" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data sharing and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Anonymous Leaderboard</div>
                  <div className="text-sm text-muted-foreground">
                    Participate in leaderboard without showing your name
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Export</div>
                  <div className="text-sm text-muted-foreground">
                    Export your carbon tracking data
                  </div>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Account Deletion</div>
                  <div className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </div>
                </div>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-carbon-mint/20 border-carbon-mint">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database size={20} className="text-carbon-green" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Events Tracked:</span>
                    <Badge variant="outline">1,247</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Account Created:</span>
                    <span className="text-muted-foreground">2 months ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Retention:</span>
                    <span className="text-muted-foreground">1 year</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Storage Used:</span>
                    <Badge variant="outline">2.4 MB</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup:</span>
                    <span className="text-muted-foreground">Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Calls This Month:</span>
                    <Badge variant="outline">847</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;