/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Forest profile.
 * Models a dense woodland with multiple scattered reflections (trees).
 */
export class ForestReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 2.4;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 2.8);
      // Scattered reflections from trunks
      const scatter = Math.abs(Math.sin(t * Math.PI * 45)) > 0.85 ? 1.4 : 0.6;
      leftData[i] = (Math.random() * 2 - 1) * decay * scatter * 0.38;
      rightData[i] = (Math.random() * 2 - 1) * decay * scatter * 0.38;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
