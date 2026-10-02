/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WandaOpossumGeneralEngine } from "./General";
import { WandaAnimations } from "./Animations";
import { WANDA_OPOSSUM_DESCRIPTION, WANDA_OPOSSUM_DIMENSIONS } from "./Description";
import { playWandaChatter } from "./Sounds/Elegant_Chatter";

export const WandaOpossum = {
  id: "wanda",
  name: "Wanda Opossum",
  General: WandaOpossumGeneralEngine,
  Animations: WandaAnimations,
  Description: WANDA_OPOSSUM_DESCRIPTION,
  Dimensions: WANDA_OPOSSUM_DIMENSIONS,
  draw2D: WandaAnimations.draw2D,
  draw3D: WandaAnimations.draw3D,
  drawPolygons: WandaAnimations.drawPolygons,
  getPixelationSettings: WandaAnimations.getPixelationSettings,
  playChatter: playWandaChatter,
  metadata: {
    themeColor: "#f59e0b",
    textColor: "text-amber-300",
    particleColor: "rgba(245, 158, 11, 0.4)"
  }
};

export default WandaOpossum;
