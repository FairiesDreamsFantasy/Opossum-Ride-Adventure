/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scientific Pseudorandom Generation Functions
 * Eliminates pseudoscience and raw non-deterministic Math.random() calls.
 * Uses robust mathematical seed-based algorithms for predictable, reproducible layouts.
 */

export class PseudorandomGenerator {
  private seed: number;

  constructor(seed: number = 12345) {
    this.seed = seed;
  }

  /**
   * Classic Mulberry32 algorithm for high-quality 32-bit float pseudorandom distribution.
   */
  public next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generates a pseudorandom number between min and max.
   */
  public range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  /**
   * Generates a pseudorandom integer between min and max (inclusive).
   */
  public intRange(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  /**
   * Picks a pseudorandom element from an array.
   */
  public choose<T>(arr: T[]): T {
    if (arr.length === 0) return undefined as any;
    const idx = this.intRange(0, arr.length - 1);
    return arr[idx];
  }
}

/**
 * Module of static, pure, typed pseudorandom functions to organize generator behaviors by type.
 */
export const PseudorandomFunctions = {
  /**
   * Generates obstacle positions scientifically based on level parameters and seed.
   */
  generateObstaclePlacements(levelId: number, count: number, startZ: number, endZ: number): { z: number; lane: number }[] {
    const rng = new PseudorandomGenerator(levelId * 777 + 99);
    const placements = [];
    const span = endZ - startZ;
    for (let i = 0; i < count; i++) {
      const z = startZ + (i * span) / Math.max(1, count) + rng.range(-5, 5);
      const lane = rng.intRange(-1, 1);
      placements.push({ z, lane });
    }
    return placements;
  },

  /**
   * Generates treat/tick positions scientifically based on level parameters and seed.
   */
  generateTreatPlacements(levelId: number, count: number, maxDistance: number): { z: number; lane: number; isTick: boolean }[] {
    const rng = new PseudorandomGenerator(levelId * 333 + 42);
    const placements = [];
    for (let i = 0; i < count; i++) {
      const z = 40 + (i * (maxDistance - 50)) / Math.max(1, count) + rng.range(-5, 5);
      const lane = rng.intRange(-1, 1);
      const isTick = rng.next() < 0.2;
      placements.push({ z, lane, isTick });
    }
    return placements;
  },

  /**
   * Generates opponents scientifically, eliminating hardcoded narrative selection.
   */
  generateOpponentConfigs(levelId: number, count: number): { z: number; lane: number; speed: number; isWild: boolean; monkeyBehavior: string }[] {
    const rng = new PseudorandomGenerator(levelId * 111 + 55);
    const configs = [];
    for (let i = 0; i < count; i++) {
      configs.push({
        z: 80 + i * 90 + rng.range(-10, 10),
        lane: rng.intRange(-1, 1),
        speed: rng.range(5, 9),
        isWild: rng.next() < 0.45,
        monkeyBehavior: rng.choose(["jumping", "climbing", "riding_normally"])
      });
    }
    return configs;
  }
};
