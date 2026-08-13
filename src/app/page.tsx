"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PlaylistSection } from "@/components/PlaylistSection";
import { DateExperienceSection } from "@/components/DateExperienceSection";
import { SpecialExperiencesSection } from "@/components/SpecialExperiencesSection";
import { SignatureMenuSection } from "@/components/SignatureMenuSection";
import { ForTwoSection } from "@/components/ForTwoSection";
import { AtmosphereGallerySection } from "@/components/AtmosphereGallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { DateBookingModal } from "@/components/DateBookingModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<string | undefined>(undefined);

  const handleOpenBooking = (addon?: string) => {
    setSelectedAddon(addon);
    setIsBookingOpen(true);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      {/* Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Cinematic Hero */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* Spotify Playlist Embed & Player Section */}
      <PlaylistSection />

      {/* Interactive 5-Step Date Experience */}
      <DateExperienceSection />

      {/* Special Date Experiences Cards */}
      <SpecialExperiencesSection
        onSelectExperience={(expTitle) => handleOpenBooking(expTitle)}
      />

      {/* Signature Menu Preview */}
      <SignatureMenuSection
        onAddMenuItem={(itemTitle) => handleOpenBooking(`Menu Preference: ${itemTitle}`)}
      />

      {/* "FOR TWO" Spotlight Box */}
      <ForTwoSection onOpenBooking={() => handleOpenBooking("Humsafar Date Box ❤️")} />

      {/* Atmosphere Gallery & Lightbox */}
      <AtmosphereGallerySection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Location, Map & Hours */}
      <LocationSection onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer />

      {/* Interactive Date Reservation Modal */}
      <DateBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialAddon={selectedAddon}
      />

      {/* Fixed Sticky Mobile CTA */}
      <StickyMobileCTA onOpenBooking={() => handleOpenBooking()} />
    </main>
  );
}
