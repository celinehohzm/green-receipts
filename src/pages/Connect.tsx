import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

const providers = [
  {
    name: "OpenAI",
    description: "GPT models including GPT-4, GPT-3.5",
    status: "connected",
    logo: "🤖",
    regions: ["us-west-2", "eu-central-1"],
  },
  {
    name: "Anthropic",
    description: "Claude models for advanced reasoning",
    status: "disconnected", 
    logo: "🧠",
    regions: ["us-west-2"],
  },
  {
    name: "Google Cloud AI",
    description: "Gemini and PaLM models",
    status: "disconnected",
    logo: "🔍",
    regions: ["us-central1", "europe-west4"],
  },
  {
    name: "Azure OpenAI",
    description: "OpenAI models via Microsoft Azure",
    status: "disconnected",
    logo: "☁️",
    regions: ["eastus", "westeurope"],
  },
];

const Connect = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-carbon bg-clip-text text-transparent mb-2">
            Connect AI Providers
          </h1>
          <p className="text-muted-foreground">
            Connect your AI providers to start tracking carbon footprint automatically
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {providers.map((provider) => (
            <Card key={provider.name} className="bg-gradient-receipt border-carbon-mint">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{provider.logo}</div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {provider.name}
                        {provider.status === "connected" ? (
                          <CheckCircle size={16} className="text-carbon-success" />
                        ) : (
                          <AlertCircle size={16} className="text-carbon-warning" />
                        )}
                      </CardTitle>
                      <CardDescription>{provider.description}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={provider.status === "connected" ? "default" : "secondary"}
                    className={provider.status === "connected" ? "bg-carbon-success" : ""}
                  >
                    {provider.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Available Regions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {provider.regions.map((region) => (
                      <Badge key={region} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {provider.status === "connected" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Zap size={14} className="mr-2" />
                        Configure
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button className="flex-1 bg-gradient-carbon hover:shadow-carbon">
                      <ExternalLink size={14} className="mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-carbon-mint/20 border-carbon-mint">
          <CardHeader>
            <CardTitle className="text-carbon-green">🔒 Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Encrypted Storage</h4>
                <p className="text-muted-foreground">
                  API keys are encrypted at rest and never logged or transmitted in plain text.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Minimal Permissions</h4>
                <p className="text-muted-foreground">
                  We only request read access to usage metrics, never model weights or user data.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Local Processing</h4>
                <p className="text-muted-foreground">
                  Carbon calculations happen in real-time without storing sensitive request data.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Open Source</h4>
                <p className="text-muted-foreground">
                  Full transparency - audit our carbon calculation methods and security practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Connect;