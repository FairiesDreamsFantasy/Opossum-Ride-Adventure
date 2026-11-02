/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CaveWindVeryLight {
  public static play(context: AudioContext, destination: AudioNode): { stop: () => void } {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, now);
    gain.gain.setValueAtTime(0.01, now);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(now);
    return { stop: () => { try { osc.stop(); osc.disconnect(); } catch(e){} } };
  }
}
