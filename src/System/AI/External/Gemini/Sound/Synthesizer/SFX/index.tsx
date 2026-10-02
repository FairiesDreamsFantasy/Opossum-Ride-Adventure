/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural SFX generation parameters and frequencies.
 */
export const SynthesizerSFX = {
  /**
   * Synthesizes a high-fidelity jump swoosh.
   */
  playSynthesizedJump(ctx: AudioContext, destination: AudioNode) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.linearRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  },

  /**
   * Synthesizes an alert click chime.
   */
  playSynthesizedClick(ctx: AudioContext, destination: AudioNode) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(440, now + 0.05);

    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.1);

    osc.start(now);
    osc.stop(now + 0.1);
  }
};
