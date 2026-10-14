/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Precision Envelope Generator for acoustic synthesis.
 */
export class PrecisionEnvelope {
  constructor(private ctx: AudioContext, private gainNode: GainNode) {}

  public trigger(attack: number, decay: number, sustain: number, release: number, peak: number) {
    const now = this.ctx.currentTime;
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(peak, now + attack);
    this.gainNode.gain.exponentialRampToValueAtTime(sustain * peak, now + attack + decay);
    this.gainNode.gain.setValueAtTime(sustain * peak, now + attack + decay + 0.1); // Sustain
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay + 0.1 + release);
  }
}
