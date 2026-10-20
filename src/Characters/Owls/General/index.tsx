/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Owl Character Module
 * Features local frequency-sweep synthesis for "Hoot" vocalizations.
 */
export class OwlCharacter {
  public playHoot(ctx: AudioContext, dest: AudioNode) {
    const now = ctx.currentTime;
    
    // Classic double hoot: "Hoo... Hoo-hoo"
    const triggerHoot = (startTime: number, pitch: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, startTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.9, startTime + 0.3);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      
      osc.connect(gain);
      gain.connect(dest);
      
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    };

    triggerHoot(now, 220); // Hoo
    triggerHoot(now + 0.6, 220); // Hoo
    triggerHoot(now + 0.8, 200); // hoo
  }
}

export const globalOwl = new OwlCharacter();
