/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SQL Sound Cue & Mix Bus Query Simulator
 */

export interface SoundCueRecord {
  cueId: string;
  category: "sfx" | "bgm" | "voice" | "ui";
  volume: number;
  pitch: number;
}

export class SQLSoundQueryEngine {
  private records: SoundCueRecord[] = [];

  public insertCue(cue: SoundCueRecord): void {
    this.records.push(cue);
  }

  public selectByCategory(cat: "sfx" | "bgm" | "voice" | "ui"): SoundCueRecord[] {
    return this.records.filter((r) => r.category === cat);
  }
}

export default SQLSoundQueryEngine;
