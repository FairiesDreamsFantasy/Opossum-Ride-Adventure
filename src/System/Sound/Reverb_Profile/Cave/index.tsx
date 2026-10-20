/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural reverb generator for the Cave profile.
 * Models a massive, wet cavern with extremely long decay and high pre-delay.
 */
export class CaveReverbProfile {
  private impulseBuffer: AudioBuffer | null = null;

  public getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer {
    if (this.impulseBuffer) return this.impulseBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 4.2; // Extended scientific cave decay
    const numSamples = sampleRate * duration;
    const buffer = ctx.createBuffer(2, numSamples, sampleRate);

    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * 1.5);
      
      let echoGain = 1.0;
      if (t < 0.085) echoGain = 0.02; // Pre-delay for wall distance
      else if (t < 0.4) echoGain = Math.sin(t * Math.PI * 30) * 0.3 + 0.7;

      leftData[i] = (Math.random() * 2 - 1) * decay * echoGain * 0.45;
      rightData[i] = (Math.random() * 2 - 1) * decay * echoGain * 0.45;
    }

    this.impulseBuffer = buffer;
    return buffer;
  }
}
