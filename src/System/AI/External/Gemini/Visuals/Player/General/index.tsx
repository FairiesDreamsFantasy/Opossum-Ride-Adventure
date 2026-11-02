/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualPlayerState, DEFAULT_VISUAL_PLAYER_STATE } from "../Data";

export class GeminiVisualPlayerGeneralEngine {
  public static readonly systemName = "Gemini Visual Player Engine";

  private state: VisualPlayerState = { ...DEFAULT_VISUAL_PLAYER_STATE };

  public getState(): VisualPlayerState {
    return { ...this.state };
  }

  public stepFrame() {
    if (this.state.isPlaying) {
      this.state.currentFrame = (this.state.currentFrame + 1) % this.state.totalFrames;
    }
  }
}

export const GeminiVisualPlayerGeneral = {
  systemName: GeminiVisualPlayerGeneralEngine.systemName,
  Engine: GeminiVisualPlayerGeneralEngine,
};
