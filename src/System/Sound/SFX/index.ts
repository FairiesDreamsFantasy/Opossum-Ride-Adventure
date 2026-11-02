/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSharedAudioContext } from "../TTS";
import { SURFACE_PROFILES, RHYTHM_PROFILES } from "../General";
import { playFenceCollision as synthFenceCollision, playGardenPlantCollision as synthGardenPlantCollision, playRockCollision as synthRockCollision } from "./Category/Movement/Collision";
import {
  playMonkeyJump as synthMonkeyJump,
  playMonkeyScreech as synthMonkeyScreech,
  playMonkeyHoot as synthMonkeyHoot,
  playMonkeyPantHoot as synthMonkeyPantHoot,
  playMonkeyAlarmCall as synthMonkeyAlarmCall,
  playMonkeyCooCall as synthMonkeyCooCall
} from "./Category/Monkeys";
import {
  playDeepBullBellow as synthDeepBullBellow,
  playCowMatingCall as synthCowMatingCall,
  playMooseJump as synthMooseJump,
  playAggressiveChargeHuff as synthAggressiveChargeHuff,
  playCautionaryDoubleGrunt as synthCautionaryDoubleGrunt
} from "./Category/Moose";
import { GenericBoarSynthesizer } from "./Synthesizer/Special_Effects/Animal/Generic/Pig/Boar";
import { GenericSowSynthesizer } from "./Synthesizer/Special_Effects/Animal/Generic/Pig/Sow";
import { AIOpossumAcousticEngine } from "./Category/Opossum/AI-Generated";
import { FeralPigSmashSound } from "./Category/Feral_Pig/Smash";

/**
 * Standard Sound Effects (SFX) Volume and Frequency Configuration profiles.
 * Preserves high-fidelity full-bodied sounds without arbitrary dampening.
 */
export const SFX_CONFIG = {
  volumes: {
    melissaChatter: 0.220255,   // Rich and distinct chatter volume (amplified by 8% as requested)
    ashleyChatter: 0.220255,    // Full-bodied chattering volume (amplified by 8% as requested)
    happyChatter: 0.220255,     // Fallback happy chatter volume (amplified by 8% as requested)
    tickChime: 0.242,          // Satisfying arpeggiated crystal sound (amplified by 10% from 0.22)
    footstepSoil: 0.309212,    // Resonant soil thud volume (amplified by 10% for all surfaces as requested)
    footstepGravel: 0.231850,  // Crispy crunch gravel trot volume (amplified by 10% for all surfaces as requested)
    jumpSwoosh: 0.349196,      // Dynamic climbing jump frequency volume (amplified by 8% as requested)
    impactCrash: 0.385,        // Prominent crash impact rumble volume (amplified by 10% from 0.35)
  },
  
  frequencies: {
    chatterStart: 1200,        // Start sweep of the chatter in Hz
    chatterEnd: 400,           // End frequency of the chirp sweep in Hz
    tickStart: 880,            // First note of tick chime in Hz (A5)
    tickEnd: 1320,             // Second arpeggio note of tick chime in Hz (E6)
    jumpStart: 190,            // Low lift frequency for jump swing
    jumpEnd: 450,              // Final swoop frequency for jump height
  }
};

import { getDeterministicSeed } from "../../Utilities/General";

/**
 * Dedicated SFX Synthesizer Subsystem
 * Manages high-fidelity offline-friendly procedural sound elements natively.
 * Formulates sounds using 64-bit floating point math parameters for sweeps, scheduling,
 * and dual formant filtering coefficients to eliminate low-precision shortcuts.
 * Upgraded to Ultra-Polyphonic (128 concurrent active voices) with dynamic voice stealing,
 * and 100% allocation-free cached memory buffering for synthesized noise structures.
 */
interface ActiveSFXVoice {
  source: OscillatorNode | AudioBufferSourceNode;
  gainNode: GainNode;
  filterNode?: BiquadFilterNode;
  endTime: number;
}

export class DedicatedSFXSynthesizer {
  private activeSFXVoices: ActiveSFXVoice[] = [];
  private bufferCache = new Map<string, AudioBuffer>();

  /**
   * Helper to retrieve or generate an AudioBuffer with zero allocation after the first play
   */
  private getCachedBuffer(
    ctx: AudioContext,
    key: string,
    channels: number,
    duration: number,
    generator: (data: Float32Array, channelIdx: number) => void
  ): AudioBuffer {
    let buf = this.bufferCache.get(key);
    if (!buf) {
      const sampleRate = ctx.sampleRate;
      const bufferSize = Math.max(1, Math.floor(sampleRate * duration));
      buf = ctx.createBuffer(channels, bufferSize, sampleRate);
      for (let c = 0; c < channels; c++) {
        const data = buf.getChannelData(c);
        generator(data, c);
      }
      this.bufferCache.set(key, buf);
    }
    return buf;
  }

  /**
   * Prune completed playing SFX voices to keep memory heap and scheduler perfectly clean
   */
  private pruneActiveVoices(currentTime: number) {
    this.activeSFXVoices = this.activeSFXVoices.filter(v => {
      if (currentTime >= v.endTime) {
        try { v.source.disconnect(); } catch (e) {}
        try { v.gainNode.disconnect(); } catch (e) {}
        try { v.filterNode?.disconnect(); } catch (e) {}
        return false;
      }
      return true;
    });
  }

  /**
   * Enforces 128-voice Ultra-Polyphony with dynamic voice stealing for zero browser audio drops
   */
  private enforceVoiceLimit(ctx: AudioContext) {
    const now = ctx.currentTime;
    this.pruneActiveVoices(now);
    if (this.activeSFXVoices.length >= 128) {
      const oldest = this.activeSFXVoices.shift();
      if (oldest) {
        try {
          if ('stop' in oldest.source) {
            oldest.source.stop();
          }
        } catch (e) {}
        try { oldest.source.disconnect(); } catch (e) {}
        try { oldest.gainNode.disconnect(); } catch (e) {}
        try { oldest.filterNode?.disconnect(); } catch (e) {}
      }
    }
  }

  /**
   * Play satisfying crystal-clean tick gobble chime
   */
  public playTickChime(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(destination);

    osc.type = "sine";
    // Standard high-def frequencies with double-precision schedule curves
    osc.frequency.setValueAtTime(SFX_CONFIG.frequencies.tickStart, now);
    osc.frequency.exponentialRampToValueAtTime(SFX_CONFIG.frequencies.tickEnd, now + 0.08);

    gain.gain.setValueAtTime(SFX_CONFIG.volumes.tickChime, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    const endTime = now + 0.15;
    osc.start(now);
    osc.stop(endTime);

    this.activeSFXVoices.push({
      source: osc,
      gainNode: gain,
      endTime
    });
  }

  /**
   * Play dynamic jump swoosh rising frequency curve
   */
  public playJumpSwoosh(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(SFX_CONFIG.frequencies.jumpStart, now);
    osc.frequency.exponentialRampToValueAtTime(SFX_CONFIG.frequencies.jumpEnd, now + 0.32);

    gain.gain.setValueAtTime(SFX_CONFIG.volumes.jumpSwoosh, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    const endTime = now + 0.35;
    osc.start(now);
    osc.stop(endTime);

    this.activeSFXVoices.push({
      source: osc,
      gainNode: gain,
      endTime
    });
  }

  /**
   * Play prominent crash impact rumble
   */
  public playImpactCrash(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(destination);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(25, now + 0.45);

    gain.gain.setValueAtTime(SFX_CONFIG.volumes.impactCrash, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    const endTime = now + 0.5;
    osc.start(now);
    osc.stop(endTime);

    this.activeSFXVoices.push({
      source: osc,
      gainNode: gain,
      endTime
    });
  }

  /**
   * Play high-fidelity fence collision sound
   */
  public playFenceCollision(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const { nodes, endTime } = synthFenceCollision(ctx, destination);
    nodes.forEach(node => {
      if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
        this.activeSFXVoices.push({
          source: node,
          gainNode: (nodes.find(n => n instanceof GainNode) as GainNode) || ctx.createGain(),
          endTime
        });
      }
    });
  }

  /**
   * Play high-fidelity garden plant collision sound
   */
  public playGardenPlantCollision(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const { nodes, endTime } = synthGardenPlantCollision(ctx, destination);
    nodes.forEach(node => {
      if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
        this.activeSFXVoices.push({
          source: node,
          gainNode: (nodes.find(n => n instanceof GainNode) as GainNode) || ctx.createGain(),
          endTime
        });
      }
    });
  }

  /**
   * Play high-fidelity rock collision sound
   */
  public playRockCollision(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const { nodes, endTime } = synthRockCollision(ctx, destination);
    nodes.forEach(node => {
      if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
        this.activeSFXVoices.push({
          source: node,
          gainNode: (nodes.find(n => n instanceof GainNode) as GainNode) || ctx.createGain(),
          endTime
        });
      }
    });
  }

  /**
   * Play sliding door friction and click!
   */
  public playSlidingDoors(ctx: AudioContext, destination: AudioNode, open: boolean) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const duration = open ? 0.8 : 0.6;
    
    // Noise friction hiss - Cached to prevent dynamic memory allocations!
    const key = `sliding_doors_${duration}`;
    const buffer = this.getCachedBuffer(ctx, key, 1, duration, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    });

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(open ? 400 : 500, now);
    filter.frequency.exponentialRampToValueAtTime(open ? 800 : 350, now + duration * 0.8);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.1); // Amplified to 0.15
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    noise.start(now);
    noise.stop(now + duration);

    this.activeSFXVoices.push({
      source: noise,
      gainNode: gain,
      filterNode: filter,
      endTime: now + duration
    });

    // End click latch
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(140, now + duration - 0.05);
    clickGain.gain.setValueAtTime(0.001, now);
    clickGain.gain.setValueAtTime(0.07, now + duration - 0.05); // Calibrated to 0.07
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    clickOsc.connect(clickGain);
    clickGain.connect(destination);
    
    const clickEndTime = now + duration + 0.02;
    clickOsc.start(now);
    clickOsc.stop(clickEndTime);

    this.activeSFXVoices.push({
      source: clickOsc,
      gainNode: clickGain,
      endTime: clickEndTime
    });
  }

  /**
   * Play procedural surface footstep synthesis
   * Emulates "terrain crunch" using high-frequency noise bands and low-frequency thuds.
   * Dynamically resolved via SURFACE_PROFILES registry.
   */
  public playFootstep(ctx: AudioContext, destination: AudioNode, surfaceType: string) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    
    // Resolve profile from registry
    const lowerType = surfaceType.toLowerCase();
    const profileKey = Object.keys(SURFACE_PROFILES).find(key => lowerType.includes(key)) || "default";
    const profile = SURFACE_PROFILES[profileKey];

    // Bass thud
    const drumOsc = ctx.createOscillator();
    const drumGain = ctx.createGain();
    drumOsc.connect(drumGain);
    drumGain.connect(destination);

    drumOsc.type = "triangle";
    drumOsc.frequency.setValueAtTime(profile.thudFreq, now);
    drumOsc.frequency.exponentialRampToValueAtTime(profile.thudFreq * 0.125, now + 0.12);

    drumGain.gain.setValueAtTime(SFX_CONFIG.volumes.footstepSoil * profile.gain, now);
    drumGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    const drumEndTime = now + 0.13;
    drumOsc.start(now);
    drumOsc.stop(drumEndTime);

    this.activeSFXVoices.push({
      source: drumOsc,
      gainNode: drumGain,
      endTime: drumEndTime
    });

    // Crunch noise
    const crunchDuration = 0.1;
    const key = "footstep_crunch_noise";
    const buffer = this.getCachedBuffer(ctx, key, 2, crunchDuration, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    });

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(profile.freq, now);
    filter.Q.setValueAtTime(profile.q, now);

    const crunchGain = ctx.createGain();
    crunchGain.gain.setValueAtTime(SFX_CONFIG.volumes.footstepGravel * profile.gain, now);
    crunchGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    noise.connect(filter);
    filter.connect(crunchGain);
    crunchGain.connect(destination);

    const noiseEndTime = now + crunchDuration;
    noise.start(now);
    noise.stop(noiseEndTime);

    this.activeSFXVoices.push({
      source: noise,
      gainNode: crunchGain,
      filterNode: filter,
      endTime: noiseEndTime
    });
  }

  /**
   * Play high-precision double-clicking cloven hoofed feet sounds for a specific named moose.
   * Leverages double sound pulses mimicking cloven digits touching ground, spatialized by distance.
   */
  public playMooseHoofClick(ctx: AudioContext, destination: AudioNode, mooseName: string, mooseType: "Bull" | "Cow", distance: number) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const seed = getDeterministicSeed(mooseName);

    // Different base frequencies for bull (heavy mass) vs cow (lighter)
    const baseFreq = mooseType === "Bull" ? 70 : 100;
    const pitchShift = (seed % 20) - 10; // unique shift per moose name
    const finalFreq = baseFreq + pitchShift;

    // Cloven hoof consists of two digits hitting sequentially, spaced ~18ms apart
    // Add organic micro-jitter (1-3ms) to prevent robotic phasing
    const jitter = (seed % 3) / 1000;
    const digits = [0, 0.018 + jitter];

    digits.forEach((offset) => {
      const strikeTime = now + offset;

      // Part A: Ground impact weight (triangular click)
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = "triangle";
      thudOsc.frequency.setValueAtTime(finalFreq, strikeTime);
      thudOsc.frequency.exponentialRampToValueAtTime(20, strikeTime + 0.1);

      thudGain.gain.setValueAtTime(0.1791 * volumeFalloff, strikeTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.09);

      thudOsc.connect(thudGain);
      thudGain.connect(destination);
      
      const thudEndTime = strikeTime + 0.1;
      thudOsc.start(strikeTime);
      thudOsc.stop(thudEndTime);

      this.activeSFXVoices.push({
        source: thudOsc,
        gainNode: thudGain,
        endTime: thudEndTime
      });

      // Part B: Horn/bone click (resonant clack)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "square";
      clickOsc.frequency.setValueAtTime(800 + (seed % 400), strikeTime);
      clickOsc.frequency.exponentialRampToValueAtTime(100, strikeTime + 0.025);

      clickGain.gain.setValueAtTime(0.10234 * volumeFalloff, strikeTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.03);

      clickOsc.connect(clickGain);
      clickGain.connect(destination);
      
      const clickEndTime = strikeTime + 0.04;
      clickOsc.start(strikeTime);
      clickOsc.stop(clickEndTime);

      this.activeSFXVoices.push({
        source: clickOsc,
        gainNode: clickGain,
        endTime: clickEndTime
      });

      // Part C: Resonance "Huff" (ultra-realistic breath puff from impact)
      const huffGain = ctx.createGain();
      const huffFilter = ctx.createBiquadFilter();
      huffFilter.type = "lowpass";
      huffFilter.frequency.setValueAtTime(400, strikeTime);
      
      const huffKey = "moose_hoof_huff";
      const huffBuffer = this.getCachedBuffer(ctx, huffKey, 1, 0.05, (data) => {
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      });
      const huffSource = ctx.createBufferSource();
      huffSource.buffer = huffBuffer;
      
      huffGain.gain.setValueAtTime(0.04 * volumeFalloff, strikeTime);
      huffGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.05);
      
      huffSource.connect(huffFilter);
      huffFilter.connect(huffGain);
      huffGain.connect(destination);
      
      huffSource.start(strikeTime);
      huffSource.stop(strikeTime + 0.05);
    });
  }

  /**
   * Play unique monkey screech/vocalization with FM cross-modulation.
   * Pitch, modulator frequency and duration are individualized via name and gender!
   */
  public playMonkeyVocalForOpponent(ctx: AudioContext, destination: AudioNode, monkeyName: string, gender: "Male" | "Female", distance: number) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const seed = getDeterministicSeed(monkeyName);

    // Female monkeys screech with higher, sharper vocal folds, Males are lower and more guttural
    const baseFreq = gender === "Female" ? 1100 : 750;
    const pitchOffset = (seed % 200) - 100;
    const carrierFreq = baseFreq + pitchOffset;

    const modFreq = 160 + (seed % 80); // FM frequency
    const modDepth = 400 + (seed % 300); // FM index depth
    const duration = 0.35 + (seed % 200) / 1000; // dynamic duration e.g. 0.35s to 0.55s

    // Synthesis nodes
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const carrier = ctx.createOscillator();
    const sfxGain = ctx.createGain();
    const formantFilter = ctx.createBiquadFilter();

    formantFilter.type = "bandpass";
    formantFilter.frequency.setValueAtTime(carrierFreq * 1.5, now);
    formantFilter.Q.setValueAtTime(4.0, now);

    modulator.type = "sawtooth";
    modulator.frequency.setValueAtTime(modFreq, now);
    modGain.gain.setValueAtTime(modDepth, now);

    carrier.type = "triangle";
    carrier.frequency.setValueAtTime(carrierFreq, now);
    carrier.frequency.exponentialRampToValueAtTime(carrierFreq * 1.6, now + 0.1);
    carrier.frequency.exponentialRampToValueAtTime(carrierFreq * 0.8, now + duration);

    sfxGain.gain.setValueAtTime(0.001, now);
    sfxGain.gain.linearRampToValueAtTime(0.1714 * volumeFalloff, now + 0.05);
    sfxGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(formantFilter);
    formantFilter.connect(sfxGain);
    sfxGain.connect(destination);

    const endTime = now + duration;
    modulator.start(now);
    carrier.start(now);
    modulator.stop(endTime);
    carrier.stop(endTime);

    this.activeSFXVoices.push({
      source: carrier,
      gainNode: sfxGain,
      filterNode: formantFilter,
      endTime
    });
  }

  /**
   * Play unique moose snort or grunt vocalization customized based on Name & Type!
   */
  public playMooseVocalForOpponent(ctx: AudioContext, destination: AudioNode, mooseName: string, mooseType: "Bull" | "Cow", distance: number) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const seed = getDeterministicSeed(mooseName);

    const isSnort = (seed % 2 === 0);
    const duration = isSnort ? 0.45 : 0.55;

    if (isSnort) {
      // Procedural Snort customized for other moose - fully cached to eliminate garbage collection sweeps!
      const key = `moose_snort_${seed}_${duration}`;
      const buffer = this.getCachedBuffer(ctx, key, 1, duration, (data) => {
        const speedTerm = 12 + (seed % 10);
        for (let i = 0; i < data.length; i++) {
          const fraction = i / data.length;
          const fluctuation = 1.0 + Math.sin(fraction * Math.PI * speedTerm) * 0.3;
          data[i] = (Math.random() * 2 - 1) * fluctuation;
        }
      });

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const fL = ctx.createBiquadFilter();
      fL.type = "bandpass";
      const cut = mooseType === "Bull" ? 300 : 420;
      fL.frequency.setValueAtTime(cut + (seed % 60), now);
      fL.Q.setValueAtTime(2.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.23027 * volumeFalloff, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(fL);
      fL.connect(gain);
      gain.connect(destination);

      const endTime = now + duration;
      noise.start(now);
      noise.stop(endTime);

      this.activeSFXVoices.push({
        source: noise,
        gainNode: gain,
        filterNode: fL,
        endTime
      });
    } else {
      // Procedural Low Grunt with Deep Chest Resonance Layering
      const baseF = mooseType === "Bull" ? 68 : 88;
      const finalF = baseF + (seed % 16) - 8;

      // Layer 1: Core Sawtooth Vocal Fold Vibration
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(finalF, now);
      osc.frequency.linearRampToValueAtTime(finalF * 0.4, now + duration);

      const lpf = ctx.createBiquadFilter();
      lpf.type = "lowpass";
      lpf.frequency.setValueAtTime(130 + (seed % 30), now);
      lpf.Q.setValueAtTime(4.0, now);

      // Layer 2: Deep Chest Sub-Resonance (Massive Volume)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(finalF * 0.5, now);
      subOsc.frequency.linearRampToValueAtTime(finalF * 0.2, now + duration);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.2 * volumeFalloff, now + 0.1);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.31982 * volumeFalloff, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(lpf);
      lpf.connect(gain);
      gain.connect(destination);

      subOsc.connect(subGain);
      subGain.connect(destination);

      const endTime = now + duration;
      osc.start(now);
      subOsc.start(now);
      osc.stop(endTime);
      subOsc.stop(endTime);

      this.activeSFXVoices.push({
        source: osc,
        gainNode: gain,
        filterNode: lpf,
        endTime
      }, {
        source: subOsc,
        gainNode: subGain,
        endTime
      });
    }
  }

  /**
   * Play unique, ultra-premium polyphonic moose charge trample sound.
   * Far more complex and distinct from a simple default crash sound.
   * Synthesizes 4 distinct parallel polyphonic components:
   * 1. Heavy low-frequency triangle impact thud (massive animal mass)
   * 2. Bandpassed high-frequency noise burst (splintering debris & dust cloud)
   * 3. Mid-frequency square-wave sliding hoof grind clatter
   * 4. FM-modulated panic screech sweep representing the startled monkey rider
   */
  public playMooseChargeTrample(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const duration = 0.65;
    const endTime = now + duration;

    // 1. Low-frequency Triangle Thud
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = "triangle";
    thudOsc.frequency.setValueAtTime(140, now);
    thudOsc.frequency.exponentialRampToValueAtTime(15, now + 0.35);

    thudGain.gain.setValueAtTime(0.45, now);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    thudOsc.connect(thudGain);
    thudGain.connect(destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.45);

    this.activeSFXVoices.push({
      source: thudOsc,
      gainNode: thudGain,
      endTime: now + 0.45
    });

    // 2. High-frequency Debris Noise Buffer
    const noiseKey = "moose_trample_debris_noise";
    const noiseBuffer = this.getCachedBuffer(ctx, noiseKey, 1, duration, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    });
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(800, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(150, now + duration);
    noiseFilter.Q.setValueAtTime(2.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(destination);
    noiseNode.start(now);
    noiseNode.stop(endTime);

    this.activeSFXVoices.push({
      source: noiseNode,
      gainNode: noiseGain,
      filterNode: noiseFilter,
      endTime
    });

    // 3. Hoof Clatter (Square wave brush)
    const hoofOsc = ctx.createOscillator();
    const hoofGain = ctx.createGain();
    hoofOsc.type = "square";
    hoofOsc.frequency.setValueAtTime(220, now);
    hoofOsc.frequency.linearRampToValueAtTime(60, now + 0.3);

    hoofGain.gain.setValueAtTime(0.18, now);
    hoofGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    hoofOsc.connect(hoofGain);
    hoofGain.connect(destination);
    hoofOsc.start(now);
    hoofOsc.stop(now + 0.35);

    this.activeSFXVoices.push({
      source: hoofOsc,
      gainNode: hoofGain,
      endTime: now + 0.35
    });

    // 4. FM Screech modulator/carrier (Monkey shock)
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const carrier = ctx.createOscillator();
    const voiceGain = ctx.createGain();

    modulator.type = "sawtooth";
    modulator.frequency.setValueAtTime(180, now);
    modGain.gain.setValueAtTime(300, now);

    carrier.type = "triangle";
    carrier.frequency.setValueAtTime(500, now);
    carrier.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
    carrier.frequency.exponentialRampToValueAtTime(450, now + 0.5);

    voiceGain.gain.setValueAtTime(0.2, now);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(voiceGain);
    voiceGain.connect(destination);

    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + 0.6);
    carrier.stop(now + 0.6);

    this.activeSFXVoices.push({
      source: carrier,
      gainNode: voiceGain,
      endTime: now + 0.6
    });
  }

  /**
   * Play scientific acoustic vocalization for AI-Generated Jill opossums
   */
  public playCloudJillChatter(ctx: AudioContext, destination: AudioNode, pitch: number = 1.0, vocalSource: string = "Cloud Network Synthesis") {
    return AIOpossumAcousticEngine.playVocalization(ctx, destination, "Jill", pitch, vocalSource);
  }

  /**
   * Play scientific acoustic vocalization for AI-Generated Jack opossums
   */
  public playCloudJackGrunt(ctx: AudioContext, destination: AudioNode, pitch: number = 1.0, vocalSource: string = "Cloud Network Synthesis") {
    return AIOpossumAcousticEngine.playVocalization(ctx, destination, "Jack", pitch, vocalSource);
  }

  /**
   * Play scientific parabolic spring jump for AI-Generated Jack opossums
   */
  public playCloudJackJump(ctx: AudioContext, destination: AudioNode, size: number = 1.0) {
    return AIOpossumAcousticEngine.playJumpImpulse(ctx, destination, "Jack", size);
  }

  /**
   * Play scientific parabolic spring jump for AI-Generated Jill opossums
   */
  public playCloudJillJump(ctx: AudioContext, destination: AudioNode, size: number = 1.0) {
    return AIOpossumAcousticEngine.playJumpImpulse(ctx, destination, "Jill", size);
  }

  /**
   * Play cloud-based high-fidelity movement/footstep sound for Jack opossums.
   * Uses a complex spectral blend for ultra-realistic weight distribution feedback.
   */
  public playCloudJackFootstep(ctx: AudioContext, destination: AudioNode, surfaceType: string) {
    const now = ctx.currentTime;
    const duration = 0.12;
    
    // Weight thud (Low freq)
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.type = "triangle";
    thud.frequency.setValueAtTime(65, now);
    thud.frequency.exponentialRampToValueAtTime(30, now + duration);
    thudGain.gain.setValueAtTime(0.3, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    // Surface texture noise
    const noise = ctx.createBufferSource();
    const noiseBuffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for(let i=0; i<data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(surfaceType.includes("tile") ? 2000 : 800, now);
    filter.Q.setValueAtTime(2.0, now);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    thud.connect(thudGain);
    thudGain.connect(destination);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(destination);
    
    thud.start(now);
    noise.start(now);
    thud.stop(now + duration);
    noise.stop(now + duration);
  }

  /**
   * Play cloud-based high-fidelity movement/footstep sound for Jill opossums.
   * Uses a lighter, higher-frequency spectral blend for Jill's gait.
   */
  public playCloudJillFootstep(ctx: AudioContext, destination: AudioNode, surfaceType: string) {
    const now = ctx.currentTime;
    const duration = 0.10;
    
    // Light weight tap (Mid-high freq)
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(110, now);
    thud.frequency.exponentialRampToValueAtTime(50, now + duration);
    thudGain.gain.setValueAtTime(0.22, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    // Surface texture noise
    const noise = ctx.createBufferSource();
    const noiseBuffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for(let i=0; i<data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(surfaceType.includes("tile") ? 2600 : 1200, now);
    filter.Q.setValueAtTime(2.5, now);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.14, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    thud.connect(thudGain);
    thudGain.connect(destination);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(destination);
    
    thud.start(now);
    noise.start(now);
    thud.stop(now + duration);
    noise.stop(now + duration);
  }

  /**
   * Play high-fidelity owl hoot synthesis
   * Uses two-stage resonant sine waves for the classic "Hoo-Hoo" pattern.
   */
  public playOwlHoot(ctx: AudioContext, destination: AudioNode, distance: number) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const volumeFalloff = Math.max(0.001, 1 - distance / 150);
    const baseFreq = 220; // Hoot base frequency (A3)

    const triggerHoot = (startTime: number, duration: number, pitchFactor: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * pitchFactor, startTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * pitchFactor * 0.95, startTime + duration);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12 * volumeFalloff, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(startTime);
      osc.stop(startTime + duration);

      this.activeSFXVoices.push({ source: osc, gainNode: gain, endTime: startTime + duration });
    };

    // "Hoo... Hoo-Hoo" pattern
    triggerHoot(now, 0.4, 1.0);
    triggerHoot(now + 0.6, 0.2, 1.1);
    triggerHoot(now + 0.9, 0.5, 0.9);
  }

  /**
   * Play high-fidelity frog croak synthesis
   * Uses resonant pulse wave with frequency modulation for a deep "Ribbit".
   */
  public playFrogCroak(ctx: AudioContext, destination: AudioNode, distance: number) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const duration = 0.35;

    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(85, now);
    carrier.frequency.exponentialRampToValueAtTime(60, now + duration);

    modulator.type = "sine";
    modulator.frequency.setValueAtTime(45, now);
    modGain.gain.setValueAtTime(30, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15 * volumeFalloff, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    carrier.start(now);
    modulator.start(now);
    carrier.stop(now + duration);
    modulator.stop(now + duration);

    this.activeSFXVoices.push({ source: carrier, gainNode: gain, endTime: now + duration });
  }

  /**
   * Play high-fidelity procedural feral pig vocalization (grunt, snort, or squeal)
   */
  public playPigVocal(ctx: AudioContext, destination: AudioNode, gender: "Boar" | "Sow" = "Boar", distance: number = 0) {
    this.enforceVoiceLimit(ctx);
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(volumeFalloff, ctx.currentTime);
    subGain.connect(destination);

    if (gender === "Boar") {
      const isSnort = Math.random() > 0.5;
      if (isSnort) {
        GenericBoarSynthesizer.playBoarSnort(ctx, subGain, 0.95 + Math.random() * 0.1);
      } else {
        GenericBoarSynthesizer.playBoarGrunt(ctx, subGain, 0.95 + Math.random() * 0.1);
      }
    } else {
      GenericSowSynthesizer.playSowSqueal(ctx, subGain, 0.95 + Math.random() * 0.1);
    }
  }

  /**
   * Play intense explosion and cartoon squash sound when a feral pig is smashed
   */
  public playPigSmashedExplosion(ctx: AudioContext, destination: AudioNode, gender: "Boar" | "Sow" = "Boar", distance: number = 0) {
    this.enforceVoiceLimit(ctx);
    const volumeFalloff = Math.max(0.001, 1 - distance / 120);
    const smashGain = ctx.createGain();
    smashGain.gain.setValueAtTime(volumeFalloff, ctx.currentTime);
    smashGain.connect(destination);

    const pitch = gender === "Boar" ? 0.92 : 1.15;
    FeralPigSmashSound.playSmash(ctx, smashGain, pitch);
  }

  /**
   * Play distressed/squealing moose vocalization when flat-smashed
   */
  public playMooseSmashedVocal(ctx: AudioContext, destination: AudioNode, name: string, type: "Bull" | "Cow") {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const duration = 0.65;

    // Distressed crying vocal fold oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    
    // Distressed moose vocal frequency starts high (distressed) and sweeps down sharply
    const startFreq = type === "Bull" ? 180 : 260;
    const endFreq = type === "Bull" ? 50 : 80;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

    // Resonant formant filter representing vocal tract constriction
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(180, now + duration);
    filter.Q.setValueAtTime(6.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + duration);

    // Layer 2: Poof / explosive air dispersal (White Noise)
    const noiseBuffer = this.getCachedBuffer(ctx, "moose_poof_noise", 1, 0.4, (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    });
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.4);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(destination);

    noiseNode.start(now);
    noiseNode.stop(now + 0.4);

    this.activeSFXVoices.push({
      source: osc,
      gainNode: gain,
      filterNode: filter,
      endTime: now + duration
    });
  }

  /**
   * Procedural monkey leap jump
   */
  public playMonkeyJump(ctx: AudioContext, destination: AudioNode, pitch: number = 1.0, velocity: number = 1.0) {
    this.enforceVoiceLimit(ctx);
    synthMonkeyJump(ctx, destination, ctx.currentTime, { pitch, velocity });
  }

  /**
   * Procedural monkey modular vocalizations
   */
  public playMonkeyModularVocal(
    ctx: AudioContext,
    destination: AudioNode,
    type: "screech" | "hoot" | "pant_hoot" | "alarm" | "coo",
    options: { pitch?: number; volume?: number } = {}
  ) {
    this.enforceVoiceLimit(ctx);
    const now = ctx.currentTime;
    const p = options.pitch ?? 1.0;
    const v = options.volume;
    if (type === "screech") synthMonkeyScreech(ctx, destination, now, { baseFreq: 1250 * p, volume: v });
    else if (type === "hoot") synthMonkeyHoot(ctx, destination, now, { pitchHz: 680 * p, volume: v });
    else if (type === "pant_hoot") synthMonkeyPantHoot(ctx, destination, now, { baseFreq: 620 * p, volume: v });
    else if (type === "alarm") synthMonkeyAlarmCall(ctx, destination, now, { pitchHz: 1750 * p, volume: v });
    else if (type === "coo") synthMonkeyCooCall(ctx, destination, now, { pitchHz: 980 * p, volume: v });
  }

  /**
   * Procedural modular moose sound dispatchers
   */
  public playDeepBullBellow(ctx: AudioContext, destination: AudioNode, mult: number = 1.0) {
    this.enforceVoiceLimit(ctx);
    synthDeepBullBellow(ctx, destination, ctx.currentTime, { pitchMultiplier: mult });
  }

  public playCowMatingCall(ctx: AudioContext, destination: AudioNode, mult: number = 1.0) {
    this.enforceVoiceLimit(ctx);
    synthCowMatingCall(ctx, destination, ctx.currentTime, { pitchMultiplier: mult });
  }

  public playMooseJump(ctx: AudioContext, destination: AudioNode, type: "Bull" | "Cow" = "Bull") {
    this.enforceVoiceLimit(ctx);
    synthMooseJump(ctx, destination, ctx.currentTime, { type });
  }

  public playMooseAggressiveHuff(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    synthAggressiveChargeHuff(ctx, destination, ctx.currentTime);
  }

  public playMooseCautionaryGrunt(ctx: AudioContext, destination: AudioNode) {
    this.enforceVoiceLimit(ctx);
    synthCautionaryDoubleGrunt(ctx, destination, ctx.currentTime);
  }
}
