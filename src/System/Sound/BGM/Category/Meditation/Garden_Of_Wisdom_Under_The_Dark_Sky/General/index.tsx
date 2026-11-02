/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Garden Of Wisdom Under The Dark Sky - General BGM Track Engine
 * 20-minute meditation structure in key of E with Japanese koto phrasing and ambient dusk atmosphere.
 */

import { globalJapaneseMeditationInstrument } from "../../Japanese/General";
import { globalMeditationBGM } from "../../General";

export class GardenOfWisdomTrackEngine {
  private activeDrone: { stop: () => void } | null = null;
  private bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgmNextMeasureTime = 0;
  private bgmMeasureIndex = 0;

  // Meaningful measure pitch multipliers relative to key of E
  // Measure 0: E (1.00 - keeps key of E intact on 1st measure)
  // Measure 1: F# (1.122)
  // Measure 2: G# (1.260)
  // Measure 3: B (1.498)
  // Measure 4: C# (1.682)
  // Measure 5: E Octave (2.00)
  private readonly measurePitchMultipliers = [1.00, 1.122, 1.260, 1.498, 1.682, 2.00];

  public startTrack(context: AudioContext, destination: AudioNode): void {
    this.stopTrack();
    this.activeDrone = globalMeditationBGM.playEKeyMeditationDrone(context, destination);

    const measureDuration = 4.2; // 4.2 seconds per measure for smooth meditative pacing
    this.bgmMeasureIndex = 0;
    this.bgmNextMeasureTime = context.currentTime + 0.05;

    const scheduler = () => {
      if (!context || context.state === "closed") return;

      // Lookahead scheduling (schedule events up to 350ms in advance) to prevent browser CPU/RAM spikes
      while (this.bgmNextMeasureTime < context.currentTime + 0.35) {
        const currentMeasure = this.bgmMeasureIndex % this.measurePitchMultipliers.length;
        const pitchMult = this.measurePitchMultipliers[currentMeasure];
        const measureStart = this.bgmNextMeasureTime;

        // Play koto phrases for this measure with the measure's unique pitch variation
        for (let noteStep = 0; noteStep < 3; noteStep++) {
          const noteTime = measureStart + noteStep * 1.35;
          const noteIndex = (this.bgmMeasureIndex * 2 + noteStep) % 6;
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

export const globalGardenOfWisdomTrack = new GardenOfWisdomTrackEngine();
