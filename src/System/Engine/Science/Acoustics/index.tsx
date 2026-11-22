/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcousticStabilizer, AcousticRingBuffer } from "./AcousticStabilizer";
import { WavePropagationPhysics } from "./WavePropagationPhysics";
import { RoomReverbAcoustics, ARENA_ACOUSTIC_SPECS } from "./RoomReverbAcoustics";
import { SpatialBinauralSolver } from "./SpatialBinauralSolver";
import { SurfaceImpactResonance } from "./SurfaceImpactResonance";
import { BioAcousticFormants } from "./BioAcousticFormants";

export * from "./AcousticStabilizer";
export * from "./WavePropagationPhysics";
export * from "./RoomReverbAcoustics";
export * from "./SpatialBinauralSolver";
export * from "./SurfaceImpactResonance";
export * from "./BioAcousticFormants";

/**
 * Physical Acoustics and Wave Propagation Engine (Ultra-Precise 5000% Mathematical Standard).
 * Coordinates wave propagation, room/cave reverberation, 3D binaural localization,
 * surface material impact resonance, bio-acoustic formants, and IEEE 754 stabilization.
 */
export class AcousticsEngine {
  public static readonly Stabilizer = AcousticStabilizer;
  public static readonly WavePropagation = WavePropagationPhysics;
  public static readonly RoomReverb = RoomReverbAcoustics;
  public static readonly Spatial = SpatialBinauralSolver;
  public static readonly SurfaceImpact = SurfaceImpactResonance;
  public static readonly Formants = BioAcousticFormants;
  public static readonly RingBuffer = AcousticRingBuffer;
  public static readonly ArenaSpecs = ARENA_ACOUSTIC_SPECS;

  /**
   * Speed of sound in air as a function of Celsius temperature and relative humidity.
   */
  public static speedOfSoundAir(tempCelsius: number = 20, relativeHumidityPercent: number = 50): number {
    return WavePropagationPhysics.speedOfSoundAir(tempCelsius, relativeHumidityPercent);
  }

  /**
   * Classical Doppler Frequency Shift with Mach singularity & Nyquist clamps.
   */
  public static calculateDopplerShift(
    emittedFreqHz: number,
    sourceVelocityMs: number,
    receiverVelocityMs: number,
    tempCelsius: number = 20
  ): number {
    return WavePropagationPhysics.calculateDopplerShift(
      emittedFreqHz,
      sourceVelocityMs,
      receiverVelocityMs,
      tempCelsius
    );
  }

  /**
   * Helmholtz Cavity Resonance Formula for caves, chambers, and mine shafts.
   */
  public static helmholtzResonance(
    openingAreaM2: number,
    cavityVolumeM3: number,
    neckLengthM: number,
    tempCelsius: number = 20
  ): number {
    return RoomReverbAcoustics.helmholtzResonance(openingAreaM2, cavityVolumeM3, neckLengthM, tempCelsius);
  }

  /**
   * Sound pressure level attenuation over distance (Inverse-Square Law + Atmospheric Absorption).
   */
  public static soundAttenuation(
    initialSplDb: number,
    distanceMeters: number,
    referenceDistanceMeters: number = 1.0,
    atmosphericAlphaDbPerM: number = 0.005
  ): number {
    return WavePropagationPhysics.soundAttenuation(
      initialSplDb,
      distanceMeters,
      referenceDistanceMeters,
      atmosphericAlphaDbPerM
    );
  }

  /**
   * 3D Stereophonic Spatial Vector & Head-Related Modeling.
   */
  public static calculate3DSpatialAcoustics(
    sourceX: number,
    sourceY: number,
    sourceZ: number,
    listenerX: number,
    listenerY: number,
    listenerZ: number,
    tempCelsius: number = 20
  ): {
    distanceMeters: number;
    leftGain: number;
    rightGain: number;
    lowPassCutoffHz: number;
    itdSeconds: number;
    azimuthRad: number;
  } {
    const result = SpatialBinauralSolver.calculate3DSpatialAcoustics(
      sourceX,
      sourceY,
      sourceZ,
      listenerX,
      listenerY,
      listenerZ,
      tempCelsius
    );
    return {
      distanceMeters: result.distanceMeters,
      leftGain: result.leftGain,
      rightGain: result.rightGain,
      lowPassCutoffHz: result.lowPassCutoffHz,
      itdSeconds: result.itdSeconds,
      azimuthRad: result.azimuthRad
    };
  }

  /**
   * Surface Material Acoustic Resonance Profiler.
   */
  public static getSurfaceResonanceProfile(
    surface: "granite" | "marble" | "wood" | "dirt" | "grass" | "salt" | "stone" | string
  ): {
    fundamentalFreqHz: number;
    qFactor: number;
    decayTimeSeconds: number;
    highTransientGain: number;
  } {
    const p = SurfaceImpactResonance.getProfile(surface);
    return {
      fundamentalFreqHz: p.fundamentalFreqHz,
      qFactor: p.qFactor,
      decayTimeSeconds: p.decayTimeSeconds,
      highTransientGain: p.highTransientGain
    };
  }
}

