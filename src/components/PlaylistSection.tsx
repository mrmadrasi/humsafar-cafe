"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ExternalLink, Music, Heart, Sparkles, Disc, Radio } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";

export function PlaylistSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(24);
  const [showIframe, setShowIframe] = useState(false);

  const playlist = [
    { title: "Humsafar (Title Track)", artist: "Akhil Sachdeva & Mansheel Gujral", duration: "3:45", id: "1" },
    { title: "Tum Se Hi (Acoustic Unplugged)", artist: "Mohit Chauhan", duration: "4:12", id: "2" },
    { title: "Pehli Nazar Mein (Café Lounge)", artist: "Atif Aslam", duration: "4:30", id: "3" },
    { title: "Raataan Lambiyan (Lofi Evening)", artist: "Tanishk Bagchi", duration: "3:50", id: "4" },
    { title: "Subhanallah (Guitar & Candlelight)", artist: "Sreerama Chandra", duration: "4:09", id: "5" },
    { title: "Kesariya (Soft Acoustic)", artist: "Arijit Singh", duration: "4:28", id: "6" },
  ];

  // Simulate progress playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTrack = playlist[currentTrackIndex];

  return (
    <section id="playlist" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[500px] w-[500px] rounded-full bg-rose-900/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-tertiary)]/60 px-4 py-1 text-xs text-[var(--text-accent)] mb-3"
          >
            <Music className="h-3.5 w-3.5" />
            <span>Curated Soundscape</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Some Love Stories Sound Better With Music.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            A soulful collection of romantic melodies, soft love songs, and dreamy tunes made for beautiful moments together. Sip your coffee, hold their hand, and let the music tell your story.
          </motion.p>
        </div>

        {/* Playlist Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-4xl rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-[var(--border-color)]"
        >
          {/* Header Toggle bar */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6">
            <div className="flex items-center gap-3">
              {/* Spotify Green Logo Icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-lg">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DB954]">
                  Official Spotify Selection
                </span>
                <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[var(--text-primary)]">
                  Humsafar — A Playlist for Two ❤️
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowIframe(!showIframe)}
                className="text-xs text-[var(--text-accent)] underline hover:text-[var(--text-primary)] transition"
              >
                {showIframe ? "Switch to Interactive Player" : "Switch to Embed Frame"}
              </button>
            </div>
          </div>

          {/* Player Mode: Embed Iframe vs Custom Spotify Card */}
          {showIframe ? (
            <div className="w-full overflow-hidden rounded-2xl border border-[var(--border-color)] shadow-inner">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                width="100%"
                height="382"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Humsafar Spotify Playlist"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Artwork & Currently Playing Box */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)]">
                  <img
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                    alt="Humsafar Playlist Album Cover"
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isPlaying ? "scale-105" : ""
                    }`}
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-14 w-14 rounded-full bg-[var(--accent-gold)] text-black flex items-center justify-center shadow-xl hover:scale-110 transition"
                    >
                      {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[var(--accent-gold)] flex items-center gap-1 border border-[var(--border-color)]">
                    <Sparkles className="h-3 w-3" /> 24 Songs
                  </div>
                </div>

                {/* Playing Info */}
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-center gap-2">
                    <AudioVisualizer isPlaying={isPlaying} />
                  </div>
                  <h4 className="font-serif-heading font-bold text-base text-[var(--text-primary)] mt-2 line-clamp-1">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {currentTrack.artist}
                  </p>

                  {/* Scrub Bar */}
                  <div className="mt-4 w-full space-y-1">
                    <div className="relative h-1.5 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden cursor-pointer">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-gold)] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                      <span>1:14</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-10 w-10 rounded-full bg-[var(--accent-burgundy)] text-white flex items-center justify-center shadow-md hover:bg-[var(--accent-rose)] transition"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                    </button>

                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954] text-black font-bold text-[11px] hover:brightness-110 transition shadow-md"
                    >
                      <span>Listen on Spotify</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Song Tracklist */}
              <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-6 md:pt-0 md:pl-8">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-accent)] mb-3 flex items-center gap-2">
                  <Disc className="h-3.5 w-3.5" /> Featured Tracks For Two
                </h4>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {playlist.map((track, index) => {
                    const isSelected = currentTrackIndex === index;
                    return (
                      <div
                        key={track.id}
                        onClick={() => {
                          setCurrentTrackIndex(index);
                          setIsPlaying(true);
                        }}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all ${
                          isSelected
                            ? "bg-[var(--accent-burgundy)]/40 border-[var(--accent-gold)] text-[var(--text-primary)] shadow-md"
                            : "bg-[var(--bg-tertiary)]/40 border-transparent hover:border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold w-4 text-center text-[var(--text-accent)]">
                            {isSelected && isPlaying ? "▶" : index + 1}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[var(--text-primary)] line-clamp-1">
                              {track.title}
                            </p>
                            <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                              {track.artist}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs text-[var(--text-muted)] font-mono">
                          {track.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
