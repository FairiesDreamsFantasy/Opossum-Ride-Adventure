/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Advanced 4x4 Matrix & Affine Transformation Engine for Gemini AI
 * Essential for 3D coordinate mapping and view-projection stability.
 */
export const GeminiMathMatrix4x4 = {
  identity: () => new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]),
  
  /**
   * Performs matrix multiplication with column-major alignment.
   */
  multiply: (a: Float32Array, b: Float32Array): Float32Array => {
    const out = new Float32Array(16);
    // Standard 4x4 matrix multiplication algorithm
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i + k * 4] * b[k + j * 4];
        }
        out[i + j * 4] = sum;
      }
    }
    return out;
  }
};

export default GeminiMathMatrix4x4;
