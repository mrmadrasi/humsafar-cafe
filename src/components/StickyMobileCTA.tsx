"use client";

import React from "react";
import { Heart } from "lucide-react";

interface StickyMobileCTAProps {
  onOpenBooking: () => void;
}

export function StickyMobileCTA({ onOpenBooking }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden pointer-events-auto">
      <button
        onClick={onOpenBooking}
        className="w-full flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] py-3.5 px-6 text-sm font-bold text-white shadow-2xl border border-[var(--accent-gold)]/40 backdrop-blur-xl active:scale-95 transition"
      >
        <Heart className="h-4 w-4 fill-current text-white animate-pulse" />
        <span>❤️ Plan Your Humsafar Date</span>
      </button>
    </div>
  );
}
