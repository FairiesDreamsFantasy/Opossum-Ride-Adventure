/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProceduralNoiseFields — Deterministic Value Noise & Multi-Octave fBm Texture Synthesizer.
 */

export class ProceduralNoiseFields {
  public static hash2D(ix: number, iy: number, seed: number = 1337): number {
    let h = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263) + Math.imul(seed | 0, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }

  public static valueNoise2D(x: number, y: number, seed: number = 1337): number {
    const sx = Number.isFinite(x) ? x : 0;
    const sy = Number.isFinite(y) ? y : 0;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    const fx = sx - ix;
    const fy = sy - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);

    const a = this.hash2D(ix, iy, seed);
    const b = this.hash2D(ix + 1, iy, seed);
    const c = this.hash2D(ix, iy + 1, seed);
    const d = this.hash2D(ix + 1, iy + 1, seed);

    return (a * (1 - ux) + b * ux) * (1 - uy) + (c * (1 - ux) + d * ux) * uy;
  }

  public static fbm2D(x: number, y: number, octaves: number = 4, seed: number = 1337): number {
    const safeOctaves = Math.max(1, Math.min(8, Math.floor(Number.isFinite(octaves) ? octaves : 4)));
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1.0;
    let maxWeight = 0;

    for (let i = 0; i < safeOctaves; i++) {
      value += amplitude * this.valueNoise2D(x * frequency, y * frequency, seed + i * 97);
      maxWeight += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return maxWeight > 0 ? value / maxWeight : 0;
  }
}
