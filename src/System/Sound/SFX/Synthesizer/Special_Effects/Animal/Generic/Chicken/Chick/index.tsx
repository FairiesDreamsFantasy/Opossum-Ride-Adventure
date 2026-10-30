/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericChickSynthesizer {
  public static playPeep(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    const baseFreq = 2200 * pitchOffset;

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.78, now + 0.12);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(gainNode);
    gainNode.connect(destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}
