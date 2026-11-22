/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * EnvelopeDynamicsProcessor — Click-Free ADSR, Soft Compressor Curve, and Gain Ramps.
 */

import { SoundEngineStabilizer } from "./AudioGraphStabilizer";

export interface ADSRSpec {
  attackSec: number;
  decaySec: number;
  sustainLevel: number;
  releaseSec: number;
}

export class EnvelopeDynamicsKernel {
  public static evaluateADSR(elapsedSec: number, holdEndSec: number, spec: ADSRSpec): number {
    const t = Math.max(0, SoundEngineStabilizer.sanitizeAudioParam(elapsedSec, 0, 600, 0));
    const attack = Math.max(0.002, spec.attackSec);
    const decay = Math.max(0.002, spec.decaySec);
    const sustain = SoundEngineStabilizer.sanitizeAudioParam(spec.sustainLevel, 0.0001, 1.0, 0.7);
    const release = Math.max(0.005, spec.releaseSec);

    if (t < attack) {
      return SoundEngineStabilizer.clampAudioGain(t / attack, 1.0);
    }
    if (t < attack + decay) {
      const ratio = (t - attack) / decay;
      return SoundEngineStabilizer.clampAudioGain(1.0 - (1.0 - sustain) * ratio, 1.0);
    }
    if (t <= holdEndSec) {
      return sustain;
    }
    const releaseElapsed = t - holdEndSec;
    if (releaseElapsed >= release) {
      return 0;
    }
    return SoundEngineStabilizer.clampAudioGain(sustain * (1.0 - releaseElapsed / release), 1.0);
  }

  public static evaluateExponentialDecay(elapsedSec: number, tauSec: number): number {
    const t = Math.max(0, SoundEngineStabilizer.sanitizeAudioParam(elapsedSec, 0, 120, 0));
    const tau = Math.max(0.001, SoundEngineStabilizer.sanitizeAudioParam(tauSec, 0.001, 60, 0.25));
    const val = Math.exp(-t / tau);
    return Math.abs(val) < SoundEngineStabilizer.DENORMAL_EPS ? 0 : val;
  }

  public static computeSoftCompressorGain(linearLevel: number, threshold: number = 0.78, ratio: number = 3.0): number {
    const clean = SoundEngineStabilizer.clampAudioGain(linearLevel, 8.0);
    const thresh = SoundEngineStabilizer.sanitizeAudioParam(threshold, 0.1, 0.99, 0.78);
    const safeRatio = SoundEngineStabilizer.sanitizeAudioParam(ratio, 1.0, 20.0, 3.0);
    if (clean <= thresh) return 1.0;
    const compressed = thresh + (clean - thresh) / safeRatio;
    return SoundEngineStabilizer.clampAudioGain(compressed / clean, 1.0);
  }
}
