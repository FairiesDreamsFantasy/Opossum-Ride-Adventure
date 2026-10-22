/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Stone Corridor profile.
 * Models a long stone hallway with high-density reflections.
 */
export class StoneCorridorReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 2.5;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 2.2);
      // High density stone reflections
      const density = Math.sin(t * Math.PI * 150) * 0.2 + 0.8;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * density * 0.4;
      rightData[i] = (Math.random() * 2 - 1) * decay * density * 0.4;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
