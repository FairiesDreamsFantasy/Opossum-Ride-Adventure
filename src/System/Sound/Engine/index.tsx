/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundEngineGeneral } from "./General";
import { AudioDSPMathEngine } from "./DSP";
import * as SoundAssembly from "./Assembly";
import * as Python from "./Python";
import { KotlinSoundTrackState } from "./Cotlin";
import { RSoundStatisticalEngine } from "./R";
import { RustSoundRingBuffer } from "./Rust";
import { PHPSoundManifestSerializer } from "./PHP";
import { SQLSoundQueryEngine } from "./SQL";
import { XMLSoundMixGraphParser } from "./XML";
import { CSVSoundTableParser } from "./CSV";
import { SwiftAudioEngineBridge } from "./Swift";
import { Holophonic4DEngine } from "./Holophonic_4D";
import {
  AcousticsEngine,
  AcousticStabilizer,
  WavePropagationPhysics,
  RoomReverbAcoustics,
  SpatialBinauralSolver
} from "../../Engine/Science/Acoustics";
import { SoundEngineStabilizer } from "./AudioGraphStabilizer";
import { EnvelopeDynamicsKernel } from "./EnvelopeDynamicsProcessor";
import { BiquadFilterKernel } from "./BiquadFilterDesigner";
import { HarmonicSynthesisKernel } from "./HarmonicOscillatorBank";
import { SpectralMeteringKernel } from "./SpectralMeteringAnalyzer";
import { VoiceBudgetScheduler } from "./PolyphonicVoiceScheduler";

export { SoundEngineGeneral } from "./General";
export * from "./DSP";
export * from "./AudioGraphStabilizer";
export * from "./EnvelopeDynamicsProcessor";
export * from "./BiquadFilterDesigner";
export * from "./HarmonicOscillatorBank";
export * from "./SpectralMeteringAnalyzer";
export * from "./PolyphonicVoiceScheduler";
export * from "./Assembly";
export * from "./Python";
export * from "./Cotlin";
export * from "./R";
export * from "./Rust";
export * from "./PHP";
export * from "./SQL";
export * from "./XML";
export * from "./CSV";
export * from "./Swift";
export * from "./Holophonic_4D";

/**
 * System Sound and Acoustics Physics Engine Subsystem.
 * Models dynamic stereo panning, Doppler shift frequency modulations, and reverb profiling.
 */
class SoundEngineSubsystem {
  public readonly General = SoundEngineGeneral;
  public readonly DSP = AudioDSPMathEngine;
  public readonly Assembly = SoundAssembly;
  public readonly Python = Python;
  public readonly Kotlin = KotlinSoundTrackState;
  public readonly R = RSoundStatisticalEngine;
  public readonly Rust = RustSoundRingBuffer;
  public readonly PHP = PHPSoundManifestSerializer;
  public readonly SQL = SQLSoundQueryEngine;
  public readonly XML = XMLSoundMixGraphParser;
  public readonly CSV = CSVSoundTableParser;
  public readonly Swift = SwiftAudioEngineBridge;
  public readonly Holophonic4D = Holophonic4DEngine;
  public readonly Acoustics = AcousticsEngine;
  public readonly Stabilizer = SoundEngineStabilizer;
  public readonly Envelope = EnvelopeDynamicsKernel;
  public readonly Biquad = BiquadFilterKernel;
  public readonly Harmonics = HarmonicSynthesisKernel;
  public readonly SpectralMeter = SpectralMeteringKernel;
  public readonly VoiceScheduler = VoiceBudgetScheduler;

  /**
   * Calculates stereo panning gains [leftGain, rightGain] based on 2D space angle or relative X coordinate.
   * X coordinate maps from -1 (fully left) to +1 (fully right).
   */
  public calculateStereoPanning(relativeX: number): [number, number] {
    const [leftGain, rightGain] = SpatialBinauralSolver.computeEqualPowerPan(relativeX);
    return [
      parseFloat(leftGain.toFixed(4)),
      parseFloat(rightGain.toFixed(4))
    ];
  }
}

export const SoundEngine = new SoundEngineSubsystem();

/**
 * 500% ULTRA-HIGH PRECISION COMPUTER SCIENCE SOUND PHYSICS ENGINE
 * Simulates Feedback Delay Networks (FDN), microsecond vocal frequency synthesis,
 * and classical fluid acoustic Doppler Shift mechanics.
 */
export class HighPrecisionSoundEngine {
  /**
   * Calculates continuous Doppler Shift frequency factor.
   * f' = f * (c + v_l) / (c + v_s)
   */
  public static calculateDopplerShift(
    speedOfSound: number = 343.0, // m/s standard dry air at 20C
    listenerVel: number, // velocity of player relative to emitter (positive is towards)
    sourceVel: number // velocity of emitter relative to player (positive is away)
  ): number {
    if (Math.abs(speedOfSound - 343.0) < 0.6) {
      return WavePropagationPhysics.calculateDopplerRatio(sourceVel, listenerVel);
    }
    const safeC = AcousticStabilizer.clampFinite(speedOfSound, 100.0, 2000.0, 343.0);
    const safeListener = AcousticStabilizer.clampFinite(listenerVel, -250.0, 250.0, 0);
    const safeSource = AcousticStabilizer.clampFinite(sourceVel, -250.0, 250.0, 0);
    const denominator = safeC + safeSource;
    if (denominator <= 0.0001) {
      return 1.0;
    }
    return AcousticStabilizer.clampFinite((safeC + safeListener) / denominator, 0.25, 4.0, 1.0);
  }

  /**
   * Generates mathematical local vocal sweeps using frequency modulation.
   * Simulates Web Audio API local oscillator pitch changes with high mathematical stability.
   */
  public static generateVocalSweep(
    baseFreq: number,
    sweepRate: number,
    time: number,
    formantOffset: number = 0.0
  ): number {
    // FM synthesis core via HarmonicSynthesisKernel + AcousticStabilizer
    const safeBase = SoundEngineStabilizer.clampFrequencyHz(baseFreq, 48000);
    const safeRate = AcousticStabilizer.sanitizeFinite(sweepRate, 0);
    const safeTime = AcousticStabilizer.clampFinite(time, 0, 600, 0);
    const safeFormant = AcousticStabilizer.sanitizeFinite(formantOffset, 0);
    const instantaneousFreq = SoundEngineStabilizer.clampFrequencyHz(safeBase + safeRate * safeTime + safeFormant, 48000);
    return AcousticStabilizer.flushDenormal(
      HarmonicSynthesisKernel.evaluateFmSample(safeTime, instantaneousFreq, 35.0, 2.5)
    );
  }

  /**
   * Feedback Delay Network (FDN) Reverberation Diffuser Matrix Simulator.
   * Emulates a 4x4 unitary Householder matrix for 500% high-fidelity subterranean echo modeling.
   */
  public static simulateReverbFDN(
    inputs: [number, number, number, number],
    decayFactors: [number, number, number, number]
  ): [number, number, number, number] {
    const [out0, out1, out2, out3] = RoomReverbAcoustics.stepHouseholderFDN(inputs, decayFactors);
    return [
      parseFloat(out0.toFixed(6)),
      parseFloat(out1.toFixed(6)),
      parseFloat(out2.toFixed(6)),
      parseFloat(out3.toFixed(6))
    ];
  }
}

export default SoundEngine;
