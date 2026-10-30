/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawAshley3D, 
  drawAshley2D, 
  getAshleyPixelationSettings, 
  drawAshleyPolygons 
} from "./Animations";
import { playAshleyElegantChatter } from "./Sounds/Elegant_Chatter";
import { ASHLEY_OPOSSUM_UNITS } from "./Units";

export const AshleyOpossum = {
  draw3D: drawAshley3D,
  draw2D: drawAshley2D,
  getPixelationSettings: getAshleyPixelationSettings,
  drawPolygons: drawAshleyPolygons,
  playChatter: playAshleyElegantChatter,
  units: ASHLEY_OPOSSUM_UNITS,
  metadata: {
    themeColor: "#eab308",
    textColor: "text-yellow-200",
    particleColor: "rgba(234, 179, 8, 0.4)",
  }
};

export { ASHLEY_OPOSSUM_UNITS };

