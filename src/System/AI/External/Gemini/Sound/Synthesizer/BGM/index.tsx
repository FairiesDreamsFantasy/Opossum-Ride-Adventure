/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural background ambient synthesis patterns.
 */
export const SynthesizerBGM = {
  /**
   * Triggers a musical note on a customized oscillator node with custom envelope.
   */
  triggerAmbientNote(
    ctx: AudioContext,
    destination: AudioNode,
    frequencyHz: number,
    durationSec: number,
    volume: number = 0.05
  ) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequencyHz, now);

    // ADSR Envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.1); // Attack
    gainNode.gain.setValueAtTime(volume, now + durationSec - 0.15); // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec); // Release

    osc.start(now);
    osc.stop(now + durationSec);
  }
};
