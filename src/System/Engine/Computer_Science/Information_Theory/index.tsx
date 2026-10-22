/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HuffmanNode {
  char?: string;
  weight: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
}

/**
 * Information Theory and Digital Communication Engine.
 * Formulates Shannon entropy, data compression (Huffman & RLE),
 * and cache-coherent spatial Morton bit-interleaving.
 */
export class InformationTheoryEngine {
  /**
   * Calculates discrete Shannon Entropy:
   * H(X) = - sum(P(x) * log2(P(x))) (bits)
   */
  public static shannonEntropy(frequencies: number[]): number {
    const total = frequencies.reduce((acc, f) => acc + f, 0);
    if (total <= 0) return 0;

    let entropy = 0;
    for (const freq of frequencies) {
      if (freq > 0) {
        const p = freq / total;
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  }

  /**
   * Run-Length Encoding (RLE) for lossless level data and tile map compression.
   */
  public static runLengthEncode(data: number[]): { value: number; count: number }[] {
    if (data.length === 0) return [];
    const encoded: { value: number; count: number }[] = [];
    let currentVal = data[0];
    let count = 1;

    for (let i = 1; i < data.length; i++) {
      if (data[i] === currentVal) {
        count++;
      } else {
        encoded.push({ value: currentVal, count });
        currentVal = data[i];
        count = 1;
      }
    }
    encoded.push({ value: currentVal, count });
    return encoded;
  }

  /**
   * Run-Length Decoding (RLE) reconstruction.
   */
  public static runLengthDecode(encoded: { value: number; count: number }[]): number[] {
    const decoded: number[] = [];
    for (const item of encoded) {
      for (let i = 0; i < item.count; i++) {
        decoded.push(item.value);
      }
    }
    return decoded;
  }

  /**
   * Morton 2D Code (Z-Order Curve) bit interleaving for coordinate locality:
   * Maps 2D coordinates (x, y) into a single 1D spatial hash index.
   */
  public static morton2D(x: number, y: number): number {
    function part1By1(n: number): number {
      n &= 0x0000ffff;
      n = (n | (n << 8)) & 0x00ff00ff;
      n = (n | (n << 4)) & 0x0f0f0f0f;
      n = (n | (n << 2)) & 0x33333333;
      n = (n | (n << 1)) & 0x55555555;
      return n;
    }
    return (part1By1(y) << 1) | part1By1(x);
  }

  /**
   * Hamming Distance between two 32-bit integers.
   */
  public static hammingDistance(a: number, b: number): number {
    let xor = a ^ b;
    let distance = 0;
    while (xor !== 0) {
      distance += xor & 1;
      xor >>>= 1;
    }
    return distance;
  }
}
