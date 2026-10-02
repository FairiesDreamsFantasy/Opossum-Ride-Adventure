/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Arena profile.
 * Models a massive stadium-like space with long pre-delay and slow decay.
 */
export class ArenaReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 6.0;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 0.8);
      // Long distance reflections
      let distanceMod = 1.0;
      if (t < 0.12) distanceMod = 0.05; // Significant pre-delay
      
      leftData[i] = (Math.random() * 2 - 1) * decay * distanceMod * 0.45;
      rightData[i] = (Math.random() * 2 - 1) * decay * distanceMod * 0.45;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
