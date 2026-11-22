/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * RoomReverbAcoustics — Architectural & Cavern Acoustics Engine
 * Models Sabine/Eyring RT60 reverberation decay, Helmholtz cavity resonance,
 * rectangular chamber eigenmodes, and 4x4 Householder Feedback Delay Networks (FDN).
 */

import { AcousticStabilizer } from "./AcousticStabilizer";
import { WavePropagationPhysics } from "./WavePropagationPhysics";

export interface ArenaRoomAcousticSpec {
  id: string;
  volumeM3: number;
  surfaceAreaM2: number;
  meanAbsorptionAlpha: number;
  rt60Seconds: number;
  recommendedWetness: number;
  earlyDelayMs: [number, number, number, number];
}

export const ARENA_ACOUSTIC_SPECS: Record<string, ArenaRoomAcousticSpec> = {
  floor_foyer: {
    id: "floor_foyer",
    volumeM3: 18500,
    surfaceAreaM2: 4900,
    meanAbsorptionAlpha: 0.14,
    rt60Seconds: 2.15,
    recommendedWetness: 0.44,
    earlyDelayMs: [14.2, 23.8, 37.5, 52.1]
  },
  cave: {
    id: "cave",
    volumeM3: 42000,
    surfaceAreaM2: 7600,
    meanAbsorptionAlpha: 0.08,
    rt60Seconds: 3.45,
    recommendedWetness: 0.56,
    earlyDelayMs: [28.4, 46.7, 71.2, 108.5]
  },
  quarry: {
    id: "quarry",
    volumeM3: 68000,
    surfaceAreaM2: 9400,
    meanAbsorptionAlpha: 0.22,
    rt60Seconds: 2.38,
    recommendedWetness: 0.46,
    earlyDelayMs: [34.0, 62.5, 95.0, 142.0]
  },
  forest: {
    id: "forest",
    volumeM3: 24000,
    surfaceAreaM2: 8800,
    meanAbsorptionAlpha: 0.48,
    rt60Seconds: 0.72,
    recommendedWetness: 0.32,
    earlyDelayMs: [11.5, 19.2, 28.9, 41.0]
  },
  temple_courtyard: {
    id: "temple_courtyard",
    volumeM3: 54000,
    surfaceAreaM2: 10200,
    meanAbsorptionAlpha: 0.28,
    rt60Seconds: 1.62,
    recommendedWetness: 0.41,
    earlyDelayMs: [19.4, 33.1, 49.8, 76.2]
  },
  garden: {
    id: "garden",
    volumeM3: 32000,
    surfaceAreaM2: 9600,
    meanAbsorptionAlpha: 0.62,
    rt60Seconds: 0.46,
    recommendedWetness: 0.26,
    earlyDelayMs: [8.4, 14.1, 21.6, 31.4]
  }
};

export class RoomReverbAcoustics {
  /**
   * Helmholtz Cavity Resonance Frequency:
   * f_H = (c / 2*pi) * sqrt(A / (V * L_eff))
   */
  public static helmholtzResonance(
    openingAreaM2: number,
    cavityVolumeM3: number,
    neckLengthM: number,
    tempCelsius: number = 20.0
  ): number {
    const area = Math.max(0.0001, AcousticStabilizer.sanitizeFinite(openingAreaM2, 1.0));
    const vol = AcousticStabilizer.sanitizeFinite(cavityVolumeM3, 0);
    const neck = Math.max(0, AcousticStabilizer.sanitizeFinite(neckLengthM, 0));
    if (vol <= 0) return 0;

    const c = WavePropagationPhysics.speedOfSoundAir(tempCelsius);
    const effectiveLength = neck + 0.8 * Math.sqrt(area);
    if (effectiveLength <= 0) return 0;

    const freq = (c / (2.0 * Math.PI)) * Math.sqrt(area / (vol * effectiveLength));
    return AcousticStabilizer.clampFinite(freq, 0, 12000, 0);
  }

  /**
   * Eyring-Norris Reverberation Time (RT60 in seconds):
   * More accurate than Sabine in both reflective caves and absorbent gardens:
   * RT60 = (0.161 * V) / (-S * ln(1 - alpha))
   */
  public static calculateEyringRT60(
    volumeM3: number,
    surfaceAreaM2: number,
    meanAbsorptionAlpha: number
  ): number {
    const v = Math.max(1.0, AcousticStabilizer.sanitizeFinite(volumeM3, 100));
    const s = Math.max(1.0, AcousticStabilizer.sanitizeFinite(surfaceAreaM2, 100));
    const alpha = AcousticStabilizer.clampFinite(meanAbsorptionAlpha, 0.01, 0.99, 0.25);

    const denom = -s * Math.log(1.0 - alpha);
    if (denom <= 1e-6) return 0.5;
    return AcousticStabilizer.clampFinite((0.161 * v) / denom, 0.08, 8.0, 0.5);
  }

  /**
   * Computes lowest axial room eigenmode frequency f_{nx,ny,nz} for architectural resonance awareness.
   */
  public static computeChamberEigenmode(
    lengthM: number,
    widthM: number,
    heightM: number,
    nx: number = 1,
    ny: number = 0,
    nz: number = 0,
    tempCelsius: number = 20.0
  ): number {
    const L = Math.max(0.5, AcousticStabilizer.sanitizeFinite(lengthM, 10));
    const W = Math.max(0.5, AcousticStabilizer.sanitizeFinite(widthM, 10));
    const H = Math.max(0.5, AcousticStabilizer.sanitizeFinite(heightM, 4));
    const c = WavePropagationPhysics.speedOfSoundAir(tempCelsius);

    const term = Math.pow(nx / L, 2) + Math.pow(ny / W, 2) + Math.pow(nz / H, 2);
    return (c * 0.5) * Math.sqrt(Math.max(0, term));
  }

  /**
   * 4x4 Unitary Householder Feedback Delay Network (FDN) Diffusion Matrix Step.
   * Energy-preserving orthogonal reflection guarantees zero unstable feedback runaway.
   */
  public static stepHouseholderFDN(
    inputs: readonly [number, number, number, number],
    decayFactors: readonly [number, number, number, number]
  ): [number, number, number, number] {
    const i0 = AcousticStabilizer.sanitizeFinite(inputs[0], 0);
    const i1 = AcousticStabilizer.sanitizeFinite(inputs[1], 0);
    const i2 = AcousticStabilizer.sanitizeFinite(inputs[2], 0);
    const i3 = AcousticStabilizer.sanitizeFinite(inputs[3], 0);

    const d0 = AcousticStabilizer.clampFinite(decayFactors[0], 0, 0.995, 0.7);
    const d1 = AcousticStabilizer.clampFinite(decayFactors[1], 0, 0.995, 0.7);
    const d2 = AcousticStabilizer.clampFinite(decayFactors[2], 0, 0.995, 0.7);
    const d3 = AcousticStabilizer.clampFinite(decayFactors[3], 0, 0.995, 0.7);

    const sumHalf = 0.5 * (i0 + i1 + i2 + i3);
    return [
      AcousticStabilizer.flushDenormal((i0 - sumHalf) * d0),
      AcousticStabilizer.flushDenormal((i1 - sumHalf) * d1),
      AcousticStabilizer.flushDenormal((i2 - sumHalf) * d2),
      AcousticStabilizer.flushDenormal((i3 - sumHalf) * d3)
    ];
  }

  public static resolveArenaSpec(placeId: string): ArenaRoomAcousticSpec {
    const key = (placeId || "garden").toLowerCase();
    if (key.includes("foyer") || key.includes("hallway")) return ARENA_ACOUSTIC_SPECS.floor_foyer;
    if (key.includes("cave") || key.includes("mine")) return ARENA_ACOUSTIC_SPECS.cave;
    if (key.includes("quarry") || key.includes("badlands") || key.includes("arroyo")) return ARENA_ACOUSTIC_SPECS.quarry;
    if (key.includes("forest") || key.includes("jungle") || key.includes("taiga") || key.includes("bayou")) {
      return ARENA_ACOUSTIC_SPECS.forest;
    }
    if (key.includes("courtyard") || key.includes("temple")) return ARENA_ACOUSTIC_SPECS.temple_courtyard;
    return ARENA_ACOUSTIC_SPECS.garden;
  }
}
