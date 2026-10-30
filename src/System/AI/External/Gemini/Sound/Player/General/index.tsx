/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundPlayerState, DEFAULT_SOUND_PLAYER_STATE } from "../Data";

export class GeminiSoundPlayerGeneralEngine {
  public static readonly systemName = "Gemini Sound Player Engine";

  private state: SoundPlayerState = { ...DEFAULT_SOUND_PLAYER_STATE };

  public getState(): SoundPlayerState {
    return { ...this.state };
  }

  public setActiveTrack(trackName: string) {
    this.state.activeTrackName = trackName;
  }
}

export const GeminiSoundPlayerGeneral = {
  systemName: GeminiSoundPlayerGeneralEngine.systemName,
  Engine: GeminiSoundPlayerGeneralEngine,
};
