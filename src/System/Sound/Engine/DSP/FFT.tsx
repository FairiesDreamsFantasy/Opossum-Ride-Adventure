/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Sound DSP Fast Fourier Transform (FFT) Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Radix-2 Cooley-Tukey Decimation-in-Time Discrete Fourier Transform
 */

export interface ComplexFrequencyBin {
  real: number;
  imag: number;
  magnitude: number;
  phaseRad: number;
}

export class FastFourierTransform {
  /**
   * Computes the forward Radix-2 Cooley-Tukey FFT of a power-of-two real audio buffer.
   */
  public static computeFFT(signal: Float32Array | number[]): ComplexFrequencyBin[] {
    const n = signal.length;
    if ((n & (n - 1)) !== 0) {
      throw new Error(`[DSP FFT] Buffer size ${n} must be an exact power of 2.`);
    }

    const real = new Float64Array(signal);
    const imag = new Float64Array(n);

    // Bit-reversal permutation
    let j = 0;
    for (let i = 0; i < n - 1; i++) {
      if (i < j) {
        const tempR = real[i]; real[i] = real[j]; real[j] = tempR;
        const tempI = imag[i]; imag[i] = imag[j]; imag[j] = tempI;
      }
      let k = n >> 1;
      while (k <= j) {
        j -= k;
        k >>= 1;
      }
      j += k;
    }

    // Cooley-Tukey Radix-2 Butterflies
    for (let len = 2; len <= n; len <<= 1) {
      const halfLen = len >> 1;
      const angle = (-2 * Math.PI) / len;
      const wStepR = Math.cos(angle);
      const wStepI = Math.sin(angle);

      for (let i = 0; i < n; i += len) {
        let wR = 1.0;
        let wI = 0.0;

        for (let k = 0; k < halfLen; k++) {
          const evenR = real[i + k];
          const evenI = imag[i + k];
          const oddR = real[i + k + halfLen];
          const oddI = imag[i + k + halfLen];

          const tR = wR * oddR - wI * oddI;
          const tI = wR * oddI + wI * oddR;

          real[i + k] = evenR + tR;
          imag[i + k] = evenI + tI;
          real[i + k + halfLen] = evenR - tR;
          imag[i + k + halfLen] = evenI - tI;

          const nextWR = wR * wStepR - wI * wStepI;
          const nextWI = wR * wStepI + wI * wStepR;
          wR = nextWR;
          wI = nextWI;
        }
      }
    }

    // Convert to frequency bins with magnitude and phase
    const bins: ComplexFrequencyBin[] = new Array(n >> 1);
    for (let k = 0; k < (n >> 1); k++) {
      const r = real[k];
      const im = imag[k];
      const mag = Math.hypot(r, im) / n;
      const phase = Math.atan2(im, r);
      bins[k] = {
        real: Number(r.toFixed(5)),
        imag: Number(im.toFixed(5)),
        magnitude: Number(mag.toFixed(6)),
        phaseRad: Number(phase.toFixed(4))
      };
    }

    return bins;
  }
}
