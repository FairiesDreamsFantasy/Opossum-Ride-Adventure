/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Arena/Scene_Types";
import { ArenaNarrationRegistry } from "../Arena/Registry";

export type { SceneNarrationContext };

export class SceneNarrationEngine {
  /**
   * Generates a complete, offline scene description without external cloud latency.
   * Dispatches dynamically to modular arena handlers (Foyer, Garden, Cellar, Porch)
   * eliminating hardcoded strings and monolithic conditional logic.
   */
  public static compileSceneDescription(ctx: SceneNarrationContext): string {
    return ArenaNarrationRegistry.compileScene(ctx);
  }
}

export default SceneNarrationEngine;
