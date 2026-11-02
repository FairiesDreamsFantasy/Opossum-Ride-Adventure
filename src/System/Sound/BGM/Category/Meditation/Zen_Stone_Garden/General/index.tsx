/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Zen Stone Garden - BGM Track Engine
 * Serene, minimalist Japanese koto and shakuhachi flute meditation track in Key of E.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class ZenStoneGardenTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // Zen pentatonic pitch multipliers
  private readonly measurePitchMultipliers = [1.00, 1.059, 1.260, 1.335, 1.498, 1.682];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 5.0; // Slower, tranquil 5-second measures
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Pluck peaceful koto notes
        for (let noteStep = 0; noteStep < 2; noteStep++) {
          const noteTime = measureStart + noteStep * 2.1;
          const noteIndex = (this.bgmMeasureIndex + noteStep) % 5;
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

      this.bgmTimeoutId = setTimeout(scheduler, 150);
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

export const globalZenStoneGardenTrack = new ZenStoneGardenTrackEngine();
