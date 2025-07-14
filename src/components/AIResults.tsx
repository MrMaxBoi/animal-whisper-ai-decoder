import { useState } from "react";
import { Brain, Bird, Volume2, Target, Loader, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface AIResult {
  species: string;
  interpretation: string;
  confidence: number;
  clusterGroup: string;
  additionalInfo?: string;
}

interface AIResultsProps {
  file: File | null;
}

export function AIResults({ file }: AIResultsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const { toast } = useToast();

  // Mock AI analysis - In real implementation, this would call your ML model
  const analyzeAudio = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock results based on file name or random selection
      const mockResults: AIResult[] = [
        {
          species: "Bird (Yellow Warbler)",
          interpretation: "Likely a mating call",
          confidence: 88,
          clusterGroup: "Group A - High pitch, 6 pulses, early morning",
          additionalInfo: "Typical territorial song pattern detected"
        },
        {
          species: "Wolf (Canis lupus)",
          interpretation: "Pack communication howl",
          confidence: 92,
          clusterGroup: "Group B - Long, low frequency, evening",
          additionalInfo: "Social bonding behavior observed"
        },
        {
          species: "Dolphin (Bottlenose)",
          interpretation: "Echolocation clicks",
          confidence: 95,
          clusterGroup: "Group C - Rapid clicks, hunting behavior",
          additionalInfo: "Foraging signature pattern"
        },
        {
          species: "Cat (Domestic)",
          interpretation: "Attention-seeking vocalization",
          confidence: 76,
          clusterGroup: "Group D - Variable pitch, human-directed",
          additionalInfo: "Food request behavior likely"
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);

      toast({
        title: "Analysis complete!",
        description: `Identified as ${randomResult.species} with ${randomResult.confidence}% confidence.`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your audio file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!file) {
    return (
      <Card className="p-8 text-center shadow-soft opacity-50">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Brain className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">AI Analysis</h3>
            <p className="text-muted-foreground">
              Upload an audio file to get AI-powered insights about animal sounds
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-nature">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Analysis
          </h3>
          <Button
            variant="forest"
            onClick={analyzeAudio}
            disabled={isAnalyzing}
            className="min-w-32"
          >
            {isAnalyzing ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze Sound
              </>
            )}
          </Button>
        </div>

        {isAnalyzing && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Analyzing audio patterns...</p>
              <Progress value={66} className="w-full" />
            </div>
            <div className="bg-gradient-dawn rounded-lg p-4 text-center">
              <p className="text-sm text-foreground/80">
                🧠 Processing sound frequencies and patterns<br/>
                🔍 Matching against animal vocalization database<br/>
                📊 Calculating confidence scores
              </p>
            </div>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Main Results */}
            <div className="bg-gradient-sky rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bird className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-xl font-semibold text-foreground">
                    {result.species}
                  </h4>
                  <p className="text-foreground/80 text-lg">
                    {result.interpretation}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Confidence Score
                </span>
                <span className="text-sm font-bold text-primary">
                  {result.confidence}%
                </span>
              </div>
              <Progress value={result.confidence} className="w-full h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Sound Pattern
                </h5>
                <Badge variant="outline" className="text-sm">
                  {result.clusterGroup}
                </Badge>
              </div>

              {result.additionalInfo && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-foreground mb-2">
                    Additional Insights
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {result.additionalInfo}
                  </p>
                </div>
              )}
            </div>

            {/* API Integration Note */}
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                💡 This is a demo result. In production, connect to your ML model API 
                (Google Colab, HuggingFace, or custom endpoint)
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}