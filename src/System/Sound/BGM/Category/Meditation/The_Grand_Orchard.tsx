/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { globalMeditationBGM } from "./General";

class GrandOrchardTrack {
  private activeTrack: { stop: () => void } | null = null;
  private currentFreq: number = 261.63; // C4
  private cycleTimeout: any = null;

  public startTrack(context: AudioContext, destination: AudioNode) {
    this.stopTrack();
    
    const freqs = [261.63, 392.00, 349.23, 440.00]; // C, G, F, A
    
    const playCycle = () => {
      this.currentFreq = freqs[Math.floor(Math.random() * freqs.length)];
      
      // Stop previous if exists (smooth fade out handled in playOrchardMeditationDrone.stop)
      if (this.activeTrack) {
        this.activeTrack.stop();
      }
      
      this.activeTrack = globalMeditationBGM.playOrchardMeditationDrone(context, destination, this.currentFreq);
      
      // Cycle every 12 to 18 seconds (arbitrarily short tracks)
      const delay = 12000 + Math.random() * 6000;
      this.cycleTimeout = setTimeout(() => {
        playCycle();
      }, delay);
    };

    playCycle();
  }

  public stopTrack() {
    if (this.cycleTimeout) {
      clearTimeout(this.cycleTimeout);
      this.cycleTimeout = null;
    }
    if (this.activeTrack) {
      this.activeTrack.stop();
      this.activeTrack = null;
    }
  }
}

export const globalTheGrandOrchardTrack = new GrandOrchardTrack();
