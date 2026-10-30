/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural SFX generation parameters and frequencies with advanced DSP physics.
 */
export const SynthesizerSFX = {
  /**
   * Synthesizes a high-fidelity jump swoosh with harmonic overtone filtering.
   */
  playSynthesizedJump(ctx: AudioContext, destination: AudioNode) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const biquadFilter = ctx.createBiquadFilter();

    osc.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(800, now);
    biquadFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.15);
    biquadFilter.Q.setValueAtTime(3.5, now);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.linearRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  },

  /**
   * Synthesizes an alert click chime with dual-oscillator beat interference.
   */
  playSynthesizedClick(ctx: AudioContext, destination: AudioNode) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    osc1.type = "triangle";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.setValueAtTime(440, now + 0.05);

    osc2.frequency.setValueAtTime(884, now); // 4Hz beat interference
    osc2.frequency.setValueAtTime(442, now + 0.05);

    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.1);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.1);
    osc2.stop(now + 0.1);
  }
};

export default SynthesizerSFX;
