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

export { SoundEngineGeneral } from "./General";
export * from "./DSP";
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

  /**
   * Calculates stereo panning gains [leftGain, rightGain] based on 2D space angle or relative X coordinate.
   * X coordinate maps from -1 (fully left) to +1 (fully right).
   */
  public calculateStereoPanning(relativeX: number): [number, number] {
    const xClamped = Math.max(-1, Math.min(1, relativeX));
    // Constant power panning algorithm: left^2 + right^2 = 1
    const angleRad = ((xClamped + 1) * Math.PI) / 4;
    const leftGain = Math.cos(angleRad);
    const rightGain = Math.sin(angleRad);
    
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
    const numerator = speedOfSound + listenerVel;
    const denominator = speedOfSound + sourceVel;
    if (denominator <= 0.0001) {
      return 1.0;
    }
    return Math.max(0.25, Math.min(4.0, numerator / denominator));
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
    // FM synthesis core: sin(2 * PI * f * t + I * sin(2 * PI * f_m * t))
    const modulatorFreq = 35.0; // Hz
    const modulationIndex = 2.5;
    const instantaneousFreq = baseFreq + sweepRate * time + formantOffset;
    
    const carrier = Math.sin(2.0 * Math.PI * instantaneousFreq * time);
    const modulator = Math.sin(2.0 * Math.PI * modulatorFreq * time) * modulationIndex;
    
    return Math.sin(2.0 * Math.PI * instantaneousFreq * time + modulator);
  }

  /**
   * Feedback Delay Network (FDN) Reverberation Diffuser Matrix Simulator.
   * Emulates a 4x4 unitary Householder matrix for 500% high-fidelity subterranean echo modeling.
   */
  public static simulateReverbFDN(
    inputs: [number, number, number, number],
    decayFactors: [number, number, number, number]
  ): [number, number, number, number] {
    // 4x4 Householder matrix (unitary: propagates sound energy perfectly without exploding)
    // H = I - 2 * v * v^T (where v is a normalized vector [0.5, 0.5, 0.5, 0.5])
    // Resulting matrix:
    // [ -0.5,  0.5,  0.5,  0.5 ]
    // [  0.5, -0.5,  0.5,  0.5 ]
    // [  0.5,  0.5, -0.5,  0.5 ]
    // [  0.5,  0.5,  0.5, -0.5 ]

    const s = 0.5 * (inputs[0] + inputs[1] + inputs[2] + inputs[3]);
    
    const out0 = (inputs[0] - s) * decayFactors[0];
    const out1 = (inputs[1] - s) * decayFactors[1];
    const out2 = (inputs[2] - s) * decayFactors[2];
    const out3 = (inputs[3] - s) * decayFactors[3];

    return [
      parseFloat(out0.toFixed(6)),
      parseFloat(out1.toFixed(6)),
      parseFloat(out2.toFixed(6)),
      parseFloat(out3.toFixed(6))
    ];
  }
}

export default SoundEngine;
