/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kotlin Sound Audio Track Configuration & State Holder
 */

export class KotlinSoundTrackState {
  constructor(
    public readonly trackId: string,
    public readonly volume: number = 1.0,
    public readonly pan: number = 0.0,
    public readonly isPlaying: boolean = false
  ) {}

  public copy(mutations: Partial<KotlinSoundTrackState>): KotlinSoundTrackState {
    return new KotlinSoundTrackState(
      mutations.trackId ?? this.trackId,
      mutations.volume ?? this.volume,
      mutations.pan ?? this.pan,
      mutations.isPlaying ?? this.isPlaying
    );
  }
}

export default KotlinSoundTrackState;
