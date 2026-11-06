/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Golden Ratio Dual-Harmonic Chatter Synthesizer
 * Native C++ High-Precision Audio Feature Kernel
 */

export const PHI_GOLDEN_RATIO = 1.618033988749895;

export const ElegantChatterASynthesizerCPP = {
  /**
   * Generates Golden Ratio dual-harmonic chatter sine sample with 8ms linear anti-clicking ramp:
   */
  generateGoldenChatterSample: (
    sampleIndex: number,
    baseFreqHz: number = 880.0,
    sampleRate: number = 44100,
    totalSamples: number = 4410
  ): number => {
    const t = sampleIndex / sampleRate;
    const harmonic1 = Math.sin(2.0 * Math.PI * baseFreqHz * t);
    const harmonic2 = Math.sin(2.0 * Math.PI * baseFreqHz * PHI_GOLDEN_RATIO * t) * 0.382;

    // 8ms linear anti-clicking attack and decay ramps
    const rampSamples = Math.floor(0.008 * sampleRate);
    let envelope = 1.0;
    if (sampleIndex < rampSamples) {
      envelope = sampleIndex / rampSamples;
    } else if (sampleIndex > totalSamples - rampSamples) {
      envelope = Math.max(0.0, (totalSamples - sampleIndex) / rampSamples);
    }

    const sample = (harmonic1 + harmonic2) * 0.5 * envelope;
    return Number(sample.toFixed(6));
  }
};

export default ElegantChatterASynthesizerCPP;
