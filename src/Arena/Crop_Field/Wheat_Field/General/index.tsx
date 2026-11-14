/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../../index";

export const WheatFieldGeneral: PlaceDefinition = {
  id: "wheat_field",
  name: "The Wheat Field",
  description:
    "Golden sun-ripened wheat plots seamlessly bordering the Cattle Farm, tended with solar robotic harvesters along a 36-color triangular slate stone path.",
  longDescription:
    "Stretching onward from the Cattle Farm, expansive golden wheat fields whisper cleanly across gentle breezes while autonomous solar grain harvesters and moisture drones tend the rows ethically. The ground-level path is paved with flat triangular slate stone blocks in 36 curated colors (including Caramel) and framed by 12-inch Red, Gold, and Green triangular divider stones.",
  accessibilityInfo:
    "Flat triangular slate stone pavers give 1650 Hz Slate acoustic footsteps. 12-inch Red, Gold, and Green triangular stones line both edges. Stacked Triangular Stone Fences appear between 500m and 2000m apart at opossum-jumpable height. Watch for monkeys riding moose, unmounted wild moose, feral pigs, and loose monkeys.",
  surfaceType: "flat triangular slate stone blocks",
  footstepSound: "crisp triangular slate stone clack",
  colorBase: "#EAB308",
  ambientNoise: "golden wheat stalks rustling in warm farmland winds",
  lightingLevel: 1.0,
  pathPattern: "ground",
  hasGroundPath: true,
  groundColor: "#713f12"
};
