/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const GooseFarmSubArena: PlaceDefinition = {
  id: "goose_farm",
  name: "The Goose Farm",
  description: "A wide, grassy meadow bordered by a rushing stream where geese honk proudly and march in formation.",
  longDescription: "You ride through a wide, well-manicured grass meadow near a fresh flowing creek. Flocks of large geese patrol the green field, honking and splashing near the water's edge.",
  accessibilityInfo: "Broad, open lawn terrain with a stream on one side. The surface is firm soil and dense turf.",
  surfaceType: "firm meadow turf",
  footstepSound: "rhythmic turf thuds",
  colorBase: "#A7F3D0", // Light emerald base
  ambientNoise: "proud goose honking and stream rushing",
  pathElevation: 25,
  hasChainLinkBarriers: true,
  barrierGlassRatio: 0.5,
  hasArchesBeneath: true,
  pathPattern: "mixed",
  hasGroundPath: true
};
