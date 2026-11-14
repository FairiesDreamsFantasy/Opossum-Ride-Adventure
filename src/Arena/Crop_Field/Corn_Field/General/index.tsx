/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../../index";

export const CornFieldGeneral: PlaceDefinition = {
  id: "corn_field",
  name: "The Corn Field",
  description:
    "Tall rustling rows of vibrant green sweet corn tended by autonomous solar crop-monitoring rovers along a 36-color triangular slate stone path.",
  longDescription:
    "Expansive rows of tall leafy corn stand symmetrically on either side of the ground-level trail, with autonomous electric weeding and irrigation robotics gliding quietly between furrows. The trail is paved with flat triangular slate stone blocks in 36 curated colors (including Caramel) and separated cleanly by 12-inch Red, Gold, and Green triangular divider stones.",
  accessibilityInfo:
    "Flat triangular slate stone pavers give crisp 1650 Hz Slate acoustic footsteps. 12-inch Red, Gold, and Green triangular border stones divide the corn rows from the path. Stacked Triangular Stone Fences appear between 500m and 2000m apart.",
  surfaceType: "flat triangular slate stone blocks",
  footstepSound: "crisp triangular slate stone clack",
  colorBase: "#16A34A",
  ambientNoise: "tall broad corn leaves rustling briskly in open winds",
  lightingLevel: 1.0,
  pathPattern: "ground",
  hasGroundPath: true,
  groundColor: "#14532d"
};
