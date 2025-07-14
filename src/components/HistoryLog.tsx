import { useState } from "react";
import { Clock, Bird, Volume2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HistoryItem {
  id: string;
  fileName: string;
  species: string;
  interpretation: string;
  confidence: number;
  timestamp: Date;
}

export function HistoryLog() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      fileName: "morning_bird_call.wav",
      species: "Robin (American)",
      interpretation: "Dawn territory song",
      confidence: 91,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2", 
      fileName: "wolf_howl.mp3",
      species: "Wolf (Grey)",
      interpretation: "Pack communication",
      confidence: 89,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: "3",
      fileName: "cat_meow.wav", 
      species: "Cat (Domestic)",
      interpretation: "Food request",
      confidence: 76,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    }
  ]);

  const clearHistory = () => {
    setHistory([]);
  };

  const removeItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-primary text-primary-foreground";
    if (confidence >= 60) return "bg-accent text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="p-6 shadow-soft">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Analysis History
          </h3>
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Volume2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No analysis history yet</p>
            <p className="text-sm text-muted-foreground">
              Your recent sound analyses will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-earth rounded-full flex items-center justify-center flex-shrink-0">
                  <Bird className="h-5 w-5 text-foreground" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">
                      {item.fileName}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getConfidenceColor(item.confidence)}`}
                    >
                      {item.confidence}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{item.species}</span> - {item.interpretation}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(item.timestamp)}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {history.length > 5 && (
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              Showing 5 most recent analyses
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}