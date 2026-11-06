/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Weather Particle Buffer Pool
 * Native Rust Memory Safety Bridge
 */

export interface IParticleBufferToken {
  particleType: "Firefly" | "Rain" | "Mist" | "Pollen";
  count: number;
  isAllocated: boolean;
}

export class WorldParticleBufferPoolRust {
  private static buffers: Map<string, IParticleBufferToken> = new Map();

  public static allocateParticleBuffer(type: "Firefly" | "Rain" | "Mist" | "Pollen", count: number = 200): boolean {
    this.buffers.set(type, {
      particleType: type,
      count,
      isAllocated: true
    });
    return true;
  }

  public static isAllocated(type: string): boolean {
    return this.buffers.get(type)?.isAllocated || false;
  }
}

export default WorldParticleBufferPoolRust;
