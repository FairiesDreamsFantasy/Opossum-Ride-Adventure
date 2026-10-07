/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClassicSynthesizer } from "../../../Synthesizer/Classic_Synthesizer";

/**
 * SFX Classic Synthesizer:
 * Provides classic arcade blips, vintage coin chimes, retro bounce leaps, and chip explosions.
 */
export class SFXClassicSynthesizer {
  private classicEngine = new ClassicSynthesizer();

  /**
   * Retro Arcade Blip / Menu Select.
   */
  public playArcadeBlip(
    context: AudioContext,
    destination: AudioNode,
    freqHz: number = 880,
    durationSeconds: number = 0.06,
    volume: number = 0.20
  ) {
    return this.classicEngine.playPulseNote(context, destination, freqHz, durationSeconds, 0.50, volume);
  }

  /**
   * Vintage Coin / Star Pickup Chime (Two rapid pulse notes).
   */
  public playVintageCoinChime(
    context: AudioContext,
    destination: AudioNode,
    baseFreqHz: number = 987.77, // B5
    volume: number = 0.22
  ) {
    const res1 = this.classicEngine.playPulseNote(context, destination, baseFreqHz, 0.08, 0.25, volume);
    const res2 = this.classicEngine.playPulseNote(context, destination, baseFreqHz * 1.334, 0.18, 0.25, volume, context.currentTime + 0.07);
    return { endTime: res2.endTime };
  }

  /**
   * Classic Retro Jump Bounce (Rising pulse sweep).
   */
  public playClassicBounceJump(
    context: AudioContext,
    destination: AudioNode,
    startFreqHz: number = 180,
    endFreqHz: number = 520,
    durationSeconds: number = 0.16,
    volume: number = 0.25
  ) {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(startFreqHz, now);
    osc.frequency.exponentialRampToValueAtTime(endFreqHz, now + durationSeconds);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + durationSeconds + 0.01);

    return { osc, gain, endTime: now + durationSeconds };
  }

  /**
   * Retro 8-bit LFSR Explosion Rumble.
   */
  public playRetroExplosionRumble(
    context: AudioContext,
    destination: AudioNode,
    durationSeconds: number = 0.45,
    volume: number = 0.35
  ) {
    return this.classicEngine.playLFSRNoiseNote(context, destination, durationSeconds, 180, volume);
  }
}
