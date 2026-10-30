/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SandraOpossumGeneralEngine } from "./General";
import { SandraAnimations } from "./Animations";
import { SANDRA_OPOSSUM_DESCRIPTION, SANDRA_OPOSSUM_DIMENSIONS } from "./Description";
import { playSandraChatter } from "./Sounds/Elegant_Chatter";
import { SANDRA_OPOSSUM_UNITS } from "./Units";

export const SandraOpossum = {
  id: "sandra",
  name: "Sandra Opossum",
  General: SandraOpossumGeneralEngine,
  Animations: SandraAnimations,
  Description: SANDRA_OPOSSUM_DESCRIPTION,
  Dimensions: SANDRA_OPOSSUM_DIMENSIONS,
  draw2D: SandraAnimations.draw2D,
  draw3D: SandraAnimations.draw3D,
  drawPolygons: SandraAnimations.drawPolygons,
  getPixelationSettings: SandraAnimations.getPixelationSettings,
  playChatter: playSandraChatter,
  units: SANDRA_OPOSSUM_UNITS,
  metadata: {
    themeColor: "#c084fc",
    textColor: "text-purple-300",
    particleColor: "rgba(192, 132, 252, 0.4)"
  }
};

export { SANDRA_OPOSSUM_UNITS };
export default SandraOpossum;

