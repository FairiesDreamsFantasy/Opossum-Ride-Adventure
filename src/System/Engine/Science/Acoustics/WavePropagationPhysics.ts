/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * WavePropagationPhysics — Atmospheric Acoustics, Multi-Band ISO 9613-1 Absorption,
 * Doppler Shift, and Two-Ray Ground Reflection Physics.
 */

import { AcousticStabilizer } from "./AcousticStabilizer";

export interface AtmosphericConditions {
  tempCelsius: number;
  relativeHumidityPercent: number;
  pressureKpa: number;
}

export interface MultiBandAttenuationResult {
  distanceMeters: number;
  geometricLossDb: number;
  lowBandAlphaDbPerM: number;
  midBandAlphaDbPerM: number;
  highBandAlphaDbPerM: number;
  lowPassCutoffHz: number;
  broadbandLinearGain: number;
}

export class WavePropagationPhysics {
  public static readonly STANDARD_CONDITIONS: AtmosphericConditions = {
    tempCelsius: 20.0,
    relativeHumidityPercent: 50.0,
    pressureKpa: 101.325
  };

  /**
   * Speed of sound in humid air (Cramer / Owen approximation):
   * c(T, h) = 331.3 * sqrt(1 + T / 273.15) * (1 + 0.0016 * h_fraction)
   */
  public static speedOfSoundAir(
    tempCelsius: number = 20.0,
    relativeHumidityPercent: number = 50.0
  ): number {
    const safeT = AcousticStabilizer.clampFinite(tempCelsius, -60, 65, 20.0);
    const humidityFrac = AcousticStabilizer.clampFinite(relativeHumidityPercent, 0, 100, 50.0) * 0.01;
    const drySpeed = 331.3 * Math.sqrt(Math.max(0.1, 1.0 + safeT / 273.15));
    return drySpeed * (1.0 + 0.0016 * humidityFrac);
  }

  /**
   * Classical Doppler Frequency Shift with Mach singularity clamp:
   * f = f0 * (c + v_receiver) / (c - v_source)
   * Positive velocities indicate movement toward each other.
   */
  public static calculateDopplerShift(
    emittedFreqHz: number,
    sourceVelocityMs: number,
    receiverVelocityMs: number,
    tempCelsius: number = 20.0,
    relativeHumidityPercent: number = 50.0
  ): number {
    const f0 = AcousticStabilizer.clampFinite(emittedFreqHz, 10, 22000, 440);
    const vSrc = AcousticStabilizer.clampFinite(sourceVelocityMs, -250, 250, 0);
    const vRec = AcousticStabilizer.clampFinite(receiverVelocityMs, -250, 250, 0);
    const c = this.speedOfSoundAir(tempCelsius, relativeHumidityPercent);
    const denominator = c - vSrc;
    if (Math.abs(denominator) < 1e-2) {
      return AcousticStabilizer.clampNyquistFrequency(f0 * 4.0);
    }
    const shifted = f0 * ((c + vRec) / denominator);
    return AcousticStabilizer.clampFinite(shifted, 15.0, 22000.0, f0);
  }

  /**
   * Dimensionless Doppler Pitch Ratio for Web Audio playbackRate / frequency scaling.
   */
  public static calculateDopplerRatio(
    sourceVelocityAwayMs: number,
    listenerVelocityTowardMs: number,
    tempCelsius: number = 20.0
  ): number {
    const c = this.speedOfSoundAir(tempCelsius);
    const vAway = AcousticStabilizer.clampFinite(sourceVelocityAwayMs, -250, 250, 0);
    const vToward = AcousticStabilizer.clampFinite(listenerVelocityTowardMs, -250, 250, 0);
    const denom = Math.max(1.0, c + vAway);
    return AcousticStabilizer.clampFinite((c + vToward) / denom, 0.35, 2.85, 1.0);
  }

  /**
   * ISO 9613-1 inspired atmospheric absorption coefficient (dB/m) at frequency f_Hz.
   * Higher frequencies and drier air suffer steeper viscous & relaxation absorption.
   */
  public static calculateAbsorptionCoeffDbPerM(
    freqHz: number,
    conditions: Partial<AtmosphericConditions> = {}
  ): number {
    const f = AcousticStabilizer.clampFinite(freqHz, 20, 20000, 1000);
    const tempC = AcousticStabilizer.clampFinite(conditions.tempCelsius ?? 20, -40, 55, 20);
    const rh = AcousticStabilizer.clampFinite(conditions.relativeHumidityPercent ?? 50, 5, 100, 50);

    // Classical viscosity + molecular N2/O2 relaxation approximation
    const fKhz = f * 0.001;
    const humidityFactor = 0.6 + 0.8 * (1.0 - rh / 100.0);
    const tempFactor = 1.0 + Math.max(-0.25, (tempC - 20) * 0.006);
    const alpha = (0.00018 * fKhz * fKhz + 0.0022 * fKhz) * humidityFactor * tempFactor;
    return AcousticStabilizer.clampFinite(alpha, 0.0001, 0.45, 0.005);
  }

  /**
   * Sound Pressure Level (SPL) attenuation combining inverse-square spreading and air absorption.
   */
  public static soundAttenuation(
    initialSplDb: number,
    distanceMeters: number,
    referenceDistanceMeters: number = 1.0,
    atmosphericAlphaDbPerM: number = 0.005
  ): number {
    const spl0 = AcousticStabilizer.clampFinite(initialSplDb, 0, 160, 70);
    const r0 = Math.max(0.1, AcousticStabilizer.sanitizeFinite(referenceDistanceMeters, 1.0));
    const r = Math.max(0.05, AcousticStabilizer.sanitizeFinite(distanceMeters, r0));
    const alpha = AcousticStabilizer.clampFinite(atmosphericAlphaDbPerM, 0, 0.5, 0.005);

    if (r <= r0) return spl0;
    const geometricLoss = 20.0 * Math.log10(r / r0);
    const absorptionLoss = alpha * (r - r0);
    return Math.max(0, spl0 - geometricLoss - absorptionLoss);
  }

  /**
   * Full multi-band attenuation and atmospheric low-pass cutoff solver for real-time audio filters.
   */
  public static solveMultiBandAttenuation(
    distanceMeters: number,
    referenceDistanceMeters: number = 2.0,
    conditions: Partial<AtmosphericConditions> = {}
  ): MultiBandAttenuationResult {
    const r = Math.max(0.1, AcousticStabilizer.sanitizeFinite(distanceMeters, 1.0));
    const r0 = Math.max(0.1, AcousticStabilizer.sanitizeFinite(referenceDistanceMeters, 2.0));

    const lowBandAlphaDbPerM = this.calculateAbsorptionCoeffDbPerM(125, conditions);
    const midBandAlphaDbPerM = this.calculateAbsorptionCoeffDbPerM(1000, conditions);
    const highBandAlphaDbPerM = this.calculateAbsorptionCoeffDbPerM(6000, conditions);

    const effectiveRatio = Math.max(1.0, r / r0);
    const geometricLossDb = 20.0 * Math.log10(effectiveRatio);

    // Low-pass air cutoff drops smoothly from 20,000 Hz near-field toward 650 Hz far-horizon
    const airDampNorm = Math.exp(-0.022 * Math.max(0, r - r0) * (highBandAlphaDbPerM / 0.015));
    const lowPassCutoffHz = AcousticStabilizer.clampFinite(650 + 19350 * airDampNorm, 650, 20000, 20000);

    const totalMidLossDb = geometricLossDb + midBandAlphaDbPerM * Math.max(0, r - r0);
    const rawGain = Math.pow(10, -totalMidLossDb / 20.0);
    const broadbandLinearGain = AcousticStabilizer.applySoftKneeLimiter(rawGain);

    return {
      distanceMeters: r,
      geometricLossDb,
      lowBandAlphaDbPerM,
      midBandAlphaDbPerM,
      highBandAlphaDbPerM,
      lowPassCutoffHz,
      broadbandLinearGain
    };
  }
}
