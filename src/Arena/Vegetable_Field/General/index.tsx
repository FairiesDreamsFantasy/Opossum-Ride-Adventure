/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";
import { TRIANGULAR_SLATE_PATH_SPEC } from "../../../System/Building_Blocks/Triangular_Stone_Path";

export const VegetableFieldArenaGeneral: PlaceDefinition = {
  id: "vegetable_field",
  name: "Vegetable Fields",
  description:
    "Flourishing ethical vegetable produce plots beyond the grain fields, traversed on a ground-oriented 36-color triangular slate stone path bordered by 12-inch Red, Gold, and Green triangular divider stones.",
  longDescription:
    "Stretching onward from the grain Crop Fields, these vibrant Vegetable Fields cultivate heirloom root, vine, and leafy produce with autonomous solar weeding rovers, drip-sensor booms, and dignified human stewardship—completely free of plantation or slavery depictions. The ground-level trail uses flat triangular slate stone blocks cycling across 36 curated colors (including Caramel) bordered on both shoulders by 12-inch Red, Gold, and Green triangular divider stones.",
  accessibilityInfo:
    "Flat triangular slate stone pavers give crisp 1650 Hz Slate acoustic footsteps. 12-inch Red, Gold, and Green triangular divider stones border both edges. Stacked Triangular Stone Fences appear between 500m and 2000m apart. Watch for monkeys riding moose, wild moose, feral pigs, and loose monkeys.",
  surfaceType: TRIANGULAR_SLATE_PATH_SPEC.surfaceType,
  footstepSound: "crisp triangular slate stone clack",
  colorBase: "#16A34A",
  ambientNoise: "leafy vegetable foliage rustling in cool agricultural breezes",
  lightingLevel: 1.0,
  pathPattern: "ground",
  hasGroundPath: true,
  groundColor: "#14532D"
};

export default VegetableFieldArenaGeneral;
