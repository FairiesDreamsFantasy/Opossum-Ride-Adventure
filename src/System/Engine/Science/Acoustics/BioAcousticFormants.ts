/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * BioAcousticFormants — Vocal-Tract Acoustic Tube Physics, Allometric Pitch Scaling,
 * and Pole-Verified Digital Biquad Filter Coefficients.
 */

import { AcousticStabilizer } from "./AcousticStabilizer";
import { WavePropagationPhysics } from "./WavePropagationPhysics";

export interface BiquadCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
  stable: boolean;
}

export class BioAcousticFormants {
  /**
   * Closed-open vocal tract acoustic tube formant frequencies (Hz):
   * f_n = (2*n - 1) * c / (4 * L_tract)
   */
  public static predictVocalFormants(
    vocalTractLengthM: number,
    tempCelsius: number = 37.0
  ): [number, number, number, number] {
    const L = AcousticStabilizer.clampFinite(vocalTractLengthM, 0.03, 1.4, 0.18);
    const c = WavePropagationPhysics.speedOfSoundAir(tempCelsius, 95.0);
    return [
      AcousticStabilizer.clampNyquistFrequency((1 * c) / (4 * L)),
      AcousticStabilizer.clampNyquistFrequency((3 * c) / (4 * L)),
      AcousticStabilizer.clampNyquistFrequency((5 * c) / (4 * L)),
      AcousticStabilizer.clampNyquistFrequency((7 * c) / (4 * L))
    ];
  }

  /**
   * Allometric vocal fold fundamental frequency scaling relative to body mass:
   * f0 ~ refFreq * (refMass / targetMass)^0.28
   */
  public static computeAllometricFundamentalHz(
    referenceMassKg: number,
    targetMassKg: number,
    referenceFreqHz: number
  ): number {
    const refM = Math.max(1.0, AcousticStabilizer.sanitizeFinite(referenceMassKg, 85));
    const tgtM = Math.max(1.0, AcousticStabilizer.sanitizeFinite(targetMassKg, 85));
    const refF = AcousticStabilizer.clampFinite(referenceFreqHz, 35, 6000, 220);
    const scaled = refF * Math.pow(refM / tgtM, 0.28);
    return AcousticStabilizer.clampNyquistFrequency(scaled);
  }

  /**
   * Designs normalized 2nd-order digital bandpass biquad coefficients (RBJ Audio EQ Cookbook)
   * with explicit pole-radius stability verification via AcousticStabilizer.
   */
  public static designBandpassBiquad(
    centerFreqHz: number,
    qFactor: number,
    sampleRateHz: number = 48000
  ): BiquadCoefficients {
    const fs = Math.max(8000, AcousticStabilizer.sanitizeFinite(sampleRateHz, 48000));
    const fc = AcousticStabilizer.clampNyquistFrequency(centerFreqHz, fs);
    const q = AcousticStabilizer.clampFinite(qFactor, 0.25, 24.0, 2.0);

    const omega = (2.0 * Math.PI * fc) / fs;
    const sinW = Math.sin(omega);
    const cosW = Math.cos(omega);
    const alpha = sinW / (2.0 * q);

    const a0 = 1.0 + alpha;
    const invA0 = 1.0 / a0;

    const b0 = alpha * invA0;
    const b1 = 0;
    const b2 = -alpha * invA0;
    const a1 = (-2.0 * cosW) * invA0;
    const a2 = (1.0 - alpha) * invA0;

    const stable = AcousticStabilizer.areBiquadPolesStable(a1, a2);
    if (!stable) {
      // Safe unity bypass fallback if parameters approach numerical edge
      return { b0: 1, b1: 0, b2: 0, a1: 0, a2: 0, stable: false };
    }

    return {
      b0: AcousticStabilizer.flushDenormal(b0),
      b1,
      b2: AcousticStabilizer.flushDenormal(b2),
      a1: AcousticStabilizer.flushDenormal(a1),
      a2: AcousticStabilizer.flushDenormal(a2),
      stable: true
    };
  }
}
