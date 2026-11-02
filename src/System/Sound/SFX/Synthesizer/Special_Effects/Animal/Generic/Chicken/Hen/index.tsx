/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GenericHenSynthesizer {
  public static playCluck(context: AudioContext, destination: AudioNode, pitchOffset: number = 1.0): void {
    const now = context.currentTime;
    
    // Play 3 successive short clucks to sound realistic
    for (let i = 0; i < 3; i++) {
      const delay = i * 0.15;
      const t = now + delay;
      
      const osc = context.createOscillator();
      const gainNode = context.createGain();
      const filter = context.createBiquadFilter();

      const baseFreq = (380 + (Math.random() * 40)) * pitchOffset;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, t + 0.08);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, t);

      gainNode.gain.setValueAtTime(0.001, t);
      gainNode.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(destination);

      osc.start(t);
      osc.stop(t + 0.12);
    }
  }
}
