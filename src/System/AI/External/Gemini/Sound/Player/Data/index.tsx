/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SoundPlayerState {
  isPlaying: boolean;
  activeTrackName: string;
  playbackPosition: number;
  duration: number;
}

export const DEFAULT_SOUND_PLAYER_STATE: SoundPlayerState = {
  isPlaying: true,
  activeTrackName: "Garden_Of_Wisdom",
  playbackPosition: 0,
  duration: 180
};

export const SoundPlayerData = {
  defaultState: DEFAULT_SOUND_PLAYER_STATE
};
