/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SurfaceImpactResonance — Material Physics & Acoustic Impact Solver
 * Resolves resonant frequency, Q-factor, decay envelope, crunch noise bandwidth,
 * and mass-velocity kinetic impact gain across all manor, courtyard, mine, and wilderness terrains.
 */

import { AcousticStabilizer } from "./AcousticStabilizer";

export interface SurfaceAcousticResonanceProfile {
  surfaceKey: string;
  fundamentalFreqHz: number;
  transientFreqHz: number;
  qFactor: number;
  decayTimeSeconds: number;
  highTransientGain: number;
  restitution: number;
  baseGain: number;
}

const SURFACE_RESONANCE_TABLE: Record<string, SurfaceAcousticResonanceProfile> = {
  ceramic:   { surfaceKey: "ceramic",   fundamentalFreqHz: 265, transientFreqHz: 2400, qFactor: 6.4, decayTimeSeconds: 0.036, highTransientGain: 0.94, restitution: 0.62, baseGain: 1.00 },
  tile:      { surfaceKey: "tile",      fundamentalFreqHz: 255, transientFreqHz: 2400, qFactor: 6.0, decayTimeSeconds: 0.038, highTransientGain: 0.92, restitution: 0.60, baseGain: 1.00 },
  deck:      { surfaceKey: "deck",      fundamentalFreqHz: 150, transientFreqHz: 350,  qFactor: 2.8, decayTimeSeconds: 0.068, highTransientGain: 0.72, restitution: 0.42, baseGain: 1.10 },
  wood:      { surfaceKey: "wood",      fundamentalFreqHz: 160, transientFreqHz: 350,  qFactor: 4.2, decayTimeSeconds: 0.065, highTransientGain: 0.75, restitution: 0.45, baseGain: 1.10 },
  hardwood:  { surfaceKey: "hardwood",  fundamentalFreqHz: 175, transientFreqHz: 400,  qFactor: 4.6, decayTimeSeconds: 0.060, highTransientGain: 0.78, restitution: 0.48, baseGain: 1.15 },
  carpet:    { surfaceKey: "carpet",    fundamentalFreqHz: 68,  transientFreqHz: 200,  qFactor: 1.5, decayTimeSeconds: 0.028, highTransientGain: 0.25, restitution: 0.14, baseGain: 0.80 },
  asphalt:   { surfaceKey: "asphalt",   fundamentalFreqHz: 210, transientFreqHz: 1100, qFactor: 3.8, decayTimeSeconds: 0.032, highTransientGain: 0.82, restitution: 0.54, baseGain: 1.05 },
  slate:     { surfaceKey: "slate",     fundamentalFreqHz: 270, transientFreqHz: 1650, qFactor: 7.4, decayTimeSeconds: 0.036, highTransientGain: 0.91, restitution: 0.64, baseGain: 1.18 },
  basalt:    { surfaceKey: "basalt",    fundamentalFreqHz: 285, transientFreqHz: 1700, qFactor: 7.9, decayTimeSeconds: 0.034, highTransientGain: 0.93, restitution: 0.66, baseGain: 1.22 },
  limestone: { surfaceKey: "limestone", fundamentalFreqHz: 260, transientFreqHz: 1640, qFactor: 7.2, decayTimeSeconds: 0.037, highTransientGain: 0.89, restitution: 0.61, baseGain: 1.20 },
  stone:     { surfaceKey: "stone",     fundamentalFreqHz: 280, transientFreqHz: 1600, qFactor: 8.5, decayTimeSeconds: 0.035, highTransientGain: 0.95, restitution: 0.65, baseGain: 1.20 },
  granite:   { surfaceKey: "granite",   fundamentalFreqHz: 295, transientFreqHz: 1750, qFactor: 8.8, decayTimeSeconds: 0.033, highTransientGain: 0.96, restitution: 0.70, baseGain: 1.25 },
  marble:    { surfaceKey: "marble",    fundamentalFreqHz: 310, transientFreqHz: 1900, qFactor: 9.2, decayTimeSeconds: 0.034, highTransientGain: 0.98, restitution: 0.72, baseGain: 1.30 },
  slab:      { surfaceKey: "slab",      fundamentalFreqHz: 272, transientFreqHz: 1600, qFactor: 7.8, decayTimeSeconds: 0.035, highTransientGain: 0.92, restitution: 0.64, baseGain: 1.20 },
  moss:      { surfaceKey: "moss",      fundamentalFreqHz: 72,  transientFreqHz: 320,  qFactor: 1.2, decayTimeSeconds: 0.030, highTransientGain: 0.28, restitution: 0.16, baseGain: 0.78 },
  peat:      { surfaceKey: "peat",      fundamentalFreqHz: 78,  transientFreqHz: 380,  qFactor: 1.3, decayTimeSeconds: 0.032, highTransientGain: 0.31, restitution: 0.18, baseGain: 0.82 },
  silt:      { surfaceKey: "silt",      fundamentalFreqHz: 86,  transientFreqHz: 460,  qFactor: 1.5, decayTimeSeconds: 0.031, highTransientGain: 0.34, restitution: 0.22, baseGain: 0.85 },
  soil:      { surfaceKey: "soil",      fundamentalFreqHz: 95,  transientFreqHz: 1200, qFactor: 1.8, decayTimeSeconds: 0.025, highTransientGain: 0.42, restitution: 0.26, baseGain: 1.00 },
  dirt:      { surfaceKey: "dirt",      fundamentalFreqHz: 105, transientFreqHz: 1150, qFactor: 2.1, decayTimeSeconds: 0.028, highTransientGain: 0.46, restitution: 0.28, baseGain: 1.00 },
  grass:     { surfaceKey: "grass",     fundamentalFreqHz: 82,  transientFreqHz: 400,  qFactor: 1.4, decayTimeSeconds: 0.026, highTransientGain: 0.35, restitution: 0.20, baseGain: 0.85 },
  mulch:     { surfaceKey: "mulch",     fundamentalFreqHz: 88,  transientFreqHz: 450,  qFactor: 1.6, decayTimeSeconds: 0.030, highTransientGain: 0.40, restitution: 0.22, baseGain: 0.90 },
  gravel:    { surfaceKey: "gravel",    fundamentalFreqHz: 130, transientFreqHz: 1800, qFactor: 4.5, decayTimeSeconds: 0.042, highTransientGain: 0.84, restitution: 0.32, baseGain: 1.10 },
  salt:      { surfaceKey: "salt",      fundamentalFreqHz: 220, transientFreqHz: 1480, qFactor: 5.0, decayTimeSeconds: 0.040, highTransientGain: 0.85, restitution: 0.48, baseGain: 1.12 },
  snow:      { surfaceKey: "snow",      fundamentalFreqHz: 60,  transientFreqHz: 300,  qFactor: 0.9, decayTimeSeconds: 0.044, highTransientGain: 0.30, restitution: 0.10, baseGain: 0.70 },
  sand:      { surfaceKey: "sand",      fundamentalFreqHz: 76,  transientFreqHz: 500,  qFactor: 1.3, decayTimeSeconds: 0.036, highTransientGain: 0.38, restitution: 0.15, baseGain: 0.80 },
  ice:       { surfaceKey: "ice",       fundamentalFreqHz: 330, transientFreqHz: 2200, qFactor: 6.8, decayTimeSeconds: 0.039, highTransientGain: 0.94, restitution: 0.68, baseGain: 1.35 }
};

export class SurfaceImpactResonance {
  /**
   * Resolves a surface resonance profile from a material keyword or full surface description.
   */
  public static getProfile(surface: string): SurfaceAcousticResonanceProfile {
    const normalized = (surface || "soil").toLowerCase();
    if (SURFACE_RESONANCE_TABLE[normalized]) {
      return SURFACE_RESONANCE_TABLE[normalized];
    }
    const matchedKey = Object.keys(SURFACE_RESONANCE_TABLE).find((k) => normalized.includes(k));
    return matchedKey ? SURFACE_RESONANCE_TABLE[matchedKey] : SURFACE_RESONANCE_TABLE.soil;
  }

  /**
   * Computes physics-scaled impact amplitude and pitch shift from mass (kg) and impact speed (m/s).
   * Kinetic acoustic coupling scales proportionally to sqrt(0.5 * m * v^2) normalized against 85 kg * 5 m/s.
   */
  public static computeKineticImpactAcoustics(
    surface: string,
    massKg: number,
    impactSpeedMs: number
  ): {
    profile: SurfaceAcousticResonanceProfile;
    impactGain: number;
    pitchScalar: number;
    transientCutoffHz: number;
  } {
    const profile = this.getProfile(surface);
    const safeMass = AcousticStabilizer.clampFinite(massKg, 2, 1200, 85);
    const safeSpeed = AcousticStabilizer.clampFinite(Math.abs(impactSpeedMs), 0.2, 40, 5.0);

    const kineticEnergy = 0.5 * safeMass * safeSpeed * safeSpeed;
    const referenceEnergy = 0.5 * 85.0 * 25.0; // 1062.5 J baseline stride
    const energyRatio = Math.sqrt(kineticEnergy / referenceEnergy);

    const impactGain = AcousticStabilizer.applySoftKneeLimiter(profile.baseGain * Math.max(0.25, Math.min(1.85, energyRatio)));
    // Heavier mass lowers modal strike pitch slightly via allometric contact inertia
    const pitchScalar = AcousticStabilizer.clampFinite(Math.pow(85.0 / safeMass, 0.16), 0.62, 1.38, 1.0);
    const transientCutoffHz = AcousticStabilizer.clampNyquistFrequency(profile.transientFreqHz * pitchScalar);

    return {
      profile,
      impactGain,
      pitchScalar,
      transientCutoffHz
    };
  }
}
