/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KadyRoseGeneralEngine } from "./General";
import { KadyAnimations } from "./Animations";
import { KADY_ROSE_DESCRIPTION, KADY_ROSE_DIMENSIONS } from "./Description";
import { playKadyChatter } from "./Sounds/Elegant_Chatter";

export const KadyRose = {
  id: "kady_rose",
  name: "Kady Rose",
  General: KadyRoseGeneralEngine,
  Animations: KadyAnimations,
  Description: KADY_ROSE_DESCRIPTION,
  Dimensions: KADY_ROSE_DIMENSIONS,
  draw2D: KadyAnimations.draw2D,
  draw3D: KadyAnimations.draw3D,
  drawPolygons: KadyAnimations.drawPolygons,
  getPixelationSettings: KadyAnimations.getPixelationSettings,
  playChatter: playKadyChatter,
  metadata: {
    themeColor: "#d1d5db",
    textColor: "text-gray-200",
    particleColor: "rgba(209, 213, 219, 0.4)"
  }
};

export default KadyRose;
