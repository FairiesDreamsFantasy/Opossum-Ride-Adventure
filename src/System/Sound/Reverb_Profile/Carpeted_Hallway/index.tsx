/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Carpeted Hallway profile.
 * Models a muffled narrow space with high absorption (soft decay).
 */
export class CarpetedHallwayReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 0.8; // Very short decay
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 8.0); // Muffled absorption
      
      leftData[i] = (Math.random() * 2 - 1) * decay * 0.25;
      rightData[i] = (Math.random() * 2 - 1) * decay * 0.25;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
