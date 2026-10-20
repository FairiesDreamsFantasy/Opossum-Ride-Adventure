/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Hallway profile.
 * Models a long, narrow corridor with strong axial reflections.
 */
export class HallwayReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 1.5;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 5.0);
      // Corridor axial reflections
      const axial = Math.abs(Math.sin(t * Math.PI * 60)) > 0.95 ? 1.6 : 0.7;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * axial * 0.36;
      rightData[i] = (Math.random() * 2 - 1) * decay * axial * 0.36;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
