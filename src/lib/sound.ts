// =========================================================================
// SOUND ENGINE — synthesized UI feedback + a living ambient "garden breeze".
// Everything is generated via the Web Audio API (no audio files): a gentle
// airy breeze, a calm low pad, drifting shimmer, and sporadic bird chirps.
// The bed routes through an AnalyserNode so a visualizer can read real data.
// =========================================================================

type LFO = { osc: OscillatorNode; depth: GainNode };

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private freq: Uint8Array<ArrayBuffer> | null = null;
  private time: Uint8Array<ArrayBuffer> | null = null;

  // Ambient graph state
  private ambientGain: GainNode | null = null;
  private ambientNodes: AudioScheduledSourceNode[] = [];
  private ambientPlaying = false;
  private ambientStopTimer: ReturnType<typeof setTimeout> | null = null;
  private birdTimer: ReturnType<typeof setTimeout> | null = null;

  /** Lazily create the AudioContext (browsers require a user gesture). */
  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      // Everything flows: master -> analyser -> speakers
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.freq = new Uint8Array(
        new ArrayBuffer(this.analyser.frequencyBinCount),
      );
      this.time = new Uint8Array(new ArrayBuffer(this.analyser.fftSize));
      this.master.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** Call from the first user gesture so audio is unlocked. */
  unlock() {
    this.ensure();
  }

  // --- Visualizer accessors -------------------------------------------------
  getAnalyser() {
    return this.analyser;
  }
  getByteFreq(): Uint8Array | null {
    if (!this.analyser || !this.freq) return null;
    this.analyser.getByteFrequencyData(this.freq);
    return this.freq;
  }
  getByteTime(): Uint8Array | null {
    if (!this.analyser || !this.time) return null;
    this.analyser.getByteTimeDomainData(this.time);
    return this.time;
  }

  // --- Noise helpers --------------------------------------------------------
  private noiseBuffer(ctx: AudioContext, duration = 0.2) {
    const len = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  // --- The ambient "garden breeze + birds" bed -----------------------------
  startAmbient() {
    if (this.ambientPlaying) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    if (this.ambientStopTimer) {
      clearTimeout(this.ambientStopTimer);
      this.ambientStopTimer = null;
    }
    const now = ctx.currentTime;
    this.ambientNodes = [];

    // Breathing master gain for the whole bed
    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.0001, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.5, now + 4);
    this.ambientGain.connect(this.master);
    // Slow swell of the entire bed — the "breath"
    this.addLFO(ctx, 0.06, this.ambientGain.gain, 0.4, 0.14, now);

    // AIRY BREEZE — white noise band-passed into the airy mid-high band so it
    // reads as wind rustling through leaves, not a low rumble. The bandpass
    // centre is gently swept to mimic soft gusts.
    const breeze = ctx.createBufferSource();
    breeze.buffer = this.noiseBuffer(ctx, 6);
    breeze.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 480;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1700;
    bp.Q.value = 0.7;
    const bg = ctx.createGain();
    bg.gain.value = 0.14;
    breeze.connect(hp).connect(bp).connect(bg).connect(this.ambientGain);
    this.addLFO(ctx, 0.07, bp.frequency, 1700, 900, now); // gusty sweep
    this.addLFO(ctx, 0.1, bg.gain, 0.12, 0.07, now); // gust volume
    breeze.start(now);
    this.ambientNodes.push(breeze);

    // Distant airy layer — a softer, higher whisper for depth.
    const whisper = ctx.createBufferSource();
    whisper.buffer = this.noiseBuffer(ctx, 6);
    whisper.loop = true;
    const wp = ctx.createBiquadFilter();
    wp.type = "bandpass";
    wp.frequency.value = 3200;
    wp.Q.value = 0.5;
    const wg = ctx.createGain();
    wg.gain.value = 0.05;
    whisper.connect(wp).connect(wg).connect(this.ambientGain);
    this.addLFO(ctx, 0.05, wg.gain, 0.04, 0.035, now);
    whisper.start(now);
    this.ambientNodes.push(whisper);

    // CALM PAD — a soft open chord (C2 G2 C3) of detuned sine voices, each
    // breathing at its own slow rate, giving the bed a warm resting tone.
    const chord = [65.41, 98.0, 130.81];
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.0001, now);
    padGain.gain.linearRampToValueAtTime(0.08, now + 6);
    padGain.connect(this.ambientGain);
    chord.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = (i - 1) * 4;
      const g = ctx.createGain();
      const base = 0.18 / chord.length;
      g.gain.value = base;
      osc.connect(g).connect(padGain);
      osc.start(now);
      this.addLFO(ctx, 0.05 + i * 0.013, g.gain, base, base * 0.5, now);
      this.ambientNodes.push(osc);
    });

    // SHIMMER — a single high sine that drifts in and out like distant light.
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = 523.25;
    const shGain = ctx.createGain();
    shGain.gain.setValueAtTime(0.0001, now);
    shGain.gain.linearRampToValueAtTime(0.016, now + 8);
    shimmer.connect(shGain).connect(this.ambientGain);
    this.addLFO(ctx, 0.04, shGain.gain, 0.013, 0.011, now);
    shimmer.start(now);
    this.ambientNodes.push(shimmer);

    this.ambientPlaying = true;

    // BIRDS — sporadic, randomized chirps scheduled over the bed.
    this.birdTimer = setTimeout(() => this.scheduleBird(), 2500);
  }

  stopAmbient() {
    if (this.birdTimer) {
      clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }
    if (!this.ambientPlaying || !this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.cancelScheduledValues(now);
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.7);
    const nodes = this.ambientNodes;
    this.ambientStopTimer = setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
        try {
          n.disconnect();
        } catch {
          /* noop */
        }
      });
      this.ambientGain?.disconnect();
      this.ambientNodes = [];
      this.ambientStopTimer = null;
    }, 760);
    this.ambientPlaying = false;
  }

  isAmbientPlaying() {
    return this.ambientPlaying;
  }

  /** Recurring, randomized bird chirp while the bed plays. */
  private scheduleBird() {
    if (!this.ambientPlaying || !this.ctx) return;
    this.chirp(this.ctx, this.ctx.currentTime + 0.05);
    const next = 3500 + Math.random() * 6500;
    this.birdTimer = setTimeout(() => this.scheduleBird(), next);
  }

  /** A short trill of bright, pitch-gilded notes. */
  private chirp(ctx: AudioContext, start: number) {
    if (!this.ambientGain) return;
    const base = 2400 + Math.random() * 1500;
    const notes = 2 + Math.floor(Math.random() * 3);
    let t = start;
    for (let i = 0; i < notes; i++) {
      this.birdNote(ctx, t, base * (1 + (Math.random() - 0.5) * 0.18));
      t += 0.07 + Math.random() * 0.06;
    }
  }

  private birdNote(ctx: AudioContext, start: number, freq: number) {
    if (!this.ambientGain) return;
    const osc = ctx.createOscillator();
    osc.type = Math.random() < 0.5 ? "sine" : "triangle";
    const g = ctx.createGain();
    const dur = 0.06 + Math.random() * 0.05;
    const target = freq * (1.1 + Math.random() * 0.25); // upward glide
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.exponentialRampToValueAtTime(target, start + dur);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.045, start + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(this.ambientGain);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  /** Build an LFO that gently modulates an AudioParam around `base` ± `depth`. */
  private addLFO(
    ctx: AudioContext,
    rate: number,
    param: AudioParam,
    base: number,
    depth: number,
    start: number,
  ) {
    const lfo: LFO = {
      osc: ctx.createOscillator(),
      depth: ctx.createGain(),
    };
    lfo.osc.frequency.value = rate;
    lfo.osc.type = "sine";
    lfo.depth.gain.value = depth;
    param.setValueAtTime(base, start);
    lfo.osc.connect(lfo.depth).connect(param);
    lfo.osc.start(start);
    this.ambientNodes.push(lfo.osc);
  }

  // --- UI feedback sounds ---------------------------------------------------
  /** The "pew" — a quick bright upward chirp for every hover. */
  pew() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(1180, t + 0.11);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.1, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.14);
  }

  /** A satisfying percussive click used on every actionable press. */
  click() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;

    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer(ctx, 0.12);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(2200, t);
    bp.Q.value = 0.9;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.16, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    noise.connect(bp).connect(ng).connect(this.master);
    noise.start(t);
    noise.stop(t + 0.12);

    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.11, t + 0.004);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    osc.connect(og).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.11);
  }

  /** A filtered noise sweep for big reveals / section entry. */
  whoosh() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer(ctx, 0.6);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(300, t);
    lp.frequency.exponentialRampToValueAtTime(4000, t + 0.35);
    lp.frequency.exponentialRampToValueAtTime(500, t + 0.6);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    noise.connect(lp).connect(g).connect(this.master);
    noise.start(t);
    noise.stop(t + 0.62);
  }

  /** A bright two-note chime for celebratory moments (CTA, success). */
  chime() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    [880, 1320].forEach((f, i) => {
      const start = t + i * 0.09;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, start);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.09, start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
      osc.connect(g).connect(this.master!);
      osc.start(start);
      osc.stop(start + 0.34);
    });
  }
}

export const sound = new SoundEngine();
