/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Orchid Glasshouse - BGM Track Engine
 * Resonant crystal pavilion harmonics and echoing koto glass reverberation track in Key of E.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class OrchidGlasshouseTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // Crystal glasshouse harmonic scale multipliers
  private readonly measurePitchMultipliers = [1.000, 1.122, 1.335, 1.498, 1.782, 2.000];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 4.0;
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Echoing crystal bell & koto notes reflecting off glass panes
        for (let noteStep = 0; noteStep < 3; noteStep++) {
          const noteTime = measureStart + noteStep * 1.25;
          const noteIndex = (this.bgmMeasureIndex + noteStep) % 6;
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

export const globalOrchidGlasshouseTrack = new OrchidGlasshouseTrackEngine();
