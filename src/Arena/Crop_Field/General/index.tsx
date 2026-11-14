/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";
import { TRIANGULAR_SLATE_PATH_SPEC } from "../../../System/Building_Blocks/Triangular_Stone_Path";

export const CropFieldArenaGeneral: PlaceDefinition = {
  id: "crop_field",
  name: "Crop Fields",
  description:
    "Expansive ethical agricultural crop fields connected seamlessly from the Cattle Farm, traversed on a ground-oriented path paved with 36-color flat triangular slate stone blocks and bordered by 12-inch Red, Gold, and Green triangular divider stones.",
  longDescription:
    "Connected seamlessly beyond the Cattle Farm, these open-air Crop Fields pair flourishing plots of wheat, corn, barley, rice, oats, and sorghum with ethical autonomous robotic farming technology—solar harvesters, precision irrigation booms, and environmental sensor drones—working in harmony with dignified human stewards, completely free of plantation or slavery practices. The ground-level trail is paved with flat triangular slate stone blocks cycling across 36 vibrant colors (including Caramel) and divided cleanly from the rustling crops on both edges by 12-inch triangular stones in Red, Gold, and Green.",
  accessibilityInfo:
    "Ground-oriented trail paved with flat triangular slate stone blocks that produce crisp 1650 Hz Slate acoustic feedback underfoot. Both shoulders feature 12-inch Red, Gold, and Green triangular slate border stones. Stacked Triangular Stone Fences appear strictly between 500 meters and 2,000 meters apart at an opossum-jumpable height. Expect wind-rustling crop stalks alongside monkeys riding moose, unmounted wild moose, feral pigs, and loose roaming monkeys.",
  surfaceType: TRIANGULAR_SLATE_PATH_SPEC.surfaceType,
  footstepSound: "crisp triangular slate stone clack",
  colorBase: "#C68642",
  ambientNoise: "gentle winds rustling sunlit crop stalks and quiet solar harvester hum",
  lightingLevel: 1.0,
  pathPattern: "ground",
  hasGroundPath: true,
  groundColor: "#3f6212"
};

export default CropFieldArenaGeneral;
