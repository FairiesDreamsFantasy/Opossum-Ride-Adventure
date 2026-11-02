/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Mountains profile.
 * Models a vast open space with distant mountain-face reflections (slapback).
 */
export class MountainsReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 5.0; 
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 1.2);
      
      // Slapback echo after ~450ms
      let echo = 1.0;
      if (t > 0.45 && t < 0.48) echo = 2.5;
      if (t > 0.90 && t < 0.94) echo = 1.8;

      leftData[i] = (Math.random() * 2 - 1) * decay * echo * 0.32;
      rightData[i] = (Math.random() * 2 - 1) * decay * echo * 0.32;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
