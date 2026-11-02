/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Japanese Meditation Instruments General Submodule
 * Emulates traditional Japanese koto and shakuhachi scales in key of E (Pentatonic / Insen scale).
 */

export class JapaneseMeditationInstrumentEngine {
  // Key of E Pentatonic / Insen frequencies across octaves
  // Degree 0: E (329.63), 1: F# (369.99), 2: G# (415.30), 3: B (493.88), 4: C# (554.37), 5: E5 (659.25)
  private readonly scales = [329.63, 369.99, 415.30, 493.88, 554.37, 659.25, 739.99, 830.61];

  public playKotoPluck(
    context: AudioContext,
    destination: AudioNode,
    noteIndex: number = 0,
    startTime: number = context.currentTime,
    pitchMultiplier: number = 1.0
  ): void {
    const now = startTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFreq = this.scales[noteIndex % this.scales.length];
    const freq = baseFreq * pitchMultiplier;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 1.8);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }
}

export const globalJapaneseMeditationInstrument = new JapaneseMeditationInstrumentEngine();
