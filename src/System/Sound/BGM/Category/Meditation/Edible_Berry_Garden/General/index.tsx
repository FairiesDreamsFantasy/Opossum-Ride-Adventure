/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Edible Berry Garden - BGM Track Engine
 * Warm, joyful, folk meadow garden track in Key of E Major.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class EdibleBerryGardenTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // Joyful major orchard garden scale multipliers
  private readonly measurePitchMultipliers = [1.000, 1.125, 1.250, 1.333, 1.500, 1.667];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 3.6; // Vibrant 3.6-second joyful orchard cadence
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Warm, joyful meadow melody steps
        for (let noteStep = 0; noteStep < 3; noteStep++) {
          const noteTime = measureStart + noteStep * 1.1;
          const noteIndex = (this.bgmMeasureIndex + noteStep * 2) % 6;
          globalJapaneseMeditationInstrument.playKotoPluck(
            context,
            destination,
            noteIndex,
            noteTime,
            pitchMult
          );
        }

        this.bgmNextMeasureTime += measureDuration;
        this.bgmMeasureIndex++;
      }

      this.bgmTimeoutId = setTimeout(scheduler, 120);
    };

    scheduler();
  }

  public stopTrack(): void {
    if (this.activeDrone) {
      this.activeDrone.stop();
      this.activeDrone = null;
    }
    if (this.bgmTimeoutId) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
  }
}

export const globalEdibleBerryGardenTrack = new EdibleBerryGardenTrackEngine();
