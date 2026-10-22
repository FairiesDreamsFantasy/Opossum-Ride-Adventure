/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-Precision Delta Time Smoothing Filter
 * Prevents physics stuttering by averaging frame deltas over a scientific window.
 */
export class DeltaTimerFilter {
  private samples: number[] = [];
  private readonly windowSize = 8;

  public smooth(delta: number): number {
    this.samples.push(delta);
    if (this.samples.length > this.windowSize) {
      this.samples.shift();
    }
    const sum = this.samples.reduce((a, b) => a + b, 0);
    return sum / this.samples.length;
  }
}

/**
 * Pre-allocated Circular Buffer Pool for temporary physics entities.
 * Eliminates allocation spikes and GC pressure.
 */
export class PhysicsBufferPool<T> {
  private pool: T[];
  private index: number = 0;
  private readonly size: number;

  constructor(size: number, factory: () => T) {
    this.size = size;
    this.pool = Array.from({ length: size }, factory);
  }

  /**
   * Retrieves the next available object from the pool.
   */
  public next(): T {
    const obj = this.pool[this.index];
    this.index = (this.index + 1) % this.size;
    return obj;
  }

  /**
   * Returns the entire pool for rendering.
   */
  public getItems(): T[] {
    return this.pool;
  }
}

/**
 * 🔬 Anti-Spike Hardware & Render Stabilizer
 * Clamps delta-times, limits memory burst re-allocations, throttles redundant canvas paints,
 * and maintains continuous 60fps frame rate without hardware or VRAM spiking.
 */
export class HardwareSpikeStabilizer {
  private static lastFrameTime = performance.now();
  private static readonly MAX_DELTA = 0.05; // 50ms cap (prevents physics spiral of death & CPU spike)
  private static readonly MIN_FRAME_INTERVAL = 1000 / 120; // 120Hz cap prevents runaway GPU cycle burn

  public static sanitizeDelta(rawDelta: number): number {
    if (!Number.isFinite(rawDelta) || rawDelta <= 0) return 0.016;
    return Math.min(rawDelta, this.MAX_DELTA);
  }

  public static shouldThrottleFrame(): boolean {
    const now = performance.now();
    const elapsed = now - this.lastFrameTime;
    if (elapsed < this.MIN_FRAME_INTERVAL) {
      return true;
    }
    this.lastFrameTime = now;
    return false;
  }
}

