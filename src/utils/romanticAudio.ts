// Web Audio API Sound Synthesizer for Romantic Ambiance and Melodies
// 100% Free, Zero External Dependencies, Works in all modern browsers

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  // Ambient nodes
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private crackleNode: AudioNode | null = null;
  private crackleGain: GainNode | null = null;
  private cafeNode: AudioNode | null = null;
  private cafeGain: GainNode | null = null;

  // Music sequence playback
  private activeNoteTimeouts: number[] = [];
  private isMusicPlaying: boolean = false;
  private currentTrackId: string = "";

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a warm, mellow acoustic/piano note
  public playAcousticNote(freq: number, duration: number = 1.8, velocity: number = 0.5) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;

    // Dual oscillator: fundamental sine + warm triangle for acoustic warmth
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const noteGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic
    osc2.detune.setValueAtTime(4, now); // slight chorus warmth

    // Low-pass filter for cozy intimate tone
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    // Warm pluck envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.45, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Romantic acoustic chord progression sequences
  private trackChords: Record<string, number[][]> = {
    "1": [
      // Humsafar: Warm Acoustic Love (Db major / Bbm romance)
      [277.18, 349.23, 415.30, 554.37], // Db
      [233.08, 277.18, 349.23, 466.16], // Bbm
      [311.13, 369.99, 466.16, 622.25], // Ebm
      [207.65, 261.63, 311.13, 415.30], // Ab7
    ],
    "2": [
      // Tum Se Hi: Rainy Acoustic (G - Em - C - D)
      [196.00, 246.94, 293.66, 392.00], // G
      [164.81, 246.94, 329.63, 392.00], // Em
      [130.81, 196.00, 261.63, 329.63], // C
      [146.83, 220.00, 293.66, 369.99], // D
    ],
    "3": [
      // Pehli Nazar Mein: Café Lounge Romance (F - C - Dm - Bb)
      [174.61, 220.00, 261.63, 349.23], // F
      [130.81, 196.00, 261.63, 329.63], // C
      [146.83, 220.00, 261.63, 349.23], // Dm
      [116.54, 174.61, 233.08, 293.66], // Bb
    ],
    "4": [
      // Raataan Lambiyan: Lofi Evening (Am - F - C - G)
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 220.00, 261.63, 349.23], // F
      [261.63, 329.63, 392.00, 523.25], // C
      [196.00, 246.94, 293.66, 392.00], // G
    ],
    "5": [
      // Kesariya: Soft Piano Melody (C - G - Am - F)
      [261.63, 329.63, 392.00, 523.25], // C
      [196.00, 246.94, 293.66, 392.00], // G
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 220.00, 261.63, 349.23], // F
    ],
  };

  // Start continuous romantic acoustic melody
  public playRomanticMelody(trackId: string, onBeat?: (bar: number) => void) {
    this.stopRomanticMelody();
    const ctx = this.getContext();
    if (!ctx) return;

    this.isMusicPlaying = true;
    this.currentTrackId = trackId;

    const chords = this.trackChords[trackId] || this.trackChords["1"];
    let chordIdx = 0;

    const step = () => {
      if (!this.isMusicPlaying) return;

      const currentChord = chords[chordIdx % chords.length];
      if (onBeat) onBeat(chordIdx);

      // Play arpeggio
      currentChord.forEach((freq, noteIdx) => {
        const timeout = window.setTimeout(() => {
          if (this.isMusicPlaying) {
            this.playAcousticNote(freq, 2.2, 0.45);
          }
        }, noteIdx * 450);
        this.activeNoteTimeouts.push(timeout);
      });

      // Soft bass root note
      const bassFreq = currentChord[0] / 2;
      const bassTimeout = window.setTimeout(() => {
        if (this.isMusicPlaying) {
          this.playAcousticNote(bassFreq, 3.2, 0.6);
        }
      }, 50);
      this.activeNoteTimeouts.push(bassTimeout);

      chordIdx++;
      const nextLoop = window.setTimeout(step, 2400);
      this.activeNoteTimeouts.push(nextLoop);
    };

    step();
  }

  public stopRomanticMelody() {
    this.isMusicPlaying = false;
    this.activeNoteTimeouts.forEach((t) => clearTimeout(t));
    this.activeNoteTimeouts = [];
  }

  // Realistic Ambient Rain Generator
  public setRain(enabled: boolean, volume: number = 0.35) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (!enabled) {
      if (this.rainGain) {
        this.rainGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      }
      return;
    }

    if (!this.rainNode) {
      // 5 seconds buffer of pink/brown noise for rain drops
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      this.rainGain = ctx.createGain();
      this.rainGain.gain.setValueAtTime(0, ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      noise.start();
      this.rainNode = noise;
    }

    if (this.rainGain) {
      this.rainGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.4);
    }
  }

  // Realistic Candle / Fireplace Crackle Generator
  public setCandleCrackle(enabled: boolean, volume: number = 0.25) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    if (!enabled) {
      if (this.crackleGain) {
        this.crackleGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      }
      return;
    }

    if (!this.crackleNode) {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Random micro pops and crackles
        if (Math.random() < 0.003) {
          data[i] = (Math.random() * 2 - 1) * 0.8;
        } else {
          data[i] = 0;
        }
      }

      const crackle = ctx.createBufferSource();
      crackle.buffer = buffer;
      crackle.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      this.crackleGain = ctx.createGain();
      this.crackleGain.gain.setValueAtTime(0, ctx.currentTime);

      crackle.connect(filter);
      filter.connect(this.crackleGain);
      this.crackleGain.connect(this.masterGain);
      crackle.start();
      this.crackleNode = crackle;
    }

    if (this.crackleGain) {
      this.crackleGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.3);
    }
  }

  // Candle blow puff / relight chime
  public playCandleSpark(relight: boolean = true) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    if (relight) {
      // Warm magical chime
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        window.setTimeout(() => this.playAcousticNote(freq, 1.2, 0.35), idx * 80);
      });
    } else {
      // Soft gentle whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  }

  public setMasterVolume(vol: number) {
    const ctx = this.getContext();
    if (this.masterGain && ctx) {
      this.masterGain.gain.setTargetAtTime(vol, ctx.currentTime, 0.1);
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }
}

export const romanticAudio = new RomanticSoundEngine();
