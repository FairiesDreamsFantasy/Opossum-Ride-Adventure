/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OliviaChinGeneralEngine } from "./General";
import { OliviaAnimations } from "./Animations";
import { OLIVIA_CHIN_DESCRIPTION, OLIVIA_CHIN_DIMENSIONS } from "./Description";
import { playOliviaChatter } from "./Sounds/Elegant_Chatter";

export const OliviaChin = {
  id: "olivia_chin",
  name: "Olivia Chin",
  General: OliviaChinGeneralEngine,
  Animations: OliviaAnimations,
  Description: OLIVIA_CHIN_DESCRIPTION,
  Dimensions: OLIVIA_CHIN_DIMENSIONS,
  draw2D: OliviaAnimations.draw2D,
  draw3D: OliviaAnimations.draw3D,
  drawPolygons: OliviaAnimations.drawPolygons,
  getPixelationSettings: OliviaAnimations.getPixelationSettings,
  playChatter: playOliviaChatter,
  metadata: {
    themeColor: "#fde047",
    textColor: "text-yellow-300",
    particleColor: "rgba(253, 224, 71, 0.4)"
  }
};

export default OliviaChin;
