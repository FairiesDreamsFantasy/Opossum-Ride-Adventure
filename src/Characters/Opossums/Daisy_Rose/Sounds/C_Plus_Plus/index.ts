/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Daisy Rose High-Register Formant Filter
 * Native C++ High-Precision Audio Feature Kernel
 */

export const DaisyRoseAudioFormantCPP = {
  centerFrequencyHz: 2850.0, // High-register resonant chatter center
  bandwidthQ: 1.25,

  /**
   * Computes Biquad bandpass coefficients for Daisy Rose chatter:
   */
  computeBiquadCoefficients: (sampleRate: number = 44100): { b0: number; b1: number; b2: number } => {
    const w0 = (2.0 * Math.PI * DaisyRoseAudioFormantCPP.centerFrequencyHz) / sampleRate;
    const alpha = Math.sin(w0) / (2.0 * DaisyRoseAudioFormantCPP.bandwidthQ);
    const b0 = alpha;
    const b1 = 0.0;
    const b2 = -alpha;

    return {
      b0: Number(b0.toFixed(6)),
      b1: Number(b1.toFixed(6)),
      b2: Number(b2.toFixed(6))
    };
  }
};

export default DaisyRoseAudioFormantCPP;
