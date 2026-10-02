/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualMonitorState, DEFAULT_MONITOR_STATE } from "../Data";

export class GeminiVisualMonitorGeneralEngine {
  public static readonly systemName = "Gemini Visual Monitor Engine";

  private state: VirtualMonitorState = { ...DEFAULT_MONITOR_STATE };

  public getState(): VirtualMonitorState {
    return { ...this.state };
  }

  public recordFrame() {
    this.state.activeFrameCount++;
  }

  public setDimensions(width: number, height: number) {
    this.state.width = width;
    this.state.height = height;
  }
}

export const GeminiVisualMonitorGeneral = {
  systemName: GeminiVisualMonitorGeneralEngine.systemName,
  Engine: GeminiVisualMonitorGeneralEngine,
};
