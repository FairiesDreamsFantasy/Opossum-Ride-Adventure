/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural background ambient synthesis patterns with advanced DSP mathematics.
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
    
    // Mathematical ADSR Envelope with exponential smoothing
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.1); // Attack
    gainNode.gain.setValueAtTime(volume, now + durationSec - 0.15); // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec); // Release
    
    osc.start(now);
    osc.stop(now + durationSec);
  },

  /**
   * Advanced Frequency Modulation (FM) synthesis for rich ambient pads.
   */
  triggerFMPad(
    ctx: AudioContext,
    destination: AudioNode,
    carrierFreq: number,
    modulatorFreq: number,
    modulationIndex: number,
    durationSec: number,
    volume: number = 0.04
  ) {
    const now = ctx.currentTime;
    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const gainNode = ctx.createGain();

    carrier.type = "sine";
    modulator.type = "triangle";

    carrier.frequency.setValueAtTime(carrierFreq, now);
    modulator.frequency.setValueAtTime(modulatorFreq, now);

    // FM Synthesis mathematical routing: Modulator -> ModGain -> Carrier.frequency
    modGain.gain.setValueAtTime(modulationIndex * modulatorFreq, now);
    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    carrier.connect(gainNode);
    gainNode.connect(destination);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.3);
    gainNode.gain.setValueAtTime(volume, now + durationSec - 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + durationSec);
    carrier.stop(now + durationSec);
  }
};

export default SynthesizerBGM;
