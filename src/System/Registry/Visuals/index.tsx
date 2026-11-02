/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimationsRegistry } from "./Animations";
import { ResolutionRegistry } from "./Resolution";
import { SDRegistry } from "./SD";
import { HDRegistry } from "./HD";
import { VisualsGeneralRegistry } from "./General";
import { VisualsLanguagesRegistry } from "./Engine/Languages";
import VisualEngine from "../../Visuals/Engine";

export * from "./Engine/Languages";

/**
 * Visuals Registry: Consolidates Resolution, Animations, SD, HD, Engine, and Languages registries.
 */
export const VisualsRegistry = {
  id: "visuals",
  name: "Visuals Registry",
  Animations: AnimationsRegistry,
  Resolution: ResolutionRegistry,
  SD: SDRegistry,
  HD: HDRegistry,
  General: VisualsGeneralRegistry,
  Engine: VisualEngine,
  Languages: VisualsLanguagesRegistry,
  timestamp: new Date().toISOString()
};
