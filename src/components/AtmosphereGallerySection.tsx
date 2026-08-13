"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Sparkles, Maximize2 } from "lucide-react";

export function AtmosphereGallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryItems = [
    {
      title: "Candlelit Evening Corner",
      category: "Ambience",
      size: "col-span-1 md:col-span-2 row-span-2",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Artisan Rose Foam Latte",
      category: "Coffee & Drinks",
      size: "col-span-1 row-span-1",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Warm Velvet Booth Seating",
      category: "Interior",
      size: "col-span-1 row-span-1",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Molten Fudge Dessert Date",
      category: "Desserts",
      size: "col-span-1 row-span-2",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Acoustic Stage & Vinyl Player",
      category: "Ambience",
      size: "col-span-1 md:col-span-2 row-span-1",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Couple Table by Candlelight",
      category: "Candlelight Date",
      size: "col-span-1 row-span-1",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filters = ["All", "Ambience", "Interior", "Coffee & Drinks", "Desserts", "Candlelight Date"];

  const filteredGallery =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="relative py-20 sm:py-32 overflow-hidden bg-[var(--bg-secondary)]/20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--text-accent)] mb-3"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Visual Storytelling</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Atmosphere Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Take a glance into our warm romantic evenings, candlelight tables, and signature coffee moments.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f
                  ? "bg-[var(--accent-burgundy)] text-white border border-[var(--accent-gold)] shadow-md"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-color)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Asymmetric Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[220px]">
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImage(item.img)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer border border-[var(--border-color)] ${item.size} shadow-lg hover:border-[var(--accent-gold)] transition-all`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="font-serif-heading font-bold text-lg text-white mt-0.5 flex items-center justify-between">
                    <span>{item.title}</span>
                    <Maximize2 className="h-4 w-4 text-[var(--accent-gold)]" />
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-3xl border border-[var(--accent-gold)]/40 shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-rose-900 transition"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={lightboxImage}
                alt="Enlarged view"
                className="h-full w-full object-contain max-h-[85vh] mx-auto"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
