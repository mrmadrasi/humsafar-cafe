"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Utensils, Sparkles, Heart, Star, PlusCircle } from "lucide-react";

interface SignatureMenuSectionProps {
  onAddMenuItem: (itemTitle: string) => void;
}

export function SignatureMenuSection({ onAddMenuItem }: SignatureMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Romantic Coffees",
    "Signature Chai",
    "Mocktails",
    "Desserts",
    "Couple Specials",
  ];

  const menuItems = [
    {
      name: "Love Latte",
      category: "Romantic Coffees",
      price: "₹290",
      badge: "Top Rated",
      desc: "Soft espresso topped with velvet damask rose cream and handcrafted heart foam art.",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Hazelnut Humsafar",
      category: "Romantic Coffees",
      price: "₹340",
      badge: "House Signature",
      desc: "Double espresso layered with roasted hazelnut butter, cocoa dust, and warm cinnamon stick.",
      img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Rose Cappuccino",
      category: "Romantic Coffees",
      price: "₹310",
      badge: "Chef Special",
      desc: "Rich espresso infusion with organic damask rose petals and cardamom micro-foam.",
      img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Midnight Mocha",
      category: "Romantic Coffees",
      price: "₹360",
      badge: "Evening Favorite",
      desc: "Dark Belgian chocolate fused with bold roast espresso and toasted marshmallow cream.",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Saffron Cardamom Chai",
      category: "Signature Chai",
      price: "₹260",
      badge: "Royal Brew",
      desc: "Royal Indian Karak chai simmered with Kashmiri saffron, crushed green cardamom & milk.",
      img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Strawberry Kiss",
      category: "Mocktails",
      price: "₹320",
      badge: "Refreshing",
      desc: "Chilled artisanal mocktail of muddled fresh strawberries, hibiscus tonic & wild mint.",
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Sunset Passion Mocktail",
      category: "Mocktails",
      price: "₹340",
      badge: "Sparkling",
      desc: "Passionfruit nectar, sparkled pink grapefruit tonic, rosemary sprig & crushed ice.",
      img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Forever Fudge Brownie",
      category: "Desserts",
      price: "₹380",
      badge: "Warm Molten",
      desc: "Warm molten Belgian fudge brownie served with Madagascar vanilla gelée & edible gold dust.",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Twogether Tiramisu",
      category: "Couple Specials",
      price: "₹450",
      badge: "For Two ❤️",
      desc: "Traditional Italian mascarpone tiramisu with double espresso drizzle, served with two silver spoons.",
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-20 sm:py-32 overflow-hidden bg-[var(--bg-secondary)]/30">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--text-accent)] mb-3"
          >
            <Utensils className="h-3.5 w-3.5" />
            <span>Artisan Selection</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Signature Café Menu
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Handcrafted beverages, aromatic chais, and indulgent desserts carefully curated to complement your romantic conversations.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] text-white shadow-lg border border-[var(--accent-gold)]"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl glass-panel border border-[var(--border-color)] p-4 sm:p-5 flex flex-col justify-between hover:border-[var(--accent-gold)] hover:shadow-xl transition"
              >
                <div>
                  {/* Thumbnail & Badge */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-[var(--accent-gold)] border border-[var(--border-color)]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition">
                      {item.name}
                    </h3>
                    <span className="font-mono font-bold text-sm text-[var(--text-accent)]">
                      {item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Add to Date Plan Trigger */}
                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    {item.category}
                  </span>
                  <button
                    onClick={() => onAddMenuItem(item.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--accent-burgundy)] text-[var(--text-primary)] hover:text-white text-xs font-semibold border border-[var(--border-color)] transition shadow-sm"
                  >
                    <PlusCircle className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                    <span>Add to Date Plan</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
