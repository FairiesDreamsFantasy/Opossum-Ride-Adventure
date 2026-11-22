/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PolyphonicVoiceScheduler — Priority-Based Voice Stealing & Polyphonic Headroom Guard.
 */

import { SoundEngineStabilizer } from "./AudioGraphStabilizer";

export interface ScheduledVoiceEntry {
  endTimeSec: number;
  priority?: number;
}

export class VoiceBudgetScheduler {
  public static computePolyphonicGainScale(activeVoices: number, maxBudget: number = 128): number {
    const n = Math.max(1, Math.min(maxBudget, Math.round(Number.isFinite(activeVoices) ? activeVoices : 1)));
    if (n <= 4) return 1.0;
    return SoundEngineStabilizer.clampAudioGain(Math.max(0.28, Math.sqrt(4.0 / n)), 1.0);
  }

  public static selectStealCandidateIndex(voices: readonly ScheduledVoiceEntry[]): number {
    if (!voices.length) return -1;
    let bestIdx = 0;
    let bestScore = Infinity;
    for (let i = 0; i < voices.length; i++) {
      const v = voices[i];
      const priorityWeight = (v.priority ?? 1) * 10.0;
      const score = priorityWeight + (Number.isFinite(v.endTimeSec) ? v.endTimeSec : 0);
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  }
}
