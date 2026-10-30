/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SciPy Sound Spectrum & FFT Simulator
 */

export class SciPySoundSpectrumEngine {
  public static computeRMS(samples: Float32Array): number {
    let sumSq = 0;
    for (let i = 0; i < samples.length; i++) {
      sumSq += samples[i] * samples[i];
    }
    return Math.sqrt(sumSq / Math.max(1, samples.length));
  }
}

export default SciPySoundSpectrumEngine;
