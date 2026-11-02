/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DRAKE_SYNTHESIZER_PROFILE = {
  soundType: "typical_opossum_bark",
  baseFrequencyHz: 190,
  peakFrequencyHz: 340,
  endFrequencyHz: 125,
  attackTimeSec: 0.02,
  decayTimeSec: 0.16,
  filterType: "bandpass",
  filterQ: 3.2,
  waveform: {
    primary: "sawtooth",
    secondary: "triangle",
    retroPrimary: "square",
    retroSecondary: "sawtooth"
  }
};

export default DRAKE_SYNTHESIZER_PROFILE;
