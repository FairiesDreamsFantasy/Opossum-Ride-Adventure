/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const DuckFarmSubArena: PlaceDefinition = {
  id: "duck_farm",
  name: "The Duck Farm",
  description: "A serene wetland sub-arena centered around a peaceful pond where ducks and ducklings splash.",
  longDescription: "You are traversing a marshy, damp field surrounding a wide, clear duck pond. Numerous wooden nesting boxes dot the shoreline as ducks glide across the water and waddle along the banks.",
  accessibilityInfo: "Soft, damp, mud-and-grass terrain near water edges. Slabs of stone form a rustic path around the main pond.",
  surfaceType: "damp mud and stones",
  footstepSound: "squishy mud splash",
  colorBase: "#38BDF8", // Cyan sky blue base
  ambientNoise: "splashing water and soft quacks",
  pathElevation: 25,
  hasChainLinkBarriers: true,
  barrierGlassRatio: 0.5,
  hasArchesBeneath: true,
  pathPattern: "mixed",
  hasGroundPath: true
};
