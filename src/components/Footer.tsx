"use client";

import React from "react";
import { Heart, Sparkles, Camera, Share2, Globe } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { name: "Home", href: "#hero" },
    { name: "Our Story", href: "#experience" },
    { name: "Menu", href: "#menu" },
    { name: "Date Experience", href: "#experience" },
    { name: "Playlist", href: "#playlist" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#location" },
  ];

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-secondary)] pt-16 pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-burgundy)] text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/40">
              <Heart className="h-5 w-5 fill-current animate-pulse text-[var(--accent-gold)]" />
            </div>
            <span className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-wider text-[var(--text-primary)]">
              HUMSAFAR CAFÉ
            </span>
          </div>

          {/* Tagline */}
          <p className="font-script-accent text-2xl sm:text-3xl text-[var(--text-accent)] max-w-lg">
            “Har mulaqat ka ek geet, har Humsafar ki ek kahani.” 🎶
          </p>

          <p className="text-xs text-[var(--text-secondary)] max-w-md">
            Coffee, conversations & melodies made for two. Step into a romantic evening crafted for your love story.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2 text-[var(--text-secondary)]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Bottom Copyright & Blink Different Credit */}
          <div className="w-full border-t border-[var(--border-color)]/60 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
            <p>© {new Date().getFullYear()} Humsafar Café. All Rights Reserved.</p>

            <p className="flex items-center gap-1.5 font-medium">
              <span>Created by</span>
              <a
                href="https://blinkdifferent.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--text-accent)] hover:underline hover:text-[var(--accent-gold-hover)] transition flex items-center gap-1"
              >
                Blink Different <Sparkles className="h-3 w-3 text-[var(--accent-gold)]" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
