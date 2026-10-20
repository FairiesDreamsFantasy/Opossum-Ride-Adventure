/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BGMUltraModulesGeneral } from "./General";

export * from "./General";

/**
 * Ultra-Scientific BGM Synthesizer Modules:
 * Advanced procedural FM canopy synthesizer, additive harmonic resonance stacker,
 * and atmospheric sub-bass LFO drone.
 */
export class BGMUltraModulesSynthesizer {
  /**
   * FM Canopy Ambient Synth:
   * Multi-operator FM matrix generating organic, shimmering forest ambient textures.
   */
  public playFMCanopyAmbientNote(
    context: AudioContext,
    destination: AudioNode,
    carrierFreqHz: number,
    durationSeconds: number,
    options: { modulatorRatio?: number; modulationIndex?: number; volume?: number } = {}
  ) {
    const now = context.currentTime;
    const modRatio = options.modulatorRatio ?? BGMUltraModulesGeneral.fmPresetRatios.canopy_breeze.modulatorRatio;
    const modIndex = options.modulationIndex ?? BGMUltraModulesGeneral.fmPresetRatios.canopy_breeze.modulationIndex;
    const volume = options.volume ?? 0.22;

    const carrier = context.createOscillator();
    const modulator = context.createOscillator();
    const modGain = context.createGain();
    const mainGain = context.createGain();

    const modFreq = carrierFreqHz * modRatio;
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(modFreq, now);

    modGain.gain.setValueAtTime(modIndex, now);
    modGain.gain.exponentialRampToValueAtTime(10, now + durationSeconds);

    carrier.type = "sine";
    carrier.frequency.setValueAtTime(carrierFreqHz, now);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    mainGain.gain.setValueAtTime(0.001, now);
    mainGain.gain.linearRampToValueAtTime(volume, now + 0.15);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    carrier.connect(mainGain);
    mainGain.connect(destination);

    modulator.start(now);
    carrier.start(now);

    const endTime = now + durationSeconds;
    modulator.stop(endTime);
    carrier.stop(endTime);

    return { carrier, modulator, modGain, mainGain, endTime };
  }

  /**
   * Additive Harmonic Resonator:
   * Synthesizes rich evolving harmonies by stacking pure sinusoidal partials (1st to 8th harmonic).
   */
  public playAdditiveHarmonicPad(
    context: AudioContext,
    destination: AudioNode,
    fundamentalHz: number,
    durationSeconds: number,
    options: { harmonicsCount?: number; volume?: number } = {}
  ) {
    const now = context.currentTime;
    const count = Math.min(8, options.harmonicsCount ?? 5);
    const totalVolume = options.volume ?? 0.25;

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(totalVolume, now + 0.3);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    masterGain.connect(destination);

    const oscNodes: OscillatorNode[] = [];
    for (let i = 1; i <= count; i++) {
      const osc = context.createOscillator();
      const gain = context.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(fundamentalHz * i, now);

      // Inverse harmonic falloff amplitude (1/n)
      const partialVol = (1 / i) * (1 / count);
      gain.gain.setValueAtTime(partialVol, now);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + durationSeconds);
      oscNodes.push(osc);
    }

    return { oscNodes, masterGain, endTime: now + durationSeconds };
  }

  /**
   * Atmospheric Sub-Bass LFO Drone:
   * Deep 25-45Hz sub-bass with low-frequency rate modulation for environmental immersion.
   */
  public playSubBassLFODrone(
    context: AudioContext,
    destination: AudioNode,
    subFreqHz: number = 32,
    durationSeconds: number = 2.5,
    options: { lfoRateHz?: number; volume?: number } = {}
  ) {
    const now = context.currentTime;
    const lfoRate = options.lfoRateHz ?? 0.35;
    const volume = options.volume ?? 0.35;

    const subOsc = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    const mainGain = context.createGain();

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(subFreqHz, now);

    lfo.type = "sine";
    lfo.frequency.setValueAtTime(lfoRate, now);
    lfoGain.gain.setValueAtTime(4.5, now); // Pitch wobble depth

    lfo.connect(lfoGain);
    lfoGain.connect(subOsc.frequency);

    mainGain.gain.setValueAtTime(0.001, now);
    mainGain.gain.linearRampToValueAtTime(volume, now + 0.2);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    subOsc.connect(mainGain);
    mainGain.connect(destination);

    lfo.start(now);
    subOsc.start(now);

    const endTime = now + durationSeconds;
    lfo.stop(endTime);
    subOsc.stop(endTime);

    return { subOsc, lfo, lfoGain, mainGain, endTime };
  }
}
