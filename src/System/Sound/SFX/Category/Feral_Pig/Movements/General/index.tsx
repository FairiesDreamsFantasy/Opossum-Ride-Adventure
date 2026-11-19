/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FeralPigSurfaceAcoustic = "soil" | "stone" | "grass" | "dirt" | "wood";

interface SurfaceClovenProfile {
  bodyHz: number;
  transientHz: number;
  decaySec: number;
  gritLevel: number;
}

const SURFACE_CLOVEN_PROFILES: Record<FeralPigSurfaceAcoustic, SurfaceClovenProfile> = {
  soil: { bodyHz: 94, transientHz: 480, decaySec: 0.085, gritLevel: 0.18 },
  grass: { bodyHz: 78, transientHz: 390, decaySec: 0.095, gritLevel: 0.24 },
  dirt: { bodyHz: 105, transientHz: 620, decaySec: 0.08, gritLevel: 0.28 },
  stone: { bodyHz: 148, transientHz: 1380, decaySec: 0.068, gritLevel: 0.22 },
  wood: { bodyHz: 122, transientHz: 760, decaySec: 0.092, gritLevel: 0.14 }
};

function scheduleClovenHoofStrike(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  pitch: number,
  gainLevel: number,
  surface: FeralPigSurfaceAcoustic
): void {
  const profile = SURFACE_CLOVEN_PROFILES[surface] || SURFACE_CLOVEN_PROFILES.soil;

  // 1. Sub-earth cloven hoof thud
  const osc = context.createOscillator();
  const bodyFilter = context.createBiquadFilter();
  const bodyGain = context.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(profile.bodyHz * 1.45 * pitch, startTime);
  osc.frequency.exponentialRampToValueAtTime(Math.max(32, profile.bodyHz * 0.55 * pitch), startTime + profile.decaySec);

  bodyFilter.type = "lowpass";
  bodyFilter.frequency.setValueAtTime(profile.transientHz * 1.2, startTime);

  bodyGain.gain.setValueAtTime(0.001, startTime);
  bodyGain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.008);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, startTime + profile.decaySec);

  osc.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(destination);

  osc.start(startTime);
  osc.stop(startTime + profile.decaySec + 0.015);

  // 2. Terrain contact grit/scrape transient for crisp audibility
  const gritDur = Math.max(0.035, profile.decaySec * 0.72);
  const sampleCount = Math.max(1, Math.floor(context.sampleRate * gritDur));
  const noiseBuf = context.createBuffer(1, sampleCount, context.sampleRate);
  const ch = noiseBuf.getChannelData(0);
  for (let i = 0; i < sampleCount; i++) {
    ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleCount * 0.36));
  }

  const noiseSrc = context.createBufferSource();
  noiseSrc.buffer = noiseBuf;
  const gritFilter = context.createBiquadFilter();
  gritFilter.type = "bandpass";
  gritFilter.frequency.setValueAtTime(profile.transientHz * pitch, startTime);
  gritFilter.Q.setValueAtTime(1.8, startTime);

  const gritGain = context.createGain();
  gritGain.gain.setValueAtTime(0.001, startTime);
  gritGain.gain.linearRampToValueAtTime(gainLevel * profile.gritLevel * 2.1, startTime + 0.005);
  gritGain.gain.exponentialRampToValueAtTime(0.0001, startTime + gritDur);

  noiseSrc.connect(gritFilter);
  gritFilter.connect(gritGain);
  gritGain.connect(destination);
  noiseSrc.start(startTime);
}

export class FeralPigMovementSound {
  /**
   * Deliberate 2-step foraging walk with soft earth rustle.
   */
  public static playWalk(
    context: AudioContext,
    destination: AudioNode,
    pitch: number = 1.0,
    surface: FeralPigSurfaceAcoustic = "soil"
  ): void {
    const now = context.currentTime;
    scheduleClovenHoofStrike(context, destination, now, pitch * 0.96, 0.24, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.145, pitch * 1.04, 0.21, surface);
  }

  /**
   * Brisk paired diagonal feral pig trot footfalls.
   */
  public static playTrot(
    context: AudioContext,
    destination: AudioNode,
    pitch: number = 1.0,
    surface: FeralPigSurfaceAcoustic = "soil"
  ): void {
    const now = context.currentTime;
    scheduleClovenHoofStrike(context, destination, now, pitch * 1.02, 0.28, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.085, pitch * 0.94, 0.25, surface);
  }

  /**
   * Rapid 3-beat bounding wild pig gallop cadence.
   */
  public static playGallop(
    context: AudioContext,
    destination: AudioNode,
    pitch: number = 1.0,
    surface: FeralPigSurfaceAcoustic = "dirt"
  ): void {
    const now = context.currentTime;
    scheduleClovenHoofStrike(context, destination, now, pitch * 1.06, 0.3, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.068, pitch * 1.12, 0.27, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.132, pitch * 0.96, 0.33, surface);
  }

  /**
   * Heavy thundering charge rush combining deep double-hoof strikes and aggressive nasal rush burst.
   */
  public static playCharge(
    context: AudioContext,
    destination: AudioNode,
    pitch: number = 1.0,
    surface: FeralPigSurfaceAcoustic = "dirt",
    gender: "Boar" | "Sow" = "Boar"
  ): void {
    const now = context.currentTime;
    scheduleClovenHoofStrike(context, destination, now, pitch * 0.9, 0.36, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.055, pitch * 1.08, 0.32, surface);
    scheduleClovenHoofStrike(context, destination, now + 0.105, pitch * 0.86, 0.38, surface);

    // Aggressive rushing charge huff layered over heavy hoofbeats
    const osc = context.createOscillator();
    const filter = context.createBiquadFilter();
    const huffGain = context.createGain();
    const baseHz = (gender === "Boar" ? 115 : 165) * pitch;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseHz, now);
    osc.frequency.exponentialRampToValueAtTime(baseHz * 0.65, now + 0.16);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(gender === "Boar" ? 440 : 620, now);
    filter.Q.setValueAtTime(3.2, now);

    huffGain.gain.setValueAtTime(0.001, now);
    huffGain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    huffGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);

    osc.connect(filter);
    filter.connect(huffGain);
    huffGain.connect(destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }
}
