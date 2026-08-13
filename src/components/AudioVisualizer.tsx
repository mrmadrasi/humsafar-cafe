"use client";

import React from "react";
import { Disc, Music } from "lucide-react";

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <Disc
          className={`h-5 w-5 text-[var(--accent-gold)] ${
            isPlaying ? "animate-spin" : "opacity-60"
          }`}
          style={{ animationDuration: "6s" }}
        />
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-[var(--accent-gold)]/20 blur-sm animate-pulse" />
        )}
      </div>

      <div className="flex items-end gap-1 h-5 px-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-[var(--accent-gold)] transition-all ${
              isPlaying ? "equalizer-bar" : "h-1.5 opacity-40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
