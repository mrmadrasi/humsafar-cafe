"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Heart, Menu as MenuIcon, X, Music, Utensils, Sparkles, MapPin, Image as ImageIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", icon: Sparkles },
    { name: "Experience", href: "#experience", icon: Heart },
    { name: "Menu", href: "#menu", icon: Utensils },
    { name: "Playlist", href: "#playlist", icon: Music },
    { name: "Gallery", href: "#gallery", icon: ImageIcon },
    { name: "Contact", href: "#location", icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-3 shadow-xl"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-burgundy)] text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/40 transition group-hover:scale-105">
                <Heart className="h-4 w-4 fill-current animate-pulse text-[var(--accent-gold)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition">
                  HUMSAFAR
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-accent)] font-medium -mt-1">
                  CAFÉ
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-gold)] transition-all duration-300 -translate-x-1/2 group-hover:w-3/4" />
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Romantic Theme"
                className="relative flex h-9 px-3 items-center justify-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)]/70 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--accent-gold)] hover:shadow-md"
              >
                {theme === "night" ? (
                  <>
                    <Moon className="h-3.5 w-3.5 text-[var(--accent-gold)] fill-[var(--accent-gold)]/20" />
                    <span className="hidden sm:inline text-[11px]">Night Mode 🌙</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-500 fill-amber-400/20" />
                    <span className="hidden sm:inline text-[11px]">Day Mode ☀️</span>
                  </>
                )}
              </button>

              {/* Primary CTA */}
              <button
                onClick={onOpenBooking}
                className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] px-5 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-rose-900/30"
              >
                <span>Plan Your Date</span>
                <Heart className="h-3.5 w-3.5 fill-current animate-bounce text-white" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-30 md:hidden glass-panel border-b border-[var(--border-color)] px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1"
                  >
                    <Icon className="h-4 w-4 text-[var(--accent-gold)]" />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              <div className="pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] py-3 text-sm font-bold text-white shadow-lg"
                >
                  <Heart className="h-4 w-4 fill-current text-rose-200 animate-pulse" />
                  <span>Plan Your Date ❤️</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
