"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Flame, Coffee, Music, Camera, ArrowRight, Sparkles } from "lucide-react";

interface SpecialExperiencesSectionProps {
  onSelectExperience: (title: string) => void;
}

export function SpecialExperiencesSection({ onSelectExperience }: SpecialExperiencesSectionProps) {
  const experiences = [
    {
      title: "Couple's Table",
      emoji: "❤️",
      tagline: "An intimate corner made for two.",
      desc: "Deep burgundy plush velvet booths tucked away in cozy alcoves, designed for complete privacy and quiet whispers.",
      icon: Heart,
      badge: "Most Romantic",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Candlelight Evening",
      emoji: "🌹",
      tagline: "Soft lights, slow music and unforgettable conversations.",
      desc: "Every evening at 6:30 PM, our main lights dim down to handcrafted warm beeswax candle glow and acoustic guitar tunes.",
      icon: Flame,
      badge: "Signature",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Coffee & Dessert Date",
      emoji: "☕",
      tagline: "Sweet treats for your sweetest person.",
      desc: "Pairs handcrafted specialty lattes with Belgian molten chocolates, rose-cardamom tarts, and customized plate art.",
      icon: Coffee,
      badge: "Sweet Special",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Music Date",
      emoji: "🎶",
      tagline: "Pick a song. Make a memory.",
      desc: "Select vinyl records from our curated romantic collection or request your favorite song to be played during your date.",
      icon: Music,
      badge: "Soulful",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Memory Corner",
      emoji: "📸",
      tagline: "Capture a moment worth keeping.",
      desc: "Complimentary vintage Polaroid photo taken at your table, framed in our signature Humsafar keepsake card.",
      icon: Camera,
      badge: "Free Keepsake",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--text-accent)] mb-3"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
            <span>Curated Romance</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Special Date Experiences
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Tailor-made atmospheres designed for anniversaries, proposals, first dates, or simple quiet evenings together.
          </motion.p>
        </div>

        {/* 3D Tilt Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl glass-panel p-6 border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--accent-gold)] hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Background Image Accent on Hover */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${exp.image})` }}
                />

                <div className="relative z-10 space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[var(--accent-burgundy)]/50 border border-[var(--accent-gold)]/40 text-[10px] font-semibold text-[var(--text-accent)] uppercase tracking-wider">
                      {exp.badge}
                    </span>
                    <div className="h-10 w-10 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-gold)] group-hover:scale-110 transition">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-serif-heading text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                      {exp.title} <span>{exp.emoji}</span>
                    </h3>
                    <p className="text-xs font-semibold text-[var(--accent-rose)] mt-1">
                      “{exp.tagline}”
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                {/* CTA Action */}
                <div className="relative z-10 pt-6 mt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => onSelectExperience(`${exp.title} ${exp.emoji}`)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition"
                  >
                    <span>Reserve Experience</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
