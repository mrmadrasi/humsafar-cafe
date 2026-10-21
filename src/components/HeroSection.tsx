"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Headphones, ChevronDown, Sparkles, Coffee, Music } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image Layer with Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85')`,
        }}
      />

      {/* Dark & Romantic Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/75 to-black/70" />

      {/* Warm Glow Spotlights */}
      <div className="absolute top-1/4 left-1/4 z-[2] h-96 w-96 rounded-full bg-rose-900/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 z-[2] h-96 w-96 rounded-full bg-amber-600/20 blur-[130px] pointer-events-none" />

      {/* Floating Champagne Particles */}
      <FloatingParticles />

      {/* Film Grain Texture */}
      <div className="film-grain absolute inset-0 z-[3] pointer-events-none opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Subtle Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-card)]/80 px-4 py-1.5 backdrop-blur-md mb-6 shadow-xl"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold)] animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-accent)]">
            A Romantic Sanctuary For Two
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold)] animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text-primary)] drop-shadow-2xl"
        >
          HUMSAFAR CAFÉ
        </motion.h1>

        {/* Romantic Urdu/Hindi Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-4 mb-3"
        >
          <p className="font-script-accent text-2xl sm:text-4xl md:text-5xl text-[var(--text-accent)] drop-shadow-lg leading-relaxed">
            “Har mulaqat ka ek geet, har Humsafar ki ek kahani.” 🎶
          </p>
        </motion.div>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mx-auto max-w-2xl text-base sm:text-xl font-light text-[var(--text-secondary)] tracking-wide leading-relaxed"
        >
          Coffee, conversations & melodies made for two.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-rose-600/40"
          >
            <span>Plan Your Date</span>
            <Heart className="h-5 w-5 fill-current animate-bounce text-white group-hover:scale-125 transition" />
            <div className="absolute inset-0 -z-10 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* 3D Cafe Experience CTA */}
          <a
            href="#experience"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-7 py-4 text-sm sm:text-base font-semibold text-[var(--text-primary)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent-gold)] hover:bg-[var(--bg-tertiary)] hover:scale-105 shadow-xl"
          >
            <Coffee className="h-5 w-5 text-[var(--accent-gold)]" />
            <span>Enter 3D Café View</span>
          </a>

          {/* Spotify Playlist CTA */}
          <a
            href="#experience"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 px-6 py-4 text-sm sm:text-base font-semibold text-emerald-300 backdrop-blur-md transition-all duration-300 hover:border-[#1DB954] hover:bg-emerald-900/40 hover:scale-105 shadow-xl"
          >
            <Headphones className="h-5 w-5 text-[#1DB954]" />
            <span>Romantic Spotify Songs</span>
          </a>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-14 grid grid-cols-3 gap-2 sm:gap-6 max-w-xl mx-auto border-t border-[var(--border-color)]/60 pt-6"
        >
          <div className="flex flex-col items-center">
            <Coffee className="h-5 w-5 text-[var(--accent-gold)] mb-1" />
            <span className="text-xs font-serif-heading font-semibold text-[var(--text-primary)]">Artisan Brews</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Crafted for two</span>
          </div>
          <div className="flex flex-col items-center border-x border-[var(--border-color)]/60">
            <Heart className="h-5 w-5 text-[var(--accent-rose)] mb-1" />
            <span className="text-xs font-serif-heading font-semibold text-[var(--text-primary)]">Candlelight Corners</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Intimate seating</span>
          </div>
          <div className="flex flex-col items-center">
            <Music className="h-5 w-5 text-[var(--accent-gold)] mb-1" />
            <span className="text-xs font-serif-heading font-semibold text-[var(--text-primary)]">Soulful Tunes</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Live & Spotify</span>
          </div>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-[11px] font-medium tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition uppercase"
      >
        <span>Begin Your Journey</span>
        <ChevronDown className="h-4 w-4 text-[var(--accent-gold)]" />
      </motion.a>
    </section>
  );
}
