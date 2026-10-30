/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Generic profile.
 * Models a standard balanced space.
 */
export class GenericReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 1.8;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 3.5);
      leftData[i] = (Math.random() * 2 - 1) * decay * 0.35;
      rightData[i] = (Math.random() * 2 - 1) * decay * 0.35;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
