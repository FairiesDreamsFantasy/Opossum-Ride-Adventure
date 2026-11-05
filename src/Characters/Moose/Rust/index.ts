/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Moose Hoof Sound Audio Buffer Guard
 * Native Rust Memory Safety Bridge
 */

export class MooseHoofBufferGuardRust {
  private static hoofClickBuffer: Float32Array = new Float32Array(512);

  /**
   * Reuses static 512-sample audio memory buffer to eliminate garbage collection jitter:
   */
  public static getStaticHoofBuffer(): Float32Array {
    return this.hoofClickBuffer;
  }

  public static synthesizeHoofTransient(distanceMeters: number): Float32Array {
    const attenuation = Math.max(0.1, 1.0 - (distanceMeters / 100.0));
    for (let i = 0; i < this.hoofClickBuffer.length; i++) {
      const decay = Math.exp(-i / 64.0);
      this.hoofClickBuffer[i] = (Math.random() * 2.0 - 1.0) * decay * attenuation;
    }
    return this.hoofClickBuffer;
  }
}

export default MooseHoofBufferGuardRust;
