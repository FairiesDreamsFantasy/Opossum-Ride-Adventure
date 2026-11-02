/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericBoarSynthesizer {
  public static playBoarGrunt(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    const LFO = context.createOscillator();
    const LFOGain = context.createGain();

    const baseFreq = 88 * pitchOffset; // Deep resonant boar grunt

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, now + 0.32);

    LFO.frequency.setValueAtTime(22, now); // Rough gutteral oscillation
    LFOGain.gain.setValueAtTime(24, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(380, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    LFO.connect(LFOGain);
    LFOGain.connect(osc.frequency);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    LFO.start(now);
    osc.stop(now + 0.38);
    LFO.stop(now + 0.38);
  }

  public static playBoarSnort(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(145 * pitchOffset, now);
    osc.frequency.linearRampToValueAtTime(95 * pitchOffset, now + 0.18);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(520, now);
    filter.Q.setValueAtTime(5.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }
}
