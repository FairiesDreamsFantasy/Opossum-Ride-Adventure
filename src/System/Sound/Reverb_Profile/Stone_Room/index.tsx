/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Stone Room profile.
 * Models a hard-walled medium-sized space with bright metallic decay.
 */
export class StoneRoomReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 2.2;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 2.5);
      // Brighter, more metallic feel
      const flutter = Math.sin(t * Math.PI * 180) * 0.1 + 0.9;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * flutter * 0.42;
      rightData[i] = (Math.random() * 2 - 1) * decay * flutter * 0.42;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
