/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Local Web Audio mathematical sound utility algorithms.
 */
export const SoundEngineUtils = {
  /**
   * Translates sound frequency to MIDI note equivalent.
   * f = 440 * 2^((n - 69) / 12) => n = 12 * log2(f / 440) + 69
   */
  frequencyToMidiNote(frequencyHz: number): number {
    if (frequencyHz <= 0) return 0;
    return parseFloat((12 * Math.log2(frequencyHz / 440) + 69).toFixed(2));
  },

  /**
   * Converts MIDI note to standard sound frequency.
   */
  midiNoteToFrequency(note: number): number {
    return parseFloat((440 * Math.pow(2, (note - 69) / 12)).toFixed(2));
  },

  /**
   * Converts decibels to linear gain representation.
   * gain = 10^(db / 20)
   */
  dbToLinearGain(db: number): number {
    return parseFloat(Math.pow(10, db / 20).toFixed(4));
  }
};
