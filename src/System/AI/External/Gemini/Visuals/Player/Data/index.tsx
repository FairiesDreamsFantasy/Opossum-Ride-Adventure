/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VisualPlayerState {
  isPlaying: boolean;
  playbackSpeed: number;
  currentFrame: number;
  totalFrames: number;
}

export const DEFAULT_VISUAL_PLAYER_STATE: VisualPlayerState = {
  isPlaying: true,
  playbackSpeed: 1.0,
  currentFrame: 0,
  totalFrames: 3600
};

export const VisualPlayerData = {
  defaultState: DEFAULT_VISUAL_PLAYER_STATE
};
