/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MONKEY_SOUND_PITCH_VARIABLES,
  calculateMonkeyPitchVariation,
  MonkeyVocalPitchVariable
} from "../../Variable";

/**
 * Procedural synthesis function for Monkey Chatter with granular pitch variation
 */
export const playMonkeyChatterSFX = (
  context: AudioContext,
  destination: AudioNode,
  pitchOffsetRatio: number = 0.0,
  presetKey: string = "high_curious_chatter"
) => {
  const preset = MONKEY_SOUND_PITCH_VARIABLES[presetKey] || MONKEY_SOUND_PITCH_VARIABLES.high_curious_chatter;
  const config = calculateMonkeyPitchVariation(preset, pitchOffsetRatio);

  const now = context.currentTime;
  const nodes: AudioNode[] = [];

  for (let i = 0; i < config.burstCount; i++) {
    const chirpStart = now + i * config.burstSpacingSeconds;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = config.waveform;
    osc.frequency.setValueAtTime(config.startFreq, chirpStart);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, config.endFreq),
      chirpStart + config.burstDurationSeconds
    );

    gain.gain.setValueAtTime(0.001, chirpStart);
    gain.gain.linearRampToValueAtTime(config.peakVolume, chirpStart + config.burstDurationSeconds * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, chirpStart + config.burstDurationSeconds);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(chirpStart);
    osc.stop(chirpStart + config.burstDurationSeconds + 0.01);

    nodes.push(osc, gain);
  }

  return {
    nodes,
    endTime: now + config.burstCount * config.burstSpacingSeconds + 0.05
  };
};
