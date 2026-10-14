/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Hanger profile.
 * Models a massive metal industrial space with long echo.
 */
export class HangerReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 4.5;
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 1.6);
      // Metal hanger resonances
      const resonance = Math.sin(t * Math.PI * 220) * 0.15 + 0.85;
      
      leftData[i] = (Math.random() * 2 - 1) * decay * resonance * 0.44;
      rightData[i] = (Math.random() * 2 - 1) * decay * resonance * 0.44;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
