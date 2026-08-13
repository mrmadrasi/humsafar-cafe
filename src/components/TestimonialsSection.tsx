"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Quote, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Rohan & Devika",
      dateType: "Anniversary Candlelight Date",
      review: "Beautiful ambience, amazing coffee and the perfect place for a quiet date. The vinyl acoustic playlist playing softly in the background made our anniversary so magical.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Karan & Simran",
      dateType: "First Date Coffee",
      review: "We walked in for a quick afternoon coffee and ended up talking for 3 hours! The Love Latte and candlelight seating made us forget the world outside.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Kabir & Meera",
      dateType: "Birthday Surprise Date",
      review: "Humsafar Café arranged a custom song request and a surprise polaroid keepsake for my wife's birthday. The warm candlelight atmosphere was unforgettable!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[var(--bg-secondary)]/40">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-rose)]/40 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--accent-rose)] mb-3"
          >
            <Heart className="h-3.5 w-3.5 fill-current text-rose-400" />
            <span>Love Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Little Moments, Big Memories.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Hear what our wonderful couples say about their romantic evenings at Humsafar Café.
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-7 border border-[var(--border-color)] flex flex-col justify-between hover:border-[var(--accent-gold)] transition shadow-xl"
            >
              <div className="space-y-4">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[var(--accent-gold)]">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-[var(--accent-gold)]/40" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic">
                  “{rev.review}”
                </p>
              </div>

              {/* Author & Couple Info */}
              <div className="pt-5 mt-4 border-t border-[var(--border-color)] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-10 w-10 rounded-full object-cover border border-[var(--accent-gold)]"
                />
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[var(--text-primary)]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[var(--text-accent)]">
                    {rev.dateType}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
