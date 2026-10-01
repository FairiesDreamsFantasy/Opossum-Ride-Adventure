/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./Classic_Synthesizer";
export * from "./General";

/**
 * Procedural Opossum Vocalization Synthesizer
 * Generates happy chatter and masculine grunts using mathematical oscillators.
 */
export class OpossumSynthesizer {
  private activeVoices: { osc: OscillatorNode; gain: GainNode; endTime: number }[] = [];

  public triggerOpossumHappyChatter(ctx: AudioContext, dest: AudioNode, isMale: boolean = false) {
    const anchorFactor = 1.0;
    const now = ctx.currentTime;
    const count = 6;
    const interval = 0.08;
    const duration = 0.04;
    const volume = 0.18;
    const type = isMale ? 'square' : 'sawtooth';

    for (let i = 0; i < count; i++) {
      const startTime = now + i * interval;
      const endTime = startTime + duration;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(1200 * anchorFactor, startTime);
      osc.frequency.exponentialRampToValueAtTime(400 * anchorFactor, endTime);

      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(startTime);
      osc.stop(endTime);

      this.activeVoices.push({ osc, gain, endTime });
    }
  }

  public pruneActiveVoices(currentTime: number) {
    this.activeVoices = this.activeVoices.filter(v => {
      if (currentTime >= v.endTime) {
        v.osc.disconnect();
        v.gain.disconnect();
        return false;
      }
      return true;
    });
  }
}
