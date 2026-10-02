/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Quarry profile.
 * Models an open rocky excavation with strong single reflections.
 */
export class QuarryReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 3.5;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 1.8);
      // Quarry wall reflections
      const walls = Math.abs(Math.sin(t * Math.PI * 80)) > 0.9 ? 1.8 : 0.5;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * walls * 0.38;
      rightData[i] = (Math.random() * 2 - 1) * decay * walls * 0.38;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
