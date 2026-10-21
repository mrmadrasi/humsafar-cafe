"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Music,
  Coffee,
  Heart,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ExternalLink,
  Disc,
  Radio,
  Flame,
  CloudRain,
  Share2,
  Columns,
  Eye,
} from "lucide-react";
import { RomanticCafe3D } from "./RomanticCafe3D";
import { AudioVisualizer } from "./AudioVisualizer";
import { romanticAudio } from "@/utils/romanticAudio";

export type CenterpieceMode = "3d-cafe" | "spotify-player" | "dual-experience";

interface RomanticCenterpieceProps {
  onOpenBooking: () => void;
}

interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  quote: string;
  coverUrl: string;
  spotifyUri: string;
}

export function RomanticCenterpiece({ onOpenBooking }: RomanticCenterpieceProps) {
  const [viewMode, setViewMode] = useState<CenterpieceMode>("3d-cafe");
  const [activeSpotifyCategory, setActiveSpotifyCategory] = useState<string>("bollywood");
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(28);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [playerMode, setPlayerMode] = useState<"custom" | "spotify-embed">("custom");
  const [copiedLink, setCopiedLink] = useState(false);

  // Curated Spotify Playlists
  const spotifyPlaylists = {
    bollywood: {
      name: "Bollywood Romance For Two",
      subtitle: "Arijit Singh, Atif Aslam, Akhil Sachdeva & Shreya Ghoshal",
      embedUrl:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
      badge: "Most Loved by Couples ❤️",
    },
    acoustic: {
      name: "Candlelight Acoustic & Love Ballads",
      subtitle: "Soft acoustic guitars, cello, and intimate piano duets",
      embedUrl:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator&theme=0",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",
      badge: "Dinner & Candlelight",
    },
    ghazals: {
      name: "Urdu Ghazals & Soulful Melodies",
      subtitle: "Deep romantic poetry, harmonium, and soulful night verses",
      embedUrl:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX5q67ZpWyRrZ?utm_source=generator&theme=0",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX5q67ZpWyRrZ",
      badge: "Poetic & Soulful",
    },
    lofi: {
      name: "Lofi Café Romance & Rain",
      subtitle: "Warm vinyl beats, gentle rain, and cozy coffeehouse vibes",
      embedUrl:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX4t95P995i8h?utm_source=generator&theme=0",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4t95P995i8h",
      badge: "Rainy Day Chill",
    },
  };

  // Realistic Romantic Songs with heart-touching quotes
  const romanticTracks: SongTrack[] = [
    {
      id: "1",
      title: "Humsafar (Title Track)",
      artist: "Akhil Sachdeva & Mansheel Gujral",
      duration: "3:45",
      quote: "“Sun mere humsafar, kya tujhe itni si bhi khabar... ki teri saansein chalti hain yahan.”",
      coverUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:4zCHbKjY1N4VlZz",
    },
    {
      id: "2",
      title: "Tum Se Hi (Acoustic Unplugged)",
      artist: "Mohit Chauhan",
      duration: "4:12",
      quote: "“Tum se hi din hota hai, surmayi shaam aati hai... tum se hi, tum se hi.”",
      coverUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:7w9zXh8",
    },
    {
      id: "3",
      title: "Pehli Nazar Mein (Café Lounge)",
      artist: "Atif Aslam",
      duration: "4:30",
      quote: "“Baby I love you, har dum har pal... har din bas tu hi tu.”",
      coverUrl:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:6z2kY",
    },
    {
      id: "4",
      title: "Raataan Lambiyan (Lofi Evening)",
      artist: "Tanishk Bagchi & Jubin Nautiyal",
      duration: "3:50",
      quote: "“Kaate kate na re raataan lambiyan... tere bina kaise jiyein?”",
      coverUrl:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:3g7",
    },
    {
      id: "5",
      title: "Kesariya (Soft Piano Romance)",
      artist: "Arijit Singh & Pritam",
      duration: "4:28",
      quote: "“Kesariya tera ishq hai piya... rang jaaun jo main haath lagaun.”",
      coverUrl:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:1b",
    },
    {
      id: "6",
      title: "Subhanallah (Guitar & Candlelight)",
      artist: "Sreerama Chandra & Shilpa Rao",
      duration: "4:09",
      quote: "“Subhanallah jo ho raha hai pehli dafa hai... hosh bhi hai khoya khoya.”",
      coverUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      spotifyUri: "spotify:track:9a",
    },
  ];

  const currentTrack = romanticTracks[currentSongIndex];

  // Song playback handling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingSong) {
      // Start realistic sound synthesizer
      romanticAudio.playRomanticMelody(currentTrack.id);

      interval = setInterval(() => {
        setSongProgress((prev) => {
          if (prev >= 100) {
            // Next song
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % romanticTracks.length);
            return 0;
          }
          return prev + 0.6;
        });
      }, 1000);
    } else {
      romanticAudio.stopRomanticMelody();
    }

    return () => {
      clearInterval(interval);
      romanticAudio.stopRomanticMelody();
    };
  }, [isPlayingSong, currentSongIndex, currentTrack.id]);

  const handleTogglePlaySong = () => {
    setIsPlayingSong(!isPlayingSong);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % romanticTracks.length);
    setSongProgress(0);
    setIsPlayingSong(true);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + romanticTracks.length) % romanticTracks.length);
    setSongProgress(0);
    setIsPlayingSong(true);
  };

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentPlaylistData =
    spotifyPlaylists[activeSpotifyCategory as keyof typeof spotifyPlaylists] ||
    spotifyPlaylists.bollywood;

  return (
    <section id="experience" className="relative py-12 sm:py-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-0 h-[600px] w-[800px] rounded-full bg-rose-950/25 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 z-0 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-tertiary)]/70 px-4 py-1.5 text-xs text-[var(--text-accent)] mb-3 shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold)] animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">
              The Heart of Humsafar Café
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Romantic Ambiance & Spotify Melodies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto"
          >
            Immerse yourself in our interactive 3D candlelight café, explore table views, and switch
            seamlessly into our curated Spotify love songs crafted for two.
          </motion.p>
        </div>

        {/* Dynamic Mode Switcher Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border-color)] shadow-2xl">
            <button
              onClick={() => setViewMode("3d-cafe")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "3d-cafe"
                  ? "bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] text-white shadow-lg shadow-rose-950/50 scale-[1.02]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
              }`}
            >
              <Coffee className="h-4 w-4 text-[var(--accent-gold)]" />
              <span>3D Café View</span>
            </button>

            <button
              onClick={() => setViewMode("spotify-player")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "spotify-player"
                  ? "bg-[#1DB954] text-black font-bold shadow-lg shadow-emerald-950/50 scale-[1.02]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
              }`}
            >
              <Radio className="h-4 w-4" />
              <span>Romantic Song Player</span>
            </button>

            <button
              onClick={() => setViewMode("dual-experience")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "dual-experience"
                  ? "bg-[var(--accent-gold)] text-black font-bold shadow-lg shadow-amber-950/50 scale-[1.02]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
              }`}
            >
              <Columns className="h-4 w-4" />
              <span className="hidden sm:inline">Dual Experience</span>
              <span className="sm:hidden">Both</span>
            </button>
          </div>
        </motion.div>

        {/* Main Dynamic Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {/* MODE 1: PURE 3D CAFÉ VIEW */}
            {viewMode === "3d-cafe" && (
              <motion.div
                key="3d-cafe"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <RomanticCafe3D
                  onSwitchToPlayer={() => setViewMode("spotify-player")}
                  onOpenBooking={onOpenBooking}
                  initialView="couple"
                />

                {/* 3D Feature Guide Bar Below */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Flame className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                        Dynamic Candlelight
                      </h4>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        Click flame to blow or relight
                      </p>
                    </div>
                  </div>

                  <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                        Table For Two
                      </h4>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        Couple mugs & latte heart art
                      </p>
                    </div>
                  </div>

                  <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <CloudRain className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                        Window & Rain Bokeh
                      </h4>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        Atmospheric city night glow
                      </p>
                    </div>
                  </div>

                  <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Music className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                        Spotify Music Lounge
                      </h4>
                      <button
                        onClick={() => setViewMode("spotify-player")}
                        className="text-[10px] text-[#1DB954] hover:underline font-bold"
                      >
                        Switch to Player →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MODE 2: SPOTIFY PLAYER & ROMANTIC MUSIC LOUNGE */}
            {viewMode === "spotify-player" && (
              <motion.div
                key="spotify-player"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[var(--border-color)] overflow-hidden"
              >
                {/* Player Top Navigation & Category Selector */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-lg">
                      <Radio className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DB954]">
                          Spotify Curated Playlist
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] font-medium">
                          {currentPlaylistData.badge}
                        </span>
                      </div>
                      <h3 className="font-serif-heading font-bold text-lg sm:text-2xl text-[var(--text-primary)]">
                        {currentPlaylistData.name}
                      </h3>
                    </div>
                  </div>

                  {/* Playlist Categories Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                    {[
                      { key: "bollywood", label: "Bollywood Love", icon: Heart },
                      { key: "acoustic", label: "Acoustic Date", icon: Flame },
                      { key: "ghazals", label: "Urdu Ghazals", icon: Sparkles },
                      { key: "lofi", label: "Lofi Café", icon: Coffee },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setActiveSpotifyCategory(cat.key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          activeSpotifyCategory === cat.key
                            ? "bg-[#1DB954] text-black shadow-md font-bold"
                            : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white"
                        }`}
                      >
                        <cat.icon className="h-3 w-3" />
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Player Type Switcher */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setPlayerMode(playerMode === "custom" ? "spotify-embed" : "custom")
                      }
                      className="text-xs px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] text-[var(--accent-gold)] font-medium transition"
                    >
                      {playerMode === "custom" ? "View Spotify Embed Frame" : "View Interactive Vinyl Player"}
                    </button>
                  </div>
                </div>

                {/* Sub View: Spotify Embed vs Interactive Custom Player */}
                {playerMode === "spotify-embed" ? (
                  <div className="w-full space-y-4">
                    <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] shadow-inner">
                      <iframe
                        style={{ borderRadius: "16px" }}
                        src={currentPlaylistData.embedUrl}
                        width="100%"
                        height="450"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={currentPlaylistData.name}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span>Stream full high-definition tracks through Spotify.</span>
                      <a
                        href={currentPlaylistData.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1DB954] hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Open Playlist in Spotify App</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Vinyl Disc, Artwork & Song Info */}
                    <div className="lg:col-span-5 flex flex-col items-center text-center">
                      {/* Rotating Vinyl & Cover Stack */}
                      <div className="relative group w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
                        {/* Vinyl Record Behind Artwork */}
                        <motion.div
                          animate={{ rotate: isPlayingSong ? 360 : 0 }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "linear",
                          }}
                          className={`absolute -right-4 sm:-right-8 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-all ${
                            isPlayingSong ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                          }`}
                        >
                          {/* Grooves */}
                          <div className="w-36 h-36 rounded-full border border-neutral-700/40 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border border-neutral-700/30 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-rose-900 border-2 border-[var(--accent-gold)] flex items-center justify-center">
                                <Heart className="h-4 w-4 text-[var(--accent-gold)] fill-current" />
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Album Cover */}
                        <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--border-color)]">
                          <img
                            src={currentTrack.coverUrl}
                            alt={currentTrack.title}
                            className={`h-full w-full object-cover transition-transform duration-700 ${
                              isPlayingSong ? "scale-105" : ""
                            }`}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={handleTogglePlaySong}
                              className="h-14 w-14 rounded-full bg-[var(--accent-gold)] text-black flex items-center justify-center shadow-xl hover:scale-110 transition"
                            >
                              {isPlayingSong ? (
                                <Pause className="h-6 w-6 fill-current" />
                              ) : (
                                <Play className="h-6 w-6 fill-current ml-1" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Song Details */}
                      <div className="mt-5 w-full">
                        <div className="flex items-center justify-center gap-2">
                          <AudioVisualizer isPlaying={isPlayingSong} />
                        </div>

                        <h4 className="font-serif-heading font-bold text-lg sm:text-xl text-[var(--text-primary)] mt-2">
                          {currentTrack.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {currentTrack.artist}
                        </p>

                        {/* Romantic Poetry snippet */}
                        <div className="mt-3 p-3 rounded-xl bg-[var(--bg-tertiary)]/70 border border-[var(--border-color)]/60">
                          <p className="font-script-accent text-base sm:text-lg text-[var(--text-accent)] leading-snug">
                            {currentTrack.quote}
                          </p>
                        </div>

                        {/* Scrub Bar */}
                        <div className="mt-4 w-full space-y-1">
                          <div
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                              setSongProgress(pct);
                            }}
                            className="relative h-2 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden cursor-pointer group"
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] via-[var(--accent-rose)] to-[var(--accent-gold)] transition-all duration-300 relative"
                              style={{ width: `${songProgress}%` }}
                            >
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                            <span>
                              {Math.floor((songProgress / 100) * 3)}:
                              {Math.floor(((songProgress / 100) * 60) % 60)
                                .toString()
                                .padStart(2, "0")}
                            </span>
                            <span>{currentTrack.duration}</span>
                          </div>
                        </div>

                        {/* Controls Bar */}
                        <div className="flex items-center justify-center gap-4 mt-3">
                          <button
                            onClick={() => {
                              const isM = romanticAudio.toggleMute();
                              setIsMuted(isM);
                            }}
                            className="p-2 text-[var(--text-secondary)] hover:text-white transition"
                            title={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </button>

                          <button
                            onClick={handlePrevSong}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition"
                            title="Previous Romantic Song"
                          >
                            <SkipBack className="h-4 w-4 fill-current" />
                          </button>

                          <button
                            onClick={handleTogglePlaySong}
                            className="h-12 w-12 rounded-full bg-gradient-to-r from-[var(--accent-burgundy)] to-[var(--accent-rose)] text-white flex items-center justify-center shadow-xl hover:scale-110 transition"
                          >
                            {isPlayingSong ? (
                              <Pause className="h-5 w-5 fill-current" />
                            ) : (
                              <Play className="h-5 w-5 fill-current ml-0.5" />
                            )}
                          </button>

                          <button
                            onClick={handleNextSong}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition"
                            title="Next Romantic Song"
                          >
                            <SkipForward className="h-4 w-4 fill-current" />
                          </button>

                          <a
                            href={currentPlaylistData.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954] text-black font-bold text-xs hover:brightness-110 transition shadow-md"
                          >
                            <span>Spotify</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right: Curated Tracklist & Ambient Mixer */}
                    <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[var(--border-color)] pt-6 lg:pt-0 lg:pl-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-accent)] flex items-center gap-2">
                          <Disc className="h-4 w-4" /> Romantic Playlist For Two
                        </h4>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {romanticTracks.length} Melodies
                        </span>
                      </div>

                      {/* Song List */}
                      <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-2">
                        {romanticTracks.map((track, index) => {
                          const isSelected = currentSongIndex === index;
                          return (
                            <div
                              key={track.id}
                              onClick={() => {
                                setCurrentSongIndex(index);
                                setIsPlayingSong(true);
                                setSongProgress(0);
                              }}
                              className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
                                isSelected
                                  ? "bg-gradient-to-r from-[var(--accent-burgundy)]/50 to-[var(--bg-card)] border-[var(--accent-gold)] text-white shadow-lg"
                                  : "bg-[var(--bg-tertiary)]/50 border-transparent hover:border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs text-[var(--accent-gold)]">
                                  {isSelected && isPlayingSong ? (
                                    <span className="animate-pulse">▶</span>
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] line-clamp-1">
                                    {track.title}
                                  </p>
                                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                                    {track.artist}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {isSelected && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--accent-gold)] px-2 py-0.5 rounded-full bg-[var(--accent-gold)]/10">
                                    Playing
                                  </span>
                                )}
                                <span className="text-xs text-[var(--text-muted)] font-mono">
                                  {track.duration}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quick Ambient Blend Bar */}
                      <div className="mt-6 pt-5 border-t border-[var(--border-color)]/60 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[var(--text-secondary)]">
                            Blend Café Sounds:
                          </span>
                          <button
                            onClick={() => romanticAudio.setRain(true)}
                            className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs flex items-center gap-1 hover:bg-sky-500/20"
                          >
                            <CloudRain className="h-3 w-3" /> Rain
                          </button>
                          <button
                            onClick={() => romanticAudio.setCandleCrackle(true)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-1 hover:bg-amber-500/20"
                          >
                            <Flame className="h-3 w-3" /> Candle
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopyShare}
                            className="text-xs text-[var(--text-secondary)] hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{copiedLink ? "Link Copied!" : "Share Playlist"}</span>
                          </button>

                          <button
                            onClick={() => setViewMode("3d-cafe")}
                            className="text-xs bg-[var(--accent-gold)] text-black font-bold px-3.5 py-1.5 rounded-xl hover:scale-105 transition"
                          >
                            ← Back to 3D View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* MODE 3: DUAL EXPERIENCE (3D CAFÉ BACKGROUND + FLOATING SPOTIFY PLAYER) */}
            {viewMode === "dual-experience" && (
              <motion.div
                key="dual-experience"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full relative rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl"
              >
                {/* 3D Cafe Background Scene */}
                <div className="h-[620px] sm:h-[720px] w-full">
                  <RomanticCafe3D onOpenBooking={onOpenBooking} initialView="couple" />
                </div>

                {/* Floating Glassmorphic Spotify Player Card Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-6 right-4 sm:right-6 z-30 max-w-[calc(100%-2rem)] sm:max-w-sm w-full bg-black/85 backdrop-blur-2xl border border-[var(--border-color)] rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-bold">
                        <Radio className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#1DB954] uppercase font-bold tracking-wider">
                          Now Playing In Café
                        </span>
                        <h4 className="text-xs font-serif-heading font-bold text-white line-clamp-1">
                          {currentTrack.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => setViewMode("spotify-player")}
                      className="text-[10px] text-[var(--accent-gold)] underline hover:text-white"
                    >
                      Expand
                    </button>
                  </div>

                  {/* Quote */}
                  <p className="font-script-accent text-sm text-[var(--text-accent)] line-clamp-1 mb-3">
                    {currentTrack.quote}
                  </p>

                  {/* Progress & Scrub */}
                  <div className="space-y-1 mb-3">
                    <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-gold)]"
                        style={{ width: `${songProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-[var(--text-muted)] font-mono">
                      <span>{currentTrack.artist}</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevSong}
                      className="p-1.5 text-white/80 hover:text-white"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={handleTogglePlaySong}
                      className="h-9 w-9 rounded-full bg-[var(--accent-gold)] text-black flex items-center justify-center font-bold hover:scale-105 transition"
                    >
                      {isPlayingSong ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={handleNextSong}
                      className="p-1.5 text-white/80 hover:text-white"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>

                    <a
                      href={currentPlaylistData.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-black bg-[#1DB954] px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <span>Spotify</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
