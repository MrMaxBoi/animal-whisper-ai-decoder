import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  file: File;
}

export function AudioPlayer({ file }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      audio.pause();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-6 shadow-nature">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Audio Player
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAudio}
            className="hover:bg-accent"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} src={audioUrl} preload="metadata" />

        {/* Waveform Visualization Placeholder */}
        <div className="h-20 bg-gradient-dawn rounded-lg flex items-center justify-center">
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className="bg-primary-glow animate-pulse rounded-full transition-all duration-300"
                style={{
                  width: "3px",
                  height: `${Math.random() * 100 + 20}%`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: isPlaying ? 0.8 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="nature"
            size="lg"
            onClick={togglePlayPause}
            disabled={!audioUrl}
            className="min-w-32"
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Play Sound
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}