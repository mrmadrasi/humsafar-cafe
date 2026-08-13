"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, Music, Flame, Heart, Sparkles, Footprints } from "lucide-react";

export function DateExperienceSection() {
  const steps = [
    {
      num: "01",
      title: "The First Glance",
      desc: "Walk in, slow down, and let the evening begin.",
      icon: Footprints,
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      quote: "The door chimes softly as warm amber lights welcome you into a cozy romantic evening.",
    },
    {
      num: "02",
      title: "Coffee & Conversations ☕",
      desc: "Two cups. One table. Endless things to talk about.",
      icon: Coffee,
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      quote: "Velvet foam, rich espresso aromas, and conversations that whisper into the late hours.",
    },
    {
      num: "03",
      title: "Music & Moments 🎶",
      desc: "Let your favorite songs become part of your story.",
      icon: Music,
      img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      quote: "Soft acoustic vinyl melodies flowing gently across your table as time stands still.",
    },
    {
      num: "04",
      title: "Candlelight & Connection 🕯️",
      desc: "Forget the world for a little while.",
      icon: Flame,
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      quote: "Golden flames dancing softly against your coffee cups, illuminating shared smiles.",
    },
    {
      num: "05",
      title: "One More Memory ❤️",
      desc: "Leave with a smile and a reason to come back.",
      icon: Heart,
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      quote: "A polaroid snapshot, lingering coffee sweetness, and a promise to meet again soon.",
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-32 overflow-hidden bg-[var(--bg-secondary)]/40">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-rose)]/40 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--accent-rose)] mb-3"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Narrative</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Your Perfect Humsafar Date
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto"
          >
            Step into a carefully designed 5-step date journey. From the moment you walk through our doors, every detail is tailored for intimate romance.
          </motion.p>
        </div>

        {/* Vertical Timeline Journey */}
        <div className="relative">
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--accent-gold)] to-transparent opacity-40" />

          <div className="space-y-12 sm:space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className={`relative flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="w-full lg:w-[46%] space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--accent-gold)] tracking-widest">
                        {step.num}
                      </span>
                      <div className="h-9 w-9 rounded-full bg-[var(--accent-burgundy)]/40 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                      {step.title}
                    </h3>

                    <p className="text-base font-medium text-[var(--text-accent)] leading-snug">
                      “{step.desc}”
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--accent-rose)]/50 pl-4 py-1">
                      {step.quote}
                    </p>
                  </motion.div>

                  {/* Central Node for Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] shadow-xl z-20">
                    <div className="h-3 w-3 rounded-full bg-[var(--accent-rose)] animate-ping" />
                  </div>

                  {/* Image Card Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full lg:w-[46%]"
                  >
                    <div className="group relative overflow-hidden rounded-3xl glass-panel p-3 border border-[var(--border-color)] shadow-2xl transition-all duration-500 hover:border-[var(--accent-gold)]">
                      <div className="overflow-hidden rounded-2xl aspect-[4/3]">
                        <img
                          src={step.img}
                          alt={step.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
