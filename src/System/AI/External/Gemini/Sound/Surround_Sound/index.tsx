/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Spatial HRTF and Stereo Surround panning calculations.
 */
export const SoundSurround = {
  /**
   * Computes spatial gains based on relative angle (bearing) from listener to source.
   */
  calculateSurroundGains(bearingRad: number): {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  } {
    // Standard cosine/sine circular matrix panning
    const cosVal = Math.cos(bearingRad);
    const sinVal = Math.sin(bearingRad);

    const fL = Math.max(0, cosVal) * Math.max(0, -sinVal);
    const fR = Math.max(0, cosVal) * Math.max(0, sinVal);
    const rL = Math.max(0, -cosVal) * Math.max(0, -sinVal);
    const rR = Math.max(0, -cosVal) * Math.max(0, sinVal);

    // Normalize to keep power conservation
    const sum = Math.sqrt(fL * fL + fR * fR + rL * rL + rR * rR) || 1;

    return {
      frontLeft: parseFloat((fL / sum).toFixed(4)),
      frontRight: parseFloat((fR / sum).toFixed(4)),
      rearLeft: parseFloat((rL / sum).toFixed(4)),
      rearRight: parseFloat((rR / sum).toFixed(4))
    };
  }
};
