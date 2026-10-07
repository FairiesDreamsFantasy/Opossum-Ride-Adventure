/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Alley profile.
 * Models a narrow outdoor brick passage with rapid flutter echo.
 */
export class AlleyReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 1.2;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 6.0);
      // Narrow alley flutter
      const flutter = Math.abs(Math.sin(t * Math.PI * 90)) > 0.8 ? 1.5 : 0.6;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * flutter * 0.35;
      rightData[i] = (Math.random() * 2 - 1) * decay * flutter * 0.35;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
