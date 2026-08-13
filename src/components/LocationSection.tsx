"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, Calendar, Heart } from "lucide-react";

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export function LocationSection({ onOpenBooking }: LocationSectionProps) {
  return (
    <section id="location" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Contact & Hours Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--text-accent)]">
              <MapPin className="h-3.5 w-3.5" />
              <span>Visit Us</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Step Into Our Evening.
            </h2>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Located in the heart of Bandra West, Humsafar Café offers a quiet, cozy retreat away from the city hustle. Walk in or reserve your candlelight table ahead of time.
            </p>

            {/* Information Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-[var(--border-color)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-burgundy)] text-[var(--accent-gold)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[var(--text-primary)]">
                    Café Location
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    74 Romantic Avenue, Off Carter Road, Bandra West, Mumbai, 400050
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-[var(--border-color)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-burgundy)] text-[var(--accent-gold)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[var(--text-primary)]">
                    Opening Hours
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Monday – Friday: 11:00 AM – 11:30 PM <br />
                    Saturday & Sunday: 10:00 AM – 12:00 Midnight (Candlelight Session 6:30 PM+)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] px-6 py-3 text-xs font-bold text-white shadow-xl hover:brightness-110 transition"
              >
                <Calendar className="h-4 w-4" />
                <span>Reserve Table Now</span>
              </button>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-5 py-3 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition"
              >
                <Phone className="h-4 w-4 text-[var(--accent-gold)]" />
                <span>Call Us</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-5 py-3 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-rose)] transition"
              >
                <svg className="h-4 w-4 fill-current text-[var(--accent-rose)]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </motion.div>

          {/* Right Map Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-[var(--border-color)] p-3 shadow-2xl">
              {/* Map Iframe / Visual */}
              <div className="relative overflow-hidden rounded-2xl h-[360px] sm:h-[400px] w-full bg-[var(--bg-tertiary)]">
                <iframe
                  title="Humsafar Cafe Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.993072210515!2d72.8258!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNDknMzIuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.1) saturate(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                />

                {/* Floating Map Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-[var(--accent-gold)]/40 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                      Directions
                    </span>
                    <h5 className="text-xs font-bold font-serif-heading">Humsafar Café — Bandra West</h5>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-burgundy)] text-[11px] font-bold text-white hover:bg-[var(--accent-rose)] transition"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Open Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
