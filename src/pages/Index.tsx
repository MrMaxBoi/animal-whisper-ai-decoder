import { useState } from "react";
import { Volume2, Brain, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AIResults } from "@/components/AIResults";
import { HistoryLog } from "@/components/HistoryLog";
import heroImage from "@/assets/hero-forest.jpg";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                Animal Sound Decoder
              </h1>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
                Understand what animals are saying using AI-powered sound analysis
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Upload
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Smart Insights
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Leaf className="h-6 w-6" />
              <span className="text-lg font-medium">Discover Nature's Language</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload recordings of animal sounds and let our AI help you understand 
              the meaning behind vocalizations. From bird songs to mammal calls, 
              decode the secrets of animal communication.
            </p>
          </div>

          {/* Upload Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <FileUpload 
                onFileSelect={setSelectedFile} 
                selectedFile={selectedFile}
              />
              
              {selectedFile && (
                <AudioPlayer file={selectedFile} />
              )}
              
              <AIResults file={selectedFile} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <HistoryLog />
              
              {/* Info Card */}
              <div className="bg-gradient-dawn rounded-lg p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">How It Works</h3>
                  <div className="text-sm text-foreground/80 space-y-1">
                    <p>🎵 Upload your animal sound recording</p>
                    <p>🔬 AI analyzes frequency patterns</p>
                    <p>📊 Get species identification & meaning</p>
                    <p>📈 View confidence scores & insights</p>
                  </div>
                </div>
              </div>

              {/* Integration Note */}
              <div className="border border-border rounded-lg p-4 text-center space-y-2">
                <h4 className="text-sm font-medium text-foreground">Ready for Integration</h4>
                <p className="text-xs text-muted-foreground">
                  Connect to your ML model via Google Colab, HuggingFace, or custom API endpoint
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Brain className="h-4 w-4 mr-2" />
                  Setup Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
