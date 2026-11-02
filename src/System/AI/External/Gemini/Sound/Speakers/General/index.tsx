/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualSpeakersState, DEFAULT_SPEAKERS_STATE } from "../Data";

export class GeminiSoundSpeakersGeneralEngine {
  public static readonly systemName = "Gemini Sound Speakers Engine";

  private state: VirtualSpeakersState = { ...DEFAULT_SPEAKERS_STATE };

  public getState(): VirtualSpeakersState {
    return { ...this.state };
  }

  public setMasterVolume(vol: number) {
    this.state.masterVolume = Math.max(0, Math.min(1.0, vol));
  }
}

export const GeminiSoundSpeakersGeneral = {
  systemName: GeminiSoundSpeakersGeneralEngine.systemName,
  Engine: GeminiSoundSpeakersGeneralEngine,
};
