/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playDeepBass } from '../../../Synthesizer/Bass';
import { playSlap, playTone } from '../../../Synthesizer/Drum';
import { playBass as playKitBass } from '../../../Synthesizer/Drum/Kit';
import { playMarimba } from '../../../Synthesizer/Xylephones/Marimba';
import { Frequencies, AfricanPentatonic } from '../../../Synthesizer/General';

let bgmTimeoutId: ReturnType<typeof setTimeout> | null = null;
let bgmNextMeasureTime = 0;
let bgmMeasureIndex = 0;

export const playWhenBabylonFalls = (ctx: AudioContext, dest: AudioNode) => {
  stopWhenBabylonFalls();

  const tempo = 110;
  const beatDuration = 60 / tempo;
  const measureDuration = beatDuration * 4;

  const sequence = [
    Frequencies.C, Frequencies.F, Frequencies.G, Frequencies.C,
    Frequencies.G_LOWER, Frequencies.C, Frequencies.C, Frequencies.E,
    Frequencies.G, Frequencies.C, Frequencies.C, Frequencies.G_LOWER,
    Frequencies.C, Frequencies.E, Frequencies.C, Frequencies.C_LOWER
  ];

  bgmMeasureIndex = 0;
  bgmNextMeasureTime = ctx.currentTime + 0.05;

  const scheduler = () => {
    // Schedule ahead for the next 250ms
    while (bgmNextMeasureTime < ctx.currentTime + 0.25) {
      const rootFreq = sequence[bgmMeasureIndex % sequence.length];
      const measureStart = bgmNextMeasureTime;

      // Bassline
      playDeepBass(ctx, dest, rootFreq * 0.5, 0.35, measureStart);

      // Percussion Loop
      for (let i = 0; i < 4; i++) {
        const beatStart = measureStart + i * beatDuration;
        
        // Dundun Bass on 1 and 3
        if (i === 0 || i === 2) {
          playKitBass(ctx, dest, 0.5, beatStart);
        }
        
        // Djembe Slap on 2 and 4
        if (i === 1 || i === 3) {
          playSlap(ctx, dest, 0.2, beatStart);
        }
        
        // Djembe Tone on upbeat of 3
        if (i === 2) {
          playTone(ctx, dest, 0.25, beatStart + beatDuration / 2);
        }
      }

      // Xylophone Melody (Pentatonic randomization or sequence)
      const scale = AfricanPentatonic;
      const refFreq = Frequencies.C;
      for (let i = 0; i < 8; i++) {
        const noteStart = measureStart + i * (beatDuration / 2);
        const scaleNote = scale[i % scale.length];
        const transposedNote = rootFreq * (scaleNote / refFreq);
        playMarimba(ctx, dest, transposedNote, 0.15, noteStart);
      }

      bgmNextMeasureTime += measureDuration;
      bgmMeasureIndex++;
    }
    bgmTimeoutId = setTimeout(scheduler, 100);
  };

  scheduler();
};

export const stopWhenBabylonFalls = () => {
  if (bgmTimeoutId) {
    clearTimeout(bgmTimeoutId);
    bgmTimeoutId = null;
  }
};
