/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClassicSynthesizer } from "../../../Synthesizer/Classic_Synthesizer";

/**
 * BGM Classic Synthesizer:
 * Provides retro 8-bit / 16-bit musical lead, arpeggio, and bassline playback for BGM tracks.
 */
export class BGMClassicSynthesizer {
  private classicEngine = new ClassicSynthesizer();

  /**
   * Plays a classic 25% duty-cycle pulse lead note for BGM melodies.
   */
  public playLeadPulse(
    context: AudioContext,
    destination: AudioNode,
    freqHz: number,
    durationSeconds: number,
    volume: number = 0.22,
    dutyCycle: number = 0.25
  ) {
    return this.classicEngine.playPulseNote(context, destination, freqHz, durationSeconds, dutyCycle, volume);
  }

  /**
   * Plays a classic triangle wave sub-bassline note for BGM rhythms.
   */
  public playSubBassLine(
    context: AudioContext,
    destination: AudioNode,
    freqHz: number,
    durationSeconds: number,
    volume: number = 0.30
  ) {
    return this.classicEngine.playTriangleSubBassNote(context, destination, freqHz, durationSeconds, volume);
  }

  /**
   * Plays an authentic retro LFSR noise hi-hat or snare for BGM percussion.
   */
  public playChipNoisePercussion(
    context: AudioContext,
    destination: AudioNode,
    durationSeconds: number = 0.12,
    pitchHz: number = 800,
    volume: number = 0.15
  ) {
    return this.classicEngine.playLFSRNoiseNote(context, destination, durationSeconds, pitchHz, volume);
  }
}
