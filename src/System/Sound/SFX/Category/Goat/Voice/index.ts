/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams } from "../../../../../../Characters/Goats/types";
import { getGoatCameoById } from "../../../../../../Characters/Goats";

/**
 * GoatVocalSound
 * Synthesizes multi-harmonic FM vocal-cord bleats adapted faithfully from Goat Ride Adventure,
 * calibrated strictly at soft, gentle pasture volumes that blend underneath farm ambience & BGM.
 */
export const GoatVocalSound = {
  /**
   * Play soft social bleat for a named core goat cameo or juvenile kid.
   */
  playCameoBleat(
    ctx: AudioContext,
    destination: AudioNode,
    goatIdOrSpecs: string | GoatCameoAudioParams,
    distance: number = 0,
    isKid: boolean = false
  ): void {
    const now = ctx.currentTime;
    // Distance attenuation & soft ceiling so multiple goats never overpower ambience
    const distanceFalloff = Math.max(0.02, 1 / (1 + Math.max(0, distance) * 0.048));
    const softnessCeiling = isKid ? 0.048 : 0.056;
    const masterAmp = softnessCeiling * distanceFalloff;

    const specs: GoatCameoAudioParams =
      typeof goatIdOrSpecs === "string"
        ? getGoatCameoById(goatIdOrSpecs).audio
        : goatIdOrSpecs;

    const {
      baseFreq,
      duration,
      fmRate,
      fmDepth,
      oscType,
      pitchSweepRatio = 0.8,
      secondOscType,
      secondOscFreqRatio = 2.0,
      filterFreq,
      filterType,
      filterQ = 5
    } = specs;

    // Gentle organic pitch micro-variance (+/- 2.5%) for natural herd variety
    const microDetune = 0.975 + Math.random() * 0.05;
    const f0 = Math.max(55, baseFreq * microDetune);
    const dur = Math.max(0.24, Math.min(1.35, duration));

    const createVocalCord = (freq: number, harmonicWeight: number, type: OscillatorType) => {
      const osc = ctx.createOscillator();
      const fm = ctx.createOscillator();
      const fmGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(30, freq * pitchSweepRatio),
        now + dur * 0.82
      );

      fm.type = "sine";
      fm.frequency.setValueAtTime(fmRate, now);
      fmGain.gain.setValueAtTime(freq * fmDepth, now);

      fm.connect(fmGain);
      fmGain.connect(osc.frequency);

      const peakGain = Math.max(0.002, masterAmp * harmonicWeight);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.035);
      gain.gain.setValueAtTime(peakGain * 0.85, now + dur * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      if (filterFreq && filterType) {
        const filter = ctx.createBiquadFilter();
        filter.type = filterType;
        filter.frequency.setValueAtTime(filterFreq, now);
        filter.Q.setValueAtTime(filterQ, now);
        osc.connect(filter);
        filter.connect(gain);
      } else {
        // Gentle lowpass warmth on sawtooth/square harmonics so soft pasture bleats stay mellow
        const warmFilter = ctx.createBiquadFilter();
        warmFilter.type = "lowpass";
        warmFilter.frequency.setValueAtTime(isKid ? 1850 : 1450, now);
        osc.connect(warmFilter);
        warmFilter.connect(gain);
      }

      gain.connect(destination);

      const stopTime = now + dur + 0.02;
      osc.start(now);
      fm.start(now);
      osc.stop(stopTime);
      fm.stop(stopTime);
    };

    // Fundamental + 2nd harmonic + 3rd harmonic + optional secondary voice timbre
    createVocalCord(f0, 0.70, oscType);
    createVocalCord(f0 * 2, 0.32, oscType);
    createVocalCord(f0 * 3, 0.14, oscType);

    if (secondOscType) {
      createVocalCord(f0 * secondOscFreqRatio, 0.28, secondOscType);
    }
  }
};
