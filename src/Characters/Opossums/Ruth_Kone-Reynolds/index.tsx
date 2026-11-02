/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuthKoneReynoldsGeneralEngine } from "./General";
import { RuthAnimations } from "./Animations";
import { RUTH_KONE_REYNOLDS_DESCRIPTION, RUTH_KONE_REYNOLDS_DIMENSIONS } from "./Description";
import { playRuthChatter } from "./Sounds/Elegant_Chatter";
import { RUTH_KONE_REYNOLDS_UNITS } from "./Units";

export const RuthKoneReynolds = {
  id: "ruth_kone_reynolds",
  name: "Ruth Kone-Reynolds",
  General: RuthKoneReynoldsGeneralEngine,
  Animations: RuthAnimations,
  Description: RUTH_KONE_REYNOLDS_DESCRIPTION,
  Dimensions: RUTH_KONE_REYNOLDS_DIMENSIONS,
  draw2D: RuthAnimations.draw2D,
  draw3D: RuthAnimations.draw3D,
  drawPolygons: RuthAnimations.drawPolygons,
  getPixelationSettings: RuthAnimations.getPixelationSettings,
  playChatter: playRuthChatter,
  Units: RUTH_KONE_REYNOLDS_UNITS,
  metadata: {
    themeColor: "#f472b6",
    textColor: "text-pink-300",
    particleColor: "rgba(244, 114, 182, 0.4)"
  }
};

export { RUTH_KONE_REYNOLDS_UNITS };

export default RuthKoneReynolds;

