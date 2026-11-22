/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NativeCEngine } from "../Assembly/C";
import { EngineKinematicsKernelCPP, IVerletParticle } from "../C_Plus_Plus";
import { WebAssemblyCoreEngine } from "../Web_Assembly";
import { ScientificPythonEngine } from "../Python";

const _nativeCStabilizer = new NativeCEngine();
const _wasmCoreStabilizer = new WebAssemblyCoreEngine();
const _pythonScientificStabilizer = new ScientificPythonEngine();

/**
 * High-Precision Delta Time Smoothing Filter
 * Prevents physics stuttering by averaging frame deltas over a scientific window
 * with Python trimmed-mean outlier rejection and IEEE 754 float64 flushing.
 */
export class DeltaTimerFilter {
  private samples: number[] = [];
  private readonly windowSize = 8;

  public smooth(delta: number): number {
    const cleanDelta = _wasmCoreStabilizer.stabilizeFloat64(
      _nativeCStabilizer.sanitizeFloat64Bounds(delta, 0.0005, 0.05, 0.016667),
      0.016667
    );
    this.samples.push(cleanDelta);
    if (this.samples.length > this.windowSize) {
      this.samples.shift();
    }
    return _pythonScientificStabilizer.stabilizeDeltaSeries(this.samples, 0.05);
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
    const wasmClean = _wasmCoreStabilizer.stabilizeFloat64(rawDelta, 0.016);
    if (!Number.isFinite(wasmClean) || wasmClean <= 0) return 0.016;
    return _nativeCStabilizer.sanitizeFloat64Bounds(wasmClean, 0.0005, this.MAX_DELTA, 0.016);
  }

  public static stabilizeDspGain(linearGain: number, ceiling: number = 0.985): number {
    return _wasmCoreStabilizer.computeDspSafetyGain(linearGain, ceiling);
  }

  public static stabilizeVerletStep(particle: IVerletParticle, dtSeconds: number): IVerletParticle {
    return EngineKinematicsKernelCPP.stabilizeDampedVerlet(particle, this.sanitizeDelta(dtSeconds));
  }

  public static computeFrameChecksum(values: readonly number[]): number {
    return _nativeCStabilizer.computeTelemetryChecksum16(values);
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

