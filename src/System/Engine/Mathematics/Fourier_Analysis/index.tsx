/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComplexNumber {
  re: number;
  im: number;
}

/**
 * Fourier Analysis Engine for discrete frequency decomposition and harmonic synthesis.
 * Essential for assetless audio synthesizers and procedural oscillatory physics.
 */
export class FourierAnalysisEngine {
  /**
   * Discrete Fourier Transform (DFT) O(N^2)
   */
  public static dft(samples: number[]): ComplexNumber[] {
    const N = samples.length;
    const output: ComplexNumber[] = new Array(N);

    for (let k = 0; k < N; k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n < N; n++) {
        const theta = (2 * Math.PI * k * n) / N;
        re += samples[n] * Math.cos(theta);
        im -= samples[n] * Math.sin(theta);
      }
      output[k] = { re, im };
    }
    return output;
  }

  /**
   * Inverse Discrete Fourier Transform (IDFT)
   */
  public static idft(spectrum: ComplexNumber[]): number[] {
    const N = spectrum.length;
    const output: number[] = new Array(N);

    for (let n = 0; n < N; n++) {
      let re = 0;
      for (let k = 0; k < N; k++) {
        const theta = (2 * Math.PI * k * n) / N;
        re += spectrum[k].re * Math.cos(theta) - spectrum[k].im * Math.sin(theta);
      }
      output[n] = re / N;
    }
    return output;
  }

  /**
   * Radix-2 Cooley-Tukey Fast Fourier Transform (FFT) O(N log N)
   * Samples length must be a power of 2.
   */
  public static fft(samples: number[]): ComplexNumber[] {
    const n = samples.length;
    if (n <= 1) {
      return [{ re: samples[0] || 0, im: 0 }];
    }

    if ((n & (n - 1)) !== 0) {
      // If not power of 2, fallback to exact DFT
      return this.dft(samples);
    }

    const evenSamples: number[] = [];
    const oddSamples: number[] = [];
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) evenSamples.push(samples[i]);
      else oddSamples.push(samples[i]);
    }

    const even = this.fft(evenSamples);
    const odd = this.fft(oddSamples);

    const result: ComplexNumber[] = new Array(n);
    for (let k = 0; k < n / 2; k++) {
      const angle = (-2 * Math.PI * k) / n;
      const expRe = Math.cos(angle);
      const expIm = Math.sin(angle);

      // exp * odd[k]
      const oddRe = expRe * odd[k].re - expIm * odd[k].im;
      const oddIm = expRe * odd[k].im + expIm * odd[k].re;

      result[k] = {
        re: even[k].re + oddRe,
        im: even[k].im + oddIm,
      };
      result[k + n / 2] = {
        re: even[k].re - oddRe,
        im: even[k].im - oddIm,
      };
    }
    return result;
  }

  /**
   * Synthesize sample using Fourier harmonic series: f(t) = sum(A_k * sin(2*pi*k*f0*t + phi_k))
   */
  public static harmonicSeries(
    fundamentalFreq: number,
    harmonics: { harmonicNumber: number; amplitude: number; phase: number }[],
    t: number
  ): number {
    let sample = 0;
    for (const h of harmonics) {
      const freq = fundamentalFreq * h.harmonicNumber;
      sample += h.amplitude * Math.sin(2 * Math.PI * freq * t + h.phase);
    }
    return sample;
  }

  /**
   * Hann (Hanning) windowing function to reduce spectral leakage.
   */
  public static applyHannWindow(samples: number[]): number[] {
    const N = samples.length;
    return samples.map((val, n) => val * 0.5 * (1 - Math.cos((2 * Math.PI * n) / (N - 1))));
  }
}
