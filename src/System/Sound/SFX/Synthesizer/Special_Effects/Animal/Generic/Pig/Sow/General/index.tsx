/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericSowSynthesizer {
  public static playSowSqueal(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    const LFO = context.createOscillator();
    const LFOGain = context.createGain();

    const baseFreq = 540 * pitchOffset;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.35, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, now + 0.45);

    LFO.frequency.setValueAtTime(16, now);
    LFOGain.gain.setValueAtTime(35, now);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(4.2, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.26, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    LFO.connect(LFOGain);
    LFOGain.connect(osc.frequency);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    LFO.start(now);
    osc.stop(now + 0.5);
    LFO.stop(now + 0.5);
  }
}
