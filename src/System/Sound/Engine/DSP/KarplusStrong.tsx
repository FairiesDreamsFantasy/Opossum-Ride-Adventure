/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Sound DSP Karplus-Strong Physical String Modeling
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Digital waveguide delay-line circular buffer with low-pass feedback damping
 */

export class KarplusStrongString {
  /**
   * Synthesizes a physical plucked string sound buffer using the Karplus-Strong algorithm.
   * f0 = frequency, sampleRate = sampling rate (usually 44100 or 48000), decay = feedback damping (0.90 to 0.996)
   */
  public static synthesizePluck(
    frequencyHz: number,
    durationSec: number = 2.0,
    sampleRate: number = 44100,
    decayFactor: number = 0.992
  ): Float32Array {
    const totalSamples = Math.floor(durationSec * sampleRate);
    const output = new Float32Array(totalSamples);

    // Buffer length corresponding to fundamental frequency period: L = Fs / f0
    const bufferLength = Math.max(2, Math.round(sampleRate / frequencyHz));
    const delayLine = new Float32Array(bufferLength);

    // Initialize delay buffer with white noise (plucked string excitation)
    for (let i = 0; i < bufferLength; i++) {
      delayLine[i] = (Math.random() * 2.0 - 1.0) * 0.8;
    }

    let head = 0;
    let previousSample = 0;

    for (let n = 0; n < totalSamples; n++) {
      const current = delayLine[head];
      output[n] = current;

      // Two-point lowpass averaging filter with decay: y[n] = 0.5 * (x[n] + x[n-1]) * decay
      const filtered = 0.5 * (current + previousSample) * decayFactor;
      previousSample = current;

      delayLine[head] = filtered;
      head = (head + 1) % bufferLength;
    }

    return output;
  }
}
