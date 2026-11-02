/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WebAssembly 64-Bit Physics & DSP Engine Bridge
 * Interfaces directly with Assets/C/index.c compiled WebAssembly module (/Assets/Web_Assembly/index.wasm).
 */

export interface WasmEngineExports {
  calculate_force?: (mass: number, accel: number) => number;
  calculate_velocity?: (v0: number, accel: number, time: number) => number;
  calculate_distance?: (v0: number, time: number, accel: number) => number;
  detect_collision?: (x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) => number;
  
  // 64-Bit Precision C Exports from Assets/C/index.c
  calculate_opossum_trajectory_64?: (y: number, vy: number, g: number, dt: number) => number;
  calculate_chatter_frequency_64?: (base: number, pitchOffsetRatio: number) => number;
  check_bounding_box_collision_64?: (
    minAx: number, maxAx: number, minAy: number, maxAy: number,
    minBx: number, maxBx: number, minBy: number, maxBy: number
  ) => number;
  calculate_distance_3d_64?: (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => number;
}

export class PhysicsWasmBridge {
  private static instance: WebAssembly.Instance | null = null;
  private static isInitializing = false;

  public static async init(): Promise<void> {
    if (this.instance || this.isInitializing) return;
    this.isInitializing = true;

    try {
      if (typeof window !== 'undefined' && window.fetch) {
        const response = await fetch('/Assets/Web_Assembly/index.wasm');
        if (response.ok) {
          const bytes = await response.arrayBuffer();
          const result = await WebAssembly.instantiate(bytes);
          this.instance = result.instance;
        }
      }
    } catch (err) {
      console.warn('WASM binary load notice, using pure JS fallback computations:', err);
    } finally {
      this.isInitializing = false;
    }
  }

  public static getExports(): WasmEngineExports {
    return (this.instance?.exports as unknown as WasmEngineExports) || {};
  }

  /**
   * High-level wrapper for 64-bit C Opossum Trajectory Computation.
   * Uses WASM C routine if available, falling back to JS float64 math.
   */
  public static calculateOpossumTrajectory64(
    currentY: number,
    velocityY: number,
    gravity: number,
    delta: number
  ): number {
    const exports = this.getExports();
    if (exports.calculate_opossum_trajectory_64) {
      return exports.calculate_opossum_trajectory_64(currentY, velocityY, gravity, delta);
    }
    // JS 64-bit float fallback
    return currentY + (velocityY * delta) - (0.5 * gravity * delta * delta);
  }

  /**
   * High-level wrapper for 64-bit C Vocal Chatter Frequency Computation.
   * Uses WASM C routine if available, falling back to JS float64 math.
   */
  public static calculateChatterFrequency64(
    baseFreq: number,
    pitchOffsetRatio: number
  ): number {
    const exports = this.getExports();
    if (exports.calculate_chatter_frequency_64) {
      return exports.calculate_chatter_frequency_64(baseFreq, pitchOffsetRatio);
    }
    // JS 64-bit float fallback
    return baseFreq * (1.000000000000 + pitchOffsetRatio);
  }

  /**
   * High-level wrapper for 64-bit C Bounding Box Collision Detection.
   */
  public static checkBoundingBoxCollision64(
    minAx: number, maxAx: number, minAy: number, maxAy: number,
    minBx: number, maxBx: number, minBy: number, maxBy: number
  ): boolean {
    const exports = this.getExports();
    if (exports.check_bounding_box_collision_64) {
      return exports.check_bounding_box_collision_64(
        minAx, maxAx, minAy, maxAy, minBx, maxBx, minBy, maxBy
      ) === 1;
    }
    // JS 64-bit fallback
    if (maxAx < minBx || minAx > maxBx) return false;
    if (maxAy < minBy || minAy > maxBy) return false;
    return true;
  }
}
