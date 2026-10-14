/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Butterfly Sanctuary - BGM Track Engine
 * Fluttering, delicate, high-frequency airy silk sanctuary track in Key of E.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class ButterflySanctuaryTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // High octave airy fluttering multipliers
  private readonly measurePitchMultipliers = [1.260, 1.498, 1.682, 2.000, 2.245, 2.520];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 4.5;
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Light, airy high-octave plucks representing butterfly wingbeats
        for (let noteStep = 0; noteStep < 4; noteStep++) {
          const noteTime = measureStart + noteStep * 0.95;
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

export const globalButterflySanctuaryTrack = new ButterflySanctuaryTrackEngine();
