import { useState, useCallback } from "react";
import { Upload, FileAudio, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const audioFile = files.find(file => 
        file.type.startsWith('audio/') && 
        (file.type.includes('wav') || file.type.includes('mp3') || file.type.includes('mpeg'))
      );

      if (audioFile) {
        if (audioFile.size > 10 * 1024 * 1024) { // 10MB limit
          toast({
            title: "File too large",
            description: "Please select an audio file smaller than 10MB.",
            variant: "destructive",
          });
          return;
        }
        onFileSelect(audioFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .wav or .mp3 audio file.",
          variant: "destructive",
        });
      }
    },
    [onFileSelect, toast]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an audio file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      onFileSelect(file);
    }
  };

  const clearFile = () => {
    onFileSelect(null as any);
  };

  return (
    <Card className="p-8 border-2 border-dashed transition-all duration-300 shadow-soft">
      {selectedFile ? (
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-forest rounded-full shadow-glow">
            <FileAudio className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">{selectedFile.name}</h3>
            <p className="text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFile}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Remove File
          </Button>
        </div>
      ) : (
        <div
          className={`text-center transition-all duration-300 ${
            isDragOver 
              ? "border-primary bg-primary/5 scale-105" 
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-earth rounded-full">
              <Upload className="h-8 w-8 text-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Upload Animal Sound</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Drag and drop your .wav or .mp3 file here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">Max file size: 10MB</p>
            </div>
            <div>
              <Button variant="forest" size="lg" asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".wav,.mp3,audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  Choose Audio File
                </label>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}