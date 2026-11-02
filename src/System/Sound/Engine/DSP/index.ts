/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Digital Signal Processing (DSP) High-Precision Acoustic Computation Engine
 */

export class AudioDSPMathEngine {
  public static calculateDopplerShift(
    sourceFreqHz: number,
    relativeVelocityMs: number,
    speedOfSoundMs: number = 343.0
  ): number {
    return sourceFreqHz * (speedOfSoundMs / (speedOfSoundMs + relativeVelocityMs));
  }

  public static calculateReverbDecayTime(roomVolumeM3: number, absorptionAreaM2: number): number {
    if (absorptionAreaM2 <= 0) return 0.5;
    // Sabine's reverberation formula: RT60 = 0.161 * V / A
    return 0.161 * (roomVolumeM3 / absorptionAreaM2);
  }

  public static linearGainToDecibels(gain: number): number {
    if (gain <= 0.00001) return -100;
    return 20 * Math.log10(gain);
  }
}

export default AudioDSPMathEngine;
