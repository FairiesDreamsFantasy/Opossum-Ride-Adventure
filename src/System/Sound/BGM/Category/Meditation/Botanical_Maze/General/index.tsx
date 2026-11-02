/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Botanical Maze - BGM Track Engine
 * Mysterious, labyrinthian meditative track with rhythmic boxwood woodblock accents in Key of E.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class BotanicalMazeTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // Labyrinth mystery scale multipliers
  private readonly measurePitchMultipliers = [1.00, 1.189, 1.335, 1.498, 1.587, 1.782];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 3.8; // Rhythmic 3.8-second labyrinth pacing
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Pluck koto with labyrinthian rhythmic delay
        for (let noteStep = 0; noteStep < 3; noteStep++) {
          const noteTime = measureStart + noteStep * 1.15;
          const noteIndex = (this.bgmMeasureIndex * 3 + noteStep) % 6;
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

export const globalBotanicalMazeTrack = new BotanicalMazeTrackEngine();
