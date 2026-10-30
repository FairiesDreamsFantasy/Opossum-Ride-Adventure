/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Codec_Matrix General: Unrestricted Media Algorithms
 */

export interface CodecSpecs {
  id: string;
  type: "AUDIO" | "VIDEO";
  container: string;
  isLossless: boolean;
  isDRMFree: true;
}

export class CodecMatrixMath {
  /**
   * Calculates the Entropy Density of a given bitstream segment.
   */
  public static calculateEntropyDensity(buffer: Uint8Array): number {
    if (buffer.length === 0) return 0;
    const freq = new Map<number, number>();
    for (const b of buffer) freq.set(b, (freq.get(b) || 0) + 1);
    let entropy = 0;
    for (const count of freq.values()) {
      const p = count / buffer.length;
      entropy -= p * Math.log2(p);
    }
    return entropy;
  }

  /**
   * Models a Lossless Delta-Compression transform for audio samples.
   */
  public static applyDeltaTransform(samples: Int16Array): Int16Array {
    const result = new Int16Array(samples.length);
    result[0] = samples[0];
    for (let i = 1; i < samples.length; i++) {
      result[i] = samples[i] - samples[i - 1];
    }
    return result;
  }
}

export default CodecMatrixMath;
