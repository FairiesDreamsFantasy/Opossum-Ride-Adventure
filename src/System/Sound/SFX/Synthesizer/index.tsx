import { getSharedAudioContext } from "../../TTS";

export * from "./Classic_Synthesizer";
export * from "./Ultra_Modules";

/**
 * SFX Synthesizer Module
 * Specialized in generating transient sounds, impacts, and character 
 * vocalizations via procedural synthesis.
 */
export class SFXSynthesizer {
  private ctx: AudioContext | null = null;

  constructor() {
    this.ctx = getSharedAudioContext();
  }

  triggerChirp(freq: number = 880, duration: number = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  /**
   * Generates a procedurally synthesized footstep sound.
   * @param ctx AudioContext to use
   * @param destination Destination node
   * @param surfaceType Type of surface for acoustic profiling
   */
  public playFootstep(ctx: AudioContext, destination: AudioNode, surfaceType: string) {
    const now = ctx.currentTime;
    
    // Impact component (Thump)
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(120, now);
    thump.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    thumpGain.gain.setValueAtTime(0.08, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    // Texture component (Crunch/Grit)
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    // Filter texture based on surface
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    if (surfaceType === "stone") {
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(5, now);
    } else if (surfaceType === "grass") {
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(1, now);
    } else {
      filter.frequency.setValueAtTime(800, now);
    }

    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    thump.connect(thumpGain);
    thumpGain.connect(destination);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(destination);

    thump.start(now);
    thump.stop(now + 0.12);
    noise.start(now);
    noise.stop(now + 0.1);
  }
}
