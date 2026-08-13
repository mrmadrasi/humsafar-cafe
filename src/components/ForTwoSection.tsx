"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Coffee, Flame, Music, Camera, CheckCircle2, Gift } from "lucide-react";

interface ForTwoSectionProps {
  onOpenBooking: () => void;
}

export function ForTwoSection({ onOpenBooking }: ForTwoSectionProps) {
  const inclusions = [
    { title: "2 Signature Beverages", desc: "Choose any two from our Love Lattes, Rose Cappuccinos, or Chais.", icon: Coffee },
    { title: "1 Handcrafted Dessert", desc: "Indulge in our Forever Fudge Brownie or Twogether Tiramisu.", icon: Gift },
    { title: "Reserved Candlelight Table", desc: "Guaranteed private corner table with personalized ambient lighting.", icon: Flame },
    { title: "Custom Romantic Playlist", desc: "Dedicate a song from our vinyl collection to your partner.", icon: Music },
    { title: "Keepsake Memory Photograph", desc: "Instant polaroid photograph framed in a luxury Humsafar card.", icon: Camera },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--accent-burgundy)]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl glass-panel border border-[var(--accent-gold)]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background image */}
          <div
            className="absolute inset-0 z-0 opacity-15 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')`,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Box Spotlight */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-rose)]/50 bg-[var(--accent-burgundy)]/40 px-4 py-1.5 text-xs text-[var(--accent-rose)]">
                <Heart className="h-3.5 w-3.5 fill-current text-rose-400" />
                <span>Special Romantic Package</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Made for Two ❤️
              </h2>

              <p className="font-script-accent text-3xl text-[var(--text-accent)]">
                The “Humsafar Date Box” Experience
              </p>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Everything you need for an unforgettable evening together, seamlessly bundled into one all-inclusive romantic café experience.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] px-8 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105 hover:shadow-rose-600/40"
                >
                  <span>Make It Special</span>
                  <Sparkles className="h-4 w-4 text-amber-200 animate-spin" style={{ animationDuration: "4s" }} />
                </button>
              </div>
            </div>

            {/* Right Inclusions Checklist */}
            <div className="lg:col-span-6 bg-[var(--bg-tertiary)]/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] space-y-4">
              <h3 className="font-serif-heading text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                Included in Your Humsafar Date Box:
              </h3>

              <div className="space-y-3.5">
                {inclusions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-burgundy)] text-[var(--accent-gold)]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                          {item.title}
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        </h4>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
