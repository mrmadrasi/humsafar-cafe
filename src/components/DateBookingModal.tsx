"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Heart, Sparkles, CheckCircle2, ChevronRight, User, Phone, MessageSquare } from "lucide-react";

interface DateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAddon?: string;
}

export function DateBookingModal({ isOpen, onClose, initialAddon }: DateBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedTime, setSelectedTime] = useState<string>("07:30 PM — Candlelight Hour");
  const [tablePreference, setTablePreference] = useState<string>("Candlelight Corner ❤️");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddon ? [initialAddon] : ["Fresh Damask Red Roses 🌹", "Keepsake Photo 📸"]);
  
  const [formData, setFormData] = useState({
    name: "",
    partnerName: "",
    phone: "",
    specialNote: "",
  });

  const [bookingRef, setBookingRef] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const dates = ["Today", "Tomorrow", "This Friday", "This Saturday", "Valentine's Special"];
  const times = [
    "05:30 PM — Golden Sunset",
    "07:00 PM — Twilight Melody",
    "07:30 PM — Candlelight Hour",
    "09:00 PM — Moonlight & Music",
    "10:00 PM — Late Night Romance",
  ];

  const tableTypes = [
    { title: "Candlelight Corner ❤️", desc: "Private dimly lit booth with custom warm candles." },
    { title: "Window for Two 🪟", desc: "Cozy window seating with starlight street view." },
    { title: "Music Lounge 🎶", desc: "Close to our acoustic stage for vinyl & live sessions." },
    { title: "Garden Terrace 🌿", desc: "Open-air romantic outdoor canopy with fairy lights." },
  ];

  const addonOptions = [
    { id: "Fresh Damask Red Roses 🌹", price: "Complimentary" },
    { id: "Handcrafted Artisan Dessert 🍰", price: "Included in Date Box" },
    { id: "Customized Song Request 🎶", price: "Free" },
    { id: "Keepsake Memory Photo 📸", price: "Free" },
    { id: "Surprise Table Cake 🎂", price: "₹350" },
    { id: "Live Violinist Serenade 🎻", price: "₹600" },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`HUMSAFAR-LOVE-${randomNum}`);
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl glass-panel border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl text-[var(--text-primary)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-burgundy)] text-[var(--accent-gold)]">
                <Heart className="h-5 w-5 fill-current animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold tracking-wide">
                  Plan Your Humsafar Date
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Reserve an unforgettable romantic experience for two
                </p>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          {step < 3 && (
            <div className="mb-6 flex items-center justify-between text-xs font-medium text-[var(--text-secondary)]">
              <span className={`flex items-center gap-1 ${step >= 1 ? "text-[var(--accent-gold)]" : ""}`}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-gold)]/20 text-[10px]">1</span>
                Date & Table
              </span>
              <div className="h-[1px] flex-1 bg-[var(--border-color)] mx-3" />
              <span className={`flex items-center gap-1 ${step >= 2 ? "text-[var(--accent-gold)]" : ""}`}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-gold)]/20 text-[10px]">2</span>
                Details & Add-ons
              </span>
            </div>
          )}

          {/* STEP 1: Date, Time & Table Preference */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Date Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-accent)] mb-2 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> 1. Select Date
                </label>
                <div className="flex flex-wrap gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedDate === d
                          ? "bg-[var(--accent-burgundy)] text-white border border-[var(--accent-gold)] shadow-md"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-color)]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-accent)] mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> 2. Select Candlelight Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs text-left transition-all ${
                        selectedTime === t
                          ? "bg-[var(--accent-burgundy)] text-white border border-[var(--accent-gold)] shadow-md"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-color)]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Seating Preference */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-accent)] mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> 3. Seating Ambience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tableTypes.map((table) => (
                    <div
                      key={table.title}
                      onClick={() => setTablePreference(table.title)}
                      className={`p-3 rounded-2xl cursor-pointer border transition-all ${
                        tablePreference === table.title
                          ? "bg-[var(--accent-burgundy)]/40 border-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]"
                          : "bg-[var(--bg-tertiary)]/50 border-[var(--border-color)] hover:border-[var(--accent-gold)]/50"
                      }`}
                    >
                      <h4 className="font-serif-heading font-bold text-sm text-[var(--text-primary)]">
                        {table.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        {table.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] text-white font-medium text-sm flex items-center gap-2 shadow-lg hover:brightness-110 transition"
                >
                  Continue to Special Details <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Couple Info & Add-ons */}
          {step === 2 && (
            <form onSubmit={handleCompleteBooking}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Guest Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                      <User className="h-3 w-3" /> Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                      <Heart className="h-3 w-3 text-rose-500" /> Partner's Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      placeholder="e.g. Ananya Roy"
                      className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Romantic Add-ons */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-accent)] mb-2 block">
                    Romantic Touches & Add-ons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {addonOptions.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-2.5 rounded-xl cursor-pointer border flex items-center justify-between text-xs transition-all ${
                            isSelected
                              ? "bg-[var(--accent-burgundy)]/30 border-[var(--accent-gold)] text-[var(--text-primary)]"
                              : "bg-[var(--bg-tertiary)]/50 border-[var(--border-color)] text-[var(--text-secondary)]"
                          }`}
                        >
                          <span className="font-medium">{addon.id}</span>
                          <span className="text-[10px] text-[var(--text-accent)]">{addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Special Requests / Song Note
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialNote}
                    onChange={(e) => setFormData({ ...formData, specialNote: e.target.value })}
                    placeholder="e.g. Please play 'Tum Se Hi' when we arrive, or anniversary cake surprise..."
                    className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] p-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] text-white font-medium text-sm flex items-center gap-2 shadow-xl hover:brightness-110 transition"
                  >
                    Confirm Date Reservation ❤️
                  </button>
                </div>
              </motion.div>
            </form>
          )}

          {/* STEP 3: Reservation Receipt / Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-5 py-4"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] ring-8 ring-[var(--accent-gold)]/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <span className="font-script-accent text-2xl text-[var(--text-accent)]">
                  Your Date is Reserved
                </span>
                <h3 className="font-serif-heading text-2xl font-bold mt-1 text-[var(--text-primary)]">
                  See You at Humsafar Café ❤️
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  A candlelit table and warm melodies await you and {formData.partnerName || "your partner"}.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="rounded-2xl bg-[var(--bg-tertiary)]/70 border border-[var(--accent-gold)]/40 p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-2">
                  <span className="text-[var(--text-secondary)]">Booking Reference:</span>
                  <span className="font-mono font-bold text-[var(--text-accent)]">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Date & Time:</span>
                  <span className="font-medium text-[var(--text-primary)]">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Seating:</span>
                  <span className="font-medium text-[var(--text-primary)]">{tablePreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Couple:</span>
                  <span className="font-medium text-[var(--text-primary)]">{formData.name || "Guest"} & {formData.partnerName || "Partner"}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="border-t border-[var(--border-color)] pt-2 mt-2">
                    <span className="text-[var(--text-secondary)] block mb-1">Add-ons:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedAddons.map((addon) => (
                        <span key={addon} className="px-2 py-0.5 rounded-full bg-[var(--accent-burgundy)]/40 text-[10px] text-[var(--text-accent)] border border-[var(--accent-gold)]/30">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Humsafar Cafe Date Booking:\nRef: ${bookingRef}\nDate: ${selectedDate} @ ${selectedTime}\nSeating: ${tablePreference}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-medium hover:border-[var(--accent-gold)] transition text-[var(--text-primary)]"
                >
                  {copied ? "✓ Booking Details Copied!" : "📋 Copy Confirmation Details"}
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent-burgundy)] text-white text-xs font-medium hover:bg-[var(--accent-burgundy-light)] transition"
                >
                  Close & Explore Café 🎶
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
