/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SFX Instrument General Submodule
 * Provides modular instrument voices combining 8-bit, 16-bit, 32-bit, and 64-bit waveforms
 * with acoustic resonators for rich synthesized sound design.
 */

export class SFXInstrumentSynthesizer {
  public playNote(
    ctx: AudioContext,
    destination: AudioNode,
    frequency: number,
    duration: number = 0.5,
    bitDepth: 8 | 16 | 32 | 64 = 32,
    waveform: OscillatorType = "triangle"
  ) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, now);

    // Bit-depth acoustic filter shaping
    filter.type = "lowpass";
    const cutoff = bitDepth === 8 ? 2000 : bitDepth === 16 ? 6000 : 16000;
    filter.frequency.setValueAtTime(cutoff, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + duration);
  }
}

export const globalSFXInstrument = new SFXInstrumentSynthesizer();
