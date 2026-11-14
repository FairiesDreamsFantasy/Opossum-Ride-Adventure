/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../../index";

export const RiceFieldGeneral: PlaceDefinition = {
  id: "rice_field",
  name: "The Rice Field",
  description:
    "Lush irrigated terraced rice paddies regulated by solar water-level sensors alongside an elevated-free ground trail of 36-color triangular slate blocks.",
  longDescription:
    "Shimmering terraced rice basins flank both sides of the ground-oriented trail, automated by ethical solar water pumps and hydrologic monitoring drones—never relying on forced labor or plantations. The path stays dry and crisp underfoot with 36-color flat triangular slate stones (including Caramel) bordered by 12-inch Red, Gold, and Green triangular divider stones.",
  accessibilityInfo:
    "Flat triangular slate stone pavers give crisp 1650 Hz Slate acoustic footsteps. 12-inch Red, Gold, and Green triangular stones line both shoulders separating the paddies. Stacked Triangular Stone Fences appear 500m to 2000m apart.",
  surfaceType: "flat triangular slate stone blocks",
  footstepSound: "crisp triangular slate stone clack",
  colorBase: "#10B981",
  ambientNoise: "emerald rice blades rustling over soft irrigation ripples in gentle wind",
  lightingLevel: 1.0,
  pathPattern: "ground",
  hasGroundPath: true,
  groundColor: "#064e3b"
};
