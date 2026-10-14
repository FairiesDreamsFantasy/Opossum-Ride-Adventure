/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Fanfare Synthesis Engine
 * Generates triumphant victory themes locally using frequency-sweep synthesis.
 */
export class ProceduralFanfare {
  public playLevelComplete(ctx: AudioContext, dest: AudioNode, arenaId: string) {
    const now = ctx.currentTime;
    
    // Triumphant Drone Base
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = "sawtooth";
    drone.frequency.setValueAtTime(110, now); // A2
    drone.frequency.exponentialRampToValueAtTime(220, now + 1.5);
    
    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    droneGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    
    drone.connect(droneGain);
    droneGain.connect(dest);
    
    // Arpeggiated Victory Flourish
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now + (i * 0.15));
      
      g.gain.setValueAtTime(0, now + (i * 0.15));
      g.gain.linearRampToValueAtTime(0.1, now + (i * 0.15) + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.15) + 1.0);
      
      osc.connect(g);
      g.connect(dest);
      
      osc.start(now + (i * 0.15));
      osc.stop(now + 2.0);
    });
    
    drone.start(now);
    drone.stop(now + 3.0);
  }
}

export const globalFanfare = new ProceduralFanfare();
