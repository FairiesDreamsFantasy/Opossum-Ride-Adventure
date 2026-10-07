/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualSpeakersState {
  masterVolume: number;
  frequencyRange: { min: number; max: number };
  activeChannels: number;
  isMuted: boolean;
}

export const DEFAULT_SPEAKERS_STATE: VirtualSpeakersState = {
  masterVolume: 0.85,
  frequencyRange: { min: 20, max: 22000 },
  activeChannels: 2,
  isMuted: false
};

export const SpeakersData = {
  defaultState: DEFAULT_SPEAKERS_STATE
};
